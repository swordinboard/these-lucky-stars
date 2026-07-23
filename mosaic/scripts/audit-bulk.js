#!/usr/bin/env node
// Static "bulk" audit for the Mosaic Galaxy front-end: flags the cheap,
// mechanically-detectable categories of unnecessary weight — dead top-level
// JS declarations, CSS classes/custom-properties that nothing references,
// duplicate CSS selectors, and HTML ids nothing queries. It's a heuristic
// helper, not a build-tool linter: everything it flags is a CANDIDATE for a
// human to double-check (a class name can legitimately be assembled at
// runtime via a template literal, for instance) rather than an automatic
// verdict. No dependencies beyond Node's own fs/path.
//
// Usage (from the mosaic/ directory):
//   node scripts/audit-bulk.js

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const JS_DIR = path.join(ROOT, 'js');
const CSS_FILE = path.join(ROOT, 'style.css');
const HTML_FILE = path.join(ROOT, 'index.html');

function read(file) {
    return fs.readFileSync(file, 'utf8');
}

function listJsFiles() {
    return fs.readdirSync(JS_DIR)
        .filter((f) => f.endsWith('.js'))
        .map((f) => path.join(JS_DIR, f));
}

function relPath(file) {
    return path.relative(ROOT, file);
}

function countOccurrences(source, word) {
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const matches = source.match(re);
    return matches ? matches.length : 0;
}

// ---------------------------------------------------------------------
// 1. Dead top-level JS declarations: a `function name(...)`, `const name`,
//    or `class name` at module scope, exported or not, whose name never
//    appears anywhere else in the whole codebase — not in its own file
//    (called locally) and not imported by another module.
// ---------------------------------------------------------------------
function findTopLevelDeclarations(source) {
    const declarations = [];
    const re = /^(?:export\s+)?(?:async\s+)?(?:function\s+(\w+)|const\s+(\w+)\s*=|class\s+(\w+))/gm;
    let match;
    while ((match = re.exec(source))) {
        const name = match[1] || match[2] || match[3];
        const isExported = source.slice(match.index, match.index + 10).startsWith('export');
        declarations.push({ name, isExported, index: match.index });
    }
    return declarations;
}

function auditDeadDeclarations(jsFiles) {
    const sources = jsFiles.map((file) => ({ file, source: read(file) }));
    const wholeCodebase = sources.map((s) => s.source).join('\n');
    const findings = [];

    for (const { file, source } of sources) {
        for (const decl of findTopLevelDeclarations(source)) {
            const totalUses = countOccurrences(wholeCodebase, decl.name);
            // 1 use = only the declaration itself, nowhere else at all.
            if (totalUses <= 1) {
                findings.push({ file: relPath(file), name: decl.name, exported: decl.isExported, kind: 'dead' });
                continue;
            }
            // Exported but the name only ever appears in its own file means
            // no other module imports it — the export is unnecessary
            // surface area even though the function itself is in use.
            if (decl.isExported) {
                const usesElsewhere = sources
                    .filter((s) => s.file !== file)
                    .reduce((sum, s) => sum + countOccurrences(s.source, decl.name), 0);
                if (usesElsewhere === 0) {
                    findings.push({ file: relPath(file), name: decl.name, exported: true, kind: 'over-exported' });
                }
            }
        }
    }
    return findings;
}

// ---------------------------------------------------------------------
// 2. CSS classes defined in style.css that no .js/.html file appears to
//    reference (literal string match — dynamically-assembled class names,
//    e.g. `galaxy-accent-${entity.accent}`, won't literally contain the
//    full class name and can show up here as false positives; that's
//    called out in the report rather than hidden).
// ---------------------------------------------------------------------
function extractCssClassNames(css) {
    // Strip comments first so nothing inside /* ... */ counts as a selector.
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const names = new Set();
    const re = /\.(-?[_a-zA-Z][\w-]*)/g;
    let match;
    while ((match = re.exec(noComments))) {
        names.add(match[1]);
    }
    return [...names].sort();
}

function auditUnusedCssClasses(css, jsFiles, html) {
    const classNames = extractCssClassNames(css);
    const haystacks = [html, ...jsFiles.map(read)];
    const findings = [];
    for (const name of classNames) {
        const usedOutsideCss = haystacks.some((text) => text.includes(name));
        if (!usedOutsideCss) findings.push(name);
    }
    return findings;
}

// ---------------------------------------------------------------------
// 3. CSS custom properties (--foo) declared but never read via var(--foo).
// ---------------------------------------------------------------------
function auditUnusedCssVariables(css) {
    const declared = new Set();
    const declRe = /(--[\w-]+)\s*:/g;
    let match;
    while ((match = declRe.exec(css))) declared.add(match[1]);

    const findings = [];
    for (const name of declared) {
        const useRe = new RegExp(`var\\(\\s*${name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}[\\s,)]`);
        if (!useRe.test(css)) findings.push(name);
    }
    return findings;
}

// ---------------------------------------------------------------------
// 4. Selectors that appear as a full duplicate block header more than once
//    in style.css — not necessarily a bug (a later rule may deliberately
//    layer on to an earlier one via a differently-ordered property set),
//    but worth a human glance for genuinely copy-pasted rules.
// ---------------------------------------------------------------------
function auditDuplicateSelectors(css) {
    const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
    const selectorRe = /(^|\})\s*([^{}]+?)\s*\{/g;
    const seen = new Map();
    let match;
    while ((match = selectorRe.exec(noComments))) {
        const selector = match[2].replace(/\s+/g, ' ').trim();
        if (!selector || selector.startsWith('@')) continue;
        seen.set(selector, (seen.get(selector) || 0) + 1);
    }
    return [...seen.entries()].filter(([, count]) => count > 1).map(([selector, count]) => ({ selector, count }));
}

// ---------------------------------------------------------------------
// 5. HTML ids nothing queries via getElementById/#id.
// ---------------------------------------------------------------------
function auditUnusedHtmlIds(html, jsFiles, css) {
    const ids = new Set();
    const idRe = /\sid="([\w-]+)"/g;
    let match;
    while ((match = idRe.exec(html))) ids.add(match[1]);

    const jsSource = jsFiles.map(read).join('\n');
    const findings = [];
    for (const id of ids) {
        const usedInJs = jsSource.includes(`'${id}'`) || jsSource.includes(`"${id}"`) || jsSource.includes(`\`${id}\``);
        const usedInCss = css.includes(`#${id}`);
        if (!usedInJs && !usedInCss) findings.push(id);
    }
    return [...findings].sort();
}

// ---------------------------------------------------------------------
// 6. Orphaned files: a .js file in js/ that nothing reaches by walking the
//    static import graph starting from the page's actual entry point
//    (index.html's <script type="module">) — a leftover module nobody
//    loads at all, as opposed to a symbol nobody imports from a live one.
// ---------------------------------------------------------------------
function entryPointFrom(html) {
    const match = /<script\s+type="module"\s+src="js\/([^"]+)"/.exec(html);
    return match ? match[1] : null;
}

function auditOrphanedFiles(jsFiles, html) {
    const basenames = jsFiles.map((f) => path.basename(f));
    const entry = entryPointFrom(html);
    if (!entry) return { entry: null, orphaned: basenames };

    const reachable = new Set();
    const queue = [entry];
    while (queue.length) {
        const name = queue.pop();
        if (reachable.has(name)) continue;
        reachable.add(name);
        const filePath = path.join(JS_DIR, name);
        if (!fs.existsSync(filePath)) continue;
        const source = read(filePath);
        const importRe = /from\s+['"]\.\/(.+?\.js)['"]/g;
        let match;
        while ((match = importRe.exec(source))) queue.push(match[1]);
    }
    return { entry, orphaned: basenames.filter((f) => !reachable.has(f)) };
}

// ---------------------------------------------------------------------
// 7. File size table, flagged against a loose "this is getting big" bar.
// ---------------------------------------------------------------------
function fileSizeReport(jsFiles) {
    const rows = [...jsFiles, CSS_FILE, HTML_FILE].map((file) => {
        const source = read(file);
        return { file: relPath(file), lines: source.split('\n').length, bytes: Buffer.byteLength(source) };
    });
    rows.sort((a, b) => b.bytes - a.bytes);
    return rows;
}

// ---------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------
function main() {
    const jsFiles = listJsFiles();
    const css = read(CSS_FILE);
    const html = read(HTML_FILE);

    const deadDeclarations = auditDeadDeclarations(jsFiles);
    const unusedClasses = auditUnusedCssClasses(css, jsFiles, html);
    const unusedVars = auditUnusedCssVariables(css);
    const duplicateSelectors = auditDuplicateSelectors(css);
    const unusedIds = auditUnusedHtmlIds(html, jsFiles, css);
    const { entry, orphaned } = auditOrphanedFiles(jsFiles, html);
    const sizes = fileSizeReport(jsFiles);

    const line = '─'.repeat(70);
    console.log(line);
    console.log('MOSAIC GALAXY — BULK/EFFICIENCY AUDIT');
    console.log(line);

    console.log(`\n[1] Dead top-level JS declarations (${deadDeclarations.filter((d) => d.kind === 'dead').length})`);
    for (const d of deadDeclarations.filter((d) => d.kind === 'dead')) {
        console.log(`  - ${d.file}: ${d.name}${d.exported ? ' (exported)' : ''}`);
    }
    console.log(`\n[1b] Exported but never imported anywhere else (${deadDeclarations.filter((d) => d.kind === 'over-exported').length})`);
    for (const d of deadDeclarations.filter((d) => d.kind === 'over-exported')) {
        console.log(`  - ${d.file}: ${d.name}`);
    }

    console.log(`\n[2] CSS classes with no literal match outside style.css (${unusedClasses.length})`);
    console.log('    (dynamically-built class names, e.g. `galaxy-accent-${x}`, will legitimately show up here)');
    for (const name of unusedClasses) console.log(`  - .${name}`);

    console.log(`\n[3] CSS custom properties never read via var() (${unusedVars.length})`);
    for (const name of unusedVars) console.log(`  - ${name}`);

    console.log(`\n[4] Duplicate CSS selector blocks (${duplicateSelectors.length})`);
    for (const { selector, count } of duplicateSelectors) console.log(`  - "${selector}" appears ${count} times`);

    console.log(`\n[5] HTML ids nothing queries (${unusedIds.length})`);
    for (const id of unusedIds) console.log(`  - #${id}`);

    console.log(`\n[6] Orphaned .js files (${orphaned.length}) — entry point: ${entry || '(not found)'}`);
    for (const file of orphaned) console.log(`  - js/${file}`);

    console.log(`\n[7] File sizes (largest first)`);
    const totalBytes = sizes.reduce((sum, r) => sum + r.bytes, 0);
    for (const { file, lines, bytes } of sizes) {
        console.log(`  ${String(bytes).padStart(6)} B  ${String(lines).padStart(4)} ln  ${file}`);
    }
    console.log(`  ${'—'.repeat(24)}`);
    console.log(`  ${String(totalBytes).padStart(6)} B total (uncompressed, source)`);

    console.log(`\n${line}`);
    const totalFindings = deadDeclarations.length + unusedClasses.length + unusedVars.length
        + duplicateSelectors.length + unusedIds.length + orphaned.length;
    console.log(`${totalFindings} total findings across all checks — see notes above on false positives.`);
    console.log(line);
}

main();

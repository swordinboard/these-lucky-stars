# Site Maintenance Notes

Reference for Claude and site maintainers. Covers what to check before and after
different types of updates to avoid breaking changes or inconsistencies.

---

## ⚠ Before merging to `main` (the live site)

Run the preflight from the repo root:

```
./_discovery/tools/check.sh
```

It builds the site and runs every structural check, printing PASS/FAIL for each
and exiting non-zero if anything fails. **Do not merge on a FAIL.**

For any change that moves, splits, or re-homes content, also pass a baseline to
compare rendered output against — this is the check that catches silently lost
content:

```
./_discovery/tools/check.sh main        # or any git ref / commit
```

What it checks, and why each one exists:

| # | Check | Catches |
|---|---|---|
| 1 | Hugo build at the pinned version | Template/version breakage. The theme needs Hugo **≥ 0.146 extended**; `netlify.toml` pins the exact version. A system Hugo that is too old will fail here rather than on Netlify. |
| 2 | `snippetlint.py` | A snippet ending in an HTML comment — see the snippet rules below. This one silently deletes page content. |
| 3 | `linkcheck.py` | Broken internal links and `#anchors`, scanned on the **built** site (so it sees shortcode- and include-generated output, not just markdown). |
| 4 | `builddata.py --check` | `data/blocks.json` / `data/edges.json` drifted out of sync with the content. |
| 5 | `rendercheck.py` (only with a baseline) | **Content that disappears from the rendered page even though the markdown still exists.** Include boundaries can swallow text; a source-level diff will not see it. |

**Known/accepted failures** (safe to merge with these):

- One broken link: `/docs/free-srd/inventory--equipment/tool-kits/` in
  `generic-equipment.md` — a generic Tool Kits page is planned but not written.
  `linkcheck.py` excludes it by name; remove that exclusion when the page exists.
- With a baseline, `rendercheck` reports differences for anything you changed on
  purpose. Read the list; it should only contain your intended edits.

---

## Block architecture (read this before editing content)

The site is built from **blocks**. A block is one self-contained rule, feature,
or item — the unit a GM can select when building a custom PDF.

- **~425 blocks live in `content/snippets/<namespace>/<slug>.md`.** Each carries
  block frontmatter (below) and holds the actual prose.
- **15 pages are themselves blocks** (`content/docs/.../size.md`, the race pages,
  `legal.md`, the bot stubs). They stand alone as one coherent unit, so they are
  referenced in place instead of being extracted. They carry the same
  frontmatter keys in their page frontmatter.
- **The other ~30 docs pages are shells.** They are headings, tables, and
  `{{% include %}}` pulls — the prose lives in the snippets. `combat.md` is not
  one block; it is ~20 blocks assembled. These pages keep their normal page
  frontmatter (`title`, `description`, `weight`, `book*`) and have **no** block
  keys, on purpose.

So: **to edit a rule, edit its snippet, not the page.** The page only controls
what appears and in what order.

Namespaces group by concept and pages group by presentation — they deliberately
differ. `combat.md` pulls from `combat/`, `health/`, and `actions/`; 24 blocks
appear on more than one page (the speed rules show up on three). That is the
model working: one file, one ID, many placements.

Canonical machine-readable data lives in **`data/blocks.json`** and
**`data/edges.json`** (see below). They are generated, never hand-edited.

### Block frontmatter

```yaml
title: "Rage"                 # the block's own heading text
label: "Student [___]"        # optional: catalog display name when it differs from title
id: abilities/rage            # unique; matches the file path under content/snippets/
category: [core]              # list: core | sci-fi | fantasy … (a block can be in several)
type: feature                 # rule | feature | equipment | creature | reference
tier: core                    # core | supplement | module
reference: medium             # high | medium | low — how heavily other blocks point at it
tags: [ability, core, general]  # drives tag-as-query pulls and the builder's grouping
summary: "Enter an enraged state for a short duration."   # the quick-reference one-liner
requires: [abilities/charge]  # feature prerequisites — the builder auto-includes these
variant_group: field-ration   # optional: setting variants that share an identity
selectable: false             # optional: note/chrome blocks that ride along, never picked alone
excluded: true                # optional: not part of the buildable corpus at all
headless: true                # required on snippets
```

`summary` and `label` are **single-sourced** — the quick-reference tables are
generated from them (see below), so edit them here and nowhere else.

---

## Snippet authoring rules

These are the ways a snippet can break a page. The preflight catches #1 and #3.

1. **A snippet must not end with an HTML comment.** `{{% include %}}` re-parses
   the snippet's output as markdown, so a trailing `<!-- … -->` opens an HTML
   block that swallows **everything after the include on the host page** —
   silently, with no build error. This really happened: it deleted the entire
   Mounts section from Vehicle Rules. Park author notes in the *page* instead,
   or put content after the comment inside the snippet.
   *Checked by `snippetlint.py`.*

2. **Includes fail silently.** `{{% include "/snippets/does-not-exist" %}}`
   renders nothing at all — no error, no warning, no build failure. Always run
   the preflight after re-wiring includes.

3. **Heading levels travel with the block.** A snippet extracted from a `###`
   context carries `###` with it. Re-homing a block under a different heading
   depth changes how it renders. Check the page after moving blocks.

4. **Anchors are generated from heading text, and keep unusual characters.**
   `### Crippled Δ` becomes `#crippled-δ`, not `#crippled`; underscores are kept
   (`Restrained [___]` → `#restrained-___`). Avoid decorative characters in
   headings you intend to link to. If a marker is needed (like the Δ that flags
   attacker-advantage conditions), put it in the summary table and the `details`
   label, not in the heading.

5. **Snippets are never published as pages.** `content/snippets/_index.md` sets
   `build: render: never` with a cascade — do not remove it.

---

## Quick-reference tables (the `catalog` shortcode)

The summary tables on the catalog pages are **generated from block frontmatter**.
Do not hand-write table rows for blocks.

```
{{< catalog header="Name|Description" >}}
abilities/agile-dodge
- abilities/momentum-dodge
-- abilities/slip-strike
{{< /catalog >}}
```

- The body is a list of **block IDs**, one per line, in display order.
- `- ` and `-- ` mark child / grandchild entries (rendered as `- ` and `– `).
- Each row's name, link, and blurb come from that block's `label`/`title`,
  anchor, and `summary`. **To change a table row, edit the block.**
- A typo'd ID renders as a visible `MISSING BLOCK: <id>` cell rather than
  failing the build — so scan new tables after adding them.

Tables are deliberately two columns (name + blurb). Extra columns that used to
exist (component Slot/Install, kit Cost/Wt) were dropped; that data is stated in
each item's own entry.

---

## Canonical data (`data/blocks.json`, `data/edges.json`)

Generated from the content tree. Hugo loads `data/` automatically, so templates
can read `site.Data.blocks`; the Phase 4 PDF builder is the main intended
consumer. Nothing on the site reads them yet.

**Regenerate after any structural content change:**

```
python3 _discovery/tools/builddata.py
```

- `blocks.json` — every block with its frontmatter, plus computed `anchor`,
  `pages` (every page it appears on), `in_degree`, and `source_page`.
- `edges.json` — every cross-reference: `dependency` (builder must auto-include
  the target — feature prerequisites), `reference` (stands alone but points at
  the target; the builder surfaces it as a fillable hole), `mention` (inert,
  outside the buildable corpus), `include` (composition: a page pulling a block).

`reference` in a block's frontmatter is **authored** — `builddata.py` reads it,
it does not overwrite it. `in_degree` next to it is recomputed each run, so if
the two disagree wildly that is a hint to re-rate the block by hand.

---

## Tools

Live, in `_discovery/tools/`:

| Tool | Use |
|---|---|
| `check.sh` | **Pre-merge preflight.** Runs everything below. |
| `builddata.py` | Regenerate `data/*.json` (`--check` to test freshness) |
| `linkcheck.py` | Broken links/anchors on a built site: `linkcheck.py <build-dir>` |
| `rendercheck.py` | Rendered-text diff between two builds: `rendercheck.py <old> <new>` |
| `snippetlint.py` | Snippet authoring rules |
| `implicit-edges.json` | Hand-curated rule couplings that have no link in the prose (heat/cold needing exposure intervals, etc.) — edit this to add one |

`_discovery/tools/archive/` holds the one-time Phase 1/2 transformation scripts.
They are provenance only — **do not run them**; see the README in that folder.
Note especially that the old `verify.py` is retired as *unsafe*: it compared
markdown source and reported "nothing lost" while rendered content had actually
disappeared.

---

## Hugo Version Updates

- Check `netlify.toml` → `HUGO_VERSION` matches the new version after testing locally
- Review Hugo release notes for deprecated front matter keys or template changes
- Known deprecated keys already fixed: `_build` → `build` (deprecated in 0.145.0)
- Run `hugo server` locally after updating and check for warnings before pushing

---

## Book Theme Updates

After pulling a theme update, **always diff these overridden files** before deploying:

| Our file | Theme original | What we changed |
|---|---|---|
| `layouts/_partials/docs/menu-filetree.html` | `themes/hugo-book/layouts/_partials/docs/menu-filetree.html` | Added `bookNavButton` param check so sections with content can still render as nav-toggle-only buttons. See comment at top of file. |
| `layouts/_partials/docs/inject/head.html` | `themes/hugo-book/layouts/_partials/docs/inject/head.html` | Added Google Fonts `<link>` tags. Theme file is intentionally empty — low risk. |

**How to diff:**
```
diff themes/hugo-book/layouts/_partials/docs/menu-filetree.html layouts/_partials/docs/menu-filetree.html
```

---

## Adding New External Resources (fonts, scripts, analytics, embeds)

Any new external domain must be added to the CSP in `netlify.toml` under `[[headers]]`.
Match the resource type to the correct directive:

| Resource type | Directive |
|---|---|
| Stylesheets (`<link rel="stylesheet">`) | `style-src` |
| Font files | `font-src` |
| Scripts (`<script src="...">`) | `script-src` |
| Fetch / XHR / preconnect | `connect-src` |
| Images from external hosts | `img-src` |

Currently allowed external domains:
- `https://fonts.googleapis.com` — Google Fonts stylesheet (style-src)
- `https://fonts.gstatic.com` — Google Fonts files (font-src)
- `https://www.googletagmanager.com` — GA4 script (script-src)
- `https://www.google-analytics.com` — GA4 script + beacon (script-src, connect-src)
- `https://region1.google-analytics.com` — GA4 regional beacon (connect-src)

---

## Moving or Renaming Content Pages

Moving or renaming a **block** (a file under `content/snippets/`) also changes its
`id`: update the `id:` frontmatter to match the new path, update every
`{{% include %}}` and `{{< catalog >}}` reference to it, re-run `builddata.py`,
and run the preflight — a stale include renders as nothing, silently.

Any URL change requires a redirect in `netlify.toml` to avoid 404s in Google Search Console.

```toml
[[redirects]]
  from = "/old-url/"
  to = "/new-url/"
  status = 301
```

- Wildcards: `from = "/old-section/*"` → `to = "/new-section/:splat"`
- Specific sub-page renames need their own rule placed **before** any wildcard that covers the same path
- Drafted-out pages that were previously live also need redirects to their nearest valid parent

---

## Adding New Content Pages

- **If the page presents rules/features/items, they belong in blocks** — see the
  block architecture section above. Write the prose in `content/snippets/…` and
  make the page a shell of `{{% include %}}` pulls. Then run `builddata.py`.
- Add a `description:` field to the front matter — Google uses this as the meta description
- New pages are auto-added to the sitemap unless `draft: true` or `sitemap: { disable: true }`
- Draft pages are not built or sitemapped — intentional
- `bookHidden: true` hides a page **and all its children** from the nav but still builds and sitemaps it — use carefully on sections

---

## Adding New Content Sections

- Decide if the section `_index.md` should be nav-toggle-only: if yes, add `bookNavButton: true`
- Add `bookCollapseSection: true` to make the section collapsible in the nav
- Set `weight` to control nav order within the parent section
- If the section is nav-toggle-only but has content, it will still be indexed by Google — write the content accordingly

---

## Nav Structure Reference

| Front matter param | Effect |
|---|---|
| `bookCollapseSection: true` | Makes section collapsible in nav |
| `bookNavButton: true` | Overrides nav link → toggle-only button (custom param, requires our menu-filetree.html override) |
| `bookHidden: true` | Hides page AND all children from nav; page still builds and is sitemapped |
| `weight: N` | Controls order within parent section (lower = higher in nav) |
| `draft: true` | Page not built, not sitemapped, not accessible |

---

## Content Consistency

### Page title / h1 convention
The Book theme does **not** display the front matter `title` as a visible heading on desktop (it only appears in the mobile header). Because of this, every page must open with an h1 that matches the page title exactly — this h1 acts as the visible heading on desktop.

```markdown
---
title: "Combat"
---

# Combat

Page content starts here...
```

- The h1 must match the `title` field exactly
- This applies to all content pages **and** section `_index.md` files that have body content
- Do not use a different h1 (e.g. "In This Section") — it will appear as the page heading on desktop

### Other conventions
- Callout styles: see `md-formating-notes.md` (repo root)
- Shortcodes available: `include`, `catalog`, `download-card`, `roadmap`, `columns`,
  `quickref` (see `layouts/_shortcodes/`), plus `details` / `tabs` / `tab` from the theme
- `quickref` is defined but **unused** — it duplicates `details`. Retired by disuse;
  the file stays available. Use `details`.
- Snippet includes: `{{% include "/snippets/<namespace>/<slug>" %}}` — source files in
  `content/snippets/<namespace>/`, none are published. The path always matches the
  block's `id`. See the block architecture and snippet rules at the top of this file.
- `content/snippets/_index.md` has `build: render: never` cascading to all children — do not remove this

---

## Multi-Site Setup: mosaic.theseluckystars.com

This repo hosts **two independent Netlify sites**, not one:

| Site | Netlify project name | Repo root | Netlify base directory | Domain |
|---|---|---|---|---|
| Main site (Hugo) | `these-lucky-stars` | `/` | (none) | `theseluckystars.com` |
| Galaxy map prototype | `mosaic-theseluckystars` | `/mosaic` | `mosaic` | `mosaic.theseluckystars.com` (pending) |

- The `mosaic/` site is plain static HTML/CSS/JS (no build step) with its **own**
  `mosaic/netlify.toml` — its headers/CSP are independent of the root `netlify.toml` and do
  not inherit from it. If the mosaic prototype starts loading external resources (fonts,
  scripts, embeds), update `mosaic/netlify.toml`'s CSP directly, following the same
  directive-matching table above.
- Changes under `mosaic/` do not affect the main site's Hugo build, and vice versa — the two
  builds are fully isolated by Netlify's base-directory setting.
- The mosaic site's production branch was initially set to `mosaic-prototype` (not `main`)
  while the prototype is unfinished. Switch it to `main` only once the galaxy map is ready
  to go live, and treat that switch (plus any related DNS/domain change) as a live-site change
  requiring confirmation.

---

## Sitemap Health

Current known noise exclusions (already handled):
- `disableKinds = ["taxonomy", "term"]` in `hugo.toml` — removes `/categories/` and `/tags/`
- `content/snippets/_index.md` with `build: render: never` cascade — removes `/snippets/` and all snippet URLs

If `/snippets/` or taxonomy pages reappear in the sitemap after an update, check those two settings first.

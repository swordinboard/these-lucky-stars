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

- ~~One broken link to a missing Tool Kits page.~~ **Resolved** — the page exists
  and `linkcheck.py` no longer excludes anything. **Zero broken links is now the
  expected result**; treat any at all as a failure.
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
label: "ARA-5"                # rare: a short name for tables when the title is unwieldy
id: abilities/rage            # unique; matches the file path under content/snippets/
category: [core]              # list: core | sci-fi | fantasy … (a block can be in several)
type: feature                 # rule | feature | equipment | creature | reference
tags: [ability, core, general]  # drives tag-as-query pulls and the builder's grouping
summary: "Enter an enraged state for a short duration."   # the quick-reference one-liner
requires: [abilities/charge]  # feature prerequisites — the builder auto-includes these
variant_group: field-ration   # optional: setting variants that share an identity
selectable: false             # optional: note/chrome blocks that ride along, never picked alone
excluded: true                # optional: not part of the buildable corpus at all
```

Snippets need no `headless` key: `content/snippets/_index.md` sets
`build: {render: never, list: never}` with a cascade, which is what actually
stops them publishing. `headless: true` sat on 423 files doing nothing and has
been removed.

`summary` and `label` are **single-sourced** — the quick-reference tables are
generated from them (see below), so edit them here and nowhere else. `label` is
deliberately rare (2 blocks): it exists only for names too long for a table cell,
like `Analgesic Radiation Antidote 5 (ARA-5)` → `ARA-5`. If a block needs a
different display name for any other reason, fix the title instead.

### Starting a new block

`_templates/` holds a fill-in-the-blank file for each kind of block, taken from
real blocks rather than invented. Copy one into
`content/snippets/<namespace>/<slug>.md` and fill it in. The files sit outside
`content/`, so Hugo never reads them and they never enter the corpus.

Each carries a comment explaining the decisions that kind of block involves —
delete the comment when you are done, since **a snippet must never end with an
HTML comment**.

### Feature prerequisites are written in three places

Each does a different job. Keep them separate; `worksheets.py` §C4 reports drift.

| Where | Job | Maintained |
|---|---|---|
| The prerequisite line in the block's text | what a reader sees | by hand — **load-bearing** |
| `requires:` in frontmatter | the mechanical rule the builder obeys | by hand, checked against the line |
| `- ` / `-- ` indents in a catalog | where a reader meets the entry | by hand |

The prerequisite line is the source of truth: `requires` is exactly the feature
links in it. That is a deliberate choice, so **a link losing its target changes
the builder's dependency data**. §C4 of the worksheets exists to catch it.

`requires` holds **features only**. Attributes (`AGI 2`), levels (`Level 5`),
items, and category conditions ("Proficiency with any tool kit", "one other
Battery ability") stay in the prose line — they are conditions on a character,
not blocks a PDF can contain. Battery Saboteur is the model: it records the one
named proficiency and leaves "one other Battery ability" to the text.

**The nesting is still not the dependency graph**, even though the two currently
agree on all 29 nested blocks. **39** `requires` point into a *different* list —
abilities depending on proficiencies or traits — and no index tree can show
those, because the parent is not on that page. Generating either from the other
would lose information in both directions.

**Two blocks may not share a title on the same page** — Hugo silently appends
`-1` to the second anchor, so a link that looked right yesterday lands in the
wrong place. Across different pages a shared title is legal but still ambiguous
for the PDF builder, which sees a flat list. Where a proficiency shared a name
with the item it applies to, the proficiency carries the suffix:
`Comp Jack Proficiency` (`#comp-jack-proficiency`) while the item stays
`Comp Jack`. The prose convention already read that way — "Comp Jack Proficiency,
KNO 1" — so the title now matches how the rule is spoken about.

One deliberate duplicate remains: `generic-equipment/field-ration` and
`sci-fi-equipment/field-ration` are the same item in two settings, tied together
by `variant_group: field-ration`. They live on different pages, so no anchor
collides.

**`[___]` never goes in a title, a heading or an anchor.** It marks a choice the
player makes (Weapon [___] → pick a weapon type), and it belongs in the block's
body, where every one of those blocks already restates its name as
`**Weapon [___]**`. In a heading it becomes part of the anchor
(`#restrained-___`) and quietly breaks every link to it. Inside a table cell it
is fine as long as it sits in the link *text* with a clean target:
`[Battery [___]](#battery)`.

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
   headings you intend to link to. Marker glyphs are a dead end generally — the Δ
   that used to flag attacker-advantage conditions broke seven anchor families,
   and was retired in favour of each condition simply saying so in its own text.

5. **Snippets are never published as pages.** `content/snippets/_index.md` sets
   `build: render: never` with a cascade — do not remove it.

---

## Collapsible entries (`details` vs the `blockdetails` shortcode)

Catalog pages wrap each block in a collapsible. **Use `blockdetails`:**

```
{{< blockdetails "generic-equipment/reinforced-boots" >}}
{{< blockdetails "generic-equipment/reinforced-boots" open >}}
```

The older two-part form still works and is still correct for the few
collapsibles that hold more than one block:

```
{{% details "Reinforced Boots" %}}

{{% include "/snippets/generic-equipment/reinforced-boots" %}}

{{% /details %}}
```

That form types the block's name once as a label and again as a path, and **the
label is not checked against the block**. It drifted: 10 of 320 labels disagreed
with the block they wrapped, two of them plain errors — a summary table row
reading "Reinforced Boots" opening an entry headed "Sturdy Boots", and a
"Fire-Startee" label on Fire-Starter.

318 of the 320 have been converted. The 2 that remain are on Vehicle Rules and
are **composite** — one collapsible holding two blocks, and one holding a
hand-written heading plus a block. `blockdetails` takes exactly one block, so
those keep the long form.

Rendered output is byte-identical between the two forms. Two differences that
matter:

- The `<summary>` label **cannot** drift from the entry it opens.
- A bad id **fails the build** with the id and calling page named, where
  `include` renders nothing at all (rule #2 above).

Note `<summary>` carries no `id` — for a details-wrapped block the heading
*inside* the snippet is what the anchor comes from, so that heading stays.

`builddata.py` reads `blockdetails` as a placement exactly like an include, so
`pages`, `page_urls`, anchors and include edges all come out the same. If you add
another shortcode that displays a block, teach `builddata.py` about it in the
same breath or the block will look unplaced.

When you add a new block to a page, reach for `blockdetails` first. Only fall
back to `details` + `include` when the collapsible genuinely holds more than one
block, or a heading the block does not own.

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

**Or choose the rows by property** — for module hubs and any table that should
pick up new blocks by itself:

```
{{< catalog category="sci-fi" namespace="abilities" header="Ability|Summary" />}}
{{< catalog type="equipment" page="/docs/free-srd/.../sci-fi-weapons/" />}}
```

Same filters as `blockset` (`category`, `namespace`, `type`, `tag`, `page`,
`wip="exclude"`, `order`). **Note the self-closing `/>}}`** — the hand-listed
form uses inner text, so Hugo insists the property form closes itself.

`page` takes a page URL and selects everything displayed there, which is how a
hub lists "the weapons page" without re-tagging anything. Pair it with
`type="equipment"` when the page also carries rules prose, or the table picks up
section blocks that have no summary and renders blank cells.

Links resolve per row: a block displayed on the current page gets `#anchor`, a
block living elsewhere gets its full URL. So a hub can list blocks it does not
render.

- The body is a list of **block IDs**, one per line, in display order.
- `- ` and `-- ` mark child / grandchild entries (rendered as `- ` and `– `).
- Each row's name, link, and blurb come from that block's `label`/`title`,
  anchor, and `summary`. **To change a table row, edit the block.**
- A typo'd ID renders as a visible `MISSING BLOCK: <id>` cell rather than
  failing the build — so scan new tables after adding them.

Tables are deliberately two columns (name + blurb). Extra columns that used to
exist (component Slot/Install, kit Cost/Wt) were dropped; that data is stated in
each item's own entry.

### `layout="names"` — a jump list rather than a table

Drops the summary column and flows linked names into responsive columns
(2 / 3 / 4, styled as `.block-index` in `assets/_custom.scss`). Use it where the
chart would end up longer than the entries it points at, or for a
jump-to-anchor index at the top of a page:

```
{{< catalog namespace="item-tags" layout="names" />}}
```

Child entries nest inside their parent's `<li>`, so column flow can never orphan
a prerequisite away from what it depends on.

This replaced the hand-written `<div class="four-col">` index on Item Tags —
which had drifted, listing Pressurized before Power Source and carrying `[___]`
on three entries the titles had long since dropped. `.four-col` is still used on
`character-creation-overview.md`; don't delete the styles.

**All six feature pages use it** — Abilities, Proficiencies and Traits, core and
sci-fi. Those six catalogs stay **hand-listed on purpose**: the `- ` / `-- `
indent is the prerequisite tree, and no property filter can produce it. A new
feature needs the catalog entry and the `blockdetails` placement added by hand;
the `_templates/feature-*.md` comments spell this out.

Note the trade: `layout="names"` prints no `summary`, so the feature pages no
longer show the one-liners. They are still live on the module hub tables and in
`data/blocks.json` — keep writing them.

---

## Work-in-progress pages (`wip: true`)

One frontmatter key marks a page unfinished:

```yaml
wip: true
```

Omit it and the page is finished — there is no `wip: false` to write. Setting it:

1. **Renders the notice banner** above the page content. The banner text lives in
   `layouts/_partials/docs/inject/content-before.html` and nowhere else — edit it
   there. (It is injected by the theme's `content-before` hook, so it sits outside
   `<article>`; that is why it no longer appears in the search index, which is an
   improvement — it used to match 13 pages.)
2. **Marks every block on the page `wip`** in `data/blocks.json`, so the PDF
   builder can exclude unfinished rules. A snippet shown on both a finished and an
   unfinished page is *not* marked wip.

`wip` is deliberately **independent of `bookHidden`**. Hiding a page from the nav
is an organisational choice (long pages that a list page links to instead); it
says nothing about whether the content is finished. WIP pages stay indexed and
searchable by design.

There is no `wip` *tag* — it was removed as redundant once the flag was computed.

---

## Canonical data (`data/blocks.json`, `data/edges.json`, `data/related.json`)

Generated from the content tree. Hugo loads `data/` automatically, so templates
can read `site.Data.blocks`; the Phase 4 PDF builder is the main intended
consumer. The only thing the live site reads today is `related.json`, via the
`related` shortcode.

**Regenerate after any structural content change:**

```
python3 _discovery/tools/builddata.py
```

- `blocks.json` — every block with its frontmatter, plus computed `anchor`,
  `pages` (every page it appears on), `in_degree`, and `source_page`.
- `related.json` — per-page Related lists derived from the edge graph (see
  below). Rebuilt with the other two.
- Each block also carries a computed `url` (where it is read on the site) and
  `owns_heading` (whether its own file supplies its heading).
- `edges.json` — every cross-reference: `dependency` (builder must auto-include
  the target — feature prerequisites), `reference` (stands alone but points at
  the target; the builder surfaces it as a fillable hole), `mention` (inert,
  outside the buildable corpus), `include` (composition: a page pulling a block).

`in_degree` is the measure of how heavily a block is depended on, recomputed
every run. There used to be an authored `reference` rating (high/medium/low)
beside it and a `tier` (core/supplement/module); both were dropped. `reference`
was a hand-kept copy of `in_degree`, and `tier` agreed with `category` on 425 of
436 blocks — two fields that nearly always agree will eventually disagree by
accident.

---

## Module pages (the `blockset` shortcode)

```
{{< blockset category="sci-fi" namespace="abilities" >}}
{{< blockset category="sci-fi" type="rule" wip="exclude" order="id" level="4" >}}
```

Where `{{% include %}}` names **one** block, `blockset` names a **set** by
property and renders every match in full from `data/blocks.json`. Filters
(AND-ed): `category`, `namespace`, `type`, `tag`, `wip="exclude"`; plus `order`
(`title` default, or `id`) and `level` (heading level for supplied headings,
default 3). `excluded: true` blocks never render.

This is how `sci-fi-module.md` is built. A new sci-fi ability appears there as
soon as the block exists — there is no list to update.

Two things it has to handle, and so will the PDF builder:

- **Section blocks carry no heading of their own.** 105 blocks have
  `owns_heading: false` in `blocks.json` — their heading lives on the host page.
  Anything re-assembling blocks somewhere else must supply the heading or the
  block arrives as anonymous prose.
- **Page-homed blocks** (races, bot platforms) are linked rather than inlined —
  they are whole pages, too big to repeat.

Because it prints block titles, a wrong `title:` becomes visible here first.
Titles should read as the name a *reader* sees, not as the id.

---

## Section index lists (the `children` shortcode)

A section `_index.md` whose whole body is a list of its children should call:

```
{{< children >}}
```

It lists the section's child pages **in nav order** (by `weight`), so the list and
the sidebar cannot disagree. `bookHidden` pages are skipped; drafts never reach
the template.

Generating these caught three drifts the hand-written lists had accumulated:
Character Creation still listed the old Proficiencies-before-Traits order,
Inventory & Equipment had two entries transposed and was missing Tool Kits
entirely, and Sci-Fi Equipment listed a curated order that the **nav was not
using** — all four of its children shared `weight: 2`, so Hugo was falling back
to title order. The weights are now distinct and both agree.

**Ties are the trap.** Equal weights among siblings mean Hugo orders by title,
which is rarely what a hand-written list says. If a generated list comes out in a
surprising order, look for a shared `weight` before anything else.

Three section indexes stay hand-written on purpose, and should:

- **Races** — its five children are all `bookHidden`, and the page groups them
  Core / Sci-Fi in columns.
- **Bots & Drones** — grouped into Drone and Robot platforms, with blurbs and a
  `*(TBD)*` entry for a platform that does not exist yet.
- **`docs/_index.md`** — three children with curated one-line blurbs.

`desc="true"` appends each child's `description`, but most descriptions here are
written for search engines and run far too long for a list. Check before using.

`builddata.py` resolves `{{< children >}}` the same way, so the section-index
edges stay in the graph. **Any new shortcode that emits links or places blocks
has to be taught to `builddata.py` in the same commit** — otherwise the graph
silently loses edges and blocks start looking orphaned. This has now bitten
twice: `blockdetails` and `children`.

---

## Related sections (the `related` shortcode)

```
## Related

{{< related >}}
```

Renders the page's Related list from `data/related.json`. Two pages are related
when blocks on one reference blocks homed on the other, in either direction;
outbound links count double in the ordering. Each row's blurb is the target
page's `description`, minus the SEO lead-in.

- Keep the markdown `## Related` heading in the page — the shortcode emits only
  the list, so the heading still reaches the table of contents.
- `{{< related limit="4" >}}` trims to the strongest N.
- It renders **nothing** when the page has no entry in `related.json`, so only
  place it where there is data. `builddata.py` prints how many pages have lists.

**The generated list is not a drop-in replacement for a hand-written one.** The
hand-written `## Related` lists on five core-rules pages encode where a reader
*should* go next, which the graph cannot know — it only sees where the prose
happens to link. `_discovery/04-phase3-worksheets.md` has the side-by-side.

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
| `worksheets.py` | Regenerate `_discovery/04-phase3-worksheets.md` (tags, orphans, implicit edges, Related comparison) |
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

Every section with visible children sets `bookCollapseSection: true`. **Races is
the deliberate exception** — all five race pages are `bookHidden: true`, so the
chevron would expand onto an empty list; the Races page lists them in its body
instead.

Character Creation is ordered by when you make the choice, not alphabetically:
**Races (10) → Traits (20) → Proficiencies (30) → Abilities (40)**, with the
overview at 1. If you add a step, weight it where the player meets it.

Each of Abilities, Proficiencies and Traits opens with a short "this page is the
core selection" line and links to its setting-specific child page, because those
children are one click behind a collapsed nav section. That line goes **after the
overview snippet and before the catalog** — and on Abilities, which is the only
feature page still using tabs, it goes *outside* the tabs block. Nothing but
catalogs belongs inside a tabs block.

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
- Shortcodes available: `include`, `blockdetails`, `catalog`, `blockset`, `children`,
  `related`, `download-card`, `columns`, `roadmap`, `quickref` — all in
  `layouts/_shortcodes/`,
  plus `details` / `tabs` / `tab` from the theme
- **Every one of those files opens with a SIGNATURE / EXAMPLE / ARGUMENTS block**
  naming each part of the call. Read the top of the file rather than guessing from
  a call site, and keep that block current when you change a shortcode.
- `quickref` is defined but **unused** — it duplicates `details`. Retired by disuse;
  the file stays available. Use `blockdetails`.
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

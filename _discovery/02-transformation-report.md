# 02 — Transformation Report (Phase 2, complete)

Phase 2 executed the block model finalized by the queue rulings. The site's
content is now **438 addressable blocks**: 423 snippet files under
`content/snippets/<ns>/<slug>.md` and 15 page-as-block pages, every one
carrying block frontmatter. Docs pages are composition shells (headings,
tables, details/tabs wrappers, and `include` pulls). Canonical machine data
for the Phase 4 builder lives in **`data/blocks.json`** and
**`data/edges.json`**; `_discovery/` (minus this report) is frozen as the
Phase 1 record.

## What was done, by commit

1. **Wave 0** — tooling committed to `_discovery/tools/` (extractor, model
   generator, verifier; Wave scripts).
2. **Wave 1 — content fixes** (the only text edits in the whole phase):
   - Removed ` Δ` from the 7 condition headings, so `#crippled`-style anchors
     resolve site-wide. Δ remains in the summary table and details labels;
     the explainer line was updated to match.
   - Added the **Prone** condition (text supplied in the queue notes, typos
     cleaned) with a Δ table row; the three dead `#prone` links now resolve.
   - Moved **Dead Battery** out of the Android page into
     `snippets/conditions/dead-battery.md` with a real heading (now linkable);
     the Android page includes it in place.
   - Fixed every Queue 3 broken link per the annotations (wrong slugs, missing
     `#`, typos, renamed anchors, the mangled item-tags URL, `hakr`→`trk-a`,
     medical-supplies paths, `#extra-dual-attack`, the malformed link markdown
     at vehicle-rules:44). Burn/Shock links retargeted to
     Combat → Damage Types. Also: the Restrained table link now points to the
     real `#restrained-___` anchor.
3. **Wave 2** — the 27 existing snippets moved (git mv) into namespace
   directories matching their block IDs; all includes normalized to
   `{{% include "/snippets/<ns>/<slug>" %}}`.
4. **Wave 3** — 397 blocks extracted verbatim into snippets and replaced with
   includes. Ruled shapes honored: merged Attacking-and-Defending and Damage
   blocks on Combat plus individual blocks for the 9 unsnippeted catalog
   actions; single Environmental Effects block; Pouch Sets → 3 blocks,
   Bandages → 2, Signal Masts → 2 (page now shows per-item details).
5. **Wave 4** — block frontmatter everywhere; `data/` JSONs generated from the
   transformed tree with final edge types.

## The numbers

- **Blocks: 438** (423 snippets, 15 page-as-block). All frontmatter parses;
  IDs unique; every snippet is included on at least one page (zero orphans).
- **Edges: 1,246** — 685 `reference`, 469 `include` (composition), 75
  `dependency` (feature prerequisites, per ruling — mirrored as `requires:` in
  52 blocks' frontmatter), 17 `mention` (incl. the 2 exclusivity pairs ruled
  inert). Zero queued.
- **Broken links remaining: exactly 1**, by design — the `tool-kits/` pointer
  in generic-equipment (a generic kits page is planned; see below).

## Builder groundwork (post-Wave-5, additive)

Two data additions were made to support the Phase 4 builder's list-generation,
both derived and additive (no rules text touched; composed page bodies remain
byte-identical to baseline):

- **`summary:` on 298 catalog blocks.** Each ability/proficiency/trait/item
  block now carries its own one-line summary, harvested from the shell-page
  quick-reference tables (where those one-liners previously lived, divorced from
  the block). The summary column is picked by table header
  (Description / Notes / Effect Summary), so the conditions table contributes
  its Effect column, not Duration. This lets the builder regenerate a
  quick-reference list for *any* selection instead of relying on the static
  page tables. Harvester: `_discovery/tools/harvest.py`. Source of truth is the
  block frontmatter; `data/blocks.json` mirrors it.
- **Reference-table audit result: no stranded tables.** Every data table is
  either inside a block or is a *projection* over blocks (e.g. the Wound Types
  table links to the wound-type blocks). So the builder's two synthesis modes
  cover everything: full-section pages render their chrome tables as-authored;
  block-mode selections regenerate the projection tables from the picked set +
  `summary`. No tables need promoting to standalone blocks to prevent loss.

Also fixed here: `extract.py` was stripping `_` as markdown emphasis when
computing heading anchors, mis-deriving the `Restrained [___]` anchor
(`restrained-` instead of the real `restrained-___`). The live site was always
correct — only the tooling's anchor map was off — but it's now fixed so
`data/edges.json` resolves that reference cleanly.

## CORRECTION — content loss found and fixed after Wave 5

**Wave 5's "0 broken links / nothing lost" claim was not fully sound.** Two
verification gaps let a real regression through, both now closed:

1. `verify.py` compares *composed markdown source*. Source was identical — but
   markdown that is byte-identical can still **render** differently once it is
   split across `include` boundaries. Source equivalence is necessary, not
   sufficient.
2. The Wave 5 rendered-HTML link scan used quoted-attribute regexes
   (`href="…"`), but `hugo --minify` strips those quotes. It therefore matched
   nothing and reported zero broken links trivially — a false pass.

**What was actually lost:** the entire **Mounts** section of Vehicle Rules —
the `## Mounts` heading plus every mount rule (equipment-vs-allies, mount
features, unwilling mounts, mounts and impact/overrun, sudden stops) — rendered
in the pre-transform baseline but silently vanished from the built site after
extraction. Roughly 30 text segments.

**Root cause (a bug class, not a one-off):** an HTML comment at the *end* of a
snippet. `{{% include %}}` re-parses the snippet's rendered output as markdown;
a trailing comment opens an HTML block that swallows the page content following
the include. The parked/commented-out collision examples had ridden along into
`snippets/vehicles/collision-damage.md` during extraction.

**Fix:** the parked examples were moved back to the page frame
(`vehicle-rules.md`, their baseline location), preserved verbatim and still
hidden. Mounts renders again. `gear/components/shield-mount.md` also contains a
comment but is safe — it sits mid-snippet with content after it, inside a
`details` wrapper.

**New guards (in `_discovery/tools/`):**
- `rendercheck.py` — compares **rendered visible text** of two builds per page.
  This is the real no-loss check; run it against a baseline build after any
  structural change.
- `linkcheck.py` — broken link/anchor scan with quote-optional regexes, so it
  works on minified HTML.
- `snippetlint.py` — fails if any snippet ends with an HTML comment.

**Post-fix state:** rendered-text diff vs the pre-transform baseline shows only
the intended changes (Δ heading removal, Prone addition, the pouch/bandage and
signal-mast splits, and the deliberately dropped table columns below). Every
piece of underlying content was individually confirmed still present on the
rendered pages. `linkcheck` and `snippetlint` both pass clean.

## Simplified multi-column catalog tables

The two remaining multi-column tables were reduced to Name + blurb, per ruling,
and now render from frontmatter like the rest:

- **Components** quick reference — dropped `Slot` and `Install`.
- **Kits** table (inside the `kit-supplies` block) — dropped `Cost` and `Wt`.

No data was lost: every dropped value is stated in each item's own entry (e.g.
`*–Cr — 0lbs — Head — Internal*`, `*200Cr — 12lbs — Bulky*`), verified on the
rendered pages. The kits table also proves the `catalog` shortcode works inside
an included snippet.

**Data conflict this surfaced:** the components table listed **Backup Power
Cell** as slot `Back`, while the block says `Belt` (twice — stat line and body).
Dropping the column resolves it to the block's value, `Belt`. Flagged in case
`Back` was the intended rule.

## Single-sourced catalog tables (`catalog` shortcode)

The quick-reference tables no longer hand-type the summary text — they render
it from each block's frontmatter, so a summary is edited in exactly one place
(the block snippet) and the table follows.

- **`layouts/_shortcodes/catalog.html`** takes a newline list of block IDs
  (with `- ` / `-- ` marking sub-entries) and renders the table, pulling
  `title` (or `label`), `summary`, and the on-page anchor (`anchorize title`)
  from each block. `summary` is run through inline markdown so typography
  (curly quotes, dashes) matches the rest of the page.
- **`label:`** frontmatter was added to 12 blocks whose table display name
  differs from their heading title — the `[___]` selection markers
  (`Weapon [___]`, `Student [___]`…) and short forms (`ARA-5`). The heading/
  anchor still come from `title`; `label` is display-only. Single-sourced like
  `summary`.
- **30 tables across 7 pages converted** (abilities, proficiencies, traits,
  generic-equipment, sci-fi-weapons, sci-fi-armor, sci-fi-misc-equipment).
  Verified: rendered rows are semantically identical to the pre-conversion
  build — same names, links, summaries, order, and parent/child indentation
  (0 mismatches across 267 rows).
- **Converter:** `_discovery/tools/tablesync.py` (drives the rewrite from the
  existing rows so order/hierarchy are exact; also captures the labels).

**Not converted (flagged):** multi-column catalog tables need extra frontmatter
fields before they can be single-sourced — the **components** quick-reference
(Component | Slot | Install | Notes) and the **kits** table (Kit | Cost | Wt |
Notes, which lives inside the `kit-supplies` block). The item-tags page uses a
`four-col` link list, not a table, so it has no summary column to source.

**Verification note:** because these 7 pages replaced table *markdown* with a
shortcode, `verify.py` (which diffs composed markdown source against the
pre-transform baseline) will now legitimately report their table regions as
changed. That is by design — the correct check for these pages is
rendered-HTML equivalence (done above), not source equivalence.

**Source typo surfaced:** the Pouch Set, Standard block heading reads
"standard" (lowercase); the label preserves the correct "Standard" display.
Minor — noted for the Phase 3 content pass.

## Frontmatter schema (as written)

```yaml
title: "Rage"
id: character/abilities/rage
category: [core]          # list; multi-setting allowed per ruling
type: feature             # rule | feature | equipment | creature | reference
tier: core                # core | supplement | module
reference: medium         # high | medium | low, computed from inbound edges
tags: [ability, core, general]
summary: "Enter an enraged state for a short duration."  # quick-ref one-liner
label: "Student [___]"    # catalog display name when it differs from title
selectable: false         # only on note/chrome blocks (default true, omitted)
excluded: true            # only on corpus-excluded blocks (announcements, license)
requires: [character/abilities/charge]        # feature prerequisites (builder auto-include)
variant_group: field-ration         # setting variants sharing an identity
headless: true
```

Page-as-block pages carry the same keys (minus `headless`) alongside their
existing page frontmatter.

## No-loss verification (the thing that matters)

`_discovery/tools/verify.py` composes every docs page by recursively resolving
includes, normalizes whitespace/comments, and diffs against the pre-transform
baseline (`a38a406`). Result: **the 397 extractions produce byte-equivalent
composed text**. The only changed lines (108, across 16 pages) are the
approved Wave 1 fixes plus exactly two ruled text replacements:

1. Stats page Wounds & Conditions summary → one-line pointer (single-ID dedup
   with `rules/wounds/overview`; the old summary wording is preserved in git history).
2. Grouped details labels ("Pouch Sets" → "Pouch Set, Ammo" etc.) from the
   ruled splits.

Nothing else was removed, reworded, or dropped.

Additional checks, all green: every include target exists (Hugo fails
*silently* on bad includes, so this is scripted); frontmatter parses; IDs
unique; link scan finds only the one flagged URL. Build verification: Netlify
pins Hugo 0.148.1 extended (`netlify.toml`), so the push builds there; a local
0.148.1 build was also attempted (see final commit message for result).

## Flagged for Phase 3 (nothing here was changed)

- **`tool-kits/` hole** — generic-equipment points at a generic Tool Kits page
  that doesn't exist yet (kits are currently sci-fi-only). Left broken per
  ruling.
- **Burn/Shock in weapon tag lists** — three weapon stat lines list Burn/Shock
  alongside real item tags, redundant with their own `Damage Type:` line. The
  links now point at Damage Types, but whether the tag-list entries should stay
  is a content call.
- **`traits/racial-traits`** — flagged `needs-review` in blocks.json: possibly
  obsolete since the Races section landed; check it points at Races, not at
  racial traits that no longer exist.
- **Vehicle Rules page framing** — the "reiterated here" details-wrapped speed
  section remains page frame (nothing extracted from it); you noted the
  Related-blocks style may be the better pattern. Restyle in Phase 3 with the
  rest of the WIP page.
- **Robot/drone/Android consolidation** — your Queue 5 note calls the current
  split "a mess"; the blocks are in place either way (rules/bots/automated-machines,
  rules/conditions/dead-battery, races/android) for a Phase 3 content pass.
- **Content bugs left untouched** (need design calls): Student/Expert require
  "INT" (system has KNO); Shock Charger table +2 vs text +1; Squad Shield
  table 30 vs text 40; Fast Kit Trap 12 AP vs Kit Trap 20 AP.
- **`computers` tag** — seeded on the comp-jack cluster (item, proficiency,
  internal component, data spike, Ghost Protocol, Rigged Comp Jack, Signal
  Intelligence, Computer Systems). Phase 3's manual tag pass should confirm
  membership.

## For Phase 3's nav rebuild

The docs pages are now thin shells, so reorganizing reads/nav means moving
include lines, not prose. Two structural facts to keep in mind:

- `include` renders with **no wrapper and no error on a bad path** — after any
  page restructure, re-run `_discovery/tools/verify.py` (include-target check)
  before trusting a build.
- Snippet heading levels are literal: a block extracted from an `###` context
  carries `###` with it. Re-homing a block under a different heading depth is
  a visual change to check on the page.

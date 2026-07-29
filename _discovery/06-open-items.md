# Open items

Everything outstanding, in one place. The Phase 1–3 decision docs (`03`, `05`)
are records of *decisions*; this is the running list of *work*. Annotate it the
way you did the queues.

Last synced against the tree at `33411b3`.

---

## 1. Must happen before this merges to `main`

These would do visible damage on the live site.

- [ ] **`draft: true` on the three parked module pages.** `medieval-module.md`,
      `modern-module.md`, `frontier--industry-module.md` are `wip: true` so they
      preview. Left live they publish URLs for modules that do not exist and put
      them in the sitemap. *One line each, say when.*
- [ ] **Decide the Medieval/Modern/Frontier duplication.** There are now two
      parked things per future setting: the equipment stubs at
      `inventory--equipment/<setting>-equipment/` (already `draft: true`) and the
      new module pages at `free-srd/<setting>-module.md`. Both are placeholders
      for the same setting. Keep both, or drop the equipment stubs and let the
      module page be the only placeholder until there is content?

## 2. Content gaps the generated tables now expose

- [ ] **9 blocks render a blank summary cell** — the 4 bot platforms (BAL, HEL-1,
      T00L, TRK-A) and the 5 races. Both sets are WIP stubs, so this is writing,
      not fixing. Tracked live by `worksheets.py`.
- [ ] **B1 — Student / Expert require "INT"**, but the system has KNO.
- [ ] **B2 — Shock Charger**: summary said +2, rules text says +1.
- [ ] **B3 — Squad Shield**: summary said 30pts, rules text says 40.
- [ ] **B4 — Fast Kit Trap**: 12 AP retrieval vs Kit Trap's 20 — discount or typo?
- [ ] **B5 — Backup Power Cell**: old table said Back, block says Belt twice.
      Currently resolves to Belt.
- [ ] **B9 — the Tool Kits hole.** `generic-equipment.md` links to a generic Tool
      Kits page that does not exist. The one intentionally broken link; excluded
      by name in `linkcheck.py`. Remove that exclusion when the page lands.

## 3. Parked features

- [ ] **Related section generation.** `{{< related >}}` works and runs live on
      Vehicle Rules, but the generated list loses the editorial intent of the
      five hand-written ones — it knows what links where, not where a reader
      *should* go next. Side-by-side comparison is in `04-phase3-worksheets.md`.
      Needs a think, not a script.
- [ ] **A4 — generated section index lists.** The hand-written bullet lists on
      each section `_index.md` are duplicated nav. You said wait until the nav
      settled; it now has, apart from Move 1 below.
      *Precedent set:* the Item Tags jump list is now
      `{{< catalog namespace="item-tags" layout="names" />}}`. It had already
      drifted from the blocks it pointed at — wrong sort order, and `[___]` on
      three entries the titles had dropped — which is the argument for doing the
      rest.

## 4. Structure still on the table

- [x] ~~Races: split like the others?~~ **Intentionally not split** — races have
      a different setup, one page per race behind a hub.
- [ ] **Page-per-feature (the wiki model).** Whether abilities/proficiencies/
      traits each become their own page like races do. Measurements and the
      argument are in the section below.
- [ ] **Move 1 — sci-fi equipment under the module.** 6 pages, 36 links across 19
      files, 1 wildcard redirect. *Recommendation: do it when the other module
      catalogs go live, so it is one move instead of two.*
- [ ] **Move 3 — bots & drones into a creatures section.** Agreed in principle;
      waiting until there is a second kind of creature so the section is not a
      folder with four robots in it.

## 5. Audits prepared, awaiting your review

All in `_discovery/04-phase3-worksheets.md`; regenerate with `worksheets.py`.

- [ ] **C1 — tag membership.** 63 tags with their member lists. Scan for holes;
      tags are the query surface the PDF builder will use.
- [ ] **C2 — orphans and implicit edges.** 81 rule/reference blocks nothing links
      to, plus the 18 rule couplings that have no link in the prose.
- [ ] **C3 — self-containment re-check.** Blocks have moved a lot since Queue 2;
      the ones most likely to lean on their old page context want a re-read.

## 5b. Page-per-feature — the wiki question

The reference for this is the d20 3.5 SRD feats index: every feature on its own
page, one hub page listing them. Two separable ideas came out of it.

**The compact index** is done and previewable: `{{< catalog layout="names" />}}`
drops the summary column and flows linked names into columns. It is on both
Abilities pages; Proficiencies and Traits still use tables, so the two styles can
be compared directly.

**A page per feature** is the bigger half, and the numbers argue for care:

| | |
|---|---|
| Pages created | **114** (76 abilities, 18 proficiencies, 20 traits) |
| Site page count | 59 → ~173 |
| Inbound links to rewrite | 34, across 34 files |
| Median block length | **46 words** |
| Blocks under 40 words | **44 of 114** — `traits/alert` is 10 words |

Races justify their own pages because artwork and lore are coming. A 10-word
trait does not obviously want a page of its own, and a page that thin reads worse
than a row in a list. The three namespaces may also deserve different answers:
abilities are the longest and most numerous, traits the shortest.

Nothing about this is blocked — the blocks are already separate files, so it is a
relocation, not a rewrite. Worth deciding after the compact index is seen live.

## 5c. `requires` and the prerequisite line — settled

The prerequisite line is **load-bearing**, by decision: `requires` is exactly the
feature links in it, and a link losing its target would change the builder's
dependency data. Accepted knowingly; §C4 of the worksheets reports any drift.

`requires` stays hand-written for now rather than generated — it is authorable
and reviewable in the block, and the check already guarantees the two agree.
Switching to generated remains available and would need no content change.

Three real errors were found this way and fixed:

- `slip-strike` was nested under Momentum Dodge but requires Agile Dodge; it
  modifies either, so it now sits beside Momentum Dodge under Agile Dodge.
- `long-performance` and `fast-kit-trap` never named the ability they modify in
  their prerequisite lines, which is why the generated `requires` missed it too.
  Both lines and both `requires` now record it.

The nesting and `requires` agree on all 29 nested blocks.

## 5d. Where a block's name is typed — the drift surface

The question asked was whether blocks should carry **no heading at all**, just
`title`, with the heading generated at render time. Measured answer: it works,
but it is aimed at the wrong target.

**It works.** `include` uses the percent form, so a heading generated inside the
shortcode is re-parsed as markdown — real auto-ID, present in `.TableOfContents`.
And all **319** snippet headings match their `title` character-for-character, so
generated headings would reproduce every existing anchor exactly. Zero link
breakage. (The other 12 `owns_heading` blocks are page-as-block pages — races,
size, legal, the four bots — whose heading is the page H1 and out of scope.)

**The builder does not need it.** `owns_heading` + `title` already lets the
builder print every block the same way (§8). Flipping would delete a special
case, nothing more.

**But the name is typed in three places, and only one of them is in the block:**

| Where | Count |
|---|---|
| The snippet's own `#` heading | 319 |
| A page heading directly above the include | 97 |
| A `{{% details "Name" %}}` label wrapping the include | 320 |

The snippet headings have never drifted. The **details labels have — 10 of 320
disagreed with the block they wrap.** Two were plain bugs (`Sturdy Boots` →
Reinforced Boots; `Fire-Startee` → Fire-Starter). Eight are now resolved and two
are held pending review of the WIP page they sit on:

Six of the eight remaining are now resolved, by your call:

- `item-tags.md` ×4 — `[___]` removed from the labels, and from the three
  hand-written index links at the top of the page that still carried it. No
  `[___]` remains anywhere outside snippet body prose, where it is the
  deliberate fill-in-the-blank marker.
- `sci-fi-kits.md` — the kit **displays its full name**: block title and heading
  are now `Breaking and Entering Kit`. The anchor moved `#be-kit` →
  `#breaking-and-entering-kit`; nothing hand-links it, and the two references
  (the kit-supplies catalog and the Sci-Fi Module hub) are generated and
  followed automatically. `B&E Kit` survives in prose and in the proficiency
  name, which reads fine as an abbreviation of a name now stated in full.
- `sci-fi-misc-equipment.md` — label is `Fuel Cells`, matching the item. The
  singular `Fuel Cell` stays as the name of the *tag*, which is a different
  block.

- [ ] **2 label disagreements left, both on `vehicle-rules.md` (WIP, held for
      review):** `Speed Tiers` vs title `Speed Tiers Chart`, and
      `Modes & Maneuverability` vs title `Speed Descriptors`. **These are exactly
      the §8 "never rendered, never proofread" titles** — the label is what a
      reader sees, the title is what the builder would print, and they say
      different things.

**The narrower change, recommended over the full flip:**

- [x] ~~**Feed the `details` label from the block.**~~ **Done — the mechanism
      exists**, as `{{< blockdetails "block/id" >}}`. Rendered output verified
      byte-identical to the two-part form, and a bad id now fails the build
      instead of rendering nothing. `builddata.py` reads it as a placement, so
      `pages`/`page_urls`/anchors/edges are unaffected.
- [ ] **Convert the 320 call sites to `blockdetails`.** Mechanical; both forms
      work, so this can be one pass or opportunistic. Removes 320 hand-typed
      labels and 320 hand-typed snippet paths. Run the preflight after — the
      rendered-text diff is the proof.
- [ ] **Delete page headings that duplicate the block heading below them.** 97
      includes have a heading directly above (h1 ×7, h2 ×41, h3 ×40, h4 ×9);
      some of the h2s are genuine group headings ("Aggressive Actions") and stay.

The full flip stays available and would need no content change to adopt later.
Its costs, for the record: 319 snippets edited, ~97 page headings deleted, a
`level=` argument at every call site, a silently-failing include would lose the
heading as well as the content, and a raw snippet stops reading as a document.

## 6. Chrome

- [ ] **"How this SRD is organized"** — a short explanation of blocks and modules
      for readers. You suggested the Free SRD index or the landing page.
- [ ] **Section landing pages** — your call was that the ones not reached by nav
      stay link lists. The new `abilities/`, `proficiencies/` and `traits/`
      section indexes are reached by nav and currently open straight into the
      core content, which reads fine — worth a look on the preview.
- [ ] **Builder announcement page** — not until there is a beta.
- [ ] **`quickref` shortcode** — defined, unused, duplicates `details`. Parked by
      your call; delete it if it is still unused when this is done.

## 7. Playtest / revisit

- [ ] **Restrained and attacker advantage.** Removed for testing. One line in
      `conditions/restrained.md` plus the matching summary-table row in
      `conditions/overview.md` if it goes back.

## 8. Phase 4

- [ ] **The PDF builder.** Everything above is groundwork for it. What exists
      already: `data/blocks.json` with `wip`, `owns_heading`, `url`, `page_urls`
      and `requires`; `data/edges.json` with dependency/reference/include edges;
      and `{{< blockset >}}`, which performs the builder's core operation —
      select blocks by property, assemble into a larger one — on the live site.

### Headings, when a GM rearranges blocks

Worth settling before the builder prints anything. Measured, in `04-…§C5`:

- **319 blocks own a heading and hard-code its level** — 298 at `h3`, 20 at `h4`,
  1 at `h2`. Put one of those at a different depth in an assembled document and
  the level is wrong, and the markdown cannot bend.
- **104 blocks own no heading** and carry only `title`. Those are the *flexible*
  ones — whatever renders them picks the level.

So the shape that looked like the liability is the one that behaves, and the
majority is the constrained set. **The builder should print every block the same
way: take `title`, choose the level from where the GM placed it, and skip the
block's own leading heading when `owns_heading` is true.** No content change
needed — `owns_heading` + `title` is exactly the pair that makes it possible.

- [ ] **15 section-block titles have never been rendered anywhere** (§C5). They
      sit under a shared group heading — "Aggressive Actions" over Standard
      Attack, Disarm, Grapple and the rest — so the block's own title has never
      been proofread by being read. This is how `sci-fi/huds` printed "Huds".
      Most read fine; `movement/speed-tiers-chart` under "Speed Tiers" is the
      one I would look at first — see §5d, where the same two blocks turn up as
      details-label disagreements.

---

## Done since the restructure began

Kept short; the commit messages carry the detail.

- Blocks extracted, frontmatter written, canonical data generated and rebuildable
- Quick-reference tables single-sourced from `summary`
- `wip: true` as one toggle; `tier` and `reference` dropped
- Δ retired; `[___]` out of every title, label and anchor
- Four proficiencies disambiguated from the items they share a name with
- `catalog` gained property selection and cross-page links; `blockset` and
  `related` added
- Sci-Fi Module page built as quick reference, nothing rendered twice
- Character options split per module (Option 3)
- Preflight: build, snippet lint, link check, data freshness, rendered-text diff

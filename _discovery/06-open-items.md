# Open items

Everything outstanding, in one place. The Phase 1–3 decision docs (`03`, `05`)
are records of *decisions*; this is the running list of *work*. Annotate it the
way you did the queues.

Last synced against the tree at `ef2c2a2`.

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

## 4. Structure still on the table

- [ ] **Races: split like the others?** Abilities, Proficiencies and Traits now
      have a core page and a sci-fi child. Races has one index and six hidden
      pages. Splitting it would finish the pattern; leaving it is defensible
      since each race is already its own page.
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

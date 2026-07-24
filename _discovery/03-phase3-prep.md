# Phase 3 — Prep / Decision Sheet

Phase 3 = **reorganize the blocks so the site reads well, rebuild the nav for the
long-term structure, audit every block for missing tags/references, and add the
chrome needed to make it all legible** — and in doing so, surface the holes.

This file is the input list. Annotate it the way you did the Phase 1 queues
(inline `<!-- comments -->` are fine); I'll work from your notes.

Nothing here is started. Current state: 438 blocks, 979 edges, preflight green.

---

## A. Structural decisions — these block everything else

### A1. Module separation — the biggest call ⚠

Today the SRD is **one tree with sci-fi mixed in**: 292 `core` blocks, 146
`sci-fi` blocks. The sci-fi content sits inside the core structure:

- `core-rules/sci-fi-additions.md` — 5 sci-fi blocks (ballistics in space,
  comms, computer systems, energy shields, HUDs)
- `core-rules/environmental-effects.md` — extreme environments (sci-fi) inside a
  core page
- `inventory--equipment/sci-fi-equipment/` — the whole sci-fi catalog
- `character-creation/` — 4 sci-fi races, 3 sci-fi traits, 3 sci-fi
  proficiencies, 20 sci-fi abilities, all interleaved with core ones in tabs

But the repo also contains **empty draft stubs that imply a different future**:
`sci-fi-module.md`, and equipment stubs for `medieval-equipment/`,
`modern-equipment/`, `frontier--industry-equipment/`.

**Decide:** does the nav stay one interleaved SRD, or split into
`Core Rules` + `Sci-Fi Module` (+ future modules) as sibling trees?

| Option | Reads like | Cost |
|---|---|---|
| **Keep interleaved** (status quo) | one book; sci-fi marked by tabs/labels | no restructure; but adding Fantasy later means a third interleaving, and tabs get crowded |
| **Split by module** | Core book + module books | big nav move; every module page is a shell pulling the same blocks, so *content* doesn't move — only presentation. Matches the draft stubs and the "set the dial to your setting" pitch |
| **Hybrid** | core rules interleaved, *equipment + character options* split by module | moderate; matches where the volume actually is (146 sci-fi blocks are mostly equipment/features) |

This decision determines the entire nav rebuild, so it comes first.
*My lean: hybrid — core mechanics read better as one book, but catalogs are
where module separation pays off.*

### A2. WIP content policy

**19 blocks are tagged `wip`:** all 11 Vehicle Rules blocks, 4 races
(Android, Reptilian, Star-Touched, Zeta Grey), 4 bot/drone platform stubs.

The 4 bot stubs are near-empty (one sentence each). Vehicle Rules is
substantial but typo-heavy and you've said the style is unsettled.

**Decide:** in the rebuilt nav, do WIP pages (a) stay in place with the banner,
(b) move under a "Previews" / "In Development" section, or (c) get
`bookHidden` until finished? Also: should `wip` become a *builder* exclusion
(so a GM's PDF can't pull half-written rules), or stay purely informational?

### A3. Nav order — and two live bugs to fix

**Bug 1: weight collision.** `races/_index.md` and `traits.md` are both
`weight: 10` inside Character Creation, so their relative order is undefined.

**Bug 2: hand-written lists disagree with nav order.** Each section `_index.md`
has a manual bullet list that doesn't match the weights:

| Section | Hand-written list order | Actual nav order (by weight) |
|---|---|---|
| Character Creation | Overview, Races, Proficiencies, Abilities, Traits | Overview, Races/Traits (tied), Proficiencies, Abilities |
| Inventory & Equipment | Inventory, Equipment Overview, Generic, Item Tags, Sci-Fi | Equipment Overview, Inventory, Item Tags, Generic, Sci-Fi |

Core Rules' list *does* match its weights (10→90).

**Decide:** the intended reading order per section. Give me the order and I'll
set weights to match and fix the lists (or generate them — see A4).

Also worth a look: `docs/free-srd/_index.md` is `weight: 20` while its siblings
are Roadmap 10, Downloads 30, Legal 100 — so the SRD sits between Roadmap and
Downloads at the top level. Intentional?

### A4. Section index lists: generate or hand-maintain?

Those bullet lists on each section `_index.md` are **duplicated nav** — the same
dual-maintenance problem the summary tables had. Hugo can generate them from the
section's child pages (title + `description` + weight order), so they can never
drift again.

**Decide:** generate them (recommended — same reasoning as the `catalog`
shortcode), or keep hand-written for editorial control over blurbs?

---

## B. Content decisions — rules calls only you can make

These are all recorded but untouched. Each is small; none is mechanical.

| # | Item | The conflict | Where |
|---|---|---|---|
| B1 | **Student / Expert require "INT"** | The system has KNO, not INT | `abilities/student`, `abilities/expert` |
| B2 | **Shock Charger damage** | Summary said +2, rules text says +1 | `sci-fi-equipment/shock-charger` |
| B3 | **Squad Shield pool** | Summary said 30pts, rules text says 40 | `sci-fi-equipment/squad-shield` |
| B4 | **Fast Kit Trap retrieval** | 12 AP vs Kit Trap's 20 AP — intended discount or typo? | `abilities/fast-kit-trap` |
| B5 | **Backup Power Cell slot** | Old table said Back; block says Belt (twice). Now resolves to Belt | `components/backup-power-cell` |
| B6 | **Pouch Set, Standard** | Heading reads lowercase "standard" | `generic-equipment/pouch-set-standard` |

### B7. `traits/racial-traits` — obsolete?

Flagged `needs-review`. It describes the `[Racial]` optional trait list, which
predates the Races section. Does it still describe live rules, should it point at
Races, or should it go?

### B8. Robot / drone / Android consolidation

Your words: *"the whole robot/drone/android thing is a mess and needs
simplification."* The pieces are now cleanly separated as blocks —
`bots/automated-machines` (the taxonomy), `conditions/dead-battery`,
`races/android`, `components/*`, and the 4 platform stubs — so this is now a
content/structure call rather than an untangling job.

**Decide:** is Android a playable race, a creature type, or both? That answer
drives where those blocks live in the nav.

### B9. The `tool-kits` hole

`generic-equipment.md` links to a generic Tool Kits page that doesn't exist
(kits are sci-fi-only today). This is the one intentionally-broken link, excluded
by name in `linkcheck.py`.

**Decide:** write a generic Tool Kits page, retarget the link to the sci-fi kits
page, or drop the sentence. (If you write the page, remove the exclusion from
`linkcheck.py` so it stops being a blind spot.)

### B10. Burn / Shock in weapon tag lists

Three weapon stat lines list Burn/Shock alongside real item tags, redundant with
their own `Damage Type:` line. The links now point at Combat → Damage Types.

**Decide:** leave the redundancy, or strip Burn/Shock from the tag lists?

---

## C. Audits I can prepare for you

These I can generate; you review. Say which you want and I'll produce the
worksheets before we start editing.

### C1. Tag completeness worksheet
Per-tag member lists (like Queue 4) rebuilt against the *current* 438 blocks, so
you can scan for holes. Specific things to confirm:
- `computers` — I seeded this on the comp-jack cluster (item, proficiency,
  internal component, data spike, Ghost Protocol, Rigged Comp Jack, Signal
  Intelligence, Computer Systems). Right membership?
- `attacker-advantage` — added to the 8 Δ conditions. Complete?
- `melee-weapon` / `ranged-weapon` — added to weapon blocks. Complete?
- Blocks whose only tags are structural (`equipment, sci-fi`) and may need a
  functional tag to be findable in a tag-as-query pull.

### C2. Reference / edge review
- 418 `reference` edges, 75 `dependency`, 17 `mention`, 18 implicit.
- Worth a pass on the **implicit** ones (`_discovery/tools/implicit-edges.json`)
  — those are rule couplings with no link in the prose, so they're invisible
  while reading. Should some become real in-text links?
- Blocks with `in_degree: 0` that aren't overviews — genuinely standalone, or
  orphaned by a link that should exist?

### C3. Self-containment re-check
Queue 2's original list is resolved, but blocks have moved since. A re-read of
the ~30 blocks most likely to lean on their old page context.

---

## D. Chrome / fluff (the "make it make sense" pass)

Last, once structure is settled:

- **"Related" sections are inconsistent.** 5 core-rules pages have a `## Related`
  footer; Vehicle Rules instead uses inline *"Direct from Action Economy"* framing
  (3 instances), which you've said you like less. Standardize on `## Related`?
  Note these could also be **generated from `data/edges.json`** rather than
  hand-written — the graph already knows what each page's blocks point at.
- **Section landing pages** — do the module/section index pages need real
  orientation prose, or stay as link lists?
- **A "how this SRD is organized" note** — worth one short page explaining
  blocks/modules to readers, especially once the PDF builder ships.
- **Builder announcement** — the roadmap mentions the PDF builder; the site may
  want a placeholder page for it.
- **`quickref` shortcode** — defined, unused, duplicates `details`. Delete the
  file or keep it parked?

---

## E. What I'd do without further input

If you want to just get moving, these are safe and I'd start here:

1. Fix the weight collision (A3 bug 1) and align the hand-written lists to
   actual nav order (A3 bug 2) — presentation only, no content change.
2. Standardize Vehicle Rules onto `## Related` (D) — you've already stated the
   preference.
3. Generate the C1 tag worksheet + C2 orphan list so the audit is ready when you
   are.
4. Fix B6 (the lowercase "standard" heading) — unambiguous typo.

Everything else waits on A1 (module separation), because that decision moves
pages and I don't want to move them twice.

---

## Reminders for Phase 3 work

- Run `./_discovery/tools/check.sh <baseline-ref>` before merging — the baseline
  form is the one that catches silently-dropped content, which is the real risk
  when re-homing blocks.
- Re-run `python3 _discovery/tools/builddata.py` after any structural change.
- Moving a block file means updating its `id:`, every `{{% include %}}` and
  `{{< catalog >}}` reference, and adding a `netlify.toml` redirect if a *page*
  URL changes.
- Snippet rules (no trailing HTML comment, heading levels travel, includes fail
  silently) are in `site-maintenance-notes.md`.

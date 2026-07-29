# Open items

Everything outstanding, in one place. The Phase 1–3 decision docs (`03`, `05`)
are records of *decisions*; this is the running list of *work*. Annotate it the
way you did the queues.

Last synced against the tree at `8c11c20`.

---

## 0. What is left before the builder

Phase 4 is **not blocked**. Nothing below has to happen first — the data the
builder consumes is complete and rebuildable today. Sorted by whether it would
change what the builder sees:

**Would change the builder's inputs** — worth doing first:

- §5 C1 — tag membership review. Tags are the builder's query surface; a hole
  here becomes a hole in the selection UI.
- §5 C3 — self-containment re-check. A block that leans on its old page context
  reads wrong the moment a GM prints it alone.
- §8 — the 15 section-block titles never rendered anywhere. `title` is what the
  builder prints; 15 of them have never been proofread by being read.

**Would not** — safe to do during or after Phase 4:

- §1 both items (merge hygiene, not builder inputs)
- §2 the nine blank summaries — accepted, all on `wip:` pages
- §5 C2 orphans, §5d duplicate page headings, §6 chrome, §7 playtest
- §4 is closed: Move 1 declined, Move 3 done.

**Already done and load-bearing for the builder:** `data/blocks.json` with
`wip`/`owns_heading`/`url`/`page_urls`/`requires`, `data/edges.json` with
dependency/reference/include edges, `{{< blockset >}}` performing select-and-
assemble on the live site, and a preflight that now reports **zero** broken
links with no exclusions.

---

## 1. Must happen before this merges to `main`

These would do visible damage on the live site.

- [ ] **`draft: true` on the six parked placeholder pages.** All are `wip: true`
      so they preview. Left live they publish URLs for content that does not
      exist and put them in the sitemap. *One line each, say when.*
      - `free-srd/medieval-module.md`, `modern-module.md`,
        `frontier--industry-module.md`
      - `free-srd/creatures--npcs/core/_index.md` — nothing statted yet.
        The parent and `sci-fi/` should **ship**: sci-fi carries the four bot
        platforms and the automated-machines rules, and the parent's
        `{{< children >}}` still renders with core drafted out.
      Note `tool-kits.md` is **not** on this list: it is `wip: true` but has real
      rules on it and fixes a link that was broken. It should ship.
- [ ] **Decide the Medieval/Modern/Frontier duplication.** There are now two
      parked things per future setting: the equipment stubs at
      `inventory--equipment/<setting>-equipment/` (already `draft: true`) and the
      new module pages at `free-srd/<setting>-module.md`. Both are placeholders
      for the same setting. Keep both, or drop the equipment stubs and let the
      module page be the only placeholder until there is content?

## 2. Content gaps the generated tables expose

- [ ] **9 blocks render a blank summary cell** — the 4 bot platforms (BAL, HEL-1,
      T00L, TRK-A) and the 5 races. **Accepted as-is** for now: every one is on a
      `wip: true` page, so the blank reads as unfinished rather than broken.
      Tracked live by `worksheets.py` for when the stubs get written.

## 3. Parked features

- [ ] **Related section generation.** `{{< related >}}` works and runs live on
      Vehicle Rules, but the generated list loses the editorial intent of the
      five hand-written ones — it knows what links where, not where a reader
      *should* go next. Side-by-side comparison is in `04-phase3-worksheets.md`.
      **Staying parked by your call.** Needs a think, not a script.

## 4. Structure still on the table

- [x] ~~**Move 1 — sci-fi equipment under the module.**~~ **Not moving.** The
      module page stays a full reference list rather than becoming a parent with
      the equipment pages nested beneath it. Equipment stays under Inventory &
      Equipment, where a reader looks for gear; the module page is the
      grab-and-go view across it. Decided, not deferred.

- [x] ~~**Move 3 — bots & drones into Creatures & NPCs.**~~ **Done.** Four
      platforms is a start to a creature list, so it did not wait.

      ```
      Creatures & NPCs                 (nav toggle, {{< children >}} index)
         Core Creatures & NPCs         — nothing statted yet
         Sci-Fi Creatures & NPCs       — HEL-1, T00L, BAL, TRK-A
      ```

      The old `bots--drones/_index.md` content — the automated-machines rules and
      the Drone/Robot platform lists — became the Sci-Fi page, so that page is no
      longer a placeholder. **Bot Components did not move**: components are
      `type: equipment`, gear you buy, so they stayed in the equipment section as
      `sci-fi-equipment/bot-components.md` for the same reason Move 1 was
      declined. The Sci-Fi Module hub now lists them under Equipment and the
      platforms under Creatures & NPCs.

      Three 301s cover the six old URLs, components first so the wildcard cannot
      swallow it.

## 5. Audits prepared, awaiting your review

All in `_discovery/04-phase3-worksheets.md`; regenerate with `worksheets.py`.

- [ ] **C1 — tag membership.** 63 tags with their member lists. Scan for holes;
      tags are the query surface the PDF builder will use.
- [ ] **C2 — orphans and implicit edges.** 81 rule/reference blocks nothing links
      to, plus the 18 rule couplings that have no link in the prose.
- [ ] **C3 — self-containment re-check.** Blocks have moved a lot since Queue 2;
      the ones most likely to lean on their old page context want a re-read.

## 5b. The compact index — settled

The reference was the d20 3.5 SRD feats index. Two separable ideas came out of
it; **the index shipped and the page-per-feature half did not.**

`{{< catalog layout="names" />}}` drops the summary column and flows linked names
into responsive columns. It is on all six feature pages — Abilities,
Proficiencies and Traits, core and sci-fi — and on the Item Tags jump list.

A page per feature was measured and declined: **114 new pages** (76 abilities, 18
proficiencies, 20 traits), site count 59 → ~173, 34 inbound links to rewrite, for
a **median block length of 46 words** — 44 of the 114 under 40, and `traits/alert`
is 10. Races earn their own pages because artwork and lore are coming; a 10-word
trait reads worse alone than as a row in a list.

Consequence of the compact index worth remembering: the feature pages no longer
print `summary` anywhere. The one-liners are still live — they feed the module
hub tables and `data/blocks.json` — so keep writing them. The builder needs them.

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

The last two, on `vehicle-rules.md`, turned out **not to be drift at all** — the
conversion pass surfaced why. They are *composite* collapsibles: `Speed Tiers`
holds two blocks (`speed-tiers-chart` and `speed-tiers`), and
`Modes & Maneuverability` holds a hand-written `#### heading` plus
`speed-descriptors`. In both the label is a correct group name, not a block name.
They keep the `details` + `include` form, which is what it is for.

- [ ] **Still true of those two blocks: their own titles have never been
      rendered** (§8). `Speed Tiers Chart` and `Speed Descriptors` are what the
      PDF builder would print when a GM pulls either block out on its own, and
      neither has ever been read on a page. Worth a look when Vehicle Rules
      comes off WIP.

**The narrower change, recommended over the full flip:**

- [ ] **Delete page headings that duplicate the block heading below them.** 97
      includes have a heading directly above (h1 ×7, h2 ×41, h3 ×40, h4 ×9);
      some of the h2s are genuine group headings ("Aggressive Actions") and stay.
      This is the last of the three name-typing sites still hand-maintained.


## 6. Chrome

- [ ] **"How this SRD is organized"** — a short explanation of blocks and modules
      for readers. You suggested the Free SRD index or the landing page.
- [x] ~~**Section landing pages**~~ — resolved by A4. The four that were pure
      link lists are generated; the three that group or blurb stay hand-written.
      Abilities, Proficiencies and Traits open straight into their core content
      and now carry a line pointing at their setting-specific page.
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
- `wip: true` as one toggle; `tier`, `reference` and `headless` dropped
- Δ retired; `[___]` out of every title, label and anchor
- Four proficiencies disambiguated from the items they share a name with
- `catalog` gained property selection, cross-page links and `layout="names"`;
  `blockset`, `related`, `blockdetails` and `children` added
- Every custom shortcode carries a SIGNATURE / EXAMPLE / ARGUMENTS header
- Sci-Fi Module page built as quick reference, nothing rendered twice
- Character options split per module (Option 3); nav ordered by when the choice
  is made; feature indexes collapsed with core→module pointers
- 318 of 320 collapsibles converted to `blockdetails`, killing the label drift
- Section index lists generated from nav order
- Tool Kits page written — **the site now has zero broken links, no exclusions**
- Preflight: build, snippet lint, link check, data freshness, rendered-text diff

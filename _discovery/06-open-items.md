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

- §8 / worksheet **§C6** — **internal sub-headings.** 24 blocks carry headings
  inside them; 15 shift cleanly, **9 do not**. The one thing found so far that
  `title` + `owns_heading` cannot normalise. Reviewed and slotted; two of the
  nine are plain content bugs (a `## Related` inside `core-rules/size`, and three
  of five race pages skipping a level).
- §5 C1c — the 4 untagged blocks. Small, and tags are the builder's query
  surface. (Communications and HUDs gained `tech`; the rest of C1f confirmed fine.)

C1, C3 and C5 are reviewed and actioned; C2 came back clean.

**Would not** — safe to do during or after Phase 4:

- §1 `draft: true` on the six parked pages (merge hygiene, not builder inputs)
- §5d duplicate page headings, §6 chrome, §7 playtest
- §4 is closed: Move 1 declined, Move 3 done.

**Closed by decision, no work to do:**

- §1 the Medieval/Modern/Frontier duplication — both placeholders stay; the
  duplication *is* the structure.
- §2 the eight blank summary cells — expected until the WIP content is written.
- §5 C2's 18 implicit edges — reviewed, fine as implicit.

**Already done and load-bearing for the builder:** `data/blocks.json` with
`wip`/`owns_heading`/`url`/`page_urls`/`requires`, `data/edges.json` with
dependency/reference/include edges, and a preflight that reports **zero** broken
links with no exclusions.

One correction worth carrying into Phase 4: **`{{< blockset >}}` is not used
anywhere on the site.** It was described here as performing the builder's core
operation live; it does not, because the module hubs use property-filtered
`catalog` instead. The template works and is the closest thing to a prototype,
but it is unexercised — treat it as untested code, not as proof.

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
- [x] **Medieval/Modern/Frontier duplication — decided: keep both.** There are two
      parked things per future setting: the equipment stubs at
      `inventory--equipment/<setting>-equipment/` (already `draft: true`) and the
      module pages at `free-srd/<setting>-module.md`. Your call: *"the placeholder
      duplication makes up the structure, it's fine."* Both stay — they are the
      shape the settings will fill in, not an accident. Nothing to do.

## 2. Content gaps the generated tables expose

- [x] **8 blocks render a visible blank summary cell** — the 4 bot platforms
      (BAL, HEL-1, T00L, TRK-A) and the 4 sci-fi races. **Closed — expected until
      the WIP content is written**, and not a defect to chase. Every
      one is on a `wip: true` page, so the blank reads as unfinished rather than
      broken. Was reported as 29; the check is now layout-aware, and the 20
      item-tags blocks only appear in a `layout="names"` index, which has no
      summary column to leave blank. Classic Human is in no generated table at
      all.

## 3. Parked features

- [x] ~~**Related section generation.**~~ **Removed.** Hand-written Related
      sections are the decision, so the machinery is gone rather than parked:
      `related.html`, `data/related.json`, the generator in `builddata.py`, and
      §D of the worksheets. Vehicle Rules was the one page using
      `{{< related >}}` and now carries a hand-written list, seeded from what the
      generator produced and then ordered editorially.

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

## 5. Audits — reviewed, actioned, and what is left

`_discovery/04-phase3-worksheets.md`. All three review sections came back
annotated; the notes are applied. What remains open is listed here.

**C5 — titles the builder prints. Closed.** Both flagged titles confirmed
appropriate as-is. The bigger outcome was the *reason* they were flagged: 13 of
the 15 name themselves in a bold lead-in, and your read is that the bold lead-in
**is** the heading — an inline list header. Recorded in §8 as the builder's
heading rule.

**C1 — tags. Actioned, one item open.**

- `action` merged into `actions` (9 blocks).
- `defensive` → `defensive-actions`, applied to all four defensive actions.
  **`aggressive` → `aggressive-actions` by the same logic** — it had the same
  gap, 7 of 10, and was only absent from your list because it had more than two
  members. Move, Opportunity Attack and Grapple gained it. Say if that
  over-reached.
- `drones` deleted from BAL and HEL-1; `bots` already covers them.
- `damage` extended to Damage Resistance & Weakness and both environment blocks
  (exposure).
- `general`/`luck`/`battery` confirmed mutually exclusive, so the cohort check no
  longer reports them — 12 false positives per run, gone.
- C1f's four structural-only blocks confirmed fine as-is.
- [ ] **C1c — 4 untagged blocks still undecided.** `conditions/overview`,
      `wounds/overview`, `wounds/wounds`, `wounds/common-injuries`. You said the
      list was hard to work from without the tag vocabulary in front of you — the
      section now prints all 59 tags with counts inline, directly above the four
      blocks.

**C3 — self-containment. Closed.** You fixed five yourself by moving
page-scoped prose onto the pages, which is the right shape: an opening summary of
a page that *contains* blocks is page chrome, not part of a block. I removed the
last "below" from `components/installation`. The rest were confirmed fine.

- [x] **C2 — orphans and implicit edges. Closed.** Your hunch checked out: the
      worksheet carries a *reachable by browsing* column, and **all 81 sit on a
      page the nav links to**. Nothing is stranded. The 18 implicit edges were
      reviewed and accepted as-is — they stay implicit.

## 5a. Heading migration — in progress

Blocks no longer carry their own heading. The call site decides the level, and
the shortcode emits it: `{{% include "/snippets/x/y" "h3" %}}`. Full design and
the four modes are in the shortcode header and the maintenance notes.

**Done — all three sections.** core-rules, character-creation and
inventory--equipment: **388 call sites converted, 313 snippet headings
stripped.** Every ordinary block now takes its heading from the call site.

`owns_heading` is down to **12 of 434**, and that is the floor — see below.

- [ ] **22 "bare" blocks in core-rules still need a decision.** These sit under a
      shared group heading with no heading of their own, so giving them a level
      would *add* a heading that has never been on the site. Most are the C5
      bold-lead-in blocks — Disarm, Grapple, Trip, Move, Step and the rest of the
      combat actions — where your call was that **the bold lead-in is the
      heading**. Converting them means stripping the hand-written bold lead-in
      and using `"lead"` mode. That is a visible change, so it is left for you.
      Full list in the wave-1 commit message.
- [ ] **`movement/speed-tiers-chart` anchor drifted**, `#speed-tiers` →
      `#speed`. It is a bare block, so its anchor is inherited from whatever
      heading precedes it — and that heading became a generated one. Nothing
      links to it (its two inbound edges are implicit, not links) and the site
      has zero broken links, but it shows the shape of the problem: **a bare
      block's anchor is a side effect of its neighbour.** Resolving the 22 above
      resolves this too.
- [x] ~~**Retire `owns_heading` when the migration finishes.**~~ **It does not
      retire — I was wrong about that.** The meter bottoms out at **12, not 0**:

      - **11 are page-as-blocks** — the five races, the four bot platforms, Size,
        and the races hub. A page-as-block's H1 *is* its title; there is no
        separate heading to strip, and there never will be.
      - **1 is `conditions/dead-battery`**, a snippet deliberately left bare on
        the Android page, so it keeps its own heading.

      So the field keeps a real meaning: *this file supplies its own heading.*
      That is exactly the signal the PDF builder needs — a page-as-block printed
      into a PDF already carries its H1 and must not be given a second one, while
      every ordinary block now needs one supplied. Both readers stay:
      `blockset` uses it to decide whether to supply a heading, and
      `blockdetails` uses it to avoid claiming an anchor twice — which is now
      dead code, but it is the guard that stops a newly written snippet with a
      heading from duplicating an id.

- [x] ~~**Remaining section: inventory--equipment.**~~ Done. 180 blockdetails
      and 6 includes converted, plus the two held-back renumbers
      (`equipment/common-terms`, `inventory/carry-limits`) now that their call
      sites carry a level.

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

### The bold lead-in is a heading

Settled in the C5 review, and it changes the rule above. 13 of the 15
section blocks that share a group heading open by naming themselves in bold:

    **Disarm** *(3 AP)* — Attempt to disarm an opponent…

Your read is that this **is** a heading — an inline, low-tier list header — and
that adding a real heading would state the name twice. So the builder's rule
becomes:

**Take `title`. Choose the level from where the GM placed it. Skip the block's
own leading heading when `owns_heading` is true, and skip a bold lead-in that
repeats the title.** The lead-in's parenthetical — `*(3 AP)*` — must survive,
because it is the only place some blocks state the AP cost.

- [x] ~~Is the AP cost ever stated *only* in the bold lead-in?~~ **Checked: no.**
      All 13 restate the cost in the prose body. `combat/stealth` has no AP cost
      to state, and says so. So promoting a lead-in to a heading loses nothing —
      but the check is worth re-running if these blocks are rewritten.
- [ ] **24 blocks carry internal sub-headings.** You spotted this on Mounts and
      it generalises. Reviewed in worksheet **§C6**, with slots. The shape of it:

      **15 are cleanly shiftable** — every internal heading exactly one level
      below where the block sits, contiguous. A builder moves the whole tree by
      one delta and they are fine.

      **9 are not**, in three distinct ways:

      | Cause | Blocks |
      |---|---|
      | Skips a level | the two attribute groups (h2 → h4); Reptilian, Star-touched Human, Zeta Grey (h1 → h3) |
      | Contains a sibling, not a child | `basics/target-numbers`, `core-rules/size`, `environment/environmental-effects` |
      | Page-as-block with its own H1 | `chargen/overview` |

      Two of those are not really about levels at all:

      - **`core-rules/size` keeps its `## Related` section inside the block.**
        Every other page keeps Related in the shell. Printed into a PDF this
        block drags a "Related" heading and four site links with it. A content
        bug whatever the builder does.
      - **The five race pages disagree with each other** — Android and Classic
        Human put Features at `h2`, the other three at `h3`. Same page shape,
        same block type. Cheapest fix on the list.

      `chargen/overview` also has a **title/heading mismatch**: `title` is
      "Character Creation Overview", the H1 says "Character Creation", which is
      why it reads as owning no heading.

- [ ] **Your fixed-level idea, sized.** **12 blocks are whole pages**
      (`home: page`) — the races, the four bot platforms, Size, the
      character-creation overview. A page-as-block cannot be broken down or
      re-homed; it goes in whole or not at all. So its internal levels could be
      **fixed** rather than shifted, and the builder would place it at a known
      depth. **6 of the 9 not-shiftable blocks are `home: page`**, so that one
      decision clears two thirds of the problem. The rest are snippets included
      into shells, where the block genuinely moves and a fixed level cannot
      apply. §C6c has the table and a slot for the depth.

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

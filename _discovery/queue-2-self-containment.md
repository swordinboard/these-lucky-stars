# Queue 2 — Self-containment failures

Blocks that do **not** stand alone as currently written. Each entry names the
block, the specific way it fails in isolation, and (where useful) a suggested
direction. **These are content rewrites — identified only, nothing rewritten.**
Identity-time dedup cases (§4.5) are included here as self-containment-adjacent
decisions.

---

## Hard failures (text is incoherent in isolation)

### 1. `equipment/medkit-note` — an *existing snippet* that doesn't stand alone
`content/snippets/medical-item-medkit-note.md` opens **"This is a single use
item that can be used in place of a med kit…"** — "this" has no antecedent
outside a host item entry (it is included under Bandages ×2 and Splint
Materials). It works as an in-context note but fails the block test. It's also
proof that the existing snippet set can't be grandfathered in without review.
*Direction:* either reword to "Single-use medical items can be used in place of
a med kit…" (Phase 2 rewrite) or reclassify as a non-selectable "note" block
that only ever rides along with a host item. (Its wounds link is also broken —
Queue 3.)

<!-- Reclassify as a non sel3ctable "note" block meant to ride along with a host item. Basically used as shorthand f9r consistency -->

### 2. Dead Battery — a shared condition trapped inside the Android race page
`races/android` contains **"Dead Battery — Automated Machine Condition"**,
which by its own text applies to *all* automated machines (drones, robots,
Androids — the bots pages' repair/VIT rules interact with it). It is bold text,
not a heading (so it isn't even linkable — the page's own `#dead-battery` link
is broken, Queue 3), and its home makes it invisible to anyone building a
drone-only PDF. The source has an author comment: *"may need to move this
section or put into a snippet."* *Direction:* extract as its own condition-type
block (e.g. `conditions/dead-battery` or `bots/dead-battery`) referenced from
both the Android page and the bots section. Human picks the namespace/home.

<!-- pull as a snippet, conditions/dead-battery.-->

### 3. `abilities/expert` — meaningless without Student
Text begins "Choose one of the topics selected by your Student ability." Listed
in Queue 1 as a `prerequisite` edge, but flagged here too because unlike most
prerequisite chains, the text is not merely *gated* by the target — it is
*unreadable* without it. The clearest "auto-include" candidate in the corpus.

<!-- auto include. in fact, any time a feature has a prerequisite feature, that feature should be auto included. prerequisite equipment or equipment types are not forced-->

### 4. `attributes/determining-attributes` — internal "above" reference
Kept as ONE block precisely because the Attribute Pool subsection opens "Using
the rolling method above…". If the human prefers the fine split (two methods as
two blocks), Attribute Pool needs a rewrite first. No action needed if the
coarse proposal is accepted.

<!-- one block approach is acceptable -->

### 5. Vehicle Rules speed section — page-scoped framing text
The `details`-wrapped speed reiterations in `vehicle-rules.md` carry framing
like *"Because these rules deal closely with movement… those rules are
reiterated here"* and *"Direct from Action Economy"* (one instance with broken
markdown, `vehicle-rules.md:44`). This text is about *the page*, not the rule —
it must not travel into any extracted block. The underlying speed content is
already snippets, so the fix is just to keep the framing in the page frame;
flagged so Phase 2 doesn't scoop it up.

<!-- Much of the vehicles page is a wip and that style of reference Im not sure I like or not. the related blocks at the bottom ofnother pages do a similar job more consistently. -->

### 6. Combat catalog entries that lean on same-page anchors
In `combat/action-catalog`: **Use Cover** says "See [Cover](#cover) for
definitions" and **Shatter**/**Disarm** reference same-page and cross-page
material. Same-page anchors break the moment the catalog (or a single action)
is extracted. Mechanical fix in Phase 2 (rewrite anchors as block references),
but flagged because it constrains the Queue 5 granularity decision on the
catalog.

### 7. `combat/damage-modifiers` — assumes attack-roll context
"The attribute used to make the attack roll is added to the damage total" —
readable, but only fully determinate next to `combat/attack-roll` (which
defines which attribute that is). Borderline; listed so the human rules on it
rather than it sliding by.

<!-- hm.. this raises a granularityissure with the combat page.

new breakdown for blocks:
- Combat Basics
- Initiative
- Attacking and Defending (include first two subsections "the attack roll" and "advantages and disadvantages")
- cover
- surprise attacks
- steps to an attack
- Damage (including first three subsections "damage dice" "damagw mod9fiers" "damage types")
- Damage Sources
- Damage Resistance and Weakness
- Applying Damage
- Actions in Combat (intro)
- 10 Aggresive actions individually
- 5 Defensive actions individually -->

### 8. `environment/heat-and-cold` and `environment/toxic-atmosphere`
Both open mid-mechanism ("At the end of each exposure interval, an unprotected
character makes a FORT check:") — the interval/target machinery lives in
`environment/exposure-intervals`. Cross-registered in Queue 1 (mechanism
class); listed here because if the human rules those edges `reference` rather
than `dependency`, these two blocks need a one-line opening rewrite to stand
alone.

<!-- I think that pages granularity can be lowered a bit:
- Environmental Effects (including exposure, heat and cold, toxic atmosphere, visibility)
- Extrme environments -->
---

## Identity-time dedup decisions (§4.5 — same rule, two places)

### 9. Wounds & Conditions summary: `stats/wounds-and-conditions-summary` vs `wounds/overview`
The Stats page carries a summary of wound/condition triggers that restates the
intro of the Wounds & Conditions page (nearly the same three-bullet list).
**Decision needed:** one block with two tags (single ID — the builder's dedup
can then collapse it) or two blocks (a deliberate short-form/long-form pair).
*Recommendation:* one block, ID `wounds/overview`, with the stats page keeping
only a one-line pointer — but that's a Phase 2 rewrite, so it stops here.
 <!-- Recommendation is acceptable -->

### 10. Readied Action: `actions/readied-actions` vs the combat-catalog entry
The combat catalog's "Readied Action" entry is a compressed restatement of the
Action Economy section (which it links). Same rule, two renderings.
**Decision:** single ID (catalog entry becomes a reference/include) or two
blocks. *Recommendation:* single ID `actions/readied-actions`.

<!-- recommendation is acceptable -->

### 11. Field Ration ×2: `generic-equipment/field-ration` vs `sci-fi-equipment/field-ration`
Same name, same function, different flavor text (generic vs vacuum-sealed
paste). **Decision:** these are proposed as two distinct blocks (different
module tiers — a medieval GM gets the generic one, a sci-fi GM the paste). If
instead they should be ONE block with setting-flavored text, that's a content
merge. *Recommendation:* keep two; they are setting variants, not duplicates. 

<!-- neex a way to handle setting variants, there will be more -->

### 12. Same-name feature/equipment pairs (B&E Kit, Disguise Kit, Repair Kit, Comp Jack, Armor)
Each exists once as a *proficiency* and once as an *item* — different rules
text, legitimately distinct blocks that share a name. Proposed as distinct IDs
in different namespaces (`proficiencies/…` vs `sci-fi-equipment/…`). No merge
recommended; listed so the name collision is a conscious decision. The builder
UI will need to disambiguate by type.

<!-- agree -->

### 13. Speed rules appearing on three pages — already solved, keep it that way
Stats, Action Economy, and Vehicle Rules all render the same four speed
snippets. Because they share one file (= one proposed ID each), this is the
model working correctly — noted as the positive example: multi-tag single-ID
blocks, no action needed.

---

## Advisory (weak failures — probably fine, listed for completeness)

- `sci-fi/ballistics-in-space` — assumes "ballistic weapons" context (it is
  included inside the Ballistic item-tag block and the Sci-Fi Additions page);
  readable alone but its first line presumes the tag's existence.

<!-- this is similar to the note reclassification mentioned earlier in this doc as it is usually intended to folllow along with an item but i  this case is able to stand alone within this page with safe assumptions made -->

- `stats/vitality` (existing snippet) — fully readable alone, but its wound
  bullets depend on wound severity definitions (Queue 1 mechanism edges) —
  the classic "reference vs dependency" call.

<!-- reference, does not need to be forced -->

- `stats/blank-boxes` — coherent, but it's about the paper character sheet,
  not the rules; consider excluding from the buildable corpus entirely.

<!-- safe to exclude -->

- `wounds/common-injuries` — a GM-facing example table; stands alone, but only
  useful next to `wounds/wounds`; kept as `reference: low`.

<!-- reference is correct -->

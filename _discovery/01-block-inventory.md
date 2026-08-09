# 01 — Block Inventory (proposed)

**Status: PROPOSAL — nothing here is applied.** Every page in `content/` is listed
below in site-nav order, with its proposed granularity (and reason), its proposed
blocks, and the section-derived tag-sets the split implies. Machine-readable
canonical data: [`blocks.json`](blocks.json) / [`edges.json`](edges.json).

Reading the tables:

- **ID** — proposed block ID, namespaced to avoid collisions. Derived from the
  existing heading anchor where possible. ID collisions would be flagged
  `ID-COLLISION` (none were found; near-collisions by *name* are listed at the
  bottom of this file as identity decisions).
- **Home** — `page` (page already stands alone; reference in place, no
  extraction), `snippet (existing)` (already in `content/snippets/`), or
  `snippet (proposed)` (Phase 2 would extract it; proposed filename in
  blocks.json). Blocks that must be individually addressable have to become
  snippets, because `include` can only target a whole page or snippet file.
- **Ref** — proposed `reference` rating, computed from cross-reference in-degree
  in the current corpus (high ≥ 6 inbound edges, medium ≥ 2, low otherwise).
  It is a starting proposal, not a judgment of importance.
- **Tags** — includes section-derived tags (tag-as-query, §4.4). The tag-sets
  implied by each split are shown with the split; the full per-tag member lists
  (for hole-scanning) are in [queue-4-tag-completeness.md](queue-4-tag-completeness.md).

Snippet files are listed under their own heading at the end — they are already
blocks and keep `home: snippet (existing)`.


## `content/_index.md`

**No blocks proposed.** Site home page — nav, announcements, changelog. Site chrome, not buildable content.


## `content/docs/_index.md`

**No blocks proposed.** Nav stub.


## `content/docs/free-srd/_index.md`

**No blocks proposed.** SRD landing page — orientation prose and nav. Marketing/orientation, not a rule; excluded from builder corpus.


## `content/docs/free-srd/core-rules/_index.md`

**No blocks proposed.** Nav list.


## `content/docs/free-srd/core-rules/basics.md`

**Granularity:** Fine: each mechanic (decision rolls, advantage, supply rolls…) is a self-contained rule a GM would pull individually. The three micro-rules under General Rules of Play are borderline (Queue 5).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/basics/key-terms` | Key Terms | snippet (proposed) | core | rule | core | low | basics |
| `rules/basics/decision-rolls` | Decision Rolls | snippet (proposed) | core | rule | core | low | basics |
| `rules/basics/target-numbers` | Target Numbers | snippet (proposed) | core | rule | core | low | basics — Includes the difficulty guide table and the four task-band descriptions. |
| `rules/basics/success-and-failure` | Success and Failure | snippet (proposed) | core | rule | core | low | basics |
| `rules/basics/advantage` | Advantage | snippet (proposed) | core | rule | core | medium | basics — Includes Gaining Advantage, GM notes, and contested-roll guidance. |
| `rules/basics/contested-rolls` | Contested Rolls | snippet (proposed) | core | rule | core | low | basics |
| `rules/basics/resolving-a-tie` | Resolving a Tie | snippet (proposed) | core | rule | core | low | basics |
| `rules/basics/the-rounding-rule` | The Rounding Rule | snippet (proposed) | core | rule | core | low | basics |
| `rules/basics/supply-rolls` | Supply Rolls | snippet (proposed) | core | rule | core | medium | basics |
| `rules/basics/d100-or-percentage` | D100 or Percentage | snippet (proposed) | core | rule | core | low | basics |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `basics` | 10 |

## `content/docs/free-srd/core-rules/attributes.md`

**Granularity:** Medium: overview / generation / values / the two attribute groups. Generation methods kept as ONE block because Attribute Pool opens with 'Using the rolling method above' (Queue 2). Per-attribute split rejected — each description is two lines (Queue 5 notes the alternative).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/attributes/overview` | Attributes | snippet (proposed) | core | rule | core | low | attributes |
| `rules/attributes/determining-attributes` | Two Ways to Determine Attributes | snippet (proposed) | core | rule | core | low | attributes |
| `rules/attributes/attribute-values` | Attribute Values | snippet (proposed) | core | rule | core | low | attributes |
| `rules/attributes/physical-attributes` | Physical Attributes | snippet (proposed) | core | rule | core | low | attributes |
| `rules/attributes/mental-attributes` | Mental Attributes | snippet (proposed) | core | rule | core | low | attributes |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `attributes` | 5 |

## `content/docs/free-srd/core-rules/size.md`

**Granularity:** Single-topic page whose sections interlock (chart is referenced by the surrounding prose); splitting would create blocks that depend on the chart. Page-as-block, referenced in place.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `core-rules/size` | Size | page | core | rule | core | medium | size, combat, stats |

## `content/docs/free-srd/core-rules/stats.md`

**Granularity:** This page is already mostly snippet composition (initiative, AP, speed, DEF, VIT, grapple, stealth). Blocks proposed only for the prose still trapped in the page: Stress Threshold, Luck, Attack, and the Wounds & Conditions summary (a dedup case).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `stats/wounds-and-conditions-summary` | Wounds & Conditions | snippet (proposed) | core | reference | core | low | stats — Duplicates the intro of the Wounds & Conditions page — identity decision (one block, two tags vs. two blocks) flagged in Queue 2. |
| `rules/stats/stress-threshold` | Stress Threshold | snippet (proposed) | core | rule | core | low | stats |
| `rules/stats/luck` | Luck | snippet (proposed) | core | rule | core | low | luck, stats |
| `rules/stats/attack` | Attack | snippet (proposed) | core | rule | core | low | stats |
| `stats/blank-boxes` | Blank Boxes | snippet (proposed) | core | reference | core | low | stats — Character-sheet-specific note; low value as a standalone block. |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `stats` | 5 |

## `content/docs/free-srd/core-rules/action-economy.md`

**Granularity:** Medium: block per action-type concept. Readied and Multi-Turn actions get their own blocks (both are individually cross-referenced from Combat and Vehicle Rules). Move/Step/AP/speed content is already snippets.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/actions/action-types` | Action Types | snippet (proposed) | core | rule | core | low | actions — The three-category framing paragraph. |
| `rules/actions/standard-actions` | Standard Actions | snippet (proposed) | core | rule | core | low | actions |
| `rules/actions/readied-actions` | Readied Actions | snippet (proposed) | core | rule | core | medium | actions |
| `rules/actions/multi-turn-actions` | Multi-Turn Actions | snippet (proposed) | core | rule | core | low | actions |
| `rules/actions/opportunity-actions` | Opportunity Actions | snippet (proposed) | core | rule | core | low | actions — Framing rules for opportunity actions; the Opportunity Attack itself is already the rules/combat/opportunity-attack snippet. |
| `rules/actions/reactions` | Reactions | snippet (proposed) | core | rule | core | low | actions |
| `rules/actions/difficult-terrain` | Difficult Terrain and Obstacles | snippet (proposed) | core | rule | core | low | actions |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `actions` | 7 |

## `content/docs/free-srd/core-rules/health.md`

**Granularity:** Page is a composition shell (defense/vitality/health-loop snippets). Only the two-layer overview paragraph is unextracted prose.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/health/overview` | Health | snippet (proposed) | core | reference | core | low | health |

## `content/docs/free-srd/core-rules/combat.md`

**Granularity:** Fine for the rule sections (each is pulled separately at the table). The action catalog is granularity-ambiguous — one catalog block vs. one block per named action — sent to Queue 5; provisionally recorded as a single block.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/combat/combat-basics` | Combat Basics | snippet (proposed) | core | rule | core | low | combat |
| `combat/attack-roll` | The Attack Roll: Opposed Rolls | snippet (proposed) | core | rule | core | low | combat |
| `combat/advantage-in-combat` | Advantage and Disadvantage in Combat | snippet (proposed) | core | rule | core | low | combat — Depends on rules/basics/advantage for the advantage scale (edge queued). |
| `rules/combat/cover` | Cover | snippet (proposed) | core | rule | core | medium | combat |
| `rules/combat/surprise-attacks` | Surprise Attacks | snippet (proposed) | core | rule | core | medium | combat |
| `rules/combat/steps-to-an-attack` | Steps to an Attack | snippet (proposed) | core | rule | core | low | combat |
| `combat/damage-overview` | Damage | snippet (proposed) | core | rule | core | low | combat — The DEF damage formula. |
| `combat/damage-modifiers` | Damage Modifiers | snippet (proposed) | core | rule | core | low | combat |
| `combat/damage-types` | Damage Types | snippet (proposed) | core | rule | core | low | combat |
| `rules/combat/damage-sources` | Damage Sources | snippet (proposed) | core | rule | core | low | combat |
| `rules/combat/damage-resistance` | Damage Resistance and Weakness | snippet (proposed) | core | rule | core | high | combat |
| `combat/action-catalog` | Actions in Combat | snippet (proposed) | core | rule | core | medium | combat — Queue 5: split per named action (Disarm, Trip, Shatter, Brace…) vs. keep as one catalog. Contains includes of move/step/grapple/stealth/opportunity-attack snippets either way. |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `combat` | 12 |

## `content/docs/free-srd/core-rules/wounds--conditions.md`

**Granularity:** Fine: every wound type and every condition is already a `details` block — natural block boundaries. Plus section blocks for the wound framework and the two reference tables.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/wounds/overview` | Wounds & Conditions | snippet (proposed) | core | reference | core | low |  — Intro; overlaps the stats-page summary (Queue 2 identity flag). |
| `rules/wounds/wounds` | Wounds | snippet (proposed) | core | rule | core | medium |  — Minor/major classification, dressing/healing rules, narrative healing. |
| `rules/wounds/burn` | Burn | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/contusion` | Contusion | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/dislocation` | Dislocation | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/fracture` | Fracture | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/laceration` | Laceration | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/puncture` | Puncture | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/sprain` | Sprain | snippet (proposed) | core | rule | core | low | wounds, wound-type |
| `rules/wounds/common-injuries` | Common Injuries | snippet (proposed) | core | reference | core | low |  |
| `rules/conditions/overview` | Conditions | snippet (proposed) | core | reference | core | medium |  — Condition framing + summary table. |
| `rules/conditions/asphyxiating` | Asphyxiating | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/bleeding` | Bleeding | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/confused` | Confused | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/crippled` | Crippled | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/dying` | Dying | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/fatigued` | Fatigued | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/frightened` | Frightened | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/immobilized` | Immobilized | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/pinned` | Pinned | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/restrained` | Restrained [___] | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/shaken` | Shaken | snippet (proposed) | core | rule | core | medium | conditions, condition |
| `rules/conditions/sick` | Sick | snippet (proposed) | core | rule | core | low | conditions, condition |
| `rules/conditions/stressed` | Stressed | snippet (proposed) | core | rule | core | medium | conditions, condition |
| `rules/conditions/unconscious` | Unconscious | snippet (proposed) | core | rule | core | low | conditions, condition |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `conditions` | 14 |
| `condition` | 14 |
| `wounds` | 7 |
| `wound-type` | 7 |

## `content/docs/free-srd/core-rules/environmental-effects.md`

**Granularity:** Medium: block per hazard family. Heat & Cold and Toxic Atmosphere are incoherent without the Exposure Intervals mechanism — hard-dependency suspicion, Queue 1.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `environment/overview` | Environmental Effects | snippet (proposed) | core | reference | core | low | environment |
| `environment/exposure-intervals` | Exposure Intervals | snippet (proposed) | core | rule | core | medium | environment |
| `environment/heat-and-cold` | Heat & Cold | snippet (proposed) | core | rule | core | low | environment |
| `environment/toxic-atmosphere` | Toxic Atmosphere | snippet (proposed) | core | rule | core | low | environment |
| `environment/visibility` | Visibility | snippet (proposed) | core | rule | core | low | environment |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `environment` | 5 |

## `content/docs/free-srd/core-rules/vehicle-rules.md`

**Granularity:** Medium: block per subsection; Mounts kept as one block (its subsections are one continuous argument). Interaction targets (board/bail/dodge/brace) all derive from the Speed-tier modifier chart — Queue 1. Page is WIP.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/vehicles/overview` | Vehicle Rules | snippet (proposed) | core | reference | supplement | low | vehicles, wip |
| `rules/vehicles/vehicle-size` | Vehicle Size | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/vehicle-actions` | Vehicle Actions | snippet (proposed) | core | rule | supplement | low | vehicles, wip — Intro + Driver Actions disadvantage rule. |
| `rules/vehicles/ignition` | Ignition | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/drive` | Drive | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/boarding-and-bailing` | Boarding & Bailing | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/initiative-and-occupants` | Initiative & Occupants | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/cover-from-vehicles` | Cover from Vehicles | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/impact-and-overrun` | Impact & Overrun | snippet (proposed) | core | rule | supplement | low | vehicles, wip |
| `rules/vehicles/collision-damage` | Collision Damage | snippet (proposed) | core | rule | supplement | medium | vehicles, wip — Includes damage-to-vehicle and occupant brace rules. |
| `rules/vehicles/mounts` | Mounts | snippet (proposed) | core | rule | supplement | low | vehicles, wip — Queue 5: could split into equipment-vs-ally / features / unwilling / impact / sudden stops. |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `vehicles` | 11 |

## `content/docs/free-srd/core-rules/damaged--broken-gear.md`

**Granularity:** Medium: block per h2. Durability and Conditions are tightly coupled (Queue 1). Armor/shield degradation are already snippets; the Breaking Defensive Items section is framing around them.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/objects/overview` | Damaged & Broken Gear | snippet (proposed) | core | reference | core | low | objects |
| `rules/objects/targeting-objects` | Targeting Objects | snippet (proposed) | core | rule | core | low | objects |
| `rules/objects/durability` | Object Durability | snippet (proposed) | core | rule | core | medium | objects |
| `rules/objects/conditions` | Object Conditions | snippet (proposed) | core | rule | core | medium | objects |
| `rules/objects/material-def` | Material DEF | snippet (proposed) | core | reference | core | low | objects — Reference tables (material DEF, common item DEF). |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `objects` | 5 |

## `content/docs/free-srd/core-rules/sci-fi-additions.md`

**Granularity:** Composition shell for the sci-fi snippets, plus Computer Systems — proposed as ONE block: its subsections (security levels, actions, countermeasures) reference each other's charts and are incoherent alone. Queue 5 records the finer alternative.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/sci-fi/computer-systems` | Computer Systems | snippet (proposed) | sci-fi | rule | module | low | computers, sci-fi — Networks, security levels, hacking actions, countermeasures as one unit. |

## `content/docs/free-srd/character-creation/_index.md`

**No blocks proposed.** Nav list.


## `content/docs/free-srd/character-creation/character-creation-overview.md`

**Granularity:** One coherent walkthrough (steps + leveling). Link-heavy but self-contained as a unit.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `chargen/overview` | Character Creation Overview | page | core | reference | core | low | character-creation |

## `content/docs/free-srd/character-creation/races/_index.md`

**Granularity:** Short overview + nav list; the prose stands alone as a single block.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `races/overview` | Races | page | core | reference | core | low | races, character-creation |

## `content/docs/free-srd/character-creation/races/classic-human.md`

**Granularity:** A race entry is the natural selectable unit.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `races/classic-human` | Classic Human | page | core | feature | core | low | races, core |

## `content/docs/free-srd/character-creation/races/star-touched-human.md`

**Granularity:** A race entry is the natural selectable unit.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `races/star-touched-human` | Star-touched Human | page | sci-fi | feature | module | low | races, sci-fi, wip |

## `content/docs/free-srd/character-creation/races/android.md`

**Granularity:** A race entry is the natural selectable unit. NOTE: contains the 'Dead Battery' automated-machine condition, flagged separately (Queue 2).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `races/android` | Android | page | sci-fi | feature | module | medium | races, sci-fi, wip |

## `content/docs/free-srd/character-creation/races/reptilian.md`

**Granularity:** A race entry is the natural selectable unit.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `races/reptilian` | Reptilian | page | sci-fi | feature | module | low | races, sci-fi, wip |

## `content/docs/free-srd/character-creation/races/zeta-grey.md`

**Granularity:** A race entry is the natural selectable unit.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `races/zeta-grey` | Zeta Grey | page | sci-fi | feature | module | low | races, sci-fi, wip |

## `content/docs/free-srd/character-creation/traits.md`

**Granularity:** Fine: one block per trait (each already a `details`). Section headings Core/Sci-Fi become tags; the [Racial] label rule is its own block.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `character/traits/overview` | Traits | snippet (proposed) | core | reference | core | low | character-creation, trait |
| `traits/racial-traits` | Racial Traits | snippet (proposed) | core | rule | core | low | character-creation, racial, trait — The [Racial] label rule. |
| `character/traits/alert` | Alert | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/composed` | Composed | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/diplomatic` | Diplomatic | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/hot-headed` | Hot-Headed | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/intimidating` | Intimidating | snippet (proposed) | core | feature | core | medium | trait, core |
| `character/traits/lucky` | Lucky | snippet (proposed) | core | feature | core | medium | trait, core |
| `character/traits/mentally-sound` | Mentally Sound | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/particularly-attractive` | Particularly Attractive | snippet (proposed) | core | feature | core | medium | trait, core |
| `character/traits/picture-of-health` | Picture of Health | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/sly` | Sly | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/sneaky` | Sneaky | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/stubborn` | Stubborn | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/tough` | Tough | snippet (proposed) | core | feature | core | medium | trait, core |
| `character/traits/unremarkable` | Unremarkable | snippet (proposed) | core | feature | core | medium | trait, core |
| `character/traits/unshakable` | Unshakable | snippet (proposed) | core | feature | core | medium | trait, core |
| `character/traits/well-connected` | Well-Connected | snippet (proposed) | core | feature | core | low | trait, core |
| `character/traits/inter-planet-traveler` | Inter-Planet Traveler | snippet (proposed) | sci-fi | feature | module | low | trait, sci-fi |
| `character/traits/scrap-hauler` | Scrap Hauler | snippet (proposed) | sci-fi | feature | module | low | trait, sci-fi |
| `character/traits/space-adept` | Space Adept | snippet (proposed) | sci-fi | feature | module | low | trait, sci-fi |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `trait` | 21 |
| `core` | 16 |
| `sci-fi` | 3 |
| `character-creation` | 2 |

## `content/docs/free-srd/character-creation/proficiencies.md`

**Granularity:** Fine: one block per proficiency. Core/Sci-Fi sections become tags.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `character/proficiencies/overview` | Proficiencies | snippet (proposed) | core | reference | core | low | character-creation, proficiency |
| `character/proficiencies/armor` | Armor | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/b-e-kit` | B&E Kit | snippet (proposed) | core | feature | core | medium | proficiency, core |
| `character/proficiencies/disguise-kit` | Disguise Kit | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/improved-ability` | Improved Ability | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/licensed-instincts` | Licensed Instincts | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/martial-training` | Martial Training | snippet (proposed) | core | feature | core | high | proficiency, core |
| `character/proficiencies/medic-training` | Medic Training | snippet (proposed) | core | feature | core | medium | proficiency, core |
| `character/proficiencies/medical-instincts` | Medical Instincts | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/negotiation-training` | Negotiation Training | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/repair-kit` | Repair Kit | snippet (proposed) | core | feature | core | medium | proficiency, core |
| `character/proficiencies/research` | Research | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/survival-training` | Survival Training | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/vehicle` | Vehicle | snippet (proposed) | core | feature | core | low | proficiency, core |
| `character/proficiencies/weapon` | Weapon | snippet (proposed) | core | feature | core | high | proficiency, core |
| `character/proficiencies/comp-jack` | Comp Jack | snippet (proposed) | sci-fi | feature | module | high | proficiency, sci-fi |
| `character/proficiencies/general-robotics` | General Robotics | snippet (proposed) | sci-fi | feature | module | medium | proficiency, sci-fi |
| `character/proficiencies/general-technology` | General Technology | snippet (proposed) | sci-fi | feature | module | high | proficiency, sci-fi |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `proficiency` | 18 |
| `core` | 14 |
| `sci-fi` | 3 |

## `content/docs/free-srd/character-creation/abilities.md`

**Granularity:** Fine: one block per ability — this is the flagship tag-as-query page. Section headings (Core General / Core Luck / Sci-Fi General / Sci-Fi Battery) become tag-sets.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `character/abilities/overview` | Abilities | snippet (proposed) | core | reference | core | low | ability, character-creation |
| `character/abilities/agile-charge` | Agile Charge | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/agile-dodge` | Agile Dodge | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/bash` | Bash | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/bolster` | Bolster | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/charge` | Charge | snippet (proposed) | core | feature | core | high | ability, core, general |
| `character/abilities/controlled-suppressing-fire` | Controlled Suppressing Fire | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/coordinated-strike` | Coordinated Strike | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/danger-reflex` | Danger Reflex | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/dead-drop` | Dead Drop | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/defender` | Defender | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/dual-attack` | Dual Attack | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/dual-defense` | Dual Defense | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/dual-strike` | Dual Strike | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/expert` | Expert | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/extended-rage` | Extended Rage | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/extra-attack` | Extra Attack | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/fast-kit-trap` | Fast Kit Trap | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/fearless-rage` | Fearless Rage | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/field-medic` | Field Medic | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/field-patch` | Field Patch | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/focus-attack` | Focus Attack | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/focus-in` | Focus In | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/friend-in-need` | Friend in Need | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/general-spectacle` | General Spectacle | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/improved-bash` | Improved Bash | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/improved-suppressing-fire` | Improved Suppressing Fire | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/indomitable-rage` | Indomitable Rage | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/just-grazed` | Just Grazed | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/just-winded` | Just Winded | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/kit-trap` | Kit Trap | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/leaping-charge` | Leaping Charge | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/leg-shot` | Leg Shot | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/line-of-fire` | Line of Fire | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/long-performance` | Long Performance | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/martial-supremacy` | Martial Supremacy | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/momentum-dodge` | Momentum Dodge | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/oppressive-suppression` | Oppressive Suppression | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/outburst` | Outburst | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/patient-shot` | Patient Shot | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/powerful-rage` | Powerful Rage | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/precise-focus` | Precise Focus | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/quick-draw` | Quick Draw | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/quick-firing` | Quick Firing | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/rage` | Rage | snippet (proposed) | core | feature | core | high | ability, core, general |
| `character/abilities/rally` | Rally | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/reckless-attack` | Reckless Attack | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/slip-strike` | Slip Strike | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/student` | Student | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/suppressing-fire` | Suppressing Fire | snippet (proposed) | core | feature | core | high | ability, core, general |
| `character/abilities/swift-dual-attack` | Swift Dual Attack | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/the-look` | The Look | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/true-defender` | True Defender | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/unsettling-rage` | Unsettling Rage | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/vital-focus` | Vital Focus | snippet (proposed) | core | feature | core | low | ability, core, general |
| `character/abilities/vital-strike` | Vital Strike | snippet (proposed) | core | feature | core | medium | ability, core, general |
| `character/abilities/adaptive-luck` | Adaptive Luck | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/bonus-luck` | Bonus Luck | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/friend-of-fortune` | Friend of Fortune | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/lucky-strike` | Lucky Strike | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/medical-marvel` | Medical Marvel | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/natural-gift` | Natural Gift | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/tis-but-a-scratch` | Tis But a Scratch | snippet (proposed) | core | feature | core | low | ability, core, luck |
| `character/abilities/tech-armor` | Tech Armor | snippet (proposed) | sci-fi | feature | module | medium | ability, sci-fi, general |
| `character/abilities/companion-bot` | Companion Bot | snippet (proposed) | sci-fi | feature | module | medium | ability, sci-fi, general |
| `character/abilities/ghost-protocol` | Ghost Protocol | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, general |
| `character/abilities/opensaysame` | Opensaysame | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, general |
| `character/abilities/rigged-comp-jack` | Rigged Comp Jack | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, general |
| `character/abilities/salvage` | Salvage | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, general |
| `character/abilities/signal-intelligence` | Signal Intelligence | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, general |
| `character/abilities/special-encouragement` | Special Encouragement | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, general |
| `character/abilities/battery-saboteur` | Battery Saboteur | snippet (proposed) | sci-fi | feature | module | medium | ability, sci-fi, battery |
| `character/abilities/battery-saver` | Battery Saver | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, battery |
| `character/abilities/overcharge` | Overcharge | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, battery |
| `character/abilities/power-main-tap` | Power Main Tap | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, battery |
| `character/abilities/swift-custom-battery` | Swift Custom Battery | snippet (proposed) | sci-fi | feature | module | low | ability, sci-fi, battery |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `ability` | 76 |
| `general` | 63 |
| `core` | 62 |
| `sci-fi` | 13 |
| `luck` | 7 |
| `battery` | 5 |

## `content/docs/free-srd/inventory--equipment/_index.md`

**No blocks proposed.** Nav list.


## `content/docs/free-srd/inventory--equipment/inventory.md`

**Granularity:** Two blocks: carry limits (weight + bulky are one budget system) and body slots (with the equipped-armor note folded in).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/inventory/carry-limits` | Inventory Management | snippet (proposed) | core | rule | core | low | inventory |
| `gear/inventory/body-slots` | Equipment Body Slots | snippet (proposed) | core | rule | core | low | inventory |

## `content/docs/free-srd/inventory--equipment/equipment.md`

**Granularity:** One block: the Common Equipment Terms glossary (price/weight/Object DEF/DEF bonus/range/tags) reads as a unit; individual terms are too small to stand alone. The by-module link list is nav.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/equipment/common-terms` | Common Equipment Terms | snippet (proposed) | core | rule | core | low | equipment |

## `content/docs/free-srd/inventory--equipment/generic-equipment.md`

**Granularity:** Fine: one block per item (each `details` is an item entry). Grouped entries (Pouch Sets, Bandages) hold multiple items in one details — Queue 5. Section headings become tags (tag-as-query).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/generic-equipment/face-wrap` | Face Wrap | snippet (proposed) | core | equipment | core | low | equipment, generic, clothing |
| `gear/generic-equipment/heavy-cloak` | Heavy Cloak | snippet (proposed) | core | equipment | core | low | equipment, generic, clothing |
| `gear/generic-equipment/rain-poncho` | Rain Poncho | snippet (proposed) | core | equipment | core | low | equipment, generic, clothing |
| `gear/generic-equipment/reinforced-boots` | Reinforced Boots | snippet (proposed) | core | equipment | core | low | equipment, generic, clothing |
| `gear/generic-equipment/wide-brim-hat` | Wide-Brim Hat | snippet (proposed) | core | equipment | core | low | equipment, generic, clothing |
| `gear/generic-equipment/work-gloves` | Work Gloves | snippet (proposed) | core | equipment | core | low | equipment, generic, clothing |
| `gear/generic-equipment/backpack` | Backpack | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/barrel` | Barrel | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/lockable-chest` | Chest, Lockable | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/crate` | Crate | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/dry-sack` | Dry Sack | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `generic-equipment/pouch-sets` | Pouch Set, Ammo ⚠ multi-item (3 headings in one details) | snippet (proposed) | core | equipment | core | medium | equipment, generic, containers |
| `gear/generic-equipment/quiver` | Quiver / Bolt Case | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/saddlebags` | Saddlebags | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/satchel` | Satchel | snippet (proposed) | core | equipment | core | low | equipment, generic, containers |
| `gear/generic-equipment/candle` | Candle | snippet (proposed) | core | equipment | core | low | equipment, generic, light-sources |
| `gear/generic-equipment/fuel-oil-flask` | Fuel / Oil Flask | snippet (proposed) | core | equipment | core | low | equipment, generic, light-sources |
| `gear/generic-equipment/oil-lantern` | Oil Lantern | snippet (proposed) | core | equipment | core | low | equipment, generic, light-sources |
| `gear/generic-equipment/torch` | Torch | snippet (proposed) | core | equipment | core | low | equipment, generic, light-sources |
| `gear/generic-equipment/antiseptic-poultice` | Antiseptic Poultice | snippet (proposed) | core | equipment | core | low | equipment, generic, medical |
| `gear/generic-equipment/antitoxin` | Antitoxin | snippet (proposed) | core | equipment | core | low | equipment, generic, medical |
| `generic-equipment/bandages` | Bandages, Large ⚠ multi-item (2 headings in one details) | snippet (proposed) | core | equipment | core | low | equipment, generic, medical |
| `gear/generic-equipment/restorative-tonic` | Restorative Tonic | snippet (proposed) | core | equipment | core | low | equipment, generic, medical |
| `gear/generic-equipment/splint-materials` | Splint Materials | snippet (proposed) | core | equipment | core | low | equipment, generic, medical |
| `gear/generic-equipment/bedroll` | Bedroll | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/compass` | Compass / Navigational Tool | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/field-ration` | Field Ration | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/fire-starter` | Fire-Starter | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/rope-50ft` | Rope, 50ft | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/signal-mirror` | Signal Mirror | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/signal-whistle` | Signal Whistle | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/tent-2-person` | Tent, 2-Person | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/tent-4-person` | Tent, 4-Person | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/waterskin` | Waterskin / Canteen | snippet (proposed) | core | equipment | core | low | equipment, generic, survival |
| `gear/generic-equipment/chain-10ft` | Chain, 10ft | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/chalk-sticks` | Chalk / Charcoal Sticks | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/grappling-hook` | Grappling Hook | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/ink-writing-instrument` | Ink & Writing Instrument | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/long-crowbar` | Long Crowbar | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/manacles` | Manacles / Restraints | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/parchment-sheets` | Parchment / Paper Sheets (5) | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/pitons` | Pitons / Climbing Spikes (6) | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/sewing-set` | Sewing Set | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/shovel` | Shovel | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/whetstone` | Whetstone | snippet (proposed) | core | equipment | core | low | equipment, generic, tools |
| `gear/generic-equipment/animal-feed` | Animal Feed (1 day) | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/twine` | Ball of Twine / String | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/blank-book-journal` | Blank Book / Journal | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/block-of-soap` | Block of Soap | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/common-alcohol-flask` | Common Alcohol, Flask | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/bag-of-salt` | Bag of Salt | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/iron-spikes` | Iron Spikes (10) | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/small-bell` | Small Bell | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/candle-wax-block` | Candle Wax Block | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/coil-of-wire` | Coil of Wire | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |
| `gear/generic-equipment/wooden-stakes` | Wooden Stakes (6) | snippet (proposed) | core | equipment | core | low | equipment, generic, trade-goods |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `equipment` | 56 |
| `generic` | 56 |
| `tools` | 11 |
| `trade-goods` | 11 |
| `survival` | 10 |
| `containers` | 9 |
| `clothing` | 6 |
| `medical` | 5 |
| `light-sources` | 4 |

## `content/docs/free-srd/inventory--equipment/item-tags.md`

**Granularity:** Fine: one block per tag — tags are the definitional units that equipment blocks lean on (those edges are queued as suspected hard dependencies).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/item-tags/adaptive-mesh` | Adaptive Mesh | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/arcing` | Arcing | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/ballistic` | Ballistic | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/battery` | Battery | snippet (proposed) | core | rule | core | high | item-tag |
| `gear/item-tags/belt-fed` | Belt Fed | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/bulky` | Bulky | snippet (proposed) | core | rule | core | high | item-tag |
| `gear/item-tags/concealable` | Concealable | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/durable` | Durable | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/firing-modes` | Firing Modes | snippet (proposed) | core | rule | core | high | item-tag |
| `gear/item-tags/fragile` | Fragile | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/fuel-cells` | Fuel Cell | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/injector` | Injector | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/long-reload` | Long Reload | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/pressurized` | Pressurized | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/power-source` | Power Source | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/rounds-reload` | Rounds Reload | snippet (proposed) | core | rule | core | low | item-tag |
| `gear/item-tags/space-suit` | Space Suit | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/throwable` | Throwable | snippet (proposed) | core | rule | core | medium | item-tag |
| `gear/item-tags/two-handed` | Two-Handed | snippet (proposed) | core | rule | core | high | item-tag |
| `gear/item-tags/versatile` | Versatile | snippet (proposed) | core | rule | core | low | item-tag |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `item-tag` | 20 |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/_index.md`

**No blocks proposed.** Nav list.


## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons.md`

**Granularity:** Fine: one block per weapon/upgrade. Weapon-class headings become tags (tag-as-query).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/sci-fi-equipment/knuckle-taser` | Knuckle Taser | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, light-melee |
| `gear/sci-fi-equipment/standard-issue-knife` | Standard Issue Knife | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, light-melee |
| `gear/sci-fi-equipment/emergency-hatchet` | Emergency Hatchet | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, medium-melee |
| `gear/sci-fi-equipment/ripper-blade` | Ripper Blade | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, medium-melee |
| `gear/sci-fi-equipment/shock-baton` | Shock Baton | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, medium-melee |
| `gear/sci-fi-equipment/auto-pistol` | Auto Pistol | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, pistol |
| `gear/sci-fi-equipment/heavy-pistol` | Heavy Pistol | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, pistol |
| `gear/sci-fi-equipment/laser-pistol` | Laser Pistol | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, pistol |
| `gear/sci-fi-equipment/light-pistol` | Light Pistol | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, pistol |
| `gear/sci-fi-equipment/compact-rifle` | Compact Rifle | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, rifle |
| `gear/sci-fi-equipment/laser-rifle` | Laser Rifle | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, rifle |
| `gear/sci-fi-equipment/long-rifle` | Long Rifle | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, rifle |
| `gear/sci-fi-equipment/shock-rifle` | Shock Rifle | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, rifle |
| `gear/sci-fi-equipment/standard-issue-rifle` | Standard Issue Rifle | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, rifle |
| `gear/sci-fi-equipment/heavy-rotary-cannon` | Heavy Rotary Cannon | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, weapon, heavy-ranged |
| `gear/sci-fi-equipment/bipod` | Bipod | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/drum-magazines` | Drum Magazines | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/extended-barrel` | Extended Barrel | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/forward-assault-shield` | Forward Assault Shield | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/overcharge-chamber` | Overcharge Chamber | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/recoil-compensation-system` | Recoil Compensation System | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/reflex-sight` | Reflex Sight | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, ranged-upgrade |
| `gear/sci-fi-equipment/shock-charger` | Shock Charger | snippet (proposed) | sci-fi | equipment | module | medium | equipment, sci-fi, upgrade, melee-upgrade |
| `gear/sci-fi-equipment/weighted-core` | Weighted Core | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, melee-upgrade |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `equipment` | 24 |
| `sci-fi` | 24 |
| `weapon` | 15 |
| `upgrade` | 9 |
| `ranged-upgrade` | 7 |
| `rifle` | 5 |
| `pistol` | 4 |
| `medium-melee` | 3 |
| `light-melee` | 2 |
| `melee-upgrade` | 2 |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor.md`

**Granularity:** Fine: one block per armor/upgrade/shield. Light/Heavy sections become tags. Page intro composes the armor-basics + armor-degradation snippets.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/sci-fi-equipment/basic-p-suit` | Basic P-Suit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/classic-evosuit` | Classic Evosuit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/combat-vest` | Combat Vest | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/light-combat-vest` | Light Combat Vest | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/padded-flight-suit` | Padded Flight Suit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/scav-gear` | Scav Gear | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/site-safety-gear` | Site Safety Gear | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, light-armor |
| `gear/sci-fi-equipment/combat-evosuit` | Combat Evosuit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, heavy-armor |
| `gear/sci-fi-equipment/enforcer-armor` | Enforcer Armor | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, heavy-armor |
| `gear/sci-fi-equipment/eva-suit` | EVA Suit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, heavy-armor |
| `gear/sci-fi-equipment/security-flight-suit` | Security Flight Suit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, heavy-armor |
| `gear/sci-fi-equipment/ultraweave-evosuit` | Ultraweave Evosuit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, armor, heavy-armor |
| `gear/sci-fi-equipment/auto-injector` | Auto-Injector | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/chameleon-unit` | Chameleon Unit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/emergency-shank` | Emergency Shank | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/hazard-hud` | Hazard HUD | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/coms-unit` | Coms Unit | snippet (proposed) | sci-fi | equipment | module | high | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/mebn-hud` | MeBN HUD | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/safer-unit` | SAFER Unit | snippet (proposed) | sci-fi | equipment | module | medium | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/targeting-hud` | Targeting HUD | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, upgrade, armor-upgrade |
| `gear/sci-fi-equipment/ballistic-shield` | Ballistic Shield | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, shield |
| `gear/sci-fi-equipment/collapsible-shield` | Collapsible Shield | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, shield |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `equipment` | 22 |
| `sci-fi` | 22 |
| `armor` | 12 |
| `upgrade` | 8 |
| `armor-upgrade` | 8 |
| `light-armor` | 7 |
| `heavy-armor` | 5 |
| `shield` | 2 |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-kits.md`

**Granularity:** Fine: one block per kit, plus a block for the kit-supplies rules in the intro.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/sci-fi-equipment/kit-supplies` | Sci-Fi Tool Kits | snippet (proposed) | sci-fi | rule | module | low | equipment, kit, sci-fi — Kit supply mechanics (1d12 supply, refills, tools-only actions). |
| `gear/sci-fi-equipment/b-e-kit` | B&E Kit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, kit |
| `gear/sci-fi-equipment/disguise-kit` | Disguise Kit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, kit |
| `gear/sci-fi-equipment/medical-kit` | Medical Kit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, kit |
| `gear/sci-fi-equipment/repair-kit` | Repair Kit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, kit |
| `gear/sci-fi-equipment/tech-kit` | Tech Kit | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, kit |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `equipment` | 6 |
| `kit` | 6 |
| `sci-fi` | 6 |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment.md`

**Granularity:** Fine: one block per item; section headings become tags.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/sci-fi-equipment/coms-headset` | Coms Headset | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, communications |
| `gear/sci-fi-equipment/long-range-coms` | Long Range Coms | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, communications |
| `gear/sci-fi-equipment/mobile-phone` | Mobile Phone | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, communications |
| `gear/sci-fi-equipment/ara-5` | Analgesic Radiation Antidote 5 (ARA-5) | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, medical |
| `gear/sci-fi-equipment/crash-foam-canister` | Crash Foam Canister | snippet (proposed) | sci-fi | equipment | module | medium | equipment, sci-fi, medical |
| `gear/sci-fi-equipment/emergency-trauma-patch` | Emergency Trauma Patch | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, medical |
| `gear/sci-fi-equipment/pain-suppressant-injector` | Pain Suppressant Injector | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, medical |
| `gear/sci-fi-equipment/vitaboost-injector` | Vitaboost Injector | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, medical |
| `gear/sci-fi-equipment/emergency-beacon` | Emergency Beacon | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/emergency-oxygen-mask` | Emergency Oxygen Mask | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/field-ration` | Field Ration | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/portable-heater` | Portable Heater | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/portable-water-purifier` | Portable Water Purifier | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/solar-array-pack` | Solar Array Pack | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/survival-tent` | Survival Tent | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, survival |
| `gear/sci-fi-equipment/bio-scanner` | Bio Scanner | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/bioskin-veil` | Bioskin Veil | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/boost-pack` | Boost Pack | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/comp-jack` | Comp Jack | snippet (proposed) | sci-fi | equipment | module | medium | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/data-spike` | Data Spike | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/decoy-beacon` | Decoy Beacon | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/fuel-cells` | Fuel Cells | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/grapple-line-launcher` | Grapple-Line Launcher | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/gravity-anchor` | Gravity Anchor | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/jump-boosters` | Jump Boosters | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/jump-pack` | Jump Pack | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/mag-boots` | Mag Boots | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/mag-cuffs` | Mag Cuffs | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/mini-laser-cutter` | Mini Laser Cutter | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/personal-shield` | Personal Shield | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/reactor-cores` | Reactor Cores | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/remote-detonator` | Remote Detonator | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/signature-spoofer` | Signature Spoofer | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/squad-shield` | Squad Shield | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |
| `gear/sci-fi-equipment/battery-cores` | Standardized Battery Cores | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, tech |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `equipment` | 35 |
| `sci-fi` | 35 |
| `tech` | 20 |
| `survival` | 7 |
| `medical` | 5 |
| `communications` | 3 |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/_index.md`

**Granularity:** The drones/robots/Androids taxonomy (and the character-rules-not-object-rules ruling) is a real rule block; the platform lists are nav.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `rules/bots/automated-machines` | Bots & Drones | snippet (proposed) | sci-fi | rule | module | low | bots, sci-fi |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/hel-1.md`

**Granularity:** Platform entry (WIP stub).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `bots/hel-1` | HEL-1 | page | sci-fi | creature | module | low | bots, drones, wip |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/t00l.md`

**Granularity:** Platform entry (WIP stub).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `bots/t00l` | T00L | page | sci-fi | creature | module | low | bots, wip |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/b2.md`

**Granularity:** Platform entry (WIP stub).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `bots/bal` | BAL | page | sci-fi | creature | module | low | bots, drones, wip |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/trk-a.md`

**Granularity:** Platform entry (WIP stub).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `bots/trk-a` | TRK-A | page | sci-fi | creature | module | low | bots, wip |

## `content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md`

**Granularity:** Fine: one block per component, plus three rule blocks (installation, power, damage/wounds). Signal Masts details holds two components — Queue 5.

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `gear/components/overview` | Components | snippet (proposed) | sci-fi | reference | module | low | component, sci-fi |
| `gear/components/installation` | Installation | snippet (proposed) | sci-fi | rule | module | low | component, sci-fi |
| `gear/components/power-sources` | Power Sources and batteries | snippet (proposed) | sci-fi | rule | module | low | component, sci-fi |
| `gear/components/damage-and-wounds` | Damage and Wounds | snippet (proposed) | sci-fi | rule | module | low | component, sci-fi |
| `gear/components/audio-processor` | Audio Processor | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/augmented-arm-actuators` | Augmented Arm Actuators | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/automatic-crash-foam-system` | Automatic Crash Foam System | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/backup-power-cell` | Backup Power Cell | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/heavy-wrist-laser` | Heavy Wrist Laser | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/improved-cooling-system` | Improved Cooling System | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/internal-comp-jack` | Internal Comp Jack | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/manipulator-override` | Manipulator Override | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/optical-suite` | Optical Suite | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/reinforced-chassis-plating` | Reinforced Chassis Plating | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/relay-node` | Relay Node | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/repair-subroutine` | Repair Subroutine | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/servo-boost-legs` | Servo Boost Legs | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/shield-mount` | Shield Mount | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `components/signal-masts` | Signal Mast, Retractable ⚠ multi-item (2 headings in one details) | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/stabilizer-gyros` | Stabilizer Gyros | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/subdermal-plating` | Subdermal Plating | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/targeting-array` | Targeting Array | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |
| `gear/components/wrist-laser` | Wrist Laser | snippet (proposed) | sci-fi | equipment | module | low | equipment, sci-fi, component |

**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):

| Tag | Blocks on this page |
|---|---|
| `component` | 23 |
| `sci-fi` | 23 |
| `equipment` | 19 |

## `content/docs/free-srd/inventory--equipment/frontier--industry-equipment/_index.md`

**No blocks proposed.** Draft stub, frontmatter only.


## `content/docs/free-srd/inventory--equipment/medieval-equipment/_index.md`

**No blocks proposed.** Draft stub, frontmatter only.


## `content/docs/free-srd/inventory--equipment/modern-equipment/_index.md`

**No blocks proposed.** Draft stub, frontmatter only.


## `content/docs/free-srd/sci-fi-module.md`

**No blocks proposed.** Draft stub (draft: true), one sentence + TODO comment.


## `content/docs/downloads.md`

**No blocks proposed.** Site utility page (PDF downloads).


## `content/docs/roadmap.md`

**No blocks proposed.** Dynamic roadmap shortcode; site page.


## `content/docs/contributors.md`

**No blocks proposed.** Credits; site page.


## `content/docs/appinstall.md`

**No blocks proposed.** PWA install help; site page.


## `content/docs/legal.md`

**Granularity:** One coherent unit; the license/attribution text is genuinely useful as a single block in a print PDF (CC BY-NC-SA requires attribution).

| ID | Title | Home | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|---|
| `site/license` | Legal Information | page | core | reference | core | low | legal |

## `content/snippets/_index.md`

**No blocks proposed.** Build-suppression frontmatter only (render: never cascade).


## `content/snippets/` (existing snippet files — already blocks)

**Granularity:** one file = one block, as-is. The two announcement banners are site chrome and excluded from the buildable corpus.

| ID | Snippet file | Cat | Type | Tier | Ref | Tags |
|---|---|---|---|---|---|---|
| `rules/actions/move` | content/snippets/move.md | core | rule | core | low | actions, movement |
| `rules/actions/step` | content/snippets/step.md | core | rule | core | low | actions, movement |
| `rules/combat/damage-dice` | content/snippets/damage-dice.md | core | rule | core | low | combat, damage |
| `rules/combat/grapple` | content/snippets/grapple.md | core | rule | core | low | combat, stats |
| `rules/combat/initiative` | content/snippets/initiative.md | core | rule | core | low | combat, stats |
| `rules/combat/opportunity-attack` | content/snippets/opportunity-attack.md | core | rule | core | low | combat, actions |
| `rules/combat/stealth` | content/snippets/stealth.md | core | rule | core | low | combat, stats |
| `rules/environment/extreme-environments` | content/snippets/extreme-environments.md | sci-fi | rule | module | low | environment, sci-fi |
| `gear/equipment/armor-basics` | content/snippets/armor.md | core | rule | core | low | equipment, armor |
| `gear/equipment/medkit-note` | content/snippets/medical-item-medkit-note.md | core | reference | core | medium | equipment, medical |
| `gear/equipment/shields-basics` | content/snippets/shields.md | core | rule | core | low | equipment, shield |
| `rules/health/applying-damage` | content/snippets/health-loop.md | core | rule | core | low | health, combat, damage |
| `rules/movement/primary-speed` | content/snippets/primary-speed.md | core | rule | core | low | movement, stats |
| `rules/movement/speed-descriptors` | content/snippets/speed-descriptors.md | core | rule | core | low | movement |
| `rules/movement/speed-tiers` | content/snippets/speed-tiers.md | core | rule | core | low | movement |
| `rules/movement/speed-tiers-chart` | content/snippets/speed-tiers-chart.md | core | reference | core | medium | movement |
| `rules/objects/armor-degradation` | content/snippets/armor-damage.md | core | rule | core | low | objects, armor |
| `rules/objects/shield-degradation` | content/snippets/shields-damage.md | core | rule | core | low | objects, shield |
| `rules/sci-fi/ballistics-in-space` | content/snippets/sci-fi-add-ballistic.md | sci-fi | rule | module | low | sci-fi, combat |
| `rules/sci-fi/communications` | content/snippets/coms.md | sci-fi | rule | module | low | sci-fi, equipment |
| `rules/sci-fi/energy-shields` | content/snippets/energy-shields.md | sci-fi | rule | module | medium | sci-fi, equipment, shield |
| `rules/sci-fi/huds` | content/snippets/huds.md | sci-fi | rule | module | medium | sci-fi, equipment |
| `site/announcement` ⚠ excluded: site chrome, not a buildable block | content/snippets/announcement.md | core | reference | core | low | site-chrome |
| `site/wip-announcement` ⚠ excluded: site chrome, not a buildable block | content/snippets/wip-announcement.md | core | reference | core | high | site-chrome |
| `rules/stats/action-points` | content/snippets/action-points.md | core | rule | core | low | stats, actions |
| `rules/stats/defense` | content/snippets/defense.md | core | rule | core | medium | stats, health |
| `rules/stats/vitality` | content/snippets/vitality.md | core | rule | core | low | stats, health |

## Same-name blocks (identity decisions, §4.5)

Distinct proposed IDs that share a display name. Each needs a ruling: one block with two tags, or two blocks that legitimately share a name. Recommendations in Queue 2 where the case is nontrivial.

- **armor**: `character/proficiencies/armor`, `gear/equipment/armor-basics`
- **b&e kit**: `gear/sci-fi-equipment/b-e-kit`, `character/proficiencies/b-e-kit`
- **comp jack**: `gear/sci-fi-equipment/comp-jack`, `character/proficiencies/comp-jack`
- **disguise kit**: `gear/sci-fi-equipment/disguise-kit`, `character/proficiencies/disguise-kit`
- **field ration**: `gear/generic-equipment/field-ration`, `gear/sci-fi-equipment/field-ration`
- **repair kit**: `gear/sci-fi-equipment/repair-kit`, `character/proficiencies/repair-kit`
- **wounds & conditions**: `stats/wounds-and-conditions-summary`, `rules/wounds/overview`

# Queue 1 — Hard-dependency decisions

**Every edge here is *suspected* coherence-critical. None has been finalized.**
For each edge the human rules `dependency` (builder must auto-include the target)
or `reference` (surfaced at preflight as a fillable hole). Until ruled, all of
these remain `reference` in `edges.json` with `queued: true`.

A wrong `dependency` bloats every PDF; a wrong `reference` ships a silently
broken PDF. When in doubt, rule `reference` — preflight will still catch it.

Edges are grouped into five classes. A per-class blanket ruling is possible
(e.g. "all prerequisites are `dependency`"), with per-edge exceptions noted
inline.

### Class: `prerequisite` — feature requirement chains

Links inside the italic requirement line of an ability/proficiency/trait
(e.g. *[Charge](#charge), STR 2, Level 3*). A GM who prints Bash without Charge
gets a feature that references a rule that isn't in the PDF. These are the
strongest dependency candidates in the corpus — but auto-including whole chains
(Tis But a Scratch pulls Defender, Just Winded, Just Grazed, Tough…) is a real
size cost. Decide the policy once, here.

75 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `abilities/agile-charge` | `abilities/charge` | content/docs/free-srd/character-creation/abilities.md:116 |  |
| `abilities/bash` | `abilities/charge` | content/docs/free-srd/character-creation/abilities.md:132 |  |
| `abilities/battery-saboteur` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:728 |  |
| `abilities/companion-bot` | `proficiencies/general-robotics` | content/docs/free-srd/character-creation/abilities.md:664 |  |
| `abilities/controlled-suppressing-fire` | `abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:154 |  |
| `abilities/controlled-suppressing-fire` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:154 |  |
| `abilities/dead-drop` | `proficiencies/b-e-kit` | content/docs/free-srd/character-creation/abilities.md:179 |  |
| `abilities/dual-attack` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:198 |  |
| `abilities/dual-defense` | `abilities/dual-attack` | content/docs/free-srd/character-creation/abilities.md:206 |  |
| `abilities/dual-defense` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:206 |  |
| `abilities/dual-strike` | `abilities/dual-attack` | content/docs/free-srd/character-creation/abilities.md:216 |  |
| `abilities/dual-strike` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:216 |  |
| `abilities/expert` | `abilities/student` | content/docs/free-srd/character-creation/abilities.md:227 |  |
| `abilities/extended-rage` | `abilities/rage` | content/docs/free-srd/character-creation/abilities.md:237 |  |
| `abilities/extra-attack` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:247 |  |
| `abilities/fearless-rage` | `abilities/rage` | content/docs/free-srd/character-creation/abilities.md:265 |  |
| `abilities/field-medic` | `proficiencies/medic-training` | content/docs/free-srd/character-creation/abilities.md:273 |  |
| `abilities/field-patch` | `proficiencies/medic-training` | content/docs/free-srd/character-creation/abilities.md:281 |  |
| `abilities/friend-in-need` | `traits/tough` | content/docs/free-srd/character-creation/abilities.md:305 |  |
| `abilities/friend-of-fortune` | `traits/lucky` | content/docs/free-srd/character-creation/abilities.md:614 |  |
| `abilities/ghost-protocol` | `proficiencies/comp-jack` | content/docs/free-srd/character-creation/abilities.md:674 |  |
| `abilities/improved-bash` | `abilities/bash` | content/docs/free-srd/character-creation/abilities.md:325 |  |
| `abilities/improved-bash` | `abilities/charge` | content/docs/free-srd/character-creation/abilities.md:325 |  |
| `abilities/improved-suppressing-fire` | `abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:333 |  |
| `abilities/improved-suppressing-fire` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:333 |  |
| `abilities/indomitable-rage` | `abilities/fearless-rage` | content/docs/free-srd/character-creation/abilities.md:341 |  |
| `abilities/indomitable-rage` | `abilities/rage` | content/docs/free-srd/character-creation/abilities.md:341 |  |
| `abilities/indomitable-rage` | `traits/unshakable` | content/docs/free-srd/character-creation/abilities.md:341 |  |
| `abilities/just-grazed` | `abilities/defender` | content/docs/free-srd/character-creation/abilities.md:349 |  |
| `abilities/just-winded` | `abilities/defender` | content/docs/free-srd/character-creation/abilities.md:357 |  |
| `abilities/leaping-charge` | `abilities/agile-charge` | content/docs/free-srd/character-creation/abilities.md:377 |  |
| `abilities/leaping-charge` | `abilities/charge` | content/docs/free-srd/character-creation/abilities.md:377 |  |
| `abilities/leg-shot` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:385 |  |
| `abilities/line-of-fire` | `abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:393 |  |
| `abilities/line-of-fire` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:393 |  |
| `abilities/martial-supremacy` | `proficiencies/martial-training` | content/docs/free-srd/character-creation/abilities.md:409 |  |
| `abilities/momentum-dodge` | `abilities/agile-dodge` | content/docs/free-srd/character-creation/abilities.md:418 |  |
| `abilities/momentum-dodge` | `proficiencies/martial-training` | content/docs/free-srd/character-creation/abilities.md:418 |  |
| `abilities/opensaysame` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:682 |  |
| `abilities/oppressive-suppression` | `abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:426 |  |
| `abilities/oppressive-suppression` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:426 |  |
| `abilities/overcharge` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:750 |  |
| `abilities/patient-shot` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:444 |  |
| `abilities/power-main-tap` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:758 |  |
| `abilities/powerful-rage` | `abilities/rage` | content/docs/free-srd/character-creation/abilities.md:452 |  |
| `abilities/precise-focus` | `abilities/focus-attack` | content/docs/free-srd/character-creation/abilities.md:460 |  |
| `abilities/precise-focus` | `abilities/focus-in` | content/docs/free-srd/character-creation/abilities.md:460 |  |
| `abilities/quick-firing` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:478 |  |
| `abilities/rigged-comp-jack` | `proficiencies/comp-jack` | content/docs/free-srd/character-creation/abilities.md:692 |  |
| `abilities/rigged-comp-jack` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:692 |  |
| `abilities/salvage` | `proficiencies/repair-kit` | content/docs/free-srd/character-creation/abilities.md:700 |  |
| `abilities/signal-intelligence` | `proficiencies/comp-jack` | content/docs/free-srd/character-creation/abilities.md:708 |  |
| `abilities/slip-strike` | `abilities/agile-dodge` | content/docs/free-srd/character-creation/abilities.md:513 |  |
| `abilities/slip-strike` | `proficiencies/martial-training` | content/docs/free-srd/character-creation/abilities.md:513 |  |
| `abilities/special-encouragement` | `abilities/companion-bot` | content/docs/free-srd/character-creation/abilities.md:716 |  |
| `abilities/special-encouragement` | `proficiencies/general-robotics` | content/docs/free-srd/character-creation/abilities.md:716 |  |
| `abilities/suppressing-fire` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:531 |  |
| `abilities/swift-custom-battery` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:766 |  |
| `abilities/swift-dual-attack` | `abilities/dual-attack` | content/docs/free-srd/character-creation/abilities.md:540 |  |
| `abilities/swift-dual-attack` | `proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:540 |  |
| `abilities/tech-armor` | `proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:654 |  |
| `abilities/the-look` | `traits/particularly-attractive` | content/docs/free-srd/character-creation/abilities.md:548 |  |
| `abilities/tis-but-a-scratch` | `abilities/defender` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `abilities/tis-but-a-scratch` | `abilities/just-grazed` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `abilities/tis-but-a-scratch` | `abilities/just-winded` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `abilities/tis-but-a-scratch` | `traits/tough` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `abilities/true-defender` | `abilities/defender` | content/docs/free-srd/character-creation/abilities.md:556 |  |
| `abilities/true-defender` | `abilities/friend-in-need` | content/docs/free-srd/character-creation/abilities.md:556 |  |
| `abilities/true-defender` | `traits/tough` | content/docs/free-srd/character-creation/abilities.md:556 |  |
| `abilities/unsettling-rage` | `abilities/powerful-rage` | content/docs/free-srd/character-creation/abilities.md:564 |  |
| `abilities/unsettling-rage` | `abilities/rage` | content/docs/free-srd/character-creation/abilities.md:564 |  |
| `abilities/unsettling-rage` | `traits/intimidating` | content/docs/free-srd/character-creation/abilities.md:564 |  |
| `abilities/vital-focus` | `abilities/vital-strike` | content/docs/free-srd/character-creation/abilities.md:572 |  |
| `proficiencies/licensed-instincts` | `proficiencies/vehicle` | content/docs/free-srd/character-creation/proficiencies.md:87 |  |
| `proficiencies/medical-instincts` | `proficiencies/medic-training` | content/docs/free-srd/character-creation/proficiencies.md:110 |  |

### Class: `tag-definition` — equipment → item-tag definitions

Every equipment block that cites an item tag ([Bulky], [Ballistic [1d10]], …).
An item block whose tags aren't in the PDF is arguably incoherent (what does
Ballistic [1d12] mean without the Ballistic block?). One blanket ruling likely
covers all 82 edges — e.g. "tags are dependencies" or "the builder always
bundles the item-tags glossary when any equipment is selected" (which would
downgrade these to reference).

82 edges.

| Target tag block | Sources citing it |
|---|---|
| `item-tags/arcing` | `sci-fi-equipment/shock-rifle` |
| `item-tags/ballistic` | `sci-fi-equipment/drum-magazines`, `sci-fi-equipment/recoil-compensation-system` |
| `item-tags/battery` | `components/backup-power-cell`, `components/heavy-wrist-laser`, `components/improved-cooling-system`, `components/wrist-laser`, `sci-fi-equipment/bio-scanner`, `sci-fi-equipment/comp-jack`, `sci-fi-equipment/decoy-beacon`, `sci-fi-equipment/grapple-line-launcher`, `sci-fi-equipment/gravity-anchor`, `sci-fi-equipment/jump-boosters`, `sci-fi-equipment/mini-laser-cutter`, `sci-fi-equipment/personal-shield`, `sci-fi-equipment/portable-water-purifier`, `sci-fi-equipment/remote-detonator`, `sci-fi-equipment/signature-spoofer`, `sci-fi-equipment/squad-shield` |
| `item-tags/belt-fed` | `sci-fi-equipment/heavy-rotary-cannon` |
| `item-tags/bulky` | `generic-equipment/barrel`, `generic-equipment/crate`, `generic-equipment/lockable-chest`, `generic-equipment/tent-4-person`, `sci-fi-equipment/b-e-kit`, `sci-fi-equipment/battery-cores`, `sci-fi-equipment/boost-pack`, `sci-fi-equipment/fuel-cells`, `sci-fi-equipment/gravity-anchor`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/jump-pack`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/reactor-cores`, `sci-fi-equipment/repair-kit`, `sci-fi-equipment/safer-unit`, `sci-fi-equipment/survival-tent` |
| `item-tags/concealable` | `sci-fi-equipment/auto-pistol`, `sci-fi-equipment/light-combat-vest`, `sci-fi-equipment/light-pistol`, `sci-fi-equipment/standard-issue-knife` |
| `item-tags/firing-modes` | `components/heavy-wrist-laser`, `components/wrist-laser`, `sci-fi-equipment/auto-pistol`, `sci-fi-equipment/compact-rifle`, `sci-fi-equipment/heavy-pistol`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/laser-pistol`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/light-pistol`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/standard-issue-rifle` |
| `item-tags/fuel-cells` | `sci-fi-equipment/boost-pack`, `sci-fi-equipment/jump-pack`, `sci-fi-equipment/portable-heater` |
| `item-tags/injector` | `sci-fi-equipment/ara-5`, `sci-fi-equipment/pain-suppressant-injector`, `sci-fi-equipment/vitaboost-injector` |
| `item-tags/long-reload` | `sci-fi-equipment/heavy-rotary-cannon` |
| `item-tags/power-source` | `components/power-sources`, `sci-fi-equipment/reactor-cores` |
| `item-tags/pressurized` | `sci-fi-equipment/basic-p-suit` |
| `item-tags/space-suit` | `sci-fi-equipment/classic-evosuit`, `sci-fi-equipment/combat-evosuit`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/ultraweave-evosuit` |
| `item-tags/throwable` | `generic-equipment/grappling-hook`, `sci-fi-equipment/emergency-hatchet`, `sci-fi-equipment/standard-issue-knife`, `sci-fi-equipment/weighted-core` |
| `item-tags/two-handed` | `components/heavy-wrist-laser`, `sci-fi-equipment/comp-jack`, `sci-fi-equipment/compact-rifle`, `sci-fi-equipment/grapple-line-launcher`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/ripper-blade`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/standard-issue-rifle` |

### Class: `mechanism` — rule leans on another rule's machinery

Each suspected individually; the target defines machinery (a chart, a die
procedure, a defined term) without which the source block doesn't resolve.
Includes implicit dependencies where the prose relies on a mechanism *without
linking to it* (marked "implicit — no link in text").

29 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `combat/advantage-in-combat` | `basics/advantage` | content/docs/free-srd/core-rules/combat.md:44 |  |
| `combat/damage-dice` | `core-rules/size` | — | Dice determined by attacker/defender size comparison (implicit — no link in text) |
| `combat/opportunity-attack` | `proficiencies/martial-training` | content/snippets/opportunity-attack.md:5 |  |
| `conditions/dying` | `conditions/unconscious` | — | Dying character 'immediately falls unconscious (as the condition)' (implicit — no link in text) |
| `conditions/stressed` | `stats/stress-threshold` | — | Trigger defined by Stress Threshold (implicit — no link in text) |
| `environment/extreme-environments` | `combat/damage-resistance` | content/snippets/extreme-environments.md:11 |  |
| `environment/heat-and-cold` | `environment/exposure-intervals` | — | FORT-interval mechanism defined in Exposure Intervals; this block only lists consequences (implicit — no link in text) |
| `environment/toxic-atmosphere` | `environment/exposure-intervals` | — | Same interval mechanism dependency (implicit — no link in text) |
| `health/applying-damage` | `stats/defense` | — | The loop is defined in terms of DEF (implicit — no link in text) |
| `health/applying-damage` | `stats/vitality` | — | The loop is defined in terms of VIT (implicit — no link in text) |
| `item-tags/battery` | `sci-fi-equipment/battery-cores` | content/docs/free-srd/inventory--equipment/item-tags.md:84 |  |
| `item-tags/power-source` | `sci-fi-equipment/reactor-cores` | content/docs/free-srd/inventory--equipment/item-tags.md:174 |  |
| `item-tags/space-suit` | `combat/damage-resistance` | content/docs/free-srd/inventory--equipment/item-tags.md:196 |  |
| `item-tags/space-suit` | `combat/damage-resistance` | content/docs/free-srd/inventory--equipment/item-tags.md:197 |  |
| `item-tags/space-suit` | `item-tags/pressurized` | content/docs/free-srd/inventory--equipment/item-tags.md:193 |  |
| `item-tags/space-suit` | `sci-fi-equipment/coms-unit` | content/docs/free-srd/inventory--equipment/item-tags.md:194 |  |
| `objects/armor-degradation` | `objects/conditions` | — | Uses Damaged/Broken as defined terms (implicit — no link in text) |
| `objects/conditions` | `objects/durability` | — | The three conditions are VIT thresholds defined by Object Durability (implicit — no link in text) |
| `objects/shield-degradation` | `basics/supply-rolls` | — | Shield wear runs on supply dice (implicit — no link in text) |
| `objects/shield-degradation` | `objects/conditions` | — | Uses Damaged/Broken as defined terms (implicit — no link in text) |
| `sci-fi-equipment/comp-jack` | `proficiencies/comp-jack` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment.md:248 |  |
| `sci-fi-equipment/kit-supplies` | `basics/supply-rolls` | — | Kit supplies run on supply dice (implicit — no link in text) |
| `sci-fi/energy-shields` | `stats/defense` | — | Temporary DEF pool concept extends DEF (implicit — no link in text) |
| `stats/luck` | `conditions/stressed` | — | Stressed disables Luck (implicit — no link in text) |
| `stats/vitality` | `wounds/wounds` | content/snippets/vitality.md:24 |  |
| `vehicles/boarding-and-bailing` | `movement/speed-tiers-chart` | — | Targets are 6 + speed modifier from the chart (implicit — no link in text) |
| `vehicles/collision-damage` | `movement/speed-tiers-chart` | — | Formula uses the chart's speed modifier (implicit — no link in text) |
| `vehicles/impact-and-overrun` | `vehicles/collision-damage` | — | Failure outcomes resolve via collision damage (implicit — no link in text) |
| `vehicles/mounts` | `vehicles/collision-damage` | — | Sudden Stops deals collision damage (implicit — no link in text) |

### Class: `functions-as` — item defined by another item

Component/item blocks whose rules text is literally "functions as X"
(Wrist Laser → Laser Pistol, etc.). Without the target, the block has no rules.

5 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `components/automatic-crash-foam-system` | `sci-fi-equipment/crash-foam-canister` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:91 |  |
| `components/automatic-crash-foam-system` | `sci-fi-equipment/crash-foam-canister` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:93 |  |
| `components/heavy-wrist-laser` | `sci-fi-equipment/laser-rifle` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:115 |  |
| `components/internal-comp-jack` | `sci-fi-equipment/comp-jack` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:137 |  |
| `components/wrist-laser` | `sci-fi-equipment/laser-pistol` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:282 |  |

### Class: `exclusivity` — mutually exclusive selections

"Cannot be combined with" pairs. Not auto-include candidates in the usual sense,
but the builder needs to know about the pair for validation; queued so a human
decides how these are represented.

2 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `traits/particularly-attractive` | `traits/unremarkable` | content/docs/free-srd/character-creation/traits.md:97 |  |
| `traits/unremarkable` | `traits/particularly-attractive` | content/docs/free-srd/character-creation/traits.md:135 |  |


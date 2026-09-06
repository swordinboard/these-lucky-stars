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

<!-- these should be dependencies -->

75 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `character/abilities/agile-charge` | `character/abilities/charge` | content/docs/free-srd/character-creation/abilities.md:116 |  |
| `character/abilities/bash` | `character/abilities/charge` | content/docs/free-srd/character-creation/abilities.md:132 |  |
| `character/abilities/battery-saboteur` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:728 |  |
| `character/abilities/companion-bot` | `character/proficiencies/general-robotics` | content/docs/free-srd/character-creation/abilities.md:664 |  |
| `character/abilities/controlled-suppressing-fire` | `character/abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:154 |  |
| `character/abilities/controlled-suppressing-fire` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:154 |  |
| `character/abilities/dead-drop` | `character/proficiencies/b-e-kit` | content/docs/free-srd/character-creation/abilities.md:179 |  |
| `character/abilities/dual-attack` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:198 |  |
| `character/abilities/dual-defense` | `character/abilities/dual-attack` | content/docs/free-srd/character-creation/abilities.md:206 |  |
| `character/abilities/dual-defense` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:206 |  |
| `character/abilities/dual-strike` | `character/abilities/dual-attack` | content/docs/free-srd/character-creation/abilities.md:216 |  |
| `character/abilities/dual-strike` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:216 |  |
| `character/abilities/expert` | `character/abilities/student` | content/docs/free-srd/character-creation/abilities.md:227 |  |
| `character/abilities/extended-rage` | `character/abilities/rage` | content/docs/free-srd/character-creation/abilities.md:237 |  |
| `character/abilities/extra-attack` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:247 |  |
| `character/abilities/fearless-rage` | `character/abilities/rage` | content/docs/free-srd/character-creation/abilities.md:265 |  |
| `character/abilities/field-medic` | `character/proficiencies/medic-training` | content/docs/free-srd/character-creation/abilities.md:273 |  |
| `character/abilities/field-patch` | `character/proficiencies/medic-training` | content/docs/free-srd/character-creation/abilities.md:281 |  |
| `character/abilities/friend-in-need` | `character/traits/tough` | content/docs/free-srd/character-creation/abilities.md:305 |  |
| `character/abilities/friend-of-fortune` | `character/traits/lucky` | content/docs/free-srd/character-creation/abilities.md:614 |  |
| `character/abilities/ghost-protocol` | `character/proficiencies/comp-jack` | content/docs/free-srd/character-creation/abilities.md:674 |  |
| `character/abilities/improved-bash` | `character/abilities/bash` | content/docs/free-srd/character-creation/abilities.md:325 |  |
| `character/abilities/improved-bash` | `character/abilities/charge` | content/docs/free-srd/character-creation/abilities.md:325 |  |
| `character/abilities/improved-suppressing-fire` | `character/abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:333 |  |
| `character/abilities/improved-suppressing-fire` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:333 |  |
| `character/abilities/indomitable-rage` | `character/abilities/fearless-rage` | content/docs/free-srd/character-creation/abilities.md:341 |  |
| `character/abilities/indomitable-rage` | `character/abilities/rage` | content/docs/free-srd/character-creation/abilities.md:341 |  |
| `character/abilities/indomitable-rage` | `character/traits/unshakable` | content/docs/free-srd/character-creation/abilities.md:341 |  |
| `character/abilities/just-grazed` | `character/abilities/defender` | content/docs/free-srd/character-creation/abilities.md:349 |  |
| `character/abilities/just-winded` | `character/abilities/defender` | content/docs/free-srd/character-creation/abilities.md:357 |  |
| `character/abilities/leaping-charge` | `character/abilities/agile-charge` | content/docs/free-srd/character-creation/abilities.md:377 |  |
| `character/abilities/leaping-charge` | `character/abilities/charge` | content/docs/free-srd/character-creation/abilities.md:377 |  |
| `character/abilities/leg-shot` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:385 |  |
| `character/abilities/line-of-fire` | `character/abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:393 |  |
| `character/abilities/line-of-fire` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:393 |  |
| `character/abilities/martial-supremacy` | `character/proficiencies/martial-training` | content/docs/free-srd/character-creation/abilities.md:409 |  |
| `character/abilities/momentum-dodge` | `character/abilities/agile-dodge` | content/docs/free-srd/character-creation/abilities.md:418 |  |
| `character/abilities/momentum-dodge` | `character/proficiencies/martial-training` | content/docs/free-srd/character-creation/abilities.md:418 |  |
| `character/abilities/opensaysame` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:682 |  |
| `character/abilities/oppressive-suppression` | `character/abilities/suppressing-fire` | content/docs/free-srd/character-creation/abilities.md:426 |  |
| `character/abilities/oppressive-suppression` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:426 |  |
| `character/abilities/overcharge` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:750 |  |
| `character/abilities/patient-shot` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:444 |  |
| `character/abilities/power-main-tap` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:758 |  |
| `character/abilities/powerful-rage` | `character/abilities/rage` | content/docs/free-srd/character-creation/abilities.md:452 |  |
| `character/abilities/precise-focus` | `character/abilities/focus-attack` | content/docs/free-srd/character-creation/abilities.md:460 |  |
| `character/abilities/precise-focus` | `character/abilities/focus-in` | content/docs/free-srd/character-creation/abilities.md:460 |  |
| `character/abilities/quick-firing` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:478 |  |
| `character/abilities/rigged-comp-jack` | `character/proficiencies/comp-jack` | content/docs/free-srd/character-creation/abilities.md:692 |  |
| `character/abilities/rigged-comp-jack` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:692 |  |
| `character/abilities/salvage` | `character/proficiencies/repair-kit` | content/docs/free-srd/character-creation/abilities.md:700 |  |
| `character/abilities/signal-intelligence` | `character/proficiencies/comp-jack` | content/docs/free-srd/character-creation/abilities.md:708 |  |
| `character/abilities/slip-strike` | `character/abilities/agile-dodge` | content/docs/free-srd/character-creation/abilities.md:513 |  |
| `character/abilities/slip-strike` | `character/proficiencies/martial-training` | content/docs/free-srd/character-creation/abilities.md:513 |  |
| `character/abilities/special-encouragement` | `character/abilities/companion-bot` | content/docs/free-srd/character-creation/abilities.md:716 |  |
| `character/abilities/special-encouragement` | `character/proficiencies/general-robotics` | content/docs/free-srd/character-creation/abilities.md:716 |  |
| `character/abilities/suppressing-fire` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:531 |  |
| `character/abilities/swift-custom-battery` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:766 |  |
| `character/abilities/swift-dual-attack` | `character/abilities/dual-attack` | content/docs/free-srd/character-creation/abilities.md:540 |  |
| `character/abilities/swift-dual-attack` | `character/proficiencies/weapon` | content/docs/free-srd/character-creation/abilities.md:540 |  |
| `character/abilities/tech-armor` | `character/proficiencies/general-technology` | content/docs/free-srd/character-creation/abilities.md:654 |  |
| `character/abilities/the-look` | `character/traits/particularly-attractive` | content/docs/free-srd/character-creation/abilities.md:548 |  |
| `character/abilities/tis-but-a-scratch` | `character/abilities/defender` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `character/abilities/tis-but-a-scratch` | `character/abilities/just-grazed` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `character/abilities/tis-but-a-scratch` | `character/abilities/just-winded` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `character/abilities/tis-but-a-scratch` | `character/traits/tough` | content/docs/free-srd/character-creation/abilities.md:642 |  |
| `character/abilities/true-defender` | `character/abilities/defender` | content/docs/free-srd/character-creation/abilities.md:556 |  |
| `character/abilities/true-defender` | `character/abilities/friend-in-need` | content/docs/free-srd/character-creation/abilities.md:556 |  |
| `character/abilities/true-defender` | `character/traits/tough` | content/docs/free-srd/character-creation/abilities.md:556 |  |
| `character/abilities/unsettling-rage` | `character/abilities/powerful-rage` | content/docs/free-srd/character-creation/abilities.md:564 |  |
| `character/abilities/unsettling-rage` | `character/abilities/rage` | content/docs/free-srd/character-creation/abilities.md:564 |  |
| `character/abilities/unsettling-rage` | `character/traits/intimidating` | content/docs/free-srd/character-creation/abilities.md:564 |  |
| `character/abilities/vital-focus` | `character/abilities/vital-strike` | content/docs/free-srd/character-creation/abilities.md:572 |  |
| `character/proficiencies/licensed-instincts` | `character/proficiencies/vehicle` | content/docs/free-srd/character-creation/proficiencies.md:87 |  |
| `character/proficiencies/medical-instincts` | `character/proficiencies/medic-training` | content/docs/free-srd/character-creation/proficiencies.md:110 |  |

### Class: `tag-definition` — equipment → item-tag definitions

Every equipment block that cites an item tag ([Bulky], [Ballistic [1d10]], …).
An item block whose tags aren't in the PDF is arguably incoherent (what does
Ballistic [1d12] mean without the Ballistic block?). One blanket ruling likely
covers all 82 edges — e.g. "tags are dependencies" or "the builder always
bundles the item-tags glossary when any equipment is selected" (which would
downgrade these to reference).

<!-- these are references. not forced, but noted as a whole during flight check "Missing Item Tags Glossary referenced X times" -->

82 edges.

| Target tag block | Sources citing it |
|---|---|
| `gear/item-tags/arcing` | `gear/sci-fi-equipment/shock-rifle` |
| `gear/item-tags/ballistic` | `gear/sci-fi-equipment/drum-magazines`, `gear/sci-fi-equipment/recoil-compensation-system` |
| `gear/item-tags/battery` | `gear/components/backup-power-cell`, `gear/components/heavy-wrist-laser`, `gear/components/improved-cooling-system`, `gear/components/wrist-laser`, `gear/sci-fi-equipment/bio-scanner`, `gear/sci-fi-equipment/comp-jack`, `gear/sci-fi-equipment/decoy-beacon`, `gear/sci-fi-equipment/grapple-line-launcher`, `gear/sci-fi-equipment/gravity-anchor`, `gear/sci-fi-equipment/jump-boosters`, `gear/sci-fi-equipment/mini-laser-cutter`, `gear/sci-fi-equipment/personal-shield`, `gear/sci-fi-equipment/portable-water-purifier`, `gear/sci-fi-equipment/remote-detonator`, `gear/sci-fi-equipment/signature-spoofer`, `gear/sci-fi-equipment/squad-shield` |
| `gear/item-tags/belt-fed` | `gear/sci-fi-equipment/heavy-rotary-cannon` |
| `gear/item-tags/bulky` | `gear/generic-equipment/barrel`, `gear/generic-equipment/crate`, `gear/generic-equipment/lockable-chest`, `gear/generic-equipment/tent-4-person`, `gear/sci-fi-equipment/b-e-kit`, `gear/sci-fi-equipment/battery-cores`, `gear/sci-fi-equipment/boost-pack`, `gear/sci-fi-equipment/fuel-cells`, `gear/sci-fi-equipment/gravity-anchor`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/jump-pack`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/reactor-cores`, `gear/sci-fi-equipment/repair-kit`, `gear/sci-fi-equipment/safer-unit`, `gear/sci-fi-equipment/survival-tent` |
| `gear/item-tags/concealable` | `gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/light-combat-vest`, `gear/sci-fi-equipment/light-pistol`, `gear/sci-fi-equipment/standard-issue-knife` |
| `gear/item-tags/firing-modes` | `gear/components/heavy-wrist-laser`, `gear/components/wrist-laser`, `gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/heavy-pistol`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/laser-pistol`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/light-pistol`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/standard-issue-rifle` |
| `gear/item-tags/fuel-cells` | `gear/sci-fi-equipment/boost-pack`, `gear/sci-fi-equipment/jump-pack`, `gear/sci-fi-equipment/portable-heater` |
| `gear/item-tags/injector` | `gear/sci-fi-equipment/ara-5`, `gear/sci-fi-equipment/pain-suppressant-injector`, `gear/sci-fi-equipment/vitaboost-injector` |
| `gear/item-tags/long-reload` | `gear/sci-fi-equipment/heavy-rotary-cannon` |
| `gear/item-tags/power-source` | `gear/components/power-sources`, `gear/sci-fi-equipment/reactor-cores` |
| `gear/item-tags/pressurized` | `gear/sci-fi-equipment/basic-p-suit` |
| `gear/item-tags/space-suit` | `gear/sci-fi-equipment/classic-evosuit`, `gear/sci-fi-equipment/combat-evosuit`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/ultraweave-evosuit` |
| `gear/item-tags/throwable` | `gear/generic-equipment/grappling-hook`, `gear/sci-fi-equipment/emergency-hatchet`, `gear/sci-fi-equipment/standard-issue-knife`, `gear/sci-fi-equipment/weighted-core` |
| `gear/item-tags/two-handed` | `gear/components/heavy-wrist-laser`, `gear/sci-fi-equipment/comp-jack`, `gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/grapple-line-launcher`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/ripper-blade`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/standard-issue-rifle` |

### Class: `mechanism` — rule leans on another rule's machinery

Each suspected individually; the target defines machinery (a chart, a die
procedure, a defined term) without which the source block doesn't resolve.
Includes implicit dependencies where the prose relies on a mechanism *without
linking to it* (marked "implicit — no link in text").

<!-- these feel like references. -->

29 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `combat/advantage-in-combat` | `rules/basics/advantage` | content/docs/free-srd/core-rules/combat.md:44 |  |
| `rules/combat/damage-dice` | `core-rules/size` | — | Dice determined by attacker/defender size comparison (implicit — no link in text) |
| `rules/combat/opportunity-attack` | `character/proficiencies/martial-training` | content/snippets/opportunity-attack.md:5 |  |
| `rules/conditions/dying` | `rules/conditions/unconscious` | — | Dying character 'immediately falls unconscious (as the condition)' (implicit — no link in text) |
| `rules/conditions/stressed` | `rules/stats/stress-threshold` | — | Trigger defined by Stress Threshold (implicit — no link in text) |
| `rules/environment/extreme-environments` | `rules/combat/damage-resistance` | content/snippets/extreme-environments.md:11 |  |
| `environment/heat-and-cold` | `environment/exposure-intervals` | — | FORT-interval mechanism defined in Exposure Intervals; this block only lists consequences (implicit — no link in text) |
| `environment/toxic-atmosphere` | `environment/exposure-intervals` | — | Same interval mechanism dependency (implicit — no link in text) |
| `rules/health/applying-damage` | `rules/stats/defense` | — | The loop is defined in terms of DEF (implicit — no link in text) |
| `rules/health/applying-damage` | `rules/stats/vitality` | — | The loop is defined in terms of VIT (implicit — no link in text) |
| `gear/item-tags/battery` | `gear/sci-fi-equipment/battery-cores` | content/docs/free-srd/inventory--equipment/item-tags.md:84 |  |
| `gear/item-tags/power-source` | `gear/sci-fi-equipment/reactor-cores` | content/docs/free-srd/inventory--equipment/item-tags.md:174 |  |
| `gear/item-tags/space-suit` | `rules/combat/damage-resistance` | content/docs/free-srd/inventory--equipment/item-tags.md:196 |  |
| `gear/item-tags/space-suit` | `rules/combat/damage-resistance` | content/docs/free-srd/inventory--equipment/item-tags.md:197 |  |
| `gear/item-tags/space-suit` | `gear/item-tags/pressurized` | content/docs/free-srd/inventory--equipment/item-tags.md:193 |  |
| `gear/item-tags/space-suit` | `gear/sci-fi-equipment/coms-unit` | content/docs/free-srd/inventory--equipment/item-tags.md:194 |  |
| `rules/objects/armor-degradation` | `rules/objects/conditions` | — | Uses Damaged/Broken as defined terms (implicit — no link in text) |
| `rules/objects/conditions` | `rules/objects/durability` | — | The three conditions are VIT thresholds defined by Object Durability (implicit — no link in text) |
| `rules/objects/shield-degradation` | `rules/basics/supply-rolls` | — | Shield wear runs on supply dice (implicit — no link in text) |
| `rules/objects/shield-degradation` | `rules/objects/conditions` | — | Uses Damaged/Broken as defined terms (implicit — no link in text) |
| `gear/sci-fi-equipment/comp-jack` | `character/proficiencies/comp-jack` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment.md:248 |  |
| `gear/sci-fi-equipment/kit-supplies` | `rules/basics/supply-rolls` | — | Kit supplies run on supply dice (implicit — no link in text) |
| `rules/sci-fi/energy-shields` | `rules/stats/defense` | — | Temporary DEF pool concept extends DEF (implicit — no link in text) |
| `rules/stats/luck` | `rules/conditions/stressed` | — | Stressed disables Luck (implicit — no link in text) |
| `rules/stats/vitality` | `rules/wounds/wounds` | content/snippets/vitality.md:24 |  |
| `rules/vehicles/boarding-and-bailing` | `rules/movement/speed-tiers-chart` | — | Targets are 6 + speed modifier from the chart (implicit — no link in text) |
| `rules/vehicles/collision-damage` | `rules/movement/speed-tiers-chart` | — | Formula uses the chart's speed modifier (implicit — no link in text) |
| `rules/vehicles/impact-and-overrun` | `rules/vehicles/collision-damage` | — | Failure outcomes resolve via collision damage (implicit — no link in text) |
| `rules/vehicles/mounts` | `rules/vehicles/collision-damage` | — | Sudden Stops deals collision damage (implicit — no link in text) |

### Class: `functions-as` — item defined by another item

Component/item blocks whose rules text is literally "functions as X"
(Wrist Laser → Laser Pistol, etc.). Without the target, the block has no rules.

<!-- mak3 references, not forced -->

5 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `gear/components/automatic-crash-foam-system` | `gear/sci-fi-equipment/crash-foam-canister` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:91 |  |
| `gear/components/automatic-crash-foam-system` | `gear/sci-fi-equipment/crash-foam-canister` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:93 |  |
| `gear/components/heavy-wrist-laser` | `gear/sci-fi-equipment/laser-rifle` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:115 |  |
| `gear/components/internal-comp-jack` | `gear/sci-fi-equipment/comp-jack` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:137 |  |
| `gear/components/wrist-laser` | `gear/sci-fi-equipment/laser-pistol` | content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md:282 |  |

### Class: `exclusivity` — mutually exclusive selections

"Cannot be combined with" pairs. Not auto-include candidates in the usual sense,
but the builder needs to know about the pair for validation; queued so a human
decides how these are represented.

<!-- oh these can both be included as normal regardless of eachother. that text being referenced is for character creatiin on a gameplay level and does not apply in any structural, site, or pdf builder sense. no reference or dependancy needed -->

2 edges.

| Source | Target | Where | Note |
|---|---|---|---|
| `character/traits/particularly-attractive` | `character/traits/unremarkable` | content/docs/free-srd/character-creation/traits.md:97 |  |
| `character/traits/unremarkable` | `character/traits/particularly-attractive` | content/docs/free-srd/character-creation/traits.md:135 |  |


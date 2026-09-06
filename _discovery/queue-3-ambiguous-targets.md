# Queue 3 — Ambiguous / unresolvable targets

Cross-references whose target is not an addressable block — because the URL is
broken, the anchor doesn't exist, or the target was never written. **The edge
cannot be typed until the target is resolved by a human.** All of these carry
`queued: true` in `edges.json` with target `unresolved:<url>`.

These are also, incidentally, the site's broken links. Fixing them is Phase 2+
work — recorded here, not fixed.

## Systemic finding 1 — the Δ anchors

Condition headings marked with Δ (`### Crippled Δ`) render with the Δ in the
anchor: the real anchor is `#crippled-δ`, not `#crippled` (verified against
goldmark's renderer). **Every** `#crippled`, `#dying`, `#fatigued`,
`#immobilized`, `#restrained`, `#sick`, `#unconscious` link on the site is
therefore broken — including the condition summary table on the Wounds &
Conditions page itself. Affected conditions: Crippled, Dying, Fatigued,
Immobilized, Restrained, Sick, Unconscious.

<!-- The ∆ desognates an advantage or disadvantage during combat, this will need another way to be referenced for those conditions (and doesnt need to be in the heading/anchor space, that was chosen becuas eit was easy to reference) and the comment about it in Combat will need to be uodated to match. -->

## Systemic finding 2 — `prone` does not exist

Three links point at a `#prone` condition on the Wounds & Conditions page, and
several rules (Stand action, Trip, Improved Bash, vehicle rules) use "prone" as
a defined state — **but no Prone condition is defined anywhere in the corpus.**
This is a missing block, not a bad link.

<!-- need to make a prone condition: Characters that are layig upon the ground are Prone. Prone characters can only move at half speed, and are at a disadvantage when maming melee attacks outside of a grapple. Attacks made by adjacent enemy that targets a prone character gains a minor advantage. -->

## Full list

| Where | URL as written | Class | Likely intent |
|---|---|---|---|
| content/docs/free-srd/_index.md:18 | `/docs/free-srd/core-rules/character-creation/character-creation-overview` | broken-page-path | Wrong path — character-creation is not under core-rules. Intended the chargen page/section. |
| content/docs/free-srd/character-creation/abilities.md:38 | `#extra-dual-attack` | broken-anchor | Ability was renamed Swift Dual Attack (#swift-dual-attack); table link kept the old anchor. |
| content/docs/free-srd/character-creation/abilities.md:387 | `/docs/free-srd/core-rules/wounds--conditions/#crippled` | broken-anchor | Δ anchor: real anchor is #crippled-δ. Intended `rules/conditions/crippled`. |
| content/docs/free-srd/character-creation/character-creation-overview.md:26 | `/docs/free-srd/core-rules/character-creation/races` | broken-page-path | Wrong path — character-creation is not under core-rules. Intended the chargen page/section. |
| content/docs/free-srd/character-creation/races/android.md:22 | `/docs/free-srd/core-rules/wounds--conditions/#dying` | broken-anchor | Δ anchor: real anchor is #dying-δ. Intended `rules/conditions/dying`. |
| content/docs/free-srd/character-creation/races/android.md:22 | `#dead-battery` | broken-anchor | Dead Battery is bold text on the Android page, not a heading — no anchor exists. The section itself is flagged for relocation (Queue 2). |
| content/docs/free-srd/core-rules/action-economy.md:93 | `docs/free-srd/core-rules/the-basics/#target-numbers` | broken-page-path | Wrong slug (page is `basics`) — and two of these also lack the leading slash. Intended `rules/basics/supply-rolls` / `rules/basics/target-numbers` / `rules/basics/advantage`. |
| content/docs/free-srd/core-rules/action-economy.md:93 | `docs/free-srd/core-rules/the-basics/#advantage` | broken-page-path | Wrong slug (page is `basics`) — and two of these also lack the leading slash. Intended `rules/basics/supply-rolls` / `rules/basics/target-numbers` / `rules/basics/advantage`. |
| content/docs/free-srd/core-rules/attributes.md:45 | `/docs/free-srd/core-rules/wounds--conditions/#crippled` | broken-anchor | Δ anchor: real anchor is #crippled-δ. Intended `rules/conditions/crippled`. |
| content/docs/free-srd/core-rules/attributes.md:47 | `/docs/free-srd/core-rules/wounds--conditions/#unconscious` | broken-anchor | Δ anchor: real anchor is #unconscious-δ. Intended `rules/conditions/unconscious`. |
| content/docs/free-srd/core-rules/environmental-effects.md:35 | `/docs/free-srd/core-rules/wounds--conditions/#fatigued` | broken-anchor | Δ anchor: real anchor is #fatigued-δ. Intended `rules/conditions/fatigued`. |
| content/docs/free-srd/core-rules/vehicle-rules.md:70 | `#imapct--overrun` | broken-anchor | Typo for #impact--overrun; intended `rules/vehicles/impact-and-overrun`. |
| content/docs/free-srd/core-rules/vehicle-rules.md:83 | `/docs/free-srd/core-rules/wounds--conditions/#prone` | broken-anchor | No Prone condition exists anywhere — missing block (see systemic finding 2). |
| content/docs/free-srd/core-rules/vehicle-rules.md:84 | `/docs/free-srd/core-rules/wounds--conditions/#prone` | broken-anchor | No Prone condition exists anywhere — missing block (see systemic finding 2). |
| content/docs/free-srd/core-rules/vehicle-rules.md:112 | `/docs/free-srd/core-rules/wounds--conditions/#prone` | broken-anchor | No Prone condition exists anywhere — missing block (see systemic finding 2). |
| content/docs/free-srd/core-rules/vehicle-rules.md:120 | `/docs/free-srd/core-rules/attributes/#agility` | broken-anchor | Attribute headings include the abbreviation: real anchor #agility-agi. Intended `rules/attributes/physical-attributes`. |
| content/docs/free-srd/core-rules/vehicle-rules.md:120 | `/docs/free-srd/core-rules/attributes/#dexterity` | broken-anchor | Real anchor #dexterity-dex. Intended `rules/attributes/physical-attributes`. |
| content/docs/free-srd/core-rules/vehicle-rules.md:165 | `/docs/free-srd/core-rules/attributes/#fortitude` | broken-anchor | Real anchor #fortitude-fort. Intended `rules/attributes/physical-attributes`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:154 | `#crippled` | broken-anchor | Δ anchor: real anchor is #crippled-δ. Intended `rules/conditions/crippled`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:155 | `#dying` | broken-anchor | Δ anchor: real anchor is #dying-δ. Intended `rules/conditions/dying`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:156 | `#fatigued` | broken-anchor | Δ anchor: real anchor is #fatigued-δ. Intended `rules/conditions/fatigued`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:158 | `#immobilized` | broken-anchor | Δ anchor: real anchor is #immobilized-δ. Intended `rules/conditions/immobilized`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:162 | `#sick` | broken-anchor | Δ anchor: real anchor is #sick-δ. Intended `rules/conditions/sick`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:164 | `#unconscious` | broken-anchor | Δ anchor: real anchor is #unconscious-δ. Intended `rules/conditions/unconscious`. |
| content/docs/free-srd/core-rules/wounds--conditions.md:262 | `/docs/free-srd/combat/#grapple` | broken-page-path | Missing core-rules segment; intended `rules/combat/grapple`. |
| content/docs/free-srd/inventory--equipment/generic-equipment.md:30 | `#sturdy-boots` | broken-anchor | Item heading is 'Reinforced Boots' (#reinforced-boots); table link uses the old name. |
| content/docs/free-srd/inventory--equipment/generic-equipment.md:276 | `#antitoxin--antidote` | broken-anchor | Heading is 'Antitoxin' (#antitoxin). |
| content/docs/free-srd/inventory--equipment/generic-equipment.md:345 | `#compass` | broken-anchor | Heading is 'Compass / Navigational Tool' (#compass--navigational-tool). |
| content/docs/free-srd/inventory--equipment/generic-equipment.md:449 | `/docs/free-srd/inventory--equipment/tool-kits/` | broken-page-path | No such page. Kits live at sci-fi-equipment/sci-fi-kits (module-specific); a generic tool-kits page apparently doesn't exist yet — is one planned? |
| content/docs/free-srd/inventory--equipment/generic-equipment.md:462 | `#shovel--entrenching-tool` | broken-anchor | Heading is 'Shovel' (#shovel). |
| content/docs/free-srd/inventory--equipment/generic-equipment.md:504 | `/docs/free-srd/inventory--equipment/item-tags/bulky` | broken-page-path | Missing `#` — should be `item-tags/#bulky`; intended `gear/item-tags/bulky` block. |
| content/docs/free-srd/inventory--equipment/item-tags.md:61 | `/docs/free-srd/the-basics/#supply-rolls` | broken-page-path | Wrong slug (page is `basics`) — and two of these also lack the leading slash. Intended `rules/basics/supply-rolls` / `rules/basics/target-numbers` / `rules/basics/advantage`. |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/_index.md:28 | `/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/hakr` | broken-page-path | File is `trk-a.md`; intended `bots/trk-a`. |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor.md:178 | `/docs/free-srd/inventory--equipment/medical-supplies/#altoa-radiation-antidote-5-ara-5` | broken-page-path | Wrong path AND wrong anchor: intended `gear/sci-fi-equipment/ara-5` (sci-fi-misc-equipment#analgesic-radiation-antidote-5-ara-5). |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor.md:178 | `/docs/free-srd/inventory--equipment/medical-supplies/#pain-suppressant` | broken-page-path | Wrong path and anchor: intended `gear/sci-fi-equipment/pain-suppressant-injector`. |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor.md:178 | `/docs/free-srd/inventory--equipment/medical-supplies/#vitaboost-injection` | broken-page-path | Wrong path and anchor: intended `gear/sci-fi-equipment/vitaboost-injector`. |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment.md:9 | `#communications` | broken-anchor | Page mini-TOC: heading is 'Communication Devices' (#communication-devices). |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment.md:359 | `/docs/free-srd/intentory--equipmemtlitem-tags/#battery` | broken-page-path | Mangled URL; intended `gear/item-tags/battery`. |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons.md:130 | `/docs/free-srd/inventory--equipment/item-tags/#burn` | broken-anchor | Burn is a damage type, not an item tag — no such block. Should this be `combat/damage-types`, or is a Burn weapon-tag planned? |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons.md:159 | `/docs/free-srd/inventory--equipment/item-tags/#burn` | broken-anchor | Burn is a damage type, not an item tag — no such block. Should this be `combat/damage-types`, or is a Burn weapon-tag planned? |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons.md:177 | `/docs/free-srd/inventory--equipment/item-tags/#shock` | broken-anchor | Shock is a damage type, not an item tag — no such block. Same question as #burn. |
| content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons.md:300 | `/docs/free-srd/inventory--equipment/item-tags/#shock` | broken-anchor | Shock is a damage type, not an item tag — no such block. Same question as #burn. |
| content/snippets/medical-item-medkit-note.md:5 | `/docs/core-rul3s/wounds--conditions/#wounds` | broken-page-path | Typo for `core-rules`; intended target `rules/wounds/wounds` (#wounds). |
| content/snippets/primary-speed.md:11 | `/docs/free-srd/core-rules/action-economy/#speed-modes` | broken-anchor | No such anchor; the Modes list in the speed-descriptors snippet is bold text, not a heading. Intended `rules/movement/speed-descriptors`. |
| content/snippets/primary-speed.md:11 | `/docs/free-srd/core-rules/action-economy/#maneuverability` | broken-anchor | Same — Maneuverability is bold text inside `rules/movement/speed-descriptors`, not a heading. |
| content/snippets/vitality.md:25 | `/docs/free-srd/core-rules/wounds--conditions/conditions` | broken-page-path | Missing `#`; intended `rules/conditions/overview` (#conditions). |

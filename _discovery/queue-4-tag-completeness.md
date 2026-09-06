# Queue 4 — Tag-completeness / set integrity

For every proposed tag: the **full set of blocks that carry it**. A block
missing a tag it should have is invisible in a tag-as-query pull — scan each
set for holes. Tags come from three sources: section-derived (tag-as-query,
§4.4), page-domain, and structural (`wip`, `site-chrome`).

Things to scan for specifically:

- **`core` vs `sci-fi` on features** — every trait/proficiency/ability carries
  exactly one of the two; the counts below should match the site's section
  counts (they do: traits 16+3, proficiencies 14+3, abilities 55+7+8+5).
- **Sci-fi content living on core pages** keeps its `sci-fi` tag (e.g.
  `rules/environment/extreme-environments`, `rules/sci-fi/ballistics-in-space` embedded in
  the core Ballistic item-tag block). If a GM pulls "all core environment
  rules", extreme environments will NOT come along — that is by design, but
  verify it's the intended design.
- **The `luck` set** — Luck the stat (`rules/stats/luck`) and the Core Luck abilities
  share the tag. If the builder treats `luck` as one pull, the stat block rides
  along with the ability list. Confirm that's wanted.

<!-- as a note, blocks can have more than one setting tag (core, sci fi, fantasy). it will be less common, but it makes sense for some things. -->


## `ability` — 76 blocks

`character/abilities/adaptive-luck`, `character/abilities/agile-charge`, `character/abilities/agile-dodge`, `character/abilities/bash`, `character/abilities/battery-saboteur`, `character/abilities/battery-saver`, `character/abilities/bolster`, `character/abilities/bonus-luck`, `character/abilities/charge`, `character/abilities/companion-bot`, `character/abilities/controlled-suppressing-fire`, `character/abilities/coordinated-strike`, `character/abilities/danger-reflex`, `character/abilities/dead-drop`, `character/abilities/defender`, `character/abilities/dual-attack`, `character/abilities/dual-defense`, `character/abilities/dual-strike`, `character/abilities/expert`, `character/abilities/extended-rage`, `character/abilities/extra-attack`, `character/abilities/fast-kit-trap`, `character/abilities/fearless-rage`, `character/abilities/field-medic`, `character/abilities/field-patch`, `character/abilities/focus-attack`, `character/abilities/focus-in`, `character/abilities/friend-in-need`, `character/abilities/friend-of-fortune`, `character/abilities/general-spectacle`, `character/abilities/ghost-protocol`, `character/abilities/improved-bash`, `character/abilities/improved-suppressing-fire`, `character/abilities/indomitable-rage`, `character/abilities/just-grazed`, `character/abilities/just-winded`, `character/abilities/kit-trap`, `character/abilities/leaping-charge`, `character/abilities/leg-shot`, `character/abilities/line-of-fire`, `character/abilities/long-performance`, `character/abilities/lucky-strike`, `character/abilities/martial-supremacy`, `character/abilities/medical-marvel`, `character/abilities/momentum-dodge`, `character/abilities/natural-gift`, `character/abilities/opensaysame`, `character/abilities/oppressive-suppression`, `character/abilities/outburst`, `character/abilities/overcharge`, `character/abilities/overview`, `character/abilities/patient-shot`, `character/abilities/power-main-tap`, `character/abilities/powerful-rage`, `character/abilities/precise-focus`, `character/abilities/quick-draw`, `character/abilities/quick-firing`, `character/abilities/rage`, `character/abilities/rally`, `character/abilities/reckless-attack`, `character/abilities/rigged-comp-jack`, `character/abilities/salvage`, `character/abilities/signal-intelligence`, `character/abilities/slip-strike`, `character/abilities/special-encouragement`, `character/abilities/student`, `character/abilities/suppressing-fire`, `character/abilities/swift-custom-battery`, `character/abilities/swift-dual-attack`, `character/abilities/tech-armor`, `character/abilities/the-look`, `character/abilities/tis-but-a-scratch`, `character/abilities/true-defender`, `character/abilities/unsettling-rage`, `character/abilities/vital-focus`, `character/abilities/vital-strike`

## `actions` — 11 blocks

`rules/actions/action-types`, `rules/actions/difficult-terrain`, `rules/actions/move`, `rules/actions/multi-turn-actions`, `rules/actions/opportunity-actions`, `rules/actions/reactions`, `rules/actions/readied-actions`, `rules/actions/standard-actions`, `rules/actions/step`, `rules/combat/opportunity-attack`, `rules/stats/action-points`

## `armor` — 14 blocks

`gear/equipment/armor-basics`, `rules/objects/armor-degradation`, `gear/sci-fi-equipment/basic-p-suit`, `gear/sci-fi-equipment/classic-evosuit`, `gear/sci-fi-equipment/combat-evosuit`, `gear/sci-fi-equipment/combat-vest`, `gear/sci-fi-equipment/enforcer-armor`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/light-combat-vest`, `gear/sci-fi-equipment/padded-flight-suit`, `gear/sci-fi-equipment/scav-gear`, `gear/sci-fi-equipment/security-flight-suit`, `gear/sci-fi-equipment/site-safety-gear`, `gear/sci-fi-equipment/ultraweave-evosuit`

## `armor-upgrade` — 8 blocks

`gear/sci-fi-equipment/auto-injector`, `gear/sci-fi-equipment/chameleon-unit`, `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/emergency-shank`, `gear/sci-fi-equipment/hazard-hud`, `gear/sci-fi-equipment/mebn-hud`, `gear/sci-fi-equipment/safer-unit`, `gear/sci-fi-equipment/targeting-hud`

## `attributes` — 5 blocks

`rules/attributes/attribute-values`, `rules/attributes/determining-attributes`, `rules/attributes/mental-attributes`, `rules/attributes/overview`, `rules/attributes/physical-attributes`

## `basics` — 10 blocks

`rules/basics/advantage`, `rules/basics/contested-rolls`, `rules/basics/d100-or-percentage`, `rules/basics/decision-rolls`, `rules/basics/key-terms`, `rules/basics/resolving-a-tie`, `rules/basics/success-and-failure`, `rules/basics/supply-rolls`, `rules/basics/target-numbers`, `rules/basics/the-rounding-rule`

## `battery` — 5 blocks

`character/abilities/battery-saboteur`, `character/abilities/battery-saver`, `character/abilities/overcharge`, `character/abilities/power-main-tap`, `character/abilities/swift-custom-battery`

## `bots` — 5 blocks

`rules/bots/automated-machines`, `bots/bal`, `bots/hel-1`, `bots/t00l`, `bots/trk-a`

## `character-creation` — 6 blocks

`character/abilities/overview`, `chargen/overview`, `character/proficiencies/overview`, `races/overview`, `character/traits/overview`, `traits/racial-traits`

## `clothing` — 6 blocks

`gear/generic-equipment/face-wrap`, `gear/generic-equipment/heavy-cloak`, `gear/generic-equipment/rain-poncho`, `gear/generic-equipment/reinforced-boots`, `gear/generic-equipment/wide-brim-hat`, `gear/generic-equipment/work-gloves`

## `combat` — 20 blocks

`combat/action-catalog`, `combat/advantage-in-combat`, `combat/attack-roll`, `rules/combat/combat-basics`, `rules/combat/cover`, `rules/combat/damage-dice`, `combat/damage-modifiers`, `combat/damage-overview`, `rules/combat/damage-resistance`, `rules/combat/damage-sources`, `combat/damage-types`, `rules/combat/grapple`, `rules/combat/initiative`, `rules/combat/opportunity-attack`, `rules/combat/stealth`, `rules/combat/steps-to-an-attack`, `rules/combat/surprise-attacks`, `core-rules/size`, `rules/health/applying-damage`, `rules/sci-fi/ballistics-in-space`

## `communications` — 3 blocks

`gear/sci-fi-equipment/coms-headset`, `gear/sci-fi-equipment/long-range-coms`, `gear/sci-fi-equipment/mobile-phone`

## `component` — 23 blocks

`gear/components/audio-processor`, `gear/components/augmented-arm-actuators`, `gear/components/automatic-crash-foam-system`, `gear/components/backup-power-cell`, `gear/components/damage-and-wounds`, `gear/components/heavy-wrist-laser`, `gear/components/improved-cooling-system`, `gear/components/installation`, `gear/components/internal-comp-jack`, `gear/components/manipulator-override`, `gear/components/optical-suite`, `gear/components/overview`, `gear/components/power-sources`, `gear/components/reinforced-chassis-plating`, `gear/components/relay-node`, `gear/components/repair-subroutine`, `gear/components/servo-boost-legs`, `gear/components/shield-mount`, `components/signal-masts`, `gear/components/stabilizer-gyros`, `gear/components/subdermal-plating`, `gear/components/targeting-array`, `gear/components/wrist-laser`

## `computers` — 1 blocks

`rules/sci-fi/computer-systems`
 <!-- add festures and equipment that has to do with the comp jack -->

## `condition` — 14 blocks

`rules/conditions/asphyxiating`, `rules/conditions/bleeding`, `rules/conditions/confused`, `rules/conditions/crippled`, `rules/conditions/dying`, `rules/conditions/fatigued`, `rules/conditions/frightened`, `rules/conditions/immobilized`, `rules/conditions/pinned`, `rules/conditions/restrained`, `rules/conditions/shaken`, `rules/conditions/sick`, `rules/conditions/stressed`, `rules/conditions/unconscious`

## `conditions` — 14 blocks

`rules/conditions/asphyxiating`, `rules/conditions/bleeding`, `rules/conditions/confused`, `rules/conditions/crippled`, `rules/conditions/dying`, `rules/conditions/fatigued`, `rules/conditions/frightened`, `rules/conditions/immobilized`, `rules/conditions/pinned`, `rules/conditions/restrained`, `rules/conditions/shaken`, `rules/conditions/sick`, `rules/conditions/stressed`, `rules/conditions/unconscious`

<!-- consitions and conditoon tag feel redudntant -->

## `containers` — 9 blocks

`gear/generic-equipment/backpack`, `gear/generic-equipment/barrel`, `gear/generic-equipment/crate`, `gear/generic-equipment/dry-sack`, `gear/generic-equipment/lockable-chest`, `generic-equipment/pouch-sets`, `gear/generic-equipment/quiver`, `gear/generic-equipment/saddlebags`, `gear/generic-equipment/satchel`

## `core` — 93 blocks

`character/abilities/adaptive-luck`, `character/abilities/agile-charge`, `character/abilities/agile-dodge`, `character/abilities/bash`, `character/abilities/bolster`, `character/abilities/bonus-luck`, `character/abilities/charge`, `character/abilities/controlled-suppressing-fire`, `character/abilities/coordinated-strike`, `character/abilities/danger-reflex`, `character/abilities/dead-drop`, `character/abilities/defender`, `character/abilities/dual-attack`, `character/abilities/dual-defense`, `character/abilities/dual-strike`, `character/abilities/expert`, `character/abilities/extended-rage`, `character/abilities/extra-attack`, `character/abilities/fast-kit-trap`, `character/abilities/fearless-rage`, `character/abilities/field-medic`, `character/abilities/field-patch`, `character/abilities/focus-attack`, `character/abilities/focus-in`, `character/abilities/friend-in-need`, `character/abilities/friend-of-fortune`, `character/abilities/general-spectacle`, `character/abilities/improved-bash`, `character/abilities/improved-suppressing-fire`, `character/abilities/indomitable-rage`, `character/abilities/just-grazed`, `character/abilities/just-winded`, `character/abilities/kit-trap`, `character/abilities/leaping-charge`, `character/abilities/leg-shot`, `character/abilities/line-of-fire`, `character/abilities/long-performance`, `character/abilities/lucky-strike`, `character/abilities/martial-supremacy`, `character/abilities/medical-marvel`, `character/abilities/momentum-dodge`, `character/abilities/natural-gift`, `character/abilities/oppressive-suppression`, `character/abilities/outburst`, `character/abilities/patient-shot`, `character/abilities/powerful-rage`, `character/abilities/precise-focus`, `character/abilities/quick-draw`, `character/abilities/quick-firing`, `character/abilities/rage`, `character/abilities/rally`, `character/abilities/reckless-attack`, `character/abilities/slip-strike`, `character/abilities/student`, `character/abilities/suppressing-fire`, `character/abilities/swift-dual-attack`, `character/abilities/the-look`, `character/abilities/tis-but-a-scratch`, `character/abilities/true-defender`, `character/abilities/unsettling-rage`, `character/abilities/vital-focus`, `character/abilities/vital-strike`, `character/proficiencies/armor`, `character/proficiencies/b-e-kit`, `character/proficiencies/disguise-kit`, `character/proficiencies/improved-ability`, `character/proficiencies/licensed-instincts`, `character/proficiencies/martial-training`, `character/proficiencies/medic-training`, `character/proficiencies/medical-instincts`, `character/proficiencies/negotiation-training`, `character/proficiencies/repair-kit`, `character/proficiencies/research`, `character/proficiencies/survival-training`, `character/proficiencies/vehicle`, `character/proficiencies/weapon`, `races/classic-human`, `character/traits/alert`, `character/traits/composed`, `character/traits/diplomatic`, `character/traits/hot-headed`, `character/traits/intimidating`, `character/traits/lucky`, `character/traits/mentally-sound`, `character/traits/particularly-attractive`, `character/traits/picture-of-health`, `character/traits/sly`, `character/traits/sneaky`, `character/traits/stubborn`, `character/traits/tough`, `character/traits/unremarkable`, `character/traits/unshakable`, `character/traits/well-connected`

## `damage` — 2 blocks

`rules/combat/damage-dice`, `rules/health/applying-damage`

## `drones` — 2 blocks

`bots/bal`, `bots/hel-1`

## `environment` — 6 blocks

`environment/exposure-intervals`, `rules/environment/extreme-environments`, `environment/heat-and-cold`, `environment/overview`, `environment/toxic-atmosphere`, `environment/visibility`

## `equipment` — 169 blocks

`gear/components/audio-processor`, `gear/components/augmented-arm-actuators`, `gear/components/automatic-crash-foam-system`, `gear/components/backup-power-cell`, `gear/components/heavy-wrist-laser`, `gear/components/improved-cooling-system`, `gear/components/internal-comp-jack`, `gear/components/manipulator-override`, `gear/components/optical-suite`, `gear/components/reinforced-chassis-plating`, `gear/components/relay-node`, `gear/components/repair-subroutine`, `gear/components/servo-boost-legs`, `gear/components/shield-mount`, `components/signal-masts`, `gear/components/stabilizer-gyros`, `gear/components/subdermal-plating`, `gear/components/targeting-array`, `gear/components/wrist-laser`, `gear/equipment/armor-basics`, `gear/equipment/common-terms`, `gear/equipment/medkit-note`, `gear/equipment/shields-basics`, `gear/generic-equipment/animal-feed`, `gear/generic-equipment/antiseptic-poultice`, `gear/generic-equipment/antitoxin`, `gear/generic-equipment/backpack`, `gear/generic-equipment/bag-of-salt`, `generic-equipment/bandages`, `gear/generic-equipment/barrel`, `gear/generic-equipment/bedroll`, `gear/generic-equipment/blank-book-journal`, `gear/generic-equipment/block-of-soap`, `gear/generic-equipment/candle`, `gear/generic-equipment/candle-wax-block`, `gear/generic-equipment/chain-10ft`, `gear/generic-equipment/chalk-sticks`, `gear/generic-equipment/coil-of-wire`, `gear/generic-equipment/common-alcohol-flask`, `gear/generic-equipment/compass`, `gear/generic-equipment/crate`, `gear/generic-equipment/dry-sack`, `gear/generic-equipment/face-wrap`, `gear/generic-equipment/field-ration`, `gear/generic-equipment/fire-starter`, `gear/generic-equipment/fuel-oil-flask`, `gear/generic-equipment/grappling-hook`, `gear/generic-equipment/heavy-cloak`, `gear/generic-equipment/ink-writing-instrument`, `gear/generic-equipment/iron-spikes`, `gear/generic-equipment/lockable-chest`, `gear/generic-equipment/long-crowbar`, `gear/generic-equipment/manacles`, `gear/generic-equipment/oil-lantern`, `gear/generic-equipment/parchment-sheets`, `gear/generic-equipment/pitons`, `generic-equipment/pouch-sets`, `gear/generic-equipment/quiver`, `gear/generic-equipment/rain-poncho`, `gear/generic-equipment/reinforced-boots`, `gear/generic-equipment/restorative-tonic`, `gear/generic-equipment/rope-50ft`, `gear/generic-equipment/saddlebags`, `gear/generic-equipment/satchel`, `gear/generic-equipment/sewing-set`, `gear/generic-equipment/shovel`, `gear/generic-equipment/signal-mirror`, `gear/generic-equipment/signal-whistle`, `gear/generic-equipment/small-bell`, `gear/generic-equipment/splint-materials`, `gear/generic-equipment/tent-2-person`, `gear/generic-equipment/tent-4-person`, `gear/generic-equipment/torch`, `gear/generic-equipment/twine`, `gear/generic-equipment/waterskin`, `gear/generic-equipment/whetstone`, `gear/generic-equipment/wide-brim-hat`, `gear/generic-equipment/wooden-stakes`, `gear/generic-equipment/work-gloves`, `gear/sci-fi-equipment/ara-5`, `gear/sci-fi-equipment/auto-injector`, `gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/b-e-kit`, `gear/sci-fi-equipment/ballistic-shield`, `gear/sci-fi-equipment/basic-p-suit`, `gear/sci-fi-equipment/battery-cores`, `gear/sci-fi-equipment/bio-scanner`, `gear/sci-fi-equipment/bioskin-veil`, `gear/sci-fi-equipment/bipod`, `gear/sci-fi-equipment/boost-pack`, `gear/sci-fi-equipment/chameleon-unit`, `gear/sci-fi-equipment/classic-evosuit`, `gear/sci-fi-equipment/collapsible-shield`, `gear/sci-fi-equipment/combat-evosuit`, `gear/sci-fi-equipment/combat-vest`, `gear/sci-fi-equipment/comp-jack`, `gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/coms-headset`, `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/crash-foam-canister`, `gear/sci-fi-equipment/data-spike`, `gear/sci-fi-equipment/decoy-beacon`, `gear/sci-fi-equipment/disguise-kit`, `gear/sci-fi-equipment/drum-magazines`, `gear/sci-fi-equipment/emergency-beacon`, `gear/sci-fi-equipment/emergency-hatchet`, `gear/sci-fi-equipment/emergency-oxygen-mask`, `gear/sci-fi-equipment/emergency-shank`, `gear/sci-fi-equipment/emergency-trauma-patch`, `gear/sci-fi-equipment/enforcer-armor`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/extended-barrel`, `gear/sci-fi-equipment/field-ration`, `gear/sci-fi-equipment/forward-assault-shield`, `gear/sci-fi-equipment/fuel-cells`, `gear/sci-fi-equipment/grapple-line-launcher`, `gear/sci-fi-equipment/gravity-anchor`, `gear/sci-fi-equipment/hazard-hud`, `gear/sci-fi-equipment/heavy-pistol`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/jump-boosters`, `gear/sci-fi-equipment/jump-pack`, `gear/sci-fi-equipment/kit-supplies`, `gear/sci-fi-equipment/knuckle-taser`, `gear/sci-fi-equipment/laser-pistol`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/light-combat-vest`, `gear/sci-fi-equipment/light-pistol`, `gear/sci-fi-equipment/long-range-coms`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/mag-boots`, `gear/sci-fi-equipment/mag-cuffs`, `gear/sci-fi-equipment/mebn-hud`, `gear/sci-fi-equipment/medical-kit`, `gear/sci-fi-equipment/mini-laser-cutter`, `gear/sci-fi-equipment/mobile-phone`, `gear/sci-fi-equipment/overcharge-chamber`, `gear/sci-fi-equipment/padded-flight-suit`, `gear/sci-fi-equipment/pain-suppressant-injector`, `gear/sci-fi-equipment/personal-shield`, `gear/sci-fi-equipment/portable-heater`, `gear/sci-fi-equipment/portable-water-purifier`, `gear/sci-fi-equipment/reactor-cores`, `gear/sci-fi-equipment/recoil-compensation-system`, `gear/sci-fi-equipment/reflex-sight`, `gear/sci-fi-equipment/remote-detonator`, `gear/sci-fi-equipment/repair-kit`, `gear/sci-fi-equipment/ripper-blade`, `gear/sci-fi-equipment/safer-unit`, `gear/sci-fi-equipment/scav-gear`, `gear/sci-fi-equipment/security-flight-suit`, `gear/sci-fi-equipment/shock-baton`, `gear/sci-fi-equipment/shock-charger`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/signature-spoofer`, `gear/sci-fi-equipment/site-safety-gear`, `gear/sci-fi-equipment/solar-array-pack`, `gear/sci-fi-equipment/squad-shield`, `gear/sci-fi-equipment/standard-issue-knife`, `gear/sci-fi-equipment/standard-issue-rifle`, `gear/sci-fi-equipment/survival-tent`, `gear/sci-fi-equipment/targeting-hud`, `gear/sci-fi-equipment/tech-kit`, `gear/sci-fi-equipment/ultraweave-evosuit`, `gear/sci-fi-equipment/vitaboost-injector`, `gear/sci-fi-equipment/weighted-core`, `rules/sci-fi/communications`, `rules/sci-fi/energy-shields`, `rules/sci-fi/huds`

## `general` — 63 blocks

`character/abilities/agile-charge`, `character/abilities/agile-dodge`, `character/abilities/bash`, `character/abilities/bolster`, `character/abilities/charge`, `character/abilities/companion-bot`, `character/abilities/controlled-suppressing-fire`, `character/abilities/coordinated-strike`, `character/abilities/danger-reflex`, `character/abilities/dead-drop`, `character/abilities/defender`, `character/abilities/dual-attack`, `character/abilities/dual-defense`, `character/abilities/dual-strike`, `character/abilities/expert`, `character/abilities/extended-rage`, `character/abilities/extra-attack`, `character/abilities/fast-kit-trap`, `character/abilities/fearless-rage`, `character/abilities/field-medic`, `character/abilities/field-patch`, `character/abilities/focus-attack`, `character/abilities/focus-in`, `character/abilities/friend-in-need`, `character/abilities/general-spectacle`, `character/abilities/ghost-protocol`, `character/abilities/improved-bash`, `character/abilities/improved-suppressing-fire`, `character/abilities/indomitable-rage`, `character/abilities/just-grazed`, `character/abilities/just-winded`, `character/abilities/kit-trap`, `character/abilities/leaping-charge`, `character/abilities/leg-shot`, `character/abilities/line-of-fire`, `character/abilities/long-performance`, `character/abilities/martial-supremacy`, `character/abilities/momentum-dodge`, `character/abilities/opensaysame`, `character/abilities/oppressive-suppression`, `character/abilities/outburst`, `character/abilities/patient-shot`, `character/abilities/powerful-rage`, `character/abilities/precise-focus`, `character/abilities/quick-draw`, `character/abilities/quick-firing`, `character/abilities/rage`, `character/abilities/rally`, `character/abilities/reckless-attack`, `character/abilities/rigged-comp-jack`, `character/abilities/salvage`, `character/abilities/signal-intelligence`, `character/abilities/slip-strike`, `character/abilities/special-encouragement`, `character/abilities/student`, `character/abilities/suppressing-fire`, `character/abilities/swift-dual-attack`, `character/abilities/tech-armor`, `character/abilities/the-look`, `character/abilities/true-defender`, `character/abilities/unsettling-rage`, `character/abilities/vital-focus`, `character/abilities/vital-strike`

## `generic` — 56 blocks

`gear/generic-equipment/animal-feed`, `gear/generic-equipment/antiseptic-poultice`, `gear/generic-equipment/antitoxin`, `gear/generic-equipment/backpack`, `gear/generic-equipment/bag-of-salt`, `generic-equipment/bandages`, `gear/generic-equipment/barrel`, `gear/generic-equipment/bedroll`, `gear/generic-equipment/blank-book-journal`, `gear/generic-equipment/block-of-soap`, `gear/generic-equipment/candle`, `gear/generic-equipment/candle-wax-block`, `gear/generic-equipment/chain-10ft`, `gear/generic-equipment/chalk-sticks`, `gear/generic-equipment/coil-of-wire`, `gear/generic-equipment/common-alcohol-flask`, `gear/generic-equipment/compass`, `gear/generic-equipment/crate`, `gear/generic-equipment/dry-sack`, `gear/generic-equipment/face-wrap`, `gear/generic-equipment/field-ration`, `gear/generic-equipment/fire-starter`, `gear/generic-equipment/fuel-oil-flask`, `gear/generic-equipment/grappling-hook`, `gear/generic-equipment/heavy-cloak`, `gear/generic-equipment/ink-writing-instrument`, `gear/generic-equipment/iron-spikes`, `gear/generic-equipment/lockable-chest`, `gear/generic-equipment/long-crowbar`, `gear/generic-equipment/manacles`, `gear/generic-equipment/oil-lantern`, `gear/generic-equipment/parchment-sheets`, `gear/generic-equipment/pitons`, `generic-equipment/pouch-sets`, `gear/generic-equipment/quiver`, `gear/generic-equipment/rain-poncho`, `gear/generic-equipment/reinforced-boots`, `gear/generic-equipment/restorative-tonic`, `gear/generic-equipment/rope-50ft`, `gear/generic-equipment/saddlebags`, `gear/generic-equipment/satchel`, `gear/generic-equipment/sewing-set`, `gear/generic-equipment/shovel`, `gear/generic-equipment/signal-mirror`, `gear/generic-equipment/signal-whistle`, `gear/generic-equipment/small-bell`, `gear/generic-equipment/splint-materials`, `gear/generic-equipment/tent-2-person`, `gear/generic-equipment/tent-4-person`, `gear/generic-equipment/torch`, `gear/generic-equipment/twine`, `gear/generic-equipment/waterskin`, `gear/generic-equipment/whetstone`, `gear/generic-equipment/wide-brim-hat`, `gear/generic-equipment/wooden-stakes`, `gear/generic-equipment/work-gloves`

## `health` — 4 blocks

`rules/health/applying-damage`, `rules/health/overview`, `rules/stats/defense`, `rules/stats/vitality`

## `heavy-armor` — 5 blocks

`gear/sci-fi-equipment/combat-evosuit`, `gear/sci-fi-equipment/enforcer-armor`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/security-flight-suit`, `gear/sci-fi-equipment/ultraweave-evosuit`

## `heavy-ranged` — 1 blocks

`gear/sci-fi-equipment/heavy-rotary-cannon`

## `inventory` — 2 blocks

`gear/inventory/body-slots`, `gear/inventory/carry-limits`

## `item-tag` — 20 blocks

`gear/item-tags/adaptive-mesh`, `gear/item-tags/arcing`, `gear/item-tags/ballistic`, `gear/item-tags/battery`, `gear/item-tags/belt-fed`, `gear/item-tags/bulky`, `gear/item-tags/concealable`, `gear/item-tags/durable`, `gear/item-tags/firing-modes`, `gear/item-tags/fragile`, `gear/item-tags/fuel-cells`, `gear/item-tags/injector`, `gear/item-tags/long-reload`, `gear/item-tags/power-source`, `gear/item-tags/pressurized`, `gear/item-tags/rounds-reload`, `gear/item-tags/space-suit`, `gear/item-tags/throwable`, `gear/item-tags/two-handed`, `gear/item-tags/versatile`

## `kit` — 6 blocks

`gear/sci-fi-equipment/b-e-kit`, `gear/sci-fi-equipment/disguise-kit`, `gear/sci-fi-equipment/kit-supplies`, `gear/sci-fi-equipment/medical-kit`, `gear/sci-fi-equipment/repair-kit`, `gear/sci-fi-equipment/tech-kit`

## `legal` — 1 blocks

`site/license`

<!-- i would argue tjis can be excluded from scope and all pdfs get a liscene page built in, a cover option, and a toc option -->

## `light-armor` — 7 blocks

`gear/sci-fi-equipment/basic-p-suit`, `gear/sci-fi-equipment/classic-evosuit`, `gear/sci-fi-equipment/combat-vest`, `gear/sci-fi-equipment/light-combat-vest`, `gear/sci-fi-equipment/padded-flight-suit`, `gear/sci-fi-equipment/scav-gear`, `gear/sci-fi-equipment/site-safety-gear`

## `light-melee` — 2 blocks

`gear/sci-fi-equipment/knuckle-taser`, `gear/sci-fi-equipment/standard-issue-knife`

## `light-sources` — 4 blocks

`gear/generic-equipment/candle`, `gear/generic-equipment/fuel-oil-flask`, `gear/generic-equipment/oil-lantern`, `gear/generic-equipment/torch`

## `luck` — 8 blocks

`character/abilities/adaptive-luck`, `character/abilities/bonus-luck`, `character/abilities/friend-of-fortune`, `character/abilities/lucky-strike`, `character/abilities/medical-marvel`, `character/abilities/natural-gift`, `character/abilities/tis-but-a-scratch`, `rules/stats/luck`

## `medical` — 11 blocks

`gear/equipment/medkit-note`, `gear/generic-equipment/antiseptic-poultice`, `gear/generic-equipment/antitoxin`, `generic-equipment/bandages`, `gear/generic-equipment/restorative-tonic`, `gear/generic-equipment/splint-materials`, `gear/sci-fi-equipment/ara-5`, `gear/sci-fi-equipment/crash-foam-canister`, `gear/sci-fi-equipment/emergency-trauma-patch`, `gear/sci-fi-equipment/pain-suppressant-injector`, `gear/sci-fi-equipment/vitaboost-injector`

## `medium-melee` — 3 blocks

`gear/sci-fi-equipment/emergency-hatchet`, `gear/sci-fi-equipment/ripper-blade`, `gear/sci-fi-equipment/shock-baton`

## `melee-upgrade` — 2 blocks

`gear/sci-fi-equipment/shock-charger`, `gear/sci-fi-equipment/weighted-core`

## `movement` — 6 blocks

`rules/actions/move`, `rules/actions/step`, `rules/movement/primary-speed`, `rules/movement/speed-descriptors`, `rules/movement/speed-tiers`, `rules/movement/speed-tiers-chart`

## `objects` — 7 blocks

`rules/objects/armor-degradation`, `rules/objects/conditions`, `rules/objects/durability`, `rules/objects/material-def`, `rules/objects/overview`, `rules/objects/shield-degradation`, `rules/objects/targeting-objects`

## `pistol` — 4 blocks

`gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/heavy-pistol`, `gear/sci-fi-equipment/laser-pistol`, `gear/sci-fi-equipment/light-pistol`

## `proficiency` — 18 blocks

`character/proficiencies/armor`, `character/proficiencies/b-e-kit`, `character/proficiencies/comp-jack`, `character/proficiencies/disguise-kit`, `character/proficiencies/general-robotics`, `character/proficiencies/general-technology`, `character/proficiencies/improved-ability`, `character/proficiencies/licensed-instincts`, `character/proficiencies/martial-training`, `character/proficiencies/medic-training`, `character/proficiencies/medical-instincts`, `character/proficiencies/negotiation-training`, `character/proficiencies/overview`, `character/proficiencies/repair-kit`, `character/proficiencies/research`, `character/proficiencies/survival-training`, `character/proficiencies/vehicle`, `character/proficiencies/weapon`

## `races` — 6 blocks

`races/android`, `races/classic-human`, `races/overview`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`

## `racial` — 1 blocks

`traits/racial-traits`

<!-- i think this block may be obsolete since the races addition, may need to check that it references the correct ruleset and ooints to the races section and not to racial traits that no longer exist -->

## `ranged-upgrade` — 7 blocks

`gear/sci-fi-equipment/bipod`, `gear/sci-fi-equipment/drum-magazines`, `gear/sci-fi-equipment/extended-barrel`, `gear/sci-fi-equipment/forward-assault-shield`, `gear/sci-fi-equipment/overcharge-chamber`, `gear/sci-fi-equipment/recoil-compensation-system`, `gear/sci-fi-equipment/reflex-sight`

## `rifle` — 5 blocks

`gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/standard-issue-rifle`

## `sci-fi` — 140 blocks

`character/abilities/battery-saboteur`, `character/abilities/battery-saver`, `character/abilities/companion-bot`, `character/abilities/ghost-protocol`, `character/abilities/opensaysame`, `character/abilities/overcharge`, `character/abilities/power-main-tap`, `character/abilities/rigged-comp-jack`, `character/abilities/salvage`, `character/abilities/signal-intelligence`, `character/abilities/special-encouragement`, `character/abilities/swift-custom-battery`, `character/abilities/tech-armor`, `rules/bots/automated-machines`, `gear/components/audio-processor`, `gear/components/augmented-arm-actuators`, `gear/components/automatic-crash-foam-system`, `gear/components/backup-power-cell`, `gear/components/damage-and-wounds`, `gear/components/heavy-wrist-laser`, `gear/components/improved-cooling-system`, `gear/components/installation`, `gear/components/internal-comp-jack`, `gear/components/manipulator-override`, `gear/components/optical-suite`, `gear/components/overview`, `gear/components/power-sources`, `gear/components/reinforced-chassis-plating`, `gear/components/relay-node`, `gear/components/repair-subroutine`, `gear/components/servo-boost-legs`, `gear/components/shield-mount`, `components/signal-masts`, `gear/components/stabilizer-gyros`, `gear/components/subdermal-plating`, `gear/components/targeting-array`, `gear/components/wrist-laser`, `rules/environment/extreme-environments`, `character/proficiencies/comp-jack`, `character/proficiencies/general-robotics`, `character/proficiencies/general-technology`, `races/android`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`, `gear/sci-fi-equipment/ara-5`, `gear/sci-fi-equipment/auto-injector`, `gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/b-e-kit`, `gear/sci-fi-equipment/ballistic-shield`, `gear/sci-fi-equipment/basic-p-suit`, `gear/sci-fi-equipment/battery-cores`, `gear/sci-fi-equipment/bio-scanner`, `gear/sci-fi-equipment/bioskin-veil`, `gear/sci-fi-equipment/bipod`, `gear/sci-fi-equipment/boost-pack`, `gear/sci-fi-equipment/chameleon-unit`, `gear/sci-fi-equipment/classic-evosuit`, `gear/sci-fi-equipment/collapsible-shield`, `gear/sci-fi-equipment/combat-evosuit`, `gear/sci-fi-equipment/combat-vest`, `gear/sci-fi-equipment/comp-jack`, `gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/coms-headset`, `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/crash-foam-canister`, `gear/sci-fi-equipment/data-spike`, `gear/sci-fi-equipment/decoy-beacon`, `gear/sci-fi-equipment/disguise-kit`, `gear/sci-fi-equipment/drum-magazines`, `gear/sci-fi-equipment/emergency-beacon`, `gear/sci-fi-equipment/emergency-hatchet`, `gear/sci-fi-equipment/emergency-oxygen-mask`, `gear/sci-fi-equipment/emergency-shank`, `gear/sci-fi-equipment/emergency-trauma-patch`, `gear/sci-fi-equipment/enforcer-armor`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/extended-barrel`, `gear/sci-fi-equipment/field-ration`, `gear/sci-fi-equipment/forward-assault-shield`, `gear/sci-fi-equipment/fuel-cells`, `gear/sci-fi-equipment/grapple-line-launcher`, `gear/sci-fi-equipment/gravity-anchor`, `gear/sci-fi-equipment/hazard-hud`, `gear/sci-fi-equipment/heavy-pistol`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/jump-boosters`, `gear/sci-fi-equipment/jump-pack`, `gear/sci-fi-equipment/kit-supplies`, `gear/sci-fi-equipment/knuckle-taser`, `gear/sci-fi-equipment/laser-pistol`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/light-combat-vest`, `gear/sci-fi-equipment/light-pistol`, `gear/sci-fi-equipment/long-range-coms`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/mag-boots`, `gear/sci-fi-equipment/mag-cuffs`, `gear/sci-fi-equipment/mebn-hud`, `gear/sci-fi-equipment/medical-kit`, `gear/sci-fi-equipment/mini-laser-cutter`, `gear/sci-fi-equipment/mobile-phone`, `gear/sci-fi-equipment/overcharge-chamber`, `gear/sci-fi-equipment/padded-flight-suit`, `gear/sci-fi-equipment/pain-suppressant-injector`, `gear/sci-fi-equipment/personal-shield`, `gear/sci-fi-equipment/portable-heater`, `gear/sci-fi-equipment/portable-water-purifier`, `gear/sci-fi-equipment/reactor-cores`, `gear/sci-fi-equipment/recoil-compensation-system`, `gear/sci-fi-equipment/reflex-sight`, `gear/sci-fi-equipment/remote-detonator`, `gear/sci-fi-equipment/repair-kit`, `gear/sci-fi-equipment/ripper-blade`, `gear/sci-fi-equipment/safer-unit`, `gear/sci-fi-equipment/scav-gear`, `gear/sci-fi-equipment/security-flight-suit`, `gear/sci-fi-equipment/shock-baton`, `gear/sci-fi-equipment/shock-charger`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/signature-spoofer`, `gear/sci-fi-equipment/site-safety-gear`, `gear/sci-fi-equipment/solar-array-pack`, `gear/sci-fi-equipment/squad-shield`, `gear/sci-fi-equipment/standard-issue-knife`, `gear/sci-fi-equipment/standard-issue-rifle`, `gear/sci-fi-equipment/survival-tent`, `gear/sci-fi-equipment/targeting-hud`, `gear/sci-fi-equipment/tech-kit`, `gear/sci-fi-equipment/ultraweave-evosuit`, `gear/sci-fi-equipment/vitaboost-injector`, `gear/sci-fi-equipment/weighted-core`, `rules/sci-fi/ballistics-in-space`, `rules/sci-fi/communications`, `rules/sci-fi/computer-systems`, `rules/sci-fi/energy-shields`, `rules/sci-fi/huds`, `character/traits/inter-planet-traveler`, `character/traits/scrap-hauler`, `character/traits/space-adept`

## `shield` — 5 blocks

`gear/equipment/shields-basics`, `rules/objects/shield-degradation`, `gear/sci-fi-equipment/ballistic-shield`, `gear/sci-fi-equipment/collapsible-shield`, `rules/sci-fi/energy-shields`

## `site-chrome` — 2 blocks

`site/announcement`, `site/wip-announcement`

## `size` — 1 blocks

`core-rules/size`

## `stats` — 13 blocks

`rules/combat/grapple`, `rules/combat/initiative`, `rules/combat/stealth`, `core-rules/size`, `rules/movement/primary-speed`, `rules/stats/action-points`, `rules/stats/attack`, `stats/blank-boxes`, `rules/stats/defense`, `rules/stats/luck`, `rules/stats/stress-threshold`, `rules/stats/vitality`, `stats/wounds-and-conditions-summary`

## `survival` — 17 blocks

`gear/generic-equipment/bedroll`, `gear/generic-equipment/compass`, `gear/generic-equipment/field-ration`, `gear/generic-equipment/fire-starter`, `gear/generic-equipment/rope-50ft`, `gear/generic-equipment/signal-mirror`, `gear/generic-equipment/signal-whistle`, `gear/generic-equipment/tent-2-person`, `gear/generic-equipment/tent-4-person`, `gear/generic-equipment/waterskin`, `gear/sci-fi-equipment/emergency-beacon`, `gear/sci-fi-equipment/emergency-oxygen-mask`, `gear/sci-fi-equipment/field-ration`, `gear/sci-fi-equipment/portable-heater`, `gear/sci-fi-equipment/portable-water-purifier`, `gear/sci-fi-equipment/solar-array-pack`, `gear/sci-fi-equipment/survival-tent`

## `tech` — 20 blocks

`gear/sci-fi-equipment/battery-cores`, `gear/sci-fi-equipment/bio-scanner`, `gear/sci-fi-equipment/bioskin-veil`, `gear/sci-fi-equipment/boost-pack`, `gear/sci-fi-equipment/comp-jack`, `gear/sci-fi-equipment/data-spike`, `gear/sci-fi-equipment/decoy-beacon`, `gear/sci-fi-equipment/fuel-cells`, `gear/sci-fi-equipment/grapple-line-launcher`, `gear/sci-fi-equipment/gravity-anchor`, `gear/sci-fi-equipment/jump-boosters`, `gear/sci-fi-equipment/jump-pack`, `gear/sci-fi-equipment/mag-boots`, `gear/sci-fi-equipment/mag-cuffs`, `gear/sci-fi-equipment/mini-laser-cutter`, `gear/sci-fi-equipment/personal-shield`, `gear/sci-fi-equipment/reactor-cores`, `gear/sci-fi-equipment/remote-detonator`, `gear/sci-fi-equipment/signature-spoofer`, `gear/sci-fi-equipment/squad-shield`

## `tools` — 11 blocks

`gear/generic-equipment/chain-10ft`, `gear/generic-equipment/chalk-sticks`, `gear/generic-equipment/grappling-hook`, `gear/generic-equipment/ink-writing-instrument`, `gear/generic-equipment/long-crowbar`, `gear/generic-equipment/manacles`, `gear/generic-equipment/parchment-sheets`, `gear/generic-equipment/pitons`, `gear/generic-equipment/sewing-set`, `gear/generic-equipment/shovel`, `gear/generic-equipment/whetstone`

## `trade-goods` — 11 blocks

`gear/generic-equipment/animal-feed`, `gear/generic-equipment/bag-of-salt`, `gear/generic-equipment/blank-book-journal`, `gear/generic-equipment/block-of-soap`, `gear/generic-equipment/candle-wax-block`, `gear/generic-equipment/coil-of-wire`, `gear/generic-equipment/common-alcohol-flask`, `gear/generic-equipment/iron-spikes`, `gear/generic-equipment/small-bell`, `gear/generic-equipment/twine`, `gear/generic-equipment/wooden-stakes`

## `trait` — 21 blocks

`character/traits/alert`, `character/traits/composed`, `character/traits/diplomatic`, `character/traits/hot-headed`, `character/traits/inter-planet-traveler`, `character/traits/intimidating`, `character/traits/lucky`, `character/traits/mentally-sound`, `character/traits/overview`, `character/traits/particularly-attractive`, `character/traits/picture-of-health`, `traits/racial-traits`, `character/traits/scrap-hauler`, `character/traits/sly`, `character/traits/sneaky`, `character/traits/space-adept`, `character/traits/stubborn`, `character/traits/tough`, `character/traits/unremarkable`, `character/traits/unshakable`, `character/traits/well-connected`

## `upgrade` — 17 blocks

`gear/sci-fi-equipment/auto-injector`, `gear/sci-fi-equipment/bipod`, `gear/sci-fi-equipment/chameleon-unit`, `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/drum-magazines`, `gear/sci-fi-equipment/emergency-shank`, `gear/sci-fi-equipment/extended-barrel`, `gear/sci-fi-equipment/forward-assault-shield`, `gear/sci-fi-equipment/hazard-hud`, `gear/sci-fi-equipment/mebn-hud`, `gear/sci-fi-equipment/overcharge-chamber`, `gear/sci-fi-equipment/recoil-compensation-system`, `gear/sci-fi-equipment/reflex-sight`, `gear/sci-fi-equipment/safer-unit`, `gear/sci-fi-equipment/shock-charger`, `gear/sci-fi-equipment/targeting-hud`, `gear/sci-fi-equipment/weighted-core`

## `vehicles` — 11 blocks

`rules/vehicles/boarding-and-bailing`, `rules/vehicles/collision-damage`, `rules/vehicles/cover-from-vehicles`, `rules/vehicles/drive`, `rules/vehicles/ignition`, `rules/vehicles/impact-and-overrun`, `rules/vehicles/initiative-and-occupants`, `rules/vehicles/mounts`, `rules/vehicles/overview`, `rules/vehicles/vehicle-actions`, `rules/vehicles/vehicle-size`

## `weapon` — 15 blocks

`gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/emergency-hatchet`, `gear/sci-fi-equipment/heavy-pistol`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/knuckle-taser`, `gear/sci-fi-equipment/laser-pistol`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/light-pistol`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/ripper-blade`, `gear/sci-fi-equipment/shock-baton`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/standard-issue-knife`, `gear/sci-fi-equipment/standard-issue-rifle`

## `wip` — 19 blocks

`bots/bal`, `bots/hel-1`, `bots/t00l`, `bots/trk-a`, `races/android`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`, `rules/vehicles/boarding-and-bailing`, `rules/vehicles/collision-damage`, `rules/vehicles/cover-from-vehicles`, `rules/vehicles/drive`, `rules/vehicles/ignition`, `rules/vehicles/impact-and-overrun`, `rules/vehicles/initiative-and-occupants`, `rules/vehicles/mounts`, `rules/vehicles/overview`, `rules/vehicles/vehicle-actions`, `rules/vehicles/vehicle-size`

## `wound-type` — 7 blocks

`rules/wounds/burn`, `rules/wounds/contusion`, `rules/wounds/dislocation`, `rules/wounds/fracture`, `rules/wounds/laceration`, `rules/wounds/puncture`, `rules/wounds/sprain`

## `wounds` — 7 blocks

`rules/wounds/burn`, `rules/wounds/contusion`, `rules/wounds/dislocation`, `rules/wounds/fracture`, `rules/wounds/laceration`, `rules/wounds/puncture`, `rules/wounds/sprain`


<!-- lets add a rnaged weapon tag and a melee weapon tag -->
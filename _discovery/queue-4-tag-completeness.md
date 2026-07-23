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
  `environment/extreme-environments`, `sci-fi/ballistics-in-space` embedded in
  the core Ballistic item-tag block). If a GM pulls "all core environment
  rules", extreme environments will NOT come along — that is by design, but
  verify it's the intended design.
- **The `luck` set** — Luck the stat (`stats/luck`) and the Core Luck abilities
  share the tag. If the builder treats `luck` as one pull, the stat block rides
  along with the ability list. Confirm that's wanted.

<!-- as a note, blocks can have more than one setting tag (core, sci fi, fantasy). it will be less common, but it makes sense for some things. -->


## `ability` — 76 blocks

`abilities/adaptive-luck`, `abilities/agile-charge`, `abilities/agile-dodge`, `abilities/bash`, `abilities/battery-saboteur`, `abilities/battery-saver`, `abilities/bolster`, `abilities/bonus-luck`, `abilities/charge`, `abilities/companion-bot`, `abilities/controlled-suppressing-fire`, `abilities/coordinated-strike`, `abilities/danger-reflex`, `abilities/dead-drop`, `abilities/defender`, `abilities/dual-attack`, `abilities/dual-defense`, `abilities/dual-strike`, `abilities/expert`, `abilities/extended-rage`, `abilities/extra-attack`, `abilities/fast-kit-trap`, `abilities/fearless-rage`, `abilities/field-medic`, `abilities/field-patch`, `abilities/focus-attack`, `abilities/focus-in`, `abilities/friend-in-need`, `abilities/friend-of-fortune`, `abilities/general-spectacle`, `abilities/ghost-protocol`, `abilities/improved-bash`, `abilities/improved-suppressing-fire`, `abilities/indomitable-rage`, `abilities/just-grazed`, `abilities/just-winded`, `abilities/kit-trap`, `abilities/leaping-charge`, `abilities/leg-shot`, `abilities/line-of-fire`, `abilities/long-performance`, `abilities/lucky-strike`, `abilities/martial-supremacy`, `abilities/medical-marvel`, `abilities/momentum-dodge`, `abilities/natural-gift`, `abilities/opensaysame`, `abilities/oppressive-suppression`, `abilities/outburst`, `abilities/overcharge`, `abilities/overview`, `abilities/patient-shot`, `abilities/power-main-tap`, `abilities/powerful-rage`, `abilities/precise-focus`, `abilities/quick-draw`, `abilities/quick-firing`, `abilities/rage`, `abilities/rally`, `abilities/reckless-attack`, `abilities/rigged-comp-jack`, `abilities/salvage`, `abilities/signal-intelligence`, `abilities/slip-strike`, `abilities/special-encouragement`, `abilities/student`, `abilities/suppressing-fire`, `abilities/swift-custom-battery`, `abilities/swift-dual-attack`, `abilities/tech-armor`, `abilities/the-look`, `abilities/tis-but-a-scratch`, `abilities/true-defender`, `abilities/unsettling-rage`, `abilities/vital-focus`, `abilities/vital-strike`

## `actions` — 11 blocks

`actions/action-types`, `actions/difficult-terrain`, `actions/move`, `actions/multi-turn-actions`, `actions/opportunity-actions`, `actions/reactions`, `actions/readied-actions`, `actions/standard-actions`, `actions/step`, `combat/opportunity-attack`, `stats/action-points`

## `armor` — 14 blocks

`equipment/armor-basics`, `objects/armor-degradation`, `sci-fi-equipment/basic-p-suit`, `sci-fi-equipment/classic-evosuit`, `sci-fi-equipment/combat-evosuit`, `sci-fi-equipment/combat-vest`, `sci-fi-equipment/enforcer-armor`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/light-combat-vest`, `sci-fi-equipment/padded-flight-suit`, `sci-fi-equipment/scav-gear`, `sci-fi-equipment/security-flight-suit`, `sci-fi-equipment/site-safety-gear`, `sci-fi-equipment/ultraweave-evosuit`

## `armor-upgrade` — 8 blocks

`sci-fi-equipment/auto-injector`, `sci-fi-equipment/chameleon-unit`, `sci-fi-equipment/coms-unit`, `sci-fi-equipment/emergency-shank`, `sci-fi-equipment/hazard-hud`, `sci-fi-equipment/mebn-hud`, `sci-fi-equipment/safer-unit`, `sci-fi-equipment/targeting-hud`

## `attributes` — 5 blocks

`attributes/attribute-values`, `attributes/determining-attributes`, `attributes/mental-attributes`, `attributes/overview`, `attributes/physical-attributes`

## `basics` — 10 blocks

`basics/advantage`, `basics/contested-rolls`, `basics/d100-or-percentage`, `basics/decision-rolls`, `basics/key-terms`, `basics/resolving-a-tie`, `basics/success-and-failure`, `basics/supply-rolls`, `basics/target-numbers`, `basics/the-rounding-rule`

## `battery` — 5 blocks

`abilities/battery-saboteur`, `abilities/battery-saver`, `abilities/overcharge`, `abilities/power-main-tap`, `abilities/swift-custom-battery`

## `bots` — 5 blocks

`bots/automated-machines`, `bots/bal`, `bots/hel-1`, `bots/t00l`, `bots/trk-a`

## `character-creation` — 6 blocks

`abilities/overview`, `chargen/overview`, `proficiencies/overview`, `races/overview`, `traits/overview`, `traits/racial-traits`

## `clothing` — 6 blocks

`generic-equipment/face-wrap`, `generic-equipment/heavy-cloak`, `generic-equipment/rain-poncho`, `generic-equipment/reinforced-boots`, `generic-equipment/wide-brim-hat`, `generic-equipment/work-gloves`

## `combat` — 20 blocks

`combat/action-catalog`, `combat/advantage-in-combat`, `combat/attack-roll`, `combat/combat-basics`, `combat/cover`, `combat/damage-dice`, `combat/damage-modifiers`, `combat/damage-overview`, `combat/damage-resistance`, `combat/damage-sources`, `combat/damage-types`, `combat/grapple`, `combat/initiative`, `combat/opportunity-attack`, `combat/stealth`, `combat/steps-to-an-attack`, `combat/surprise-attacks`, `core-rules/size`, `health/applying-damage`, `sci-fi/ballistics-in-space`

## `communications` — 3 blocks

`sci-fi-equipment/coms-headset`, `sci-fi-equipment/long-range-coms`, `sci-fi-equipment/mobile-phone`

## `component` — 23 blocks

`components/audio-processor`, `components/augmented-arm-actuators`, `components/automatic-crash-foam-system`, `components/backup-power-cell`, `components/damage-and-wounds`, `components/heavy-wrist-laser`, `components/improved-cooling-system`, `components/installation`, `components/internal-comp-jack`, `components/manipulator-override`, `components/optical-suite`, `components/overview`, `components/power-sources`, `components/reinforced-chassis-plating`, `components/relay-node`, `components/repair-subroutine`, `components/servo-boost-legs`, `components/shield-mount`, `components/signal-masts`, `components/stabilizer-gyros`, `components/subdermal-plating`, `components/targeting-array`, `components/wrist-laser`

## `computers` — 1 blocks

`sci-fi/computer-systems`
 <!-- add festures and equipment that has to do with the comp jack -->

## `condition` — 14 blocks

`conditions/asphyxiating`, `conditions/bleeding`, `conditions/confused`, `conditions/crippled`, `conditions/dying`, `conditions/fatigued`, `conditions/frightened`, `conditions/immobilized`, `conditions/pinned`, `conditions/restrained`, `conditions/shaken`, `conditions/sick`, `conditions/stressed`, `conditions/unconscious`

## `conditions` — 14 blocks

`conditions/asphyxiating`, `conditions/bleeding`, `conditions/confused`, `conditions/crippled`, `conditions/dying`, `conditions/fatigued`, `conditions/frightened`, `conditions/immobilized`, `conditions/pinned`, `conditions/restrained`, `conditions/shaken`, `conditions/sick`, `conditions/stressed`, `conditions/unconscious`

<!-- consitions and conditoon tag feel redudntant -->

## `containers` — 9 blocks

`generic-equipment/backpack`, `generic-equipment/barrel`, `generic-equipment/crate`, `generic-equipment/dry-sack`, `generic-equipment/lockable-chest`, `generic-equipment/pouch-sets`, `generic-equipment/quiver`, `generic-equipment/saddlebags`, `generic-equipment/satchel`

## `core` — 93 blocks

`abilities/adaptive-luck`, `abilities/agile-charge`, `abilities/agile-dodge`, `abilities/bash`, `abilities/bolster`, `abilities/bonus-luck`, `abilities/charge`, `abilities/controlled-suppressing-fire`, `abilities/coordinated-strike`, `abilities/danger-reflex`, `abilities/dead-drop`, `abilities/defender`, `abilities/dual-attack`, `abilities/dual-defense`, `abilities/dual-strike`, `abilities/expert`, `abilities/extended-rage`, `abilities/extra-attack`, `abilities/fast-kit-trap`, `abilities/fearless-rage`, `abilities/field-medic`, `abilities/field-patch`, `abilities/focus-attack`, `abilities/focus-in`, `abilities/friend-in-need`, `abilities/friend-of-fortune`, `abilities/general-spectacle`, `abilities/improved-bash`, `abilities/improved-suppressing-fire`, `abilities/indomitable-rage`, `abilities/just-grazed`, `abilities/just-winded`, `abilities/kit-trap`, `abilities/leaping-charge`, `abilities/leg-shot`, `abilities/line-of-fire`, `abilities/long-performance`, `abilities/lucky-strike`, `abilities/martial-supremacy`, `abilities/medical-marvel`, `abilities/momentum-dodge`, `abilities/natural-gift`, `abilities/oppressive-suppression`, `abilities/outburst`, `abilities/patient-shot`, `abilities/powerful-rage`, `abilities/precise-focus`, `abilities/quick-draw`, `abilities/quick-firing`, `abilities/rage`, `abilities/rally`, `abilities/reckless-attack`, `abilities/slip-strike`, `abilities/student`, `abilities/suppressing-fire`, `abilities/swift-dual-attack`, `abilities/the-look`, `abilities/tis-but-a-scratch`, `abilities/true-defender`, `abilities/unsettling-rage`, `abilities/vital-focus`, `abilities/vital-strike`, `proficiencies/armor`, `proficiencies/b-e-kit`, `proficiencies/disguise-kit`, `proficiencies/improved-ability`, `proficiencies/licensed-instincts`, `proficiencies/martial-training`, `proficiencies/medic-training`, `proficiencies/medical-instincts`, `proficiencies/negotiation-training`, `proficiencies/repair-kit`, `proficiencies/research`, `proficiencies/survival-training`, `proficiencies/vehicle`, `proficiencies/weapon`, `races/classic-human`, `traits/alert`, `traits/composed`, `traits/diplomatic`, `traits/hot-headed`, `traits/intimidating`, `traits/lucky`, `traits/mentally-sound`, `traits/particularly-attractive`, `traits/picture-of-health`, `traits/sly`, `traits/sneaky`, `traits/stubborn`, `traits/tough`, `traits/unremarkable`, `traits/unshakable`, `traits/well-connected`

## `damage` — 2 blocks

`combat/damage-dice`, `health/applying-damage`

## `drones` — 2 blocks

`bots/bal`, `bots/hel-1`

## `environment` — 6 blocks

`environment/exposure-intervals`, `environment/extreme-environments`, `environment/heat-and-cold`, `environment/overview`, `environment/toxic-atmosphere`, `environment/visibility`

## `equipment` — 169 blocks

`components/audio-processor`, `components/augmented-arm-actuators`, `components/automatic-crash-foam-system`, `components/backup-power-cell`, `components/heavy-wrist-laser`, `components/improved-cooling-system`, `components/internal-comp-jack`, `components/manipulator-override`, `components/optical-suite`, `components/reinforced-chassis-plating`, `components/relay-node`, `components/repair-subroutine`, `components/servo-boost-legs`, `components/shield-mount`, `components/signal-masts`, `components/stabilizer-gyros`, `components/subdermal-plating`, `components/targeting-array`, `components/wrist-laser`, `equipment/armor-basics`, `equipment/common-terms`, `equipment/medkit-note`, `equipment/shields-basics`, `generic-equipment/animal-feed`, `generic-equipment/antiseptic-poultice`, `generic-equipment/antitoxin`, `generic-equipment/backpack`, `generic-equipment/bag-of-salt`, `generic-equipment/bandages`, `generic-equipment/barrel`, `generic-equipment/bedroll`, `generic-equipment/blank-book-journal`, `generic-equipment/block-of-soap`, `generic-equipment/candle`, `generic-equipment/candle-wax-block`, `generic-equipment/chain-10ft`, `generic-equipment/chalk-sticks`, `generic-equipment/coil-of-wire`, `generic-equipment/common-alcohol-flask`, `generic-equipment/compass`, `generic-equipment/crate`, `generic-equipment/dry-sack`, `generic-equipment/face-wrap`, `generic-equipment/field-ration`, `generic-equipment/fire-starter`, `generic-equipment/fuel-oil-flask`, `generic-equipment/grappling-hook`, `generic-equipment/heavy-cloak`, `generic-equipment/ink-writing-instrument`, `generic-equipment/iron-spikes`, `generic-equipment/lockable-chest`, `generic-equipment/long-crowbar`, `generic-equipment/manacles`, `generic-equipment/oil-lantern`, `generic-equipment/parchment-sheets`, `generic-equipment/pitons`, `generic-equipment/pouch-sets`, `generic-equipment/quiver`, `generic-equipment/rain-poncho`, `generic-equipment/reinforced-boots`, `generic-equipment/restorative-tonic`, `generic-equipment/rope-50ft`, `generic-equipment/saddlebags`, `generic-equipment/satchel`, `generic-equipment/sewing-set`, `generic-equipment/shovel`, `generic-equipment/signal-mirror`, `generic-equipment/signal-whistle`, `generic-equipment/small-bell`, `generic-equipment/splint-materials`, `generic-equipment/tent-2-person`, `generic-equipment/tent-4-person`, `generic-equipment/torch`, `generic-equipment/twine`, `generic-equipment/waterskin`, `generic-equipment/whetstone`, `generic-equipment/wide-brim-hat`, `generic-equipment/wooden-stakes`, `generic-equipment/work-gloves`, `sci-fi-equipment/ara-5`, `sci-fi-equipment/auto-injector`, `sci-fi-equipment/auto-pistol`, `sci-fi-equipment/b-e-kit`, `sci-fi-equipment/ballistic-shield`, `sci-fi-equipment/basic-p-suit`, `sci-fi-equipment/battery-cores`, `sci-fi-equipment/bio-scanner`, `sci-fi-equipment/bioskin-veil`, `sci-fi-equipment/bipod`, `sci-fi-equipment/boost-pack`, `sci-fi-equipment/chameleon-unit`, `sci-fi-equipment/classic-evosuit`, `sci-fi-equipment/collapsible-shield`, `sci-fi-equipment/combat-evosuit`, `sci-fi-equipment/combat-vest`, `sci-fi-equipment/comp-jack`, `sci-fi-equipment/compact-rifle`, `sci-fi-equipment/coms-headset`, `sci-fi-equipment/coms-unit`, `sci-fi-equipment/crash-foam-canister`, `sci-fi-equipment/data-spike`, `sci-fi-equipment/decoy-beacon`, `sci-fi-equipment/disguise-kit`, `sci-fi-equipment/drum-magazines`, `sci-fi-equipment/emergency-beacon`, `sci-fi-equipment/emergency-hatchet`, `sci-fi-equipment/emergency-oxygen-mask`, `sci-fi-equipment/emergency-shank`, `sci-fi-equipment/emergency-trauma-patch`, `sci-fi-equipment/enforcer-armor`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/extended-barrel`, `sci-fi-equipment/field-ration`, `sci-fi-equipment/forward-assault-shield`, `sci-fi-equipment/fuel-cells`, `sci-fi-equipment/grapple-line-launcher`, `sci-fi-equipment/gravity-anchor`, `sci-fi-equipment/hazard-hud`, `sci-fi-equipment/heavy-pistol`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/jump-boosters`, `sci-fi-equipment/jump-pack`, `sci-fi-equipment/kit-supplies`, `sci-fi-equipment/knuckle-taser`, `sci-fi-equipment/laser-pistol`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/light-combat-vest`, `sci-fi-equipment/light-pistol`, `sci-fi-equipment/long-range-coms`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/mag-boots`, `sci-fi-equipment/mag-cuffs`, `sci-fi-equipment/mebn-hud`, `sci-fi-equipment/medical-kit`, `sci-fi-equipment/mini-laser-cutter`, `sci-fi-equipment/mobile-phone`, `sci-fi-equipment/overcharge-chamber`, `sci-fi-equipment/padded-flight-suit`, `sci-fi-equipment/pain-suppressant-injector`, `sci-fi-equipment/personal-shield`, `sci-fi-equipment/portable-heater`, `sci-fi-equipment/portable-water-purifier`, `sci-fi-equipment/reactor-cores`, `sci-fi-equipment/recoil-compensation-system`, `sci-fi-equipment/reflex-sight`, `sci-fi-equipment/remote-detonator`, `sci-fi-equipment/repair-kit`, `sci-fi-equipment/ripper-blade`, `sci-fi-equipment/safer-unit`, `sci-fi-equipment/scav-gear`, `sci-fi-equipment/security-flight-suit`, `sci-fi-equipment/shock-baton`, `sci-fi-equipment/shock-charger`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/signature-spoofer`, `sci-fi-equipment/site-safety-gear`, `sci-fi-equipment/solar-array-pack`, `sci-fi-equipment/squad-shield`, `sci-fi-equipment/standard-issue-knife`, `sci-fi-equipment/standard-issue-rifle`, `sci-fi-equipment/survival-tent`, `sci-fi-equipment/targeting-hud`, `sci-fi-equipment/tech-kit`, `sci-fi-equipment/ultraweave-evosuit`, `sci-fi-equipment/vitaboost-injector`, `sci-fi-equipment/weighted-core`, `sci-fi/communications`, `sci-fi/energy-shields`, `sci-fi/huds`

## `general` — 63 blocks

`abilities/agile-charge`, `abilities/agile-dodge`, `abilities/bash`, `abilities/bolster`, `abilities/charge`, `abilities/companion-bot`, `abilities/controlled-suppressing-fire`, `abilities/coordinated-strike`, `abilities/danger-reflex`, `abilities/dead-drop`, `abilities/defender`, `abilities/dual-attack`, `abilities/dual-defense`, `abilities/dual-strike`, `abilities/expert`, `abilities/extended-rage`, `abilities/extra-attack`, `abilities/fast-kit-trap`, `abilities/fearless-rage`, `abilities/field-medic`, `abilities/field-patch`, `abilities/focus-attack`, `abilities/focus-in`, `abilities/friend-in-need`, `abilities/general-spectacle`, `abilities/ghost-protocol`, `abilities/improved-bash`, `abilities/improved-suppressing-fire`, `abilities/indomitable-rage`, `abilities/just-grazed`, `abilities/just-winded`, `abilities/kit-trap`, `abilities/leaping-charge`, `abilities/leg-shot`, `abilities/line-of-fire`, `abilities/long-performance`, `abilities/martial-supremacy`, `abilities/momentum-dodge`, `abilities/opensaysame`, `abilities/oppressive-suppression`, `abilities/outburst`, `abilities/patient-shot`, `abilities/powerful-rage`, `abilities/precise-focus`, `abilities/quick-draw`, `abilities/quick-firing`, `abilities/rage`, `abilities/rally`, `abilities/reckless-attack`, `abilities/rigged-comp-jack`, `abilities/salvage`, `abilities/signal-intelligence`, `abilities/slip-strike`, `abilities/special-encouragement`, `abilities/student`, `abilities/suppressing-fire`, `abilities/swift-dual-attack`, `abilities/tech-armor`, `abilities/the-look`, `abilities/true-defender`, `abilities/unsettling-rage`, `abilities/vital-focus`, `abilities/vital-strike`

## `generic` — 56 blocks

`generic-equipment/animal-feed`, `generic-equipment/antiseptic-poultice`, `generic-equipment/antitoxin`, `generic-equipment/backpack`, `generic-equipment/bag-of-salt`, `generic-equipment/bandages`, `generic-equipment/barrel`, `generic-equipment/bedroll`, `generic-equipment/blank-book-journal`, `generic-equipment/block-of-soap`, `generic-equipment/candle`, `generic-equipment/candle-wax-block`, `generic-equipment/chain-10ft`, `generic-equipment/chalk-sticks`, `generic-equipment/coil-of-wire`, `generic-equipment/common-alcohol-flask`, `generic-equipment/compass`, `generic-equipment/crate`, `generic-equipment/dry-sack`, `generic-equipment/face-wrap`, `generic-equipment/field-ration`, `generic-equipment/fire-starter`, `generic-equipment/fuel-oil-flask`, `generic-equipment/grappling-hook`, `generic-equipment/heavy-cloak`, `generic-equipment/ink-writing-instrument`, `generic-equipment/iron-spikes`, `generic-equipment/lockable-chest`, `generic-equipment/long-crowbar`, `generic-equipment/manacles`, `generic-equipment/oil-lantern`, `generic-equipment/parchment-sheets`, `generic-equipment/pitons`, `generic-equipment/pouch-sets`, `generic-equipment/quiver`, `generic-equipment/rain-poncho`, `generic-equipment/reinforced-boots`, `generic-equipment/restorative-tonic`, `generic-equipment/rope-50ft`, `generic-equipment/saddlebags`, `generic-equipment/satchel`, `generic-equipment/sewing-set`, `generic-equipment/shovel`, `generic-equipment/signal-mirror`, `generic-equipment/signal-whistle`, `generic-equipment/small-bell`, `generic-equipment/splint-materials`, `generic-equipment/tent-2-person`, `generic-equipment/tent-4-person`, `generic-equipment/torch`, `generic-equipment/twine`, `generic-equipment/waterskin`, `generic-equipment/whetstone`, `generic-equipment/wide-brim-hat`, `generic-equipment/wooden-stakes`, `generic-equipment/work-gloves`

## `health` — 4 blocks

`health/applying-damage`, `health/overview`, `stats/defense`, `stats/vitality`

## `heavy-armor` — 5 blocks

`sci-fi-equipment/combat-evosuit`, `sci-fi-equipment/enforcer-armor`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/security-flight-suit`, `sci-fi-equipment/ultraweave-evosuit`

## `heavy-ranged` — 1 blocks

`sci-fi-equipment/heavy-rotary-cannon`

## `inventory` — 2 blocks

`inventory/body-slots`, `inventory/carry-limits`

## `item-tag` — 20 blocks

`item-tags/adaptive-mesh`, `item-tags/arcing`, `item-tags/ballistic`, `item-tags/battery`, `item-tags/belt-fed`, `item-tags/bulky`, `item-tags/concealable`, `item-tags/durable`, `item-tags/firing-modes`, `item-tags/fragile`, `item-tags/fuel-cells`, `item-tags/injector`, `item-tags/long-reload`, `item-tags/power-source`, `item-tags/pressurized`, `item-tags/rounds-reload`, `item-tags/space-suit`, `item-tags/throwable`, `item-tags/two-handed`, `item-tags/versatile`

## `kit` — 6 blocks

`sci-fi-equipment/b-e-kit`, `sci-fi-equipment/disguise-kit`, `sci-fi-equipment/kit-supplies`, `sci-fi-equipment/medical-kit`, `sci-fi-equipment/repair-kit`, `sci-fi-equipment/tech-kit`

## `legal` — 1 blocks

`site/license`

<!-- i would argue tjis can be excluded from scope and all pdfs get a liscene page built in, a cover option, and a toc option -->

## `light-armor` — 7 blocks

`sci-fi-equipment/basic-p-suit`, `sci-fi-equipment/classic-evosuit`, `sci-fi-equipment/combat-vest`, `sci-fi-equipment/light-combat-vest`, `sci-fi-equipment/padded-flight-suit`, `sci-fi-equipment/scav-gear`, `sci-fi-equipment/site-safety-gear`

## `light-melee` — 2 blocks

`sci-fi-equipment/knuckle-taser`, `sci-fi-equipment/standard-issue-knife`

## `light-sources` — 4 blocks

`generic-equipment/candle`, `generic-equipment/fuel-oil-flask`, `generic-equipment/oil-lantern`, `generic-equipment/torch`

## `luck` — 8 blocks

`abilities/adaptive-luck`, `abilities/bonus-luck`, `abilities/friend-of-fortune`, `abilities/lucky-strike`, `abilities/medical-marvel`, `abilities/natural-gift`, `abilities/tis-but-a-scratch`, `stats/luck`

## `medical` — 11 blocks

`equipment/medkit-note`, `generic-equipment/antiseptic-poultice`, `generic-equipment/antitoxin`, `generic-equipment/bandages`, `generic-equipment/restorative-tonic`, `generic-equipment/splint-materials`, `sci-fi-equipment/ara-5`, `sci-fi-equipment/crash-foam-canister`, `sci-fi-equipment/emergency-trauma-patch`, `sci-fi-equipment/pain-suppressant-injector`, `sci-fi-equipment/vitaboost-injector`

## `medium-melee` — 3 blocks

`sci-fi-equipment/emergency-hatchet`, `sci-fi-equipment/ripper-blade`, `sci-fi-equipment/shock-baton`

## `melee-upgrade` — 2 blocks

`sci-fi-equipment/shock-charger`, `sci-fi-equipment/weighted-core`

## `movement` — 6 blocks

`actions/move`, `actions/step`, `movement/primary-speed`, `movement/speed-descriptors`, `movement/speed-tiers`, `movement/speed-tiers-chart`

## `objects` — 7 blocks

`objects/armor-degradation`, `objects/conditions`, `objects/durability`, `objects/material-def`, `objects/overview`, `objects/shield-degradation`, `objects/targeting-objects`

## `pistol` — 4 blocks

`sci-fi-equipment/auto-pistol`, `sci-fi-equipment/heavy-pistol`, `sci-fi-equipment/laser-pistol`, `sci-fi-equipment/light-pistol`

## `proficiency` — 18 blocks

`proficiencies/armor`, `proficiencies/b-e-kit`, `proficiencies/comp-jack`, `proficiencies/disguise-kit`, `proficiencies/general-robotics`, `proficiencies/general-technology`, `proficiencies/improved-ability`, `proficiencies/licensed-instincts`, `proficiencies/martial-training`, `proficiencies/medic-training`, `proficiencies/medical-instincts`, `proficiencies/negotiation-training`, `proficiencies/overview`, `proficiencies/repair-kit`, `proficiencies/research`, `proficiencies/survival-training`, `proficiencies/vehicle`, `proficiencies/weapon`

## `races` — 6 blocks

`races/android`, `races/classic-human`, `races/overview`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`

## `racial` — 1 blocks

`traits/racial-traits`

<!-- i think this block may be obsolete since the races addition, may need to check that it references the correct ruleset and ooints to the races section and not to racial traits that no longer exist -->

## `ranged-upgrade` — 7 blocks

`sci-fi-equipment/bipod`, `sci-fi-equipment/drum-magazines`, `sci-fi-equipment/extended-barrel`, `sci-fi-equipment/forward-assault-shield`, `sci-fi-equipment/overcharge-chamber`, `sci-fi-equipment/recoil-compensation-system`, `sci-fi-equipment/reflex-sight`

## `rifle` — 5 blocks

`sci-fi-equipment/compact-rifle`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/standard-issue-rifle`

## `sci-fi` — 140 blocks

`abilities/battery-saboteur`, `abilities/battery-saver`, `abilities/companion-bot`, `abilities/ghost-protocol`, `abilities/opensaysame`, `abilities/overcharge`, `abilities/power-main-tap`, `abilities/rigged-comp-jack`, `abilities/salvage`, `abilities/signal-intelligence`, `abilities/special-encouragement`, `abilities/swift-custom-battery`, `abilities/tech-armor`, `bots/automated-machines`, `components/audio-processor`, `components/augmented-arm-actuators`, `components/automatic-crash-foam-system`, `components/backup-power-cell`, `components/damage-and-wounds`, `components/heavy-wrist-laser`, `components/improved-cooling-system`, `components/installation`, `components/internal-comp-jack`, `components/manipulator-override`, `components/optical-suite`, `components/overview`, `components/power-sources`, `components/reinforced-chassis-plating`, `components/relay-node`, `components/repair-subroutine`, `components/servo-boost-legs`, `components/shield-mount`, `components/signal-masts`, `components/stabilizer-gyros`, `components/subdermal-plating`, `components/targeting-array`, `components/wrist-laser`, `environment/extreme-environments`, `proficiencies/comp-jack`, `proficiencies/general-robotics`, `proficiencies/general-technology`, `races/android`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`, `sci-fi-equipment/ara-5`, `sci-fi-equipment/auto-injector`, `sci-fi-equipment/auto-pistol`, `sci-fi-equipment/b-e-kit`, `sci-fi-equipment/ballistic-shield`, `sci-fi-equipment/basic-p-suit`, `sci-fi-equipment/battery-cores`, `sci-fi-equipment/bio-scanner`, `sci-fi-equipment/bioskin-veil`, `sci-fi-equipment/bipod`, `sci-fi-equipment/boost-pack`, `sci-fi-equipment/chameleon-unit`, `sci-fi-equipment/classic-evosuit`, `sci-fi-equipment/collapsible-shield`, `sci-fi-equipment/combat-evosuit`, `sci-fi-equipment/combat-vest`, `sci-fi-equipment/comp-jack`, `sci-fi-equipment/compact-rifle`, `sci-fi-equipment/coms-headset`, `sci-fi-equipment/coms-unit`, `sci-fi-equipment/crash-foam-canister`, `sci-fi-equipment/data-spike`, `sci-fi-equipment/decoy-beacon`, `sci-fi-equipment/disguise-kit`, `sci-fi-equipment/drum-magazines`, `sci-fi-equipment/emergency-beacon`, `sci-fi-equipment/emergency-hatchet`, `sci-fi-equipment/emergency-oxygen-mask`, `sci-fi-equipment/emergency-shank`, `sci-fi-equipment/emergency-trauma-patch`, `sci-fi-equipment/enforcer-armor`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/extended-barrel`, `sci-fi-equipment/field-ration`, `sci-fi-equipment/forward-assault-shield`, `sci-fi-equipment/fuel-cells`, `sci-fi-equipment/grapple-line-launcher`, `sci-fi-equipment/gravity-anchor`, `sci-fi-equipment/hazard-hud`, `sci-fi-equipment/heavy-pistol`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/jump-boosters`, `sci-fi-equipment/jump-pack`, `sci-fi-equipment/kit-supplies`, `sci-fi-equipment/knuckle-taser`, `sci-fi-equipment/laser-pistol`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/light-combat-vest`, `sci-fi-equipment/light-pistol`, `sci-fi-equipment/long-range-coms`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/mag-boots`, `sci-fi-equipment/mag-cuffs`, `sci-fi-equipment/mebn-hud`, `sci-fi-equipment/medical-kit`, `sci-fi-equipment/mini-laser-cutter`, `sci-fi-equipment/mobile-phone`, `sci-fi-equipment/overcharge-chamber`, `sci-fi-equipment/padded-flight-suit`, `sci-fi-equipment/pain-suppressant-injector`, `sci-fi-equipment/personal-shield`, `sci-fi-equipment/portable-heater`, `sci-fi-equipment/portable-water-purifier`, `sci-fi-equipment/reactor-cores`, `sci-fi-equipment/recoil-compensation-system`, `sci-fi-equipment/reflex-sight`, `sci-fi-equipment/remote-detonator`, `sci-fi-equipment/repair-kit`, `sci-fi-equipment/ripper-blade`, `sci-fi-equipment/safer-unit`, `sci-fi-equipment/scav-gear`, `sci-fi-equipment/security-flight-suit`, `sci-fi-equipment/shock-baton`, `sci-fi-equipment/shock-charger`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/signature-spoofer`, `sci-fi-equipment/site-safety-gear`, `sci-fi-equipment/solar-array-pack`, `sci-fi-equipment/squad-shield`, `sci-fi-equipment/standard-issue-knife`, `sci-fi-equipment/standard-issue-rifle`, `sci-fi-equipment/survival-tent`, `sci-fi-equipment/targeting-hud`, `sci-fi-equipment/tech-kit`, `sci-fi-equipment/ultraweave-evosuit`, `sci-fi-equipment/vitaboost-injector`, `sci-fi-equipment/weighted-core`, `sci-fi/ballistics-in-space`, `sci-fi/communications`, `sci-fi/computer-systems`, `sci-fi/energy-shields`, `sci-fi/huds`, `traits/inter-planet-traveler`, `traits/scrap-hauler`, `traits/space-adept`

## `shield` — 5 blocks

`equipment/shields-basics`, `objects/shield-degradation`, `sci-fi-equipment/ballistic-shield`, `sci-fi-equipment/collapsible-shield`, `sci-fi/energy-shields`

## `site-chrome` — 2 blocks

`site/announcement`, `site/wip-announcement`

## `size` — 1 blocks

`core-rules/size`

## `stats` — 13 blocks

`combat/grapple`, `combat/initiative`, `combat/stealth`, `core-rules/size`, `movement/primary-speed`, `stats/action-points`, `stats/attack`, `stats/blank-boxes`, `stats/defense`, `stats/luck`, `stats/stress-threshold`, `stats/vitality`, `stats/wounds-and-conditions-summary`

## `survival` — 17 blocks

`generic-equipment/bedroll`, `generic-equipment/compass`, `generic-equipment/field-ration`, `generic-equipment/fire-starter`, `generic-equipment/rope-50ft`, `generic-equipment/signal-mirror`, `generic-equipment/signal-whistle`, `generic-equipment/tent-2-person`, `generic-equipment/tent-4-person`, `generic-equipment/waterskin`, `sci-fi-equipment/emergency-beacon`, `sci-fi-equipment/emergency-oxygen-mask`, `sci-fi-equipment/field-ration`, `sci-fi-equipment/portable-heater`, `sci-fi-equipment/portable-water-purifier`, `sci-fi-equipment/solar-array-pack`, `sci-fi-equipment/survival-tent`

## `tech` — 20 blocks

`sci-fi-equipment/battery-cores`, `sci-fi-equipment/bio-scanner`, `sci-fi-equipment/bioskin-veil`, `sci-fi-equipment/boost-pack`, `sci-fi-equipment/comp-jack`, `sci-fi-equipment/data-spike`, `sci-fi-equipment/decoy-beacon`, `sci-fi-equipment/fuel-cells`, `sci-fi-equipment/grapple-line-launcher`, `sci-fi-equipment/gravity-anchor`, `sci-fi-equipment/jump-boosters`, `sci-fi-equipment/jump-pack`, `sci-fi-equipment/mag-boots`, `sci-fi-equipment/mag-cuffs`, `sci-fi-equipment/mini-laser-cutter`, `sci-fi-equipment/personal-shield`, `sci-fi-equipment/reactor-cores`, `sci-fi-equipment/remote-detonator`, `sci-fi-equipment/signature-spoofer`, `sci-fi-equipment/squad-shield`

## `tools` — 11 blocks

`generic-equipment/chain-10ft`, `generic-equipment/chalk-sticks`, `generic-equipment/grappling-hook`, `generic-equipment/ink-writing-instrument`, `generic-equipment/long-crowbar`, `generic-equipment/manacles`, `generic-equipment/parchment-sheets`, `generic-equipment/pitons`, `generic-equipment/sewing-set`, `generic-equipment/shovel`, `generic-equipment/whetstone`

## `trade-goods` — 11 blocks

`generic-equipment/animal-feed`, `generic-equipment/bag-of-salt`, `generic-equipment/blank-book-journal`, `generic-equipment/block-of-soap`, `generic-equipment/candle-wax-block`, `generic-equipment/coil-of-wire`, `generic-equipment/common-alcohol-flask`, `generic-equipment/iron-spikes`, `generic-equipment/small-bell`, `generic-equipment/twine`, `generic-equipment/wooden-stakes`

## `trait` — 21 blocks

`traits/alert`, `traits/composed`, `traits/diplomatic`, `traits/hot-headed`, `traits/inter-planet-traveler`, `traits/intimidating`, `traits/lucky`, `traits/mentally-sound`, `traits/overview`, `traits/particularly-attractive`, `traits/picture-of-health`, `traits/racial-traits`, `traits/scrap-hauler`, `traits/sly`, `traits/sneaky`, `traits/space-adept`, `traits/stubborn`, `traits/tough`, `traits/unremarkable`, `traits/unshakable`, `traits/well-connected`

## `upgrade` — 17 blocks

`sci-fi-equipment/auto-injector`, `sci-fi-equipment/bipod`, `sci-fi-equipment/chameleon-unit`, `sci-fi-equipment/coms-unit`, `sci-fi-equipment/drum-magazines`, `sci-fi-equipment/emergency-shank`, `sci-fi-equipment/extended-barrel`, `sci-fi-equipment/forward-assault-shield`, `sci-fi-equipment/hazard-hud`, `sci-fi-equipment/mebn-hud`, `sci-fi-equipment/overcharge-chamber`, `sci-fi-equipment/recoil-compensation-system`, `sci-fi-equipment/reflex-sight`, `sci-fi-equipment/safer-unit`, `sci-fi-equipment/shock-charger`, `sci-fi-equipment/targeting-hud`, `sci-fi-equipment/weighted-core`

## `vehicles` — 11 blocks

`vehicles/boarding-and-bailing`, `vehicles/collision-damage`, `vehicles/cover-from-vehicles`, `vehicles/drive`, `vehicles/ignition`, `vehicles/impact-and-overrun`, `vehicles/initiative-and-occupants`, `vehicles/mounts`, `vehicles/overview`, `vehicles/vehicle-actions`, `vehicles/vehicle-size`

## `weapon` — 15 blocks

`sci-fi-equipment/auto-pistol`, `sci-fi-equipment/compact-rifle`, `sci-fi-equipment/emergency-hatchet`, `sci-fi-equipment/heavy-pistol`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/knuckle-taser`, `sci-fi-equipment/laser-pistol`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/light-pistol`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/ripper-blade`, `sci-fi-equipment/shock-baton`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/standard-issue-knife`, `sci-fi-equipment/standard-issue-rifle`

## `wip` — 19 blocks

`bots/bal`, `bots/hel-1`, `bots/t00l`, `bots/trk-a`, `races/android`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`, `vehicles/boarding-and-bailing`, `vehicles/collision-damage`, `vehicles/cover-from-vehicles`, `vehicles/drive`, `vehicles/ignition`, `vehicles/impact-and-overrun`, `vehicles/initiative-and-occupants`, `vehicles/mounts`, `vehicles/overview`, `vehicles/vehicle-actions`, `vehicles/vehicle-size`

## `wound-type` — 7 blocks

`wounds/burn`, `wounds/contusion`, `wounds/dislocation`, `wounds/fracture`, `wounds/laceration`, `wounds/puncture`, `wounds/sprain`

## `wounds` — 7 blocks

`wounds/burn`, `wounds/contusion`, `wounds/dislocation`, `wounds/fracture`, `wounds/laceration`, `wounds/puncture`, `wounds/sprain`


<!-- lets add a rnaged weapon tag and a melee weapon tag -->
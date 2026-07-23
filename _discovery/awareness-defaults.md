# Awareness — defaults applied (no action performed)

Everything in this file was **defaulted, not decided**. It is applied by
nothing; listed so nothing questionable slid by silently. Machine-readable
form: `edges.json` (defaults carry `queued: false`).

## Summary

- **523 edges defaulted to `reference`** (safe default, §4.3) — full list below.
- **15 edges confidently tagged `mention`** — each provably out of the buildable
  corpus (external sites, web-app tools, site utility pages) — full list below.
- **71 `include` composition edges** recorded with type `include` — these are
  structural (a page pulling a snippet), resolved by construction, not
  cross-references. Listed in `edges.json` only.
- **`quickref` usages found: 0.** The shortcode is defined
  (`layouts/_shortcodes/quickref.html`) but never used in content. Retirement
  by disuse is already a fact; the shortcode file stays (per spec §3), and
  there are no usages to flag as extraction candidates.
- **`details` usages found: 315** — all recorded; each is a block boundary in
  the inventory. None modified, no conversion pressure applied.

## Mentions (confident out-of-corpus)

| Where | Target | Link text |
|---|---|---|
| content/_index.md:12 | `/docs/free-srd` | Free SRD |
| content/_index.md:14 | `https://www.reddit.com/r/theseluckystars/` | r/theseluckystars |
| content/_index.md:29 | `https://www.reddit.com/r/theseluckystars/` | r/theseluckystars |
| content/_index.md:35 | `/digitalcharactersheet.html` | Digital Character Sheet |
| content/_index.md:38 | `/attributeconverter.html` | Attribute Converter |
| content/_index.md:41 | `/planetnamegenerator.html` | Planet Name Generator |
| content/docs/_index.md:10 | `free-srd/` | Free SRD |
| content/docs/_index.md:11 | `downloads/` | Downloads |
| content/docs/_index.md:12 | `roadmap/` | Roadmap |
| content/docs/contributors.md:10 | `https://swordinboard.com` | Sword in Board Workshop |
| content/docs/legal.md:13 | `https://creativecommons.org/licenses/by-nc-sa/4.0/` | View Full License Text |
| content/docs/free-srd/_index.md:34 | `/docs/legal` | here |
| content/docs/free-srd/_index.md:37 | `/docs/roadmap` | roadmap |
| content/docs/free-srd/character-creation/character-creation-overview.md:21 | `/docs/downloads` | Downloads |
| content/docs/free-srd/character-creation/character-creation-overview.md:22 | `/digitalcharactersheet` | here |

## Content observations (recorded only — nothing changed)

Found while reading; none of these is a discovery-pass decision, but future
phases (or ordinary editing) will want the list:

- `abilities/student` and `abilities/expert` require **INT** — the attribute
  system has KNO, not INT.
- Shock Charger: summary table says **+2 damage**, rules text says **+1**.
- Squad Shield: summary table says **30pts** protection, rules text says **40 point**.
- Fast Kit Trap: "retrieving the kit after is lowered to **12 AP**" (Kit Trap
  says 20 AP; likely fine, listed for review).
- The Wounds & Conditions summary tables link to the broken Δ anchors on their
  own page (see Queue 3 systemic finding 1).
- `content/docs/free-srd/core-rules/vehicle-rules.md:44` has broken link
  markdown: `**Direct From Action Economy](...)** ` (missing opening bracket);
  line 70 links `#imapct--overrun` (typo). The page carries many typos —
  consistent with its WIP banner.
- `sci-fi-misc-equipment.md` mini-TOC links `#communications` but the heading
  is "Communication Devices" (`#communication-devices`).
- Several generic-equipment summary-table anchors don't match their item
  headings (Reinforced/Sturdy Boots, Compass, Shovel, Antitoxin) — itemized in
  Queue 3.
- `archetypes/default.md` is TOML (`+++`) while all content uses YAML
  frontmatter — see structure report.

## All edges defaulted to `reference` (grouped by source)

- `abilities/overview` → `abilities/adaptive-luck`, `abilities/agile-charge`, `abilities/agile-dodge`, `abilities/bash`, `abilities/battery-saboteur`, `abilities/battery-saver`, `abilities/bolster`, `abilities/bonus-luck`, `abilities/charge`, `abilities/companion-bot`, `abilities/controlled-suppressing-fire`, `abilities/coordinated-strike`, `abilities/danger-reflex`, `abilities/dead-drop`, `abilities/defender`, `abilities/dual-attack`, `abilities/dual-defense`, `abilities/dual-strike`, `abilities/extended-rage`, `abilities/extra-attack`, `abilities/fast-kit-trap`, `abilities/fearless-rage`, `abilities/field-medic`, `abilities/field-patch`, `abilities/focus-attack`, `abilities/focus-in`, `abilities/friend-in-need`, `abilities/friend-of-fortune`, `abilities/general-spectacle`, `abilities/ghost-protocol`, `abilities/improved-bash`, `abilities/improved-suppressing-fire`, `abilities/indomitable-rage`, `abilities/just-grazed`, `abilities/just-winded`, `abilities/kit-trap`, `abilities/leaping-charge`, `abilities/leg-shot`, `abilities/line-of-fire`, `abilities/long-performance`, `abilities/lucky-strike`, `abilities/martial-supremacy`, `abilities/medical-marvel`, `abilities/momentum-dodge`, `abilities/opensaysame`, `abilities/oppressive-suppression`, `abilities/outburst`, `abilities/overcharge`, `abilities/patient-shot`, `abilities/power-main-tap`, `abilities/powerful-rage`, `abilities/precise-focus`, `abilities/quick-draw`, `abilities/quick-firing`, `abilities/rage`, `abilities/rally`, `abilities/reckless-attack`, `abilities/rigged-comp-jack`, `abilities/salvage`, `abilities/signal-intelligence`, `abilities/slip-strike`, `abilities/special-encouragement`, `abilities/suppressing-fire`, `abilities/swift-custom-battery`, `abilities/tech-armor`, `abilities/the-look`, `abilities/tis-but-a-scratch`, `abilities/true-defender`, `abilities/unsettling-rage`, `abilities/vital-focus`, `abilities/vital-strike`
- `abilities/patient-shot` → `item-tags/firing-modes`
- `abilities/tech-armor` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/`
- `abilities/vital-focus` → `abilities/focus-attack`
- `abilities/vital-strike` → `proficiencies/martial-training`
- `actions/difficult-terrain` → `page:/docs/free-srd/core-rules/environmental-effects/`
- `actions/readied-actions` → `actions/multi-turn-actions`
- `actions/standard-actions` → `page:/docs/free-srd/core-rules/action-economy/#movement`, `page:/docs/free-srd/core-rules/combat/`
- `attributes/overview` → `core-rules/size`
- `bots/automated-machines` → `objects/durability`, `races/android`
- `chargen/overview` → `chargen/overview`, `page:/docs/free-srd/character-creation/abilities/`, `page:/docs/free-srd/character-creation/proficiencies/`, `page:/docs/free-srd/character-creation/traits/`, `page:/docs/free-srd/core-rules/action-economy/`, `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/basics/`, `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/stats/`, `races/overview`
- `combat/action-catalog` → `actions/readied-actions`, `actions/standard-actions`, `combat/cover`, `item-tags/two-handed`, `item-tags/versatile`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `proficiencies/martial-training`
- `combat/advantage-in-combat` → `combat/cover`
- `combat/combat-basics` → `page:/docs/free-srd/core-rules/action-economy/#action-points`, `page:/docs/free-srd/core-rules/health/#defense`, `page:/docs/free-srd/core-rules/health/#vitality`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `combat/damage-dice` → `combat/damage-sources`
- `combat/grapple` → `core-rules/size`
- `combat/initiative` → `combat/surprise-attacks`
- `combat/opportunity-attack` → `page:/docs/free-srd/core-rules/action-economy/#speed-tiers`
- `combat/stealth` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/#movement-actions`
- `components/heavy-wrist-laser` → `proficiencies/weapon`
- `components/improved-cooling-system` → `combat/damage-resistance`
- `components/installation` → `abilities/tech-armor`
- `components/internal-comp-jack` → `proficiencies/comp-jack`
- `components/shield-mount` → `page:/docs/free-srd/core-rules/damaged--broken-gear/#breaking-defensive-items`
- `components/signal-masts` → `abilities/companion-bot`
- `components/wrist-laser` → `proficiencies/weapon`
- `conditions/overview` → `conditions/asphyxiating`, `conditions/bleeding`, `conditions/confused`, `conditions/frightened`, `conditions/pinned`, `conditions/shaken`, `conditions/stressed`
- `core-rules/size` → `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/combat/#damage-dice`, `page:/docs/free-srd/core-rules/stats/#grapple`, `page:/docs/free-srd/core-rules/stats/#stealth`
- `environment/extreme-environments` → `item-tags/pressurized`, `item-tags/space-suit`, `page:/docs/free-srd/core-rules/environmental-effects/`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/hazard-hud`
- `environment/toxic-atmosphere` → `conditions/shaken`
- `environment/visibility` → `page:/docs/free-srd/core-rules/combat/`
- `equipment/armor-basics` → `page:/docs/free-srd/core-rules/damaged--broken-gear/#breaking-defensive-items`
- `equipment/common-terms` → `combat/action-catalog`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/damaged--broken-gear/#breaking-defensive-items`, `page:/docs/free-srd/inventory--equipment/item-tags/`
- `health/overview` → `page:/docs/free-srd/core-rules/wounds--conditions/`
- `item-tags/ballistic` → `generic-equipment/pouch-sets`, `item-tags/firing-modes`
- `item-tags/battery` → `generic-equipment/pouch-sets`
- `item-tags/fuel-cells` → `generic-equipment/pouch-sets`, `sci-fi-equipment/fuel-cells`
- `item-tags/power-source` → `item-tags/battery`
- `item-tags/space-suit` → `item-tags/bulky`
- `movement/speed-descriptors` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/#speed-tiers`, `vehicles/vehicle-size`
- `objects/durability` → `item-tags/durable`, `item-tags/fragile`
- `objects/targeting-objects` → `basics/target-numbers`, `combat/action-catalog`
- `page:/` → `components/shield-mount`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/vehicle-rules/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/#shields`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#communication-devices`, `races/overview`, `sci-fi/computer-systems`
- `page:/docs/free-srd/` → `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/basics/`, `page:/docs/free-srd/core-rules/health/`
- `page:/docs/free-srd/character-creation/` → `chargen/overview`, `page:/docs/free-srd/character-creation/abilities/`, `page:/docs/free-srd/character-creation/proficiencies/`, `page:/docs/free-srd/character-creation/traits/`, `races/overview`
- `page:/docs/free-srd/core-rules/` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/`, `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/basics/`, `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/environmental-effects/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/sci-fi-additions/`, `page:/docs/free-srd/core-rules/stats/`, `page:/docs/free-srd/core-rules/vehicle-rules/`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `page:/docs/free-srd/core-rules/action-economy/` → `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/stats/#action-points`, `page:/docs/free-srd/core-rules/stats/#speed`
- `page:/docs/free-srd/core-rules/combat/` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/environmental-effects/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/health/#defense`, `page:/docs/free-srd/core-rules/health/#vitality`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `page:/docs/free-srd/core-rules/damaged--broken-gear/` → `combat/action-catalog`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/wounds--conditions/`, `page:/docs/free-srd/inventory--equipment/equipment/`, `page:/docs/free-srd/inventory--equipment/item-tags/`, `sci-fi-equipment/ballistic-shield`
- `page:/docs/free-srd/core-rules/health/` → `combat/damage-overview`, `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/stats/#health--defense-stats`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `page:/docs/free-srd/core-rules/stats/` → `actions/action-types`, `core-rules/size`, `page:/docs/free-srd/core-rules/combat/`
- `page:/docs/free-srd/core-rules/vehicle-rules/` → `page:/docs/free-srd/core-rules/action-economy/#speed`, `page:/docs/free-srd/core-rules/stats/#speed`
- `page:/docs/free-srd/core-rules/wounds--conditions/` → `wounds/burn`, `wounds/contusion`, `wounds/dislocation`, `wounds/fracture`, `wounds/laceration`, `wounds/puncture`, `wounds/sprain`
- `page:/docs/free-srd/inventory--equipment/` → `page:/docs/free-srd/inventory--equipment/equipment/`, `page:/docs/free-srd/inventory--equipment/generic-equipment/`, `page:/docs/free-srd/inventory--equipment/inventory/`, `page:/docs/free-srd/inventory--equipment/item-tags/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/`
- `page:/docs/free-srd/inventory--equipment/equipment/` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-kits/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#medical-supplies`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#survival-equipment`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#tech--gadgets`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/`
- `page:/docs/free-srd/inventory--equipment/generic-equipment/` → `generic-equipment/animal-feed`, `generic-equipment/antiseptic-poultice`, `generic-equipment/backpack`, `generic-equipment/bag-of-salt`, `generic-equipment/bandages`, `generic-equipment/barrel`, `generic-equipment/bedroll`, `generic-equipment/blank-book-journal`, `generic-equipment/block-of-soap`, `generic-equipment/candle`, `generic-equipment/candle-wax-block`, `generic-equipment/chain-10ft`, `generic-equipment/chalk-sticks`, `generic-equipment/coil-of-wire`, `generic-equipment/common-alcohol-flask`, `generic-equipment/crate`, `generic-equipment/dry-sack`, `generic-equipment/face-wrap`, `generic-equipment/field-ration`, `generic-equipment/fire-starter`, `generic-equipment/fuel-oil-flask`, `generic-equipment/grappling-hook`, `generic-equipment/heavy-cloak`, `generic-equipment/ink-writing-instrument`, `generic-equipment/iron-spikes`, `generic-equipment/lockable-chest`, `generic-equipment/long-crowbar`, `generic-equipment/manacles`, `generic-equipment/oil-lantern`, `generic-equipment/parchment-sheets`, `generic-equipment/pitons`, `generic-equipment/pouch-sets`, `generic-equipment/quiver`, `generic-equipment/rain-poncho`, `generic-equipment/restorative-tonic`, `generic-equipment/rope-50ft`, `generic-equipment/saddlebags`, `generic-equipment/satchel`, `generic-equipment/sewing-set`, `generic-equipment/signal-mirror`, `generic-equipment/signal-whistle`, `generic-equipment/small-bell`, `generic-equipment/splint-materials`, `generic-equipment/tent-2-person`, `generic-equipment/tent-4-person`, `generic-equipment/torch`, `generic-equipment/twine`, `generic-equipment/waterskin`, `generic-equipment/whetstone`, `generic-equipment/wide-brim-hat`, `generic-equipment/wooden-stakes`, `generic-equipment/work-gloves`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#clothing--wearables`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#containers--storage`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#light-sources`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#medical-supplies`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#survival-equipment`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#tools--utility-gear`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#trade-goods--miscellaneous`
- `page:/docs/free-srd/inventory--equipment/item-tags/` → `item-tags/adaptive-mesh`, `item-tags/arcing`, `item-tags/belt-fed`, `item-tags/bulky`, `item-tags/concealable`, `item-tags/durable`, `item-tags/firing-modes`, `item-tags/fragile`, `item-tags/fuel-cells`, `item-tags/injector`, `item-tags/long-reload`, `item-tags/power-source`, `item-tags/pressurized`, `item-tags/rounds-reload`, `item-tags/space-suit`, `item-tags/two-handed`, `item-tags/versatile`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-kits/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/` → `bots/bal`, `bots/hel-1`, `bots/t00l`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/` → `components/audio-processor`, `components/augmented-arm-actuators`, `components/automatic-crash-foam-system`, `components/backup-power-cell`, `components/heavy-wrist-laser`, `components/improved-cooling-system`, `components/internal-comp-jack`, `components/manipulator-override`, `components/optical-suite`, `components/reinforced-chassis-plating`, `components/relay-node`, `components/repair-subroutine`, `components/servo-boost-legs`, `components/shield-mount`, `components/signal-masts`, `components/stabilizer-gyros`, `components/subdermal-plating`, `components/targeting-array`, `components/wrist-laser`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/` → `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `sci-fi-equipment/auto-injector`, `sci-fi-equipment/ballistic-shield`, `sci-fi-equipment/basic-p-suit`, `sci-fi-equipment/chameleon-unit`, `sci-fi-equipment/classic-evosuit`, `sci-fi-equipment/collapsible-shield`, `sci-fi-equipment/combat-evosuit`, `sci-fi-equipment/combat-vest`, `sci-fi-equipment/coms-unit`, `sci-fi-equipment/emergency-shank`, `sci-fi-equipment/enforcer-armor`, `sci-fi-equipment/eva-suit`, `sci-fi-equipment/hazard-hud`, `sci-fi-equipment/light-combat-vest`, `sci-fi-equipment/mebn-hud`, `sci-fi-equipment/padded-flight-suit`, `sci-fi-equipment/safer-unit`, `sci-fi-equipment/scav-gear`, `sci-fi-equipment/security-flight-suit`, `sci-fi-equipment/site-safety-gear`, `sci-fi-equipment/targeting-hud`, `sci-fi-equipment/ultraweave-evosuit`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#medical-supplies`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#survival-equipment`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#tech--gadgets`, `sci-fi-equipment/ara-5`, `sci-fi-equipment/battery-cores`, `sci-fi-equipment/bio-scanner`, `sci-fi-equipment/bioskin-veil`, `sci-fi-equipment/boost-pack`, `sci-fi-equipment/comp-jack`, `sci-fi-equipment/coms-headset`, `sci-fi-equipment/coms-unit`, `sci-fi-equipment/crash-foam-canister`, `sci-fi-equipment/data-spike`, `sci-fi-equipment/decoy-beacon`, `sci-fi-equipment/emergency-beacon`, `sci-fi-equipment/emergency-oxygen-mask`, `sci-fi-equipment/emergency-trauma-patch`, `sci-fi-equipment/field-ration`, `sci-fi-equipment/fuel-cells`, `sci-fi-equipment/grapple-line-launcher`, `sci-fi-equipment/gravity-anchor`, `sci-fi-equipment/jump-boosters`, `sci-fi-equipment/jump-pack`, `sci-fi-equipment/long-range-coms`, `sci-fi-equipment/mag-boots`, `sci-fi-equipment/mag-cuffs`, `sci-fi-equipment/mini-laser-cutter`, `sci-fi-equipment/mobile-phone`, `sci-fi-equipment/pain-suppressant-injector`, `sci-fi-equipment/personal-shield`, `sci-fi-equipment/portable-heater`, `sci-fi-equipment/portable-water-purifier`, `sci-fi-equipment/reactor-cores`, `sci-fi-equipment/remote-detonator`, `sci-fi-equipment/signature-spoofer`, `sci-fi-equipment/solar-array-pack`, `sci-fi-equipment/squad-shield`, `sci-fi-equipment/survival-tent`, `sci-fi-equipment/vitaboost-injector`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/` → `sci-fi-equipment/auto-pistol`, `sci-fi-equipment/bipod`, `sci-fi-equipment/compact-rifle`, `sci-fi-equipment/drum-magazines`, `sci-fi-equipment/emergency-hatchet`, `sci-fi-equipment/extended-barrel`, `sci-fi-equipment/forward-assault-shield`, `sci-fi-equipment/heavy-pistol`, `sci-fi-equipment/heavy-rotary-cannon`, `sci-fi-equipment/knuckle-taser`, `sci-fi-equipment/laser-pistol`, `sci-fi-equipment/laser-rifle`, `sci-fi-equipment/light-pistol`, `sci-fi-equipment/long-rifle`, `sci-fi-equipment/overcharge-chamber`, `sci-fi-equipment/recoil-compensation-system`, `sci-fi-equipment/reflex-sight`, `sci-fi-equipment/ripper-blade`, `sci-fi-equipment/shock-baton`, `sci-fi-equipment/shock-charger`, `sci-fi-equipment/shock-rifle`, `sci-fi-equipment/standard-issue-knife`, `sci-fi-equipment/standard-issue-rifle`, `sci-fi-equipment/weighted-core`
- `proficiencies/improved-ability` → `abilities/suppressing-fire`
- `proficiencies/overview` → `proficiencies/b-e-kit`, `proficiencies/comp-jack`, `proficiencies/disguise-kit`, `proficiencies/general-robotics`, `proficiencies/general-technology`, `proficiencies/martial-training`, `proficiencies/medic-training`, `proficiencies/medical-instincts`, `proficiencies/negotiation-training`, `proficiencies/repair-kit`, `proficiencies/survival-training`
- `proficiencies/weapon` → `proficiencies/martial-training`
- `races/android` → `components/backup-power-cell`, `objects/durability`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/`, `sci-fi-equipment/crash-foam-canister`
- `races/overview` → `races/android`, `races/classic-human`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`
- `sci-fi-equipment/basic-p-suit` → `sci-fi-equipment/coms-unit`
- `sci-fi-equipment/boost-pack` → `abilities/charge`
- `sci-fi-equipment/classic-evosuit` → `sci-fi-equipment/coms-unit`
- `sci-fi-equipment/combat-evosuit` → `sci-fi-equipment/emergency-shank`, `sci-fi-equipment/targeting-hud`
- `sci-fi-equipment/coms-headset` → `sci-fi-equipment/coms-unit`
- `sci-fi-equipment/eva-suit` → `sci-fi-equipment/coms-unit`, `sci-fi-equipment/safer-unit`
- `sci-fi-equipment/fuel-cells` → `objects/conditions`
- `sci-fi-equipment/kit-supplies` → `sci-fi-equipment/b-e-kit`, `sci-fi-equipment/disguise-kit`, `sci-fi-equipment/medical-kit`, `sci-fi-equipment/repair-kit`, `sci-fi-equipment/tech-kit`
- `sci-fi-equipment/knuckle-taser` → `sci-fi-equipment/shock-charger`
- `sci-fi-equipment/padded-flight-suit` → `combat/damage-resistance`
- `sci-fi-equipment/reactor-cores` → `abilities/battery-saboteur`
- `sci-fi-equipment/ripper-blade` → `combat/action-catalog`
- `sci-fi-equipment/security-flight-suit` → `sci-fi-equipment/coms-unit`
- `sci-fi-equipment/shock-baton` → `sci-fi-equipment/shock-charger`
- `sci-fi-equipment/signature-spoofer` → `sci-fi-equipment/data-spike`
- `sci-fi-equipment/ultraweave-evosuit` → `combat/damage-resistance`, `sci-fi-equipment/coms-unit`
- `sci-fi/communications` → `sci-fi/computer-systems`
- `sci-fi/computer-systems` → `sci-fi-equipment/comp-jack`
- `stats/vitality` → `conditions/overview`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `stats/wounds-and-conditions-summary` → `conditions/overview`, `page:/docs/free-srd/core-rules/wounds--conditions/`, `wounds/wounds`
- `traits/racial-traits` → `traits/alert`, `traits/composed`, `traits/diplomatic`, `traits/hot-headed`, `traits/inter-planet-traveler`, `traits/intimidating`, `traits/lucky`, `traits/mentally-sound`, `traits/particularly-attractive`, `traits/picture-of-health`, `traits/scrap-hauler`, `traits/sly`, `traits/sneaky`, `traits/space-adept`, `traits/stubborn`, `traits/tough`, `traits/unremarkable`, `traits/unshakable`, `traits/well-connected`
- `vehicles/boarding-and-bailing` → `page:/docs/free-srd/core-rules/action-economy/#movement-actions`
- `vehicles/collision-damage` → `combat/damage-types`, `page:/docs/free-srd/core-rules/vehicle-rules/#speed-tiers`
- `vehicles/cover-from-vehicles` → `combat/cover`
- `vehicles/drive` → `vehicles/mounts`
- `vehicles/impact-and-overrun` → `actions/readied-actions`, `basics/advantage`, `combat/surprise-attacks`
- `vehicles/initiative-and-occupants` → `actions/readied-actions`, `page:/docs/free-srd/core-rules/stats/#initiative`
- `vehicles/mounts` → `page:/docs/free-srd/core-rules/stats/#action-points`
- `vehicles/overview` → `page:/docs/free-srd/core-rules/combat/`
- `vehicles/vehicle-actions` → `page:/docs/free-srd/core-rules/action-economy/#movement-actions`, `vehicles/impact-and-overrun`

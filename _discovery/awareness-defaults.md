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

- `character/abilities/student` and `character/abilities/expert` require **INT** — the attribute
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

- `character/abilities/overview` → `character/abilities/adaptive-luck`, `character/abilities/agile-charge`, `character/abilities/agile-dodge`, `character/abilities/bash`, `character/abilities/battery-saboteur`, `character/abilities/battery-saver`, `character/abilities/bolster`, `character/abilities/bonus-luck`, `character/abilities/charge`, `character/abilities/companion-bot`, `character/abilities/controlled-suppressing-fire`, `character/abilities/coordinated-strike`, `character/abilities/danger-reflex`, `character/abilities/dead-drop`, `character/abilities/defender`, `character/abilities/dual-attack`, `character/abilities/dual-defense`, `character/abilities/dual-strike`, `character/abilities/extended-rage`, `character/abilities/extra-attack`, `character/abilities/fast-kit-trap`, `character/abilities/fearless-rage`, `character/abilities/field-medic`, `character/abilities/field-patch`, `character/abilities/focus-attack`, `character/abilities/focus-in`, `character/abilities/friend-in-need`, `character/abilities/friend-of-fortune`, `character/abilities/general-spectacle`, `character/abilities/ghost-protocol`, `character/abilities/improved-bash`, `character/abilities/improved-suppressing-fire`, `character/abilities/indomitable-rage`, `character/abilities/just-grazed`, `character/abilities/just-winded`, `character/abilities/kit-trap`, `character/abilities/leaping-charge`, `character/abilities/leg-shot`, `character/abilities/line-of-fire`, `character/abilities/long-performance`, `character/abilities/lucky-strike`, `character/abilities/martial-supremacy`, `character/abilities/medical-marvel`, `character/abilities/momentum-dodge`, `character/abilities/opensaysame`, `character/abilities/oppressive-suppression`, `character/abilities/outburst`, `character/abilities/overcharge`, `character/abilities/patient-shot`, `character/abilities/power-main-tap`, `character/abilities/powerful-rage`, `character/abilities/precise-focus`, `character/abilities/quick-draw`, `character/abilities/quick-firing`, `character/abilities/rage`, `character/abilities/rally`, `character/abilities/reckless-attack`, `character/abilities/rigged-comp-jack`, `character/abilities/salvage`, `character/abilities/signal-intelligence`, `character/abilities/slip-strike`, `character/abilities/special-encouragement`, `character/abilities/suppressing-fire`, `character/abilities/swift-custom-battery`, `character/abilities/tech-armor`, `character/abilities/the-look`, `character/abilities/tis-but-a-scratch`, `character/abilities/true-defender`, `character/abilities/unsettling-rage`, `character/abilities/vital-focus`, `character/abilities/vital-strike`
- `character/abilities/patient-shot` → `gear/item-tags/firing-modes`
- `character/abilities/tech-armor` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/`
- `character/abilities/vital-focus` → `character/abilities/focus-attack`
- `character/abilities/vital-strike` → `character/proficiencies/martial-training`
- `rules/actions/difficult-terrain` → `page:/docs/free-srd/core-rules/environmental-effects/`
- `rules/actions/readied-actions` → `rules/actions/multi-turn-actions`
- `rules/actions/standard-actions` → `page:/docs/free-srd/core-rules/action-economy/#movement`, `page:/docs/free-srd/core-rules/combat/`
- `rules/attributes/overview` → `core-rules/size`
- `rules/bots/automated-machines` → `rules/objects/durability`, `races/android`
- `chargen/overview` → `chargen/overview`, `page:/docs/free-srd/character-creation/abilities/`, `page:/docs/free-srd/character-creation/proficiencies/`, `page:/docs/free-srd/character-creation/traits/`, `page:/docs/free-srd/core-rules/action-economy/`, `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/basics/`, `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/stats/`, `races/overview`
- `combat/action-catalog` → `rules/actions/readied-actions`, `rules/actions/standard-actions`, `rules/combat/cover`, `gear/item-tags/two-handed`, `gear/item-tags/versatile`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `character/proficiencies/martial-training`
- `combat/advantage-in-combat` → `rules/combat/cover`
- `rules/combat/combat-basics` → `page:/docs/free-srd/core-rules/action-economy/#action-points`, `page:/docs/free-srd/core-rules/health/#defense`, `page:/docs/free-srd/core-rules/health/#vitality`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `rules/combat/damage-dice` → `rules/combat/damage-sources`
- `rules/combat/grapple` → `core-rules/size`
- `rules/combat/initiative` → `rules/combat/surprise-attacks`
- `rules/combat/opportunity-attack` → `page:/docs/free-srd/core-rules/action-economy/#speed-tiers`
- `rules/combat/stealth` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/#movement-actions`
- `gear/components/heavy-wrist-laser` → `character/proficiencies/weapon`
- `gear/components/improved-cooling-system` → `rules/combat/damage-resistance`
- `gear/components/installation` → `character/abilities/tech-armor`
- `gear/components/internal-comp-jack` → `character/proficiencies/comp-jack`
- `gear/components/shield-mount` → `page:/docs/free-srd/core-rules/damaged--broken-gear/#breaking-defensive-items`
- `components/signal-masts` → `character/abilities/companion-bot`
- `gear/components/wrist-laser` → `character/proficiencies/weapon`
- `rules/conditions/overview` → `rules/conditions/asphyxiating`, `rules/conditions/bleeding`, `rules/conditions/confused`, `rules/conditions/frightened`, `rules/conditions/pinned`, `rules/conditions/shaken`, `rules/conditions/stressed`
- `core-rules/size` → `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/combat/#damage-dice`, `page:/docs/free-srd/core-rules/stats/#grapple`, `page:/docs/free-srd/core-rules/stats/#stealth`
- `rules/environment/extreme-environments` → `gear/item-tags/pressurized`, `gear/item-tags/space-suit`, `page:/docs/free-srd/core-rules/environmental-effects/`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/hazard-hud`
- `environment/toxic-atmosphere` → `rules/conditions/shaken`
- `environment/visibility` → `page:/docs/free-srd/core-rules/combat/`
- `gear/equipment/armor-basics` → `page:/docs/free-srd/core-rules/damaged--broken-gear/#breaking-defensive-items`
- `gear/equipment/common-terms` → `combat/action-catalog`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/damaged--broken-gear/#breaking-defensive-items`, `page:/docs/free-srd/inventory--equipment/item-tags/`
- `rules/health/overview` → `page:/docs/free-srd/core-rules/wounds--conditions/`
- `gear/item-tags/ballistic` → `generic-equipment/pouch-sets`, `gear/item-tags/firing-modes`
- `gear/item-tags/battery` → `generic-equipment/pouch-sets`
- `gear/item-tags/fuel-cells` → `generic-equipment/pouch-sets`, `gear/sci-fi-equipment/fuel-cells`
- `gear/item-tags/power-source` → `gear/item-tags/battery`
- `gear/item-tags/space-suit` → `gear/item-tags/bulky`
- `rules/movement/speed-descriptors` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/#speed-tiers`, `rules/vehicles/vehicle-size`
- `rules/objects/durability` → `gear/item-tags/durable`, `gear/item-tags/fragile`
- `rules/objects/targeting-objects` → `rules/basics/target-numbers`, `combat/action-catalog`
- `page:/` → `gear/components/shield-mount`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/vehicle-rules/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/#shields`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#communication-devices`, `races/overview`, `rules/sci-fi/computer-systems`
- `page:/docs/free-srd/` → `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/basics/`, `page:/docs/free-srd/core-rules/health/`
- `page:/docs/free-srd/character-creation/` → `chargen/overview`, `page:/docs/free-srd/character-creation/abilities/`, `page:/docs/free-srd/character-creation/proficiencies/`, `page:/docs/free-srd/character-creation/traits/`, `races/overview`
- `page:/docs/free-srd/core-rules/` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/`, `page:/docs/free-srd/core-rules/attributes/`, `page:/docs/free-srd/core-rules/basics/`, `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/environmental-effects/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/sci-fi-additions/`, `page:/docs/free-srd/core-rules/stats/`, `page:/docs/free-srd/core-rules/vehicle-rules/`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `page:/docs/free-srd/core-rules/action-economy/` → `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/stats/#action-points`, `page:/docs/free-srd/core-rules/stats/#speed`
- `page:/docs/free-srd/core-rules/combat/` → `core-rules/size`, `page:/docs/free-srd/core-rules/action-economy/`, `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `page:/docs/free-srd/core-rules/environmental-effects/`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/health/#defense`, `page:/docs/free-srd/core-rules/health/#vitality`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `page:/docs/free-srd/core-rules/damaged--broken-gear/` → `combat/action-catalog`, `page:/docs/free-srd/core-rules/health/`, `page:/docs/free-srd/core-rules/wounds--conditions/`, `page:/docs/free-srd/inventory--equipment/equipment/`, `page:/docs/free-srd/inventory--equipment/item-tags/`, `gear/sci-fi-equipment/ballistic-shield`
- `page:/docs/free-srd/core-rules/health/` → `combat/damage-overview`, `page:/docs/free-srd/core-rules/combat/`, `page:/docs/free-srd/core-rules/stats/#health--defense-stats`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `page:/docs/free-srd/core-rules/stats/` → `rules/actions/action-types`, `core-rules/size`, `page:/docs/free-srd/core-rules/combat/`
- `page:/docs/free-srd/core-rules/vehicle-rules/` → `page:/docs/free-srd/core-rules/action-economy/#speed`, `page:/docs/free-srd/core-rules/stats/#speed`
- `page:/docs/free-srd/core-rules/wounds--conditions/` → `rules/wounds/burn`, `rules/wounds/contusion`, `rules/wounds/dislocation`, `rules/wounds/fracture`, `rules/wounds/laceration`, `rules/wounds/puncture`, `rules/wounds/sprain`
- `page:/docs/free-srd/inventory--equipment/` → `page:/docs/free-srd/inventory--equipment/equipment/`, `page:/docs/free-srd/inventory--equipment/generic-equipment/`, `page:/docs/free-srd/inventory--equipment/inventory/`, `page:/docs/free-srd/inventory--equipment/item-tags/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/`
- `page:/docs/free-srd/inventory--equipment/equipment/` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-kits/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#medical-supplies`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#survival-equipment`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#tech--gadgets`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/`
- `page:/docs/free-srd/inventory--equipment/generic-equipment/` → `gear/generic-equipment/animal-feed`, `gear/generic-equipment/antiseptic-poultice`, `gear/generic-equipment/backpack`, `gear/generic-equipment/bag-of-salt`, `generic-equipment/bandages`, `gear/generic-equipment/barrel`, `gear/generic-equipment/bedroll`, `gear/generic-equipment/blank-book-journal`, `gear/generic-equipment/block-of-soap`, `gear/generic-equipment/candle`, `gear/generic-equipment/candle-wax-block`, `gear/generic-equipment/chain-10ft`, `gear/generic-equipment/chalk-sticks`, `gear/generic-equipment/coil-of-wire`, `gear/generic-equipment/common-alcohol-flask`, `gear/generic-equipment/crate`, `gear/generic-equipment/dry-sack`, `gear/generic-equipment/face-wrap`, `gear/generic-equipment/field-ration`, `gear/generic-equipment/fire-starter`, `gear/generic-equipment/fuel-oil-flask`, `gear/generic-equipment/grappling-hook`, `gear/generic-equipment/heavy-cloak`, `gear/generic-equipment/ink-writing-instrument`, `gear/generic-equipment/iron-spikes`, `gear/generic-equipment/lockable-chest`, `gear/generic-equipment/long-crowbar`, `gear/generic-equipment/manacles`, `gear/generic-equipment/oil-lantern`, `gear/generic-equipment/parchment-sheets`, `gear/generic-equipment/pitons`, `generic-equipment/pouch-sets`, `gear/generic-equipment/quiver`, `gear/generic-equipment/rain-poncho`, `gear/generic-equipment/restorative-tonic`, `gear/generic-equipment/rope-50ft`, `gear/generic-equipment/saddlebags`, `gear/generic-equipment/satchel`, `gear/generic-equipment/sewing-set`, `gear/generic-equipment/signal-mirror`, `gear/generic-equipment/signal-whistle`, `gear/generic-equipment/small-bell`, `gear/generic-equipment/splint-materials`, `gear/generic-equipment/tent-2-person`, `gear/generic-equipment/tent-4-person`, `gear/generic-equipment/torch`, `gear/generic-equipment/twine`, `gear/generic-equipment/waterskin`, `gear/generic-equipment/whetstone`, `gear/generic-equipment/wide-brim-hat`, `gear/generic-equipment/wooden-stakes`, `gear/generic-equipment/work-gloves`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#clothing--wearables`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#containers--storage`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#light-sources`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#medical-supplies`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#survival-equipment`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#tools--utility-gear`, `page:/docs/free-srd/inventory--equipment/generic-equipment/#trade-goods--miscellaneous`
- `page:/docs/free-srd/inventory--equipment/item-tags/` → `gear/item-tags/adaptive-mesh`, `gear/item-tags/arcing`, `gear/item-tags/belt-fed`, `gear/item-tags/bulky`, `gear/item-tags/concealable`, `gear/item-tags/durable`, `gear/item-tags/firing-modes`, `gear/item-tags/fragile`, `gear/item-tags/fuel-cells`, `gear/item-tags/injector`, `gear/item-tags/long-reload`, `gear/item-tags/power-source`, `gear/item-tags/pressurized`, `gear/item-tags/rounds-reload`, `gear/item-tags/space-suit`, `gear/item-tags/two-handed`, `gear/item-tags/versatile`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-kits/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/` → `bots/bal`, `bots/hel-1`, `bots/t00l`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/` → `gear/components/audio-processor`, `gear/components/augmented-arm-actuators`, `gear/components/automatic-crash-foam-system`, `gear/components/backup-power-cell`, `gear/components/heavy-wrist-laser`, `gear/components/improved-cooling-system`, `gear/components/internal-comp-jack`, `gear/components/manipulator-override`, `gear/components/optical-suite`, `gear/components/reinforced-chassis-plating`, `gear/components/relay-node`, `gear/components/repair-subroutine`, `gear/components/servo-boost-legs`, `gear/components/shield-mount`, `components/signal-masts`, `gear/components/stabilizer-gyros`, `gear/components/subdermal-plating`, `gear/components/targeting-array`, `gear/components/wrist-laser`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/` → `page:/docs/free-srd/core-rules/damaged--broken-gear/`, `gear/sci-fi-equipment/auto-injector`, `gear/sci-fi-equipment/ballistic-shield`, `gear/sci-fi-equipment/basic-p-suit`, `gear/sci-fi-equipment/chameleon-unit`, `gear/sci-fi-equipment/classic-evosuit`, `gear/sci-fi-equipment/collapsible-shield`, `gear/sci-fi-equipment/combat-evosuit`, `gear/sci-fi-equipment/combat-vest`, `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/emergency-shank`, `gear/sci-fi-equipment/enforcer-armor`, `gear/sci-fi-equipment/eva-suit`, `gear/sci-fi-equipment/hazard-hud`, `gear/sci-fi-equipment/light-combat-vest`, `gear/sci-fi-equipment/mebn-hud`, `gear/sci-fi-equipment/padded-flight-suit`, `gear/sci-fi-equipment/safer-unit`, `gear/sci-fi-equipment/scav-gear`, `gear/sci-fi-equipment/security-flight-suit`, `gear/sci-fi-equipment/site-safety-gear`, `gear/sci-fi-equipment/targeting-hud`, `gear/sci-fi-equipment/ultraweave-evosuit`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/` → `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#medical-supplies`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#survival-equipment`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#tech--gadgets`, `gear/sci-fi-equipment/ara-5`, `gear/sci-fi-equipment/battery-cores`, `gear/sci-fi-equipment/bio-scanner`, `gear/sci-fi-equipment/bioskin-veil`, `gear/sci-fi-equipment/boost-pack`, `gear/sci-fi-equipment/comp-jack`, `gear/sci-fi-equipment/coms-headset`, `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/crash-foam-canister`, `gear/sci-fi-equipment/data-spike`, `gear/sci-fi-equipment/decoy-beacon`, `gear/sci-fi-equipment/emergency-beacon`, `gear/sci-fi-equipment/emergency-oxygen-mask`, `gear/sci-fi-equipment/emergency-trauma-patch`, `gear/sci-fi-equipment/field-ration`, `gear/sci-fi-equipment/fuel-cells`, `gear/sci-fi-equipment/grapple-line-launcher`, `gear/sci-fi-equipment/gravity-anchor`, `gear/sci-fi-equipment/jump-boosters`, `gear/sci-fi-equipment/jump-pack`, `gear/sci-fi-equipment/long-range-coms`, `gear/sci-fi-equipment/mag-boots`, `gear/sci-fi-equipment/mag-cuffs`, `gear/sci-fi-equipment/mini-laser-cutter`, `gear/sci-fi-equipment/mobile-phone`, `gear/sci-fi-equipment/pain-suppressant-injector`, `gear/sci-fi-equipment/personal-shield`, `gear/sci-fi-equipment/portable-heater`, `gear/sci-fi-equipment/portable-water-purifier`, `gear/sci-fi-equipment/reactor-cores`, `gear/sci-fi-equipment/remote-detonator`, `gear/sci-fi-equipment/signature-spoofer`, `gear/sci-fi-equipment/solar-array-pack`, `gear/sci-fi-equipment/squad-shield`, `gear/sci-fi-equipment/survival-tent`, `gear/sci-fi-equipment/vitaboost-injector`
- `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/` → `gear/sci-fi-equipment/auto-pistol`, `gear/sci-fi-equipment/bipod`, `gear/sci-fi-equipment/compact-rifle`, `gear/sci-fi-equipment/drum-magazines`, `gear/sci-fi-equipment/emergency-hatchet`, `gear/sci-fi-equipment/extended-barrel`, `gear/sci-fi-equipment/forward-assault-shield`, `gear/sci-fi-equipment/heavy-pistol`, `gear/sci-fi-equipment/heavy-rotary-cannon`, `gear/sci-fi-equipment/knuckle-taser`, `gear/sci-fi-equipment/laser-pistol`, `gear/sci-fi-equipment/laser-rifle`, `gear/sci-fi-equipment/light-pistol`, `gear/sci-fi-equipment/long-rifle`, `gear/sci-fi-equipment/overcharge-chamber`, `gear/sci-fi-equipment/recoil-compensation-system`, `gear/sci-fi-equipment/reflex-sight`, `gear/sci-fi-equipment/ripper-blade`, `gear/sci-fi-equipment/shock-baton`, `gear/sci-fi-equipment/shock-charger`, `gear/sci-fi-equipment/shock-rifle`, `gear/sci-fi-equipment/standard-issue-knife`, `gear/sci-fi-equipment/standard-issue-rifle`, `gear/sci-fi-equipment/weighted-core`
- `character/proficiencies/improved-ability` → `character/abilities/suppressing-fire`
- `character/proficiencies/overview` → `character/proficiencies/b-e-kit`, `character/proficiencies/comp-jack`, `character/proficiencies/disguise-kit`, `character/proficiencies/general-robotics`, `character/proficiencies/general-technology`, `character/proficiencies/martial-training`, `character/proficiencies/medic-training`, `character/proficiencies/medical-instincts`, `character/proficiencies/negotiation-training`, `character/proficiencies/repair-kit`, `character/proficiencies/survival-training`
- `character/proficiencies/weapon` → `character/proficiencies/martial-training`
- `races/android` → `gear/components/backup-power-cell`, `rules/objects/durability`, `page:/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/`, `gear/sci-fi-equipment/crash-foam-canister`
- `races/overview` → `races/android`, `races/classic-human`, `races/reptilian`, `races/star-touched-human`, `races/zeta-grey`
- `gear/sci-fi-equipment/basic-p-suit` → `gear/sci-fi-equipment/coms-unit`
- `gear/sci-fi-equipment/boost-pack` → `character/abilities/charge`
- `gear/sci-fi-equipment/classic-evosuit` → `gear/sci-fi-equipment/coms-unit`
- `gear/sci-fi-equipment/combat-evosuit` → `gear/sci-fi-equipment/emergency-shank`, `gear/sci-fi-equipment/targeting-hud`
- `gear/sci-fi-equipment/coms-headset` → `gear/sci-fi-equipment/coms-unit`
- `gear/sci-fi-equipment/eva-suit` → `gear/sci-fi-equipment/coms-unit`, `gear/sci-fi-equipment/safer-unit`
- `gear/sci-fi-equipment/fuel-cells` → `rules/objects/conditions`
- `gear/sci-fi-equipment/kit-supplies` → `gear/sci-fi-equipment/b-e-kit`, `gear/sci-fi-equipment/disguise-kit`, `gear/sci-fi-equipment/medical-kit`, `gear/sci-fi-equipment/repair-kit`, `gear/sci-fi-equipment/tech-kit`
- `gear/sci-fi-equipment/knuckle-taser` → `gear/sci-fi-equipment/shock-charger`
- `gear/sci-fi-equipment/padded-flight-suit` → `rules/combat/damage-resistance`
- `gear/sci-fi-equipment/reactor-cores` → `character/abilities/battery-saboteur`
- `gear/sci-fi-equipment/ripper-blade` → `combat/action-catalog`
- `gear/sci-fi-equipment/security-flight-suit` → `gear/sci-fi-equipment/coms-unit`
- `gear/sci-fi-equipment/shock-baton` → `gear/sci-fi-equipment/shock-charger`
- `gear/sci-fi-equipment/signature-spoofer` → `gear/sci-fi-equipment/data-spike`
- `gear/sci-fi-equipment/ultraweave-evosuit` → `rules/combat/damage-resistance`, `gear/sci-fi-equipment/coms-unit`
- `rules/sci-fi/communications` → `rules/sci-fi/computer-systems`
- `rules/sci-fi/computer-systems` → `gear/sci-fi-equipment/comp-jack`
- `rules/stats/vitality` → `rules/conditions/overview`, `page:/docs/free-srd/core-rules/wounds--conditions/`
- `stats/wounds-and-conditions-summary` → `rules/conditions/overview`, `page:/docs/free-srd/core-rules/wounds--conditions/`, `rules/wounds/wounds`
- `traits/racial-traits` → `character/traits/alert`, `character/traits/composed`, `character/traits/diplomatic`, `character/traits/hot-headed`, `character/traits/inter-planet-traveler`, `character/traits/intimidating`, `character/traits/lucky`, `character/traits/mentally-sound`, `character/traits/particularly-attractive`, `character/traits/picture-of-health`, `character/traits/scrap-hauler`, `character/traits/sly`, `character/traits/sneaky`, `character/traits/space-adept`, `character/traits/stubborn`, `character/traits/tough`, `character/traits/unremarkable`, `character/traits/unshakable`, `character/traits/well-connected`
- `rules/vehicles/boarding-and-bailing` → `page:/docs/free-srd/core-rules/action-economy/#movement-actions`
- `rules/vehicles/collision-damage` → `combat/damage-types`, `page:/docs/free-srd/core-rules/vehicle-rules/#speed-tiers`
- `rules/vehicles/cover-from-vehicles` → `rules/combat/cover`
- `rules/vehicles/drive` → `rules/vehicles/mounts`
- `rules/vehicles/impact-and-overrun` → `rules/actions/readied-actions`, `rules/basics/advantage`, `rules/combat/surprise-attacks`
- `rules/vehicles/initiative-and-occupants` → `rules/actions/readied-actions`, `page:/docs/free-srd/core-rules/stats/#initiative`
- `rules/vehicles/mounts` → `page:/docs/free-srd/core-rules/stats/#action-points`
- `rules/vehicles/overview` → `page:/docs/free-srd/core-rules/combat/`
- `rules/vehicles/vehicle-actions` → `page:/docs/free-srd/core-rules/action-economy/#movement-actions`, `rules/vehicles/impact-and-overrun`

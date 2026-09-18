#!/usr/bin/env python3
"""Discovery-pass generator: builds blocks.json, edges.json and generated
markdown fragments from raw.json + curated config. Writes to scratchpad/out/.
"""
import json, os, re, collections

SB = os.path.dirname(os.path.abspath(__file__))
RAW = json.load(open(os.path.join(SB, "raw.json")))
OUT = os.path.join(SB, "out")
os.makedirs(OUT, exist_ok=True)
REPO = "/home/user/these-lucky-stars"

# ---------- URL map ----------
def url_for(path):
    # path like content/docs/.../x.md
    p = path[len("content"):]
    if p.endswith("/_index.md"):
        u = p[: -len("_index.md")]
    else:
        u = p[:-3] + "/"
    return u

PAGE_BY_URL = {}
for path in RAW:
    PAGE_BY_URL[url_for(path)] = path

# ---------- snippet blocks ----------
SNIPPETS = {
 "action-points":      ("rules/stats/action-points", "core", "rule", "core", ["stats", "actions"], None),
 "announcement":       ("site/announcement", "core", "reference", "core", ["site-chrome"], "excluded"),
 "wip-announcement":   ("site/wip-announcement", "core", "reference", "core", ["site-chrome"], "excluded"),
 "armor":              ("gear/equipment/armor-basics", "core", "rule", "core", ["equipment", "armor"], None),
 "armor-damage":       ("rules/objects/armor-degradation", "core", "rule", "core", ["objects", "armor"], None),
 "coms":               ("rules/sci-fi/communications", "sci-fi", "rule", "module", ["sci-fi", "equipment"], None),
 "damage-dice":        ("rules/combat/damage-dice", "core", "rule", "core", ["combat", "damage"], None),
 "defense":            ("rules/stats/defense", "core", "rule", "core", ["stats", "health"], None),
 "energy-shields":     ("rules/sci-fi/energy-shields", "sci-fi", "rule", "module", ["sci-fi", "equipment", "shield"], None),
 "extreme-environments": ("rules/environment/extreme-environments", "sci-fi", "rule", "module", ["environment", "sci-fi"], None),
 "grapple":            ("rules/combat/grapple", "core", "rule", "core", ["combat", "stats"], None),
 "health-loop":        ("rules/health/applying-damage", "core", "rule", "core", ["health", "combat", "damage"], None),
 "huds":               ("rules/sci-fi/huds", "sci-fi", "rule", "module", ["sci-fi", "equipment"], None),
 "initiative":         ("rules/combat/initiative", "core", "rule", "core", ["combat", "stats"], None),
 "medical-item-medkit-note": ("gear/equipment/medkit-note", "core", "reference", "core", ["equipment", "medical"], None),
 "move":               ("rules/actions/move", "core", "rule", "core", ["actions", "movement"], None),
 "opportunity-attack": ("rules/combat/opportunity-attack", "core", "rule", "core", ["combat", "actions"], None),
 "primary-speed":      ("rules/movement/primary-speed", "core", "rule", "core", ["movement", "stats"], None),
 "sci-fi-add-ballistic": ("rules/sci-fi/ballistics-in-space", "sci-fi", "rule", "module", ["sci-fi", "combat"], None),
 "shields":            ("gear/equipment/shields-basics", "core", "rule", "core", ["equipment", "shield"], None),
 "shields-damage":     ("rules/objects/shield-degradation", "core", "rule", "core", ["objects", "shield"], None),
 "speed-descriptors":  ("rules/movement/speed-descriptors", "core", "rule", "core", ["movement"], None),
 "speed-tiers":        ("rules/movement/speed-tiers", "core", "rule", "core", ["movement"], None),
 "speed-tiers-chart":  ("rules/movement/speed-tiers-chart", "core", "reference", "core", ["movement"], None),
 "stealth":            ("rules/combat/stealth", "core", "rule", "core", ["combat", "stats"], None),
 "step":               ("rules/actions/step", "core", "rule", "core", ["actions", "movement"], None),
 "vitality":           ("rules/stats/vitality", "core", "rule", "core", ["stats", "health"], None),
}

# ---------- per-page config ----------
CC = "content/docs/free-srd/character-creation"
CR = "content/docs/free-srd/core-rules"
IE = "content/docs/free-srd/inventory--equipment"
SF = IE + "/sci-fi-equipment"

# sections entries: (anchor, id, {opts}) opts: end=anchor, type=, tags=, note=
CONFIG = {
 # ---- site / nav pages: no blocks ----
 "content/_index.md": {"mode": "none", "why": "Site home page — nav, announcements, changelog. Site chrome, not buildable content."},
 "content/docs/_index.md": {"mode": "none", "why": "Nav stub."},
 "content/docs/free-srd/_index.md": {"mode": "none", "why": "SRD landing page — orientation prose and nav. Marketing/orientation, not a rule; excluded from builder corpus."},
 "content/docs/downloads.md": {"mode": "none", "why": "Site utility page (PDF downloads)."},
 "content/docs/roadmap.md": {"mode": "none", "why": "Dynamic roadmap shortcode; site page."},
 "content/docs/contributors.md": {"mode": "none", "why": "Credits; site page."},
 "content/docs/appinstall.md": {"mode": "none", "why": "PWA install help; site page."},
 "content/docs/free-srd/sci-fi-module.md": {"mode": "none", "why": "Draft stub (draft: true), one sentence + TODO comment."},
 CR + "/_index.md": {"mode": "none", "why": "Nav list."},
 CC + "/_index.md": {"mode": "none", "why": "Nav list."},
 IE + "/_index.md": {"mode": "none", "why": "Nav list."},
 SF + "/_index.md": {"mode": "none", "why": "Nav list."},
 IE + "/frontier--industry-equipment/_index.md": {"mode": "none", "why": "Draft stub, frontmatter only."},
 IE + "/medieval-equipment/_index.md": {"mode": "none", "why": "Draft stub, frontmatter only."},
 IE + "/modern-equipment/_index.md": {"mode": "none", "why": "Draft stub, frontmatter only."},
 "content/snippets/_index.md": {"mode": "none", "why": "Build-suppression frontmatter only (render: never cascade)."},

 # ---- page-as-block ----
 "content/docs/legal.md": {"mode": "page", "id": "site/license", "cat": "core", "type": "reference", "tier": "core", "tags": ["legal"],
   "why": "One coherent unit; the license/attribution text is genuinely useful as a single block in a print PDF (CC BY-NC-SA requires attribution)."},
 CR + "/size.md": {"mode": "page", "id": "core-rules/size", "cat": "core", "type": "rule", "tier": "core", "tags": ["size", "combat", "stats"],
   "why": "Single-topic page whose sections interlock (chart is referenced by the surrounding prose); splitting would create blocks that depend on the chart. Page-as-block, referenced in place."},
 CC + "/character-creation-overview.md": {"mode": "page", "id": "chargen/overview", "cat": "core", "type": "reference", "tier": "core", "tags": ["character-creation"],
   "why": "One coherent walkthrough (steps + leveling). Link-heavy but self-contained as a unit."},
 CC + "/races/_index.md": {"mode": "page", "id": "races/overview", "cat": "core", "type": "reference", "tier": "core", "tags": ["races", "character-creation"],
   "why": "Short overview + nav list; the prose stands alone as a single block."},
 CC + "/races/classic-human.md": {"mode": "page", "id": "races/classic-human", "cat": "core", "type": "feature", "tier": "core", "tags": ["races", "core"],
   "why": "A race entry is the natural selectable unit."},
 CC + "/races/star-touched-human.md": {"mode": "page", "id": "races/star-touched-human", "cat": "sci-fi", "type": "feature", "tier": "module", "tags": ["races", "sci-fi", "wip"],
   "why": "A race entry is the natural selectable unit."},
 CC + "/races/android.md": {"mode": "page", "id": "races/android", "cat": "sci-fi", "type": "feature", "tier": "module", "tags": ["races", "sci-fi", "wip"],
   "why": "A race entry is the natural selectable unit. NOTE: contains the 'Dead Battery' automated-machine condition, flagged separately (Queue 2)."},
 CC + "/races/reptilian.md": {"mode": "page", "id": "races/reptilian", "cat": "sci-fi", "type": "feature", "tier": "module", "tags": ["races", "sci-fi", "wip"],
   "why": "A race entry is the natural selectable unit."},
 CC + "/races/zeta-grey.md": {"mode": "page", "id": "races/zeta-grey", "cat": "sci-fi", "type": "feature", "tier": "module", "tags": ["races", "sci-fi", "wip"],
   "why": "A race entry is the natural selectable unit."},
 SF + "/bots--drones/b2.md": {"mode": "page", "id": "bots/bal", "cat": "sci-fi", "type": "creature", "tier": "module", "tags": ["bots", "drones", "wip"], "why": "Platform entry (WIP stub)."},
 SF + "/bots--drones/hel-1.md": {"mode": "page", "id": "bots/hel-1", "cat": "sci-fi", "type": "creature", "tier": "module", "tags": ["bots", "drones", "wip"], "why": "Platform entry (WIP stub)."},
 SF + "/bots--drones/t00l.md": {"mode": "page", "id": "bots/t00l", "cat": "sci-fi", "type": "creature", "tier": "module", "tags": ["bots", "wip"], "why": "Platform entry (WIP stub)."},
 SF + "/bots--drones/trk-a.md": {"mode": "page", "id": "bots/trk-a", "cat": "sci-fi", "type": "creature", "tier": "module", "tags": ["bots", "wip"], "why": "Platform entry (WIP stub)."},

 # ---- section-driven rule pages ----
 CR + "/basics.md": {"mode": "sections", "ns": "basics", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["basics"],
  "why": "Fine: each mechanic (decision rolls, advantage, supply rolls…) is a self-contained rule a GM would pull individually. The three micro-rules under General Rules of Play are borderline (Queue 5).",
  "sections": [
    ("key-terms", "key-terms", {}),
    ("decision-rolls---the-primary-mechanic", "decision-rolls", {"end": "target-numbers"}),
    ("target-numbers", "target-numbers", {"end": "success-and-failure", "note": "Includes the difficulty guide table and the four task-band descriptions."}),
    ("success-and-failure", "success-and-failure", {}),
    ("advantage", "advantage", {"note": "Includes Gaining Advantage, GM notes, and contested-roll guidance."}),
    ("contested-rolls", "contested-rolls", {}),
    ("resolving-a-tie", "resolving-a-tie", {}),
    ("the-rounding-rule", "the-rounding-rule", {}),
    ("supply-rolls", "supply-rolls", {}),
    ("d100-or-percentage", "d100-or-percentage", {}),
  ]},
 CR + "/attributes.md": {"mode": "sections", "ns": "attributes", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["attributes"],
  "why": "Medium: overview / generation / values / the two attribute groups. Generation methods kept as ONE block because Attribute Pool opens with 'Using the rolling method above' (Queue 2). Per-attribute split rejected — each description is two lines (Queue 5 notes the alternative).",
  "sections": [
    ("attributes", "overview", {"end": "two-ways-to-determine-attributes"}),
    ("two-ways-to-determine-attributes", "determining-attributes", {}),
    ("attribute-values", "attribute-values", {}),
    ("physical-attributes", "physical-attributes", {}),
    ("mental-attributes", "mental-attributes", {}),
  ]},
 CR + "/stats.md": {"mode": "sections", "ns": "stats", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["stats"],
  "why": "This page is already mostly snippet composition (initiative, AP, speed, DEF, VIT, grapple, stealth). Blocks proposed only for the prose still trapped in the page: Stress Threshold, Luck, Attack, and the Wounds & Conditions summary (a dedup case).",
  "sections": [
    ("wounds--conditions", "wounds-and-conditions-summary", {"type": "reference", "note": "Duplicates the intro of the Wounds & Conditions page — identity decision (one block, two tags vs. two blocks) flagged in Queue 2."}),
    ("stress-threshold", "stress-threshold", {}),
    ("luck", "luck", {"tags": ["luck"]}),
    ("grapple", None, {"skip": True}),
    ("attack", "attack", {}),
    ("blank-boxes", "blank-boxes", {"type": "reference", "note": "Character-sheet-specific note; low value as a standalone block."}),
  ]},
 CR + "/action-economy.md": {"mode": "sections", "ns": "actions", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["actions"],
  "why": "Medium: block per action-type concept. Readied and Multi-Turn actions get their own blocks (both are individually cross-referenced from Combat and Vehicle Rules). Move/Step/AP/speed content is already snippets.",
  "sections": [
    ("action-types", "action-types", {"end": "standard-actions", "note": "The three-category framing paragraph."}),
    ("standard-actions", "standard-actions", {"end": "readied-actions"}),
    ("readied-actions", "readied-actions", {}),
    ("multi-turn-actions", "multi-turn-actions", {}),
    ("opportunity-actions", "opportunity-actions", {"end": "opportunity-attack", "note": "Framing rules for opportunity actions; the Opportunity Attack itself is already the rules/combat/opportunity-attack snippet."}),
    ("reactions", "reactions", {}),
    ("difficult-terrain-and-obstacles", "difficult-terrain", {}),
  ]},
 CR + "/health.md": {"mode": "sections", "ns": "health", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["health"],
  "why": "Page is a composition shell (defense/vitality/health-loop snippets). Only the two-layer overview paragraph is unextracted prose.",
  "sections": [
    ("health", "overview", {"end": "defense", "type": "reference"}),
  ]},
 CR + "/combat.md": {"mode": "sections", "ns": "combat", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["combat"],
  "why": "Fine for the rule sections (each is pulled separately at the table). The action catalog is granularity-ambiguous — one catalog block vs. one block per named action — sent to Queue 5; provisionally recorded as a single block.",
  "sections": [
    ("combat-basics", "combat-basics", {}),
    ("the-attack-roll-opposed-rolls", "attack-roll", {}),
    ("advantage-and-disadvantage-in-combat", "advantage-in-combat", {"note": "Depends on rules/basics/advantage for the advantage scale (edge queued)."}),
    ("cover", "cover", {}),
    ("surprise-attacks", "surprise-attacks", {}),
    ("steps-to-an-attack", "steps-to-an-attack", {}),
    ("damage", "damage-overview", {"end": "damage-dice", "note": "The DEF damage formula."}),
    ("damage-modifiers", "damage-modifiers", {}),
    ("damage-types", "damage-types", {}),
    ("damage-sources", "damage-sources", {}),
    ("damage-resistance-and-weakness", "damage-resistance", {}),
    ("actions-in-combat", "action-catalog", {"end": "related", "note": "Queue 5: split per named action (Disarm, Trip, Shatter, Brace…) vs. keep as one catalog. Contains includes of move/step/grapple/stealth/opportunity-attack snippets either way."}),
  ]},
 CR + "/wounds--conditions.md": {"mode": "details", "cat": "core", "tier": "core",
  "why": "Fine: every wound type and every condition is already a `details` block — natural block boundaries. Plus section blocks for the wound framework and the two reference tables.",
  "det_map": {"wound-types": ("wounds", "rule", ["wounds", "wound-type"]),
              "conditions": ("conditions", "rule", ["conditions", "condition"])},
  "sections": [
    ("wounds--conditions", "rules/wounds/overview", {"end": "wounds", "type": "reference", "note": "Intro; overlaps the stats-page summary (Queue 2 identity flag)."}),
    ("wounds", "rules/wounds/wounds", {"end": "wound-types", "note": "Minor/major classification, dressing/healing rules, narrative healing."}),
    ("common-injuries", "rules/wounds/common-injuries", {"end": "conditions", "type": "reference"}),
    ("conditions", "rules/conditions/overview", {"end": "asphyxiating", "type": "reference", "note": "Condition framing + summary table."}),
  ]},
 CR + "/environmental-effects.md": {"mode": "sections", "ns": "environment", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["environment"],
  "why": "Medium: block per hazard family. Heat & Cold and Toxic Atmosphere are incoherent without the Exposure Intervals mechanism — hard-dependency suspicion, Queue 1.",
  "sections": [
    ("environmental-effects", "overview", {"end": "exposure-intervals", "type": "reference"}),
    ("exposure-intervals", "exposure-intervals", {"end": "heat--cold"}),
    ("heat--cold", "heat-and-cold", {}),
    ("toxic-atmosphere", "toxic-atmosphere", {}),
    ("visibility", "visibility", {}),
  ]},
 CR + "/damaged--broken-gear.md": {"mode": "sections", "ns": "objects", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["objects"],
  "why": "Medium: block per h2. Durability and Conditions are tightly coupled (Queue 1). Armor/shield degradation are already snippets; the Breaking Defensive Items section is framing around them.",
  "sections": [
    ("damaged--broken-gear", "overview", {"end": "targeting-objects", "type": "reference"}),
    ("targeting-objects", "targeting-objects", {}),
    ("object-durability", "durability", {}),
    ("object-conditions", "conditions", {}),
    ("material-def", "material-def", {"type": "reference", "note": "Reference tables (material DEF, common item DEF)."}),
  ]},
 CR + "/sci-fi-additions.md": {"mode": "sections", "ns": "sci-fi", "cat": "sci-fi", "type": "rule", "tier": "module", "base_tags": ["sci-fi"],
  "why": "Composition shell for the sci-fi snippets, plus Computer Systems — proposed as ONE block: its subsections (security levels, actions, countermeasures) reference each other's charts and are incoherent alone. Queue 5 records the finer alternative.",
  "sections": [
    ("computer-systems", "computer-systems", {"tags": ["computers"], "note": "Networks, security levels, hacking actions, countermeasures as one unit."}),
  ]},
 CR + "/vehicle-rules.md": {"mode": "sections", "ns": "vehicles", "cat": "core", "type": "rule", "tier": "supplement", "base_tags": ["vehicles", "wip"],
  "why": "Medium: block per subsection; Mounts kept as one block (its subsections are one continuous argument). Interaction targets (board/bail/dodge/brace) all derive from the Speed-tier modifier chart — Queue 1. Page is WIP.",
  "sections": [
    ("vehicle-rules", "overview", {"end": "vehicle-size", "type": "reference"}),
    ("vehicle-size", "vehicle-size", {}),
    ("vehicle-actions", "vehicle-actions", {"end": "ignition", "note": "Intro + Driver Actions disadvantage rule."}),
    ("ignition", "ignition", {}),
    ("drive", "drive", {}),
    ("boarding--bailing", "boarding-and-bailing", {}),
    ("initiative--occupants", "initiative-and-occupants", {}),
    ("cover-from-vehicles", "cover-from-vehicles", {}),
    ("impact--overrun", "impact-and-overrun", {"end": "collision-damage"}),
    ("collision-damage", "collision-damage", {"end": "mounts", "note": "Includes damage-to-vehicle and occupant brace rules."}),
    ("mounts", "mounts", {"note": "Queue 5: could split into equipment-vs-ally / features / unwilling / impact / sudden stops."}),
  ]},
 IE + "/inventory.md": {"mode": "sections", "ns": "inventory", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["inventory"],
  "why": "Two blocks: carry limits (weight + bulky are one budget system) and body slots (with the equipped-armor note folded in).",
  "sections": [
    ("inventory-management", "carry-limits", {"end": "equipment-body-slots"}),
    ("equipment-body-slots", "body-slots", {}),
  ]},
 IE + "/equipment.md": {"mode": "sections", "ns": "equipment", "cat": "core", "type": "rule", "tier": "core", "base_tags": ["equipment"],
  "why": "One block: the Common Equipment Terms glossary (price/weight/Object DEF/DEF bonus/range/tags) reads as a unit; individual terms are too small to stand alone. The by-module link list is nav.",
  "sections": [
    ("common-equipment-terms", "common-terms", {}),
  ]},
 IE + "/item-tags.md": {"mode": "details", "cat": "core", "tier": "core",
  "why": "Fine: one block per tag — tags are the definitional units that equipment blocks lean on (those edges are queued as suspected hard dependencies).",
  "det_map": {"*": ("item-tags", "rule", ["item-tag"])}},
 IE + "/generic-equipment.md": {"mode": "details", "cat": "core", "tier": "core",
  "why": "Fine: one block per item (each `details` is an item entry). Grouped entries (Pouch Sets, Bandages) hold multiple items in one details — Queue 5. Section headings become tags (tag-as-query).",
  "det_map": {
    "clothing--wearables": ("generic-equipment", "equipment", ["equipment", "generic", "clothing"]),
    "containers--storage": ("generic-equipment", "equipment", ["equipment", "generic", "containers"]),
    "light-sources": ("generic-equipment", "equipment", ["equipment", "generic", "light-sources"]),
    "medical-supplies": ("generic-equipment", "equipment", ["equipment", "generic", "medical"]),
    "survival-equipment": ("generic-equipment", "equipment", ["equipment", "generic", "survival"]),
    "tools--utility-gear": ("generic-equipment", "equipment", ["equipment", "generic", "tools"]),
    "trade-goods--miscellaneous": ("generic-equipment", "equipment", ["equipment", "generic", "trade-goods"]),
  }},
 SF + "/sci-fi-kits.md": {"mode": "details", "cat": "sci-fi", "tier": "module",
  "why": "Fine: one block per kit, plus a block for the kit-supplies rules in the intro.",
  "det_map": {"*": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "kit"])},
  "sections": [("sci-fi-tool-kits", "gear/sci-fi-equipment/kit-supplies", {"type": "rule", "tags": ["equipment", "sci-fi", "kit"], "note": "Kit supply mechanics (1d12 supply, refills, tools-only actions)."})]},
 SF + "/sci-fi-weapons.md": {"mode": "details", "cat": "sci-fi", "tier": "module",
  "why": "Fine: one block per weapon/upgrade. Weapon-class headings become tags (tag-as-query).",
  "det_map": {
    "light-melee-weapons": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "weapon", "light-melee"]),
    "medium-melee-weapons": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "weapon", "medium-melee"]),
    "pistols": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "weapon", "pistol"]),
    "rifles": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "weapon", "rifle"]),
    "heavy-ranged-weapons": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "weapon", "heavy-ranged"]),
    "ranged-weapon-upgrades": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "upgrade", "ranged-upgrade"]),
    "melee-weapon-upgrades": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "upgrade", "melee-upgrade"]),
  }},
 SF + "/sci-fi-armor.md": {"mode": "details", "cat": "sci-fi", "tier": "module",
  "why": "Fine: one block per armor/upgrade/shield. Light/Heavy sections become tags. Page intro composes the armor-basics + armor-degradation snippets.",
  "det_map": {
    "light-armor": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "armor", "light-armor"]),
    "heavy-armor": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "armor", "heavy-armor"]),
    "armor-upgrades": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "upgrade", "armor-upgrade"]),
    "armor-upgrades-1": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "upgrade", "armor-upgrade"]),
    "shields": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "shield"]),
  }},
 SF + "/sci-fi-misc-equipment.md": {"mode": "details", "cat": "sci-fi", "tier": "module",
  "why": "Fine: one block per item; section headings become tags.",
  "det_map": {
    "communication-devices": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "communications"]),
    "medical-supplies": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "medical"]),
    "survival-equipment": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "survival"]),
    "tech--gadgets": ("sci-fi-equipment", "equipment", ["equipment", "sci-fi", "tech"]),
  }},
 SF + "/bots--drones/_index.md": {"mode": "sections", "ns": "bots", "cat": "sci-fi", "type": "rule", "tier": "module", "base_tags": ["bots", "sci-fi"],
  "why": "The drones/robots/Androids taxonomy (and the character-rules-not-object-rules ruling) is a real rule block; the platform lists are nav.",
  "sections": [
    ("bots--drones", "automated-machines", {"end": "drone-platforms"}),
  ]},
 SF + "/bots--drones/components.md": {"mode": "details", "cat": "sci-fi", "tier": "module",
  "why": "Fine: one block per component, plus three rule blocks (installation, power, damage/wounds). Signal Masts details holds two components — Queue 5.",
  "det_map": {"*": ("components", "equipment", ["equipment", "sci-fi", "component"])},
  "sections": [
    ("components", "gear/components/overview", {"end": "installation", "type": "reference", "tags": ["sci-fi", "component"]}),
    ("installation", "gear/components/installation", {"end": "power-sources-and-batteries", "type": "rule", "tags": ["sci-fi", "component"]}),
    ("power-sources-and-batteries", "gear/components/power-sources", {"end": "damage-and-wounds", "type": "rule", "tags": ["sci-fi", "component"]}),
    ("damage-and-wounds", "gear/components/damage-and-wounds", {"end": "component-quick-reference", "type": "rule", "tags": ["sci-fi", "component"]}),
  ]},
 CC + "/traits.md": {"mode": "details", "cat": "core", "tier": "core",
  "why": "Fine: one block per trait (each already a `details`). Section headings Core/Sci-Fi become tags; the [Racial] label rule is its own block.",
  "det_map": {"core": ("traits", "feature", ["trait", "core"]),
              "sci-fi": ("traits", "feature", ["trait", "sci-fi"])},
  "sections": [
    ("traits", "character/traits/overview", {"end": "racial-traits", "type": "reference", "tags": ["trait", "character-creation"]}),
    ("racial-traits", "traits/racial-traits", {"end": "core", "type": "rule", "tags": ["trait", "racial", "character-creation"], "note": "The [Racial] label rule."}),
  ]},
 CC + "/proficiencies.md": {"mode": "details", "cat": "core", "tier": "core",
  "why": "Fine: one block per proficiency. Core/Sci-Fi sections become tags.",
  "det_map": {"core": ("proficiencies", "feature", ["proficiency", "core"]),
              "sci-fi": ("proficiencies", "feature", ["proficiency", "sci-fi"])},
  "sections": [
    ("proficiencies", "character/proficiencies/overview", {"end": "core", "type": "reference", "tags": ["proficiency", "character-creation"]}),
  ]},
 CC + "/abilities.md": {"mode": "details", "cat": "core", "tier": "core",
  "why": "Fine: one block per ability — this is the flagship tag-as-query page. Section headings (Core General / Core Luck / Sci-Fi General / Sci-Fi Battery) become tag-sets.",
  "det_map": {"core-general": ("abilities", "feature", ["ability", "core", "general"]),
              "core-luck": ("abilities", "feature", ["ability", "core", "luck"]),
              "sci-fi-general": ("abilities", "feature", ["ability", "sci-fi", "general"]),
              "sci-fi-battery": ("abilities", "feature", ["ability", "sci-fi", "battery"])},
  "sections": [
    ("abilities", "character/abilities/overview", {"end": "core-general", "type": "reference", "tags": ["ability", "character-creation"]}),
  ]},
}

SLUG_OVERRIDES = {
 "Analgesic Radiation Antidote 5 (ARA-5)": "ara-5",
 "Standardized Battery Cores": "battery-cores",
 "Reactor Cores": "reactor-cores",
 "Compass / Navigational Tool": "compass",
 "Fuel / Oil Flask": "fuel-oil-flask",
 "Quiver / Bolt Case": "quiver",
 "Ball of Twine / String": "twine",
 "Waterskin / Canteen": "waterskin",
 "Manacles / Restraints": "manacles",
 "Chalk / Charcoal Sticks": "chalk-sticks",
 "Parchment / Paper Sheets (5)": "parchment-sheets",
 "Pitons / Climbing Spikes (6)": "pitons",
 "Iron Spikes (10)": "iron-spikes",
 "Wooden Stakes (6)": "wooden-stakes",
 "Animal Feed (1 day)": "animal-feed",
 "Chest, Lockable": "lockable-chest",
 "Rope, 50ft": "rope-50ft",
 "Chain, 10ft": "chain-10ft",
 "Tent, 2-Person": "tent-2-person",
 "Tent, 4-Person": "tent-4-person",
 "Shovel": "shovel",
 "Pouch Sets": "pouch-sets",
 "Bandages": "bandages",
 "Signal Masts": "signal-masts",
 "Fuel Cell": "fuel-cells",
}

def clean_slug(text):
    if text in SLUG_OVERRIDES:
        return SLUG_OVERRIDES[text]
    t = re.sub(r"\[_+\]", "", text)          # [___]
    t = t.replace("Δ", "").replace("δ", "")
    s = []
    prev_dash = False
    for ch in t.strip().lower():
        if ch.isalnum() and ord(ch) < 128:
            s.append(ch); prev_dash = False
        elif not prev_dash and s:
            s.append("-"); prev_dash = True
    slug = "".join(s).strip("-")
    return slug

# ---------- build blocks ----------
blocks = []          # dicts
blocks_by_id = {}
anchor_to_block = {} # (page, anchor) -> block id  (innermost)
page_block = {}      # page -> block id for page-mode

def add_block(b):
    if b["id"] in blocks_by_id:
        b.setdefault("flags", []).append("ID-COLLISION")
        blocks_by_id[b["id"]].setdefault("flags", []).append("ID-COLLISION")
        print("!! id collision:", b["id"], b["page"], "vs", blocks_by_id[b["id"]]["page"])
    blocks.append(b)
    blocks_by_id[b["id"]] = b

def heading_by_anchor(page, anchor):
    for h in RAW[page]["headings"]:
        if h["anchor"] == anchor:
            return h
    return None

for page, cfg in CONFIG.items():
    P = RAW[page]
    mode = cfg["mode"]
    if mode == "none":
        continue
    if mode == "page":
        b = {"id": cfg["id"], "title": P["title"], "page": page, "anchor": None,
             "span": [1, P["n_lines"]], "home": "page", "file": page,
             "category": cfg["cat"], "type": cfg["type"], "tier": cfg["tier"],
             "tags": cfg["tags"], "flags": [], "notes": ""}
        if P.get("draft"):
            b["flags"].append("draft")
        add_block(b)
        page_block[page] = b["id"]
        continue
    ns_default = cfg.get("ns")
    # sections
    for (anchor, ident, opts) in cfg.get("sections", []):
        if opts.get("skip"):
            continue
        h = heading_by_anchor(page, anchor)
        if h is None:
            print("!! missing section anchor", page, anchor); continue
        # span end
        if "end" in opts:
            eh = heading_by_anchor(page, opts["end"])
            end = (eh["line"] - 1) if eh else P["n_lines"]
        else:
            end = P["n_lines"]
            for h2 in P["headings"]:
                if h2["line"] > h["line"] and h2["level"] <= h["level"]:
                    end = h2["line"] - 1
                    break
        bid = ident if "/" in ident else f"{ns_default}/{ident}"
        b = {"id": bid, "title": re.sub(r"\s*[-–—]{1,3}\s*[Tt]he [Pp]rimary.*$", "", h["text"]),
             "page": page, "anchor": h["anchor"], "span": [h["line"], end],
             "home": "snippet (proposed)",
             "file": f"content/snippets/{bid.replace('/', '/')}.md",
             "category": opts.get("cat", cfg.get("cat")), "type": opts.get("type", cfg.get("type", "rule")),
             "tier": opts.get("tier", cfg.get("tier")),
             "tags": sorted(set(cfg.get("base_tags", []) + opts.get("tags", []))),
             "flags": [], "notes": opts.get("note", "")}
        add_block(b)
    # details
    if mode == "details":
        outer_headings = [h for h in P["headings"] if not h["in_details"]]
        for d in P["details"]:
            sec = None
            for h in outer_headings:
                if h["line"] < d["start"]:
                    sec = h["anchor"]
                else:
                    break
            det_map = cfg["det_map"]
            key = sec if sec in det_map else "*"
            if key not in det_map:
                # walk up: find nearest mapped ancestor section by anchor prefix
                print("!! unmapped details section", page, sec, d["title"])
                continue
            ns, btype, tags = det_map[key]
            # first heading inside span
            inner = [h for h in P["headings"] if d["start"] <= h["line"] <= d["end"]]
            title = inner[0]["text"] if inner else d["title"]
            anchor = inner[0]["anchor"] if inner else None
            slug = clean_slug(d["title"] if d["title"] in SLUG_OVERRIDES else title)
            bid = f"{ns}/{slug}"
            flags = []
            n_items = len([h for h in inner if h["level"] >= 3])
            if n_items > 1:
                flags.append(f"multi-item ({n_items} headings in one details)")
            b = {"id": bid, "title": re.sub(r"\s*Δ\s*$", "", title), "page": page, "anchor": anchor,
                 "span": [d["start"], d["end"]], "home": "snippet (proposed)",
                 "file": f"content/snippets/{bid}.md",
                 "category": "sci-fi" if "sci-fi" in tags else cfg.get("cat"),
                 "type": btype,
                 "tier": "module" if "sci-fi" in tags else cfg.get("tier"),
                 "tags": list(tags), "flags": flags, "notes": ""}
            # tier: sci-fi sections of core pages -> module
            add_block(b)

# snippet file blocks
for path in RAW:
    if not path.startswith("content/snippets/") or path.endswith("_index.md"):
        continue
    name = os.path.basename(path)[:-3]
    if name not in SNIPPETS:
        print("!! unmapped snippet", name); continue
    bid, cat, btype, tier, tags, excl = SNIPPETS[name]
    b = {"id": bid, "title": name.replace("-", " ").title(), "page": path, "anchor": None,
         "span": [1, RAW[path]["n_lines"]], "home": "snippet (existing)", "file": path,
         "category": cat, "type": btype, "tier": tier, "tags": tags, "flags": [], "notes": ""}
    if excl:
        b["flags"].append("excluded: site chrome, not a buildable block")
    add_block(b)
    page_block[path] = bid

# anchor -> innermost block map
for page in RAW:
    pb = [b for b in blocks if b["page"] == page]
    for h in RAW[page]["headings"]:
        best, bestspan = None, 10**9
        for b in pb:
            s, e = b["span"]
            if s <= h["line"] <= e and (e - s) < bestspan:
                best, bestspan = b, e - s
        if best:
            anchor_to_block[(page, h["anchor"])] = best["id"]

def block_at(page, line):
    best, bestspan = None, 10**9
    for b in blocks:
        if b["page"] != page:
            continue
        s, e = b["span"]
        if s <= line <= e and (e - s) < bestspan:
            best, bestspan = b, e - s
    return best["id"] if best else f"page:{url_for(page)}"

# ---------- edges ----------
MENTION_PREFIX = ("http://", "https://", "mailto:", "/digitalcharactersheet",
                  "/attributeconverter", "/planetnamegenerator", "/pdfs/", "/images/")
MENTION_PAGES = {"/docs/downloads/", "/docs/roadmap/", "/docs/legal/", "/docs/contributors/",
                 "/docs/appinstall/", "/docs/free-srd/", "/docs/"}

EQUIP_PAGES = {IE + "/generic-equipment.md", SF + "/sci-fi-weapons.md", SF + "/sci-fi-armor.md",
               SF + "/sci-fi-misc-equipment.md", SF + "/sci-fi-kits.md",
               SF + "/bots--drones/components.md"}
PREREQ_PAGES = {CC + "/abilities.md", CC + "/proficiencies.md", CC + "/traits.md"}

# curated (source_id, target_id) pairs -> queue1 with class
SUSPECT_PAIRS = {
 ("rules/combat/opportunity-attack", "rules/movement/speed-tiers"): "mechanism",
 ("rules/combat/opportunity-attack", "character/proficiencies/martial-training"): "mechanism",
 ("rules/stats/vitality", "rules/conditions/dying"): "mechanism",
 ("rules/stats/vitality", "rules/conditions/unconscious"): "mechanism",
 ("rules/stats/vitality", "rules/wounds/wounds"): "mechanism",
 ("rules/conditions/pinned", "rules/combat/grapple"): "mechanism",
 ("gear/item-tags/ballistic", "rules/basics/supply-rolls"): "mechanism",
 ("gear/item-tags/battery", "gear/sci-fi-equipment/battery-cores"): "mechanism",
 ("item-tags/fuel-cell", "gear/sci-fi-equipment/fuel-cells"): "mechanism",
 ("gear/item-tags/space-suit", "gear/item-tags/pressurized"): "mechanism",
 ("gear/item-tags/space-suit", "gear/sci-fi-equipment/coms-unit"): "mechanism",
 ("gear/item-tags/space-suit", "rules/combat/damage-resistance"): "mechanism",
 ("gear/item-tags/power-source", "gear/sci-fi-equipment/battery-cores"): "mechanism",
 ("gear/item-tags/power-source", "gear/sci-fi-equipment/reactor-cores"): "mechanism",
 ("races/android", "rules/conditions/dying"): "mechanism",
 ("rules/environment/extreme-environments", "rules/combat/damage-resistance"): "mechanism",
 ("gear/components/heavy-wrist-laser", "gear/sci-fi-equipment/laser-rifle"): "functions-as",
 ("gear/components/wrist-laser", "gear/sci-fi-equipment/laser-pistol"): "functions-as",
 ("gear/components/automatic-crash-foam-system", "gear/sci-fi-equipment/crash-foam-canister"): "functions-as",
 ("gear/components/internal-comp-jack", "gear/sci-fi-equipment/comp-jack"): "functions-as",
 ("gear/sci-fi-equipment/comp-jack", "character/proficiencies/comp-jack"): "mechanism",
 ("character/traits/particularly-attractive", "character/traits/unremarkable"): "exclusivity",
 ("character/traits/unremarkable", "character/traits/particularly-attractive"): "exclusivity",
 ("combat/advantage-in-combat", "rules/basics/advantage"): "mechanism",
 ("gear/equipment/medkit-note", "rules/wounds/wounds"): "mechanism",
}

# curated implicit dependency-suspect edges (no link in text)
IMPLICIT = [
 ("environment/heat-and-cold", "environment/exposure-intervals", "mechanism", "FORT-interval mechanism defined in Exposure Intervals; this block only lists consequences"),
 ("environment/toxic-atmosphere", "environment/exposure-intervals", "mechanism", "Same interval mechanism dependency"),
 ("rules/objects/conditions", "rules/objects/durability", "mechanism", "The three conditions are VIT thresholds defined by Object Durability"),
 ("rules/objects/armor-degradation", "rules/objects/conditions", "mechanism", "Uses Damaged/Broken as defined terms"),
 ("rules/objects/shield-degradation", "rules/objects/conditions", "mechanism", "Uses Damaged/Broken as defined terms"),
 ("rules/objects/shield-degradation", "rules/basics/supply-rolls", "mechanism", "Shield wear runs on supply dice"),
 ("rules/vehicles/boarding-and-bailing", "rules/movement/speed-tiers-chart", "mechanism", "Targets are 6 + speed modifier from the chart"),
 ("rules/vehicles/collision-damage", "rules/movement/speed-tiers-chart", "mechanism", "Formula uses the chart's speed modifier"),
 ("rules/vehicles/impact-and-overrun", "rules/vehicles/collision-damage", "mechanism", "Failure outcomes resolve via collision damage"),
 ("rules/vehicles/mounts", "rules/vehicles/collision-damage", "mechanism", "Sudden Stops deals collision damage"),
 ("rules/health/applying-damage", "rules/stats/defense", "mechanism", "The loop is defined in terms of DEF"),
 ("rules/health/applying-damage", "rules/stats/vitality", "mechanism", "The loop is defined in terms of VIT"),
 ("rules/combat/damage-dice", "core-rules/size", "mechanism", "Dice determined by attacker/defender size comparison"),
 ("gear/sci-fi-equipment/kit-supplies", "rules/basics/supply-rolls", "mechanism", "Kit supplies run on supply dice"),
 ("rules/conditions/stressed", "rules/stats/stress-threshold", "mechanism", "Trigger defined by Stress Threshold"),
 ("rules/conditions/dying", "rules/conditions/unconscious", "mechanism", "Dying character 'immediately falls unconscious (as the condition)'"),
 ("rules/sci-fi/energy-shields", "rules/stats/defense", "mechanism", "Temporary DEF pool concept extends DEF"),
 ("rules/stats/luck", "rules/conditions/stressed", "mechanism", "Stressed disables Luck"),
]

edges = []
unresolved = []

def norm_url(u):
    u = u.strip()
    if u.startswith(("http://", "https://", "mailto:")):
        return None, None, u
    if "#" in u:
        pathpart, frag = u.split("#", 1)
    else:
        pathpart, frag = u, None
    return pathpart, frag, None

italic_lines = {}
def is_prereq_line(page, lineno):
    if page not in italic_lines:
        with open(os.path.join(REPO, page)) as f:
            italic_lines[page] = f.read().split("\n")
    line = italic_lines[page][lineno - 1].strip()
    return line.startswith("*") and not line.startswith("**") and line.endswith("*")

for page, P in RAW.items():
    src_url = url_for(page)
    for lk in P["links"]:
        url = lk["url"]
        src = block_at(page, lk["line"])
        e = {"source": src, "target": None, "type": "reference", "queued": False,
             "url": url, "text": lk["text"], "file": page, "line": lk["line"]}
        pathpart, frag, ext = norm_url(url)
        if ext or url.startswith(MENTION_PREFIX):
            e["target"] = f"external:{url}"
            e["type"] = "mention"
            edges.append(e); continue
        # resolve path
        if pathpart == "":
            tpage = page
        else:
            if not pathpart.startswith("/"):
                # relative
                base = src_url
                pathpart = base + pathpart
                e["malformed"] = "relative URL (no leading slash)"
            if not pathpart.endswith("/"):
                pathpart += "/"
            if pathpart in MENTION_PAGES:
                e["target"] = f"page:{pathpart}"
                e["type"] = "mention"
                edges.append(e); continue
            tpage = PAGE_BY_URL.get(pathpart)
        if tpage is None:
            e["target"] = f"unresolved:{url}"
            e["type"] = "reference"
            e["queued"] = True; e["queue"] = 3; e["class"] = "broken-page-path"
            edges.append(e); unresolved.append(e); continue
        if frag:
            bid = anchor_to_block.get((tpage, frag))
            if bid is None:
                if any(h["anchor"] == frag for h in RAW[tpage]["headings"]):
                    e["target"] = f"page:{url_for(tpage)}#{frag}"
                else:
                    e["target"] = f"unresolved:{url}"
                    e["queued"] = True; e["queue"] = 3; e["class"] = "broken-anchor"
                    edges.append(e); unresolved.append(e); continue
            else:
                e["target"] = bid
        else:
            e["target"] = page_block.get(tpage, f"page:{url_for(tpage)}")
        # Q1 classes
        pair = (e["source"], e["target"])
        if pair in SUSPECT_PAIRS:
            e["queued"] = True; e["queue"] = 1; e["class"] = SUSPECT_PAIRS[pair]
        elif page in PREREQ_PAGES and lk["in_details"] and is_prereq_line(page, lk["line"]) \
             and any(e["target"].startswith(p) for p in ("abilities/", "proficiencies/", "traits/")):
            e["queued"] = True; e["queue"] = 1; e["class"] = "prerequisite"
        elif page in EQUIP_PAGES and e["target"].startswith("item-tags/"):
            e["queued"] = True; e["queue"] = 1; e["class"] = "tag-definition"
        edges.append(e)
    # includes
    for inc in P["includes"]:
        t = inc["target"]
        t = t if t.startswith("/") else "/" + t
        t = t[:-3] if t.endswith(".md") else t
        name = t.split("/")[-1]
        src = block_at(page, inc["line"])
        if name in SNIPPETS:
            tgt = SNIPPETS[name][0]
        else:
            tgt = f"unresolved:{inc['target']}"
        e = {"source": src, "target": tgt, "type": "include", "queued": False,
             "url": inc["target"], "text": None, "file": page, "line": inc["line"]}
        edges.append(e)

for (s, t, cls, why) in IMPLICIT:
    edges.append({"source": s, "target": t, "type": "reference", "queued": True,
                  "queue": 1, "class": cls, "url": None, "text": None,
                  "file": None, "line": None, "note": why + " (implicit — no link in text)"})

# in-degree -> reference rating
indeg = collections.Counter()
for e in edges:
    if e["target"] in blocks_by_id and not e["source"].startswith("page:"):
        indeg[e["target"]] += 1
for b in blocks:
    d = indeg[b["id"]]
    b["reference"] = "high" if d >= 6 else ("medium" if d >= 2 else "low")
    b["in_degree"] = d

# name-duplicate detection across namespaces
byname = collections.defaultdict(list)
for b in blocks:
    byname[b["title"].strip().lower()].append(b["id"])
name_dups = {k: v for k, v in byname.items() if len(v) > 1}

# ---------- write outputs ----------
json.dump(blocks, open(os.path.join(OUT, "blocks.json"), "w"), indent=1)
json.dump(edges, open(os.path.join(OUT, "edges.json"), "w"), indent=1)

# stats
q = collections.Counter()
for e in edges:
    key = (e["type"], e.get("queue"))
    q[key] += 1
print("blocks:", len(blocks))
print("edges:", len(edges), dict(q))
print("name dups:", json.dumps(name_dups, indent=1))
json.dump({p: c.get("why", "") for p, c in CONFIG.items()}, open(os.path.join(SB, "why.json"), "w"), indent=1)
print("unresolved:", len(unresolved))
for e in unresolved:
    print("  ", e["file"] + ":" + str(e["line"]), e["url"])

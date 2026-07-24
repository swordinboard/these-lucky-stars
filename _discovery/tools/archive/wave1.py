#!/usr/bin/env python3
"""Wave 1: Δ heading removal, Q3 link fixes. Exact-count replacements."""
import sys

REPO = "/home/user/these-lucky-stars/"
CR = "content/docs/free-srd/core-rules/"
CC = "content/docs/free-srd/character-creation/"
IE = "content/docs/free-srd/inventory--equipment/"
SF = IE + "sci-fi-equipment/"

# (file, old, new, expected_count)
EDITS = [
 # --- Δ removal from condition headings (details titles + table keep Δ) ---
 (CR+"wounds--conditions.md", "### Crippled Δ", "### Crippled", 1),
 (CR+"wounds--conditions.md", "### Dying Δ", "### Dying", 1),
 (CR+"wounds--conditions.md", "### Fatigued Δ", "### Fatigued", 1),
 (CR+"wounds--conditions.md", "### Immobilized Δ", "### Immobilized", 1),
 (CR+"wounds--conditions.md", "### Restrained [___] Δ", "### Restrained [___]", 1),
 (CR+"wounds--conditions.md", "### Sick Δ", "### Sick", 1),
 (CR+"wounds--conditions.md", "### Unconscious Δ", "### Unconscious", 1),
 (CR+"wounds--conditions.md",
  "*Conditions and Combat* — Conditions that often grant an advantage to attackers are marked with Δ.",
  "*Conditions and Combat* — Conditions that often grant an advantage to attackers are marked with Δ in the table below and on their labels.", 1),
 # --- link fixes ---
 ("content/snippets/medical-item-medkit-note.md",
  "/docs/core-rul3s/wounds--conditions/#wounds", "/docs/free-srd/core-rules/wounds--conditions/#wounds", 1),
 ("content/snippets/vitality.md",
  "/docs/free-srd/core-rules/wounds--conditions/conditions", "/docs/free-srd/core-rules/wounds--conditions/#conditions", 1),
 ("content/snippets/primary-speed.md",
  "/docs/free-srd/core-rules/action-economy/#speed-modes", "/docs/free-srd/core-rules/action-economy/#speed-descriptors", 1),
 ("content/snippets/primary-speed.md",
  "/docs/free-srd/core-rules/action-economy/#maneuverability", "/docs/free-srd/core-rules/action-economy/#speed-descriptors", 1),
 ("content/docs/free-srd/_index.md",
  "/docs/free-srd/core-rules/character-creation/character-creation-overview", "/docs/free-srd/character-creation/character-creation-overview", 1),
 (CC+"character-creation-overview.md",
  "/docs/free-srd/core-rules/character-creation/races", "/docs/free-srd/character-creation/races", 1),
 (CC+"abilities.md", "(#extra-dual-attack)", "(#swift-dual-attack)", 1),
 (CR+"action-economy.md",
  "docs/free-srd/core-rules/the-basics/#target-numbers", "/docs/free-srd/core-rules/basics/#target-numbers", 1),
 (CR+"action-economy.md",
  "docs/free-srd/core-rules/the-basics/#advantage", "/docs/free-srd/core-rules/basics/#advantage", 1),
 (CR+"vehicle-rules.md", "(#imapct--overrun)", "(#impact--overrun)", 1),
 (CR+"vehicle-rules.md",
  "/docs/free-srd/core-rules/attributes/#agility)", "/docs/free-srd/core-rules/attributes/#agility-agi)", 1),
 (CR+"vehicle-rules.md",
  "/docs/free-srd/core-rules/attributes/#dexterity)", "/docs/free-srd/core-rules/attributes/#dexterity-dex)", 1),
 (CR+"vehicle-rules.md",
  "/docs/free-srd/core-rules/attributes/#fortitude)", "/docs/free-srd/core-rules/attributes/#fortitude-fort)", 1),
 (CR+"vehicle-rules.md",
  "**Direct From Action Economy](/docs/free-srd/core-rules/action-economy/#speed):**",
  "**Direct from [Action Economy](/docs/free-srd/core-rules/action-economy/#speed):**", 1),
 (CR+"wounds--conditions.md",
  "/docs/free-srd/combat/#grapple", "/docs/free-srd/core-rules/stats/#grapple", 1),
 (IE+"generic-equipment.md", "(#sturdy-boots)", "(#reinforced-boots)", 1),
 (IE+"generic-equipment.md", "(#antitoxin--antidote)", "(#antitoxin)", 1),
 (IE+"generic-equipment.md", "(#compass)", "(#compass--navigational-tool)", 1),
 (IE+"generic-equipment.md", "(#shovel--entrenching-tool)", "(#shovel)", 1),
 (IE+"generic-equipment.md",
  "/docs/free-srd/inventory--equipment/item-tags/bulky)", "/docs/free-srd/inventory--equipment/item-tags/#bulky)", 1),
 (IE+"item-tags.md",
  "/docs/free-srd/the-basics/#supply-rolls", "/docs/free-srd/core-rules/basics/#supply-rolls", 1),
 (SF+"bots--drones/_index.md",
  "/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/hakr", "/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/trk-a", 1),
 (SF+"sci-fi-armor.md",
  "/docs/free-srd/inventory--equipment/medical-supplies/#altoa-radiation-antidote-5-ara-5",
  "/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#analgesic-radiation-antidote-5-ara-5", 1),
 (SF+"sci-fi-armor.md",
  "/docs/free-srd/inventory--equipment/medical-supplies/#pain-suppressant",
  "/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#pain-suppressant-injector", 1),
 (SF+"sci-fi-armor.md",
  "/docs/free-srd/inventory--equipment/medical-supplies/#vitaboost-injection",
  "/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#vitaboost-injector", 1),
 (SF+"sci-fi-misc-equipment.md", "(#communications)", "(#communication-devices)", 1),
 (SF+"sci-fi-misc-equipment.md",
  "/docs/free-srd/intentory--equipmemtlitem-tags/#battery", "/docs/free-srd/inventory--equipment/item-tags/#battery", 1),
 (SF+"sci-fi-weapons.md",
  "[Burn](/docs/free-srd/inventory--equipment/item-tags/#burn)", "[Burn](/docs/free-srd/core-rules/combat/#damage-types)", 2),
 (SF+"sci-fi-weapons.md",
  "[Shock](/docs/free-srd/inventory--equipment/item-tags/#shock)", "[Shock](/docs/free-srd/core-rules/combat/#damage-types)", 2),
]

fail = 0
for path, old, new, n in EDITS:
    full = REPO + path
    s = open(full).read()
    c = s.count(old)
    if c != n:
        print(f"FAIL {path}: expected {n} of {old[:60]!r}, found {c}")
        fail += 1
        continue
    open(full, "w").write(s.replace(old, new))
    print(f"ok   {path}: {old[:55]!r} x{n}")
if fail:
    sys.exit(1)
print("all edits applied")

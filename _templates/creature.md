---
title: "Station Guard"
description: "Station Guard — the routine security contractor a party runs into on any station, with a full stat block, for These Lucky Stars"
weight: 30
bookHidden: true
wip: true
id: creatures/station-guard
category: [sci-fi]
type: creature
tags: [creatures, npcs, sci-fi]
summary: "A competent, underpaid security contractor who fights to hold a door rather than to win."
---
# Station Guard

*Medium humanoid — Level 3 — station security contractor, armed and armoured, disinclined to die for the job*

| DEF | VIT | AP | Initiative | Stress Threshold | Speed |
|---|---|---|---|---|---|
| 8 | 3 | 4 | +7 | 2 | Ground 30ft (High) |

| STR | AGI | DEX | FORT | KNO | INS | CHA | WILL |
|---|---|---|---|---|---|---|---|
| 3 | 2 | 3 | 3 | 1 | 2 | 1 | 2 |

Every station runs on people like this one. They know the corridors, they know
which hatches stick, and they have read exactly enough of the contract to know
that dying on it pays the same as surviving it. A station guard will hold a door,
call for backup, and negotiate — in that order — and will take a bribe from
anyone who makes the offer sound like paperwork.

## Gear

[Combat Vest](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/#combat-vest) (+3 DEF, included above),
[Shock Baton](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/#shock-baton),
[Auto Pistol](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/#auto-pistol),
a coms unit, and a door key they are not supposed to carry off shift.

## Attacks

**Shock Baton** — ATK +3 (STR), melee 5ft, Physical *or* Shock. The guard leads
with Shock and switches to Physical only once someone has drawn on them.

**Auto Pistol** — ATK +3 (DEX), 20ft, Physical, ammo 1d6, Full-Auto.

## Features

**Grapple 5** — Guards are trained to put people on the deck rather than shoot
them, and will open with a grapple against an unarmed opponent.

**Call It In** — 1 AP. The guard reports the party's position. Two more guards
arrive in 1d4 rounds. A guard who has not yet used this will almost always use
it before attacking.

**Not Paid Enough** — When the guard drops to 1 VIT, they make a WILL check
against target 8. On a failure they disengage, surrender, or run — GM's choice,
whichever is least convenient for the party.

<!--
A CREATURE PAGE. This is a whole page that is also a block: it lives under
content/docs/free-srd/creatures--npcs/<setting>/, and carries page frontmatter
(description, weight, bookHidden) alongside the block keys (id, category, type,
tags, summary). Races and the bot platforms work the same way.

Use this when the creature is substantial enough to stand alone and will grow —
artwork, lore, variants. blocks.json records `home: page`, and {{< blockset >}}
LINKS these rather than inlining them. For a creature small enough to sit in a
list beside five others, use creature-snippet.md instead.

THE STAT BLOCK IS TWO SINGLE-ROW TABLES, in this order and no other:
  1. derived stats — DEF | VIT | AP | Initiative | Stress Threshold | Speed
  2. the eight attributes, always all eight, always in sheet order:
     STR | AGI | DEX | FORT | KNO | INS | CHA | WILL

Nothing here is a shortcode on purpose. Plain markdown tables render the same on
the site and in the PDF builder, so a stat block needs no entry in
assets/content-constructs.css and can never fail preflight check 5.
vehicle.md uses the same two-table shape, so the two read as one family — keep
them in step if you change either.

WORK THE NUMBERS OUT, do not eyeball them. Everything in table 1 is derived from
table 2 plus gear:
  DEF   = AGI + FORT + gear      (this guard: 2 + 3 + 3 from the vest = 8)
  VIT   = ½ Level + ½ FORT, total rounded down
  AP    = 4 unless something says otherwise
  Init  = AGI + DEX + INS
  Stress Threshold = ½ Level + ½ WILL, total rounded down
  Speed = 20 + 5 per AGI bonus, or −5 flat for any AGI penalty
  Grapple = STR + AGI — put it under Features, it is only sometimes relevant
An attribute value IS its bonus. Null attributes are written [-N-] and cannot be
raised or lowered. Size is a NAMED size (Tiny/Small/Medium/Large/Huge) and rides
in the descriptor line — vehicles are the ones measured in spaces.

Size also shifts STR/AGI/Grapple/Stealth and sets the damage die. If the creature
is not Medium, apply the modifiers from /docs/free-srd/core-rules/size/ to the
attributes you write down rather than leaving a reader to do it.

Gear links point at the item's live anchor, so a reader can price the encounter.
Do not restate item stats here beyond ATK, range and damage type — the item block
is the source of truth and this would drift from it.

NO `## Related` SECTION. This page is a block, and a Related list printed into a
PDF sends the reader to a site they do not have. Related belongs to shell pages
only. The same goes for any "on this page" opening line.

Then: list it on the setting's creatures--npcs/<setting>/_index.md — those index
lists are hand-written on purpose — and run builddata.py.

Delete this comment.
-->

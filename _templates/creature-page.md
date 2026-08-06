---
title: "HEL-1"
description: "HEL-1 — a small flying drone for These Lucky Stars sci-fi settings"
bookHidden: true
wip: true
id: bots/hel-1
category: [sci-fi]
type: creature
tags: [bots, drones]
summary: "A small flying drone built for aerial reconnaissance."
---

# HEL-1

A small flying drone designed for aerial reconnaissance and light operations.
Two or three sentences a GM can read aloud the first time the party meets one —
what it looks like, what it is doing there, why it matters.

{{% statblock type="Small Drone — 1 space" %}}
> **DEF** 3 · **VIT** 2 · **AP** 4 · **Stress Threshold** —
>
> **Speed** Fly 35ft (High, 20ft/round)
>
> **Initiative** +8 · **Grapple** +0 · **Stealth** +2 (Small)

| STR | AGI | DEX | FORT | KNO | INS | CHA | WILL |
|---|---|---|---|---|---|---|---|
| −1 | 3 | 2 | 0 | 1 | 3 | [-N-] | [-N-] |

---

**Attacks**

- **Ram** — 2 AP · ATK +3 (AGI) · 1d8 + 3 Physical · reach 5ft. The HEL-1 takes 1 DEF of the same damage on a hit.

---

**Features**

- **Aerial Optics** — +3 on INS checks to spot or track a target while airborne.
- **Power Source** — Small [Battery](/docs/free-srd/inventory--equipment/item-tags/#battery), tracked with supply rolls like any other battery-powered machine.
- **Master Protocol** — A drone executes commands and cannot improvise. Anything outside its instructions needs a new order from its handler.
{{% /statblock %}}

## Tactics

Keeps altitude and distance, calls contacts in rather than engaging, and rams
only when cornered or ordered to. Withdraws toward its handler when Damaged.

## Encounter Notes

**Found** — Station approaches, survey camps, escort work, salvage wrecks.

**Organization** — Alone, in pairs, or one per handler.

**Scaling** — Say here what a tougher or weaker version changes, in one line
each. It saves a GM re-statting the thing to reskin it.

<!--
THE PRIMARY CREATURE TEMPLATE. Most creatures and NPCs get their own page, so
start here; creature.md is the variant for one that shares a page with siblings.

A PAGE that is also a block. It lives in content/docs/, not content/snippets/,
and carries page frontmatter (description, bookHidden) alongside the block keys.
Races and the four bot platforms work this way. blocks.json records `home: page`,
and {{< blockset >}} LINKS these rather than inlining them.

bookHidden keeps it out of the nav while staying searchable and linkable; the
section index for its setting lists it by hand, next to a `*(TBD)*` line for what
is not written yet. That is an organisational choice, unrelated to wip.

THE PAGE STRUCTURE IS DELIBERATE, and it is the 3.5e monster page's:
  h1  ->  the name, matching `title` exactly (the theme prints no title itself)
  prose -> what a GM reads aloud; flavour, not mechanics
  card  -> every number, in one bordered unit
  Tactics / Encounter Notes -> how to actually run it

THE CARD NAMES ITSELF, so the name appears in the h1 and again in the card
header. That is intended and it is what the reference books do — the card has to
survive being pulled into a PDF on its own, where no page heading follows it.

THE NUMBERS HERE ARE PLACEHOLDERS — HEL-1 has no canonical stats yet. Every
derivation is written out in creature.md's comment; read that before filling
this in. For a FILLED-IN REAL ONE to copy the shape from, see
content/docs/free-srd/creatures--npcs/sci-fi/station-guard.md.

Two that bite on machines:
  - Null [-N-] attributes are effectively 0 and cannot be raised or lowered. A
    drone has no CHA or WILL, and with a null WILL there is no Stress Threshold
    to compute — the entry reads `—` rather than a number.
  - Bots and drones use the CHARACTER DEF/VIT rules, not object durability. They
    take wounds and conditions and are repaired rather than broken, with a Repair
    or Tech Kit instead of a Med Kit. bots/automated-machines says so, and it is
    easy to get backwards.

BEFORE YOU WRITE A BONUS OR AN ADVANTAGE, read `design-notes.md`. It carries the
game-mechanic check that this comment does not: how big the effect should feel,
and whether it ASSISTS a skill (advantage) or REPLACES a faculty (flat bonus).
This file is about site structure; that one is about whether the number is the
right number.

Delete this comment.
-->

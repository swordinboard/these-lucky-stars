---
title: "HEL-1"
description: "HEL-1 — a small flying drone for These Lucky Stars sci-fi settings"
weight: 30
bookHidden: true
wip: true
id: bots/hel-1
category: [sci-fi]
type: creature
tags: [bots, drones]
summary: "A small flying drone built for aerial reconnaissance."
---

# HEL-1

*Small Drone — 1 space*

A small flying drone designed for aerial reconnaissance and light operations.
Two or three sentences a GM can read aloud the first time the party meets one.

## Stat Block

> **DEF** 3 · **VIT** 2 · **AP** 4 · **Stress Threshold** —
>
> **Speed** Fly 35ft (High, 20ft/round)
>
> **Initiative** +8 · **Grapple** +0 · **Stealth** +2 (Small)

| STR | AGI | DEX | FORT | KNO | INS | CHA | WILL |
|---|---|---|---|---|---|---|---|
| −1 | 3 | 2 | 0 | 1 | 3 | [-N-] | [-N-] |

## Attacks

**Ram** — 2 AP · ATK +3 (AGI) · 1d8 + 3 Physical · reach 5ft. The HEL-1 takes
1 DEF of the same damage on a hit.

## Features

**Aerial Optics** — +3 on INS checks to spot or track a target while airborne.

**Power Source** — Small [Battery](/docs/free-srd/inventory--equipment/item-tags/#battery),
tracked with supply rolls like any other battery-powered machine.

**Master Protocol** — A drone executes commands and cannot improvise. Anything
outside its instructions needs a new order from its handler.

## Tactics

Keeps altitude and distance, calls contacts in rather than engaging, and rams
only when cornered or ordered to. Withdraws toward its handler when Damaged.

## Encounter Notes

**Found** — Station approaches, survey camps, escort work, salvage wrecks.

**Organization** — Alone, in pairs, or one per handler.

<!--
A PAGE that is also a block. It lives in content/docs/, not content/snippets/,
and carries page frontmatter (description, weight, bookHidden) alongside the
block keys. Races and the four bot platforms work this way. blocks.json records
`home: page`, and {{< blockset >}} LINKS these rather than inlining them,
because a whole page is too big to repeat.

Use this only when the creature will grow — artwork, lore, variants, its own
gear. For a creature that belongs on a shared page with its siblings, use
creature.md, which is the more common case.

THIS ONE OWNS ITS HEADING, and it is the only kind of block that should. Every
page opens with an h1 matching its title exactly, because the theme does not
print the title itself on desktop. That is why internal headings here start at
h2 — on a snippet they would still start at h2, but for the opposite reason.

bookHidden keeps it out of the nav while staying searchable and linkable; the
section index for its setting lists it by hand, next to a `*(TBD)*` line for
platforms not yet written. That is an organisational choice, unrelated to wip.

THE NUMBERS ARE PLACEHOLDERS — HEL-1 has no canonical stats yet. Every
derivation is spelled out in creature.md's comment; read that one before
filling this in. The two that bite on machines:

  - Null [-N-] attributes are effectively 0 and cannot be raised or lowered.
    A drone has no CHA or WILL. With a null WILL there is no Stress Threshold
    to compute, so the entry reads `—` rather than a number.
  - Bots and drones use the CHARACTER DEF/VIT rules, not object durability.
    They take wounds and conditions, and are repaired rather than broken —
    with a Repair or Tech Kit instead of a Med Kit. This is stated in
    bots/automated-machines and is easy to get backwards.

Delete this comment.
-->

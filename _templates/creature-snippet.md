---
title: "Vent Rat"
id: creatures/vent-rat
category: [core]
type: creature
tags: [creatures, vermin]
summary: "Small station vermin that swarms, bites, and flees the moment one of them dies."
---

*Small vermin — Level 1 — appears in packs of 2d6, brave only in numbers*

| DEF | VIT | AP | Initiative | Stress Threshold | Speed |
|---|---|---|---|---|---|
| 5 | 1 | 4 | +8 | 1 | Ground 40ft (High) |

| STR | AGI | DEX | FORT | KNO | INS | CHA | WILL |
|---|---|---|---|---|---|---|---|
| 0 | 4 | 1 | 1 | 0 | 3 | 0 | 1 |

Whatever the rats were before a century of station food waste, they are this
now: fast, hungry, and entirely willing to test whether a sleeping character is
food. They live behind the panels and come out for the smell of an opened
ration.

## Attacks

**Bite** — ATK +0 (STR), melee 5ft, Physical.

## Features

**Swarm** — Vent rats occupy the same space as their target while attacking, as
Tiny and Small creatures may. Every rat past the first attacking the same target
in a round gives that attack a minor advantage.

**Scatter** — The first time a rat in the pack drops to 0 VIT, every other rat
spends its next turn moving away from the party at full Speed. They come back.

<!--
A CREATURE SNIPPET — the outlier form. Most creatures get their own page
(creature.md); use this one when the creature is small enough that a page would
be mostly whitespace, and it belongs in a list beside five siblings.

NO TITLE HEADING. The call site supplies it, at whatever level that page wants:
  {{< blockdetails "creatures/vent-rat" >}}          — in a collapsible
  {{% include "/snippets/creatures/vent-rat" "h3" %}} — bare, at h3
blocks.json records `owns_heading: false`, which makes `title` load-bearing —
it is the name a reader actually sees.

Internal headings are authored at h2 (`## Attacks`, `## Features`) and the
include shifts them to sit one level below wherever the block lands. Author them
at h2 or they arrive at the wrong depth. Do not skip a level, and do not put a
second h1-equivalent in here.

Everything else — the descriptor line, the two single-row tables, the order of
their columns, how each number is derived — is identical to creature.md. Read
the long comment there rather than duplicating it; a creature that starts as a
snippet and grows into a page should only need the frontmatter changed.

The one difference worth stating: NO page frontmatter. No description, no
weight, no bookHidden. This file is a snippet under content/snippets/creatures/,
and content/snippets/_index.md already stops it publishing.

Then: put it on a page. A snippet nobody includes is invisible on the site and
fails preflight check 6, even though it is already in the PDF builder's library.
Run builddata.py afterwards.

Delete this comment.
-->

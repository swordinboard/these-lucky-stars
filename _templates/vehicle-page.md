---
title: "Speeder Bike"
description: "Speeder Bike — a single-rider repulsor bike for These Lucky Stars sci-fi settings, with a full stat block, handling notes and encounter notes."
bookHidden: true
wip: true
id: vehicles/speeder-bike
category: [sci-fi]
type: vehicle
tags: [vehicles, sci-fi]
summary: "Open-frame repulsor bike. Size 2, one rider, no cover, fast enough to be a problem."
---

# Speeder Bike

Two metres of frame, a repulsor plate and a throttle. No armour, no cabin, no
crumple zone — the design assumes anything it cannot outrun is the rider's
problem rather than the machine's. It hovers a hand's width off the deck, so it
does not care what the ground is made of, and it turns as tightly at speed as it
does parked. That last part is what kills people.

{{% statblock type="Ground Vehicle — Size 2 (2 spaces)" %}}
> **Cost** --Cr · **Object DEF** 12 · **VIT** 3 · **Cargo** 20lbs (saddlebags)
>
> **Speed** Ground 400ft (High, 100ft/round)
>
> **Occupants** driver + 1 · **Cover** none (open frame)
>
> **Collision** 2d6 + speed modifier · **Ignition** 1 AP
>
> **Proficiency** [Vehicle [Speeder]](/docs/free-srd/character-creation/proficiencies/#vehicle) · **Power** [Battery [Large]](/docs/free-srd/inventory--equipment/item-tags/#battery)

---

**Features**

- **Repulsor Lift** — Rides a hand's width off the deck. Ignores difficult ground terrain and open water, and crosses rubble, sand or ice unpenalised. It cannot climb: anything above roughly waist height is a wall, not a ramp.
- **Open Frame** — Neither rider nor passenger gets cover from any angle, and neither can break line of sight behind it. In exchange it is an open vehicle for [Boarding & Bailing](/docs/free-srd/core-rules/vehicle-rules/#boarding--bailing) — mounting and bailing need no extra room.
- **Steering Vanes** — The two forward vanes are the fragile part. An attack that deliberately targets one is a target 10 [Shatter](/docs/free-srd/core-rules/combat/#aggressive-actions); a hit drops maneuverability to Low (4) until repaired, whatever the bike's VIT still says.
- **Dead Rider's Cutout** — If the rider leaves the saddle for any reason — bailing, thrown, dead — the throttle cuts and the bike decelerates to a stop rather than carrying on under power. A passenger cannot reach the controls.
{{% /statblock %}}

## Driving It

The Drive check is **AGI**, not DEX: a bike is steered with the whole body, which
is the same call the rules make for motorcycles and mounts. An untrained rider
takes a minor disadvantage on every check to operate it.

At 100ft/round of acceleration it needs four Drive actions to reach its full 400ft
— and two to shed it, since a vehicle decelerates twice as fast as it accelerates.
A GM running a chase should track that ramp rather than letting the bike open at
top speed; the four rounds getting there are most of the scene.

High maneuverability means the turning arc is Size plus speed tier and nothing
else, so the bike out-turns anything it shares a corridor with. Losing a vane
takes that away mid-chase, which is the interesting way for this thing to break.

## Encounter Notes

**Found** — Courier work, dust-side depots, anywhere with more distance than
road. Common enough to be stolen without much fuss.

**Who Has Them** — Couriers, scouts, outriders escorting something slower, and
whoever is chasing the party through a cargo bay.

**Scaling** — A racing frame is the same block at 600ft and Object DEF 8. An
armoured patrol version drops to 250ft, takes Object DEF 20, and gives its rider
partial cover from the front.

<!--
A VEHICLE ON ITS OWN PAGE — the page-layout form, the same shape creature-page.md
gives a creature. Use it when the vehicle is a set piece the party will meet,
steal, or live out of. For one that is set dressing beside five siblings, use
vehicle.md, which is the snippet form and holds the full derivation notes.

The two forms differ only in frontmatter and the h1. Everything inside the card —
the blockquote lines, their order, the `---` bands, the bold labels — is
identical, so promoting a snippet to a page is a frontmatter edit and nothing
else.

A PAGE that is also a block: it lives in content/docs/, not content/snippets/,
and carries page frontmatter (description, bookHidden) alongside the block keys.
blocks.json records `home: page`, and {{< blockset >}} LINKS these rather than
inlining them. bookHidden keeps it out of the nav; the section index lists it by
hand.

THE PAGE STRUCTURE MIRRORS creature-page.md, deliberately:
  h1       -> the name, matching `title` exactly
  prose    -> what a GM reads aloud; what it looks like, not what it rolls
  card     -> every number, in one bordered unit
  Driving It / Encounter Notes -> how to actually run it

Those last two are the vehicle's answer to a creature's Tactics and Encounter
Notes, and they earn their place for the same reason: the numbers say what the
bike IS, and a GM needs to know how it BEHAVES. Acceleration in particular is
invisible in the stat line and decides the shape of every chase.

THE CARD NAMES ITSELF, so the name appears in the h1 and again in the card
header. Intended — the card has to survive being pulled into a PDF alone, where
no page heading follows it.

SECTIONS INSIDE THE CARD ARE `---` AND BOLD LABELS, NEVER HEADINGS. Two vehicles
on one page would both emit id="features", verbatim and un-suffixed, because the
card arrives through the shortcode as finished HTML and Hugo only de-duplicates
headings it renders itself. Outside the card, Driving It and Encounter Notes are
real h2s and that is fine — they belong to the page.

EVERY VALUE IS DERIVED. vehicle.md's comment carries the full list — size in 5ft
spaces, object DEF from the material table, VIT 3, the speed descriptor,
occupants, cover, collision dice, ignition, proficiency. Two worth repeating
because they are the ones that get written as if a vehicle were a creature:

  - Object DEF DOES NOT RESET. A creature's DEF comes back at the end of a
    fight; a vehicle's stays down until it is repaired. Same number, opposite
    behaviour.
  - A vehicle has NO ATTRIBUTES, no AP and no initiative of its own, so there is
    no attribute table in this card and no Attacks band. It moves on its driver's
    turn, and its occupants each roll their own initiative. If the thing has
    attributes and can refuse an order, it is a mount — stat it as a creature.

Then: list it on the section index by hand, and run builddata.py.

BEFORE YOU WRITE A BONUS OR AN ADVANTAGE, read `design-notes.md`. It carries the
game-mechanic check that this comment does not: how big the effect should feel,
and whether it ASSISTS a skill (advantage) or REPLACES a faculty (flat bonus).
This file is about site structure; that one is about whether the number is the
right number.

Delete this comment.
-->

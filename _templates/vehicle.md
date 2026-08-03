---
title: "Speeder Bike"
description: "Speeder Bike — a single-rider repulsor bike with a full vehicle stat block, for These Lucky Stars sci-fi settings"
weight: 30
bookHidden: true
wip: true
id: vehicles/speeder-bike
category: [sci-fi]
type: vehicle
tags: [vehicles, sci-fi]
summary: "An open-frame repulsor bike that trades every scrap of protection for speed."
---
# Speeder Bike

*Size 2 vehicle — open-frame repulsor bike — one rider, one passenger, no protection whatsoever*

| DEF | VIT | Occupants | Cover | Collision | Ignition |
|---|---|---|---|---|---|
| 12 | 3 | 1 rider + 1 passenger | None | 2d6 + Speed modifier | 1 AP |

| Mode | Distance | Maneuverability | Acceleration |
|---|---|---|---|
| Ground (repulsor) | 400 ft | High (0) | 100 ft/round |

Two metres of frame, a repulsor plate, and a throttle. A speeder bike carries no
armour, no cabin and no crumple zone, on the theory that anything it cannot
outrun is a problem for the rider rather than the machine. It hovers a few feet
off the deck, which means it does not care what the ground is made of, and it
turns as tightly at 400 feet a round as it does parked — which is the part that
kills people.

## Driving It

**Drive Check** — AGI. A speeder bike is steered with the whole body, the same
way the rules treat motorcycles and mounts, not with the precise-steering DEX
used for cars and trucks.

**Proficiency** — [Vehicle](/docs/free-srd/character-creation/proficiencies/#vehicle)
[Speeder]. An untrained rider suffers disadvantage on every check to operate it.

**Ignition** — 1 AP. Thumb the starter; the plate is live by the time the rider
is astride it.

**Acceleration** — 100 ft/round, so four rounds of Drive actions to reach the
full 400 ft — and two rounds to stop from it.

## Features

**Repulsor Lift** — The bike floats roughly three feet off the deck. It ignores
difficult ground terrain and open water entirely, and takes no penalty crossing
rubble, sand or ice. It cannot climb: anything taller than about waist height is
a wall, not a ramp.

**Open Frame** — Riders get no cover from the bike at any angle, and neither
rider nor passenger can use it to break line of sight. In exchange, boarding and
bailing need no extra room — treat the bike as an open vehicle for
[Boarding & Bailing](/docs/free-srd/core-rules/vehicle-rules/#boarding--bailing).

**Steering Vanes** — The two forward vanes are the fragile part. An attack that
deliberately targets a vane hits at target 10; a hit drops the bike's
maneuverability to Low (4) until it is repaired, whatever the bike's VIT says.

**Dead Rider's Cutout** — If the rider leaves the saddle for any reason — bailing,
being thrown, dying — the throttle cuts and the bike coasts to a stop at its
deceleration rate rather than continuing under power. Passengers cannot reach the
controls.

<!--
A VEHICLE PAGE. Same setup as a creature page (creature.md): a whole page that is
also a block, carrying page frontmatter (description, weight, bookHidden)
alongside the block keys. Use it when the vehicle is substantial enough to stand
alone. For one that belongs in a list beside five siblings, use
vehicle-snippet.md.

`type: vehicle` is its own type, beside creature. Vehicles are objects, not
creatures — they have no attributes, no AP, no initiative of their own — so
filtering them apart is worth a type rather than only a tag.

THE STAT BLOCK IS TWO SINGLE-ROW TABLES, matching creature.md position for
position. Table 1 is the derived stats; table 2 is whatever that kind of thing is
actually made of — the eight attributes for a creature, the movement modes for a
vehicle. Keep the two templates in step if you change either.

  1. DEF | VIT | Occupants | Cover | Collision | Ignition
  2. Mode | Distance | Maneuverability | Acceleration    (one row per mode)

Plain markdown tables on purpose: they render identically on the site and in the
PDF builder, so a stat block needs nothing in assets/content-constructs.css and
cannot fail preflight check 5.

WHERE EACH NUMBER COMES FROM — all of it is in
/docs/free-srd/core-rules/vehicle-rules/, and none of it should be invented:

  Size      the LONGEST length of the vehicle in 5ft spaces, and it rides in the
            descriptor line, not the table. A 10ft bike is Size 2. This one
            number drives both collision dice and maneuverability, so get it
            right first — creatures use named sizes instead, and vehicles never
            do.
  DEF       object DEF: structural resistance, NOT an ability to dodge. It does
            not reset at the end of combat the way a character's does — damage
            persists until repaired. Estimate it from the material tables on
            /docs/free-srd/core-rules/damaged--broken-gear/#material-def.
  VIT       3 for almost everything, per object durability. 2 VIT is Damaged,
            0 VIT is Broken. Fragile/Durable move the maximum, not the stages.
  Occupants driver plus passengers, counted separately — the driver is the one
            who spends AP on Drive and takes disadvantage on everything else.
  Cover     what the vehicle gives its OCCUPANTS: Full (enclosed) / Partial /
            None (open). Mounts always give None.
  Collision (1d6 per space) + Speed modifier, so the dice count is just Size.
            Write the formula, not a rolled number — the speed modifier is
            +0/+3/+7/+12 and changes shot to shot.
  Ignition  the AP cost, or the number of rounds, to start it. Say so even when
            the answer is "none" — the rules send readers here for it.

The movement table is the Speed descriptor format spelled out one field per
column: Mode Distance (Base Maneuverability, Acceleration). Maneuverability is
High (0) / Medium (2) / Low (4) and is a BASE — a reader adds Size and speed tier
to get a turning radius, so do not pre-add them. Leave a cell blank only if the
value is genuinely null, which means "no limit": a blank maneuverability turns in
place, a blank acceleration reaches full speed in one Drive action. Give a vehicle
one row per mode it can travel in.

Drive check attribute, proficiency and ignition go in prose under "Driving It",
because each is a sentence rather than a number. AGI is for whole-body control
(bikes, mounts); DEX is for precise steering (cars, trucks).

NO `## Related` SECTION, for the same reason as creature.md: this page is a
block, and a Related list printed into a PDF points at a site the reader does not
have.

Then: list it on the vehicles/<setting>/_index.md by hand, and run builddata.py.

Delete this comment.
-->

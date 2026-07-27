---
title: "Collision Damage"
id: vehicles/collision-damage
category: [core]
type: rule
tags: [vehicles]
headless: true
---

> Collision Damage = (1d6 per vehicle space) + Speed modifier

A single formula handles all damage dealt by a vehicle's contact with a creature or object, whether that contact is a high-speed impact or a slow, inexorable crushing. Collision damage is rolled per object. When a large creature is struck by a car, the creature rolls the damage it is dealt and the driver of the car rolls the damage that the car and its occupants are dealt.

Damage type is [Physical](/docs/free-srd/core-rules/combat/#damage-types).

**Number of Dice** — The vehicle rolls one d6 for each space it occupies. A motorcycle (1 space) rolls 1d6. A car (2 spaces) rolls 2d6. A truck (4 spaces) rolls 4d6. A bus (6 spaces) rolls 6d6. This scales linearly with the vehicle's physical footprint, all the way up to massive craft — a small spaceship occupying 16 spaces rolls 16d6.

**Speed Modifier** — The flat bonus from the [Speed Tiers](#speed-tiers) table (+0 / +3 / +7 / +12).

**Why One Formula for Both Impact and Overrun**

The damage a vehicle deals to a creature can come from two different physical realities, and the formula above represents both at once.

*Impact* is kinetic — the target is struck by a moving mass with significant force. A motorcycle at high speed hitting a pedestrian delivers most of its damage as impact, even though the motorcycle itself isn't particularly heavy. The speed modifier represents this kinetic energy.

*Overrun* is crushing — the target is caught under, pinned by, or dragged along by a vehicle too massive to resist or avoid. A truck rolling forward at walking speed can still inflict devastating damage by running over a foot, pinning someone against a wall, or pulling them under its wheels. The dice count (scaling with vehicle spaces) represents this mass.

Most real collisions involve a mix of both. A car at moderate speed hitting a pedestrian delivers some damage from impact (the initial strike) and some from overrun (being thrown, dragged, or pinned afterward). The GM describes the damage narratively according to what happened, but mechanically it's all resolved through the same roll.

This is why a slow-moving large vehicle still deals meaningful damage even with no speed modifier — the dice represent the crushing weight of the vehicle, which doesn't go away just because the vehicle is barely moving. It's also why a fast motorcycle deals meaningful damage despite its small size — the speed modifier represents the kinetic energy of the strike, which doesn't require mass to be dangerous.

> **Example — Truck crushes pedestrian.** A size 4 truck is slowly backing up (Slow speed) and a pedestrian is caught under its wheels. Damage is 4d6 + 0, averaging 14. The GM describes this as the pedestrian being pinned and dragged by the truck's weight — overrun, not impact. The character takes significant damage despite the truck barely moving.

#### Damage to the Vehicle

The striking vehicle takes **collision damage** from an impact/overrun **only** if the target is of comparable size or larger than the vehicle. A car striking a pedestrian takes no damage. A car striking another car, a wall, or a Large creature takes damage equal to the collision damage (rolled separately).

#### Collision & Occupants

Occupants of any vehicle involved in a collision may make a **[FORT](/docs/free-srd/core-rules/attributes/#fortitude-fort) check** to brace against an impact — on a success, the occupant takes half damage.

> Target to Brace = 6 + Speed modifier

> **Example** — A size 2 car moving at Moderate speed strikes a wall. Collision damage is **2d6 + 3**, dealt to the vehicle, the wall, and each occupant. An occupant who succeeds on a target 9 FORT check takes half.


---

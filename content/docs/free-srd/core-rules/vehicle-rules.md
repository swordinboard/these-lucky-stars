---
title: "Vehicle Rules"
weight: 84
bookHidden: true
---

## Vehicle Rules

These rules govern how vehicles and their occupants interact with characters on foot during combat. They supplement the standard [combat rules](/docs/free-srd/core-rules/combat/) — unless otherwise stated here, all normal combat rules apply.

> [!IMPORTANT]
> Vehicles include any mode of transport a character can ride or pilot, from living mounts to mechanical transports.

A vehicle has its own stat block that defines its size (in spaces), speed, and any special features. 

### Vehicle Size

A vehicle's size is described by its footprint, the number of spaces it occupies.

### Speed

> [!Note]
> Because these rules deal closely with movement and Speed, this section includes many of the Speed rules as found on the [Stats](/docs/free-srd/core-rules/stats/#speed) page for convenience. Speed works the same for vehicles as it does for characters, and use Speed Tier Modifiers for a range of calclations.

#### Speed tiers

Many vehicle rules reference the vehicle's current **speed tier**. Speed tiers are universal across all vehicles and characters, and each tier carries a **speed modifier** used as a flat bonus to damage and to determine check targets for vehicle interactions.

> [!IMPORTANT]
> Base targets for vehicle interactions (dive, board, bail, dodge) are calculated as **6 + the speed modifier**: > 
> - 6 at Slow
> - 10 at Moderate
> - 14 at Fast
> - 18 at Very Fast.

Speed tiers apply to any moving target, not only vehicles. A character on foot at sprint using special abilities may push into Moderate or higher speed. The tier vocabulary is the same regardless of what is moving.

{{% include "/snippets/speed-tiers" %}}

#### Modes and Maneuverability

{{% include "/snippets/speed-descriptors" %}}

---

### Vehicle Actions

Vehicles primarily introduce variations of the [Move](/docs/free-srd/core-rules/action-economy/#movement-actions) action. Drive is simply directing a Move, and Board and Bail interact with the existing Move action directly. All other combat actions work as normal whether a character is on foot, a passenger, or the driver.

> [!IMPORTANT]
> **Driver Actions**
> Actions other than Drive and Bail taken by the driver of a vehicle are at a *disadvantage*, reflecting the attention required to pilot/drive a vehicle.

#### Drive

Pilot/drive the vehicle. The driver spends 2 AP and declares a path within the vehicle's current movement range and the vehicle moves along that path. Success may be determined by the complexity of the path, requiring Drive checks for tight turns or other difficult maneuvers. The driver must have the appropriate vehicle proficiency to drive without penalty — an untrained driver suffers disadvantage on all checks related to operating the vehicle (including [mounts](#mounts)). Once a vehicle is moving it will continue to travel in the chosen direction upon the driver's next turn at the designated speed unless stopped/slowed by the driver as part of a Drive action, or acted upon by an external force such as a collision.

#### Boarding & Bailing

A character may attempt to board or bail from a moving vehicle for **2 AP**, or as part of a **[Move](/docs/free-srd/core-rules/action-economy/#movement-actions) action for no additional AP**.

**Board** — The character must be adjacent to or in the path of the vehicle. Make an **AGI check against the vehicle's speed target** (6 + speed modifier). On a success, the character is now an occupant of the vehicle. On a failure, the character remains where they are.

**Bail** — The character is an occupant of the vehicle. Make an **AGI check against the vehicle's speed target**. On a success, the character lands safely in an unoccupied space adjacent to the vehicle's path. On a failure, the character lands [**prone**](/docs/free-srd/core-rules/wounds--conditions/#prone) in an adjacent space and takes damage equal to the vehicle's impact/overrun dice (without the speed bonus).

Boarding a stationary vehicle or bailing from a stationary vehicle requires no check and happens as part of a normal Move action.

---

### Initiative and Occupants

Every character rolls [Initiative](/docs/free-srd/core-rules/stats/#initiative) individually, whether they are on foot, driving a vehicle, or a passenger inside one. There is no grouped initiative for vehicle occupants.

A vehicle moves only on the driver's turn. Passengers whose turns come before the driver act from the vehicle's current position. Passengers whose turns come after the driver act from the vehicle's new position. A passenger who wants to act from a specific position relative to the driver's movement can use a [Readied Action](/docs/free-srd/core-rules/action-economy/#readied-actions) to wait for the driver's turn.

---

### Cover from Vehicles

The [cover](/docs/free-srd/core-rules/combat/#use-cover) a vehicle provides to its occupants depends on its construction, which is specified in the vehicle's stat block. Enclosed vehicles typically provide [full cover](/docs/free-srd/core-rules/combat/#use-cover) from most angles. Open vehicles provide partial cover or none at all. Mounts provide no cover to their riders.

---

### Impact and Overrun (Movement Consequence)

When a vehicle's path passes through a creature's space, the creature is in the vehicle's way. This is not an attack — it is a consequence of movement. The rules below resolve what happens, and who rolls what, based on whose intent created the situation.

#### Scenario A — The Driver Chose the Path

If the driver declares a Drive path that deliberately passes through a creature's space, no driver check is required. The driver intended the collision and the vehicle proceeds along its path.

The creature in the path may attempt to dodge as a reaction. A creature who has not yet acted in initiative is caught by [surprise](/docs/free-srd/core-rules/combat/#surprise-attacks) and makes the dodge at a  [minor disadvantage](/docs/free-srd/core-rules/basics/#advantage) for vehicles moving at Slow and Moderate Speeds, and at a [major disadvantage](docs/free-srd/core-rules/basics/#advantage) for those moving at Fast and Very Fast Speeds.

A creature eligible to dodge makes an **AGI check** against the vehicles speed and size (see below). On a success, they move to an unoccupied adjacent space outside the vehicle's path and take no damage. On a failure, they suffer the full impact/overrun damage and are knocked [prone](/docs/free-srd/core-rules/wounds--conditions/#prone). The vehicle continues along its declared path in either case.

> Target to Dodge a Vehicle = 6 + vehicle's Speed modifier + number of spaces character is required to move.

#### Scenario B — A Hazard Appeared in the Path

If a creature, object, or other obstacle unexpectedly enters the driver's declared path mid-movement — through a [Readied Action](/docs/free-srd/core-rules/action-economy/#readied-actions), sudden visibility, another character's movement, or any other circumstance the driver did not anticipate — the driver makes a check to react.

The GM selects the appropriate check based on the vehicle type and situation. Common choices are [AGI](/docs/free-srd/core-rules/attributes/#agility) (for mounts, motorcycles, and vehicles requiring whole-body control), [DEX](/docs/free-srd/core-rules/attributes/#dexterity) (for cars, trucks, and vehicles requiring precise steering). The driver's vehicle proficiency and any relevant abilities (such as Licensed Instincts) apply to this check.

> Target to Avoid Collision = 6 + the vehicle's Speed modifier + the vehicle's maneuverability rating

On a **success**, the driver controls the vehicle enough to avoid the incident. Most vehicles small vehicles have enough room within a space to dodge a hazard without requiring a change to the declared path. in soke cases, the path must be altered to avoid incident, possibly shortening the total distance travelled.

On a **failure**, the GM determines what happens based on the situation:

- The vehicle swerves and loses control, possibly triggering a **Collision with  a static object** (see below).
- The vehicle strikes the obstacle and is forced to a stop, dealing impact/overrun damage to the obstacle and taking damage itself if the obstacle is of comparable size or larger.

The choice between these failure outcomes is narrative — a motorcycle might lay down in a partially controlled slide, while a car at speed might slam into a barrier.

---

### Collision Damage

> Collision Damage = (1d6 per vehicle space) + Speed modifier

A single formula handles all damage dealt by a vehicle's contact with a creature or object, whether that contact is a high-speed impact or a slow, inexorable crushing. Collision damage is rolled per object. When a large creature is struck by a car, the creature rolls the damage it is dealt and the driver of the car rolls the damage that the car and its occupants are dealt.

Damage type is [**Physical**](/docs/free-srd/core-rules/combat/#damage-types).

**Number of Dice** — The vehicle rolls one d6 for each space it occupies. A motorcycle (1 space) rolls 1d6. A car (2 spaces) rolls 2d6. A truck (4 spaces) rolls 4d6. A bus (6 spaces) rolls 6d6. This scales linearly with the vehicle's physical footprint, all the way up to massive craft — a small spaceship occupying 16 spaces rolls 16d6.

**Speed Modifier** — The flat bonus from the [Speed Tiers](#speed-tiers) table (+0 / +3 / +7 / +12).

**Why One Formula for Both Impact and Overrun**

The damage a vehicle deals to a creature can come from two different physical realities, and the formula above represents both at once.

*Impact* is kinetic — the target is struck by a moving mass with significant force. A motorcycle at high speed hitting a pedestrian delivers most of its damage as impact, even though the motorcycle itself isn't particularly heavy. The speed modifier represents this kinetic energy.

*Overrun* is crushing — the target is caught under, pinned by, or dragged along by a vehicle too massive to resist or avoid. A truck rolling forward at walking speed can still inflict devastating damage by running over a foot, pinning someone against a wall, or pulling them under its wheels. The dice count (scaling with vehicle spaces) represents this mass.

Most real collisions involve a mix of both. A car at moderate speed hitting a pedestrian delivers some damage from impact (the initial strike) and some from overrun (being thrown, dragged, or pinned afterward). The GM describes the damage narratively according to what happened, but mechanically it's all resolved through the same roll.

This is why a slow-moving large vehicle still deals meaningful damage even with no speed modifier — the dice represent the crushing weight of the vehicle, which doesn't go away just because the vehicle is barely moving. It's also why a fast motorcycle deals meaningful damage despite being a single space — the speed modifier represents the kinetic energy of the strike, which doesn't require mass to be dangerous.

> **Example — Truck crushes pedestrian.** A 4-space truck is slowly backing up (Slow speed) and a pedestrian is caught under its wheels. Damage is 4d6 + 0, averaging 14. The GM describes this as the pedestrian being pinned and dragged by the truck's weight — overrun, not impact. The character takes significant damage despite the truck barely moving.

#### Damage to the Vehicle

The steiking vehicle takes **collision damage** from an impact/overrun **only** if the target is of comparable size or larger than the vehicle. A car striking a pedestrian takes no damage. A car striking another car, a wall, or a Large creature takes damage equal to the collision damage (rolled seperately).

#### Collision Occupants

Occupants of any vehicle involved in a collision may make a **[FORT](/docs/free-srd/core-rules/attributes/#fortitude) check (target 8)** to brace — on a success, the occupant takes half damage.

> **Example:** A car (2 spaces) moving at Moderate speed strikes a wall. Collision damage is 2d6 + 4, dealt to the vehicle, the wall, and each occupant. An occupant who succeeds on a target 8 FORT check takes half.

---

## Mounts

Mounts are a special type of vehicle. Because mounts are living creatures with their own attributes, features, and behavior, they follow slightly different rules from mechanical vehicles. This section gathers all mount-specific rules in one place.

### Mounts as Equipment vs. Mounts as Allies

> [!NOTE] 
> **Short:** If the mount is being directed, it acts as equipment and shares AP. If the mount is choosing its own actions, it is a cooperating ally and acts independently.

The rules in this section apply to mounts that are being *ridden and controlled as equipment* — these mounts are directed by a rider the same way a driver controls a vehicle.

A mount that is acting *independently* — an intelligent creature cooperating with a rider rather than being controlled by them — does not follow these rules. Such creatures act on their own turns with their own AP, and the rider is treated as a passenger being carried along. When the creature moves on its turn, the rider moves with it. When the rider acts, they act from wherever the creature currently is.

A controlled mount does not take separate turns. The rider's [AP](/docs/free-srd/core-rules/stats/#action-points) pool covers both the rider's actions and any actions the mount takes at the rider's command. When the rider uses the Drive action to move the mount, that 2 AP covers the mount's movement. When the rider commands the mount to use one of its own features — such as a bite attack, a Charge, or a special ability from the mount's stat block — the rider spends the AP cost of that feature from their own pool.

### Mount Features

A mount's combat capabilities come from its own stat block. When a rider commands a mount to attack, Charge, trample, or use any special feature, it is the *mount's* feature being used, not the rider's. The rider provides direction and AP; the mount provides the capability. A rider without the Charge ability can still command a horse to Charge if it has the Charge ability.

### Unwilling Mounts

Not every mount obeys every command. A well-trained, bonded, or willing mount cooperates with its rider's commands automatically. Riders may face a disadvantage when attempting to command a unwilling, unfamiliar, or spooked mount. 

A mount may also be willing to perform some actions, but unwilling to perform others. Most mounts are unwilling to perform actions that put them in direct danger.

### Mounts and Impact/Overrun

Unlike other vehicles, living mounts do not automatically deal impact/overrun damage through their movement. Most mounts will adjust their footing whenever possible to avoid other creatures, so a Speed of Moderate or greater is required to deliberately deal collision damage to a target. If the rider wants the mount to run someone down deliberately, they must command the mount with a Drive action *and* be moving at sufficient speed before the impact. 

A mount commanded to collide with a target it would normally consider an ally, or against a creature much larger than itself, is likely to be considered unwilling — the rider must succeed on the command check before the mount will obey. Similarly, mounts are unwilling to collide with most static objects and will outright refuse to collide with static objects that are larger than themselves.

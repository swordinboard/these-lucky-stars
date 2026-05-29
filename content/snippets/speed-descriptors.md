---
headless: true
---

> **Format:**
> Mode Distance in Feet (Base Maneuverability, Acceleration)
> Swim 80ft (High, 20ft/round)

Speed descriptors describe what type of movement or terrain the Speed applies to, how difficult it is to maneuver, and how much it can accelerate per round.
A character may have Speeds in multiple modes of travel, each with its own descriptors.

**Modes**

- **Ground** — Standard walking and running on solid ground. Most characters have a ground Speed; it should be assumed that a Speed without a descriptor is a ground Speed.
- **Climb** — Movement along vertical or near-vertical surfaces
- **Swim** — Swim speed refers to movemnt both below water and at the waters surface. Not all things will a swim Soeed can travel below water, particularly vehicles. If this is the case, the desceiptor will be Swim (surface). 
- **Fly** — Controlled movement through the air.

**Combining Modes**

Some movements can combine multiple modes in a single Move action — for example, a character with both a ground and climb Speed may walk across a floor and climb a wall as part of one Move. When combining modes, a character or vehicle's maximum travel distance cannot exceed their Primary Speed.

**Maneuverability**

> Maneuverability = Base Value + Size Value + Speed Tier

Each speed also has a **base maneuverability rating** (High (0), Medium (2), or Low (4)) that is used to determine how many spaces are required to make a 180° turn. To determine the turning distance, add the maneuverability number to the character or vehicle's size value (see the [Size](/docs/free-srd/core-rules/size/) page for characters and [Vehicle Rules](/docs/free-srd/core-rules/vehicle-rules/#vehicle-size) page for vehicles) and [Speed Tier](/docs/free-srd/core-rules/action-economy/#speed-tiers). The arc is then traced forward and to the side that many spaces. The minimum is zero spaces, which allows the character to fully turn in place. To determine the number of spaces for a 90° turn, simply divide this number by two and round down if necessary. 

*If maneuverability is excluded or left blank, then it is null. A vehicle or creature with such a Speed may change direction at will without requiring any turn radius regardless of size or speed tier.*

**Acceleration & Deceleration**

Most vehicles require time to accelerate in order to travel at their full Speed. Acceleration describes how much a vehicle or creature can increase its movement speed in a *single Move or Drive action*.

A vehicle or creature can safely deccelerate twice as quickly as it is able to accelerate.

*If acceleration is excluded or left blank, then it is null. A vehicle or creature with such a Speed may accelerate to its full movement in a single Move or Drive action, including any bonuses to Speed. Acceleration is primarily reserved for vehicles, living creatures and mounts typically have null acceleration.*

> [!TIP]
> **Example** — If a stationary creature has a Speed of Ground 350ft (Moderate, 75ft/round) and is making single move actions each turn, it must spend five rounds accelerating (via a move action) before it can reach its top Speed:
> - Round 1: +75ft/round acceleration, Speed 75ft.
> - Round 2: +75ft/round acceleration, Speed 150ft
> - Round 3: +75ft/round acceleration, Speed 225ft
> - Round 4: +75ft/round acceleration, Speed 300ft
> - Round 5: +50ft/round acceleration, Speed 350ft
>
> Similarly, if already moving at top speed and continuing to make single move actions each turn, said creature must spend three rounds deccelerating before it can come to a stop.
 > - Round 1: -150ft/round deceleration, Speed 200ft
 > - Round 2: -150ft/round deceleration, Speed 50ft
 > - Round 3: -50ft/round deceleration, movement ends after 50ft of travel and Speed ends at 0.
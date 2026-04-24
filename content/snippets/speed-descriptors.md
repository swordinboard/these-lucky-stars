---
headless: true
---

The descriptor of a Speed determines what type of movement or terrain the Speed applies to and how difficult it is to maneuver. A character may have Speeds in multiple modes of travel, each with its own maneuverability.

**Modes**

- **Ground** — Standard walking and running on solid ground. Most characters have a ground Speed; it should be assumed that a Speed without a descriptor is a ground Speed.
- **Climb** — How fast a character scales vertical surfaces.
- **Swim** — How fast a character moves through water.
- **Fly** — How fast a character moves through the air.

**Combining Speeds**

Some movements can combine multiple modes in a single Move action — for example, a character with both a ground and climb Speed may walk across a floor and climb a wall as part of one move. When combining modes, the character's maximum travel distance cannot exceed their Primary Speed.


**Maneuverability**

> Maneuverability = Rating Value + Size Value + Speed Tier

Each speed also have a **base maneuverability rating** (High (0), Medium (+2), or Low (+4)) that is used to determine how many spaces are required to make a 90° turn. To determine the turning distance, add the maneuverability number to the character's size value (see [Size](/docs/free-srd/core-rules/size/)), and [Speed Tier](/docs/free-srd/core-rules/action-economy/#speed-tiers). The arc is then traced forward and to the side that many spaces. The minimum is zero spaces, which allows the character to fully turn in place. *If a Speed does not provide a maneuverability rating, treat it as High (0).*

Vehicles also use maneuverability ratings when performing complex or difficult maneuvers. <!-- placeholder: link to vehicles page when finalized -->

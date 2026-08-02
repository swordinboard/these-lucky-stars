---
title: "Utility Skiff"
id: vehicles/utility-skiff
category: [sci-fi]
type: vehicle
tags: [vehicles, sci-fi]
summary: "Open-bed hover skiff. Size 3, two seats, no cover, 400lb bed."
---

*Medium Ground Vehicle — Size 3 (3 spaces)*

The workhorse of every orbital yard and dust-side depot — a flat alloy deck, two
seats behind a stub windscreen, and no pretence of comfort or protection.

> **Cost** --Cr · **Object DEF** 18 · **VIT** 3 · **Cargo** 400lbs
>
> **Speed** Ground 200ft (Medium, 40ft/round)
>
> **Occupants** driver + 1 · **Cover** none (open deck)
>
> **Collision** 3d6 + speed modifier · **Ignition** 2 AP
>
> **Proficiency** [Vehicle [Skiff]](/docs/free-srd/character-creation/proficiencies/#vehicle) · **Power** [Fuel Cells](/docs/free-srd/inventory--equipment/item-tags/#fuel-cells)

**Features**

- **Load Bed** — The rear deck carries 400lbs, or one Medium passenger riding
  unsecured. An unsecured rider bails, or is thrown, on any collision.
- **Ground Effect** — Hovers a foot off the deck, ignoring difficult terrain
  less than a foot deep. Cannot climb a grade steeper than roughly 30°.

<!--
A STATTED VEHICLE, as opposed to the vehicle RULES that share this namespace.
Copy to content/snippets/vehicles/<slug>.md and place it on a page with
{{< blockdetails "vehicles/<slug>" "h3" >}}.

`type: vehicle` is its own type, beside `creature`. A vehicle is neither
equipment (it is not carried, and it has occupants) nor a creature (it is an
object, and it does not act on its own turn), and a GM building a PDF wants to
select "the vehicles" as a set. `{{< catalog namespace="vehicles"
type="vehicle" />}}` lists them without picking up the rules blocks; category
splits the settings, so a core-setting car is the same file with
`category: [core]`.

NO HEADING — <summary> prints the title. The group labels are bold lines rather
than `##` headings, for the reason spelled out in creature.md: several vehicles
on one catalog page would each emit `id="features"`, with no `-1` suffix to save
them, because the shortcode delivers finished HTML that Hugo never de-duplicates.

THE STAT BLOCK IS THE CREATURE STAT BLOCK'S SIBLING: same blockquote, so the
two read as one construct at the table and in the PDF. Every value is derived
from a rule already on the site:

  Size       the LONGEST dimension in 5ft spaces, not the footprint. A 12ft car
             is size 3. This one number drives collision dice, maneuverability
             and the damage the vehicle takes back.
  Object DEF from the material table — soft metal 18 per inch, hard metal 20,
             wood 10. A vehicle is an OBJECT: its DEF does NOT reset at the end
             of combat or when out of danger. It stays down until repaired.
             This is the opposite of a creature and the single easiest thing to
             get wrong.
  VIT        3 by default, like any object, unless it carries Fragile or
             Durable. VIT names a condition rather than a wound: 2+ is Full
             Function, 1 is Damaged, 0 is Broken.
  Speed      the site's speed descriptor — Mode Distance (Maneuverability,
             Acceleration). Modes are Ground, Climb, Swim and Fly; a hover
             vehicle is a Ground vehicle that says so in prose. Maneuverability
             is High (0), Medium (2) or Low (4) and feeds both the turning arc
             and the target to avoid a collision. Acceleration is per Drive
             action, and a vehicle decelerates twice as fast as it accelerates.
             Leaving either blank means null, which is rarely right for a
             vehicle — that is a creature's default, not a machine's.
  Occupants  driver plus seats. Every occupant rolls their own Initiative;
             there is no grouped vehicle turn.
  Cover      what the vehicle gives the people inside it — full for enclosed,
             partial or none for open. The cover rules read this line.
  Collision  1d6 per SPACE the vehicle occupies, plus the speed tier modifier
             (+0 / +3 / +7 / +12). Restated here for convenience even though it
             is derivable from Size, because it is rolled mid-chase.
  Ignition   the AP cost to start it, or the multi-round sequence. Say it even
             when it is trivial; "keyed, 1 AP" is worth a line.
  Proficiency which Vehicle [___] avoids disadvantage on Drive checks. The
             blank goes in the LINK TEXT, never in a heading.

A MOUNT IS NOT A VEHICLE. It is alive, it has attributes and features of its
own, and it may refuse an order — stat it with creature.md. The mount rules
cover how a rider commands it.

FOR SOMETHING PARTY-SIZED — a ship they live aboard, with decks, crew stations
and its own gear — use creature-page.md's shape instead: page frontmatter, an
h1, and a page of its own. The stat block above is the top of that page.

Delete this comment.
-->

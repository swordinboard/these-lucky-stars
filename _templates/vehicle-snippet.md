---
title: "Cargo Sled"
id: vehicles/cargo-sled
category: [sci-fi]
type: vehicle
tags: [vehicles, sci-fi]
summary: "A walking-pace repulsor pallet that moves four tonnes and stops for nothing."
---

*Size 3 vehicle — dock and warehouse repulsor pallet — one walking operator, no seat*

| DEF | VIT | Occupants | Cover | Collision | Ignition |
|---|---|---|---|---|---|
| 16 | 3 | 1 operator (on foot) | Partial | 3d6 + Speed modifier | 2 AP |

| Mode | Distance | Maneuverability | Acceleration |
|---|---|---|---|
| Ground (repulsor) | 30 ft | Low (4) | — |

Every dock has a dozen of these and nobody owns any of them. The operator walks
alongside with a control yoke rather than riding, which is why a cargo sled is
the only vehicle on the station that can be stolen at walking pace. Loaded, it
will not stop for a person, and everyone who works the docks knows it.

## Features

**Walk-Alongside Yoke** — The operator is a pedestrian, not an occupant. They
move at their own Speed and the sled matches them, and they take no disadvantage
on other actions the way a seated driver does. Let go and the sled stops where
it is.

**Loaded Mass** — A sled carrying cargo still only reaches the Slow tier, so its
collision damage is 3d6 + 0 — but that is the point of the overrun rules. It
deals that damage to anything in its path whether it is moving quickly or not.

**Deadfall Cutout** — Cutting power drops the pallet flat rather than letting it
drift. Anything underneath takes the collision damage immediately.

<!--
A VEHICLE SNIPPET — the outlier form. Most vehicles get their own page
(vehicle.md); use this when the vehicle is set dressing rather than a set piece,
and belongs in a list beside five siblings.

NO TITLE HEADING. The call site supplies it, at whatever level that page wants:
  {{< blockdetails "vehicles/cargo-sled" >}}          — in a collapsible
  {{% include "/snippets/vehicles/cargo-sled" "h3" %}} — bare, at h3
blocks.json records `owns_heading: false`, which makes `title` load-bearing.

Internal headings are authored at h2 (`## Features`, `## Driving It`) and the
include shifts them one level below wherever the block lands. Author at h2 or
they arrive at the wrong depth.

The descriptor line, the two single-row tables, their column order and where
every number comes from are identical to vehicle.md — read the long comment
there. A vehicle that starts as a snippet and grows into a page should only need
its frontmatter changed.

Two things this example is here to show:

  A blank cell means NULL, which means no limit. This sled's acceleration is —,
  so it reaches its full 30 ft in a single Drive action. A blank maneuverability
  would likewise mean it turns in place at any size or speed. Blank is a real
  value; do not use it for "not worked out yet".

  Occupants can be nobody. An operator walking alongside is a pedestrian, not an
  occupant, so nothing on this sled gets the vehicle's cover and nothing takes
  the driver's disadvantage on other actions. Say which in the table rather than
  leaving a GM to rule it mid-scene.

NO page frontmatter — no description, no weight, no bookHidden. This is a snippet
under content/snippets/vehicles/, and content/snippets/_index.md already stops it
publishing. Note that namespace already holds the vehicle RULES; that is fine and
normal, ids are unique per file, not per kind.

Then: put it on a page, or preflight check 6 reports it stranded. Run
builddata.py afterwards.

Delete this comment.
-->

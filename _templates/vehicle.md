# Statting a vehicle

Everything needed to turn a one-line brief into a finished vehicle card, without
opening anything else. Read top to bottom the first time; after that the
**Template** section at the end is the only part you copy.

A brief looks like this:

> *A light ground vehicle, 200mph top speed, fully enclosed, driver only, two
> forward lasers, hardened roll chassis so a higher Object DEF than expected.*

A brief supplies **intent**. Everything on the card is then derived from the
rules below, and the last section works that exact brief through end to end.

**A mount is not a vehicle.** It is alive, has its own attributes, and can refuse
an order — stat it with `creature.md`. The vehicle rules reach it through the
rider's Drive action.

---

## 1. What the brief gives you, and what you derive

| From the brief | Derived |
|---|---|
| Class (light ground / heavy ground / spacecraft) | Size, in 5ft spaces |
| Rough speed, in mph or in feel | ft/round, tier, maneuverability, acceleration |
| Enclosed or open | Cover |
| Who rides | Occupants |
| Construction ("armoured", "stripped", "hardened") | Object DEF, and VIT if Durable/Fragile |
| Anything unusual it does | Features |
| — | Cost (always `--Cr`), Collision, Ignition, Power |

Ask only when the brief contradicts itself. Otherwise pick the value the rules
give you and say in the prose why it is what it is.

---

## 2. Speed

**1 mph = 8.8 ft/round.** Exactly — `5280 ÷ 3600 × 6`. Divide by 8.8 to go back.
For rough work `mph × 9` and `ft ÷ 9` are within 2%.

| mph | 5 | 10 | 25 | 50 | 100 | 200 |
|---|---|---|---|---|---|---|
| **ft/round** | 44 | 88 | 220 | 440 | 880 | 1760 |

### Tiers

The tier is read off the ft/round figure and carries the **speed modifier** used
in collision damage and in every vehicle interaction target (`6 + modifier`).

| Tier | ft/round | mph | Modifier |
|---|---|---|---|
| Slow | up to 40 | up to 4.5 | +0 |
| Moderate | 45–120 | 5–13.6 | +3 |
| Fast | 125–400 | 14–45.5 | +7 |
| Very Fast | 400+ | 45.5+ | +12 |

Land on a number that sits clearly inside a tier rather than on a boundary. 400
is the Fast/Very Fast seam — use 380 or 420 and mean it.

### Maneuverability

Base rating is **High (0)**, **Medium (2)** or **Low (4)** — those three words
only. The full turning figure is `base + size + speed tier`; the card prints
**`Maneuverability + Size`**, which is just `base + size`, and the tier is added
at the table because it changes with how fast the thing is going.

The number is spaces traced forward and to the side for a 180° turn; halve and
round down for 90°.

- **High** — pivots. One rider, short frame, or a fighter: bikes, runners, interceptors.
- **Medium** — a working vehicle that has to think about a corner.
- **Low** — long, heavy, or committed to a route several rounds early.

Watch the compounding: size is already in there, so Low on a large hull gets
severe fast. The bulk hauler's 28 is 140ft of arc before the speed tier is added.

### Acceleration

Per Move or Drive action, in `Nft/round`. Rounds to top speed is
`top ÷ acceleration`; deceleration is twice as fast. The corpus sits at **3–6
rounds** to top speed, and that spread is the characterisation — an interceptor
is 3, a cargo crawler is 6.

Leaving maneuverability or acceleration blank means **null**, which is a
creature's default, not a machine's. Always write both.

---

## 3. Object DEF

From the material table: **wood 10, concrete 16, soft metal (aluminium) 18,
hard metal (steel) 20 — per inch of thickness.** Multiply by how thick the hull
actually is and say so in a Feature, so a reader can check the number.

**A vehicle is an object, so its DEF does not reset** at the end of combat or
when out of danger. It stays down until repaired. This is the opposite of a
creature and the easiest thing on the card to get wrong.

Judging high from low, against the corpus as it stands:

| Object DEF | Reads as | Examples |
|---|---|---|
| 8–12 | open frame, thin panel, no protection | speeder bike, skiff runner |
| 14–20 | a working vehicle's skin, about an inch of metal | skiff utility 18, crawler 20, interceptor 20 |
| 25–30 | structural, or lightly armoured | bulk hauler 25, security transport 30 |
| 35 | purpose-built armour | patrol gunship 35 |
| 35+ | wants a stated reason | — |

Reference points from the same table: a basic door is 14, heavy armour is 14, a
reinforced door is 35. "Higher than expected" in a brief means one band up from
what the class would normally carry, not an arbitrary jump.

**VIT** is 3 for any object. Print 4 only with
`([Durable](/docs/free-srd/inventory--equipment/item-tags/#durable))` beside it,
or 2 with Fragile. VIT names a condition: 2+ Full Function, 1 Damaged, 0 Broken.

---

## 4. The rest of the fields

**Size** — the **longest dimension** in 5ft spaces, not the footprint. A 12ft car
is Size 3. This one number drives collision dice and maneuverability.

**Collision** — `1d6 per space + speed modifier`. It follows from Size but is
restated on the card because it gets rolled mid-chase.

**Occupants** — `driver + N` (or `pilot + N`). Everyone rolls their own
Initiative; there is no grouped vehicle turn. Split compartments with a comma:
`driver + 4 (cab), +6 (cell)`.

**Cover** — what the vehicle gives the people in it, because the cover rules read
this line. `full (enclosed)`, `none (open deck)`, `none (open frame)`. Split it
the same way when the vehicle does: `full (cab) // none (deck)`.

**Ignition** — the AP cost, or the multi-round sequence, or `see <Feature>` when
it needs more than a phrase. Say it even when it is trivial.

**Power** — one of:

- `[Battery [Micro|Small|Medium|Large|Industrial]](/docs/free-srd/inventory--equipment/item-tags/#battery)`
- `[Reactor Core [Compact|Standard|Industrial]](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#reactor-cores)`
- `[Fuel Cell](/docs/free-srd/inventory--equipment/item-tags/#fuel-cell)`

Larger craft may carry two: `Two [Reactor Cores [Industrial]](…)`.

**Cost** is `--Cr`, always, until there is an economy to price against.

**No Proficiency line.** The class in the type line already says which
`Vehicle [___]` applies, and printing it twice was redundant.

---

## 5. Armament

There is **no ship-to-ship or vehicle-weapon subsystem**, and this file does not
invent one. The two armed cards in the corpus express a mount as an ordinary
Feature and let existing rules do the work:

- The occupant spends the AP and rolls **their own** attack — the vehicle has no
  attack bonus of its own.
- A **pilot firing while driving** is taking an action other than Drive, so it is
  at a *minor disadvantage*. A **dedicated gunner is not driving**, so it is not.
  That contrast is the whole difference between the interceptor's nose cannons
  and the gunship's turret, and it is worth building into any armed vehicle.
- Give the mount a range, an arc, and its ammunition or battery tag.

Anything beyond that — two vessels exchanging fire over several rounds — is the
GM's scene, not a line on the card.

---

## 6. Calibration — the corpus as it stands

Compare a new vehicle against these before committing. Every value here is live.

| Vehicle | Class | Size | DEF | VIT | Speed | mph | Man. | Accel | M+S |
|---|---|---|---|---|---|---|---|---|---|
| Speeder Bike | Light Ground | 2 | 12 | 3 | 1400ft | 159 | High | 300 | 2 |
| Skiff, Runner | Light Ground | 2 | 12 | 3 | 550ft | 62 | High | 120 | 2 |
| Skiff, Utility | Light Ground | 3 | 18 | 3 | 400ft | 45 | Medium | 80 | 5 |
| Skiff, Hauler | Light Ground | 4 | 20 | 3 | 325ft | 37 | Low | 50 | 8 |
| Security Transport | Heavy Ground | 5 | 30 | 3 | 650ft | 74 | Low | 40 | 9 |
| Cargo Crawler | Heavy Ground | 10 | 20 | 4 | 400ft | 45 | Low | 30 | 14 |
| Interceptor | Spacecraft | 6 | 20 | 3 | 600ft | 68 | High | 200 | 6 |
| Survey Lander | Spacecraft | 8 | 20 | 3 | 300ft | 34 | Medium | 75 | 10 |
| Patrol Gunship | Spacecraft | 9 | 35 | 4 | 380ft | 43 | Medium | 100 | 11 |
| Luxury Yacht | Spacecraft | 14 | 18 | 3 | 4500ft | 511 | Medium | 200 | 16 |
| Long-Range Explorer | Spacecraft | 16 | 30 | 4 | 250ft | 28 | Low | 50 | 20 |
| Light Freighter | Spacecraft | 18 | 18 | 3 | 300ft | 34 | Medium | 60 | 20 |
| Bulk Hauler | Spacecraft | 24 | 25 | 4 | 120ft | 14 | Low | 20 | 28 |

Class strings in use are exactly **Light Ground Vehicle**, **Heavy Ground
Vehicle** and **Spacecraft**.

---

## 7. The template

Copy this into `content/snippets/statblocks/sci-fi/vehicles/<slug>.md` and fill the
angle brackets. Field order is fixed — it is the order every card uses.

```markdown
---
title: "<Name>"
id: statblocks/sci-fi/vehicles/<slug>
category: [sci-fi]
type: vehicle
tags: [vehicles, sci-fi]
summary: "<One line. A generated table prints this verbatim.>"
---

{{% statblock type="<Light Ground Vehicle|Heavy Ground Vehicle|Spacecraft> — Size <N> (<N> spaces)" %}}
<Two or three sentences. What it looks like, what it is for, and the one thing a
GM should feel about it. Not a restatement of the numbers.>

> **Cost** --Cr // **Cargo** <Nlbs (where it goes)>
>
> **Occupants** <driver + N> // **Cover** <full (enclosed)>
>
> **Object DEF** <N> // **VIT** <3>
>
> **Speed** <Ground|Fly> <N>ft (<High|Medium|Low>, <N>ft/round) // **Maneuverability + Size** <N>
>
> **Collision** <N>d6 + speed modifier // **Ignition** <2 AP>
>
> **Power** <link from §4>

---

**Features**

- **<Name>** — <What it does, in rules terms, with the derivation of any number
  it explains. Two to five of these.>
{{% /statblock %}}
```

### Format rules that bite

- **`//` separates fields. The em dash is a label separator** — `**Load Bed** — …`
  — and the two never swap jobs. A qualifier goes in parentheses: `2 AP (kept warm)`.
- **Sections inside the card are `---` and bold labels, never headings.** Two
  headings on one page collide into duplicate element ids, and the Skiffs page
  holds three cards.
- **One blank `>` between every stat line.** Omit it and two lines merge into one
  run-on with no break.
- **No title heading in the snippet.** The card prints its own name, so include it
  with **no level argument**: `{{% include "/snippets/statblocks/sci-fi/vehicles/<slug>" %}}`
- **Never end the file with an HTML comment** — it swallows the rest of the host page.
- Run `python3 _discovery/tools/builddata.py` after adding one, then
  `./_discovery/tools/check.sh`.

A vehicle needing its own page becomes a `page-shell.md` that includes the
snippet with prose around it — intro above, Tactics and Encounter Notes below.
Several related vehicles are the same shell with several includes and a
comparison section; `content/docs/free-srd/vehicles/sci-fi/skiffs.md` is exactly
that.

Before writing any bonus or advantage, check `../design-notes.md` — how big the
effect should feel, and whether it assists a skill (advantage) or replaces a
faculty (flat bonus).

---

## 8. The brief, worked

> *A light ground vehicle, 200mph top speed, fully enclosed, driver only, two
> forward lasers, hardened roll chassis so a higher Object DEF than expected.*

**Speed** — 200mph × 8.8 = **1760ft/round**, which is Very Fast (+12). It needs
an acceleration that reaches that in a sane number of rounds: 400ft/round gives
5, in the middle of the corpus band.

**Size** — an enclosed single-seater is short, call it 10ft: **Size 2**.

**Maneuverability** — short, one occupant, built to corner: **High (0)**, so
`Maneuverability + Size` is 0 + 2 = **2**, matching the bike and the runner.

**Object DEF** — a light ground vehicle normally sits at 12–18. "Hardened roll
chassis, higher than expected" is one band up: an inch and a quarter of hard
metal is 20 × 1.25 = **25**. VIT stays 3.

**Collision** — 2 spaces, so **2d6** + speed modifier.

**Lasers** — a Feature, fired by the driver, therefore at a minor disadvantage.

```markdown
---
title: "Course Runner"
id: statblocks/sci-fi/vehicles/course-runner
category: [sci-fi]
type: vehicle
tags: [vehicles, sci-fi]
summary: "Enclosed single-seat racer. Very fast, roll-caged, and armed."
---

{{% statblock type="Light Ground Vehicle — Size 2 (2 spaces)" %}}
Ten feet of caged shell around one seat and a great deal of drive. Everything
that is not the cage or the driver has been argued off the design, and what is
left goes very fast in a straight line and corners better than it has any right
to.

> **Cost** --Cr // **Cargo** 30lbs (behind the seat)
>
> **Occupants** driver only // **Cover** full (enclosed)
>
> **Object DEF** 25 // **VIT** 3
>
> **Speed** Ground 1760ft (High, 400ft/round) // **Maneuverability + Size** 2
>
> **Collision** 2d6 + speed modifier // **Ignition** 2 AP
>
> **Power** [Battery [Large]](/docs/free-srd/inventory--equipment/item-tags/#battery)

---

**Features**

- **Hardened Roll Chassis** — An inch and a quarter of hard metal cage, which is where the Object DEF of 25 comes from — well above the 12 to 18 a frame this size usually carries. The cage is the vehicle; the panels hung on it are not.
- **Forward Lasers** — Two fixed mounts, 3 AP. The driver fires, rolling their own DEX attack at a *minor disadvantage* as an action other than Drive. Range 200ft, forward arc only, [Battery [Large]](/docs/free-srd/inventory--equipment/item-tags/#battery), one supply roll per attack.
- **Committed** — At Very Fast the driver is covering 352 spaces a round. Any Drive check taken at that speed is made before the driver can see what they are steering into, and the GM should call for it a round early.
{{% /statblock %}}
```

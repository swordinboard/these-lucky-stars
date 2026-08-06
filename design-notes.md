# Design Notes

This doc contains game design decisions discovered while working within the
design of the website and PDF builder. Use it as a reference when adding content
to the site. Related templates will be pointed here as a secondary check for the
content from a game mechanic perspective rather than a site-structure
perspective.

---

## Bonus or advantage?

Every effect that helps or hinders a decision roll has to pick a lever: a **flat
bonus**, or a position on the **advantage scale**. They are not
interchangeable, and picking by feel produces a corpus where two items that do
the same job use different mechanics for no stated reason.

**Ask these before choosing, about how the effect should FEEL** — not about what
it currently has:

### 1. How big should it feel?

| Intent | Lever |
|---|---|
| A small but noticeable difference | **+1** |
| A considerable difference | go to question 2 |
| It should be very hard to fail with this | **+3 / +4** |

### 2. Considerable — so does it assist, or replace?

This is the question that separates the two levers, and it is usually decided by
what the thing *is* rather than how strong it is.

- **It ASSISTS a skill the character still has to exercise** → **minor
  advantage**. They can still botch it. Lock picks in unskilled hands are still
  in unskilled hands.
- **It REPLACES a sense or faculty they do not have** → **flat bonus (+2)**. It
  carries someone who would otherwise fail outright. A microphone hears for you
  whether or not you were listening.

Two components in the same family show the line clearly. The **Audio Processor**
replaces hearing, so it is a flat +2. The **Manipulator Override** assists fine
motor work — better fingers do not tell you which pin to set — so it is a minor
advantage.

### Why the two levers are not the same

**A flat bonus always applies. Advantage is a position on a scale that other
effects compete for**, so it can be cancelled, or upgraded to major by stacking.
That makes a flat bonus *slightly better* in practice: it survives contact with
whatever else is happening, and it stacks with itself. Penalties mirror this
exactly.

**Minor advantage and a flat +2 are numerically identical on a single roll.**
The entire difference is that contingency. If an effect should be reliable, it
is a bonus; if it should be situational, it is advantage.

### Where each one lives

**Traits and proficiencies are flat bonuses**, deliberately. They are the "I
don't really suck at this" baseline — the thing that establishes competence and
opens the gate for other effects to layer on top. As of this writing **no trait
or proficiency grants advantage**, and that split is worth keeping.

**Equipment and features are where the judgement happens.** Both levers appear
there and both are correct in different cases.

### What the dice actually do

Measured against exploding 2d6 with a +0 attribute, as percentage-point swing in
the chance of hitting the target. This is what "small but noticeable" and
"considerable" mean in numbers:

| | vs target 8 | vs target 12 | vs target 16 |
|---|---|---|---|
| **+1** | +11 | +4 | +2 |
| **+2** / minor advantage | +25 | +9 | +5 |
| **+3** | +36 | +17 | +9 |
| **+4** | +44 | +26 | +14 |
| **3d6** major advantage | +37 | +28 | +18 |

Two things fall out of that table:

**A flat +4 and major advantage are not the same shape.** They are close at
target 8 (+44 against +37) and diverge as the task gets harder — at target 16
major advantage is worth more (+18 against +14). The extra exploding die has a
long tail; a flat bonus is a fixed shift. **Flat bonuses raise the floor,
advantage widens the ceiling.**

**The scale is not symmetric.** Major disadvantage takes a *Simple* target 4
from 92% to 50%. Losing a die on an easy task is far more punishing than gaining
one is generous, so major disadvantage is not the mirror image of major
advantage and should not be handed out as though it were.

### Say which one

`grants advantage` without a severity is legal — `basics/advantage` defines a
bare grant as minor on a neutral roll — but it reads as an omission. Write
**minor** or **major** explicitly. The same goes for penalties.

### Worked examples

| Effect | Lever | Reasoning |
|---|---|---|
| Reflex Sight | **+1** | Universal, always on, no cost. Small but noticeable. |
| Audio Processor | **+2 flat** | Replaces hearing. Costs a supply roll per activation. |
| Manipulator Override | **minor advantage** | Assists a skill. Costs AP, a supply roll, and the Hand slot. |
| Grapple-Line Launcher | **advantage** | Assists a climb — a bad climber can still fall. |
| Optical Suite | **advantage** | Assists sight rather than replacing it; darkvision is a separate stated capability, not a modifier. |

Note what the last two have in common with the rest: **an effect that costs
nothing is the problem more often than the lever is**. Optical Suite kept its
advantage and gained a supply roll and the HUD subslot instead. Before changing
a lever, check whether the item is simply free.

### Binary effects are not modifiers

"See in total darkness to 100ft" and "no falling damage under 20ft" are not
bonuses of any size — they remove a condition. Keep them stated as their own
capability beside the modifier, not folded into it, or the item's cost gets
priced against the wrong thing.

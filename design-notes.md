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

**Ask it about the check, not about the object.** This is the easy way to get
question 2 wrong, and the **Compass** is the worked failure. A compass replaces
a faculty — it tells you which way north is, and no amount of skill substitutes
for it — so "replaces → flat bonus" looks right. But nobody rolls to find north.
The check is *navigation*: getting from A to B, reading terrain, choosing a
route, not walking in a circle for six hours. Against that check the compass
only assists, and a character who does not know what to do with a heading can
still get the party lost. It is advantage.

The test: name the roll out loud before you answer. If the thing replaces
something that is never itself rolled, it is assisting the roll that actually
happens.

### 3. Is the scale live?

The advantage scale only does its job when something is pushing back on it. Ask
whether the roll this effect touches is **contested or crowded**, or **isolated
against a static target**.

- **Contested, or crowded with other effects** → advantage is expressive. It can
  be answered, cancelled, or stacked, and the position on the scale is the story
  of the exchange.
- **Isolated against a flat target** → the scale never moves, and advantage is
  just a flat bonus wearing extra vocabulary. Use the bonus.

The pair that draws this line: **Stabilizer Gyros** grant advantage on checks to
resist knockdown, and those checks are contested by definition — somebody is
shoving you, and the shover has their own effects in play. The **Antiseptic
Poultice** grants a flat +2 on FORT checks against infection, and that check is
almost never contested; it is a character alone against a fixed target, days
after the fight. Same size of effect, different mechanic, because only one of
them is standing on a live scale.

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

The line underneath that is **permanent versus choosable**, not "build versus
situation":

- A **trait or proficiency is permanent**. It is picked once, it is always on,
  and it cannot be dropped when it becomes inconvenient. Permanent things get
  flat bonuses.
- **Equipment is a tactical choice made every scene.** It is carried, deployed,
  swapped, and put down. A player who wants what an item offers pays for it in
  slots, weight, AP, supply, and in whatever it stops them doing. That ongoing
  price is what earns a place on the scale.

The consequence worth stating: **major advantage cannot be bought at character
creation.** It is reached by choices made at the table, with everything those
choices cost, and there is no combination of traits and proficiencies that
starts a character there. Keeping traits and proficiencies flat is what
guarantees that.

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

### Say which one, and major is allowed

Always write **minor** or **major**. As of this writing there is not a single
unqualified grant left in the corpus — 44 of them were made explicit in one
pass — so a bare `grants advantage` now reads as something that was missed
rather than something that was chosen.

**An effect may grant major outright.** It does not have to be reached by
stacking. Under the running count in `rules/basics/advantage`, an effect is named for
what it grants *on its own*: minor is worth one point, major is worth two, and
both drop into the same addition as everything else. Seven rules already do
this and are correct to: Heavily Obscured, resisting a damage Weakness, dodging
a vehicle at Fast or Very Fast, keeping grip on a two-handed weapon against a
disarm, and attacks against anyone Unconscious, Immobilized or in Dead
Battery.

What granting major does **not** mean is that the roll will be at major
advantage. It means the effect contributes two points toward whatever the total
turns out to be. A major advantage met by a minor disadvantage lands on minor —
the effect did its work and the situation ate some of it — which is the same
arithmetic that lets three separate advantages reach major from the other
direction. Nothing is special-cased.

So the question to ask is still question 1: **how big should it feel?** Major is
the answer when a single effect should be worth two of anything else in play.

**None of the seven is purchasable.** They are environmental, geometric, or
states the target has been reduced to, and that is the pattern to check a new
one against. The three helpless conditions are the clearest case: a target who
cannot move, cannot see it coming, and cannot resist is not one more thing
tilting the roll, and pricing them the same as a targeting HUD read as an
undercount. Nothing a character *buys* grants major.

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

---

## Stacking to major is the intended behaviour

Reaching major by stacking is not a corpus bug to be audited away. **It is
allowed wherever every contributor was avoidable** — where a player looking at
the stack can name the thing they should have done differently. Three real
clusters, all of which were examined and all of which stay:

**Equipment penalties.** A **Collapsible Shield** deployed alongside a
two-handed weapon, a **Weighted Core** in the hands of a character under 2 STR,
and a **Targeting HUD** locked onto somebody else all penalise the same attack,
and together they reach major. That is the correct outcome, and the correct
reading of it is *that character should put some things down and try something
else*. Equipment is a tactical choice; a stack of bad tactical choices is
supposed to hurt.

**Vehicle penalties.** An untrained driver, taking a non-Drive action while
driving, firing beyond a weapon's normal range, stacks three ways. Each one is a
separate decision and each one has an obvious fix — get the proficiency, stop
driving, get closer.

**Positional penalties.** Grappling and attacking somebody outside the grapple,
while prone, while obscured. Every element is a position, and positions can be
changed.

What these have in common is that they are **single specific effects that each
do one thing**, not overlapping restatements of the same problem. That is the
real test, and it is the same one `rules/basics/advantage` already gives the GM: an
effect earns a place in the count if it would matter on its own. Stacking is
only a problem when the same disadvantage has been counted twice under two
names.

## Vague can be load-bearing

"Grants advantage on navigation-related checks **when applicable**" looks like
an unfinished sentence and is not. Pinning it down would mean enumerating which
checks count, and the enumeration would be both long and wrong — a compass helps
in open terrain and does nothing in a corridor, and no list survives contact
with a real table.

**Leave the vagueness where the GM is the better judge, and remove it where the
mechanic is.** "When applicable" is a scope, and scope is the GM's call.
"Grants advantage" without a severity used to be the other kind — a mechanical
value left unstated — which is why it reads as an omission and "when applicable"
does not.

## Vehicle rules lean on disadvantage on purpose

The vehicle rules hand out more disadvantage than any comparable section:
untrained operation, driver actions other than Drive, dodging an oncoming
vehicle, commanding an unwilling mount. That imbalance is deliberate and should
not be normalised away by a later pass.

**A vehicle is a force multiplier that the rules do not otherwise price.** It
moves hundreds of feet a round, carries the party and their cargo, and turns
collisions into dice nobody else can throw. The disadvantage load is the cost of
entry, and the way out is the proficiency — which is exactly the "I don't really
suck at this" gate that traits and proficiencies exist to open.

When statting a new vehicle, expect its drawbacks to read heavier than an item's
would. Check them against the vehicle rules already on the site rather than
against the equipment corpus.

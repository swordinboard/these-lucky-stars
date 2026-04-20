---
title: "Action Economy"
weight: 50
draft: true
---

## Action Economy & Movement

This page covers how a character spends their time and effort during a round of combat, and how they move through the world. The action economy describes *what* a character can do; movement describes *how far* they can go and *how fast*.

---

## Action Points

> **Action Points (AP) = 4 (Base) + Mods**

On their turn, each character spends **Action Points (AP)** to perform actions. All characters have **4 AP** per round, which replenish at the start of their turn. Like other stats, AP can be affected by modifiers from character features or other effects.

AP is a shared pool used for every action a character takes, on their own turn using Standard Actions or in response to events on other characters' turns with Opportunity Actions. A character who spends all of their AP on their own turn has no AP remaining for Opportunity Actions until their AP replenish at the beginning of their next turn. Managing the AP pool is a tactical choice, not just a bookkeeping step.

---

## Action Types

There are three categories of action in These Lucky Stars: **Standard Actions**, **Opportunity Actions**, and **Reactions**. Most of the time, players only need to think about Standard Actions — the others come up through specific rules, features, or circumstances.

### Standard Actions

Standard Actions are actions a character takes on their own turn and pays for from their AP pool as they are taken. The full catalog of Standard Actions — attacks, moves, grapples, and so on — lives in the [Combat](/docs/free-srd/core-rules/combat/) action catalog. Move and Step are also Standard Actions, but because they are fundamental to positioning, their full rules live in the [Movement](#movement) section below.

A few Standard Actions have special timing patterns worth noting:

#### Readied Actions

During their turn a character may declare an action to be made in response to a specific trigger. When readying an action, the character declares both the action and the trigger and pays the AP cost immediately. When the trigger occurs any time between the commitment to the readied action and the start of the character's next turn, the action resolves. Readied actions are vulnerable to interruption — a character can be distracted out of their readied action, and the committed AP is lost whether the action fires or not. A character may choose to abandon a readied action at any point before the action is resolved. See [Multi-Turn Actions](#multi-turn-actions) for how interruption works.

#### Multi-Turn Actions

Some actions require more time than a single round can provide. These actions are committed on the turn they begin and continue across multiple rounds or multiple characters, with AP paid over time.

In most cases, a multi-turn action must be performed uninterrupted and in consecutive rounds. Many things can interrupt a multi-turn action: environmental effects, taking damage, nearby explosions, or other distractions. A **WILL** check can typically be used to remain focused through distracting effects, and a **FORT** check can be used to remain focused through damaging physical effects. If the check fails, the action is disrupted and the AP already committed to it is lost.

### Opportunity Actions

Opportunity Actions are actions taken on another character's turn in response to a specific trigger. Unlike Standard Actions, Opportunity Actions are not chosen freely — each one is granted by a specific source, such as the baseline *Opportunity Attack* available to all characters, or a character feature that defines its own opportunity action.

Each Opportunity Action defines its own AP cost, trigger condition, and resulting action in the rules text for the source that grants it. Many Opportunity Actions cost less AP than their Standard Action equivalents, and some cost 0 AP entirely.

**AP is paid at the moment the trigger fires, not in advance.** A character must have AP available in their pool when the trigger occurs, or the opportunity is missed. This means that a character who spends all of their AP on their own turn cannot take Opportunity Actions that cost AP until their next turn — leaving AP unspent is often how a character stays reactive.

**No chaining.** An Opportunity Action cannot trigger another Opportunity Action. This prevents endless reactive chains. The original action that triggered an opportunity may still trigger other opportunities from other characters, but the opportunity itself does not provoke further opportunities.

#### Opportunity Attack

{{% include "/snippets/opportunity-attack" %}}

### Reactions

Reactions are things a character's body does in response to what is happening around them. A reaction is not a chosen action — it is a consequence. Grabbing a ledge while falling, dodging a trap, bracing against a sudden blast, even defending against an attack: these are reactions.

Reactions cost no AP and are almost always resolved by an attribute check. A character with 0 AP can still react, because reactions are not actions in the normal sense — they are the body's automatic response to circumstance.

In normal play, Reactions rarely need to be identified as a distinct category. The GM calls for a check, the player rolls, and play continues. The category exists so that the rules have a place to describe how involuntary responses to hazards work without confusing them with Standard or Opportunity Actions.

---

## Common AP Costs

Generally, the more time or effort an action requires, the more AP it costs:

- **0 AP** — Free or instinctive actions: speaking a short sentence, dropping an item, certain character features.
- **1 AP** — Simple tasks: picking up an item, drawing a weapon, stepping to an adjacent space, opening a door, drinking a potion already in hand.
- **2 AP** — Focused tasks: making an attack, moving up to your Speed.
- **3+ AP** — Complex tasks: disabling a trap, intimidating opponents while breaking through a door.

Specific AP costs for named actions are listed in the [Combat](/docs/free-srd/core-rules/combat/) action catalog and in individual character features.

---

## Movement

Movement is the most common action a character takes during any scene — in combat, during exploration, and in any situation where physical position matters. On a character's turn, they may spend AP to move up to their Speed, to step, or to take other movement-related actions, many of which are listed in the [Combat](/docs/free-srd/core-rules/combat/) action catalog.

### Movement Actions

Move and Step are the two primary movement actions. Both are Standard Actions, and both are also listed in the [Combat](/docs/free-srd/core-rules/combat/) action catalog for reference during play.

*Move*
{{% include "/snippets/move" %}}

*Step*
{{% include "snippets/step" %}}

### Speed

{{% include "/snippets/primary-speed" %}}

#### Speed Modes

The descriptor of a Speed determines what type of movement or terrain the Speed applies to. A character may have Speeds in multiple modes.

- **Ground** — Standard walking and running on solid ground. Most characters have a ground Speed; it should be assumed that a Speed without a descriptor is a ground Speed.
- **Climb** — How fast a character scales vertical surfaces.
- **Swim** — How fast a character moves through water.
- **Fly** — How fast a character moves through the air.

#### Maneuverability

> Maneuverability Rating = Rating Value + Sive Value + Speed Tier

Speeds also have a **maneuverability rating** (High (0), Medium (+2), or Low (+4)) that is used to determine how many spaces are required to make a 90° turn. To determine the turning distance, add the maneuverability number to the character's size value (see [Size](/docs/free-srd/core-rules/size/)), and [Speed Tier](/docs/free-srd/core-rules/action-economy/#speed-tiers). The arc is then traced forward and to the side that many spaces. The minimum is zero spaces, which allows the character to fully turn in place. If a Speed does not provide a Maneuverability rating, treat it as high (0).

Vehicles also use maneuverability ratings when performing complex or difficult maneuvers/move actions. See the [vehicles] <!-- placeholder for link --> for more info on vehicle movement.

#### Combining Speeds

Some movements can combine multiple modes in a single Move action — for example, a character with both a ground and climb Speed may walk across a floor and climb a wall as part of one move. When combining modes, the character's maximum travel distance cannot exceed their Primary Speed.

#### Speed Tiers

Speed in These Lucky Stars is categorized into four tiers based on distance covered per round. These tiers are used to describe how fast something is actually moving at the time another action is taken that affects it. The tiers are used across several rules — including Opportunity Attacks, reaction dodge difficulties, and vehicle impact damage — *Ones current Speed tier is determined by how far their most current movement takes them in one round.* In almost all cases this is determined by a move action where the continuation of that move is assumed or predetermined.

<!-- maybe we add an example of how a characters speed tier is determined by their previous turn,s movement -->

{{% include "/snippets/speed-tiers" %}}

Most characters on foot operate entirely within the **Slow** tier. The **Moderate** tier is reached through extended sprinting, mounts at a trot, or features that push character Speed significantly. **Fast** and **Very Fast** are generally reserved for vehicles, and mounts at gallop. The Opportunity Attacks cannot be made against those moving at the **Fast** and **Very Fast** tiers.

### Difficult Terrain and Obstacles

Difficult terrain — loose ground, dense underbrush, shallow water, rubble — may reduce effective Speed, grant advantage or disadvantage to rolls made within it, or require additional checks to cross. The specifics are left to the GM based on the terrain and the action being attempted, using the usual rules for determing [target numbers](docs/free-srd/core-rules/the-basics/#target-numbers) and [advantage](docs/free-srd/core-rules/the-basics/#advantage). See [Environmental Effects](/docs/free-srd/core-rules/environmental-effects) for a specific example regarding visibility.

---

## Related

- [Stats — Action Points](/docs/free-srd/core-rules/stats/#action-points) and [Stats — Speed](/docs/free-srd/core-rules/stats/#speed) — where these stats sit alongside the rest of the character sheet.
- [Combat](/docs/free-srd/core-rules/combat/) — the full action catalog, attack resolution, and damage calculation.
- [Health](/docs/free-srd/core-rules/health/) — what happens when a character takes damage.

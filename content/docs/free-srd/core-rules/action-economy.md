---
title: "Action Economy"
description: "How AP works in These Lucky Stars — action types, opportunity attacks, reactions, movement, speed tiers, and the tactical choices behind managing your action pool."
weight: 40
---

## Action Economy & Movement

This page covers how a character spends their time and effort during a round of combat, and how they move through the world. The action economy describes *what* a character can do; movement describes *how far* they can go and *how fast*.

---

## Action Points

{{% include "/snippets/action-points" %}}

Specific AP costs for named actions are listed in the [Combat](/docs/free-srd/core-rules/combat/) action catalog and in individual character features.

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

#### Speed Descriptors

{{% include "/snippets/speed-descriptors" %}}

#### Speed Tiers

{{% include "/snippets/speed-tiers" %}}

<!-- maybe we add an example of how a characters speed tier is determined by their previous turn,s movement -->

{{% include "/snippets/speed-tiers-chart" %}}

### Difficult Terrain and Obstacles

Difficult terrain — loose ground, dense underbrush, shallow water, rubble — may reduce effective Speed, grant advantage or disadvantage to rolls made within it, or require additional checks to cross. The specifics are left to the GM based on the terrain and the action being attempted, using the usual rules for determing [target numbers](docs/free-srd/core-rules/the-basics/#target-numbers) and [advantage](docs/free-srd/core-rules/the-basics/#advantage). See [Environmental Effects](/docs/free-srd/core-rules/environmental-effects) for a specific example regarding visibility.

---

## Related

- [Stats — Action Points](/docs/free-srd/core-rules/stats/#action-points) and [Stats — Speed](/docs/free-srd/core-rules/stats/#speed) — where these stats sit alongside the rest of the character sheet.
- [Combat](/docs/free-srd/core-rules/combat/) — the full action catalog, attack resolution, and damage calculation.
- [Health](/docs/free-srd/core-rules/health/) — what happens when a character takes damage.

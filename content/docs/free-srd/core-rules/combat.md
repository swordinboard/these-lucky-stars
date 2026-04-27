---
title: "Combat"
description: "How fights are resolved in These Lucky Stars — initiative, attack and defense rolls, damage types, resistance, surprise attacks, and the full combat action catalog."
weight: 60
---

## Combat

This page covers how fights are resolved in These Lucky Stars — from initiative to damage to the full catalog of combat actions. For how Action Points, action types, and movement work, see [Action Economy & Movement](/docs/free-srd/core-rules/action-economy/). For how damage interacts with a character's health, see [Health](/docs/free-srd/core-rules/health/).

---

## Combat Basics

- Characters enter combat when one declares an aggressive action against another. Initiative is determined immediately upon declaring the action.
- Combat is then played in rounds, with each combatant taking one turn per round in initiative order.
- The most common actions during combat are attack and move. The number of actions a character can take during combat is determined using [Action Points](/docs/free-srd/core-rules/action-economy/#action-points).
- Successful attacks deal damage to the defender's [Defense (DEF)](/docs/free-srd/core-rules/health/#defense). Each time their DEF reaches 0, they lose a point of [Vitality (VIT)](/docs/free-srd/core-rules/health/#vitality). Successful attacks can also result in [wounds and conditions](/docs/free-srd/core-rules/wounds--conditions/).

---

## Initiative

{{% include "/snippets/initiative" %}}

---

## Attacking and Defending

### The Attack Roll: Opposed Rolls

When a character makes an attack against a defender who is aware and able to react, both the attacker and defender make opposed rolls:

Attackers roll their attack (ATK) while defenders roll their defense (DEF).

> **Attacker:** 2d6 + ATK + mods
>
> **Defender:** 2d6 + current DEF + mods

Because the defender's roll uses their *current* DEF they become easier to hit if they have taken damage.

### Advantage and Disadvantage in Combat

The GM may grant [advantage or disadvantage](/docs/free-srd/core-rules/basics/#advantage) to either side of an opposed roll based on tactical or narrative circumstances.

#### Advantages to Consider in Combat

*Type of Attack* — Melee attacks and ranged attacks may face different advantages and disadvantages. It is up to the GM to use their best judgment when determining if the type of attack should give advantage or disadvantage.

*Cover* — For defenders of ranged attacks, solid cover is critical. To use an object as cover it must provide a solid barrier between the attacker and defender and cover at least half of the defender. Cover grants the defender a bonus to their roll. Abilities and proficiencies can further increase the effectiveness of using cover.

*Terrain and Environment* — Especially for melee attacks, difficult terrain for one of the combatants may grant a bonus or penalty to one side's roll. Environmental effects such as obscured vision from smoke or darkness, or heavy winds or rainfall, may also change the result of an attack, particularly ranged attacks. In most cases both attacker and defender being blinded simply results in no change, as both combatants are equally disadvantaged.

> [!TIP]
> If a defender is on uneven or loose ground and the attacker has solid footing, the attacker gains a +3 minor advantage to their roll. If the attacker is standing in dense underbrush while the defender is on a cleared path, the defender gains a +3 minor advantage to their roll. If both the attacker and defender are standing on a tightrope, no change would occur.

### Surprise Attacks

Characters who have not yet engaged in combat or who are otherwise unable to defend themselves are vulnerable to surprise attacks. When making a surprise attack, the attacker rolls normally, while the defender rolls only their decision dice (Luck may still be applied).

Surprise attacks still benefit from advantage/disadvantage if the GM determines the situation warrants it, such as attacking from an ideal ambush position, or attacking an opponent who is behind partial cover.

Making a surprise attack counts as a special attack action, but requires no additional AP other than that of the attack being used. In many cases, a surprise attack will initiate combat. Once the defender has acted in initiative, all subsequent attacks against them become normal attack rolls.

---

## Steps to an Attack

1. Declare the attack and announce any relevant advantages or disadvantages. The GM will decide what applies.
2. Both attacker and defender roll simultaneously.
3. Compare totals. If the attacker's total exceeds the defender's total, the attack is successful.
4. If the attack is successful, damage is applied, the GM describes what has occurred, and play continues.

---

## Damage

> **DAMAGE = (Damage Dice + Attribute Used in Attack + Modifiers) × Resistance**

### Damage Dice

{{% include "/snippets/damage-dice" %}}

### Damage Modifiers

- The attribute used to make the attack roll is added to the damage total.
- Unarmed attacks deal −3 damage before damage resistance.
- Minimum damage from most attacks is **1** unless a resistance determines otherwise.
- Equipment and character features may also provide damage modifiers.

### Damage Types

Every attack has a damage type based on the weapon or effect used. When an attack has multiple damage types, the attacker must declare a **primary type** before rolling. The primary type is used to determine if resistance applies.

Damage types include: Physical, Mental, Toxin, Burn, Cold, Shock, Radiation, Sonic, and Magic.

### Damage Sources

**Normal Damage** — Damage that comes from a direct source such as an attack or a trap is considered normal damage and is applied to the character's DEF before potential VIT loss. If there is an action responsible for the damage or if the damage could have been dodged or physically avoided, it is most likely normal damage.

**Exposure Damage** — Damage that is unavoidable and sustained over time is considered exposure damage. Most sources of exposure damage are from the environment. Exposure damage leads to attribute checks, and often causes conditions and VIT loss.

**Extreme Damage** — If a damage source is considered outside the typical realm of survivability for a living creature, it is considered extreme damage. Extreme damage and extreme exposure exist primarily to overcome or alter how resistances interact with those damage sources. Most extreme sources come from things much larger than the defender or highly inhospitable environments.

### Damage Resistance and Weakness

**Partial Resistance [÷2]** — Normal damage of this type is halved. Extreme damage and exposure bypass partial resistance.

**Full Resistance [×0 or ÷2]** — Normal damage of this type is reduced to zero. Extreme damage of this type is halved. Exposure effects, including extreme exposure effects, of this type are ignored. New sources of normal damage during extreme exposure may bypass full resistance at the GM's discretion; usually resulting in taking half damage unless it is being sustained often, at which point the full damage may be taken. The combination of direct damage and exposure damage is often too much to bear in any situation.

**Weakness [×2]** — Normal and extreme damage of this type is doubled. Attribute checks made to resist effects of this type are made at a major disadvantage (including those from exposure).

---

## Applying Damage

{{% include "/snippets/health-loop" %}}

A damaged character's DEF remains damaged until they take another point of VIT damage or are able to reset their DEF either through an action in combat or when combat ends. See the [Defense](/docs/free-srd/core-rules/health/#defense) section under Health for complete DEF reset rules.

An attack that deals 2 or more VIT damage or reduces the defender to 0 VIT inflicts a wound. See [Vitality](/docs/free-srd/core-rules/health/#vitality) under Health for wound triggers, reaching 0 VIT, and VIT recovery.

---

## Actions in Combat

The following catalog lists the most common actions characters take during combat. All actions listed here are [Standard Actions](/docs/free-srd/core-rules/action-economy/#standard-actions) unless noted otherwise.

Actions in combat are organized by their tactical role: **Aggressive Actions** are actions that present a threat, provoke responses, or advance a character's position offensively. **Defensive Actions** are actions that protect, reposition safely, or prepare for future events. Some actions may be either aggressive or defensive depending on circumstances — a [Readied Action](/docs/free-srd/core-rules/action-economy/#readied-actions) to attack is aggressive; a Readied Action to take cover is defensive. This classification matters for rules like Opportunity Attacks, which trigger on aggressive actions.

### Aggressive Actions

**Standard Attack** *(2 AP)* — Once per turn, make a basic melee or ranged attack with any weapon, or an unarmed attack.

*Move — (2 AP)*

{{% include "/snippets/move" %}}

**Opportunity Attack** *(1 AP — Opportunity Action)*

{{% include "/snippets/opportunity-attack" %}}

**Disarm** *(3 AP)* — Attempt to disarm an opponent with a melee weapon you are proficient with. Make a standard attack roll; if successful, instead of dealing damage make contested STR rolls. Success causes the opponent to drop their weapon.

**Draw a Weapon** *(1–3 AP)* — Drawing an equipped weapon or picking one up that is within your reach costs 1 AP. Drawing a concealed weapon costs 3 AP.

*Grapple — (2 AP)*

{{% include "/snippets/grapple" %}}

**Shatter** *(3 AP)* — Attempt to break an item held or worn by an opponent. Make a standard attack roll; if successful, deal damage to the item rather than the opponent. See the Equipment section for rules on damaged and broken gear.

**Stand** *(1 AP)* — Stand from prone. May provoke an Opportunity Attack.

**Trip** *(3 AP)* — Make a standard attack roll. If successful, instead of dealing damage make a contested roll, the Attacker's STR vs. Defender's AGI. Attacker success causes the defender to fall prone.

**Unarmed Attack** *(2 AP)* — Functions as a standard attack but deals −3 damage. Cannot be used for an Opportunity Attack without the [Martial Training](/docs/free-srd/character-creation/proficiencies/#martial-training) proficiency.

---

### Defensive Actions

**Readied Action** — Declare an action and a trigger during your turn. AP is paid immediately. The action resolves when the trigger occurs, any time before the start of your next turn. Readied actions are vulnerable to interruption or distraction, and a character may choose to abandon a readied action at any point before it resolves. The committed AP is lost whether the action fires or not. See [Readied Actions](/docs/free-srd/core-rules/action-economy/#readied-actions) under Action Economy for the full rules.

*Stealth*

{{% include "/snippets/stealth" %}}

*Step — (1 AP)*

{{% include "/snippets/step" %}}

**Use Cover** *(1 AP or as part of a Move)* — Shifting cover types can be done as part of a Move action or for 1 AP if staying in place. Cover type depends on how much of the defender is visible to the attacker, and whether the attack can penetrate the obstacle.

> **Partial Cover** — At least half the defender's body is behind a solid, impenetrable object, or at least half is hidden from view.
>
> **Full Cover** — The defender's entire body is behind an impenetrable object. Attackers must bypass or destroy the cover to land a hit. A character behind full cover cannot declare attacks until they move to at least partial cover.

---

## Related

- [Health](/docs/free-srd/core-rules/health/) — the two-layer health system, how DEF and VIT interact with damage.
- [Action Economy & Movement](/docs/free-srd/core-rules/action-economy/) — Action Points, action types, movement rules, and Speed Tiers.
- [Wounds & Conditions](/docs/free-srd/core-rules/wounds--conditions/) — wound severities, condition effects, and recovery.
- [Size](/docs/free-srd/core-rules/size/) — how size affects damage dice, reach, and space occupied.
- [Environmental Effects](/docs/free-srd/core-rules/environmental-effects/) — hazards, exposure, and environmental damage sources.

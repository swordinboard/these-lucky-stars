---
title: "Health and Combat"
weight: 4
draft: false
---

## Health

Combat in These Lucky Stars uses a unique health system. The first layer, Defense, represents how well a character defends against attacks, both in avoiding then and bracing against them. The second layer, Vitality, represents how much of a beating or how many injuries a character can withstand before they are incapacitated. During combat a character may also withstand wounds and conditions which, while related, have their own set of effects that change gameplay and demand attention to resolve.

Links to health-related resouces:
- [Defense](/docs/free-srd/stats/#defense)
- [Vitality](/docs/free-srd/stats/#vitality)
- [Wounds and Conditions]

## Combat Basics

- Combat begins when a character declares an attack or some other aggressive action against another. Initiative is then determined.
- Combat is played in rounds, with each combatant taking one turn per round in initiative order.
- The most common actions during combat are attack and move. The number of actions a character can take during combat is determined using Action Points.
- Successful attacks deal damage to the defenders Defense (DEF). Each time their DEF reaches 0, they lose a point of Vitality (VIT). Successful attacks can also result in wounds and conditions.

---

## Initiative

Initiative determines the order in which characters take their turns during each *round.* When the first attack is declared, all combatants roll initiative and are placed in order from highest to lowest. The combatant with the highest initiative goes first and play continues in decending order. 

**The character that declares the first attack gains a +6 bonus to their initiative roll.** If multiple characters are acting in unison — such as in a coordinated ambush — all allies involved gain the +6 bonus. Note that initiating combat does not guarantee that character goes first nor guarantee their intended action plays out. In situations where another character goes before the initiating character, it means their Insight tipped them off and they have sensed the immediate threat. Narratively, characters can be saved by instinct or gut feeling in this way.

{{% hint note %}}
In an initiative tie between opponents, the group that initiated combat goes first. In a tie between allies, the players decide the order and may change it from round to round.
{{% /hint %}}

## Taking Action

On their turn, each character spends **Action Points (AP)** to perform actions. All characters have **4 AP** per round, which replenish at the start of their turn. Like other stats, your number of AP available can be affected by modifiers from character features or other effects.

Generally, the more time or effort an action requires, the more AP it costs:

- **1 AP** — Simple tasks: picking up an item, drawing a weapon, stepping to an adjacent space, opening a door, drinking a potion already in hand.
- **2 AP** — Focused tasks: making an attack, moving up to your speed.
- **3+ AP** — Complex tasks: disabling a trap, intimidating opponents while breaking through a door.

### Multi-Round Actions:

Special actions may include instructions for completing them over multiple rounds or with multiple characters if there is a high AP requirement. In most cases, the action must be done uninterrupted and in consecutive rounds/actions. Many things can interrupt multi-round actions such as enviromental effects, defending from attacks, or other distractions. Typically a **Will** check can be used to remain focused through distracting effects and a **FORT** check cab be used to remain focused through physical effects.

---

## Attacking and defending

### The Attack Roll: Opposed Rolls

When a character makes an attack against a defender who is aware and able to react, both the attacker and defender make opposed rolls:

> **Attacker:** 2d6 + ATK + mods
> 
> **Defender:** 2d6 + current DEF + mods

Because the defenders roll uses their *current* DEF they become easier to hit if they have taken damage.

### Advantage and Disadvantage in Combat

The GM may grant advantage or disadvantage to either side of an opposed roll based on tactical or narrative circumstances. 

#### Advantages to Consider in Combat

*Type of Attack* — Melee attacks and ranged attacks may face different advantages and disadvantages. It is up to the GM to use their best judgment.

*Cover* — For defenders of ranged attacks, solid cover is critical. To use an object as cover it must provide a solid barrier between the attacker and defender and cover at least half of the defender. Cover grants the defender a bonus to their roll. Abilities and proficiencies can further increase the effectiveness of using cover.

*Terrain and Environment* — Especially for melee attacks, difficult terrain for one of the combatants may grant a bonus or penalty to one side's roll. Environmental effects such as obscured vision from smoke or darkness, or heavy winds or rainfall, may also change the result of an attack, particularly ranged attacks. In most cases both combatants of an attack being blinded simply results in no change, as both combatants are equally disadvantaged.

{{% hint tip %}}
**Example:** If a defender is on uneven or loose ground and the attacker has solid footing, the attacker gains a +3 minor advnatage to their roll. If the attacker is standing in dense underbrush while the defender is on a cleared path, the defender gains a +3 minor advantage to their roll. If both the attacker and defender are standing on a tightrope, no change would occur.
{{% /hint %}}
[Advantage and Disadvantage](/docs/free-srd/core-mechanics/#advantage-and-disadvantage)

### Surprise Attacks

Characters who have not yet engaged in combat or who are otherwise unable to defend themselves are vulnerable to surprise attacks. When making a surprise attack, the attacker rolls normally, while the defender rolls only their decision dice (Luck may still be applied). 

Surprise may attacks still benefit from advantage if the GM determines the situation warrants it, such as attacking from an ideal ambush position.

Making a surprise attack counts as a special attack action, but requires no additional AP other than that of the attack being used. In many cases, a surprise attack will initiate combat. Once the defender has acted in initiative, all subsequent attacks against them become normal attack rolls.

---

## Steps to an Attack

1. Declare the attack and announce any relevant advantages or disadvantages. The GM will decide what applies.
2. Both attacker and defender roll simultaneously.
3. Compare totals. If the attacker's total exceeds the defender's total, the attack is successful.
4. If the attack is successful, damage is applied, the GM describes what has occured, and play continues.

---

## Damage

> **DAMAGE = (Damage Dice + Attribute Used in Attack + Modifiers) × Resistance**

### Damage Dice

Base damage dice are determined by the size of the attacker relative to the defender:

| Attacker vs. Defender | Damage Die |
|---|---|
| Two or more sizes smaller | 1d4 |
| Same size or ±1 size | 1d8 |
| Two or more sizes larger | 1d12 |

**Bonus Damage** — Attack rolls that beat the target by 5 or more gain an additional damage die.

### Damage Modifiers

- The attribute used to make the attack roll is added to the damage total.
- Unarmed attacks deal −3 damage before damage reduction.
- Minimum damage after reduction is **1**.
- Equipment and character features may also provide damage modifiers.

### Damage Types

Every attack has a damage type based on the weapon or effect used. When an attack has multiple damage types, the attacker must declare a **primary type** before rolling. The primary type is used to determine if resistance applies.

Damage types include: Physical, Mental, Toxin, Burn, Cold, Shock, Radiation, Sonic, and Magic.

### Damage Resistance and Weakness

- **Partial Resistance [÷2]** — Damage of this type is halved. Extreme damage bypasses partial resistance.
- **Full Resistance [×0 or ÷2]** — Damage is reduced to 0, unless from an extreme source, in which case it is halved.
- **Weakness [×2]** — Damage of this type is doubled.

### Extreme Damage

Extreme damage has no defense against it. It reduces or bypasses damage resistances and may deal automatic VIT damage regardless of resistance or weakness. Primarily reserved for environmental hazards, though some character features and equipment can also inflict extreme damage.

---

## Applying Damage

Once total damage is calculated, it is dealt to the defender's **Defense (DEF)**. When DEF reaches 0:

1. The defender takes **1 point of Vitality (VIT)** damage.
2. DEF resets.
3. Any remaining damage continues to drain the new DEF.

This repeats until all damage is dealt or VIT reaches 0.

An attack inflicts a **wound or condition** on the defender if it:
- Dealt 2 or more VIT damage, or
- Caused the defender to reach 0 VIT.

If VIT reaches 0, the character is **incapacitated** — and the attacker decides whether the blow was lethal or non-lethal. A lethal blow applies the dying condition.

---

## Actions in Combat

### Aggressive Actions

**Standard Attack** *(2 AP)* — Once per turn, make a basic melee or ranged attack with any weapon, or while unarmed.

**Move** *(2 AP)* — Move up to your speed. This action can be taken multiple times per turn.

**Attack of Opportunity (AOO)** *(1 AP)* — Once per round during another character's turn, you may make an attack of opportunity against any character within your melee reach who takes an aggressive action you are not defending against. Requires a melee weapon and having already acted in combat. Cannot normally be made unarmed.

**Disarm** *(3 AP)* — Attempt to disarm an opponent with a melee weapon you are proficient with. Make a standard attack roll; If successful, instead of dealinh damage make contested STR rolls. Success causes the opponent to drop their weapon.

**Grapple** *(2 AP)* — Make a contested grapple check. The winner chooses to engage or end the grapple immediately. The character in control can act normally; the pinned character must spend 1 AP at the start of their turn to attempt to regain control. If unsuccessful, they take no other actions.

> *In Control:* Move up to 10ft with grappled opponent (3 AP), Attack with a light weapon or unarmed attack (3 AP), End Grapple (1 AP), Toss opponent up to 10ft with a successful STR roll (3 AP).
>
> *Pinned:* Attempt to gain control with a contested grapple check (1 AP).

**Shatter** *(3 AP)* — Attempt to break an item held or worn by an opponent. Make a standard attack roll; if successful, deal damage to the item rather than the opponent. See the Equipment section for rules on damaged and broken gear.

**Stand** *(1 AP)* — Stand from prone. May provoke an attack of opportunity.

**Trip** *(3 AP)* — Make a standard attack roll. If successful, instead of dealing damage make a contested STR vs. AGI roll. Success causes the opponent to fall prone.

**Unarmed Attack** *(2 AP)* — Functions as a standard attack but deals −3 damage. Cannot normally be used for an AOO.

---

### Defensive Actions

**Ready Action** — Withhold all actions to respond to a specific trigger. Declare both the action and the trigger during your turn. When the trigger occurs, complete your declared action in response. Readied actions are vulnerable to interruption or distraction. See [multi-turn actions](/docs/health-and-combat/#multi-turn-actions) for more.

**Stealth** — Stealth actions generally do not cost additional AP. Moving silently costs the same as a move action; hiding behind an object costs the same as taking cover. Most stealth checks start at target 8. If an opponent is actively searching, they may roll INS to detect you.

**Step** *(1 AP)* — Move one space (5ft) at any point during your turn as a defensive action.

**Use Cover** *(1 AP or as part of a Move)* 
The use of available cover is assumed during combat. Shifting cover types can be done as part of a move action, or for 1 AP if staying in place.
Cover type depends on how much of the defender is blocked, how much is visible to the attacker, and whether the attack can penetrate the obstacle.

> **Partial Cover** — At least half the defender's body is behind a solid, impenetrable object, or at least half is hidden from view.
>
> **Full Cover** — The defender's entire body is behind an impenetrable object. Attackers must bypass or destroy the cover to land a hit. A character behind full cover cannot declare attacks until they move to at least partial cover.


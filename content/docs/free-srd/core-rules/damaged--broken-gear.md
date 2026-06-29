---
title: "Damaged & Broken Gear"
description: "Rules for damaging and destroying objects, equipment, and structures in These Lucky Stars."
weight: 85
---

# Damaged & Broken Gear

Objects, equipment, and structures can be damaged and broken. This page covers how items are targeted by attacks, item conditions, how object durability works, and how common materials and items hold up under attack.

Before committing to damaging an object the table should first consider if the damage *makes sense*. When it really comes down to it, all objects can be broken with the right combination of time, proper tools, and effort. But getting that combination together, especially under pressure of combat, isn't always realistic. Just because an object can be struck doesn't mean it will be damaged. This is especially true for items designed for defense which have their own rules discussed later in the section.

> [!IMPORTANT]
> Object damage is often left to common sense. Stabbing at an armored tank with a spear or slashing at a brick wall with a sword should not damage the tank or wall in any meaningful way. Before following through with rolls and damage, ask if the situation would make sense.
>
> In most cases breaking objects is seldom the primary goal of combat, so these rules are somewhat supplemental to those rules and build on the existing system. However, damaging objects and environments can add tactical options during combat and variation to session and puzzle structure.

---

## Targeting Objects

When attacking an unoccupied object one must succeed on a standard attack roll against a target set by the GM. The table below provides a rough list to start with for stationary objects targeted by melee attacks based on the difficulties provided on the [Basics](/docs/free-srd/core-rules/basics/#target-difficulty-guide) page. Moving targets and objects at range should see raised ATK roll targets.

| Object Size          | Base Target |
| -------------------- | ----------- |
| Coin sized           | 14          |
| Fist sized           | 8           |
| Soccer ball sized    | 6           |
| Door sized           | 4           |
| Broad side of a barn | 2           |

Attacking an object that is held, worn, equipped, or otherwise carried by an opponent uses the [Shatter](/docs/free-srd/core-rules/combat/#aggressive-actions) action, which applies damage directly to the item.

---

## Object Durability

Objects use the same DEF and VIT system as characters with minor modifications.

In the case of objects, **DEF** represents the object's structural resistance rather than ability to defend itself. As such *an object's DEF does not reset unless it reaches 0 or until repaired.*

> [!IMPORTANT]
> **Key difference from characters:** Unlike characters, object DEF does not reset at the end of combat or when out of danger — accumulated damage to DEF persists until the object is repaired. (An object's DEF still resets when it reaches 0, the same as a character's.)
> Objects cannot defend themselves; their DEF represents their structural integrity rather than their ability to avoid harm.

An object's VIT represents its current condition in terms of wear and function. All objects have 3 VIT by default. As an object loses VIT it passes through three named conditions — Full Function, Damaged, and Broken — detailed below. Some items carry the [Fragile](/docs/free-srd/inventory--equipment/item-tags/#fragile) or [Durable](/docs/free-srd/inventory--equipment/item-tags/#durable) tags, which raise or lower an item's maximum VIT, but the conditions appear at the same stages.

---

## Object Conditions

An object's current VIT places it into one of three conditions. These are fully formed terms — use them directly at the table ("the door is Damaged," "the terminal is Broken") rather than reciting VIT totals.

*If an item gains the Broken or Damaged condition directly, their VIT falls to the appropriate level automatically. Gaining the Full Function condition directly returns it to 2 VIT or max VIT as described by the effect.*

**Full Function** — The object is at 2 or more VIT. It operates exactly as intended, with no penalties, narrative or mechanical. This does not mean an item is brand new or well maintained, only that it functions as intended. Objects may still be described as worn, dirty, or weathered even at full VIT.

**Damaged** — The object is at 1 VIT. It still functions but visibly shows the harm it's taken; cracked casing, fresh scorch marks, grinding hinges or gears, sparking or exposed wiring, chipped blade, and so on. *The GM may layer on additional narrative or mechanical effects fitting the object and situation.* This should reflect the item's material and construction, the type of damage, and the manner in which the item is being damaged.

- Some damaged objects that normally provide full cover may be reduced to partial cover as chunks are broken off or holes are pierced through.
- Complex pieces of equipment that reach this state may have a 20% chance of failure; electronics malfunction, supplies are wasted, magical effects stutter.

**Broken** — The object is at 0 VIT. It no longer functions and is treated as destroyed for most purposes. A Broken object that provided cover may still offer partial cover at the GM's discretion, based on its size, material, and how it was destroyed.

---

## Material DEF

The DEF of a material is determined by its composition and thickness. Use the tables below as a reference for estimating the DEF of objects. Objects made of many parts often have lower DEF due to the fragility of joints or the malleability of thin layers.

| Material                           | DEF per inch of thickness |
| ---------------------------------- | ------------------------- |
| Glass                              | 1                         |
| Paper                              | 1 per 10 pages            |
| Cloth                              | 1 per layer               |
| Rope or heavy cloth                | 2                         |
| Ice                                | 3                         |
| Plastic or leather                 | 8                         |
| Wood                               | 10                        |
| Concrete or brick                  | 16                        |
| Soft metal (aluminum, copper)      | 18                        |
| Reinforced concrete or solid stone | 20                        |
| Hard metal (iron, steel)           | 20                        |

**Common Items**

| Item                                    | DEF |
| --------------------------------------- | --- |
| Handheld tech (comp jack, bio scanner)  | 4   |
| Light melee weapons                     | 6   |
| Fuel cells                              | 6   |
| Micro, small, and medium batteries      | 8   |
| Most ranged weapons                     | 8   |
| Light armor                             | 8   |
| Medium melee weapons                    | 10  |
| Basic doors, furniture                  | 14  |
| Large and industrial batteries          | 14  |
| Heavy armor                             | 14  |
| Two-handed weapons, polearms and staffs | 16  |
| Reinforced doors                        | 35  |

---

## Breaking Defensive Items

**Armor** — Because armor is designed to take a beating, armor typically cannot be broken or damaged through normal wear and use. Instead equipped armor degrades in condition whenever the wearer suffers a major wound. Normal armor becomes *Damaged* when the wearer suffers a major wound, and Damaged armor becomes *Broken* in the same manner (VIT is adjusted accordingly for each condition). *Damaged* armor functions as normal but visibly shows its near-broken condition. *Broken* armor provides no DEF bonus. Armor cannot be targeted by the Shatter action, except where a specific weapon or effect states otherwise.

**Shields** — Similar to armor, shields (such as a [Ballistic Shield](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/#ballistic-shield)) are designed to absorb damage and take a beating. Shields use supply dice before deteriorating in condition through use. A supply roll is made each time the wielder's DEF is depleted from damage while using a shield to defend themselves. Shield use is automatic when equipped, even if the wielder has not yet acted in initiative. When a shield reaches a supply of 1d4 it is *Damaged.* When its supply is depleted it is *Broken.* *Damaged* shields function as normal, but visibly show their near-broken condition and take more work to repair. *Broken* shields cannot be used to defend oneself and are best discarded until repairs can be made. Shields can be targeted by the Shatter action. If successful, rather than dealing damage directly, the shield's supply die size is automatically lowered by one and half of the total damage is transferred to the defender as normal.

---

## Related

- [Health](/docs/free-srd/core-rules/health/) — the two-layer DEF/VIT system that object durability is built on.
- [Combat](/docs/free-srd/core-rules/combat/#aggressive-actions) — the Shatter action and full combat rules.
- [Wounds & Conditions](/docs/free-srd/core-rules/wounds--conditions/) — wound severities and conditions for characters.
- [Item Tags](/docs/free-srd/inventory--equipment/item-tags/) — Fragile and Durable tags that modify an object's maximum VIT.
- [Inventory & Equipment](/docs/free-srd/inventory--equipment/equipment/) — equipment overview, armor, and shields.
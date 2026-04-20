---
title: "Health"
weight: 40
draft: true
---

## Health

Combat in These Lucky Stars uses a two-layer health system. The first layer, **Defense (DEF)**, represents how well a character defends against attacks — both avoiding them and bracing against them. The second layer, **Vitality (VIT)**, represents how much of a beating or how many injuries a character can withstand before they are incapacitated. During combat, characters may also accumulate [wounds and conditions](/docs/free-srd/core-rules/wounds--conditions/), which have their own effects and recovery rules.

---

## Defense

{{% include "/snippets/defense" %}}

---

## Vitality

{{% include "/snippets/vitality" %}}

---

## Applying Damage

<!-- SNIPPET CANDIDATE: def-vit-loop — will also be used on Combat page during damage resolution -->

Once total [damage](/docs/free-srd/core-rules/combat/#damage). is calculated, it is dealt to the defender's current **Defense (DEF)**. When DEF reaches 0:

1. The defender loses **1 point of Vitality (VIT).**
2. DEF resets to max.
3. Any remaining damage is applied to the new DEF.

This repeats until all damage is dealt or VIT reaches 0.

For how damage totals are calculated — damage dice, modifiers, resistance, and damage types — see [Combat](/docs/free-srd/core-rules/combat/#damage).

---

## Related

- [Stats](/docs/free-srd/core-rules/stats/#health--defense-stats) — where DEF and VIT sit alongside the rest of the character sheet.
- [Combat](/docs/free-srd/core-rules/combat/) — initiative, attack resolution, and damage calculation.
- [Wounds & Conditions](/docs/free-srd/core-rules/wounds--conditions/) — wound severities, condition effects, and recovery.

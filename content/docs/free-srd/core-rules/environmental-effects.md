---
title: "Environmental Effects"
weight: 7
---

# Environmental Effects

Environmental effects are a tool for the GM to add texture and tension to encounters. They are not meant to be tracked in every single encounter — most weather and terrain is narrative flavor. The GM should only apply mechanical effects when the environment is severe enough to meaningfully affect the characters or when it would make a situation more interesting.

Environmental effects do two things: non-damaging effects alter decision rolls through advantage and disadvantage, while mexposure effects threaten a character's health through conditions, wounds, and VIT damage.

---

## Visibility

Smoke, fog, darkness, dust, heavy rain, and similar conditions limit what characters can see. Visibility effects alter decision rolls rather than causing direct harm. The GM decides the severity based on the situation.

**Obscured** — Vision is partially blocked. Light fog, rain, dim lighting, thin smoke. Ranged attacks and perception-related checks suffer **minor disadvantage** (−3).

**Heavily Obscured** — Vision is almost entirely blocked. Dense fog, heavy smoke, total darkness, blinding storms. Ranged attacks and perception-related checks suffer **major disadvantage** (−1 decision die). Characters may need to make decision rolls to navigate around hazards.

When both sides of an opposed roll are equally affected by visibility, no change is made — the disadvantage cancels out. However, surprise attacks become easier to set up when neither side can see. The GM should consider whether characters can detect each other through sound, smell, or other means.

*Weather and Terrain* — Heavy storms may combine visibility penalties with difficult terrain (reducing movement speed) and may interrupt multi-turn actions. Characters on exposed or elevated terrain during a storm may need FORT or AGI checks to keep their footing.

It is worth noting thay the rules for visibility and terrain are not a separate set of rules — they are immersive applications of the existing advantage, disadvantage, and multi-turn action interruption rules found in [Health & Combat](/docs/free-srd/core-rules/health--combat/).

> [!TIP]
> **Example:** A smoke grenade fills a corridor. Attackers firing into the smoke suffer major disadvantage. Two characters fighting in melee inside the smoke are both equally blinded — their opposed rolls are unchanged, but a third character sneaking up on either of them could make a surprise attack.

---

## Heat & Cold

Temperature extremes are the most common environmental threat and source of exposure damage. When a character is exposed to dangerous heat or cold without adequate protection, the GM sets two things: an **exposure interval** (how often the environment takes its toll) and a **FORT target** (how hard it is to resist).

| Severity | Exposure Interval | Suggested FORT Target |
|---|---|---|
| Mild | 1 hour | 6 |
| Harsh | 10 minutes | 8 |
| Severe | A few rounds | 10–12 |

*Appropriate protection* — A full resistance to the appropriate damage type (burn or cold), or protective items such as warm clothing, shade and water, or shelter — can reduce or eliminate the need for checks entirely. The GM may also shorten the interval or raise the target as conditions worsen.

At the end of each exposure interval, an unprotected character makes a FORT check:

**First Failure** — The character gains the [fatigued condition](/docs/fres-srd/core-rules/wounds--conditions/#fatigued). A character who is already fatigued from any source skips this step.

**Second Failures** — The character suffers a **minor burn wound**. Cold injuries such as frostbite are treated mechanically as burns for all purposes.

**Third and Subsequent Failures** — The character suffers **1 VIT loss** each failure and the GM may worsen wounds to major if the situation calls for it.

If VIT reaches 0 from exposure the character falls unconscious. Exposure VIT loss typicallly begins as non-lethal, but the GM may rule otherwise if rescue is not possible. An unconscious character who remains exposed may continue to deteriorate at the GM's discretion with further FORT checks, and continued failure resulting in the dying condition.

Removing a character from the hazardous environment stops this progression. Each individual condition from exposure (fatugured, unconscious, dying) is removed with 1 hour of rest in a safe environment per condition. Burn wounds must be dressed and healed normally.

> [!TIP]
> **Example:** The party is crossing a frozen mountain pass in a snowstorm. The GM sets the interval at 10 minutes with a target 8 FORT check. Mara, who left her heavy coat behind to save carry weight, fails her first check and becomes fatigued. Ten minutes later she fails again — receiving a minor burn wound from frostbite. The party decides to set up camp before things get worse, and are able to shelter by a fire. After an hour, Mara's fatigue is healed but her wound still needs attention.

---

## Toxic Atmosphere

Toxic atmospheres use existing conditions. Mild irritants — thin smoke, airborne particulates, foul air — cause the **sick** condition for as long as the character is exposed and 1d4 rounds after. Unbreathable air — vacuum, dense toxic fumes, oxygen deprivation — causes the **asphyxiating** condition immediately, following its existing rules. Some atmospheres are both toxic and breathable; for prolonged exposure to these, the GM may escalate from sick to fatigued and then to VIT damage, following the same pattern as heat and cold.

---

## Environmental Injuries

The following extends the Common Injuries table in [Wounds & Conditions](/docs/free-srd/core-rules/wounds--conditions/#common-injuries):

| Damaging Effect | Typical Wound Types | Common Conditions |
|---|---|---|
| Prolonged heat exposure (burn) | Burn | Fatigued, Shaken |
| Prolonged cold exposure (cold) | Burn (frostbite) | Fatigued, Shaken |
| Smoke or toxic fume inhalation (toxin) | — | Sick, Asphyxiating, Fatigued |

---

## Exteme Environments
**Sci-Fi Module Addition**
{{% include "/snippets/extreme-environments" %}}
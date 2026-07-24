---
title: "Environmental Effects"
id: environment/environmental-effects
category: [core]
type: rule
tier: core
reference: low
tags: [environment]
headless: true
---

Environmental effects are a tool for the GM to add texture and tension to encounters. They are not meant to be tracked in every single encounter — most weather and terrain is narrative flavor. The GM should only apply mechanical effects when the environment is severe enough to meaningfully affect the characters or when it would make a situation more interesting.

Environmental effects do two things: non-damaging effects alter decision rolls through advantage and disadvantage, while exposure effects threaten a character's health through conditions, wounds, and VIT damage.

## Exposure Intervals

When a character is exposed to dangerous environment without adequate protection, the GM sets two things: an **exposure interval** (how often the environment takes its toll) and a **FORT target** (how hard it is to resist). Examples using severity descriptors are provided in the following chart:

| Severity | Exposure Interval | Suggested FORT Target |
|---|---|---|
| Mild | 1 hour | 6 |
| Harsh | 10 minutes | 8 |
| Severe | A few rounds | 10 |

At the end of each exposure interval affected characters must make a *FORT check.* Failure leads to conditions, wounds, and/or VIT damage as described by the type of environment. Success avoids harm, but raises the target of the FORT check by 1 for the next interval if the character remains exposed.

Each type of environemtnal effect has its own exposure concequences tied to these FORT checks. The effects of a high heat environment and a room of toxic fumes are different, but the exposure intervals work the same. 

### Heat & Cold

High and low temperature are the most common environmental threats and sources of exposure damage.

*Appropriate protection* — Full exposure resistance to the appropriate damage type (burn or cold), or protective items such as warm clothing, shade and water, or shelter — can reduce or eliminate the need for checks entirely. The GM may also shorten the interval or raise the target as conditions worsen.

**Exposure** — At the end of each exposure interval, an unprotected character makes a FORT check:

- **First Failure** — The character gains the [fatigued condition](/docs/free-srd/core-rules/wounds--conditions/#fatigued). A character who is already fatigued from any source skips this step as if suffering fron their second failure.
- **Second Failure** — The character suffers a **minor burn wound**. Cold injuries such as frostbite are treated mechanically as burns for all purposes.
- **Third and Subsequent Failures** — The character suffers **1 VIT loss** from each failure and the GM may worsen untreated wounds to major if the situation calls for it.

If VIT reaches 0 from exposure the character falls unconscious. Exposure VIT loss typicallly begins as non-lethal for mild and harsh effects, but the GM may rule otherwise if rescue is not possible or if succumbing to severe effects. An unconscious character who remains exposed may continue to deteriorate at the GM's discretion with further FORT checks, with continued failure resulting in the dying condition.

Removing a character from the hazardous environment stops this progression. The fatigued and unconscious conditions from hrat/cold exposure are removed individually with 1 hour of rest in a safe environment per condition. Burn wounds and the dying condition must be dressed and healed normally. 

> [!TIP]
> **Example:** The party is crossing a frozen mountain pass in a snowstorm. The GM sets the interval at 10 minutes with a target 8 FORT check. Mara, who left her heavy coat behind to save carry weight, fails her first check and becomes fatigued. Ten minutes later she fails again — receiving a minor burn wound from frostbite. The party decides to set up camp before things get worse, and are able to shelter by a fire. After an hour, Mara's fatigue is healed but her wound still needs attention.


### Toxic Atmosphere

Mild airborne irritants such as thin smoke, airborne particulates, or foul air pose and sometimes difficult to detect threat.

**Exposure** — At the end of each exposure interval, an unprotected character makes a FORT check:

- **First Failure** — The character gains the [shaken](/docs/free-srd/core-rules/wounds--conditions/#shaken) condition brought on by coughing fits.
- **Second Failure** — The character gains the **sick** condition for as long as the character is exposed and 1d4 rounds after.
- **Third and Subsequent Failures** — The character suffers **1 VIT loss** from each subsequent failure.

**Unbreathable Air** — Characters exposed to an environment they cannot breathe in at all gain the **asphyxiating** condition immediately. Not all toxic environments are unbreathable and not all unbreathable environments are toxic.

---

## Visibility

Smoke, fog, darkness, dust, heavy rain, and similar conditions limit what characters can see. Visibility effects alter decision rolls rather than causing direct harm, amd do not rely on exposure intervals. The GM decides the severity based on the situation.

**Obscured** — Vision is partially blocked. Light fog, rain, dim lighting, thin smoke. Ranged attacks and perception-related checks suffer **minor disadvantage.**

**Heavily Obscured** — Vision is almost entirely blocked, often limited to 10ft or less. Dense fog, heavy smoke, total darkness, blinding storms. Ranged attacks and perception-related checks suffer **major disadvantage.** Characters may need to make decision rolls to navigate around hazards.

When both sides of an opposed roll are equally affected by visibility, no change is made — the disadvantage cancels out. However, surprise attacks become easier to set up when neither side can see. The GM should consider whether characters can detect each other through sound, smell, or other means.

*Weather and Terrain* — Heavy storms may combine visibility penalties with difficult terrain (reducing movement speed) and may interrupt multi-turn actions. Characters on exposed or elevated terrain during a storm may need to make AGI checks to keep their footing.

It is worth noting thay the rules for visibility and terrain are not a separate set of rules — they are immersive applications of the existing advantage, disadvantage, and multi-turn action interruption rules found in [Combat](/docs/free-srd/core-rules/combat/).

> [!TIP]
> **Example:** A smoke grenade fills a corridor. Attackers firing into the smoke suffer major disadvantage. Two characters fighting in melee inside the smoke are both equally blinded — their opposed rolls are unchanged, but a third character sneaking up on either of them could make a surprise attack.

---

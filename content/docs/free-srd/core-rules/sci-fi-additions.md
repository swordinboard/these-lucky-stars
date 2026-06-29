---
title: "Sci-Fi Additions"
description: "Sci-fi module additions to the core rules: ballistic weapons in zero gravity, extreme environments, energy shields, HUDs, and computer systems."
weight: 90
---

# Sci-Fi Additions

This page is the central home for sci-fi specific rules that extend or modify the core rules. Many of these rules are also referenced in context elsewhere in the SRD — on equipment pages, in combat, and in environmental rules — to avoid forcing page-switching mid-session. They are collected here for easy reference.

---

## Combat & Environment

### Ballistic Weapons In Space
{{% include "/snippets/sci-fi-add-ballistic" %}}

### Extreme Environments
{{% include "/snippets/extreme-environments" %}}

---

## Equipment

### Communications
{{% include "/snippets/coms" %}}

### Energy Shields
{{% include "/snippets/energy-shields" %}}

### Heads Up Displays (HUDs)
{{% include "/snippets/huds" %}}

---

## Computer Systems

Computer systems can be accessed from dedicated terminals. Most characters in sci-fi settings will interact with computer systems at some point. Navigating simple systems is considered common knowledge. Secured systems require more work — they may be encrypted, require physical keys, or fight back. Accessing a secured system requires the matching key or code, or a [Comp Jack](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#comp-jack) and some technical know-how.

### Networks

Networks are formed by a series of linked devices, primarily communication devices. Most networks are put in place to facilitate ease of communication and information sharing. For purposes of encyption, networks use the same security and interaction rules as computer systems, but the actions can be performed by connecting a comp jack to any connected device within range in place of a terminal. Networks with Security level 0 are usually known as public networks and can be connected to freely. Secured networks need access keys to be connected to, or to be accessed with the comp jack.

### System Level

A computer system's security level determines how difficult it is to gain access or perform certain actions. When a security level is referenced for a check, use the base target from the chart below.

| Security Level | Base Target |
| --- | --- |
| Level 0 | 1 |
| Level 1 | 3 |
| Level 2 | 6 |
| Level 3 | 10 |
| Level 4 | 15 |
| Level 5 | 21 |

*Level 0 systems are unsecured and do not require a comp jack or key/code to access. They may still have countermeasures — the base target is provided for bypass calculations.*

### Common Actions

Actions are typically performed in the following order:

> 1. Analyze
> 2. Bypass
> 3. Access
> 4. Command or Search

**Analyze** *(1 AP)* — Requires a comp jack and a target 6 KNO roll. Reveals the system's security level and any countermeasures it has. Recommended before attempting to access any secured system.

**Bypass** *(3 AP)* — Requires a comp jack and a KNO roll with a target equal to the system's security base target +3. Allows a countermeasure to be deactivated or avoided before it can trigger.
- A *deactivated* countermeasure cannot be triggered until it is specifically reactivated in the system with another bypass action.
- An *avoided* countermeasure's trigger mechanism is temporarily disabled for a number of rounds as determined by the user, then it returns to normal function. triggers can be deactivated for a number of rounds equal to *the user's KNO +3.* This is useful for stealth and subterfuge, however, may lead to multiple bypass actions to prevent their trigger. Countermeasures avoided this way may require repeated Bypass actions to prevent triggering.
A failed Bypass automatically triggers the countermeasure.

**Access** *(2 or 4 AP)* — Required to use a secured system. Using the matching key or code costs 2 AP. Using a comp jack costs 4 AP and requires a KNO roll with a target equal to the system's security base target. If using a comp jack, this action can be split across turns as long as it is not interrupted — the KNO roll is made on the turn the action completes. Once accessed, the system can be used freely until locked out or reset.

**Command** *(1+ AP)* — Use hardware or software commands available on the system. Entering a command typically costs 1 AP; more complex commands may require additional AP or time. This could be turning on/off connected lights, connecting to a communication network, or beginning a download.

**Search** *(2 AP)* — Search the system for specific information. Requires an INS check, typically target 9, though information-dense systems may have a higher target. If attempting to access specific files on a computer system they must usually be found using the search action before they can be viewed or downloaded.

### Security Countermeasures

Countermeasures are an optional security layer that can be added to most systems. Unless there are obvious physical signs — such as visible automated weapons — countermeasures are undetectable without an Analyze action. Each countermeasure will have a **trigger**, a **reset**, and an **effect**.

#### Triggers

**Command** — Activated when a specific command is entered into the system.

**Failed Access** — Activated on any failed access attempt, whether by incorrect key/code or comp jack tampering.

**Failed Bypass** — Activated automatically whenever a Bypass attempt fails.

**Keyless** — Activated whenever access is gained without the correct key or code.

#### Resets

**Automatic** — Resets once specific conditions are met, such as a timer expiring, hostiles being eliminated, or the system being locked again.

**Constant** — Requires no reset; remains active unless disabled. Applies only to the Lockout and Log effects.

**Manual** — Must be manually reset after triggering, either within the system or physically on-site.

**None** — Single-use per access point. Once triggered it is exhausted.

#### Effects

**Alarm** — Triggers an audible alert or silently signals a pre-programmed receiver. Analyze reveals which type, though the recipient of a silent alarm is not disclosed. Can be avoided or deactivated with a Bypass.

**Automated Defenses** — Activates automated defenses, typically turrets or traps. Can be avoided or deactivated with a Bypass.

**Failsafe** — Locks the system with a second security layer of the same level, which must be hacked separately. The new layer may have its own countermeasures, revealed with a new Analyze. Can be avoided or deactivated with a Bypass.

**Lockout** — All in-system actions require a DEX check against the system's security level, and all KNO checks within the system are made at a minor disadvantage. Cannot be avoided — only deactivated with a Bypass. Once active it remains in effect until deactivated. Often triggered by an AI upon detecting an unauthorized user.

**Log** — Tracks all actions taken in the system. If accessed by comp jack, the user's jack signature is recorded. Logs can be avoided on a per-action basis with a new Bypass for each action, but cannot be fully deactivated without removing the log file — which may itself create suspicion.

**Terminal** — Single-use per access point. Triggered by AI upon detecting an unauthorized user. Causes an electrical overcharge that destroys the terminal and deals minor burn damage and 1 VIT loss to the user. Cannot be avoided or deactivated with a Bypass, but the harm can be dodged with a successful target 12 DEX check.

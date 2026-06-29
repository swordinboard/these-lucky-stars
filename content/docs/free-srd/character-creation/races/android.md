---
title: "Android"
description: "Introducing the Android — liberated robots able to act and think independently"
weight: 30
bookHidden: true
---

{{% include "/snippets/wip-announcement.md" %}}
# Android
<!-- basic android race -->

An Android uses the standard character DEF/VIT rules, not the [object durability rules](/docs/free-srd/core-rules/damaged--broken-gear/#object-durability) — they are a playable character, not an object to be broken.

## Features

**Robot Chassis** — An Android's chassis is tough and built to last, offering a range of benefits at the cost of natural healing:
 - +2 FORT
 - Immune to asphyxiation and sickness. All other wounds and conditions remain possibilities through similar effect. For example, a bleeding robot leaks its coolant or lubricant, a Stressed robot suffers from circuitry issues.
 - Wounds require a Repair or Tech Kit to fix (in this case either works regardless of scale) rather than a Medical Kit, and take twice as long to fix due to the lack of natural healing processes. Methods and targets remain the same and features that apply to the use of the Med Kit do not carry their benefit when working on an Android.
 - Medical items designed for organic creatures — med kits, injectors, pain suppressants, and similar — have no effect on Androids. See [Crash Foam Canister](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#crash-foam-canister) for an Android-specific field stabilization option.
 - Androids are subject to the [Dying](/docs/free-srd/core-rules/wounds--conditions/#dying) condition when they lose their last VIT point to lethal damage, the same as organic characters. [Dead Battery](#dead-battery) is a separate condition caused by power depletion — the two are independent.

**Upgradable** — Each body slot of an Android can have components installed. Installed components may allow other equipment to be used in those body slots, details are provided per component.

**Power Source** — Like other machines, Androids require a power source. A Medium [Battery] is built into their chest chassis, powering all functions of the Android. An Android's power source is upgradeable with [components](/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components).

Androids function much like people do in that they require rest. During a long rest they enter Rest Mode for six hours to resolve caching conflicts, free up memory, and prevent battery degradation. Every 12 hours an Android goes without a successful Rest Mode Session requires 2 supply rolls of their primary power source.

An Android's power source can be replaced for 8 AP by the Android or another character. If this action is interrupted the Android immediately falls into Dead Battery mode. If a [Backup Power Cell](/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components/#backup-power-cell) component is installed, the Android may switch to it for 2 AP.

**Dead Battery** — *Automated Machine Condition*
<!-- may need to move this section or put into a snippet -->
If an Android's or other automated machine's primary power source is fully depleted at any time, they immediately shut down and are considered unconscious for all purposes. Attacks against a machine in Dead Battery gain advantage and count as surprise attacks. For Androids, all memory since the last successful Rest Mode session is lost upon entering Dead Battery.

*Ending Dead Battery:* Replace or sufficiently recharge the primary power source.
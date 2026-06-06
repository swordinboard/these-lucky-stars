---
title: Components
description: "Installable components for robots, drones, and Androids"
weight: 50
---

{{% include "/snippets/wip-announcement" %}}
# Components

Components are devices designed for installation in automated machines (Androids, drones, and robots). Each component installs into a designated body slot and provides a passive benefit, an active ability, or access to equipment. While most components are designed with Androids in mind, drones and robots use the same parts mapped to whatever frame they have (each drone or robot's description lists which slots are available for components installation).

## Installation

Installing or removing a component requires a Tech Kit, a target 12 KNO check, and 1 hour. On a failed check, the part takes 1d4 damage.. The [Tech Armor](/docs/free-srd/character-creation/abilities/#tech-armor) ability applies to components.

Regardless of being an internal or external component, a body slot can hold only one component at a time. Whether an installed component also prevents the use of other equipment — such as backpacks, pouche sets, or bracers — depends on whether the install is **internal** or **external**:

- **Internal** parts are built into the host's frame and do not occupy the visible slot. The host can still wear normal equipment in that body slot.
- **External** parts replace or extend the host's frame at that slot, and prevent any other equipment from being worn there. Armor that includes that slot still functions but is reduced to its remaining slot coverage at the GM's discretion.

Each component below indicates whether it is internal or external.

## Power Sources and batteries

Automated Machines have built in [power sources](/docs/free-srd/inventory--equipment/item-tags/#power-source) which power passive functions and basic operation under normal conditions.

Components with active abilities may require supply rolls against the host's battery, or, if listed, against their own dedicated battery. A component's description indicates which.


## Damage and Wounds

Bot Parts do not have their own VIT — they rely on their host. A Bot Part is disabled when the host takes a wound that would logically affect that part (GM judgment — a leg wound disables Legs/Feet parts, an arm wound disables Arms parts, and so on). A critical or extreme attack to the host can disable any installed part at the GM's discretion. Disabled parts cannot be used until the host's relevant wound is treated.


## Component Quick Reference

| Component | Slot | Install | Notes |
| --- | --- | --- | --- |
| [Audio Processor](#audio-processor) | Head [HUD] | Internal | Advantage on hearing-based INS, filter functions |
| [Augmented Arm Actuators](#augmented-arm-actuators) | Arms | External | +2 STR for physical tasks while powered |
| [Automatic Crash Foam System](#automatic-crash-foam-system) | Chest | Internal | Auto-deploys on Dying; 1 use, 4 AP to restock |
| [Backup Power Cell](#backup-power-cell) | Back | External | Secondary Medium battery housing |
| [Heavy Wrist Laser](#heavy-wrist-laser) | Arms | External | Mounted laser rifle equivalent |
| [Improved Cooling System](#improved-cooling-system) | Back | External | Resist burn, ignore heat environmental effects |
| [Internal Comp Jack](#internal-comp-jack) | Hands | Internal | Comp Jack without occupying hands |
| [Manipulator Override](#manipulator-override) | Hands | External | +2 DEX for fine motor tasks while powered |
| [Optical Suite](#optical-suite) | Head [HUD] | Internal | Low-light, thermal, zoom |
| [Reinforced Chassis Plating](#reinforced-chassis-plating) | Chest | External | +3 DEF |
| [Relay Node](#relay-node) | Neck | Internal | Sync into a shared sensor network |
| [Repair Subroutine](#repair-subroutine) | Belt | External | Self-repair 1 VIT per long rest |
| [Servo Boost Legs](#servo-boost-legs) | Legs/Feet | External | +10ft speed, +5ft jump while powered |
| [Signal Mast, Heavy](#signal-mast-heavy) | Back | External | Increases com range to 500 miles |
| [Signal Mast, Retractable](#signal-mast-retractable) | Neck | Internal | Increases com range to 20 miles |
| [Stabilizer Gyros](#stabilizer-gyros) | Legs/Feet | Internal | Resist knockdown, no falling damage under 20ft |
| [Subdermal Plating](#subdermal-plating) | Chest | Internal | +1 DEF, no slot conflict |
| [Targeting Array](#targeting-array) | Head | Internal | +1 ranged ATK, limited daily uses |
| [Wrist Laser](#wrist-laser) | Arms | External | Mounted laser pistol equivalent |

---

## Components

{{% details "Audio Processor" %}}
### Audio Processor

*–Cr — 0lbs — Head — Internal*

Enhanced audio sensors with filtering, directional focus, and frequency expansion. The host gains advantage on hearing-based INS checks, can focus on specific sounds at will, and can detect frequencies outside the normal range of hearing.

Draws negligible power from the host battery.

Does not occupy the Head slot for other equipment.
{{% /details %}}

{{% details "Augmented Arm Actuators" %}}
### Augmented Arm Actuators

*–Cr — 4lbs — Arms — External — Power Source*

Augmented arm actuators that allow for an overcharge to increase STR by +2. Each activation requires 1 supply roll of the machine's primary power source and lasts for 10 minutes.

Occupies the Arms slot for other equipment.
{{% /details %}}

{{% details "Automatic Crash Foam System" %}}
### Automatic Crash Foam System

*–Cr — 2lbs — Chest — Internal*

An internal crash foam reservoir and deployment system. When the host enters the Dying condition, the system automatically deploys for 0 AP, functioning identically to a [Crash Foam Canister](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#crash-foam-canister) — halting FORT check progression without restoring VIT. The host remains unconscious at 0 VIT until properly repaired.

The system holds 1 use and can be restocked with a [Crash Foam Canister](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#crash-foam-canister) for 4 AP, no check required.

Does not occupy the Chest slot for other equipment.
{{% /details %}}

{{% details "Backup Power Cell" %}}
### Backup Power Cell

*–Cr — 6lbs — Belt — External — [Battery](/docs/free-srd/inventory--equipment/item-tags/#battery) [Medium]*

A secondary medium battery housing. While installed, switching which battery is actively powering the host costs 2 AP — the equivalent of flipping a circuit switch. Physically removing or replacing either battery still costs the standard 8 AP.

Occupies the Belt slot for other equipment.
{{% /details %}}

{{% details "Heavy Wrist Laser" %}}
### Heavy Wrist Laser

*–Cr — 5lbs — 20pts — (10) 90ft — Arms — External — [Battery](/docs/free-srd/inventory--equipment/item-tags/#battery) [Medium] (dedicated), [Single Shot](/docs/free-srd/inventory--equipment/item-tags/#firing-modes)*

*Damage Type: Burn*

A larger laser emitter that runs along the length of the host's forearm. Functions as a [Laser Rifle](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/#laser-rifle) and can benefit from a Laser Rifle [Weapon Proficiency](/docs/free-srd/character-creation/proficiencies/#weapon). Minimum range of 10ft.

Unlike a standard laser rifle, the Heavy Wrist Laser is mounted and does not carry the [Two-Handed](/docs/free-srd/inventory--equipment/item-tags/#two-handed) tag. The host's free hand can be used normally during fire.

Occupies the Arms slot for other equipment.
{{% /details %}}

{{% details "Improved Cooling System" %}}
### Improved Cooling System

*–Cr — 5lbs — Back — External — [Battery](/docs/free-srd/inventory--equipment/item-tags/#battery) [Small] (dedicated)*

Secondary external heat exchangers and coolant lines. The host gains [partial damage resistance](/docs/free-srd/core-rules/combat/#damage-resistance-and-weakness) to burn damage and [full damage resistance](/docs/free-srd/core-rules/combat/#damage-resistance-and-weakness) to high-heat environments.

Occupies the Back slot for other equipment.
{{% /details %}}

{{% details "Internal Comp Jack" %}}
### Internal Comp Jack

*–Cr — 2lbs — Hands — Internal*

A retractable interface built into the host's fingertip or palm. Functions as a standard [Comp Jack](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#comp-jack) however no longer requires two hands to operate. Requires [Comp Jack proficiency](/docs/free-srd/character-creation/proficiencies/#comp-jack) to use.

Does not occupy the Hands slot for other equipment.
{{% /details %}}

{{% details "Manipulator Override" %}}
### Manipulator Override

*–Cr — 3lbs — Hands — External — Power Source*

Replacement manipulators with high-precision actuators. While the primary power source has supply remaining, the host gains +2 DEX for fine motor tasks including lockpicking, tech kit work, medical procedures, and similar checks. Does not apply to attack rolls or AGI/DEX-based defensive movement.

Occupies the Hand slot for other equipment.
{{% /details %}}

{{% details "Optical Suite" %}}
### Optical Suite

*–Cr — 1lb — Head [HUD] — Internal*

Integrated optical sensors with low-light, thermal, and zoom modes. The host gains advantage on sight-based INS checks in full and low-light conditions and can see clearly in total darkness out to 30ft. Switching modes costs no AP.

Draws negligible power from the primary power source.

Does not occupy the Head slot or HUD subslot for other equipment.
{{% /details %}}

{{% details "Reinforced Chassis Plating" %}}
### Reinforced Chassis Plating

*–Cr — 8lbs — Chest — External*

Heavy plating bonded to the host's frame. Grants +3 DEF. Adds 20lbs to the host regardless of body slot rules.

Occupies the Chest slot for other equipmeny.
{{% /details %}}

{{% details "Relay Node" %}}
### Relay Node

*–Cr — 1lb — Neck — Internal*

A short-range data relay that allows the host to share sensor feeds with other Relay Node-equipped units. Each Relay Node is purchased and installed individually, then synced with one or more other Relay Nodes already in operation.

While within 100ft of a synced unit, all units in the network can access each other's sensor data — seeing through each other's optics, hearing through each other's audio sensors, and so on. Units that are out of direct range can still connect to the network through intermediate Relay Nodes, as long as each link in the chain is within 100ft. Switching which feed is the host's primary view is a 0 AP action. A host can only pull from one feed at a time.

Syncing with another Relay Node requires a Tech Kit and 10 minutes. A Relay Node can be synced with as many other Relay Nodes as desired, and units can be added to or removed from the network individually. Larger networks of Relay Nodes are sometimes used to coordinate swarms of drones or specialized robot teams.

Draws negligible power from the host battery.

Does not occupy the Neck slot for other equipment.
{{% /details %}}

{{% details "Repair Subroutine" %}}
### Repair Subroutine

*–Cr — 2lbs — Belt — External*

An automated diagnostic and minor repair system built into the host's frame. The host recovers 1 VIT per completion of a 6hr Rest Mode cycle. Does not function if the host is at 0 VIT or has the dying condition.

Occupies the Belt slot for other equipment.
{{% /details %}}

{{% details "Servo Boost Legs" %}}
### Servo Boost Legs

*–Cr — 5lbs — Legs/Feet — External — Power Source*

Reinforced leg actuators that allow for an overcharge to increase the host's speed by +10ft and increase horizontal and vertical jump capabilities by +5ft. Each activation requires 1 supply roll of the machine's primary power source, and lasts for 10 minutes.

Occupies the Legs/Feet slot for other equipment.
{{% /details %}}

{{% details "Signal Masts" %}}
### Signal Mast, Retractable

*–Cr — 1lb — Neck — Internal*

A retractable antenna and signal booster. The host's com devices have their range increased to 20 miles under normal conditions, and the host can transmit and receive on any open or shared encrypted frequency at that range. Draws negligible power from the host battery.

Any character using the [Companion Bot](/docs/free-srd/character-creation/abilities/#companion-bot) ability who has a Signal Mast, Retractable installed on their companion can issue commands and receive updates at its full range.

Does not occupy the Neck slot for other equipment.

### Signal Mast, Heavy

*–Cr — 15lbs — Back — External*

A larger version of the Signal Mast, Retractable that increases the host's com device range to 500 miles. The host can transmit and receive on any open or shared encrypted frequency at that range, however the increased range causes a draw on the host's primary battery source. Each activation requires one supply roll of the host's primary power source and lasts for six hours.

Any character using the [Companion Bot](/docs/free-srd/character-creation/abilities/#companion-bot) ability who has a Signal Mast, Heavy installed on their companion can issue commands and receive updates at its full range.

Occupies the Back slot for other equipment.
{{% /details %}}

{{% details "Stabilizer Gyros" %}}
### Stabilizer Gyros

*–Cr — 2lbs — Legs/Feet — Internal*

Internal balance and orientation systems built into the host's lower frame. The host gains advantage on checks to resist being knocked prone or pushed, and takes no falling damage from falls of 20ft or less.

Does not occupy the Legs/Feet slot for other equipment.
{{% /details %}}

{{% details "Subdermal Plating" %}}
### Subdermal Plating

*–Cr — 3lbs — Chest — Internal*

Lighter armor woven into the host's frame beneath the chassis. Grants +1 DEF. Does not occupy the chest slot and can be worn under armor or other chest equipment.

Does not occupy the Chest slot for other equipment.
{{% /details %}}

{{% details "Targeting Array" %}}
### Targeting Array

*–Cr — 1lb — Head — Internal*

A targeting computer wired directly into the host's optical systems. 3/day for 1 AP, the host can activate the array gaining a +1 bonus to ranged attack rolls *made during their next turn.*

The Targeting Array runs in low-power mode by default to conserve battery and requires no supply rolls.

Does not occupy the Head slot or HUD subslot for other equipment, however, the effect does not stack with other targeting HUDs.
{{% /details %}}

{{% details "Wrist Laser" %}}
### Wrist Laser

*–Cr — 2lbs — 18pts — 60ft — Arms — External — [Battery](/docs/free-srd/inventory--equipment/item-tags/#battery) [Small] (dedicated), [Single Shot](/docs/free-srd/inventory--equipment/item-tags/#firing-modes)*

*Damage Type: Burn*

A compact laser emitter mounted to the host's forearm. Fires in a fixed forward position from the wrist, leaving the hands free. Functions as a [Laser Pistol](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/#laser-pistol) and can benefit from a Laser Pistol [Weapon Proficiency](/docs/free-srd/character-creation/proficiencies/#weapon).

Occupies the Arm slot for other equipment. Aiming the Wrist Laser requires the same body posture as aiming a pistol — abilities and effects that prevent pistol use also prevent Wrist Laser use.
{{% /details %}}

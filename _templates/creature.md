---
title: "Station Guard"
id: creatures/station-guard
category: [sci-fi]
type: creature
tags: [creatures, sci-fi, npc]
summary: "Contract security in a combat vest — shock baton, auto pistol, and orders."
---

*Medium Humanoid — Level 2 — 1 space*

Dock and corridor security, hired by the berth rather than the year. Competent
with a baton, unenthusiastic about dying for a cargo manifest.

> **DEF** 8 (5 + vest) · **VIT** 2 · **AP** 4 · **Stress Threshold** 2
>
> **Speed** Ground 30ft (High)
>
> **Initiative** +6 · **Grapple** +4

| STR | AGI | DEX | FORT | KNO | INS | CHA | WILL |
|---|---|---|---|---|---|---|---|
| 2 | 2 | 2 | 3 | 1 | 2 | 1 | 2 |

**Gear** — [Combat Vest](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor/#combat-vest), [Shock Baton](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/#shock-baton), [Auto Pistol](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons/#auto-pistol) (ammo 1d6), [Coms Headset](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#coms-headset)

**Attacks**

- **Shock Baton** — 2 AP · ATK +2 (STR) · 1d8 + 2 Physical or Shock · reach 5ft.
- **Auto Pistol** — 2 AP · ATK +2 (DEX) · 1d8 + 2 Physical · 20ft · [Full-Auto](/docs/free-srd/inventory--equipment/item-tags/#firing-modes), ammo 1d6.

**Features**

- **Call It In** — 1 AP. Raises the alarm on the coms net. Every other guard
  within earshot of a speaker rolls Initiative and arrives within 1d4 rounds.

**Tactics** — Opens with the baton, because the paperwork for a discharged
firearm is worse than the beating. Draws the pistol once a second guard is down
or a weapon is pointed at them. Surrenders readily when outnumbered — this is a
job, not a cause.

<!--
A SNIPPET creature: it sits on a shared page with its siblings, the way the
3.5e Fungus page holds both Shrieker and Violet Fungus. Copy to
content/snippets/creatures/<slug>.md and place it on a page with
{{< blockdetails "creatures/<slug>" "h3" >}} or an {{% include %}}.

For a creature substantial enough to own a whole page — a bot platform, an
alien species that will grow artwork and lore — use creature-page.md instead.

NAMESPACES: bot and drone platforms are `bots/`. Everything else statted —
crews, pirates, animals, alien life — is `creatures/`. Category splits the
settings, so a core-setting creature is the same file with `category: [core]`
and no sci-fi tag.

NO HEADING, INSIDE OR OUT. The block does not repeat its own name: <summary>
already prints the title, and an include generates it at the call site's level.

The group labels are BOLD LINES, not `##` headings, and that is deliberate. A
heading inside a snippet that shares a page with its siblings collides: put two
creatures on one page and both emit `id="attacks"`, verbatim, with no `-1`
suffix — Hugo only de-duplicates headings it renders in a single markdown pass,
and these arrive through the shortcode as finished HTML. Six duplicate ids and
a table of contents reading Attacks / Features / Tactics twice, every link
landing on the first one. Bold lines stay out of the ToC and cannot collide.

creature-page.md uses real headings, because one creature per page cannot
collide with anything and the ToC entries are worth having.

THE NUMBERS ARE DERIVED, NOT INVENTED. Every one of them comes from a rule
already on the site, so a GM can check them:

  DEF        AGI + FORT, min 1, plus any armor DEF bonus. 2 + 3 + 3 (vest) = 8.
             Show the armor in parentheses so it is obvious what to strip if
             the creature is caught out of its gear.
  VIT        ½ Level + ½ FORT, rounded down, min 1. Creatures with no level
             just take a sensible flat value — say so in a Feature.
  AP         4 for everyone. Only print something else if a feature changes it.
  Stress     ½ Level + ½ WILL, min 1. A machine with a null WILL either states
             how it stresses (circuitry faults) or has no threshold at all.
  Speed      Primary Speed = 20 + 5 per AGI bonus, or a flat −5 for any AGI
             penalty. Format is the site's speed descriptor:
             Mode Distance (Maneuverability, Acceleration). Leave acceleration
             off living creatures — blank means null, which is what they have.
  Initiative AGI + DEX + INS.
  Grapple    STR + AGI, plus the flat size modifier.
  Stealth    the flat SIZE modifier plus armor and features — not an attribute,
             because which attribute is rolled depends on the action. Name the
             source in parentheses: `**Stealth** +2 (Small)`. The guard above
             has no entry at all, because Medium is +0 and a combat vest costs
             nothing — omit it rather than printing a zero.

ATTRIBUTES PRINT FINAL VALUES, size modifiers already applied, the way 5e
prints final numbers rather than making the reader do arithmetic at the table.
Small already includes its STR −2 / AGI +2. Attributes are the modifiers —
there is no separate bonus column, a roll is 2d6 + the attribute. A creature
with no capacity for an attribute uses null [-N-]: effectively 0, and it cannot
be raised or lowered.

ATTACKS carry AP cost · ATK modifier with the attribute in parentheses · damage
· reach or range · tags. Note what is NOT there: weapons in this system have no
damage die of their own. THE DIE COMES FROM SIZE — 1d8 between creatures of the
same size or ±1, 1d4 from two or more sizes smaller, 1d12 from two or more
larger — and the attribute used in the attack is added to the damage. Print the
same-size die and let the table shift it. Damage type is named; it is not a
weapon property to be looked up.

Creatures use the character DEF/VIT rules — wounds, conditions, healing — not
the object durability rules. That includes bots and drones, deliberately.

A MOUNT is a creature, not a vehicle. Stat it here, and give it a Mount feature
covering temperament and what a rider can command; the vehicle rules invoke the
mount's own features through the rider's Drive action.

TACTICS is the 3.5e "Combat" paragraph and it is the most useful part of the
entry — how it fights, when it runs, what it wants. A stat block a GM can run
without system mastery needs it. Cut any label you have nothing to say under
rather than leaving it empty.

Delete this comment.
-->

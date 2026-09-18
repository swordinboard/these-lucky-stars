---
title: "Dock Runner"
id: creatures/dock-runner
category: [sci-fi]
type: creature
tags: [creatures, sci-fi]
summary: "Freight hand turned lookout — fast, unarmoured, and paid to shout."
---

{{% statblock type="Medium Humanoid — Level 1 — 1 space" %}}
> **DEF** 3 // **VIT** 1 // **AP** 4 // **Stress Threshold** 1
>
> **Speed** Ground 35ft (High)
>
> **Initiative** +7 // **Grapple** +4

| STR | AGI | DEX | FORT | KNO | INS | CHA | WILL |
|---|---|---|---|---|---|---|---|
| 1 | 3 | 2 | 0 | 1 | 2 | 2 | 1 |

**Gear** — [Coms Headset](/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment/#coms-headset), a cargo hook

---

**Attacks**

- **Cargo Hook** — 2 AP // ATK +1 (STR) // 1d8 + 1 Physical // reach 5ft.

---

**Features**

- **Knows the Deck** — Ignores difficult terrain in a cargo bay or dock they work in, and always knows the way out.

**Tactics** — Runs. Shouts first, runs second, fights only when cornered with no
door behind them.
{{% /statblock %}}

<!--
A STATTED CREATURE OR NPC. There is only this one form — a stat block is always
a snippet. Copy to content/snippets/statblocks/sci-fi/npcs/<slug>.md and place it with a
plain include, WITH NO LEVEL ARGUMENT:

    {{% include "/snippets/statblocks/sci-fi/npcs/dock-runner" %}}

A creature that needs a page of its own does not become a page: the page becomes
a page-shell.md that includes this snippet and wraps it in prose — an intro
above, Tactics and Encounter Notes below. Several small entries that belong
together are the same shell with several includes. Read
content/docs/free-srd/creatures--npcs/sci-fi/station-guard.md for the first
shape and content/docs/free-srd/vehicles/sci-fi/skiffs.md for the second.

No level, because the card prints the name itself and a generated heading above
it would say it twice. builddata.py knows: a snippet whose body calls statblock
takes its anchor from its own title, so `#dock-runner` still resolves and the
catalog row still links to it.

Do NOT reach for blockdetails here. A collapsed card cannot be scanned, and
scanning is the whole job of a stat block. Wrapping one in a details afterwards
still works if a page ever needs it — the card is the primary container, not
the collapsible.

NAMESPACES: bot and drone platforms are `bots/`. Everything else statted —
crews, pirates, animals, alien life — is `creatures/`. Category splits the
settings, so a core-setting creature is the same file with `category: [core]`
and no sci-fi tag.

Tag it `creatures` and its category, and stop there. A finer tag (`npc`,
`animals`, `hostile`) earns its place once there is a real split to name — right
now it would reach exactly the same blocks as `creatures`, which is the test the
tag conventions use for redundancy.

INSIDE THE CARD, SECTIONS ARE `---` AND BOLD LABELS, NEVER HEADINGS. Two things
break if you use `##` here. The card is a self-contained unit and a heading
inside it would enter the page's table of contents as a stray "Attacks". Worse,
two creatures on one page would both emit `id="attacks"` — verbatim, with no
`-1` suffix, because Hugo only de-duplicates headings it renders in a single
markdown pass and these arrive through the shortcode as finished HTML. Verified:
six duplicate ids and a ToC listing every section twice.

THE NUMBERS ARE DERIVED, NOT INVENTED. Every one comes from a rule already on
the site, so a GM can check them:

  DEF        AGI + FORT, min 1, plus any armor DEF bonus. Show armor in
             parentheses — `8 (5 + vest)` — so it is obvious what to strip when
             the creature is caught out of its gear.
  VIT        ½ Level + ½ FORT, rounded down, min 1. A creature with no level
             takes a sensible flat value; say so in a Feature.
  AP         4 for everyone. Print something else only if a feature changes it.
  Stress     ½ Level + ½ WILL, min 1. A machine with a null WILL states how it
             stresses (circuitry faults) or has no threshold at all.
  Speed      Primary Speed = 20 + 5 per AGI bonus, or a flat −5 for any AGI
             penalty. Format is the site's speed descriptor:
             Mode Distance (Acceleration). Leave acceleration
             off living creatures — blank means null, which is what they have.
  Initiative AGI + DEX + INS.
  Grapple    STR + AGI, plus the flat size modifier.
  Stealth    the flat SIZE modifier plus armor and features — not an attribute,
             since which one is rolled depends on the action. Name the source:
             `**Stealth** +2 (Small)`. Omit the entry rather than printing +0.

ATTRIBUTES PRINT FINAL VALUES, size modifiers already applied, the way 5e prints
final numbers rather than making a reader do arithmetic at the table. Small
already includes its STR −2 / AGI +2. Attributes ARE the modifiers — a roll is
2d6 + the attribute — so there is no second column. A creature with no capacity
for an attribute uses null [-N-]: effectively 0, and it cannot be raised or
lowered.

ATTACKS carry AP cost // ATK modifier with the attribute in parentheses //
damage // reach or range // tags. Note what is NOT there: weapons in this system have no
damage die of their own. THE DIE COMES FROM SIZE — 1d8 between creatures of the
same size or ±1, 1d4 from two or more sizes smaller, 1d12 from two or more
larger — and the attribute used in the attack is added to the damage. Print the
same-size die and let the table shift it.

Creatures use the character DEF/VIT rules — wounds, conditions, healing — not
the object durability rules. That includes bots and drones, deliberately.

A MOUNT is a creature, not a vehicle. Stat it here, and give it a Mount feature
covering temperament and what a rider can command; the vehicle rules invoke the
mount's own features through the rider's Drive action.

Tactics is the 3.5e "Combat" paragraph and it is the most useful line in the
entry — how it fights, when it runs, what it wants. On a short entry it rides
inside the card, as above; on a shell page it becomes an h2 below the include,
because it is guidance for running the thing rather than a number needed
mid-scene.

BEFORE YOU WRITE A BONUS OR AN ADVANTAGE, read `design-notes.md`. It carries the
game-mechanic check that this comment does not: how big the effect should feel,
and whether it ASSISTS a skill (advantage) or REPLACES a faculty (flat bonus).
This file is about site structure; that one is about whether the number is the
right number.

Delete this comment.
-->

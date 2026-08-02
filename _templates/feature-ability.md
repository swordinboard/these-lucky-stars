---
title: "Rage"
id: abilities/rage
category: [core]
type: feature
tags: [ability, core, general]
summary: "Enter an enraged state for a short duration."
requires: [abilities/charge]
---

*[Martial Training](/docs/free-srd/character-creation/proficiencies/#martial-training) Proficiency, [Charge](#charge), AGI 2, Level 3*

2/day for 1 AP you may briefly enter an enraged state to gain +2 STR and +2 FORT
for four rounds.

<!--
NO HEADING — <summary> prints the name, and an include generates it at the call
site's level. The prerequisite line is the first thing in the file.

THE PREREQUISITE LINE IS LOAD-BEARING. `requires` is exactly the set of links in
it that point at FEATURES — nothing else. Keep them in step, in this order:

    proficiency, ability, trait, attributes, level

  - a proficiency on another page needs its full URL
  - an ability on the same page uses #anchor
  - attributes (AGI 2) and levels (Level 3) never go in `requires`
  - neither do items, item tags, or category conditions like
    "Proficiency with any tool kit" — those stay prose

If this ability MODIFIES another ability, say so in the line and record it.
Leaving it out is how Fast Kit Trap and Long Performance ended up with no
recorded prerequisite at all.

`worksheets.py` section C4 reports any drift between the line and `requires`.

WRITING THIS FILE IS NOT ENOUGH — the ability will not appear anywhere on the
site until you also edit the page by hand, in TWO places:

  1. THE FEAT TREE. The catalog is hand-listed, because the indent IS the
     prerequisite tree and nothing derives it:

         {{< catalog layout="names" >}}
         abilities/charge
         - abilities/agile-charge      <- requires Charge
         -- abilities/leaping-charge   <- requires Agile Charge
         {{< /catalog >}}

     Add the id under whatever it requires, at one more `-` than its parent.
     A top-level ability gets no prefix. The list is alphabetical within each
     level.

  2. THE ENTRY ITSELF:  {{< blockdetails "abilities/<slug>" >}}
     in the section below the tree, in alphabetical order.

  Core abilities:    content/docs/free-srd/character-creation/abilities/_index.md
                     — note it has TABS. General and Luck abilities are
                       separate catalogs; put it in the right one. Abilities is
                       the only feature page still using tabs; Proficiencies and
                       Traits have one list each. NOTHING but catalogs goes
                       inside a tabs block — prose above it, entries below.
  Sci-fi abilities:  content/docs/free-srd/character-creation/abilities/sci-fi.md

The Sci-Fi Module hub picks the ability up on its own — its tables select by
property, so leave it alone.

Nesting and `requires` must agree; §C4 checks that too.

Delete this comment — a snippet must never END with one.
-->

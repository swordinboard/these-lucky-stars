---
title: "Rage"
id: abilities/rage
category: [core]
type: feature
tags: [ability, core, general]
summary: "Enter an enraged state for a short duration."
requires: [abilities/charge]
---

### Rage

*[Martial Training](/docs/free-srd/character-creation/proficiencies/#martial-training) Proficiency, [Charge](#charge), AGI 2, Level 3*

2/day for 1 AP you may briefly enter an enraged state to gain +2 STR and +2 FORT
for four rounds.

<!--
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
Delete this comment — a snippet must never END with one.
-->

---
title: "Alert"
id: character/traits/alert
category: [core]
type: feature
tags: [trait, core]
summary: "+4 to initiative."
---

You have particularly keen senses. Gain +4 Initiative.

<!--
Traits are the shortest blocks on the site — a rule and nothing else. No
prerequisite line, so no `requires`, and no heading: <summary> prints the name,
and an include generates it at the call site's level.

WRITING THIS FILE IS NOT ENOUGH — the trait will not appear anywhere on the site
until you also edit the page by hand, in TWO places:

  1. THE CATALOG. It is hand-listed, in display order, and nothing derives it:

         {{< catalog layout="names" >}}
         character/traits/alert
         {{< /catalog >}}

     `- ` and `-- ` are available for prerequisite depth as on the ability
     trees, but traits are currently all flat.

  2. THE ENTRY ITSELF:  {{< blockdetails "traits/<slug>" >}}
     below the catalog, in alphabetical order.

  Core:    content/docs/free-srd/character-creation/traits/_index.md
  Sci-fi:  content/docs/free-srd/character-creation/traits/sci-fi.md

The Sci-Fi Module hub picks it up on its own — its tables select by property.

The name and blurb in the catalog row come from `title` and `summary` here, so
never type them into the page.

BEFORE YOU WRITE A BONUS OR AN ADVANTAGE, read `design-notes.md`. It carries the
game-mechanic check that this comment does not: how big the effect should feel,
and whether it ASSISTS a skill (advantage) or REPLACES a faculty (flat bonus).
This file is about site structure; that one is about whether the number is the
right number.

For this kind specifically: traits and proficiencies are FLAT BONUSES by design.
They are the "I don't really suck at this" baseline that other effects layer on
top of, and none of them grants advantage. Keep it that way unless
design-notes.md says otherwise.

Delete this comment — a snippet must never END with one.
-->

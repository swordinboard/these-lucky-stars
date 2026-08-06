---
title: "Martial Training"
id: proficiencies/martial-training
category: [core]
type: feature
tags: [proficiency, core]
summary: "Trained to fight unarmed as effectively as armed."
---

You have been trained to be as deadly without a weapon as you are when armed
with one. Your unarmed attacks no longer take a -3 penalty.

<!--
NO HEADING — <summary> prints the name, and an include generates it at the call
site's level.

If the proficiency shares its name with the item it applies to, the TITLE takes
the suffix and the item keeps the plain name:
    Comp Jack Proficiency   (#comp-jack-proficiency)
    Comp Jack               (the item)

If the player picks a specialisation, restate the name in the body with the
blank — never in the heading, where it becomes part of the anchor:
    **Weapon [___]**

WRITING THIS FILE IS NOT ENOUGH — the proficiency will not appear anywhere on
the site until you also edit the page by hand, in TWO places:

  1. THE CATALOG. It is hand-listed, in display order, and nothing derives it:

         {{< catalog layout="names" >}}
         proficiencies/martial-training
         - proficiencies/<a proficiency that requires it>
         {{< /catalog >}}

     `- ` and `-- ` mark prerequisite depth, same as the ability trees. Most
     proficiencies are flat.

  2. THE ENTRY ITSELF:  {{< blockdetails "proficiencies/<slug>" >}}
     below the catalog, in alphabetical order.

  Core:    content/docs/free-srd/character-creation/proficiencies/_index.md
  Sci-fi:  content/docs/free-srd/character-creation/proficiencies/sci-fi.md

The Sci-Fi Module hub picks it up on its own — its tables select by property.

The name and blurb in the catalog row come from `title` and `summary` here, so
never type them into the page.

BEFORE YOU WRITE A BONUS OR AN ADVANTAGE, read `design-notes.md`. It carries the
game-mechanic check that this comment does not: how big the effect should feel,
and whether it ASSISTS a skill (advantage) or REPLACES a faculty (flat bonus).
This file is about site structure; that one is about whether the number is the
right number.

For this kind specifically: traits and proficiencies are FLAT BONUSES by
design. They are the "I don't really suck at this" baseline that other
effects layer on top of, and none of them grants advantage. Keep it that way
unless design-notes.md says otherwise.

Delete this comment.
-->

---
title: "Combat"
description: "How fights are resolved in These Lucky Stars — initiative, attack and defense rolls, damage types."
weight: 60
---

# Combat

{{% include "/snippets/combat/overview" %}}

{{< catalog layout="names" >}}
combat/standard-attack
- combat/disarm
- combat/trip
{{< /catalog >}}

---

## Aggressive Actions

{{% details "Standard Attack" %}}

{{% include "/snippets/combat/standard-attack" %}}

{{% /details %}}

<!--
A SHELL PAGE: headings, tables and includes. It is NOT a block and carries no
block frontmatter — no id, no category, no type. Deliberately.

Three ways to pull blocks in:
  {{% include "/snippets/…" %}}          one block, by path
  {{< blockset category="…" … />}}       a whole set, in full, by property
  {{< catalog … >}} / catalog … />       a table or index of links

Use layout="names" when the summary column would make the index longer than the
entries it points at. The `- ` / `-- ` indents are a READING aid — where a reader
meets an entry — not the prerequisite graph.

Delete this comment.
-->

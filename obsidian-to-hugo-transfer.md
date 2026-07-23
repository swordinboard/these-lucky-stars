---
headless: true
draft: true
---

# Obsidian to Hugo Transfer Guide

Reference for moving drafted content pages from the TLSObsidian vault into the live site repo. Follow these steps in order.

---

## 1. Read the Draft

Open the source file from `TLSObsidian/`. Note:
- Where the page belongs in the site structure (section, weight)
- Any `==highlighted==` terms — these are Obsidian-style placeholders for links that need to be resolved
- Any sections marked as draft-only (e.g. "For Item Tags Page") that should not be published
- Any Obsidian callout syntax that may need adjusting (see Step 4)

---

## 2. Locate the Target Section

Find the right folder under `content/docs/free-srd/` and read its `_index.md` to confirm nav order and weight convention. Check the weights of neighboring pages to choose an appropriate `weight:` for the new page.

Naming convention: use lowercase with `--` in place of `&` (e.g. `wounds--conditions.md`, `damaged--broken-gear.md`).

---

## 3. Resolve Highlighted Terms

`==term==` in Obsidian marks a word or phrase that needs a real link. Before writing the Hugo file, track down where each one lives in the repo:

- Search `content/docs/` for the relevant page
- Check headings within that page for anchor targets
- If the link target doesn't exist yet (e.g. a tag entry not yet written), use the future URL anyway and note it as pending

Common anchors to know:
- Difficulty/target numbers → `basics/#target-difficulty-guide`
- Combat actions → `combat/#aggressive-actions`
- Item tags → `inventory--equipment/item-tags/#tag-name`

---

## 4. Convert Obsidian Syntax

| Obsidian | Hugo |
|---|---|
| `==highlighted text==` | `[text](/full/path/)` |
| `> [! IMPORTANT ]` (with spaces) | `> [!IMPORTANT]` |
| `[[wikilinks]]` | `[link text](/full/path/)` |
| Tables (same markdown) | No change needed |
| `{{% details %}}` blocks | Already Hugo-compatible if drafted that way |

Callout types and their uses are defined in `md-formating-notes.md`.

---

## 5. Write the Hugo File

Create the file in the correct `content/docs/` subfolder. Required front matter:

```markdown
---
title: "Page Title"
description: "One sentence — Google uses this as the meta description."
weight: N
---

# Page Title

Content starts here...
```

Key rules:
- `title:` and the opening `# h1` must match exactly — the Book theme does not display front matter title as a heading on desktop, so the h1 is the visible heading
- `description:` is required for every published page
- Do not include `draft: true` unless the page is intentionally unpublished
- Strip any draft-only sections from the Obsidian source before publishing

---

## 6. Update the Section Index

Add the new page to its section's `_index.md` nav list, in weight order:

```markdown
- [Page Title](filename/)
```

---

## 7. Add a Related Section (if appropriate)

Most core rules pages end with a `## Related` section linking out to pages that are conceptually connected. If the page touches the health system, combat, equipment, or conditions, add relevant links. Follow the format used in `combat.md` and `health.md`.

---

## 8. Run the Maintenance Checklist

After creating the file, run through the applicable items in `site-maintenance-notes.md`:

- **Adding New Content Pages** — description present, no unintended draft flag
- **Content Consistency** — h1 matches title, callout styles match `md-formating-notes.md`
- **Moving or Renaming** — only applies if replacing an existing page; add a redirect in `netlify.toml` if so
- **Adding New External Resources** — only if the page introduces new fonts, scripts, or embeds

---

## Checklist Summary

- [ ] Draft read and target location confirmed
- [ ] Weight chosen relative to neighbors
- [ ] All `==highlighted==` terms resolved to real links
- [ ] Obsidian syntax converted
- [ ] Front matter complete (`title`, `description`, `weight`)
- [ ] Opening `# h1` matches `title:` exactly
- [ ] Draft-only sections removed
- [ ] Section `_index.md` updated
- [ ] Related section added (if applicable)
- [ ] Maintenance checklist reviewed

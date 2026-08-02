# Block templates

Copy-and-fill starting points for each kind of block, taken from real blocks in
the tree rather than invented. Use them so new content matches what the
generators and the PDF builder already expect.

**These files are outside `content/`, so Hugo never reads them and
`builddata.py` never counts them as blocks.** Copy a file into
`content/snippets/<namespace>/<slug>.md`, then fill it in.

Three of them are the exception to "taken from real blocks": `creature.md`,
`creature-page.md` and `vehicle.md` are **worked examples**, because the statted
content is only just starting. Their prose is invented, but every number is
derived from a rule already on the site and the derivation is written out in the
comment. For a filled-in real one, read
`content/docs/free-srd/creatures--npcs/sci-fi/station-guard.md`.

| Template | For |
|---|---|
| `feature-ability.md` | An ability — the only kind with prerequisites |
| `feature-proficiency.md` | A proficiency |
| `feature-trait.md` | A trait |
| `equipment.md` | Any purchasable or carryable item |
| `vehicle.md` | A statted vehicle — the thing the vehicle rules are about |
| `rule.md` | A rule a page presents as part of a section |
| `rule-standalone.md` | A rule read on its own and listed in a table (conditions, wounds) |
| `reference.md` | Intro/overview prose at the top of a section |
| `creature-page.md` | A creature or NPC on its own page — **start here** |
| `creature.md` | A creature sharing a page with its siblings |
| `page-shell.md` | A docs page that assembles blocks; not a block itself |

## The rules these encode

- **`id` matches the file path** under `content/snippets/`. No id, no block —
  the builder cannot see it.
- **`summary` is the one-liner** every generated table prints. Write one for
  anything a catalog will list; a missing summary renders a blank cell.
- **A snippet does not carry a heading.** The title lives in `blocks.json`, and
  the call site decides what level it renders at — so the same block can sit at
  `h2` on one page and `h3` on another. `blockdetails` prints the name in its
  `<summary>`, so a heading inside would state it twice. All 423 snippets work
  this way; the only blocks that keep a heading are the 13 that *are* pages,
  which need an `h1` matching their title. `blocks.json` records this as
  `owns_heading`.
- **Internal sub-headings start at `h2`,** whatever level the block will occupy.
  The shortcode shifts the whole tree down to sit one level under the call site,
  so authoring to `h2` is what makes a block re-homeable.
- **`requires` holds features only.** Attributes, levels, items, and "any tool
  kit"-style conditions stay in the prose line.
- **`[___]` never goes in a heading**, only in the body.
- **Never end a snippet with an HTML comment** — it swallows the rest of the
  host page. `snippetlint.py` checks this.
- **A stat block is the `{{% statblock %}}` card**, and creatures, NPCs and
  vehicles all use the same one so they read alike on the site and in a PDF.
  Sections inside it are divided by `---` with bold labels — never headings,
  which collide across two cards on one page. The card prints its own name, so
  a snippet using it is included with **no level argument**.
- **The card is the container; `details` is not.** A collapsed stat block cannot
  be scanned, which is the one thing a stat block is for. Wrapping a card in a
  `details` afterwards still works where a page needs it.

Full explanations are in `site-maintenance-notes.md`.

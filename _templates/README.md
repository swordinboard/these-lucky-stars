# Block templates

Copy-and-fill starting points for each kind of block, taken from real blocks in
the tree rather than invented. Use them so new content matches what the
generators and the PDF builder already expect.

**These files are outside `content/`, so Hugo never reads them and
`builddata.py` never counts them as blocks.** Copy a file into
`content/snippets/<namespace>/<slug>.md`, then fill it in.

| Template | For |
|---|---|
| `feature-ability.md` | An ability — the only kind with prerequisites |
| `feature-proficiency.md` | A proficiency |
| `feature-trait.md` | A trait |
| `equipment.md` | Any purchasable or carryable item |
| `rule.md` | A rule that a page presents under its own heading |
| `rule-standalone.md` | A rule that carries its own heading (conditions, wounds) |
| `reference.md` | Intro/overview prose at the top of a section |
| `creature.md` | A creature or platform — a whole page, not a snippet |
| `page-shell.md` | A docs page that assembles blocks; not a block itself |

## The rules these encode

- **`id` matches the file path** under `content/snippets/`. No id, no block —
  the builder cannot see it.
- **`summary` is the one-liner** every generated table prints. Write one for
  anything a catalog will list; a missing summary renders a blank cell.
- **Heading or no heading is a real decision.** If the block's file starts with
  its own `###`, it owns its heading and can be re-assembled anywhere. If not,
  the host page supplies the heading and anything re-assembling the block has to
  supply one too — `blocks.json` records this as `owns_heading`.
- **`requires` holds features only.** Attributes, levels, items, and "any tool
  kit"-style conditions stay in the prose line.
- **`[___]` never goes in a heading**, only in the body.
- **Never end a snippet with an HTML comment** — it swallows the rest of the
  host page. `snippetlint.py` checks this.

Full explanations are in `site-maintenance-notes.md`.

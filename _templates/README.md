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
| `creature.md` | A creature, NPC or platform that gets its own page |
| `creature-snippet.md` | A creature small enough to live in a list — snippet form |
| `vehicle.md` | A vehicle or mount that gets its own page |
| `vehicle-snippet.md` | A vehicle small enough to live in a list — snippet form |
| `page-shell.md` | A docs page that assembles blocks; not a block itself |

## Stat blocks come in two forms

Creatures and vehicles are the only things here with a **page form and a snippet
form of the same block.** Most of each kind gets its own page, the way the races
and the bot platforms do; the outliers — a vent rat, a cargo sled — would be
mostly whitespace on a page and belong in a list beside their siblings instead.

The two forms differ in exactly two places, and the templates are written so that
promoting a snippet to a page means editing only the first of them:

- **Frontmatter.** The page form adds `description`, `weight` and `bookHidden`
  on top of the block keys. The snippet form carries block keys only.
- **The title.** A page opens with an `h1` matching its `title`. A snippet has no
  title heading at all — the call site supplies it — and authors its internal
  headings at `h2` so the include can shift them into place.

Everything else is deliberately identical, because a reader should not be able to
tell which form they are looking at. **The stat block itself is two single-row
markdown tables**, in this order:

| | Creature | Vehicle |
|---|---|---|
| Table 1 — derived stats | DEF, VIT, AP, Initiative, Stress Threshold, Speed | DEF, VIT, Occupants, Cover, Collision, Ignition |
| Table 2 — what it is made of | the eight attributes, in sheet order | one row per movement mode |

Plain markdown, no shortcode. That is the reason it is safe: tables render the
same on the site and in the PDF builder, so a stat block needs no rule in
`assets/content-constructs.css` and cannot fail preflight check 5. Adding a
shortcode for this would buy nothing and cost a styling obligation on both sides.

**Size is written differently for the two, on purpose.** Creatures use a named
size (Tiny–Huge) that shifts their attributes; vehicles use a count of 5ft spaces
that sets their collision dice. Both live in the italic descriptor line under the
title rather than in a table, because both are identity rather than a stat.

Each template's closing comment carries the full derivation — which formula
produces each number, and which page of the rules it comes from. Work them out;
none of the four is meant to be filled in by eye.

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

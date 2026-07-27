# A1 — Module separation: what I found, what I built, what needs your call

You picked **hybrid**: core mechanics read as one book, module separation pays
off in the catalogs. This is the working-out of that.

---

## The thing that changed my recommendation

`core-rules/sci-fi-additions.md` already says, in its own opening line:

> This page is the central home for sci-fi specific rules that extend or modify
> the core rules. Many of these rules are also referenced in context elsewhere in
> the SRD — on equipment pages, in combat, and in environmental rules — **to
> avoid forcing page-switching mid-session**. They are collected here for easy
> reference as a whole.

That is the hybrid model, already implemented, in your own words. A block lives
in context *and* is collected on a module page, single-sourced by include. The
draft `sci-fi-module.md` was reaching for the same thing for character options
and hit the wall you noted in the file:

> `<!-- need to add js listener to add links to specific tabs -->`

So the answer to A1 is not "move the sci-fi pages somewhere else". It is
**extend the pattern you already established** — and the block model means the
module page no longer has to be hand-maintained or JS-hacked.

**This matters for later modules.** Fantasy does not become a third interleaving
problem; it becomes one more tab and one more generated hub page. The nav does
not grow a parallel tree per setting.

---

## Built (no URLs changed, nothing moved)

### `{{< blockset >}}` — assemble a set of blocks by property

```
{{< blockset category="sci-fi" namespace="abilities" >}}
{{< blockset category="sci-fi" type="rule" wip="exclude" >}}
```

Where `{{% include %}}` names one block by hand, this names a **set** by
property and renders every match in full, from `data/blocks.json`. Filters:
`category`, `namespace`, `type`, `tag`, `wip`, plus `order` and `level`.

A new sci-fi ability appears on the module page the moment the block is
authored. No page edit, no list to forget.

This is deliberately the same operation the PDF builder performs — select blocks
by property, assemble into a larger one. It is worth keeping the two behaving
identically; the shortcode is the prototype.

### The Sci-Fi Starter Module page

`sci-fi-module.md` is no longer a draft stub. It now collects the module as a
whole: rules additions, races, abilities, proficiencies, traits, bots, and links
to the equipment catalogs.

**33 blocks: 25 rendered in full, 8 linked out** (races and bot platforms are
whole pages, too big to inline). Of the 25, every one is also rendered on its
home page — the same source file shown in two places, not a copy of the text.
The site already worked this way: 23 blocks appeared on more than one page before
this existed, and the speed rules appear on three.

It is `wip: true`, so it carries the banner and the builder can exclude it while
you settle the prose.

I also removed the stale `netlify.toml` 301 sending `/docs/free-srd/sci-fi-module/`
→ `/docs/free-srd/`, which would otherwise have shadowed the real page.

### Two block titles fixed

`{{< blockset >}}` prints block titles, which exposed titles that were derived
from the id rather than from the name a reader sees:

| Block | Was | Now (matches the page heading) |
|---|---|---|
| `sci-fi/huds` | "Huds" | "Heads Up Displays (HUDs)" |
| `sci-fi/ballistics-in-space` | "Ballistics In Space" | "Ballistic Weapons In Space" |

The PDF builder would have printed "Huds" too. `blocks.json` now also carries
`owns_heading`, marking the 105 **section blocks** whose heading lives on the
host page rather than in the block — anything re-assembling blocks elsewhere has
to supply that heading, or the block arrives as an anonymous wall of prose. The
shortcode does; the builder will need to.

---

## Needs your call — the physical moves

These change URLs, so they need redirects and a link rewrite. None of them is
started.

### Move 1 — sci-fi equipment under the module ⚠ the big one

```
inventory--equipment/sci-fi-equipment/*  →  sci-fi-module/equipment/*
```

| | |
|---|---|
| Pages moved | 6 (`_index`, weapons, armor, kits, misc, bots--drones + 5 bot pages) |
| Internal links to rewrite | **36 occurrences across 19 files** |
| Redirects needed | 1 wildcard (`/inventory--equipment/sci-fi-equipment/*`) |
| Nav result | Inventory & Equipment holds core only; each module owns its catalog |

**My recommendation: don't, yet.** The subtree is *already* physically separated
— the only question is which parent it hangs from. Moving it buys a tidier nav
and costs every existing inbound link to your largest catalog. It is also the
one move that gets cheaper, not more expensive, if you wait: doing it at the same
time as the Medieval/Modern/Frontier stubs going live means one move and one set
of redirects instead of two.

### Move 2 — sci-fi rules additions under the module

```
core-rules/sci-fi-additions.md  →  sci-fi-module/rules-additions.md
```

Only **2 internal links**. Cheap. But it is also the page the module hub links to
for context, and it reads naturally where it is — a sci-fi reader arriving at
Core Rules finds the additions next to the rules they modify.

**My recommendation: leave it.** The hub already collects those 5 blocks.

### Move 3 — bots & drones → a creatures section

Your note: *"the whole bots/drones section probably belongs in a sci-fi creatures
and npc section"*. Agreed, but there is no creatures section yet — bots are
currently the only inhabitants. This wants to happen when there is a second kind
of creature to sit beside them, otherwise "Creatures" is a folder with four robots
in it.

**My recommendation: defer until there are creatures.** Noted in the roadmap
instead.

---

## What "hybrid" ends up meaning, concretely

| Layer | Treatment | Why |
|---|---|---|
| Core mechanics (`core-rules/`) | One book, untouched | They are the system; every module reads them |
| Character options | Interleaved, tabs per module, **plus** a generated module hub | The tabs are the in-context read; the hub is the module read |
| Equipment catalogs | Already physically split per module | Volume lives here — 106 of 145 sci-fi blocks are equipment |
| Module rules additions | Collected page, blocks shown in context too | Your existing pattern |
| Future modules | New tab + `{{< blockset category="fantasy" >}}` hub | No new tree per setting |

The nav gains exactly one entry (Sci-Fi Starter Module, weight 7, last under Free
SRD) and loses nothing.

---

## Still open from the A-list

- **A4** — generated section index lists. You said wait for nav to settle. Nav is
  now settled *except* for Move 1; that is the last thing that would change them.
- The five hand-written `## Related` sections, per `04-phase3-worksheets.md`.
- **B1–B5** — the rules calls.

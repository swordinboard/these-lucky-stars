# 00 — Structure Report (confirmed repo reality)

Phase 1 discovery pass. Everything below was verified against the working tree,
not assumed. Where reality differs from the spec's §2 assumptions, the deviation
is called out explicitly — **this report is authoritative**.

## Site toolchain

- Hugo site, config in `hugo.toml` (TOML). Theme: **hugo-book** as a git
  submodule at `themes/hugo-book` (pinned `81a841c`, upstream
  `alex-shpak/hugo-book`).
- The pinned theme requires **Hugo ≥ 0.146.0 extended** (`hugo.yaml` min
  version in the theme; confirmed by attempting a build with Hugo 0.123, which
  fails parsing the theme's partials). Phase 2 tooling that wants to build the
  site needs a modern Hugo binary **and** `git submodule update --init` — a
  fresh clone has an empty `themes/hugo-book/`.
- `disableKinds = ["taxonomy", "term"]` — Hugo's own tag system is off; the
  proposed block `tags:` frontmatter would not collide with it, but if Phase 4
  ever wants Hugo-rendered tag pages this setting has to change.

## Where shortcode definitions live

**Deviation from spec §2:** shortcodes are NOT in `layouts/shortcodes/`. This
repo uses Hugo's ≥0.146 layout convention:

- Site-local: `layouts/_shortcodes/` → `columns.html` (overrides the theme's),
  `download-card.html`, `include.html`, `quickref.html`, `roadmap.html`.
- Theme-provided: `themes/hugo-book/layouts/_shortcodes/` → `details.html`,
  `tabs.html`, `tab.html`, plus others unused in content (hint, card, button,
  section, steps, katex, mermaid, …). **`details` and `tabs`/`tab` come from
  the theme submodule**, not the site — relevant if the theme is ever swapped.

## How `include` resolves (confirmed by reading `include.html`)

```
{{ $path := .Get 0 }}
{{ with .Site.GetPage $path }}
  {{ .Content }}
{{ end }}
```

- Resolution is `.Site.GetPage` with the literal first argument — a **site-wide
  page path**, not a filename lookup in `snippets/`. It can therefore target
  **any page**, confirming that a whole page can *be* a block referenced in
  place with no extraction.
- Rendering is `.Content` with **no wrapper element** — headings inside an
  included file render at their literal level in the host page (none of the
  current snippets contain headings except `extreme-environments.md`, which
  contributes `###` headings to two different host pages).
- **Failure mode is silence**: if the path doesn't resolve, `with` skips the
  body and nothing renders — no error, no build warning. Phase 2's rewiring and
  Phase 4's preflight must not rely on Hugo to catch a bad include.
- Three target forms are in live use, all of which `.Site.GetPage` accepts:
  canonical `"/snippets/name"` (64 uses), with extension
  `"/snippets/wip-announcement.md"` (6 uses), and one missing the leading slash
  `"snippets/step"` (`action-economy.md:81`). Phase 2 should normalize to one
  form.

## Snippet layout (actual state)

- `content/snippets/` is **flat** — 27 content snippets + `_index.md`. No
  subdirectories, no naming convention beyond kebab-case (some names carry a
  domain prefix like `sci-fi-add-ballistic`, most don't).
- Every snippet carries `headless: true` frontmatter — **but the mechanism
  actually suppressing rendering is `snippets/_index.md`**, which sets
  `build: {render: never, list: never}` with a `cascade` applying the same to
  all children. In Hugo, `headless: true` only affects leaf bundles
  (`index.md`); on these regular pages it is inert. Harmless, but Phase 2
  should know which switch does the work (deviation from spec §2, which
  attributes the behavior to `headless: true`).
- All 27 snippets are referenced by at least one `include`; there are no
  orphans. Two (`announcement`, `wip-announcement`) are site-status banners —
  chrome, not rules content — and are proposed as excluded from the buildable
  corpus.

## Archetype / frontmatter defaults

- `archetypes/default.md` is **TOML** (`+++`) with `date`/`draft`/`title` —
  while every content file uses **YAML** (`---`). The archetype is effectively
  unused boilerplate; new files have clearly been created by hand. Phase 2
  writing snippet frontmatter should standardize on YAML (matching all
  existing content) and can ignore the archetype or update it then.
- Content frontmatter in practice: `title`, `description`, `weight`, plus
  theme flags (`bookCollapseSection`, `bookToC`, `bookHidden`,
  `bookNavButton`). `draft: true` on 4 pages (sci-fi-module, and the three
  empty equipment-module `_index` stubs).

## Shortcode-usage census (all of `content/`)

| Shortcode | Uses | Notes |
|---|---|---|
| `details` | 315 | Theme shortcode. Every use recorded as a block boundary in the inventory; none modified. |
| `include` | 71 | 27 distinct snippet targets; no page-targeting use yet. |
| `tab` / `tabs` | 18 / 8 | Feature/equipment summary tables (traits, proficiencies, abilities, weapons, armor). |
| `columns` | 1 | `races/_index.md` (site-local override of theme shortcode). |
| `roadmap` | 1 | `roadmap.md`; self-contained HTML/CSS widget. |
| `download-card` | 1 | `downloads.md`. |
| **`quickref`** | **0** | **Defined but never used.** Spec §2 said "effectively unused" — reality is *literally* unused. There are no usages to flag as extraction candidates and nothing to retire beyond leaving the file alone (it stays, per spec §3). Listed in `awareness-defaults.md`. |

## Anchor behavior (verified, load-bearing for edges)

Heading anchors were verified against goldmark's actual renderer (minimal Hugo
test site, since the full theme needs a newer Hugo): lowercase; spaces → `-`;
`&`, `/`, `(`, `)`, `,`, `.` dropped (leaving `--` where they were flanked by
spaces); underscores **kept**; **unicode kept** — so `### Crippled Δ` yields
`#crippled-δ`. That last fact breaks every `#crippled`-style link on the site
(7 conditions affected — systemic finding in
[queue-3](queue-3-ambiguous-targets.md)). Block IDs proposed in the inventory
strip the Δ and `[___]` decorations; the *anchors* recorded in `blocks.json`
are the real rendered ones.

## Corpus statistics

- 80 markdown files under `content/` (~6,060 lines): 52 docs pages + 28
  snippet-dir files.
- 759 markdown links (381 same-page anchors, 342 root-relative, 4 external,
  ~32 directory-relative), + 71 includes.
- Proposed: **432 blocks** (27 existing snippets, 15 whole-page blocks, 390
  proposed extractions) and **848 edges**. Breakdown and queue routing in
  [01-block-inventory.md](01-block-inventory.md) and the queue files.

## Deviations from spec §2, summarized

1. Shortcodes live in `layouts/_shortcodes/` (and the theme submodule), not
   `layouts/shortcodes/`.
2. Snippet render-suppression comes from the `_index.md` build cascade;
   `headless: true` is present everywhere but inert.
3. `quickref` has zero usages (spec anticipated flagging its uses; there are
   none).
4. `include` already supports whole-page targeting as §2 hoped — confirmed in
   the template, though no current usage exercises it.
5. The archetype default is TOML while all real content is YAML.

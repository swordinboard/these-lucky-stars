#!/usr/bin/env python3
"""Generates 01-block-inventory.md, queue-1, queue-3, queue-4, awareness-defaults
from out/blocks.json + out/edges.json + config in gen.py. Writes to out/."""
import json, os, collections, importlib.util

SB = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("gen", os.path.join(SB, "gen.py"))
# We don't import gen (it prints); instead re-declare page order + why via json dump below.

blocks = json.load(open(os.path.join(SB, "out/blocks.json")))
edges = json.load(open(os.path.join(SB, "out/edges.json")))
OUT = os.path.join(SB, "out")

by_id = {b["id"]: b for b in blocks}
by_page = collections.defaultdict(list)
for b in blocks:
    by_page[b["page"]].append(b)
for v in by_page.values():
    v.sort(key=lambda b: b["span"][0])

PAGE_ORDER = [
 "content/_index.md",
 "content/docs/_index.md",
 "content/docs/free-srd/_index.md",
 "content/docs/free-srd/core-rules/_index.md",
 "content/docs/free-srd/core-rules/basics.md",
 "content/docs/free-srd/core-rules/attributes.md",
 "content/docs/free-srd/core-rules/size.md",
 "content/docs/free-srd/core-rules/stats.md",
 "content/docs/free-srd/core-rules/action-economy.md",
 "content/docs/free-srd/core-rules/health.md",
 "content/docs/free-srd/core-rules/combat.md",
 "content/docs/free-srd/core-rules/wounds--conditions.md",
 "content/docs/free-srd/core-rules/environmental-effects.md",
 "content/docs/free-srd/core-rules/vehicle-rules.md",
 "content/docs/free-srd/core-rules/damaged--broken-gear.md",
 "content/docs/free-srd/core-rules/sci-fi-additions.md",
 "content/docs/free-srd/character-creation/_index.md",
 "content/docs/free-srd/character-creation/character-creation-overview.md",
 "content/docs/free-srd/character-creation/races/_index.md",
 "content/docs/free-srd/character-creation/races/classic-human.md",
 "content/docs/free-srd/character-creation/races/star-touched-human.md",
 "content/docs/free-srd/character-creation/races/android.md",
 "content/docs/free-srd/character-creation/races/reptilian.md",
 "content/docs/free-srd/character-creation/races/zeta-grey.md",
 "content/docs/free-srd/character-creation/traits.md",
 "content/docs/free-srd/character-creation/proficiencies.md",
 "content/docs/free-srd/character-creation/abilities.md",
 "content/docs/free-srd/inventory--equipment/_index.md",
 "content/docs/free-srd/inventory--equipment/inventory.md",
 "content/docs/free-srd/inventory--equipment/equipment.md",
 "content/docs/free-srd/inventory--equipment/generic-equipment.md",
 "content/docs/free-srd/inventory--equipment/item-tags.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/_index.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-weapons.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-armor.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-kits.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/sci-fi-misc-equipment.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/_index.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/hel-1.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/t00l.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/b2.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/trk-a.md",
 "content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md",
 "content/docs/free-srd/inventory--equipment/frontier--industry-equipment/_index.md",
 "content/docs/free-srd/inventory--equipment/medieval-equipment/_index.md",
 "content/docs/free-srd/inventory--equipment/modern-equipment/_index.md",
 "content/docs/free-srd/sci-fi-module.md",
 "content/docs/downloads.md",
 "content/docs/roadmap.md",
 "content/docs/contributors.md",
 "content/docs/appinstall.md",
 "content/docs/legal.md",
]

WHY = json.load(open(os.path.join(SB, "why.json")))

# ---------------- 01 block inventory ----------------
L = []
L.append("""# 01 — Block Inventory (proposed)

**Status: PROPOSAL — nothing here is applied.** Every page in `content/` is listed
below in site-nav order, with its proposed granularity (and reason), its proposed
blocks, and the section-derived tag-sets the split implies. Machine-readable
canonical data: [`blocks.json`](blocks.json) / [`edges.json`](edges.json).

Reading the tables:

- **ID** — proposed block ID, namespaced to avoid collisions. Derived from the
  existing heading anchor where possible. ID collisions would be flagged
  `ID-COLLISION` (none were found; near-collisions by *name* are listed at the
  bottom of this file as identity decisions).
- **Home** — `page` (page already stands alone; reference in place, no
  extraction), `snippet (existing)` (already in `content/snippets/`), or
  `snippet (proposed)` (Phase 2 would extract it; proposed filename in
  blocks.json). Blocks that must be individually addressable have to become
  snippets, because `include` can only target a whole page or snippet file.
- **Ref** — proposed `reference` rating, computed from cross-reference in-degree
  in the current corpus (high ≥ 6 inbound edges, medium ≥ 2, low otherwise).
  It is a starting proposal, not a judgment of importance.
- **Tags** — includes section-derived tags (tag-as-query, §4.4). The tag-sets
  implied by each split are shown with the split; the full per-tag member lists
  (for hole-scanning) are in [queue-4-tag-completeness.md](queue-4-tag-completeness.md).

Snippet files are listed under their own heading at the end — they are already
blocks and keep `home: snippet (existing)`.
""")

for page in PAGE_ORDER:
    pb = by_page.get(page, [])
    why = WHY.get(page, "")
    title = page
    L.append(f"\n## `{page}`\n")
    if not pb:
        L.append(f"**No blocks proposed.** {why}\n")
        continue
    gran = why
    L.append(f"**Granularity:** {gran}\n")
    L.append("| ID | Title | Home | Cat | Type | Tier | Ref | Tags |")
    L.append("|---|---|---|---|---|---|---|---|")
    for b in pb:
        flags = " ⚠ " + "; ".join(b["flags"]) if b["flags"] else ""
        note = f" — {b['notes']}" if b["notes"] else ""
        L.append(f"| `{b['id']}` | {b['title']}{flags} | {b['home']} | {b['category']} | {b['type']} | {b['tier']} | {b['reference']} | {', '.join(b['tags'])}{note} |")
    # tag-set implied by split (details pages)
    tagc = collections.Counter()
    for b in pb:
        for t in b["tags"]:
            tagc[t] += 1
    interesting = {t: n for t, n in tagc.items() if n >= 2 and t not in ("wip",)}
    if len(pb) >= 5 and interesting:
        L.append("\n**Section-derived tag-sets implied by this split** (review together with the split — full member lists in Queue 4):\n")
        L.append("| Tag | Blocks on this page |")
        L.append("|---|---|")
        for t, n in sorted(interesting.items(), key=lambda kv: -kv[1]):
            L.append(f"| `{t}` | {n} |")

L.append("\n## `content/snippets/_index.md`\n")
L.append("**No blocks proposed.** " + WHY.get("content/snippets/_index.md", "") + "\n")
L.append("\n## `content/snippets/` (existing snippet files — already blocks)\n")
L.append("**Granularity:** one file = one block, as-is. The two announcement banners are site chrome and excluded from the buildable corpus.\n")
L.append("| ID | Snippet file | Cat | Type | Tier | Ref | Tags |")
L.append("|---|---|---|---|---|---|---|")
for b in sorted(blocks, key=lambda b: b["id"]):
    if b["home"] != "snippet (existing)":
        continue
    flags = " ⚠ " + "; ".join(b["flags"]) if b["flags"] else ""
    L.append(f"| `{b['id']}`{flags} | {b['page']} | {b['category']} | {b['type']} | {b['tier']} | {b['reference']} | {', '.join(b['tags'])} |")

# name duplicates
byname = collections.defaultdict(list)
for b in blocks:
    byname[b["title"].strip().lower()].append(b["id"])
L.append("\n## Same-name blocks (identity decisions, §4.5)\n")
L.append("Distinct proposed IDs that share a display name. Each needs a ruling: one block with two tags, or two blocks that legitimately share a name. Recommendations in Queue 2 where the case is nontrivial.\n")
for name, ids in sorted(byname.items()):
    if len(ids) > 1:
        L.append(f"- **{name}**: " + ", ".join(f"`{i}`" for i in ids))

open(os.path.join(OUT, "01-block-inventory.md"), "w").write("\n".join(L) + "\n")

# ---------------- queue 1 ----------------
q1 = [e for e in edges if e.get("queue") == 1]
L = []
L.append("""# Queue 1 — Hard-dependency decisions

**Every edge here is *suspected* coherence-critical. None has been finalized.**
For each edge the human rules `dependency` (builder must auto-include the target)
or `reference` (surfaced at preflight as a fillable hole). Until ruled, all of
these remain `reference` in `edges.json` with `queued: true`.

A wrong `dependency` bloats every PDF; a wrong `reference` ships a silently
broken PDF. When in doubt, rule `reference` — preflight will still catch it.

Edges are grouped into five classes. A per-class blanket ruling is possible
(e.g. "all prerequisites are `dependency`"), with per-edge exceptions noted
inline.
""")

CLASS_INTRO = {
 "prerequisite": """### Class: `prerequisite` — feature requirement chains

Links inside the italic requirement line of an ability/proficiency/trait
(e.g. *[Charge](#charge), STR 2, Level 3*). A GM who prints Bash without Charge
gets a feature that references a rule that isn't in the PDF. These are the
strongest dependency candidates in the corpus — but auto-including whole chains
(Tis But a Scratch pulls Defender, Just Winded, Just Grazed, Tough…) is a real
size cost. Decide the policy once, here.""",
 "tag-definition": """### Class: `tag-definition` — equipment → item-tag definitions

Every equipment block that cites an item tag ([Bulky], [Ballistic [1d10]], …).
An item block whose tags aren't in the PDF is arguably incoherent (what does
Ballistic [1d12] mean without the Ballistic block?). One blanket ruling likely
covers all 82 edges — e.g. "tags are dependencies" or "the builder always
bundles the item-tags glossary when any equipment is selected" (which would
downgrade these to reference).""",
 "mechanism": """### Class: `mechanism` — rule leans on another rule's machinery

Each suspected individually; the target defines machinery (a chart, a die
procedure, a defined term) without which the source block doesn't resolve.
Includes implicit dependencies where the prose relies on a mechanism *without
linking to it* (marked "implicit — no link in text").""",
 "functions-as": """### Class: `functions-as` — item defined by another item

Component/item blocks whose rules text is literally "functions as X"
(Wrist Laser → Laser Pistol, etc.). Without the target, the block has no rules.""",
 "exclusivity": """### Class: `exclusivity` — mutually exclusive selections

"Cannot be combined with" pairs. Not auto-include candidates in the usual sense,
but the builder needs to know about the pair for validation; queued so a human
decides how these are represented.""",
}

for cls in ["prerequisite", "tag-definition", "mechanism", "functions-as", "exclusivity"]:
    rows = [e for e in q1 if e["class"] == cls]
    L.append(CLASS_INTRO[cls])
    L.append(f"\n{len(rows)} edges.\n")
    if cls == "tag-definition":
        bytag = collections.defaultdict(list)
        for e in rows:
            bytag[e["target"]].append(e["source"])
        L.append("| Target tag block | Sources citing it |")
        L.append("|---|---|")
        for t, srcs in sorted(bytag.items()):
            L.append(f"| `{t}` | " + ", ".join(f"`{s}`" for s in sorted(set(srcs))) + " |")
    else:
        L.append("| Source | Target | Where | Note |")
        L.append("|---|---|---|---|")
        for e in sorted(rows, key=lambda e: (e["source"], e["target"])):
            where = f"{e['file']}:{e['line']}" if e.get("file") else "—"
            note = e.get("note", "") or ""
            L.append(f"| `{e['source']}` | `{e['target']}` | {where} | {note} |")
    L.append("")

open(os.path.join(OUT, "queue-1-hard-dependencies.md"), "w").write("\n".join(L) + "\n")

# ---------------- queue 3 ----------------
ANNOT = json.load(open(os.path.join(SB, "q3-annotations.json")))
q3 = [e for e in edges if e.get("queue") == 3]
L = []
L.append("""# Queue 3 — Ambiguous / unresolvable targets

Cross-references whose target is not an addressable block — because the URL is
broken, the anchor doesn't exist, or the target was never written. **The edge
cannot be typed until the target is resolved by a human.** All of these carry
`queued: true` in `edges.json` with target `unresolved:<url>`.

These are also, incidentally, the site's broken links. Fixing them is Phase 2+
work — recorded here, not fixed.

## Systemic finding 1 — the Δ anchors

Condition headings marked with Δ (`### Crippled Δ`) render with the Δ in the
anchor: the real anchor is `#crippled-δ`, not `#crippled` (verified against
goldmark's renderer). **Every** `#crippled`, `#dying`, `#fatigued`,
`#immobilized`, `#restrained`, `#sick`, `#unconscious` link on the site is
therefore broken — including the condition summary table on the Wounds &
Conditions page itself. Affected conditions: Crippled, Dying, Fatigued,
Immobilized, Restrained, Sick, Unconscious.

## Systemic finding 2 — `prone` does not exist

Three links point at a `#prone` condition on the Wounds & Conditions page, and
several rules (Stand action, Trip, Improved Bash, vehicle rules) use "prone" as
a defined state — **but no Prone condition is defined anywhere in the corpus.**
This is a missing block, not a bad link.

## Full list
""")
L.append("| Where | URL as written | Class | Likely intent |")
L.append("|---|---|---|---|")
for e in sorted(q3, key=lambda e: (e["file"], e["line"])):
    url = e["url"]
    intent = ""
    for pat, note in ANNOT.items():
        if pat in url:
            intent = note
            break
    L.append(f"| {e['file']}:{e['line']} | `{url}` | {e['class']} | {intent} |")
open(os.path.join(OUT, "queue-3-ambiguous-targets.md"), "w").write("\n".join(L) + "\n")

# ---------------- queue 4 ----------------
L = []
L.append("""# Queue 4 — Tag-completeness / set integrity

For every proposed tag: the **full set of blocks that carry it**. A block
missing a tag it should have is invisible in a tag-as-query pull — scan each
set for holes. Tags come from three sources: section-derived (tag-as-query,
§4.4), page-domain, and structural (`wip`, `site-chrome`).

Things to scan for specifically:

- **`core` vs `sci-fi` on features** — every trait/proficiency/ability carries
  exactly one of the two; the counts below should match the site's section
  counts (they do: traits 16+3, proficiencies 14+3, abilities 55+7+8+5).
- **Sci-fi content living on core pages** keeps its `sci-fi` tag (e.g.
  `environment/extreme-environments`, `sci-fi/ballistics-in-space` embedded in
  the core Ballistic item-tag block). If a GM pulls "all core environment
  rules", extreme environments will NOT come along — that is by design, but
  verify it's the intended design.
- **The `luck` set** — Luck the stat (`stats/luck`) and the Core Luck abilities
  share the tag. If the builder treats `luck` as one pull, the stat block rides
  along with the ability list. Confirm that's wanted.
""")
tag_map = collections.defaultdict(list)
for b in blocks:
    for t in b["tags"]:
        tag_map[t].append(b["id"])
for t in sorted(tag_map):
    ids = sorted(tag_map[t])
    L.append(f"\n## `{t}` — {len(ids)} blocks\n")
    L.append(", ".join(f"`{i}`" for i in ids))
open(os.path.join(OUT, "queue-4-tag-completeness.md"), "w").write("\n".join(L) + "\n")

# ---------------- awareness ----------------
L = []
n_ref = len([e for e in edges if e["type"] == "reference" and not e.get("queued")])
n_men = len([e for e in edges if e["type"] == "mention"])
n_inc = len([e for e in edges if e["type"] == "include"])
L.append(f"""# Awareness — defaults applied (no action performed)

Everything in this file was **defaulted, not decided**. It is applied by
nothing; listed so nothing questionable slid by silently. Machine-readable
form: `edges.json` (defaults carry `queued: false`).

## Summary

- **{n_ref} edges defaulted to `reference`** (safe default, §4.3) — full list below.
- **{n_men} edges confidently tagged `mention`** — each provably out of the buildable
  corpus (external sites, web-app tools, site utility pages) — full list below.
- **{n_inc} `include` composition edges** recorded with type `include` — these are
  structural (a page pulling a snippet), resolved by construction, not
  cross-references. Listed in `edges.json` only.
- **`quickref` usages found: 0.** The shortcode is defined
  (`layouts/_shortcodes/quickref.html`) but never used in content. Retirement
  by disuse is already a fact; the shortcode file stays (per spec §3), and
  there are no usages to flag as extraction candidates.
- **`details` usages found: 315** — all recorded; each is a block boundary in
  the inventory. None modified, no conversion pressure applied.

## Mentions (confident out-of-corpus)
""")
L.append("| Where | Target | Link text |")
L.append("|---|---|---|")
for e in edges:
    if e["type"] == "mention":
        L.append(f"| {e['file']}:{e['line']} | `{e['url']}` | {e.get('text') or ''} |")

L.append("""
## Content observations (recorded only — nothing changed)

Found while reading; none of these is a discovery-pass decision, but future
phases (or ordinary editing) will want the list:

- `abilities/student` and `abilities/expert` require **INT** — the attribute
  system has KNO, not INT.
- Shock Charger: summary table says **+2 damage**, rules text says **+1**.
- Squad Shield: summary table says **30pts** protection, rules text says **40 point**.
- Fast Kit Trap: "retrieving the kit after is lowered to **12 AP**" (Kit Trap
  says 20 AP; likely fine, listed for review).
- The Wounds & Conditions summary tables link to the broken Δ anchors on their
  own page (see Queue 3 systemic finding 1).
- `content/docs/free-srd/core-rules/vehicle-rules.md:44` has broken link
  markdown: `**Direct From Action Economy](...)** ` (missing opening bracket);
  line 70 links `#imapct--overrun` (typo). The page carries many typos —
  consistent with its WIP banner.
- `sci-fi-misc-equipment.md` mini-TOC links `#communications` but the heading
  is "Communication Devices" (`#communication-devices`).
- Several generic-equipment summary-table anchors don't match their item
  headings (Reinforced/Sturdy Boots, Compass, Shovel, Antitoxin) — itemized in
  Queue 3.
- `archetypes/default.md` is TOML (`+++`) while all content uses YAML
  frontmatter — see structure report.

## All edges defaulted to `reference` (grouped by source)
""")
grp = collections.defaultdict(list)
for e in edges:
    if e["type"] == "reference" and not e.get("queued"):
        grp[e["source"]].append(e["target"])
for src in sorted(grp):
    tgts = sorted(set(grp[src]))
    L.append(f"- `{src}` → " + ", ".join(f"`{t}`" for t in tgts))
open(os.path.join(OUT, "awareness-defaults.md"), "w").write("\n".join(L) + "\n")

print("reports written")

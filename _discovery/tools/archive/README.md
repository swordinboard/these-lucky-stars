# Archived tools — do not run these

One-time scripts from the Phase 1 (discovery) and Phase 2 (transformation)
passes. They are kept for provenance: they document exactly how the block model
was derived and applied. **They are finished work — running them again would
either do nothing or corrupt the current tree.**

The live tools are one directory up (`_discovery/tools/`); see
`site-maintenance-notes.md` for what to run and when.

| Script | What it did | Why it is retired |
|---|---|---|
| `extract.py` | Structural scan of `content/` → `raw.json` (headings, anchors, includes, links) | Superseded — `builddata.py` parses the tree directly, no intermediate file |
| `gen.py`, `gen2.py` | Built the proposed block model + edge graph (Phase 1 / final rulings) | The model now lives in the content's own frontmatter |
| `gen_reports.py` | Wrote the Phase 1 inventory + queue markdown | Queues are cleared; reports are frozen in `_discovery/` |
| `q3-annotations.json` | Human annotations for the Queue 3 broken-link list | Those links are fixed |
| `wave1.py` | Applied the Wave 1 content fixes (Δ anchors, link repairs) | Applied once; re-running would double-apply |
| `wave2.py` | Moved snippets into namespace dirs, normalised includes | Applied once |
| `wave3.py` | Extracted 397 blocks into snippets | Applied once; re-running would re-cut already-cut pages |
| `wave4.py` | Wrote block frontmatter + first `data/*.json` | **Replaced by `builddata.py`** — wave4 depended on scratchpad files that no longer exist, so it cannot run from a clean clone |
| `harvest.py` | Harvested `summary:` one-liners out of the old hand-typed tables | Spent — those tables are now generated *from* `summary`, so there is nothing left to harvest |
| `tablesync.py`, `tablesync2.py` | Converted the hand-typed tables into `{{< catalog >}}` calls | Spent — all catalog tables are converted |
| `verify.py` | Compared *composed markdown source* against a baseline | **Retired as unsafe.** Source equivalence is not sufficient: identical markdown can render differently once split across `include` boundaries. It reported "nothing lost" while the entire Mounts section had silently vanished from the built site. Use `rendercheck.py` (compares rendered text) instead. |

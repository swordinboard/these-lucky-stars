#!/usr/bin/env python3
"""Wave 4: write block frontmatter everywhere; generate data/blocks.json and
data/edges.json from the FINAL tree (links resolved to block IDs)."""
import json, os, re, collections, subprocess

SB = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/user/these-lucky-stars"

# fresh structural scan of the final tree
subprocess.run(["python3", os.path.join(SB, "extract.py")], check=True, capture_output=True)
RAW = json.load(open(os.path.join(SB, "raw.json")))
B2 = json.load(open(os.path.join(SB, "out2/blocks.json")))

# pull curated lists out of gen2.py
g2 = open(os.path.join(SB, "gen2.py")).read()
def eval_block(name):
    i = g2.index(name + " = ")
    s = g2[i + len(name) + 3:]
    depth = 0
    for j, ch in enumerate(s):
        if ch in "{[":
            depth += 1
        elif ch in "}]":
            depth -= 1
            if depth == 0:
                return eval(s[:j + 1])
SUSPECT_PAIRS = eval_block("SUSPECT_PAIRS")
IMPLICIT = eval_block("IMPLICIT")

VARIANT = {"gear/generic-equipment/field-ration": "field-ration",
           "gear/sci-fi-equipment/field-ration": "field-ration"}

# ---------- block table keyed by id, with final file locations ----------
blocks = {}
for b in B2:
    nb = dict(b)
    if b["home"].startswith("snippet"):
        nb["home"] = "snippet"
        nb["file"] = "content/snippets/" + b["id"] + ".md"
    else:
        nb["home"] = "page"
        nb["file"] = b["page"]
    nb["source_page"] = b["page"]
    nb.pop("span", None)
    if b["id"] in VARIANT:
        nb["variant_group"] = VARIANT[b["id"]]
    if any(str(f).startswith("excluded") for f in b.get("flags", [])):
        nb["excluded"] = True
    blocks[b["id"]] = nb

missing = [b["id"] for b in blocks.values() if not os.path.exists(os.path.join(REPO, b["file"]))]
assert not missing, missing

# ---------- URL/page maps ----------
def url_for(path):
    p = path[len("content"):]
    return p[:-len("_index.md")] if p.endswith("/_index.md") else p[:-3] + "/"

PAGE_BY_URL = {url_for(p): p for p in RAW if not p.startswith("content/snippets/")}
SNIP_BY_PATH = {p: p[len("content/snippets/"):-3] for p in RAW if p.startswith("content/snippets/") and not p.endswith("_index.md")}
PAGE_BLOCK = {b["file"]: bid for bid, b in blocks.items() if b["home"] == "page"}

inc_norm = lambda t: (t if t.startswith("/") else "/" + t)[:-3] if t.endswith(".md") else (t if t.startswith("/") else "/" + t)

def includes_of(path, seen=None):
    """Snippet ids included by a file, recursive."""
    seen = seen if seen is not None else set()
    out = []
    for inc in RAW[path]["includes"]:
        t = inc_norm(inc["target"])
        sp = "content" + t + ".md"
        sid = SNIP_BY_PATH.get(sp)
        if sid and sid not in seen:
            seen.add(sid)
            out.append(sid)
            out += includes_of(sp, seen)
    return out

# per-docs-page anchor -> owning block id
PAGE_ANCHOR_BLOCK = {}
for path in PAGE_BY_URL.values():
    m = {}
    for h in RAW[path]["headings"]:
        m[h["anchor"]] = PAGE_BLOCK.get(path)  # page-block or None (frame)
    for sid in includes_of(path):
        sp = "content/snippets/" + sid + ".md"
        for h in RAW[sp]["headings"]:
            m.setdefault(h["anchor"], sid)
        for h in RAW[sp]["headings"]:
            if m.get(h["anchor"]) is None:
                m[h["anchor"]] = sid
    PAGE_ANCHOR_BLOCK[path] = m

MENTION_PREFIX = ("http://", "https://", "mailto:", "/digitalcharactersheet",
                  "/attributeconverter", "/planetnamegenerator", "/pdfs/", "/images/")
MENTION_PAGES = {"/docs/downloads/", "/docs/roadmap/", "/docs/legal/", "/docs/contributors/",
                 "/docs/appinstall/", "/docs/free-srd/", "/docs/"}
FEATURE_NS = ("abilities/", "proficiencies/", "traits/")
EQUIP_NS = ("generic-equipment/", "sci-fi-equipment/", "components/", "equipment/")

def source_block_for(path):
    if path.startswith("content/snippets/"):
        return SNIP_BY_PATH.get(path)
    return PAGE_BLOCK.get(path) or f"page:{url_for(path)}"

lines_cache = {}
def line_text(path, n):
    if path not in lines_cache:
        lines_cache[path] = open(os.path.join(REPO, path)).read().split("\n")
    return lines_cache[path][n - 1]

edges = []
for path, P in RAW.items():
    if path.endswith("_index.md") and path == "content/snippets/_index.md":
        continue
    src_default = source_block_for(path)
    for lk in P["links"]:
        url = lk["url"]
        e = {"source": src_default, "target": None, "type": "reference",
             "url": url, "text": lk["text"], "file": path, "line": lk["line"]}
        if url.startswith(MENTION_PREFIX):
            e["target"] = f"external:{url}"; e["type"] = "mention"; edges.append(e); continue
        pathpart, frag = (url.split("#", 1) + [None])[:2] if "#" in url else (url, None)
        if pathpart == "":
            tpage = path if not path.startswith("content/snippets/") else None
            if tpage is None:
                # same-page anchor inside a snippet: resolve on host pages first
                sid_self = SNIP_BY_PATH.get(path)
                hosts = [dp for dp in PAGE_BY_URL.values() if sid_self in includes_of(dp)]
                tgt = None
                for dp in hosts + [d for d in PAGE_ANCHOR_BLOCK if d not in hosts]:
                    m = PAGE_ANCHOR_BLOCK[dp]
                    if frag in m:
                        tgt = m[frag] or f"page:{url_for(dp)}#{frag}"
                        break
                if tgt is None:
                    e["target"] = f"unresolved:{url}"; e["class"] = "broken-anchor"
                    edges.append(e); continue
                e["target"] = tgt
                tpage = None  # fall through to typing rules below
        else:
            if not pathpart.startswith("/"):
                pathpart = url_for(path) + pathpart if not path.startswith("content/snippets/") else "/" + pathpart
            if not pathpart.endswith("/"):
                pathpart += "/"
            if pathpart in MENTION_PAGES:
                e["target"] = f"page:{pathpart}"; e["type"] = "mention"; edges.append(e); continue
            tpage = PAGE_BY_URL.get(pathpart)
        if tpage is None and e["target"] is None:
            e["target"] = f"unresolved:{url}"
            e["class"] = "known-broken"
            e["note"] = "intentionally left broken (tool-kits page planned); flagged for Phase 3"
            edges.append(e); continue
        if tpage is not None and frag:
            if frag not in PAGE_ANCHOR_BLOCK[tpage]:
                e["target"] = f"unresolved:{url}"; e["class"] = "broken-anchor"
                edges.append(e); continue
            bid = PAGE_ANCHOR_BLOCK[tpage][frag]
            e["target"] = bid if bid else f"page:{url_for(tpage)}#{frag}"
        elif tpage is not None:
            e["target"] = PAGE_BLOCK.get(tpage, f"page:{url_for(tpage)}")
        # typing rules
        pair = (e["source"], e["target"])
        line = line_text(path, lk["line"]).strip()
        if pair in (("character/traits/particularly-attractive", "character/traits/unremarkable"),
                    ("character/traits/unremarkable", "character/traits/particularly-attractive")):
            e["type"] = "mention"; e["class"] = "exclusivity"
            e["note"] = "ruled inert: gameplay-level exclusivity, no builder semantics"
        elif pair in SUSPECT_PAIRS:
            e["class"] = SUSPECT_PAIRS[pair]
        elif (str(e["source"]).startswith(FEATURE_NS) and str(e["target"]).startswith(FEATURE_NS)
              and line.startswith("*") and not line.startswith("**") and line.endswith("*")):
            e["type"] = "dependency"; e["class"] = "prerequisite"
        elif str(e["source"]).startswith(EQUIP_NS) and str(e["target"]).startswith("item-tags/"):
            e["class"] = "tag-definition"
        edges.append(e)
    for inc in P["includes"]:
        t = inc_norm(inc["target"])
        sid = SNIP_BY_PATH.get("content" + t + ".md")
        edges.append({"source": src_default, "target": sid or f"unresolved:{inc['target']}",
                      "type": "include", "url": inc["target"], "text": None,
                      "file": path, "line": inc["line"]})

for (s, t, cls, why) in IMPLICIT:
    edges.append({"source": s, "target": t, "type": "reference", "class": cls,
                  "url": None, "text": None, "file": None, "line": None,
                  "note": why + " (implicit — no link in text; ruled reference)"})

# requires + in-degree
for e in edges:
    if e["type"] == "dependency" and e["source"] in blocks:
        blocks[e["source"]].setdefault("requires", [])
        if e["target"] not in blocks[e["source"]]["requires"]:
            blocks[e["source"]]["requires"].append(e["target"])
indeg = collections.Counter(e["target"] for e in edges
                            if e["target"] in blocks and not str(e["source"]).startswith("page:"))
for bid, b in blocks.items():
    d = indeg[bid]
    b["reference"] = "high" if d >= 6 else ("medium" if d >= 2 else "low")
    b["in_degree"] = d

# ---------- write frontmatter ----------
def ylist(v):
    return "[" + ", ".join(v) + "]"

n_fm = 0
for bid, b in sorted(blocks.items()):
    full = os.path.join(REPO, b["file"])
    s = open(full).read()
    assert s.startswith("---"), b["file"]
    end = s.index("\n---", 3)
    body = s[end + 4:]
    if b["home"] == "snippet":
        fm = ["---", f'title: "{b["title"]}"', f"id: {bid}",
              f"category: {ylist(b['category'])}", f"type: {b['type']}",
              f"tier: {b['tier']}", f"reference: {b['reference']}",
              f"tags: {ylist(b['tags'])}"]
        if not b.get("selectable", True):
            fm.append("selectable: false")
        if b.get("excluded"):
            fm.append("excluded: true")
        if b.get("requires"):
            fm.append(f"requires: {ylist(b['requires'])}")
        if b.get("variant_group"):
            fm.append(f"variant_group: {b['variant_group']}")
        fm.append("headless: true")
        fm.append("---")
        open(full, "w").write("\n".join(fm) + body)
    else:
        # page-as-block: append block keys inside existing frontmatter
        head = s[:end]
        if "\nid: " in head:
            n_fm += 1
            continue
        add = [f"id: {bid}", f"category: {ylist(b['category'])}", f"type: {b['type']}",
               f"tier: {b['tier']}", f"reference: {b['reference']}", f"tags: {ylist(b['tags'])}"]
        if b.get("excluded"):
            add.append("excluded: true")
        open(full, "w").write(head + "\n" + "\n".join(add) + s[end:])
    n_fm += 1
print("frontmatter written:", n_fm)

# ---------- data/ ----------
os.makedirs(os.path.join(REPO, "data"), exist_ok=True)
out_blocks = []
for bid, b in sorted(blocks.items()):
    ob = {k: b[k] for k in ["id", "title", "home", "file", "source_page", "anchor",
                            "category", "type", "tier", "reference", "in_degree",
                            "tags", "flags", "notes"]}
    ob["selectable"] = b.get("selectable", True)
    for k in ["requires", "variant_group", "excluded"]:
        if b.get(k):
            ob[k] = b[k]
    out_blocks.append(ob)
json.dump(out_blocks, open(os.path.join(REPO, "data/blocks.json"), "w"), indent=1)
json.dump(edges, open(os.path.join(REPO, "data/edges.json"), "w"), indent=1)

print("blocks:", len(out_blocks))
print("edge types:", collections.Counter(e["type"] for e in edges))
unres = [e for e in edges if str(e["target"]).startswith("unresolved:")]
print("unresolved:", [(e["file"], e["line"], e["url"]) for e in unres])

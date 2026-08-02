#!/usr/bin/env python3
"""
builddata.py — regenerate data/blocks.json and data/edges.json from the repo.

Reads the content tree ONLY (block frontmatter + {{% include %}} composition +
markdown links), so the canonical data can always be rebuilt from a fresh clone.
Writes data/blocks.json and data/edges.json.
Run it after any structural content change (new/moved/renamed blocks, edited
links, edited frontmatter).

    python3 _discovery/tools/builddata.py           # rewrite data/*.json
    python3 _discovery/tools/builddata.py --check   # fail if data/ is stale

Source of truth = the markdown files. `in_degree` is recomputed each run and is
the only measure of how heavily a block is depended on — the old authored
`reference` rating was a hand-kept copy of it and has been dropped, along with
`tier`, which duplicated `category`. `flags` and `notes` are curation metadata
with no frontmatter home, so they are carried forward from the existing
data/blocks.json by block id.
"""
import json, os, re, sys, collections

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
CONTENT = os.path.join(REPO, "content")

# ---------------------------------------------------------------- parsing ---
# The optional 2nd/3rd args decide how the block's title renders. A level
# argument means the shortcode emits the title itself, which changes where the
# block's anchor comes from — see the anchor resolution below.
inc_re = re.compile(r'\{\{[<%]\s*include\s+"([^"]+)"(?:\s+"([^"]*)")?(?:\s+"([^"]*)")?')
# blockdetails names a block by id rather than by snippet path, but places it on
# the page exactly as an include does — so it is normalised into the same list.
bdetails_re = re.compile(r'\{\{[<%]\s*blockdetails\s+"([^"]+)"')
link_re = re.compile(r"\[([^\]]*)\]\(([^)\s]+)\)")
heading_re = re.compile(r"^(#{1,6})\s+(.*)$")
catalog_re = re.compile(r"\{\{<\s*catalog\b")
# statblock draws a card that prints the block's own name as its header, so a
# snippet using it names itself without a markdown heading — and therefore owns
# an anchor that nothing on the host page declares. Same situation blockdetails
# is in, and it gets the same treatment in the anchor resolution below.
statblock_re = re.compile(r"\{\{[<%]\s*statblock\b")


def hugo_anchor(text):
    """Mirror goldmark's autoHeadingID (underscores kept, unicode kept)."""
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text.strip())
    t = re.sub(r"[*`]", "", t).lower()
    out = []
    for ch in t:
        if ch.isalnum() or ch == "_":
            out.append(ch)
        elif ch in " -\t":
            out.append("-")
    return "".join(out)


def parse(path):
    """-> dict(frontmatter, headings, includes, links) for one markdown file."""
    raw = open(os.path.join(REPO, path)).read()
    fm, body = {}, raw
    if raw.startswith("---"):
        end = raw.index("\n---", 3)
        for line in raw[4:end].split("\n"):
            m = re.match(r"^([a-zA-Z_]+):\s*(.*)$", line)
            if not m:
                continue
            k, v = m.group(1), m.group(2).strip()
            if v.startswith("[") and v.endswith("]"):
                v = [x.strip().strip('"') for x in v[1:-1].split(",") if x.strip()]
            elif v.startswith('"') and v.endswith('"'):
                v = v[1:-1].replace('\\"', '"')
            elif v in ("true", "false"):
                v = v == "true"
            fm[k] = v
        body = raw[end + 4:]
    lines = body.split("\n")
    offset = raw[: len(raw) - len(body)].count("\n")
    headings, seen = [], {}
    for i, line in enumerate(lines, 1):
        m = heading_re.match(line)
        if m:
            a = hugo_anchor(m.group(2))
            if a in seen:
                seen[a] += 1
                a = f"{a}-{seen[a]}"
            else:
                seen[a] = 0
            headings.append({"line": i + offset, "level": len(m.group(1)),
                             "text": m.group(2).strip(), "anchor": a})
    includes, links = [], []
    for i, line in enumerate(lines, 1):
        for m in inc_re.finditer(line):
            includes.append({"line": i + offset, "target": m.group(1),
                             "level": m.group(2) or "", "show": m.group(3) or ""})
        for m in bdetails_re.finditer(line):
            includes.append({"line": i + offset,
                             "target": "/snippets/" + m.group(1)})
        for m in link_re.finditer(line):
            links.append({"line": i + offset, "text": m.group(1), "url": m.group(2)})
    return {"fm": fm, "headings": headings, "includes": includes,
            "links": links, "body": body}


PAGES = {}
for dirpath, _dirs, files in os.walk(CONTENT):
    for fn in sorted(files):
        if fn.endswith(".md"):
            p = os.path.relpath(os.path.join(dirpath, fn), REPO)
            PAGES[p] = parse(p)

SNIPPETS = {p: p[len("content/snippets/"):-3] for p in PAGES
            if p.startswith("content/snippets/") and not p.endswith("_index.md")}
DOCS = [p for p in PAGES if not p.startswith("content/snippets/")]


def url_for(path):
    p = path[len("content"):]
    return p[: -len("_index.md")] if p.endswith("/_index.md") else p[:-3] + "/"


PAGE_BY_URL = {url_for(p): p for p in DOCS}


def norm_target(t):
    t = t if t.startswith("/") else "/" + t
    return t[:-3] if t.endswith(".md") else t


def includes_of(path, seen=None):
    """Snippet ids pulled into a file, recursively, in document order."""
    seen = seen if seen is not None else set()
    out = []
    for inc in PAGES[path]["includes"]:
        sp = "content" + norm_target(inc["target"]) + ".md"
        sid = SNIPPETS.get(sp)
        if sid and sid not in seen:
            seen.add(sid)
            out.append(sid)
            out += includes_of(sp, seen)
    return out


def blockdetails_ids(path):
    """Block ids placed by {{< blockdetails >}} on a page."""
    return bdetails_re.findall(PAGES[path]["body"])


children_re = re.compile(r"\{\{<\s*children([^>]*?)/?>\}\}")


def children_of(path):
    """Doc paths listed by {{< children >}} on a page — mirrors the shortcode.

    Without this, generating a section index would silently delete that
    section's outbound edges from the graph, because the links no longer exist
    in the markdown. Same trap `blockdetails` had.
    """
    calls = children_re.findall(PAGES[path]["body"])
    if not calls:
        return []
    out = []
    for call in calls:
        params = dict(param_re.findall(call))
        section = path
        if params.get("page"):
            section = PAGE_BY_URL.get(params["page"].rstrip("/") + "/")
            if not section:
                continue
        base = os.path.dirname(section)
        for dp in DOCS:
            if dp == section:
                continue
            d = os.path.dirname(dp)
            # direct children: a sibling file, or a subsection's own _index.md
            if not (d == base or (os.path.dirname(d) == base and dp.endswith("_index.md"))):
                continue
            fm = PAGES[dp]["fm"]
            if fm.get("bookHidden") or fm.get("draft"):
                continue
            out.append(dp)
    return out


blockset_re = re.compile(r"\{\{<\s*blockset([^>]*?)/?>\}\}")
catalog_prop_re = re.compile(r"\{\{<\s*catalog([^>]*?)/>\}\}")
param_re = re.compile(r'(\w+)="([^"]*)"')
FILTERS = ("category", "namespace", "type", "tag", "page", "wip")


def selected_by(call, blocks, snippets_only):
    """Blocks a property-filtered shortcode call selects. Mirrors the templates —
    if these drift apart, data/ stops describing what the site actually shows."""
    p = dict(param_re.findall(call))
    out = []
    for bid, b in blocks.items():
        if b.get("excluded"):
            continue
        if snippets_only and b["home"] != "snippet":
            continue
        if p.get("category") and p["category"] not in (b.get("category") or []):
            continue
        if p.get("type") and p["type"] != b.get("type"):
            continue
        if p.get("tag") and p["tag"] not in (b.get("tags") or []):
            continue
        if p.get("page") and p["page"] not in b.get("page_urls", []):
            continue
        if p.get("namespace") and not bid.startswith(p["namespace"] + "/"):
            continue
        if p.get("wip") == "exclude" and b.get("wip"):
            continue
        out.append(bid)
    return out


def blockset_ids(path, blocks):
    """Block ids DISPLAYED on a page by {{< blockset >}}.

    Only snippet-homed blocks count as placed: the shortcode links page-homed
    blocks (races, bot platforms) rather than inlining them.
    """
    out = []
    for call in blockset_re.findall(PAGES[path]["body"]):
        for bid in selected_by(call, blocks, snippets_only=True):
            if bid not in out:
                out.append(bid)
    return out


def catalog_prop_ids(path, blocks):
    """Block ids a page LINKS TO via a property-filtered {{< catalog ... />}}.
    These are references, not placements — a table row is a link, not the block."""
    out = []
    for call in catalog_prop_re.findall(PAGES[path]["body"]):
        if not any(f'{k}="' in call for k in FILTERS):
            continue
        for bid in selected_by(call, blocks, snippets_only=False):
            if bid not in out:
                out.append(bid)
    return out


def catalog_nesting(path):
    """(child, parent) pairs asserted by the `- ` / `-- ` indents in a catalog.

    This is a PRESENTATION relationship — where a reader meets an entry — and it
    is deliberately not the same as `requires`, which is the mechanical rule.
    Slip Strike is listed under Momentum Dodge but requires Agile Dodge; both
    are correct. Recorded so the two can be compared, never merged.
    """
    out, inside, stack = [], False, {}
    for line in PAGES[path]["body"].split("\n"):
        s = line.strip()
        if catalog_re.match(s):
            inside, stack = True, {}
            continue
        if s.startswith("{{< /catalog"):
            inside = False
            continue
        if not inside or not s:
            continue
        if s.startswith("-- "):
            lvl, bid = 2, s[3:].strip()
        elif s.startswith("- "):
            lvl, bid = 1, s[2:].strip()
        else:
            lvl, bid = 0, s
        stack[lvl] = bid
        if lvl and stack.get(lvl - 1):
            out.append((bid, stack[lvl - 1]))
    return out


# also treat {{< catalog >}} body lines as block references (they name block ids)
def catalog_ids(path):
    out, inside = [], False
    for line in PAGES[path]["body"].split("\n"):
        s = line.strip()
        if catalog_re.match(s):
            inside = True
            continue
        if s.startswith("{{< /catalog"):
            inside = False
            continue
        if inside and s:
            out.append(re.sub(r"^-+\s+", "", s))
    return out


# ----------------------------------------------------------------- blocks ---
prev = {}
prev_path = os.path.join(REPO, "data/blocks.json")
if os.path.exists(prev_path):
    prev = {b["id"]: b for b in json.load(open(prev_path))}

blocks = {}
for path, P in PAGES.items():
    bid = P["fm"].get("id")
    if not bid:
        continue
    is_snip = path.startswith("content/snippets/")
    b = {
        "id": bid,
        "title": P["fm"].get("title", ""),
        "home": "snippet" if is_snip else "page",
        "file": path,
        "anchor": None,   # resolved below
        "category": P["fm"].get("category", []),
        "type": P["fm"].get("type", "rule"),
        "tags": P["fm"].get("tags", []),
        "flags": prev.get(bid, {}).get("flags", []),
        "notes": prev.get(bid, {}).get("notes", ""),
        "selectable": P["fm"].get("selectable", True),
    }
    for k in ("summary", "label", "variant_group", "excluded", "requires"):
        if k in P["fm"]:
            b[k] = P["fm"][k]
    blocks[bid] = b

# where each block is displayed (all host pages, in site order).
# Both composition mechanisms count: {{% include %}} names one block,
# {{< blockset >}} selects a set — a block rendered by either is on that page.
for dp in sorted(DOCS):
    for sid in includes_of(dp) + blockset_ids(dp, blocks):
        if sid in blocks:
            blocks[sid].setdefault("pages", [])
            if dp not in blocks[sid]["pages"]:
                blocks[sid]["pages"].append(dp)
for bid, b in blocks.items():
    if b["home"] == "page":
        b["pages"] = [b["file"]]
    b.setdefault("pages", [])
    b["source_page"] = b["pages"][0] if b["pages"] else None
    # every page URL this block is displayed on — lets a shortcode say "list what
    # is on the weapons page" without re-tagging anything. Must exist before the
    # edge pass, which evaluates page= filters.
    b["page_urls"] = [url_for(p) for p in b["pages"]]

# where an index lists each block, if it lists it as a child of another
for dp in DOCS:
    for child, parent in catalog_nesting(dp):
        if child in blocks and parent in blocks:
            blocks[child]["listed_under"] = parent

# work-in-progress status, computed so the builder has ONE field to filter on.
# A block is wip if its own frontmatter says so, if it carries the `wip` tag, or
# if every page that displays it is `wip: true` (a snippet shown on both a
# finished and an unfinished page is not itself unfinished).
for bid, b in blocks.items():
    own = bool(PAGES[b["file"]]["fm"].get("wip")) or "wip" in b["tags"]
    hosts = [p for p in b["pages"] if p != b["file"]]
    inherited = bool(hosts) and all(PAGES[p]["fm"].get("wip") for p in hosts)
    b["wip"] = own or inherited

# anchor resolution:
#  * details-wrapped block -> its own first heading (that heading IS the block title)
#  * section block -> the host-page heading immediately above its include
for bid, b in blocks.items():
    hs = PAGES[b["file"]]["headings"]
    # owns_heading: does the block's FILE still open with its own title?
    #
    # A fact about the snippet, never about where it is placed. It briefly also
    # got set from the call site — "this include renders the title" — and the two
    # meanings disagreed on 80 blocks, which is what made §C6 report healthy
    # blocks as broken. Keep it file-derived.
    #
    # It is a MIGRATION METER, not a permanent field: every converted block sets
    # it false, and when it reaches zero the field and its two readers
    # (blockset, blockdetails) can all go.
    b["owns_heading"] = bool(hs) and hugo_anchor(b["title"]) == hs[0]["anchor"]
    if b["owns_heading"]:
        b["anchor"] = hs[0]["anchor"]
        continue
    if b["home"] == "page":
        b["anchor"] = hs[0]["anchor"] if hs else None
        continue
    if not b["pages"]:
        b["anchor"] = hs[0]["anchor"] if hs else None
        continue
    host = b["pages"][0]
    incs = [i for i in PAGES[host]["includes"]
            if SNIPPETS.get("content" + norm_target(i["target"]) + ".md") == bid]
    if not incs:
        continue
    inc = incs[0]
    # An include carrying a level renders the block's OWN title as the heading,
    # so the anchor comes from the title — not from whatever page heading happens
    # to sit above it. Without this the anchor silently becomes the block's first
    # internal heading once the page-chrome heading is removed.
    if inc.get("level") and inc["show"] != "false":
        b["anchor"] = hugo_anchor(b["title"])
        continue
    # blockdetails puts the anchor on its <details> element once the block has
    # no heading of its own, so the block still owns an anchor even though
    # nothing on the host page declares one.
    if bid in blockdetails_ids(host):
        b["anchor"] = hugo_anchor(b["title"])
        continue
    # a statblock card carries the block's name in its header and the anchor on
    # the card itself, so the block owns an anchor whether or not the include
    # asked for a heading.
    if statblock_re.search(PAGES[b["file"]]["body"]):
        b["anchor"] = hugo_anchor(b["title"])
        continue
    line = inc["line"]
    above = [h for h in PAGES[host]["headings"] if h["line"] < line]
    b["anchor"] = above[-1]["anchor"] if above else (hs[0]["anchor"] if hs else None)

# ------------------------------------------------------- anchor resolution ---
PAGE_BLOCK = {b["file"]: bid for bid, b in blocks.items() if b["home"] == "page"}
ANCHORS = {}
for dp in DOCS:
    m = {}
    for h in PAGES[dp]["headings"]:
        m.setdefault(h["anchor"], PAGE_BLOCK.get(dp))
    # An include carrying a level renders the block's title as a heading on this
    # page, so that anchor exists even though it is nowhere in the markdown.
    # Without this, every link to such a heading resolves to nothing.
    for inc in PAGES[dp]["includes"]:
        sid = SNIPPETS.get("content" + norm_target(inc["target"]) + ".md")
        if sid and inc.get("level") and inc.get("show") != "false":
            m.setdefault(hugo_anchor(blocks[sid]["title"]) if sid in blocks else "", sid)
    # blockdetails carries the anchor on its <details> once the block no longer
    # has a heading of its own.
    for bid2 in blockdetails_ids(dp):
        if bid2 in blocks and not blocks[bid2].get("owns_heading"):
            m.setdefault(hugo_anchor(blocks[bid2]["title"]), bid2)
    for sid in includes_of(dp):
        for h in PAGES["content/snippets/" + sid + ".md"]["headings"]:
            if m.get(h["anchor"]) is None:
                m[h["anchor"]] = sid
    # catalog-generated rows create anchors owned by the listed blocks
    for cid in catalog_ids(dp):
        if cid in blocks and blocks[cid]["anchor"]:
            m.setdefault(blocks[cid]["anchor"], cid)
    ANCHORS[dp] = m

HOSTS = collections.defaultdict(list)
for dp in DOCS:
    for sid in includes_of(dp):
        HOSTS[sid].append(dp)

MENTION_PREFIX = ("http://", "https://", "mailto:", "/digitalcharactersheet",
                  "/attributeconverter", "/planetnamegenerator", "/pdfs/", "/images/")
MENTION_PAGES = {"/docs/downloads/", "/docs/roadmap/", "/docs/legal/",
                 "/docs/contributors/", "/docs/appinstall/", "/docs/free-srd/", "/docs/"}
FEATURE_NS = ("abilities/", "proficiencies/", "traits/")
EQUIP_NS = ("generic-equipment/", "sci-fi-equipment/", "components/", "equipment/")

# implicit dependencies: real rule couplings with no link in the prose.
IMPLICIT = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                       "implicit-edges.json")))


def source_of(path):
    if path.startswith("content/snippets/"):
        return SNIPPETS.get(path)
    return PAGE_BLOCK.get(path) or f"page:{url_for(path)}"


edges = []
for path, P in PAGES.items():
    if path == "content/snippets/_index.md":
        continue
    src = source_of(path)
    hosts = [path] if not path.startswith("content/snippets/") else HOSTS.get(SNIPPETS.get(path, ""), [])
    for lk in P["links"]:
        url = lk["url"]
        e = {"source": src, "target": None, "type": "reference",
             "url": url, "text": lk["text"], "file": path, "line": lk["line"]}
        if url.startswith(MENTION_PREFIX):
            e.update(target=f"external:{url}", type="mention")
            edges.append(e)
            continue
        pathpart, frag = (url.split("#", 1) + [None])[:2] if "#" in url else (url, None)
        tpage = None
        if pathpart == "":
            for hp in hosts:
                if frag in ANCHORS.get(hp, {}):
                    tgt = ANCHORS[hp][frag] or f"page:{url_for(hp)}#{frag}"
                    e["target"] = tgt
                    break
            if e["target"] is None:
                e.update(target=f"unresolved:{url}")
                e["class"] = "broken-anchor"
                edges.append(e)
                continue
        else:
            if not pathpart.startswith("/"):
                pathpart = (url_for(path) + pathpart) if not path.startswith("content/snippets/") else "/" + pathpart
            if not pathpart.endswith("/"):
                pathpart += "/"
            if pathpart in MENTION_PAGES:
                e.update(target=f"page:{pathpart}", type="mention")
                edges.append(e)
                continue
            tpage = PAGE_BY_URL.get(pathpart)
            if tpage is None:
                e.update(target=f"unresolved:{url}")
                e["class"] = "known-broken"
                e["note"] = "intentionally left broken (tool-kits page planned); flagged for Phase 3"
                edges.append(e)
                continue
            if frag:
                if frag not in ANCHORS[tpage]:
                    e.update(target=f"unresolved:{url}")
                    e["class"] = "broken-anchor"
                    edges.append(e)
                    continue
                e["target"] = ANCHORS[tpage][frag] or f"page:{url_for(tpage)}#{frag}"
            else:
                e["target"] = PAGE_BLOCK.get(tpage, f"page:{url_for(tpage)}")
        # ---- edge typing (rulings from the Phase 1 queues) ----
        pair = (e["source"], e["target"])
        raw_line = open(os.path.join(REPO, path)).read().split("\n")[lk["line"] - 1].strip()
        if pair in (("traits/particularly-attractive", "traits/unremarkable"),
                    ("traits/unremarkable", "traits/particularly-attractive")):
            e.update(type="mention")
            e["class"] = "exclusivity"
            e["note"] = "ruled inert: gameplay-level exclusivity, no builder semantics"
        elif (str(e["source"]).startswith(FEATURE_NS) and str(e["target"]).startswith(FEATURE_NS)
              and raw_line.startswith("*") and not raw_line.startswith("**") and raw_line.endswith("*")):
            e.update(type="dependency")
            e["class"] = "prerequisite"
        elif str(e["source"]).startswith(EQUIP_NS) and str(e["target"]).startswith("item-tags/"):
            e["class"] = "tag-definition"
        edges.append(e)
    for inc in P["includes"]:
        sid = SNIPPETS.get("content" + norm_target(inc["target"]) + ".md")
        edges.append({"source": src, "target": sid or f"unresolved:{inc['target']}",
                      "type": "include", "url": inc["target"], "text": None,
                      "file": path, "line": inc["line"]})
    # A property-filtered {{< catalog ... />}} row is a link, not a placement, so
    # it is a reference edge. Without this a hub built entirely from generated
    # tables would look unconnected to everything it points at.
    if path in DOCS:
        for cid in catalog_prop_ids(path, blocks):
            if cid in blocks:
                edges.append({"source": src, "target": cid, "type": "reference",
                              "class": "catalog", "url": None,
                              "text": blocks[cid]["title"], "file": path, "line": None})
        # {{< children >}} renders the links a section index used to hand-write.
        for cp in children_of(path):
            tgt = PAGE_BLOCK.get(cp, f"page:{url_for(cp)}")
            edges.append({"source": src, "target": tgt, "type": "reference",
                          "class": "section-index", "url": url_for(cp),
                          "text": PAGES[cp]["fm"].get("title"), "file": path,
                          "line": None})

for ie in IMPLICIT:
    edges.append({"source": ie["source"], "target": ie["target"], "type": "reference",
                  "class": ie.get("class", "mechanism"), "url": None, "text": None,
                  "file": None, "line": None, "note": ie.get("note", "")})

# requires + reference rating
for e in edges:
    if e["type"] == "dependency" and e["source"] in blocks:
        blocks[e["source"]].setdefault("requires", [])
        if e["target"] not in blocks[e["source"]]["requires"]:
            blocks[e["source"]]["requires"].append(e["target"])
indeg = collections.Counter(e["target"] for e in edges
                            if e["target"] in blocks and not str(e["source"]).startswith("page:"))
for bid, b in blocks.items():
    b["in_degree"] = indeg[bid]   # computed; `reference` stays the authored frontmatter value
    # canonical link to where this block is read on the site
    if b["source_page"]:
        b["url"] = url_for(b["source_page"]) + (
            f"#{b['anchor']}" if b["home"] == "snippet" and b["anchor"] else "")
    else:
        b["url"] = None

ORDER = ["id", "title", "home", "file", "source_page", "pages", "page_urls", "anchor", "url", "owns_heading", "listed_under", "category", "type",
         "in_degree", "tags", "flags", "notes", "selectable", "wip",
         "summary", "label", "requires", "variant_group", "excluded"]
out_blocks = [{k: b[k] for k in ORDER if k in b} for _, b in sorted(blocks.items())]

# ------------------------------------------------------------------ pages ---
# The PDF builder offers whole pages as ready-made chunks, so it needs each
# page's blocks IN THE ORDER THEY ARE READ. blocks.json cannot answer that: it
# is keyed by block and its `pages` list says *which* pages, not *where* on
# them. `includes_of` already walks a page in document order, so record it here
# rather than making the builder guess.
out_pages = []
for dp in sorted(DOCS):
    P = PAGES[dp]
    fm = P["fm"]
    if fm.get("draft"):
        continue
    ids = [s for s in includes_of(dp) + blockset_ids(dp, blocks) if s in blocks]
    # a page-as-block is its own single item
    own = [b["id"] for b in blocks.values() if b["home"] == "page" and b["file"] == dp]
    ids = own + [i for i in ids if i not in own]
    if not ids:
        continue
    out_pages.append({
        "url": url_for(dp),
        "title": fm.get("title") or "",
        "file": dp,
        "section": "/".join(dp.split("/")[3:-1]) or "",
        "weight": fm.get("weight"),
        "wip": bool(fm.get("wip")),
        "blocks": ids,
    })


# ------------------------------------------------------------------ write ---
def dump(o):
    return json.dumps(o, indent=1, ensure_ascii=False)


bp, ep = os.path.join(REPO, "data/blocks.json"), os.path.join(REPO, "data/edges.json")
pp = os.path.join(REPO, "data/pages.json")

if "--check" in sys.argv:
    stale = []
    for p, new in ((bp, out_blocks), (ep, edges), (pp, out_pages)):
        cur = json.load(open(p)) if os.path.exists(p) else None
        if cur != json.loads(dump(new)):
            stale.append(os.path.basename(p))
    if stale:
        print(f"STALE: {', '.join(stale)} — run: python3 _discovery/tools/builddata.py")
        sys.exit(1)
    print(f"data/ is current ({len(out_blocks)} blocks, {len(edges)} edges)")
    sys.exit(0)

os.makedirs(os.path.join(REPO, "data"), exist_ok=True)
open(bp, "w").write(dump(out_blocks) + "\n")
open(ep, "w").write(dump(edges) + "\n")
open(pp, "w").write(dump(out_pages) + "\n")
types = collections.Counter(e["type"] for e in edges)
unres = [e for e in edges if str(e["target"]).startswith("unresolved:")]
print(f"wrote data/blocks.json ({len(out_blocks)} blocks) and data/edges.json ({len(edges)} edges)")
print(f"  edge types: {dict(types)}")
print(f"  unresolved: {len(unres)}" + (f" -> {[e['url'] for e in unres]}" if unres else ""))

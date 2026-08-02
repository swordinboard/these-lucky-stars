#!/usr/bin/env python3
"""Harvest per-block summaries; summary column chosen by table HEADER
(Description/Notes/Effect Summary/Effect), else last column. Reads tables in
shell pages and in snippets, resolves anchors on host pages."""
import json, os, re, collections
SB=os.path.dirname(os.path.abspath(__file__)); REPO="/home/user/these-lucky-stars"
RAW=json.load(open(SB+"/raw.json")); BLOCKS=json.load(open(REPO+"/data/blocks.json"))
by_id={b["id"]:b for b in BLOCKS}
SNIP_BY_PATH={p:p[len("content/snippets/"):-3] for p in RAW if p.startswith("content/snippets/") and not p.endswith("_index.md")}
def url_for(path):
    p=path[len("content"):]; return p[:-len("_index.md")] if p.endswith("/_index.md") else p[:-3]+"/"
PAGE_BLOCK={b["file"]:b["id"] for b in BLOCKS if b["home"]=="page"}
inc_norm=lambda t:(t if t.startswith("/") else "/"+t)[:-3] if t.endswith(".md") else (t if t.startswith("/") else "/"+t)
def includes_of(path,seen=None):
    seen=seen if seen is not None else set(); out=[]
    for inc in RAW[path]["includes"]:
        sp="content"+inc_norm(inc["target"])+".md"; sid=SNIP_BY_PATH.get(sp)
        if sid and sid not in seen: seen.add(sid); out.append(sid); out+=includes_of(sp,seen)
    return out
HOSTS=collections.defaultdict(list); DOC=[p for p in RAW if not p.startswith("content/snippets/")]
for dp in DOC:
    for sid in includes_of(dp): HOSTS[sid].append(dp)
PAGE_ANCHOR_BLOCK={}
for path in DOC:
    m={}
    for h in RAW[path]["headings"]: m.setdefault(h["anchor"],PAGE_BLOCK.get(path))
    for sid in includes_of(path):
        for h in RAW["content/snippets/"+sid+".md"]["headings"]:
            if m.get(h["anchor"]) is None: m[h["anchor"]]=sid
    PAGE_ANCHOR_BLOCK[path]=m
anchor_re=re.compile(r"\(#([^)]+)\)")
SUMMARY_HEADERS=["description","effect summary","effect","notes","summary"]
def clean(t):
    t=re.sub(r"\[([^\]]*)\]\([^)]*\)",r"\1",t); return re.sub(r"\s+"," ",t).strip().strip("*").strip()
def rowcells(s): return [c.strip() for c in s.strip().strip("|").split("|")]
def hosts_for(path):
    if not path.startswith("content/snippets/"): return [path]
    return HOSTS.get(SNIP_BY_PATH.get(path,""),[])
harvested={}; unresolved=collections.defaultdict(list)
for path in sorted(RAW):
    if path.endswith("_index.md"): continue
    hp=hosts_for(path)
    if not hp: continue
    lines=open(os.path.join(REPO,path)).read().split("\n")
    # group tables
    i=0; N=len(lines)
    while i<N:
        s=lines[i].strip()
        if s.startswith("|"):
            grp=[]
            while i<N and lines[i].strip().startswith("|"): grp.append(lines[i].strip()); i+=1
            if len(grp)<2: continue
            header=[c.lower() for c in rowcells(grp[0])]
            col=None
            for h in SUMMARY_HEADERS:
                if h in header: col=header.index(h); break
            for row in grp[2:]:
                cells=rowcells(row)
                if len(cells)<2 or set("".join(cells))<=set("-: "): continue
                am=anchor_re.search(cells[0])
                if not am: continue
                anchor=am.group(1)
                c = col if (col is not None and col < len(cells)) else len(cells)-1
                summ=clean(cells[c])
                if not summ: continue
                bid=None
                for host in hp:
                    if PAGE_ANCHOR_BLOCK[host].get(anchor): bid=PAGE_ANCHOR_BLOCK[host][anchor]; break
                if not bid or bid not in by_id: unresolved[path].append((clean(cells[0]),anchor)); continue
                if by_id[bid]["home"]=="page": continue
                harvested.setdefault(bid,summ)
        else: i+=1
def yq(s): return '"'+s.replace('\\','\\\\').replace('"','\\"')+'"'
w=0
for bid,summ in harvested.items():
    f=os.path.join(REPO,by_id[bid]["file"]); txt=open(f).read(); end=txt.index("\n---",3)
    hl=[l for l in txt[:end].split("\n") if not l.startswith("summary:")]; out=[]; ins=False
    for l in hl:
        out.append(l)
        if l.startswith("tags:") and not ins: out.append("summary: "+yq(summ)); ins=True
    if not ins: out.append("summary: "+yq(summ))
    open(f,"w").write("\n".join(out)+txt[end:]); w+=1
json.dump({k:harvested[k] for k in sorted(harvested)},open(SB+"/harvested.json","w"),indent=1)
miss=[b["id"] for b in BLOCKS if b["home"]=="snippet" and b["id"] not in harvested and b.get("type") in ("feature","equipment") and not b.get("excluded")]
print(f"summaries written: {w}   catalog missing: {len(miss)} {miss}")
print("unresolved rows:", dict(unresolved) or "none")

# sync summaries into data/blocks.json (frontmatter is source of truth)
data=json.load(open(REPO+"/data/blocks.json"))
for blk in data:
    if blk["id"] in harvested: blk["summary"]=harvested[blk["id"]]
json.dump(data,open(REPO+"/data/blocks.json","w"),indent=1)
print("data/blocks.json summaries:", sum(1 for x in data if x.get("summary")))

#!/usr/bin/env python3
"""Convert multi-column catalog tables to the 2-column catalog shortcode,
dropping the extra columns (their data lives in each item's own entry).
Host-aware anchor resolution so tables inside snippets work too."""
import json, os, re, sys, collections
SB=os.path.dirname(os.path.abspath(__file__)); REPO="/home/user/these-lucky-stars"
RAW=json.load(open(SB+"/raw.json")); BLOCKS=json.load(open(REPO+"/data/blocks.json"))
by_id={b["id"]:b for b in BLOCKS}
SNIP_BY_PATH={p:p[len("content/snippets/"):-3] for p in RAW if p.startswith("content/snippets/") and not p.endswith("_index.md")}
PAGE_BLOCK={b["file"]:b["id"] for b in BLOCKS if b["home"]=="page"}
inc_norm=lambda t:(t if t.startswith("/") else "/"+t)[:-3] if t.endswith(".md") else (t if t.startswith("/") else "/"+t)
def includes_of(path,seen=None):
    seen=seen if seen is not None else set(); out=[]
    for inc in RAW[path]["includes"]:
        sp="content"+inc_norm(inc["target"])+".md"; sid=SNIP_BY_PATH.get(sp)
        if sid and sid not in seen: seen.add(sid); out.append(sid); out+=includes_of(sp,seen)
    return out
DOC=[p for p in RAW if not p.startswith("content/snippets/")]
HOSTS=collections.defaultdict(list)
for dp in DOC:
    for sid in includes_of(dp): HOSTS[sid].append(dp)
def anchor_map(path):
    m={}
    for h in RAW[path]["headings"]: m.setdefault(h["anchor"],PAGE_BLOCK.get(path))
    for sid in includes_of(path):
        for h in RAW["content/snippets/"+sid+".md"]["headings"]:
            if m.get(h["anchor"]) is None: m[h["anchor"]]=sid
    return m
def maps_for(path):
    if not path.startswith("content/snippets/"): return [anchor_map(path)]
    return [anchor_map(h) for h in HOSTS.get(SNIP_BY_PATH.get(path,""),[])]
anchor_re=re.compile(r"\(#([^)]+)\)")
SUMMARY_HEADERS=["notes","description","summary","effect summary","effect"]
LABELS={}
def set_label(bid,label):
    LABELS[bid]=label
    p=os.path.join(REPO,by_id[bid]["file"]); t=open(p).read(); e=t.index("\n---",3)
    hl=[l for l in t[:e].split("\n") if not l.startswith("label:")]; o=[]; ins=False
    for l in hl:
        o.append(l)
        if l.startswith("title:") and not ins: o.append('label: "%s"'%label.replace('"','\\"')); ins=True
    open(p,"w").write("\n".join(o)+t[e:])
for page in sys.argv[1:]:
    full=os.path.join(REPO,page); lines=open(full).read().split("\n"); ams=maps_for(page)
    out=[]; i=0; N=len(lines); conv=0
    while i<N:
        if lines[i].strip().startswith("|"):
            grp=[]; j=i
            while j<N and lines[j].strip().startswith("|"): grp.append(lines[j].strip()); j+=1
            hdr=[c.strip() for c in grp[0].strip("|").split("|")]
            body=[r for r in grp[2:] if not set(r.replace("|","").replace(" ",""))<=set("-:")]
            scol=next((hdr.index(h) for h in hdr if h.lower() in SUMMARY_HEADERS), None)
            linked=[r for r in body if anchor_re.search(r.split("|")[1] if len(r.split("|"))>1 else "")]
            if len(hdr)>2 and scol is not None and body and len(linked)==len(body):
                ids=[]; ok=True
                for r in body:
                    c=[x.strip() for x in r.strip("|").split("|")]
                    am2=anchor_re.search(c[0]); bid=None
                    if am2:
                        for m in ams:
                            if m.get(am2.group(1)): bid=m[am2.group(1)]; break
                    if not bid: ok=False; break
                    dm=re.match(r"^\s*\[(.*)\]\(#",c[0]); disp=dm.group(1).strip() if dm else ""
                    if bid in by_id and disp and disp!=by_id[bid]["title"]: set_label(bid,disp)
                    ids.append(bid)
                if ok:
                    out.append('{{< catalog header="%s|%s" >}}'%(hdr[0],hdr[scol]))
                    out.extend(ids); out.append('{{< /catalog >}}')
                    print(f"  {page}: dropped columns {[h for k,h in enumerate(hdr) if k not in (0,scol)]}")
                    conv+=1; i=j; continue
            out.extend(lines[i:j]); i=j; continue
        out.append(lines[i]); i+=1
    open(full,"w").write("\n".join(out))
    print(f"{page}: {conv} table(s) -> catalog")
if LABELS:
    d=json.load(open(REPO+"/data/blocks.json"))
    for b in d:
        if b["id"] in LABELS: b["label"]=LABELS[b["id"]]
    json.dump(d,open(REPO+"/data/blocks.json","w"),indent=1)
    print("labels captured:",LABELS)

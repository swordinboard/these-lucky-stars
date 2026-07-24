#!/usr/bin/env python3
"""Convert 2-column catalog tables (Name/Notes + link in col0) into
{{< catalog >}} shortcode calls. Rows -> block-ID list (indent preserved),
derived from the existing rows so order/hierarchy are exact. Multi-column
tables (kits/components) are skipped and reported."""
import json, os, re, sys, collections
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
def anchor_map(path):
    m={}
    for h in RAW[path]["headings"]: m.setdefault(h["anchor"],PAGE_BLOCK.get(path))
    for sid in includes_of(path):
        for h in RAW["content/snippets/"+sid+".md"]["headings"]:
            if m.get(h["anchor"]) is None: m[h["anchor"]]=sid
    return m
anchor_re=re.compile(r"\(#([^)]+)\)")
LABELS={}
def set_label(bid,label):
    LABELS[bid]=label
    p=os.path.join(REPO,by_id[bid]["file"]); txt=open(p).read(); end=txt.index("\n---",3)
    hl=[l for l in txt[:end].split("\n") if not l.startswith("label:")]; out=[]; ins=False
    for l in hl:
        out.append(l)
        if l.startswith("title:") and not ins: out.append('label: "%s"'%label.replace('"','\\"')); ins=True
    open(p,"w").write("\n".join(out)+txt[end:])
pages=sys.argv[1:]
skipped=[]
for page in pages:
    full=os.path.join(REPO,page); lines=open(full).read().split("\n"); am=anchor_map(page)
    out=[]; i=0; N=len(lines); converted=0
    while i<N:
        s=lines[i].strip()
        if s.startswith("|"):
            grp=[]; j=i
            while j<N and lines[j].strip().startswith("|"): grp.append(lines[j].strip()); j+=1
            cells0=[c.strip() for c in grp[0].strip("|").split("|")]
            ncol=len(cells0)
            body=[r for r in grp[2:] if not set(r.replace("|","").replace(" ",""))<=set("-:")]
            linked=[r for r in body if anchor_re.search(r.split("|")[1] if len(r.split("|"))>1 else "")]
            if ncol==2 and linked and len(linked)==len(body):
                header="|".join(cells0)
                ids=[]
                ok=True
                for r in body:
                    c=[x.strip() for x in r.strip("|").split("|")]
                    pre=""
                    m0=c[0]
                    mm=re.match(r"^(-+)\s+",m0)
                    if mm: pre="- " if len(mm.group(1))==1 else "-- "; 
                    am2=anchor_re.search(c[0])
                    bid=am.get(am2.group(1)) if am2 else None
                    if not bid: ok=False; break
                    dm=re.match(r"^\s*(?:-+\s+)?\[(.*)\]\(#",c[0])
                    disp=(dm.group(1).strip() if dm else "")
                    if bid in by_id and disp and disp!=by_id[bid]["title"]:
                        set_label(bid, disp)
                    ids.append(pre+bid)
                if ok:
                    out.append('{{< catalog header="%s" >}}'%header)
                    out.extend(ids)
                    out.append('{{< /catalog >}}')
                    converted+=1; i=j; continue
            else:
                if ncol>2: skipped.append((page,ncol,cells0))
            out.extend(lines[i:j]); i=j; continue
        out.append(lines[i]); i+=1
    open(full,"w").write("\n".join(out))
    print(f"{page}: {converted} tables -> catalog")
if skipped:
    print("\nSKIPPED multi-column tables (need extra frontmatter fields):")
    for p,n,h in skipped: print(f"   {p}  ({n} cols: {h})")
# mirror labels into data/blocks.json
if LABELS:
    data=json.load(open(REPO+"/data/blocks.json"))
    for blk in data:
        if blk["id"] in LABELS: blk["label"]=LABELS[blk["id"]]
    json.dump(data,open(REPO+"/data/blocks.json","w"),indent=1)
    print("labels captured:",len(LABELS))

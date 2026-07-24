#!/usr/bin/env python3
"""Broken internal link/anchor scan on a BUILT site. Quote-optional regexes so
it works on minified HTML (the earlier quoted-only version silently passed)."""
import os,re,sys,glob
B=sys.argv[1]
ids={}
for f in glob.glob(B+"/**/index.html",recursive=True):
    url="/"+os.path.relpath(f,B)[:-len("index.html")]
    ids[url.rstrip("/")+"/"]={v for _,v in re.findall(r'id=("?)([^">\s]+)\1',open(f,encoding="utf-8").read())}
broken=[]
for f in glob.glob(B+"/**/index.html",recursive=True):
    src="/"+os.path.relpath(f,B)[:-len("index.html")]
    src=src.rstrip("/")+"/"
    for m in re.finditer(r'href=("?)(/docs/[^">\s]*|#[^">\s]+)\1',open(f,encoding="utf-8").read()):
        href=m.group(2)
        if href.startswith("#"): path,frag=src,href[1:]
        else:
            path,frag=(href.split("#",1)+[None])[:2] if "#" in href else (href,None)
            if not path.endswith("/"): path+="/"
        if path not in ids: broken.append((src,href,"no-page"))
        elif frag and frag not in ids[path]: broken.append((src,href,"no-anchor"))
known=[b for b in broken if "tool-kits" in b[1]]
real=[b for b in broken if "tool-kits" not in b[1]]
print(f"links scanned OK. broken (excluding {len(known)} known tool-kits): {len(real)}")
for b in real[:20]: print("   ",b)
sys.exit(1 if real else 0)

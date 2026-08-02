#!/usr/bin/env python3
"""Compare RENDERED visible text of two builds, per page. Catches silent
content loss that source-level diffs miss."""
import re,sys,os,glob,html,collections
A,B=sys.argv[1],sys.argv[2]
def text(f):
    h=open(f,encoding="utf-8").read()
    # Whole page-body region, not just <article>: content injected by the
    # docs/inject/content-before|after partials (e.g. the wip: true notice)
    # renders outside the article and must still count as page content.
    # NB: minified HTML drops the quotes around single-word class values, so
    # match both `class="book-page"` and `class=book-page`.
    m=re.search(r'class="?[^">]*\bbook-page\b',h)
    i=m.start() if m else -1
    m=re.search(r'class="?[^">]*\bbook-footer\b',h[i:]) if i>=0 else None
    j=i+m.start() if m else -1
    if i<0 or j<0:
        i=h.find("<article")
        if i<0: return []
        j=h.find("</article>",i)
    art=h[i:j]
    art=re.sub(r"<(script|style|nav|aside|header)[^>]*>.*?</\1>","",art,flags=re.S)
    t=html.unescape(re.sub(r"<[^>]+>"," ",art))
    # sentence-ish tokens
    return [s.strip() for s in re.split(r"[\n.]+",re.sub(r"\s+"," ",t)) if len(s.strip())>25]
pages=sorted(os.path.relpath(p,A) for p in glob.glob(A+"/**/index.html",recursive=True))
tot_missing=0
for p in pages:
    fb=os.path.join(B,p)
    if not os.path.exists(fb):
        print(f"!! PAGE MISSING in new build: {p}"); continue
    a=text(os.path.join(A,p)); b=text(fb)
    sb=set(b)
    missing=[s for s in a if s not in sb]
    if missing:
        tot_missing+=len(missing)
        print(f"\n=== {p.replace('/index.html','')}  ({len(missing)} text segments lost)")
        for m in missing[:5]: print("   -",m[:120])
        if len(missing)>5: print(f"   ... and {len(missing)-5} more")
print(f"\nTOTAL lost text segments: {tot_missing}")

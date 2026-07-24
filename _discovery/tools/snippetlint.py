#!/usr/bin/env python3
"""Guard: a trailing HTML comment in a snippet swallows page content after the
{{% include %}} (silently). Fail if any snippet ends with an HTML comment."""
import glob,re,sys
bad=[]
for f in glob.glob("content/snippets/**/*.md",recursive=True):
    s=open(f).read()
    body=s[s.index("\n---",3)+4:] if s.startswith("---") else s
    body=body.strip()
    if body.endswith("-->") or re.search(r"<!--(?:(?!-->).)*$",body,flags=re.S):
        bad.append(f)
print("snippets ending in an HTML comment (would swallow following page content):",len(bad))
for b in bad: print("   ",b)
sys.exit(1 if bad else 0)

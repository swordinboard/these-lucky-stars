#!/usr/bin/env python3
"""No-loss verification: compose pages (recursively resolving includes) for the
working tree and for a baseline commit; diff normalized text per page.
Usage: verify.py <baseline-commit>"""
import os, re, subprocess, sys, difflib

REPO = "/home/user/these-lucky-stars"
BASE = sys.argv[1] if len(sys.argv) > 1 else "a38a406"
inc_re = re.compile(r'\{\{[<%]\s*include\s+"([^"]+)"\s*[<%]?\}\}')
comment_re = re.compile(r"<!--.*?-->", re.S)

def read_tree(path):
    p = os.path.join(REPO, path)
    return open(p).read() if os.path.exists(p) else None

def read_base(path):
    r = subprocess.run(["git", "-C", REPO, "show", f"{BASE}:{path}"],
                       capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None

def strip_fm(s):
    if s.startswith("---"):
        end = s.find("\n---", 3)
        if end != -1:
            return s[end + 4:]
    return s

def compose(path, reader, depth=0):
    s = reader(path)
    if s is None:
        return f"<<MISSING {path}>>"
    s = strip_fm(s)
    if depth > 6:
        return s
    def repl(m):
        t = m.group(1)
        t = t if t.startswith("/") else "/" + t
        t = t[:-3] if t.endswith(".md") else t
        return compose("content" + t + ".md", reader, depth + 1)
    return inc_re.sub(repl, s)

def norm(s):
    s = comment_re.sub("", s)
    lines = [re.sub(r"\s+", " ", l).strip() for l in s.split("\n")]
    return [l for l in lines if l]

# page list from baseline (docs pages only; snippets are composed in)
r = subprocess.run(["git", "-C", REPO, "ls-tree", "-r", "--name-only", BASE, "content/docs", "content/_index.md"],
                   capture_output=True, text=True)
pages = [p for p in r.stdout.split("\n") if p.endswith(".md")]

total_diff = 0
for page in pages:
    a = norm(compose(page, read_base))
    b = norm(compose(page, read_tree))
    if a == b:
        continue
    d = list(difflib.unified_diff(a, b, lineterm="", n=0))
    changed = [l for l in d if l.startswith(("+", "-")) and not l.startswith(("+++", "---"))]
    total_diff += len(changed)
    print(f"\n=== {page} ({len(changed)} changed lines)")
    for l in d[2:]:
        print(" ", l[:170])
print(f"\nTOTAL changed lines: {total_diff}")

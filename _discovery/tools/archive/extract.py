#!/usr/bin/env python3
"""Discovery-pass extractor for These Lucky Stars.
Reads content/*.md, emits raw structural JSON: headings (with Hugo anchors),
details blocks (with tab + section context), includes, links.
Writes ONLY to scratchpad.
"""
import json, os, re, sys

ROOT = "/home/user/these-lucky-stars/content"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "raw.json")

def hugo_anchor(text):
    # goldmark autoHeadingID: lowercase, strip markdown/punct, spaces->-
    t = text.strip()
    # strip inline markdown emphasis/brackets
    t = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", t)
    t = re.sub(r"[*\x60]", "", t)  # strip *, backtick emphasis; keep _ (goldmark keeps it)
    t = t.lower()
    out = []
    for ch in t:
        if ch.isalnum():
            out.append(ch)
        elif ch == "_":
            out.append(ch)
        elif ch in (" ", "-", "\t"):
            out.append("-")
        # else drop (&, /, (, ), ., ,, ', +, etc.)
    a = "".join(out)
    return a

heading_re = re.compile(r"^(#{1,6})\s+(.*)$")
details_open_re = re.compile(r'\{\{%\s*details\s+"([^"]+)"')
details_close_re = re.compile(r"\{\{%\s*/details\s*%\}\}")
tab_open_re = re.compile(r'\{\{%\s*tab\s+"([^"]+)"')
tab_close_re = re.compile(r"\{\{%\s*/tab\s*%\}\}")
include_re = re.compile(r'\{\{[<%]\s*include\s+"([^"]+)"')
link_re = re.compile(r"\[([^\]]*)\]\(([^)\s]+)\)")
fm_title_re = re.compile(r'^title:\s*["\']?(.*?)["\']?\s*$')

pages = {}
for dirpath, dirs, files in os.walk(ROOT):
    for fn in sorted(files):
        if not fn.endswith(".md"):
            continue
        path = os.path.join(dirpath, fn)
        rel = os.path.relpath(path, "/home/user/these-lucky-stars")
        with open(path) as f:
            lines = f.read().split("\n")
        # frontmatter
        title, draft, headless = None, False, False
        if lines and lines[0].strip() in ("---", "+++"):
            for i in range(1, min(len(lines), 40)):
                s = lines[i].strip()
                if s in ("---", "+++"):
                    break
                m = fm_title_re.match(lines[i])
                if m:
                    title = m.group(1)
                if s.startswith("draft") and "true" in s:
                    draft = True
                if s.startswith("headless") and "true" in s:
                    headless = True
        headings, detailss, includes, links = [], [], [], []
        anchor_counts = {}
        cur_tab = None
        det_stack = []
        cur_heading = None
        for i, line in enumerate(lines, 1):
            m = heading_re.match(line)
            if m:
                level, text = len(m.group(1)), m.group(2).strip()
                a = hugo_anchor(text)
                if a in anchor_counts:
                    anchor_counts[a] += 1
                    a = f"{a}-{anchor_counts[a]}"
                else:
                    anchor_counts[a] = 0
                h = {"line": i, "level": level, "text": text, "anchor": a,
                     "tab": cur_tab, "in_details": det_stack[-1]["title"] if det_stack else None}
                headings.append(h)
                cur_heading = h
            m = tab_open_re.search(line)
            if m:
                cur_tab = m.group(1)
            if tab_close_re.search(line):
                cur_tab = None
            m = details_open_re.search(line)
            if m:
                det_stack.append({"title": m.group(1), "start": i, "tab": cur_tab,
                                  "section": cur_heading["text"] if cur_heading else None,
                                  "section_anchor": cur_heading["anchor"] if cur_heading else None,
                                  "section_level": cur_heading["level"] if cur_heading else None})
            if details_close_re.search(line):
                if det_stack:
                    d = det_stack.pop()
                    d["end"] = i
                    detailss.append(d)
            for m in include_re.finditer(line):
                includes.append({"line": i, "target": m.group(1),
                                 "heading": cur_heading["anchor"] if cur_heading else None,
                                 "in_details": det_stack[-1]["title"] if det_stack else None})
            for m in link_re.finditer(line):
                links.append({"line": i, "text": m.group(1), "url": m.group(2),
                              "heading": cur_heading["anchor"] if cur_heading else None,
                              "in_details": det_stack[-1]["title"] if det_stack else None})
        # sort details by document order
        detailss.sort(key=lambda d: d["start"])
        pages[rel] = {"title": title, "draft": draft, "headless": headless,
                      "n_lines": len(lines), "headings": headings, "details": detailss,
                      "includes": includes, "links": links}

with open(OUT, "w") as f:
    json.dump(pages, f, indent=1)
n_det = sum(len(p["details"]) for p in pages.values())
n_lnk = sum(len(p["links"]) for p in pages.values())
n_inc = sum(len(p["includes"]) for p in pages.values())
print(f"pages={len(pages)} details={n_det} links={n_lnk} includes={n_inc}")
print("unclosed details:", [(k, d) for k, p in pages.items() for d in []])

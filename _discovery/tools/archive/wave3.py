#!/usr/bin/env python3
"""Wave 3: extract blocks to snippet files, replace with includes.
Uses out2/blocks.json spans (fresh against current tree). Verbatim moves only,
plus the two allowlisted replacements (stats wounds pointer handled here)."""
import json, os, re, sys, collections

SB = os.path.dirname(os.path.abspath(__file__))
REPO = "/home/user/these-lucky-stars"
blocks = json.load(open(os.path.join(SB, "out2/blocks.json")))

details_open_re = re.compile(r'\{\{%\s*details\s+"([^"]+)"')
details_close_re = re.compile(r"\{\{%\s*/details\s*%\}\}")
tabs_open_re = re.compile(r"\{\{[<%]\s*tabs?\b")

GROUPS = {
 ("content/docs/free-srd/inventory--equipment/generic-equipment.md", "Pouch Sets"):
   [("gear/generic-equipment/pouch-set-ammo", "Pouch Set, Ammo"),
    ("gear/generic-equipment/pouch-set-small", "Pouch Set, Small"),
    ("gear/generic-equipment/pouch-set-standard", "Pouch Set, Standard")],
 ("content/docs/free-srd/inventory--equipment/generic-equipment.md", "Bandages"):
   [("gear/generic-equipment/bandages-large", "Bandages, Large"),
    ("gear/generic-equipment/bandages-small", "Bandages, Small")],
 ("content/docs/free-srd/inventory--equipment/sci-fi-equipment/bots--drones/components.md", "Signal Masts"):
   [("gear/components/signal-mast-retractable", "Signal Mast, Retractable"),
    ("gear/components/signal-mast-heavy", "Signal Mast, Heavy")],
}
group_block_ids = {bid for items in GROUPS.values() for bid, _ in items}

by_page = collections.defaultdict(list)
for b in blocks:
    if b["home"] == "snippet (proposed)":
        by_page[b["page"]].append(b)

def write_snippet(bid, content_lines):
    path = os.path.join(REPO, "content/snippets", bid + ".md")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    body = "\n".join(content_lines).strip("\n")
    with open(path, "w") as f:
        f.write("---\nheadless: true\n---\n\n" + body + "\n")

n_snips = 0
for page, pbs in sorted(by_page.items()):
    full = os.path.join(REPO, page)
    lines = open(full).read().split("\n")
    ops = []  # (start_idx0, end_idx0 inclusive, replacement_lines)

    # group splits: one op per group
    done_groups = set()
    for (gpage, gtitle), items in GROUPS.items():
        if gpage != page:
            continue
        # locate the group details open/close
        open_i = next(i for i, l in enumerate(lines)
                      if details_open_re.search(l) and f'"{gtitle}"' in l)
        close_i = open_i
        depth = 0
        for i in range(open_i, len(lines)):
            if details_open_re.search(lines[i]):
                depth += 1
            if details_close_re.search(lines[i]):
                depth -= 1
                if depth == 0:
                    close_i = i
                    break
        # item spans from blocks.json (h3 line .. end), 1-indexed
        repl = []
        for bid, dtitle in items:
            b = next(x for x in blocks if x["id"] == bid)
            s, e = b["span"]
            content = lines[s - 1:e]
            # trim trailing blanks and any stray close tag
            while content and (content[-1].strip() == "" or details_close_re.search(content[-1])):
                content.pop()
            write_snippet(bid, content)
            repl += ['{{% details "' + dtitle + '" %}}', "",
                     '{{% include "/snippets/' + bid + '" %}}', "",
                     "{{% /details %}}", ""]
        if repl and repl[-1] == "":
            repl.pop()
        ops.append((open_i, close_i, repl))
        done_groups.add((gpage, gtitle))

    for b in pbs:
        if b["id"] in group_block_ids:
            continue  # handled above
        s, e = b["span"]  # 1-indexed inclusive
        first = lines[s - 1]
        inc = '{{% include "/snippets/' + b["id"] + '" %}}'
        if details_open_re.search(first):
            # details block: keep wrapper, extract inner
            inner = lines[s:e - 1]
            while inner and inner[-1].strip() == "":
                inner.pop()
            while inner and inner[0].strip() == "":
                inner.pop(0)
            write_snippet(b["id"], inner)
            ops.append((s, e - 2, ["", inc, ""]))  # replace inner lines
        elif first.lstrip().startswith("#"):
            # section block: keep heading, extract body up to details/tabs
            body_start = s  # 0-indexed s = heading at s-1
            body_end = e - 1  # 0-indexed inclusive
            for i in range(body_start, body_end + 1):
                if details_open_re.search(lines[i]) or tabs_open_re.search(lines[i]):
                    body_end = i - 1
                    break
            body = lines[body_start:body_end + 1]
            while body and body[-1].strip() == "":
                body.pop()
            while body and body[0].strip() == "":
                body.pop(0)
            if not body:
                print("!! empty body", b["id"]); continue
            write_snippet(b["id"], body)
            # find actual extracted range within lines to replace
            # recompute: replace from body_start .. body_start+len(original slice)-1
            # we trimmed blanks at both ends; keep them on page
            lead = 0
            while lines[body_start + lead].strip() == "":
                lead += 1
            ops.append((body_start + lead, body_start + lead + len(body) - 1, [inc]))
        else:
            # bold-entry block: extract lines verbatim
            content = lines[s - 1:e]
            write_snippet(b["id"], content)
            ops.append((s - 1, e - 1, [inc]))
        n_snips += 1

    # stats page allowlisted replacement: wounds summary -> pointer
    if page.endswith("core-rules/stats.md"):
        h = next(i for i, l in enumerate(lines) if l.startswith("### Wounds & Conditions"))
        nxt = next(i for i in range(h + 1, len(lines)) if lines[i].startswith("### ") or lines[i].startswith("## "))
        # keep heading; replace body up to (not incl) next heading, minus trailing separator line
        end = nxt - 1
        keep_tail = []
        while lines[end].strip() in ("", "---"):
            keep_tail.insert(0, lines[end])
            end -= 1
        ops.append((h + 1, end, ["", "See [Wounds & Conditions](/docs/free-srd/core-rules/wounds--conditions/) for wound triggers, severities, condition effects, and recovery."]))

    # apply ops bottom-up, assert no overlap
    ops.sort(key=lambda o: o[0], reverse=True)
    prev_start = None
    for (a, z, repl) in ops:
        assert prev_start is None or z < prev_start, (page, a, z, prev_start)
        prev_start = a
        lines[a:z + 1] = repl
    open(full, "w").write("\n".join(lines))
    print(f"{page}: {len(ops)} ops")

print(f"snippets written: {n_snips + len(group_block_ids)}")

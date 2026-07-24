#!/usr/bin/env python3
"""Wave 2: move existing snippets into namespace dirs (per block IDs) and
rewrite every include to canonical /snippets/<ns>/<slug> form. Prints the
git mv commands; then rewrites includes in content/."""
import os, re, subprocess, sys

REPO = "/home/user/these-lucky-stars"

# old snippet name -> new block-id path (ns/slug)
MOVES = {
 "action-points": "stats/action-points",
 "announcement": "site/announcement",
 "wip-announcement": "site/wip-announcement",
 "armor": "equipment/armor-basics",
 "armor-damage": "objects/armor-degradation",
 "coms": "sci-fi/communications",
 "damage-dice": "combat/damage-dice",
 "defense": "stats/defense",
 "energy-shields": "sci-fi/energy-shields",
 "extreme-environments": "environment/extreme-environments",
 "grapple": "combat/grapple",
 "health-loop": "health/applying-damage",
 "huds": "sci-fi/huds",
 "initiative": "combat/initiative",
 "medical-item-medkit-note": "equipment/medkit-note",
 "move": "actions/move",
 "opportunity-attack": "combat/opportunity-attack",
 "primary-speed": "movement/primary-speed",
 "sci-fi-add-ballistic": "sci-fi/ballistics-in-space",
 "shields": "equipment/shields-basics",
 "shields-damage": "objects/shield-degradation",
 "speed-descriptors": "movement/speed-descriptors",
 "speed-tiers": "movement/speed-tiers",
 "speed-tiers-chart": "movement/speed-tiers-chart",
 "stealth": "combat/stealth",
 "step": "actions/step",
 "vitality": "stats/vitality",
}

os.chdir(REPO)
# 1. git mv
for old, new in MOVES.items():
    src = f"content/snippets/{old}.md"
    dst = f"content/snippets/{new}.md"
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    r = subprocess.run(["git", "mv", src, dst], capture_output=True, text=True)
    if r.returncode != 0:
        print("MV FAIL", src, r.stderr.strip()); sys.exit(1)
print(f"moved {len(MOVES)} snippets")

# 2. rewrite includes everywhere in content/
inc_re = re.compile(r'\{\{([<%])\s*include\s+"([^"]+)"\s*([<%])?\}\}')
def canon(target):
    t = target.strip()
    t = t[1:] if t.startswith("/") else t
    t = t[:-3] if t.endswith(".md") else t
    assert t.startswith("snippets/"), t
    name = t[len("snippets/"):]
    if name in MOVES:
        name = MOVES[name]
    return f"/snippets/{name}"

count = 0
for dirpath, dirs, files in os.walk("content"):
    for fn in files:
        if not fn.endswith(".md"):
            continue
        p = os.path.join(dirpath, fn)
        s = open(p).read()
        def repl(m):
            global count
            count += 1
            return '{{% include "' + canon(m.group(2)) + '" %}}'
        s2 = inc_re.sub(repl, s)
        if s2 != s:
            open(p, "w").write(s2)
print(f"rewrote {count} includes")
# 3. verify all include targets exist
missing = []
for dirpath, dirs, files in os.walk("content"):
    for fn in files:
        if not fn.endswith(".md"):
            continue
        p = os.path.join(dirpath, fn)
        for m in inc_re.finditer(open(p).read()):
            t = m.group(2)
            f = "content" + t + ".md"
            if not os.path.exists(f):
                missing.append((p, t))
print("missing include targets:", missing or "none")

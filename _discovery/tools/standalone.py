#!/usr/bin/env python3
"""Bundle the PDF builder into one self-contained HTML file.

The builder normally fetches /builder/blocks.json from the site. This inlines
the CSS, the JS and that data into a single page that runs with no server
behind it — for previewing the app before it is deployed, or for handing
someone a copy that works offline.

    python3 _discovery/tools/standalone.py [out.html]

Requires a built site (`hugo`), because the block HTML only exists after Hugo
has rendered it.
"""
import json
import os
import re
import sys

REPO = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
D = lambda *p: os.path.join(REPO, *p)

data = D("public/builder/blocks.json")
if not os.path.exists(data):
    sys.exit("public/builder/blocks.json not found — run hugo first.")

# Must mirror the concatenation in layouts/builder/list.html — builder.css
# alone leaves catalogs and column lists unstyled in the offline copy.
css = (open(D("assets/builder.css")).read() + "\n"
       + open(D("assets/content-constructs.css")).read())
js = open(D("assets/builder.js")).read()
blocks = open(data).read()

# The app markup lives in the Hugo layout, wrapped in template syntax. Take the
# body between the chrome markers so the two cannot drift apart.
layout = open(D("layouts/builder/list.html")).read()
body = layout.split("<body class=\"loading\">", 1)[1].split("<script src=", 1)[0]
body = re.sub(r"\{\{.*?\}\}", "", body, flags=re.S).strip()

# </script> inside the JSON would close the tag early; < is the same string
# to a JSON parser and inert to the HTML tokenizer.
safe = blocks.replace("<", "\\u003c")

out = f"""<style>
{css}
</style>

{body}

<script>window.TLS_BLOCKS = {safe};</script>
<script>
{js}
</script>
"""

dest = sys.argv[1] if len(sys.argv) > 1 else D("public/builder/standalone.html")
open(dest, "w").write(out)
n = json.loads(blocks)
print(f"wrote {dest} ({len(out)/1024:.0f} KB) — "
      f"{len(n['blocks'])} blocks, {len(n['pages'])} pages")

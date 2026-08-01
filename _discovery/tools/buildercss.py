#!/usr/bin/env python3
"""buildercss.py — does every construct that reaches the PDF builder have styling?

The builder page sits outside the book theme's chrome, so it does not load the
theme stylesheet. Content still arrives with whatever classes its shortcodes
emit. When a class has no matching rule in the CSS the builder actually ships,
the construct renders as bare markup — which is how a two-column catalog index
came to print as one very tall single-column stack, and how {{< tabs >}} came to
print its radio buttons into a PDF.

Nothing about that failure is loud: the page still builds, the text is all
there, and it only shows up in a PDF someone has already generated. So this
check makes it loud instead. Add a shortcode that emits a new class, and the
preflight says so before it ships.

Usage:  buildercss.py <built-site-dir>
Reads   <site>/builder/blocks.json  — the rendered HTML the builder consumes
        <site>/**/builder-bundle.*.css — the stylesheet the builder ships
Exit    0 clean, 1 if a class arrives unstyled.
"""

import json
import pathlib
import re
import sys

# Classes that intentionally carry no styling of their own: pure markup hooks
# the theme emits as wrappers. Anything not listed here is expected to be
# styled, so a new construct fails the check until someone decides.
IGNORED = {
    "markdown-inner",   # theme wrapper around shortcode inner content
    "markdown",         # the document root itself, styled by builder.css
    "toggle",           # tabs radio input; builder.css hides it via input.toggle
    "highlight",        # Chroma wrapper, styled by the code rules
    "columns",          # legacy alias, no rules on the site either
}


def classes_in(html):
    out = set()
    for attr in re.findall(r'class="([^"]+)"', html):
        out.update(attr.split())
    return out


def main():
    if len(sys.argv) < 2:
        print("usage: buildercss.py <built-site-dir>", file=sys.stderr)
        return 2
    site = pathlib.Path(sys.argv[1])

    data_file = site / "builder" / "blocks.json"
    if not data_file.exists():
        print(f"  builder data not found at {data_file} — did the site build?")
        return 1

    data = json.loads(data_file.read_text())
    used = set()
    for coll in ("pages", "blocks"):
        for entry in data.get(coll, []):
            used |= classes_in(entry.get("html", ""))

    # the stylesheet the builder actually links, concatenated and fingerprinted
    sheets = list(site.glob("**/builder-bundle.*.css")) or list(site.glob("**/builder.*.css"))
    if not sheets:
        print("  no builder stylesheet found in the built site")
        return 1
    css = "\n".join(p.read_text() for p in sheets)

    unstyled = sorted(
        c for c in used
        if c not in IGNORED and not re.search(r"\." + re.escape(c) + r"(?![\w-])", css)
    )

    print(f"  {len(used)} classes reach the builder; "
          f"{len(used) - len(unstyled) - len(used & IGNORED)} styled, "
          f"{len(used & IGNORED)} ignored by design, {len(unstyled)} unstyled")

    if unstyled:
        print()
        print("  These classes reach the PDF builder with no styling. They will")
        print("  render as bare markup in the preview and in the PDF:")
        for c in unstyled:
            print(f"    .{c}")
        print()
        print("  Style them in assets/content-constructs.css — the file the site")
        print("  and the builder share — so both get it. If a class is a bare")
        print("  wrapper that genuinely needs no rules, add it to IGNORED in")
        print("  _discovery/tools/buildercss.py with a note saying why.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

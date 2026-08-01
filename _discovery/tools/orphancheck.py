#!/usr/bin/env python3
"""orphancheck.py — is every block actually reachable from somewhere?

A new snippet is a file, not a placement. Writing one puts it in the corpus and
in the PDF builder's library, but it appears on **no page** until something
pulls it in — an {{% include %}}, or a {{< catalog >}} / {{< blockset >}} query
whose filters happen to match it. Forget that step and the block is not broken,
not missing, and not reported anywhere: it simply exists and is invisible to
anyone browsing the site.

That is the quietest failure in the repo, so this check makes it loud.

"Reachable" here means the same thing it means in worksheets.py §C2: something
on a page points at the block. A block with no *prose* link is perfectly normal
— most catalogued items are only ever reached through the table that lists them
— so the test is page reachability, not in-degree.

Usage:  orphancheck.py            # reads data/blocks.json + data/edges.json
Exit    0 clean, 1 if a block is reachable from nowhere.
"""

import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]


def main():
    blocks = json.loads((ROOT / "data" / "blocks.json").read_text())
    edges = json.loads((ROOT / "data" / "edges.json").read_text())

    # anything a page pulls in or lists, however it got there
    on_a_page = {e["target"] for e in edges if str(e["source"]).startswith("page:")}
    # anything another block's prose points at
    linked = {e["target"] for e in edges if not str(e["source"]).startswith("page:")}

    stranded = sorted(
        b["id"] for b in blocks
        if not b.get("excluded")
        and b["id"] not in on_a_page
        and b["id"] not in linked
    )

    print(f"  {len(blocks)} blocks, {len(stranded)} reachable from nowhere")

    if stranded:
        print()
        print("  These blocks exist and are in the PDF builder, but no page")
        print("  includes, lists or links them — nobody browsing the site can")
        print("  find them:")
        for bid in stranded:
            print(f"    {bid}")
        print()
        print("  Either pull the block into a page — {{% include %}} for prose,")
        print("  or a {{< catalog >}} / {{< blockset >}} whose filters match it —")
        print("  or set `excluded: true` in its frontmatter if it is deliberately")
        print("  not part of the browsable site yet.")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())

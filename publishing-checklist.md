# Before it goes live — the short version

No explanations here on purpose. The reasoning lives in
`site-maintenance-notes.md`; this is just what to do.

---

## The one command

```bash
./_discovery/tools/check.sh
```

Works from any folder. It builds the site and runs six checks. **If it says
`ALL CHECKS PASSED`, you are clear to merge.** If not, find the failing check
number below.

To also list what text changed compared to what is currently live:

```bash
./_discovery/tools/check.sh main
```

That adds a seventh step. It does **not** pass or fail — it prints `REVIEW` and a
list of pages whose wording changed. Read the list and ask yourself "did I mean
to change these?" A long list is normal when the branch is old; a page you did
not touch appearing on it is worth a look before merging.

---

## If a check fails

| Check | What it means | What to do |
|---|---|---|
| **1. site builds** | Hugo error | Read the error at the end; usually a typo in a shortcode call or frontmatter. |
| **2. snippet rules** | A snippet ends with an HTML comment | Put a blank line and any text after the comment, or delete the comment. |
| **3. broken links** | A link or `#anchor` points at nothing | It prints each one with the file. Fix the link, or fix the heading it points at. |
| **4. data out of date** | `data/blocks.json` no longer matches content | Run `python3 _discovery/tools/builddata.py`, then re-run check.sh. |
| **5. unstyled construct** | Something reaches the PDF builder with no styling | Add the named class to `assets/content-constructs.css`. Re-run. |
| **6. stranded block** | A snippet exists but no page includes, lists or links it | Pull it into a page with `{{% include %}}`, or a catalog/blockset that matches it. If it is deliberately not live yet, set `excluded: true` in its frontmatter. |

---

## When you do X

### Edited an existing snippet
1. `./_discovery/tools/check.sh`
2. If check 4 fails: `python3 _discovery/tools/builddata.py`, re-run.

Nothing else. It is already placed on a page, so the change shows up on the
site and in the PDF builder by itself.

### Added a *new* snippet
Two extra things, both caught by the preflight — but know what they are:

1. Copy a starter from `_templates/` so the frontmatter is right, and **delete
   the comment at the bottom** (a snippet must never end with an HTML comment).
2. **Put it on a page.** A new snippet is a file, not a placement. Until a page
   pulls it in it is invisible on the site — even though it *is* already in the
   PDF builder's library. Either:
   - `{{% include "/snippets/<group>/<namespace>/<slug>" %}}` on the page, or
   - make sure a `{{< catalog >}}` / `{{< blockset >}}` on some page has filters
     that match it.
3. `python3 _discovery/tools/builddata.py` — always needed for a new snippet,
   not just sometimes. The builder reads the generated data, so without this the
   block is missing from it.
4. `./_discovery/tools/check.sh` — check 4 catches a missed step 3, check 6
   catches a missed step 2 and names the block.

### Added a new page
1. `./_discovery/tools/check.sh`
2. Should it be in the left-hand nav? Only if it lives outside `content/docs/` —
   those need an entry in `hugo.toml` under `[[menu.after]]`.

### Changed how a shortcode looks (catalog, columns, tabs)
1. Make the change in **`assets/content-constructs.css`** — not in
   `_custom.scss`, not in `builder.css`. That one file feeds both the site and
   the PDF builder.
2. `./_discovery/tools/check.sh`
3. Look at the page on the site **and** add it to a document in `/builder/` —
   both should look the same.

### Wrote a new shortcode that outputs its own markup
1. Style it in `assets/content-constructs.css`.
2. `./_discovery/tools/check.sh` — check 5 fails and names the class if you
   missed it.

### Changed the PDF builder itself (`assets/builder.*`, `layouts/builder/`)
1. `./_discovery/tools/check.sh`
2. Open `/builder/`, add a page, press **Print** and look at the preview.
3. Check these four, they have each broken before:
   - Compact ticked → the PDF still has content in it
   - Contents page unticked → the title still sits above the first block
   - The grey line is on **every** page, not just the first
   - The footer shows your title and `3 / 9` on every page
   - The contents page has page numbers against each entry, and they are right
   - On a phone: no sideways scrolling
4. If you want the offline single-file copy refreshed:
   `python3 _discovery/tools/standalone.py tls-pdf-builder.html`

Note: contents-page numbers only appear when you use the **Print button**.
Ctrl+P prints through the browser's own pagination — a correct PDF, but with no
numbers in the contents. That is not fixable: numbering needs the document
paginated first, which is asynchronous, and the browser will not wait.

---

## Going live — in this order, every time

1. `./_discovery/tools/check.sh main` — must say `ALL CHECKS PASSED`, and the
   `REVIEW` list should only name pages you meant to change.
2. Look at the branch preview on Netlify. Click a page you changed.
3. If you touched the builder: open `/builder/` on the preview and print one PDF.
4. Merge the branch to `main`.
5. Wait for the Netlify build, then load `theseluckystars.com` and confirm the
   change is actually there.

---

## Things that need no action

- The search index — rebuilt on every deploy.
- Placing an *edited* snippet — it is already on its page.
- Remembering any of this — the preflight fails and tells you which step you
  missed. The list above is so the message makes sense when it does.

## One thing that is NOT automatic

`data/blocks.json`, `data/pages.json` and `data/edges.json` are **committed
files**, regenerated by `python3 _discovery/tools/builddata.py`. Netlify only
runs `hugo --minify`, so it never regenerates them — whatever you commit is
what the live PDF builder uses. Check 4 is what stops that going wrong.

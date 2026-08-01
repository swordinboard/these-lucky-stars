# Before it goes live — the short version

No explanations here on purpose. The reasoning lives in
`site-maintenance-notes.md`; this is just what to do.

---

## The one command

```bash
./_discovery/tools/check.sh
```

Works from any folder. It builds the site and runs five checks. **If it says
`ALL CHECKS PASSED`, you are clear to merge.** If not, find the failing check
number below.

To also list what text changed compared to what is currently live:

```bash
./_discovery/tools/check.sh main
```

That adds a sixth step. It does **not** pass or fail — it prints `REVIEW` and a
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

---

## When you do X

### Added or edited a rule, ability, item — anything in `content/snippets/`
1. `./_discovery/tools/check.sh`
2. If check 4 fails: `python3 _discovery/tools/builddata.py`, re-run.

Nothing else. It appears on the site *and* in the PDF builder by itself.

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
   - On a phone: no sideways scrolling
4. If you want the offline single-file copy refreshed:
   `python3 _discovery/tools/standalone.py tls-pdf-builder.html`

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

- New snippets and pages reaching the PDF builder — generated at build time.
- The search index — rebuilt every time.
- `data/blocks.json` — check 4 tells you when it needs regenerating.

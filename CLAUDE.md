# Working notes for Claude

How to *work* in this repo. **Site and content conventions are not here** — they
already have homes, and duplicating them would guarantee the two copies drift:

| Read this | For |
|---|---|
| `site-maintenance-notes.md` | Block architecture, frontmatter, shortcodes, heading levels — and the reasoning behind all of it |
| `publishing-checklist.md` | The "when you do X, do A then B" routine |
| `_templates/README.md` | Starting a new block |
| `md-formating-notes.md` | Callout styles |

**Read `site-maintenance-notes.md` before editing content.** If a rule about the
site changes, change it there, not here.

---

## Attribution — do not add it

This repo is public, and the attribution was deliberately stripped out of the
history once already. Do not put it back.

**Never add, anywhere:**

- `Co-Authored-By: Claude …` trailers
- `Claude-Session:` trailers, or any `claude.ai/code/session_…` link
- "Generated with Claude Code" footers in pull request bodies
- a model name or session id in a commit message, PR, code comment, or file

### Leave the committer identity alone

Commits are authored and committed as **`Claude <noreply@anthropic.com>`**, which
is what the container's session-start hook
(`~/.claude/session-start-git-identity.sh`) already sets. Normally there is
nothing to do here — the point is what *not* to do.

### This is enforced by config, not by good intentions

`.claude/settings.json` turns the attribution off at the source:

```json
{
  "attribution": { "commit": "", "pr": "" },
  "includeCoAuthoredBy": false
}
```


**This file is the reason `.gitignore` un-ignores `.claude/settings.json`.**
Everything else under `.claude/` stays local; that one file is project
configuration and only works if it is committed.

Do not rely on the rule above being read and followed. It was, for a while, and
attribution still reached a public repo three separate times in three different
wordings, because each mechanism had its own default and none of them could see
an instruction that lived in a chat log. The config is what actually binds.
(
---

## Fresh container setup

A remote session starts from a clean clone and is missing two things the
preflight needs. Both fail in confusing ways if you skip them.

**The theme is a git submodule and is not checked out.** Without it the build
dies on `template for shortcode "tabs" not found`, which reads like a broken
shortcode rather than a missing theme:

```bash
git submodule update --init --recursive
```

**Hugo is not installed**, and it must match the pin in `netlify.toml`
(`HUGO_VERSION`) — the theme needs the **extended** build:

```bash
curl -sSL -o hugo.tar.gz \
  https://github.com/gohugoio/hugo/releases/download/v<VERSION>/hugo_extended_<VERSION>_linux-amd64.tar.gz
tar xzf hugo.tar.gz hugo && mkdir -p ~/.local/bin && mv hugo ~/.local/bin/
export PATH="$HOME/.local/bin:$PATH"
```

---

## Run the preflight against `origin/main`, not `main`

```bash
./_discovery/tools/check.sh origin/main
```

The local `main` ref in a fresh clone can lag far behind the remote. Passing the
stale ref makes check 7 report **hundreds of "text segments lost"** on pages
nothing has touched — alarming, and entirely an artifact of the wrong baseline.
`origin/main` is the real thing.

When check 7 does flag something, **confirm it before reporting it.** Adding a
heading re-segments the surrounding text, so content that is still present gets
listed as lost. Grep the built HTML for the missing string rather than trusting
the report.

---

## Verify rendering by rendering it

Chromium is available at `/opt/pw-browsers/chromium` and Playwright is
configured to find it. Serve the build over HTTP — **not `file://`**, which
cannot resolve the root-absolute stylesheet and renders the page unstyled:

```bash
cd public && python3 -m http.server 8899
```

For any change to markup, CSS or a shortcode, look at the result. Reading the
emitted HTML is not enough on its own — it will not show a table overflowing its
container, an unreadable colour, or a layout that only breaks at phone width.
Check both colour schemes and a narrow viewport, and remember the PDF builder is
a second consumer with its own stylesheet.

# Site Maintenance Notes

Reference for Claude and site maintainers. Covers what to check before and after
different types of updates to avoid breaking changes or inconsistencies.

---

## Hugo Version Updates

- Check `netlify.toml` → `HUGO_VERSION` matches the new version after testing locally
- Review Hugo release notes for deprecated front matter keys or template changes
- Known deprecated keys already fixed: `_build` → `build` (deprecated in 0.145.0)
- Run `hugo server` locally after updating and check for warnings before pushing

---

## Book Theme Updates

After pulling a theme update, **always diff these overridden files** before deploying:

| Our file | Theme original | What we changed |
|---|---|---|
| `layouts/partials/docs/menu-filetree.html` | `themes/hugo-book/layouts/_partials/docs/menu-filetree.html` | Added `bookNavButton` param check so sections with content can still render as nav-toggle-only buttons. See comment at top of file. |
| `layouts/partials/docs/inject/head.html` | `themes/hugo-book/layouts/_partials/docs/inject/head.html` | Added Google Fonts `<link>` tags. Theme file is intentionally empty — low risk. |

**How to diff:**
```
git diff themes/hugo-book/layouts/_partials/docs/menu-filetree.html layouts/partials/docs/menu-filetree.html
```

---

## Adding New External Resources (fonts, scripts, analytics, embeds)

Any new external domain must be added to the CSP in `netlify.toml` under `[[headers]]`.
Match the resource type to the correct directive:

| Resource type | Directive |
|---|---|
| Stylesheets (`<link rel="stylesheet">`) | `style-src` |
| Font files | `font-src` |
| Scripts (`<script src="...">`) | `script-src` |
| Fetch / XHR / preconnect | `connect-src` |
| Images from external hosts | `img-src` |

Currently allowed external domains:
- `https://fonts.googleapis.com` — Google Fonts stylesheet (style-src)
- `https://fonts.gstatic.com` — Google Fonts files (font-src)
- `https://www.googletagmanager.com` — GA4 script (script-src)
- `https://www.google-analytics.com` — GA4 script + beacon (script-src, connect-src)
- `https://region1.google-analytics.com` — GA4 regional beacon (connect-src)

---

## Moving or Renaming Content Pages

Any URL change requires a redirect in `netlify.toml` to avoid 404s in Google Search Console.

```toml
[[redirects]]
  from = "/old-url/"
  to = "/new-url/"
  status = 301
```

- Wildcards: `from = "/old-section/*"` → `to = "/new-section/:splat"`
- Specific sub-page renames need their own rule placed **before** any wildcard that covers the same path
- Drafted-out pages that were previously live also need redirects to their nearest valid parent

---

## Adding New Content Pages

- Add a `description:` field to the front matter — Google uses this as the meta description
- New pages are auto-added to the sitemap unless `draft: true` or `sitemap: { disable: true }`
- Draft pages are not built or sitemapped — intentional
- `bookHidden: true` hides a page **and all its children** from the nav but still builds and sitemaps it — use carefully on sections

---

## Adding New Content Sections

- Decide if the section `_index.md` should be nav-toggle-only: if yes, add `bookNavButton: true`
- Add `bookCollapseSection: true` to make the section collapsible in the nav
- Set `weight` to control nav order within the parent section
- If the section is nav-toggle-only but has content, it will still be indexed by Google — write the content accordingly

---

## Nav Structure Reference

| Front matter param | Effect |
|---|---|
| `bookCollapseSection: true` | Makes section collapsible in nav |
| `bookNavButton: true` | Overrides nav link → toggle-only button (custom param, requires our menu-filetree.html override) |
| `bookHidden: true` | Hides page AND all children from nav; page still builds and is sitemapped |
| `weight: N` | Controls order within parent section (lower = higher in nav) |
| `draft: true` | Page not built, not sitemapped, not accessible |

---

## Content Consistency

### Page title / h2 convention
The Book theme does **not** display the front matter `title` as a visible heading on desktop
(it only appears in the mobile header). Because of this, every page must open with an h2
that matches the page title exactly — this h2 acts as the visible heading on desktop.

```markdown
---
title: "Combat"
---

## Combat

Page content starts here...
```

- The h2 must match the `title` field exactly
- This applies to all content pages **and** section `_index.md` files that have body content
- Do not use a different h2 (e.g. "In This Section") — it will appear as the page heading on desktop

### Other conventions
- Callout styles: see `md-formating-notes.md` (repo root)
- Shortcodes available: `download-card`, `include`, `quickref`, `roadmap` (see `layouts/shortcodes/`)
- Snippet includes: `{{% include "/snippets/filename" %}}` — source files in `content/snippets/`, none are published
- `content/snippets/_index.md` has `build: render: never` cascading to all children — do not remove this

---

## Sitemap Health

Current known noise exclusions (already handled):
- `disableKinds = ["taxonomy", "term"]` in `hugo.toml` — removes `/categories/` and `/tags/`
- `content/snippets/_index.md` with `build: render: never` cascade — removes `/snippets/` and all snippet URLs

If `/snippets/` or taxonomy pages reappear in the sitemap after an update, check those two settings first.

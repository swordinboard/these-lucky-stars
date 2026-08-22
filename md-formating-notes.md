---
headless: true
draft: true
---

**Callout markers are ALL CAPS.** `[!NOTE]`, never `[!Note]`. The theme accepts
either — both render as `book-hint` — so nothing breaks when it drifts, which is
exactly why it drifts. Write them in caps so a grep for the marker finds every
one of them.

> Used for small lists and minor callouts such as functions within content
>
> Can span multiple lines

> [!NOTE]
> Used for quick notes or "short versions" that summarize a section

> [!IMPORTANT]
> Used for general callouts within content

> [!WARNING]
> Used for contwnt status announcments

> [!CAUTION]
> Used for site status annaouncments

> [!DANGER]
> Used for the site-wide playtest status announcement

**Examples are not callouts.** A worked example goes in a `{{% quickref %}}`,
titled "Example of ___", so it collapses to one line rather than sitting open
mid-page. `[!TIP]` used to carry examples and no longer appears anywhere in the
corpus.

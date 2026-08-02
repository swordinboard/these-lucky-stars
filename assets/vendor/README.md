# Vendored third-party code

## paged.min.js — paged.js 0.4.3 (MIT)

<https://pagedjs.org> · <https://github.com/pagedjs/pagedjs>

Loaded **only** when the PDF builder's Print button is pressed, so the 500KB
never costs anyone who is just browsing. See `printDocument()` in
`assets/builder.js`.

It is here for one reason: a contents page with real page numbers. A page
number for a position in the document is only knowable during pagination, and
the browser exposes that to nothing — not to JS, and not to CSS outside an
`@page` margin box (which is why the running footer can have a page number and
the contents page cannot). paged.js paginates the document in JS, which makes
the mapping readable.

Note it is the *library* build (`paged.min.js`), not `paged.polyfill.min.js`.
The polyfill paginates the page automatically on load, which would take over the
live preview; the library exposes `Paged.Previewer` so the builder can run it
only at print time.

`target-counter()` — the CSS feature that would fill in the numbers by itself —
is broken in 0.4.3: it emits `0` for every target, verified against a minimal
test case as well as the real document. The builder reads `data-page-number`
off the paginated output instead, which is more direct anyway.

To update: `npm install pagedjs@<version>` and copy
`node_modules/pagedjs/dist/paged.min.js` here. Re-check both of the above.

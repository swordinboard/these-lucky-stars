/* These Lucky Stars — PDF builder.
 *
 * Assembles a printable document from the blocks in /builder/blocks.json.
 * Everything runs in the browser; the PDF is produced by the browser's own
 * print pipeline, so the document uses the same CSS the site does and gets
 * real text layout, hyphenation and page breaks for free.
 *
 * The one piece of real machinery here is levelling. Snippets author their
 * internal headings starting at h2, so a block is level-agnostic: placing it
 * at level L means emitting its title at hL and shifting every internal
 * heading by (L - 1). That is the same rule layouts/_shortcodes/include.html
 * applies at build time — see "Heading levels are set at the call site" in
 * site-maintenance-notes.md. Keep the two in step.
 */
(function () {
  "use strict";

  var SITE = "https://theseluckystars.com";
  var STORE = "tls-pdf-builder";

  var DATA = { blocks: [], pages: [] };
  var BY_ID = {};
  var BY_URL = {};            // page url + "#anchor" -> block id, for link rewriting
  var doc = null;
  var selected = null;        // uid
  var searchIndex = null;

  /* The title block is edited in place rather than through a field in the
   * toolbar — it is the one part of the document whose words are the user's
   * own. "plaintext-only" keeps pasted markup from landing in the heading;
   * where it is unsupported the paste handler below does the same job. */
  var EDIT = (function () {
    var probe = document.createElement("div");
    try { probe.contentEditable = "plaintext-only"; } catch (e) {}
    return probe.contentEditable === "plaintext-only"
      ? "contenteditable='plaintext-only'" : "contenteditable='true'";
  }());

  /* ---------------------------------------------------------------- utils */

  var uidSeq = 0;
  function uid() { return "i" + (++uidSeq) + "-" + Date.now().toString(36); }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* Block ids and page urls both contain "/", which has to survive as a
   * separator or `combat/disarm` and `combatd/isarm` would collide. */
  function slug(s) {
    return String(s).toLowerCase().trim()
      .replace(/[\/\s]+/g, "-").replace(/[^\w-]/g, "").replace(/^-|-$/g, "");
  }

  /* ------------------------------------------------------------ levelling */

  /* hN -> h(N + level - 1), clamped at 6. One pass with a callback, so a
   * shifted heading can never be caught again by the same rewrite — the
   * cascade bug that iterating levels invites. */
  function shiftHeadings(html, level) {
    var delta = level - 1;
    if (!delta) return html;
    return html.replace(/<(\/?)h([1-6])\b/g, function (m, close, n) {
      return "<" + close + "h" + Math.min(6, Math.max(1, +n + delta));
    });
  }

  /* Links inside a block point at the live site. In a PDF that is only useful
   * if the target travelled with it: rewrite to an internal jump when the
   * target block is in this document, and to an absolute URL when it is not,
   * so a printed link is still followable. */
  function rewriteLinks(html, present) {
    return html.replace(/href="([^"]+)"/g, function (m, href) {
      if (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0) return m;
      var id = BY_URL[href] || BY_URL[href.replace(/\/#/, "#")];
      if (id && present[id]) return 'href="#blk-' + slug(id) + '"';
      if (href.charAt(0) === "/") return 'href="' + SITE + href + '"';
      return m;
    });
  }

  /* ---------------------------------------------------------------- state */

  function blankDoc() {
    return {
      title: "These Lucky Stars",
      subtitle: "Table reference",
      showToc: true,
      items: []
    };
  }

  function save() {
    try { localStorage.setItem(STORE, JSON.stringify(doc)); } catch (e) {}
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE);
      if (raw) {
        var d = JSON.parse(raw);
        if (d && d.items) return d;
      }
    } catch (e) {}
    return blankDoc();
  }

  function addBlock(id, level) {
    var b = BY_ID[id];
    if (!b) return;
    doc.items.push({ uid: uid(), kind: "block", id: id, level: level || 2 });
  }

  function addPage(url) {
    var p = DATA.pages.filter(function (x) { return x.url === url; })[0];
    if (!p) return;
    doc.items.push({ uid: uid(), kind: "page", url: url, level: 1 });
  }

  /* A page chunk renders the real page, chrome and all. Breaking it apart
   * replaces it with its blocks — which drops the page's own connective prose
   * (section intros, group headings). That is a real loss, so it happens only
   * on request, and the preview shows the result immediately. */
  function breakApart(uid_) {
    var i = indexOf(uid_);
    if (i < 0) return;
    var item = doc.items[i];
    var p = DATA.pages.filter(function (x) { return x.url === item.url; })[0];
    if (!p) return;
    /* A snippet may include another snippet, so a block's HTML can already
     * carry another block whole — combat/damage renders combat/damage-dice
     * inside itself. The page lists both, correctly: it renders the parent
     * once. Emitting both here would print the child twice, which is what a
     * broken-apart Combat page used to do. Drop any block another block in
     * this same list already contains; it is still addable on its own. */
    var swallowed = {};
    p.blocks.forEach(function (id) {
      var b = BY_ID[id];
      if (b && b.contains) {
        b.contains.forEach(function (child) { swallowed[child] = true; });
      }
    });
    var repl = p.blocks.filter(function (id) { return !swallowed[id]; })
      .map(function (id) {
        return { uid: uid(), kind: "block", id: id, level: 2 };
      });
    doc.items.splice.apply(doc.items, [i, 1].concat(repl));
    selected = repl.length ? repl[0].uid : null;
  }

  function indexOf(u) {
    for (var i = 0; i < doc.items.length; i++) if (doc.items[i].uid === u) return i;
    return -1;
  }

  function move(u, delta) {
    var i = indexOf(u), j = i + delta;
    if (i < 0 || j < 0 || j >= doc.items.length) return;
    var t = doc.items[i];
    doc.items[i] = doc.items[j];
    doc.items[j] = t;
  }

  function setLevel(u, delta) {
    var it = doc.items[indexOf(u)];
    if (!it) return;
    it.level = Math.min(6, Math.max(1, (it.level || 2) + delta));
  }

  function remove(u) {
    var i = indexOf(u);
    if (i < 0) return;
    doc.items.splice(i, 1);
    selected = doc.items.length ? doc.items[Math.min(i, doc.items.length - 1)].uid : null;
  }

  /* -------------------------------------------------------------- preview */

  function itemTitle(it) {
    if (it.kind === "block") return (BY_ID[it.id] || {}).title || it.id;
    if (it.kind === "page") {
      var p = DATA.pages.filter(function (x) { return x.url === it.url; })[0];
      return p ? p.title : it.url;
    }
    return it.text || "Note";
  }

  function itemBody(it, present) {
    if (it.kind === "block") {
      var b = BY_ID[it.id];
      if (!b) return "<p><em>missing block: " + esc(it.id) + "</em></p>";
      return rewriteLinks(shiftHeadings(b.html, it.level), present);
    }
    if (it.kind === "page") {
      var p = DATA.pages.filter(function (x) { return x.url === it.url; })[0];
      if (!p) return "";
      return rewriteLinks(shiftHeadings(p.html, it.level), present);
    }
    return "<p>" + esc(it.text || "") + "</p>";
  }

  /* The printed footer takes the title from a CSS custom property, since CSS
   * content cannot read the document. JSON.stringify gives a correctly quoted
   * and escaped CSS string — quotes and backslashes are escaped the same way,
   * and the title cannot contain a newline because Enter is swallowed. */
  function syncFooterTitle() {
    document.documentElement.style.setProperty(
      "--doc-title", JSON.stringify(doc.title || ""));
  }

  function renderPreview() {
    var host = document.getElementById("doc");
    syncFooterTitle();
    host.innerHTML = "";

    var present = {};
    doc.items.forEach(function (it) {
      if (it.kind === "block") present[it.id] = true;
      if (it.kind === "page") {
        var p = DATA.pages.filter(function (x) { return x.url === it.url; })[0];
        if (p) p.blocks.forEach(function (id) { present[id] = true; });
      }
    });

    /* The title and the contents page are one front section, not two things
     * that happen to be adjacent. With a contents page it is a title page and
     * takes a page break after it; without one it is just a masthead that runs
     * straight into the first block. Either way the title is at the top. */
    var withToc = !!(doc.showToc && doc.items.length);
    var front = el("header", "doc-front" + (withToc ? " has-toc" : ""));

    var head = el("div", "doc-head");
    head.innerHTML =
      "<h1 " + EDIT + " data-field='title' data-ph='Name your document…' " +
        "title='Click to edit'>" + esc(doc.title) + "</h1>" +
      "<p class='doc-sub' " + EDIT + " data-field='subtitle' " +
        "data-ph='Add a subtitle…' title='Click to edit'>" + esc(doc.subtitle) + "</p>";
    front.appendChild(head);

    if (withToc) {
      var toc = el("nav", "doc-toc" + (doc.items.length > 10 ? " two-col" : ""));
      var h = "<h2>Contents</h2><ul>";
      doc.items.forEach(function (it) {
        h += "<li class='lvl" + (it.level || 2) + "'><a href='#blk-" +
          slug(it.kind === "page" ? it.url : it.id) + "'>" + esc(itemTitle(it)) + "</a></li>";
      });
      toc.innerHTML = h + "</ul>";
      front.appendChild(toc);
    }
    host.appendChild(front);

    if (!doc.items.length) {
      var empty = el("div", "empty");
      empty.innerHTML = "<p><strong>Nothing in the document yet.</strong></p>" +
        "<p>Search on the left and click a result to add it, or add a whole page " +
        "as a ready-made chunk and break it apart later.</p>";
      host.appendChild(empty);
    }

    doc.items.forEach(function (it) {
      var wrap = el("section", "item" + (it.uid === selected ? " sel" : ""));
      wrap.dataset.uid = it.uid;
      wrap.setAttribute("draggable", "true");

      var lvl = it.level || 2;
      var anchor = "blk-" + slug(it.kind === "page" ? it.url : it.id);
      var bodyHtml = "<h" + lvl + " id='" + anchor + "'>" + esc(itemTitle(it)) +
        "</h" + lvl + ">" + itemBody(it, present);

      var body = el("div", "item-body markdown");
      body.innerHTML = bodyHtml;

      var bar = el("div", "item-bar");
      bar.innerHTML =
        "<span class='grip' title='Drag to reorder'>⠿</span>" +
        "<span class='item-kind'>" + (it.kind === "page" ? "page" : "block") + "</span>" +
        "<span class='item-name'>" + esc(itemTitle(it)) + "</span>" +
        "<span class='spacer'></span>" +
        "<button data-act='up'    title='Move up (Alt+↑)'>↑</button>" +
        "<button data-act='down'  title='Move down (Alt+↓)'>↓</button>" +
        "<button data-act='out'   title='Promote heading (Shift+Tab)'>⇤</button>" +
        "<span class='lvl-badge' title='Heading level'>H" + lvl + "</span>" +
        "<button data-act='in'    title='Demote heading (Tab)'>⇥</button>" +
        (it.kind === "page"
          ? "<button data-act='split' title='Break into blocks'>⊞</button>" : "") +
        "<button data-act='del'   title='Remove (Del)'>✕</button>";

      wrap.appendChild(bar);
      wrap.appendChild(body);
      host.appendChild(wrap);
    });

    /* The toolbar renders above its item, so selecting something already at the
     * top of the scroll area puts the controls you just summoned out of sight —
     * on a phone that is most of the screen. Nudge it back into view. */
    if (selected) {
      var sel = host.querySelector(".item.sel");
      var stage = document.querySelector(".stage");
      if (sel && stage &&
          sel.getBoundingClientRect().top < stage.getBoundingClientRect().top) {
        sel.scrollIntoView({ block: "start", behavior: "auto" });
      }
    }

    /* A closed <details> prints as a bare label with its content missing, and
     * CSS cannot open one. The builder is assembling a document to be read on
     * paper, where the collapse serves no purpose, so open them all. */
    Array.prototype.forEach.call(host.querySelectorAll("details"), function (d) {
      d.open = true;
    });

    document.getElementById("count").textContent =
      doc.items.length + (doc.items.length === 1 ? " item" : " items");
  }

  /* -------------------------------------------------------------- library */

  function buildIndex() {
    searchIndex = {};
    DATA.blocks.forEach(function (b) {
      searchIndex[b.id] = {
        /* full-text comes from the block's own HTML rather than a second
           plaintext copy in the payload — that copy was 223 KB of the file */
        hay: (b.title + " " + b.summary + " " + b.tags.join(" ") + " " +
             b.type + " " + b.id + " " +
             b.html.replace(/<[^>]*>/g, " ")).toLowerCase(),
        title: b.title.toLowerCase()
      };
    });
  }

  function search(q) {
    q = q.trim().toLowerCase();
    var f = currentFilters();
    var pool = DATA.blocks.filter(function (b) {
      if (f.hideWip && b.wip) return false;
      if (f.type && b.type !== f.type) return false;
      if (f.category && b.category.indexOf(f.category) < 0) return false;
      return true;
    });
    if (!q) return pool.slice(0, 300);
    var terms = q.split(/\s+/);
    var scored = [];
    pool.forEach(function (b) {
      var s = searchIndex[b.id];
      if (!s) return;
      var score = 0, ok = true;
      terms.forEach(function (t) {
        if (s.title.indexOf(t) === 0) score += 100;
        else if (s.title.indexOf(t) >= 0) score += 40;
        else if (s.hay.indexOf(t) >= 0) score += 5;
        else ok = false;
      });
      if (ok) scored.push({ b: b, score: score });
    });
    scored.sort(function (a, c) { return c.score - a.score || a.b.title.localeCompare(c.b.title); });
    return scored.slice(0, 300).map(function (x) { return x.b; });
  }

  function currentFilters() {
    return {
      type: document.getElementById("f-type").value,
      category: document.getElementById("f-cat").value,
      hideWip: document.getElementById("f-wip").checked
    };
  }

  /* Which tab carries `on` in the markup is the single source of truth for the
   * library's opening mode — including at boot, so the default can be changed
   * in list.html alone without the search bar getting out of step with it. */
  function setMode(tab) {
    var cur = document.querySelector(".lib-tab.on");
    if (cur) cur.classList.remove("on");
    tab.classList.add("on");
    /* the type/setting/wip filters describe blocks; they mean nothing here */
    document.getElementById("searchbar").style.display =
      tab.dataset.mode === "pages" ? "none" : "";
  }

  function renderLibrary() {
    var mode = document.querySelector(".lib-tab.on").dataset.mode;
    var host = document.getElementById("lib-list");
    host.innerHTML = "";

    if (mode === "pages") {
      var bySec = {};
      DATA.pages.forEach(function (p) {
        (bySec[p.section || "top"] = bySec[p.section || "top"] || []).push(p);
      });
      Object.keys(bySec).sort().forEach(function (sec) {
        host.appendChild(el("div", "lib-sec", sec === "top" ? "site" : sec));
        bySec[sec].forEach(function (p) {
          var r = el("button", "lib-row");
          r.innerHTML = "<span class='lib-title'>" + esc(p.title) +
            (p.wip ? " <em class='wip'>wip</em>" : "") + "</span>" +
            "<span class='lib-meta'>" + p.blocks.length +
            (p.blocks.length === 1 ? " block" : " blocks") + "</span>";
          r.onclick = function () { addPage(p.url); afterAdd(); };
          host.appendChild(r);
        });
      });
      return;
    }

    var res = search(document.getElementById("q").value);
    document.getElementById("lib-count").textContent = res.length + " found";
    res.forEach(function (b) {
      var r = el("button", "lib-row");
      r.innerHTML = "<span class='lib-title'>" + esc(b.title) +
        (b.wip ? " <em class='wip'>wip</em>" : "") + "</span>" +
        "<span class='lib-meta'>" + esc(b.type) + "</span>" +
        (b.summary ? "<span class='lib-sum'>" + esc(b.summary) + "</span>" : "");
      r.onclick = function () { addBlock(b.id); afterAdd(); };
      host.appendChild(r);
    });
  }

  /* ---------------------------------------------------------------- wiring */

  function commit() { save(); renderPreview(); }

  /* --------------------------------------------- printing with page numbers

     A contents page needs to know which page each entry lands on, and nothing
     in the browser will say: CSS target-counter() is unimplemented in Chrome,
     and pagination is not exposed to JS at all. counter(page) works in the
     running footer only because an @page margin box is evaluated by the engine
     per sheet — body content has no equivalent.

     So printing paginates the document itself, with paged.js, and reads the
     answer off the result. The pages it produces are what gets printed, so the
     numbers cannot disagree with the document they describe — measuring with
     one engine and printing with another would be a guess.

     Ctrl+P bypasses this and prints through the browser's own pagination: the
     PDF is correct, just without contents-page numbers. Pagination is async and
     beforeprint cannot wait for it, so there is no way to hook it. */

  var pagedLoading = null;

  /* The library build exposes PagedModule; the polyfill build exposes Paged.
   * Accept either so swapping builds does not silently disable printing. */
  function pagedApi() { return window.PagedModule || window.Paged || null; }

  function loadPaged() {
    if (pagedApi()) return Promise.resolve();
    if (pagedLoading) return pagedLoading;
    var url = document.documentElement.getAttribute("data-paged-src");
    if (!url) return Promise.reject(new Error("paged.js not available"));
    pagedLoading = new Promise(function (resolve, reject) {
      var s = document.createElement("script");
      s.src = url;
      s.onload = resolve;
      s.onerror = function () { reject(new Error("paged.js failed to load")); };
      document.head.appendChild(s);
    });
    return pagedLoading;
  }

  /* Filling the numbers in changes the contents page, which could re-flow the
   * document the numbers describe. Reserving the space up front means the
   * layout paged.js measured is the layout that prints. */
  function reserveTocSlots(root) {
    Array.prototype.forEach.call(root.querySelectorAll(".doc-toc li"), function (li) {
      var slot = el("span", "toc-pg");
      slot.textContent = " ";
      li.appendChild(slot);
    });
  }

  function fillTocNumbers(rendered) {
    var filled = 0, missing = 0;
    Array.prototype.forEach.call(rendered.querySelectorAll(".doc-toc li"), function (li) {
      var a = li.querySelector("a"), slot = li.querySelector(".toc-pg");
      if (!a || !slot) return;
      var target = rendered.querySelector(cssId(a.getAttribute("href").slice(1)));
      var page = target && target.closest(".pagedjs_page");
      if (page && page.getAttribute("data-page-number")) {
        slot.textContent = page.getAttribute("data-page-number");
        filled++;
      } else {
        missing++;
      }
    });
    return { filled: filled, missing: missing };
  }

  /* Once the Previewer is handed the stylesheets, paged.js resolves the @page
   * margin boxes itself — var() and the page counters included — and writes
   * them into a ::after on each box. An earlier version filled them from here
   * instead, which printed everything twice. If a header ever goes missing,
   * check that the sheets are still being passed before adding code here. */

  /* Chrome prints the paginated boxes as ordinary content, so its own @page
   * margins would inset each already-page-sized box and its own margin boxes
   * would print a second header at the sheet edge. Both are turned off for the
   * duration of the paged print; the native Ctrl+P path still needs them. */
  var PAGED_PRINT_CSS =
    "@page { margin: 0; " +
    "@top-center { content: none; } " +
    "@bottom-left { content: none; } " +
    "@bottom-right { content: none; } }";

  function applyPagedPageRule(on) {
    var id = "paged-page-rule", node = document.getElementById(id);
    if (on && !node) {
      node = document.createElement("style");
      node.id = id;
      node.textContent = PAGED_PRINT_CSS;
      document.head.appendChild(node);
    } else if (!on && node) {
      node.parentNode.removeChild(node);
    }
  }

  /* Block ids contain characters querySelector would read as syntax. */
  function cssId(id) {
    return "#" + (window.CSS && CSS.escape ? CSS.escape(id) : id.replace(/([^\w-])/g, "\\$1"));
  }

  function printDocument() {
    var btn = document.getElementById("print");
    btn.disabled = true;

    /* paged.js lays the clone out on screen, so @media print is not in force
     * while it does — every screen-only rule still applies. Compact is the one
     * that matters: it hides every item body, so pagination would faithfully
     * lay out a document with its contents missing, and fade the contents page
     * to 45% besides. Dropping the class for the duration is simpler than
     * duplicating the print rules, and it covers all four of them at once.
     * The checkbox is untouched, so the editing view comes back as it was. */
    var wasCompact = document.body.classList.contains("compact");
    if (wasCompact) document.body.classList.remove("compact");
    function restoreCompact() {
      if (wasCompact) document.body.classList.add("compact");
    }

    loadPaged().then(function () {
      var source = document.getElementById("doc").cloneNode(true);
      /* editing chrome must not reach paper */
      Array.prototype.forEach.call(source.querySelectorAll(".item-bar"), function (n) {
        n.parentNode.removeChild(n);
      });
      /* An unfilled title or subtitle shows its placeholder through
       * [data-field]:empty::before. Print CSS suppresses that, which again is
       * not in force here — so the hooks come off the clone entirely. */
      Array.prototype.forEach.call(source.querySelectorAll("[data-field]"), function (n) {
        n.removeAttribute("contenteditable");
        n.removeAttribute("data-field");
        n.removeAttribute("data-ph");
        if (!n.textContent.trim()) n.parentNode.removeChild(n);
      });
      reserveTocSlots(source);

      var out = el("div", "paged-out");
      out.id = "paged-out";
      document.body.appendChild(out);

      /* Previewer must be handed the stylesheets explicitly. Passing [] does
       * not mean "use the document's" — it means none, and paged.js then
       * paginates against its own defaults: 1in margins instead of the 17mm in
       * @page, and no print rules at all. */
      var sheets = Array.prototype.map.call(
        document.querySelectorAll('link[rel="stylesheet"]'),
        function (l) { return l.href; });

      return new (pagedApi().Previewer)()
        .preview(source.innerHTML, sheets, out)
        .then(function (flow) {
          var res = fillTocNumbers(out);
          applyPagedPageRule(true);
          document.body.classList.add("printing");
          return { flow: flow, res: res, out: out };
        });
    }).then(function (state) {
      var cleaned = false;
      function cleanup() {
        if (cleaned) return;
        cleaned = true;
        restoreCompact();
        applyPagedPageRule(false);
        document.body.classList.remove("printing");
        var n = document.getElementById("paged-out");
        if (n) n.parentNode.removeChild(n);
        /* paged.js applies the print stylesheet to the screen — that is what a
         * paged preview is — and leaves the flattened copy in the document.
         * Our print CSS hides the toolbar and library with an unscoped
         * `display: none !important`, so anything left behind keeps the app
         * hidden for good: the page looks frozen and only a reload brings it
         * back. Take the injected styles out with everything else. */
        Array.prototype.forEach.call(
          document.querySelectorAll("style[data-pagedjs-inserted-styles]"),
          function (st) { st.parentNode.removeChild(st); });
        window.removeEventListener("afterprint", cleanup);
        window.removeEventListener("focus", cleanup);
        btn.disabled = false;
      }
      window.addEventListener("afterprint", cleanup);
      /* Not every browser fires afterprint — regaining focus means the dialog
       * closed either way, and the timeout is the last resort. */
      window.addEventListener("focus", cleanup);
      window.print();
      setTimeout(cleanup, 60000);
    }).catch(function (err) {
      /* Never leave someone unable to print because the paginator failed. */
      if (window.console) console.warn("paged.js unavailable, printing without contents-page numbers:", err);
      var n = document.getElementById("paged-out");
      if (n) n.parentNode.removeChild(n);
      applyPagedPageRule(false);
      document.body.classList.remove("printing");
      btn.disabled = false;
      /* the native path has its own compact handling in @media print */
      restoreCompact();
      window.print();
    });
  }

  /* ------------------------------------------------------ narrow-screen shell */

  function narrow() { return window.matchMedia("(max-width: 900px)").matches; }

  function drawer(open) {
    var lib = document.getElementById("lib");
    lib.classList.toggle("open", open);
    document.getElementById("scrim").hidden = !open;
    document.getElementById("lib-toggle").setAttribute("aria-expanded", open);
    var q = document.getElementById("q");
    if (open && q.offsetParent !== null) q.focus();
  }

  function menu(open) {
    document.getElementById("bar").classList.toggle("more-open", open);
    document.getElementById("menu-toggle").setAttribute("aria-expanded", open);
  }

  /* On a phone the drawer covers the document, so leaving it open after an add
   * hides the thing you just did. Close it and let the result be visible. */
  function afterAdd() {
    commit();
    if (narrow()) drawer(false);
  }

  function act(a, u) {
    if (a === "up") move(u, -1);
    else if (a === "down") move(u, 1);
    else if (a === "in") setLevel(u, 1);
    else if (a === "out") setLevel(u, -1);
    else if (a === "del") remove(u);
    else if (a === "split") breakApart(u);
    commit();
  }

  function wire() {
    document.getElementById("lib-toggle").onclick = function () {
      drawer(!document.getElementById("lib").classList.contains("open"));
    };
    document.getElementById("scrim").onclick = function () { drawer(false); };
    document.getElementById("menu-toggle").onclick = function (e) {
      e.stopPropagation();
      menu(!document.getElementById("bar").classList.contains("more-open"));
    };
    document.addEventListener("click", function (e) {
      if (!e.target.closest("#bar-more") && !e.target.closest("#menu-toggle")) menu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { drawer(false); menu(false); }
    });
    /* returning to a wide window must not leave the drawer transformed away */
    window.matchMedia("(max-width: 900px)").addEventListener("change", function (ev) {
      if (!ev.matches) { drawer(false); menu(false); }
    });

    document.getElementById("q").addEventListener("input", renderLibrary);
    ["f-type", "f-cat", "f-wip"].forEach(function (id) {
      document.getElementById(id).addEventListener("change", renderLibrary);
    });
    Array.prototype.forEach.call(document.querySelectorAll(".lib-tab"), function (t) {
      t.onclick = function () { setMode(t); renderLibrary(); };
    });

    var host = document.getElementById("doc");
    host.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-act]");
      var item = e.target.closest(".item");
      if (!item) return;
      if (btn) { e.preventDefault(); act(btn.dataset.act, item.dataset.uid); return; }
      selected = item.dataset.uid;
      renderPreview();
    });

    /* drag to reorder */
    var dragUid = null;
    host.addEventListener("dragstart", function (e) {
      var it = e.target.closest(".item");
      if (!it) return;
      dragUid = it.dataset.uid;
      e.dataTransfer.effectAllowed = "move";
    });
    host.addEventListener("dragover", function (e) {
      var it = e.target.closest(".item");
      if (!it || !dragUid || it.dataset.uid === dragUid) return;
      e.preventDefault();
      it.classList.add("drop");
    });
    host.addEventListener("dragleave", function (e) {
      var it = e.target.closest(".item");
      if (it) it.classList.remove("drop");
    });
    host.addEventListener("drop", function (e) {
      var it = e.target.closest(".item");
      if (!it || !dragUid) return;
      e.preventDefault();
      var from = indexOf(dragUid), to = indexOf(it.dataset.uid);
      if (from < 0 || to < 0) return;
      var moved = doc.items.splice(from, 1)[0];
      doc.items.splice(to, 0, moved);
      selected = dragUid;
      dragUid = null;
      commit();
    });

    document.addEventListener("keydown", function (e) {
      if (/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (!selected) return;
      if (e.altKey && e.key === "ArrowUp") { e.preventDefault(); act("up", selected); }
      else if (e.altKey && e.key === "ArrowDown") { e.preventDefault(); act("down", selected); }
      else if (e.key === "Tab") { e.preventDefault(); act(e.shiftKey ? "out" : "in", selected); }
      else if (e.key === "Delete" || e.key === "Backspace") { e.preventDefault(); act("del", selected); }
    });

    /* Typing in the title block must not re-render the document — that would
     * rebuild the node under the caret and drop it to the start on every
     * keystroke. Save the text, leave the DOM alone. */
    document.getElementById("doc").addEventListener("input", function (e) {
      var f = e.target.dataset && e.target.dataset.field;
      if (!f) return;
      doc[f] = e.target.textContent.trim();
      if (f === "title") syncFooterTitle();
      save();
    });
    /* A paste carries markup with it; only the words belong in a title. */
    document.getElementById("doc").addEventListener("paste", function (e) {
      if (!(e.target.dataset && e.target.dataset.field)) return;
      e.preventDefault();
      var t = (e.clipboardData || window.clipboardData).getData("text")
        .replace(/\s+/g, " ").trim();
      document.execCommand("insertText", false, t);
    });
    /* Enter would open a second line in a one-line heading. */
    document.getElementById("doc").addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.dataset && e.target.dataset.field) {
        e.preventDefault(); e.target.blur();
      }
    });
    document.getElementById("opt-toc").addEventListener("change", function (e) {
      doc.showToc = e.target.checked; commit();
    });
    document.getElementById("compact").addEventListener("change", function (e) {
      document.body.classList.toggle("compact", e.target.checked);
    });

    document.getElementById("print").onclick = printDocument;
    document.getElementById("clear").onclick = function () {
      if (!confirm("Clear the whole document? This cannot be undone.")) return;
      doc = blankDoc();
      selected = null;
      commit();
    };
    document.getElementById("export").onclick = function () {
      var blob = new Blob([JSON.stringify(doc, null, 1)], { type: "application/json" });
      var a = el("a");
      a.href = URL.createObjectURL(blob);
      a.download = (slug(doc.title) || "tls-document") + ".json";
      a.click();
    };
    document.getElementById("import").onchange = function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var d = JSON.parse(r.result);
          if (!d.items) throw 0;
          doc = d;
          selected = null;
          commit();
        } catch (err) { alert("That file is not a builder document."); }
      };
      r.readAsText(f);
    };
  }

  /* ----------------------------------------------------------------- boot */

  /* Normally the data is fetched. A standalone copy of this page can inline it
   * instead, which is how the app runs with no server behind it. */
  (window.TLS_BLOCKS
      ? Promise.resolve(window.TLS_BLOCKS)
      : fetch("/builder/blocks.json").then(function (r) { return r.json(); }))
    .then(function (d) {
      DATA = d;
      DATA.blocks.forEach(function (b) {
        BY_ID[b.id] = b;
        if (b.url) BY_URL[b.url] = b.id;
      });
      DATA.pages.forEach(function (p) {
        if (!BY_URL[p.url]) BY_URL[p.url] = p.blocks[0];
      });
      buildIndex();

      var types = {}, cats = {};
      DATA.blocks.forEach(function (b) {
        types[b.type] = 1;
        b.category.forEach(function (c) { cats[c] = 1; });
      });
      var ft = document.getElementById("f-type"), fc = document.getElementById("f-cat");
      Object.keys(types).sort().forEach(function (t) { ft.add(new Option(t, t)); });
      Object.keys(cats).sort().forEach(function (c) { fc.add(new Option(c, c)); });

      doc = load();
      document.getElementById("opt-toc").checked = doc.showToc !== false;

      wire();
      setMode(document.querySelector(".lib-tab.on"));
      renderLibrary();
      renderPreview();
      document.body.classList.remove("loading");
    })
    .catch(function (e) {
      document.getElementById("doc").innerHTML =
        "<div class='empty'><p><strong>Could not load the block data.</strong></p>" +
        "<p>/builder/blocks.json failed to fetch. If you are running this locally, " +
        "make sure the site is served over HTTP rather than opened as a file.</p></div>";
      document.body.classList.remove("loading");
    });
})();

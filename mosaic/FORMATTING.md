# Formatting notes

Conventions for the map views (`js/orrery.js`, `js/render.js`), kept here so
layout decisions stay consistent as more body types, moons, rings, and
clusters get added.

## Grow down, not out

When a planet can have a variable number of orbiting objects (currently
moons), lay them out in a grid capped at **2 columns**, filling in order
(closest first) and adding rows as needed rather than widening a single row:

| objects | rows        |
|---------|-------------|
| 1       | 1 (1)       |
| 2       | 1 (2)       |
| 3       | 2 (2, 1)    |
| 4       | 2 (2, 2)    |
| 5       | 3 (2, 2, 1) |
| 6       | 3 (2, 2, 2) |

A lone last item centers itself in its row instead of sitting off to one
side. This keeps a planet's horizontal footprint bounded no matter how many
moons it has, so it can never grow wide enough to crowd into a neighboring
planet's own column of orbiting objects. See `drawMoons` and
`moonIndicatorStartY` in `js/orrery.js`.

## Label backgrounds

Every node label (`drawLabel`) gets a semi-transparent `.node-label-bg` rect
behind it (`var(--glass-bg)`), so a drop-line passing near/behind a name
reads as continuing faintly rather than looking cut off. Computing the rect
requires the label's `getBBox()`, which only returns real dimensions once
the element is attached to the live, rendered SVG — so groups get appended
to `viewportEl` *before* their children (label, circle, hit-area) are added,
not built off-DOM and appended once at the end.

## Hit areas

Ringed planets, asteroid fields, and icon-based bodies have visible shapes
(unfilled strokes, scattered dots, thin icon lines) that don't cover their
full visual footprint. Every node gets a transparent `.hit-area` circle
(`addHitArea`), inserted as its first child, sized to the node's full
extent so taps land reliably without changing how the node looks.

## Cluster/system layouts: skewed over symmetric

When positioning a cluster's systems (or a system's planets, at that level
of the map) to avoid crossing route lines, prefer an organic, randomly
skewed arrangement over a perfectly regular one (a regular polygon, an
evenly-spaced hub-and-spoke). A route graph is usually satisfiable by more
than one crossing-free layout — pick irregular positions/angles within that
solution space rather than the tidiest symmetric one. Two concrete reasons,
not just taste:

- A perfectly regular hub-and-spoke can put two "opposite" nodes and the
  hub in a near-straight line, so a chord edge between those opposite nodes
  rides right through the hub's own node circle (see Beta Cluster's
  Corrigan, and the jittered angles used to avoid it). Skewing breaks this
  without changing the topology.
- It simply reads as more natural for a starfield — real star positions
  aren't on a grid or a regular polygon.

Still verify the result is actually crossing-free (and clears every node
by a safe margin) before committing to it; skewed is a preference among
valid layouts, not a reason to skip checking.

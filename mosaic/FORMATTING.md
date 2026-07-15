# Formatting notes

Conventions for the orrery/system view (`js/orrery.js`), kept here so layout
decisions stay consistent as more body types, moons, and rings get added.

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

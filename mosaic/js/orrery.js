import { orbitalBodiesOf, moonsOf, locationsOf, getById } from './data.js';
import { createIcon } from './icons.js';
import { hashStringToSeed, mulberry32 } from './random.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

// The star sits at content-x 0, non-interactive, drawn as part of the normal
// pannable content (not a separate fixed element) — panzoom.js clamps
// transform.x so its center can never scroll past screen-x 0 (no revealing
// empty space before it), while panning toward distant bodies is free to
// scroll it fully off-screen, same as any other content.
const STAR_X = 0;
const STAR_RADIUS = 50;
// Real stellar size ordering (main-sequence dwarfs shrink cooler-to-hotter,
// white dwarfs are stellar remnants far smaller than any of them) — used to
// size a system's star(s); an unlisted/generic type falls back to STAR_RADIUS.
const STAR_RADIUS_BY_TYPE = { 'yellow dwarf': 50, 'orange dwarf': 42, 'red dwarf': 34, 'white dwarf': 24 };
// A second star in a binary system is drawn this far below the first, at the
// same STAR_X, so the two half-discs share one flat left edge (flush with the
// screen edge, no gap) and only partially overlap vertically.
const COMPANION_OFFSET_Y = 34;
const FIRST_BODY_OFFSET = 140;
const ORBIT_SPACING = 130;
const BASELINE_Y = 0;

const PLANET_RADIUS = { small: 10, medium: 18, large: 28 };
const ICON_HALF = 12;
const ASTEROID_RADIUS = 24;
const MOON_RADIUS = 8;
// Moons fill a grid of at most 2 columns, closest-to-farthest, row by row
// (see drawMoons) rather than one ever-widening row — a planet's moon
// footprint stays capped at 2 columns wide no matter how many moons it has,
// so it can't grow wide enough to crowd into a neighboring planet's own
// orbit; extra moons add rows below instead.
const MOON_ROW_Y = 50;
const MOON_ROW_STAGGER = 45;
const MOON_GAP = 58;
const INDICATOR_ROW_Y = 130;
const INDICATOR_RADIUS = 3;
const INDICATOR_GAP = 10;
const RING_RX_FACTOR = 1.55;
const RING_RY_FACTOR = 0.5;
const RING_BAND_GROWTH = 0.12;

function el(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
}

function radiusFor(body) {
    if (body.bodyType === 'planet') return PLANET_RADIUS[body.scale] || PLANET_RADIUS.medium;
    if (body.bodyType === 'asteroidField') return ASTEROID_RADIUS;
    return ICON_HALF;
}

// Draws one star as a half-disc (see the STAR_X comment above) at (x, y).
// A `type` matching STAR_RADIUS_BY_TYPE sizes and colors it accordingly
// (see the `.star[data-star-type]` rules in style.css); otherwise it falls
// back to the default radius/fill, unchanged from before stars had types.
function drawStar(viewportEl, x, y, type) {
    const radius = STAR_RADIUS_BY_TYPE[type] || STAR_RADIUS;
    const star = el('path', {
        class: 'star',
        d: `M ${x} ${y - radius} A ${radius} ${radius} 0 0 1 ${x} ${y + radius} Z`,
    });
    if (type) star.setAttribute('data-star-type', type);
    viewportEl.appendChild(star);
    return radius;
}

// A semi-transparent backing behind each label (rather than none at all)
// keeps a drop-line that happens to pass behind a name — likely now that
// moons stagger across two rows — from looking like it stops dead at the
// text; the line still shows through faintly instead of being interrupted.
// Requires `group` to already be attached under the live SVG so getBBox()
// reflects real layout, not a detached (zero-sized) fragment.
function drawLabel(group, text, y) {
    const label = el('text', { class: 'node-label', y });
    label.textContent = text;
    group.appendChild(label);
    const bbox = label.getBBox();
    const bg = el('rect', {
        class: 'node-label-bg',
        x: bbox.x - 3,
        y: bbox.y - 1,
        width: bbox.width + 6,
        height: bbox.height + 2,
    });
    group.insertBefore(bg, label);
}

// Clicking a node was unreliable for ringed planets, asteroid fields, and
// icon-based bodies because their visible shapes (unfilled ring strokes,
// scattered dots, thin icon lines) don't cover their full visual footprint —
// a tap landing in the "gap" hit nothing. A transparent (not `fill: none`)
// circle sized to the node's full extent, inserted as the first child,
// gives every node a reliable, generously-sized hit target without changing
// how it looks (see the `!important` on `.hit-area` in style.css — plain
// specificity isn't enough to keep it invisible against `.node circle` etc).
function addHitArea(group, radius) {
    group.insertBefore(el('circle', { class: 'hit-area', cx: 0, cy: 0, r: radius + 4 }), group.firstChild);
}

// One dot per location (not one dot regardless of count), stacked
// vertically below the drop-line so the count reads at a glance. startY
// defaults to the standard row but is pushed lower for planets whose moons
// spill into a 3rd+ row (see moonIndicatorStartY), so dots never collide
// with a deep moon stack.
function drawIndicatorDots(group, x, fromY, count, startY = INDICATOR_ROW_Y) {
    if (!count) return;
    const lastY = startY + (count - 1) * INDICATOR_GAP;
    group.appendChild(el('line', { class: 'drop-line', x1: x, y1: fromY, x2: x, y2: lastY }));
    for (let i = 0; i < count; i++) {
        group.appendChild(el('circle', { class: 'indicator-dot', cx: x, cy: startY + i * INDICATOR_GAP, r: INDICATOR_RADIUS }));
    }
}

// Keeps location-indicator dots (drawIndicatorDots) below whichever row a
// planet's moons bottom out at, since a planet with more than 4 moons now
// spills into a 3rd (or deeper) row instead of widening.
function moonIndicatorStartY(moonCount) {
    if (!moonCount) return INDICATOR_ROW_Y;
    const rowCount = Math.ceil(moonCount / 2);
    return Math.max(INDICATOR_ROW_Y, MOON_ROW_Y + (rowCount - 1) * MOON_ROW_STAGGER + MOON_RADIUS + 20);
}

function drawAsteroidField(group, body) {
    const rng = mulberry32(hashStringToSeed(body.id));
    const count = 5 + Math.floor(rng() * 4);
    for (let i = 0; i < count; i++) {
        const angle = rng() * Math.PI * 2;
        const dist = rng() * ASTEROID_RADIUS;
        const r = 3 + rng() * 5;
        group.appendChild(
            el('circle', {
                class: 'asteroid-dot',
                cx: Math.cos(angle) * dist,
                cy: Math.sin(angle) * dist,
                r,
            }),
        );
    }
}

// A planet's `ring.bands` (default 1) draws that many concentric ellipses
// instead of one, for planets whose rings are prominent enough to show as
// several distinct bands (e.g. Saturn) rather than a single line. Band 0
// always matches the original single-ring proportions exactly, so existing
// ringed bodies that don't set `bands` are unaffected.
function outerRingRadius(radius, ring) {
    const bands = ring.bands || 1;
    return radius * RING_RX_FACTOR * (1 + (bands - 1) * RING_BAND_GROWTH);
}

function drawPlanet(group, body, radius) {
    if (body.ring) {
        const bands = body.ring.bands || 1;
        for (let i = 0; i < bands; i++) {
            const growth = 1 + i * RING_BAND_GROWTH;
            const ring = el('ellipse', {
                class: 'ring',
                cx: 0,
                cy: 0,
                rx: radius * RING_RX_FACTOR * growth,
                ry: radius * RING_RY_FACTOR * growth,
                transform: `rotate(${body.ring.tilt})`,
            });
            // Alternating opacity suggests the gaps between real ring
            // bands (e.g. Saturn's Cassini Division) without needing a
            // dedicated CSS class per band.
            if (bands > 1) ring.setAttribute('stroke-opacity', i % 2 === 0 ? '0.6' : '0.35');
            group.appendChild(ring);
        }
    }
    group.appendChild(el('circle', { cx: 0, cy: 0, r: radius }));
}

function drawMoons(viewportEl, body, x, radius, ownLocations) {
    const moons = moonsOf(body.id);
    if (!moons.length) return;

    // moonsOf() already sorts closest-to-farthest. Filled 2 per row in that
    // order (see the MOON_ROW_Y constant comment), so row 0 holds the
    // closest two, row 1 the next two, and so on — a lone last moon centers
    // itself in its own row rather than sitting off to one side.
    const indicatorStartY = moonIndicatorStartY(moons.length);

    moons.forEach((moon, index) => {
        const row = Math.floor(index / 2);
        const col = index % 2;
        const rowLen = Math.min(2, moons.length - row * 2);
        const colOffset = -((rowLen - 1) * MOON_GAP) / 2 + col * MOON_GAP;
        const moonX = x + colOffset;
        const rowY = MOON_ROW_Y + row * MOON_ROW_STAGGER;

        viewportEl.appendChild(
            el('line', { class: 'drop-line', x1: x, y1: radius, x2: moonX, y2: rowY - MOON_RADIUS }),
        );

        // Attached to the live viewport before its children are added, so
        // drawLabel()'s getBBox() call reflects real rendered layout.
        const moonGroup = el('g', { class: 'node node-moon', 'data-id': moon.id, transform: `translate(${moonX},${rowY})` });
        viewportEl.appendChild(moonGroup);
        moonGroup.appendChild(el('circle', { cx: 0, cy: 0, r: MOON_RADIUS }));
        drawLabel(moonGroup, moon.name, MOON_RADIUS + 14);
        addHitArea(moonGroup, MOON_RADIUS);

        const moonLocations = ownLocations.filter((loc) => loc.locatedAt.kind === 'moon' && loc.locatedAt.moonId === moon.id);
        drawIndicatorDots(viewportEl, moonX, rowY + MOON_RADIUS, moonLocations.length, indicatorStartY);
    });
}

export function renderOrrery(viewportEl, state) {
    while (viewportEl.firstChild) viewportEl.removeChild(viewportEl.firstChild);

    const bodies = orbitalBodiesOf(state.systemId);

    const system = getById(state.systemId);
    const stars = system.stars || [{ type: system.type }];
    const primaryRadius = drawStar(viewportEl, STAR_X, BASELINE_Y, stars[0].type);
    let starExtent = primaryRadius;
    if (stars[1]) {
        const companionRadius = drawStar(viewportEl, STAR_X, BASELINE_Y + COMPANION_OFFSET_Y, stars[1].type);
        starExtent = Math.max(starExtent, COMPANION_OFFSET_Y + companionRadius);
    }

    let maxX = STAR_X;
    let maxRadius = starExtent;
    let maxIndicatorStartY = INDICATOR_ROW_Y;

    bodies.forEach((body, index) => {
        const x = STAR_X + FIRST_BODY_OFFSET + index * ORBIT_SPACING;
        const radius = radiusFor(body);
        maxX = Math.max(maxX, x + radius);

        const group = el('g', {
            class: `node node-${body.bodyType}`,
            'data-id': body.id,
            transform: `translate(${x},${BASELINE_Y})`,
        });
        if (body.hazard) group.setAttribute('data-hazard', body.hazard);
        // Attached to the live viewport before its children are added, so
        // drawLabel()'s getBBox() call reflects real rendered layout.
        viewportEl.appendChild(group);

        let hitRadius = radius;

        if (body.bodyType === 'planet') {
            drawPlanet(group, body, radius);
            if (body.ring) hitRadius = Math.max(hitRadius, outerRingRadius(radius, body.ring));
        } else if (body.bodyType === 'asteroidField') {
            drawAsteroidField(group, body);
        } else {
            const icon = createIcon(body.bodyType, { size: ICON_HALF * 2 });
            icon.setAttribute('x', -ICON_HALF);
            icon.setAttribute('y', -ICON_HALF);
            group.appendChild(icon);
        }

        drawLabel(group, body.name, -(radius + 10));
        addHitArea(group, hitRadius);
        maxRadius = Math.max(maxRadius, hitRadius);

        const ownLocations = locationsOf(body.id);
        const directLocations = ownLocations.filter((loc) => loc.locatedAt.kind !== 'moon');
        const indicatorStartY = body.bodyType === 'planet' ? moonIndicatorStartY(moonsOf(body.id).length) : INDICATOR_ROW_Y;
        maxIndicatorStartY = Math.max(maxIndicatorStartY, indicatorStartY);
        drawIndicatorDots(viewportEl, x, radius, directLocations.length, indicatorStartY);

        if (body.bodyType === 'planet') drawMoons(viewportEl, body, x, radius, ownLocations);
    });

    return {
        minX: STAR_X,
        maxX: maxX + 50,
        minY: BASELINE_Y - maxRadius - 40,
        maxY: maxIndicatorStartY + 40,
    };
}

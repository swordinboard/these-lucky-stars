import { orbitalBodiesOf, moonsOf, locationsOf } from './data.js';
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
const FIRST_BODY_OFFSET = 140;
const ORBIT_SPACING = 130;
const BASELINE_Y = 0;

const PLANET_RADIUS = { small: 10, medium: 18, large: 28 };
const ICON_HALF = 12;
const ASTEROID_RADIUS = 24;
const MOON_RADIUS = 8;
// Moons split across two rows by distance (closer half up top, farther half
// below, see drawMoons) rather than sitting in one flat row, so neighboring
// names don't line up at the same height and collide when a system has
// several moons.
const MOON_ROW_Y = 50;
const MOON_ROW_STAGGER = 45;
const MOON_GAP = 34;
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
// vertically below the drop-line so the count reads at a glance.
function drawIndicatorDots(group, x, fromY, count) {
    if (!count) return;
    const lastY = INDICATOR_ROW_Y + (count - 1) * INDICATOR_GAP;
    group.appendChild(el('line', { class: 'drop-line', x1: x, y1: fromY, x2: x, y2: lastY }));
    for (let i = 0; i < count; i++) {
        group.appendChild(el('circle', { class: 'indicator-dot', cx: x, cy: INDICATOR_ROW_Y + i * INDICATOR_GAP, r: INDICATOR_RADIUS }));
    }
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

    // moonsOf() already sorts closest-to-farthest. The closer half goes in
    // the upper row and the farther half in the lower row, each row still
    // running left to right by increasing distance. Both rows are spread
    // across the same total width regardless of how many moons land in
    // them, so a row with fewer moons gets proportionally more breathing
    // room between names instead of the flat, cramped single-row spacing
    // that used to cause overlapping names.
    const totalWidth = (moons.length - 1) * MOON_GAP;
    const half = Math.ceil(moons.length / 2);
    const rows = [moons.slice(0, half), moons.slice(half)];

    rows.forEach((rowMoons, rowIndex) => {
        if (!rowMoons.length) return;
        const rowY = MOON_ROW_Y + rowIndex * MOON_ROW_STAGGER;
        const itemGap = rowMoons.length > 1 ? totalWidth / (rowMoons.length - 1) : 0;
        const rowOffset = -((rowMoons.length - 1) * itemGap) / 2;

        rowMoons.forEach((moon, i) => {
            const moonX = x + rowOffset + i * itemGap;

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
            drawIndicatorDots(viewportEl, moonX, rowY + MOON_RADIUS, moonLocations.length);
        });
    });
}

export function renderOrrery(viewportEl, state) {
    while (viewportEl.firstChild) viewportEl.removeChild(viewportEl.firstChild);

    const bodies = orbitalBodiesOf(state.systemId);

    const star = el('path', {
        class: 'star',
        d: `M ${STAR_X} ${BASELINE_Y - STAR_RADIUS} A ${STAR_RADIUS} ${STAR_RADIUS} 0 0 1 ${STAR_X} ${BASELINE_Y + STAR_RADIUS} Z`,
    });
    viewportEl.appendChild(star);

    let maxX = STAR_X;
    let maxRadius = STAR_RADIUS;

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
        drawIndicatorDots(viewportEl, x, radius, directLocations.length);

        if (body.bodyType === 'planet') drawMoons(viewportEl, body, x, radius, ownLocations);
    });

    return {
        minX: STAR_X,
        maxX: maxX + 50,
        minY: BASELINE_Y - maxRadius - 40,
        maxY: INDICATOR_ROW_Y + 40,
    };
}

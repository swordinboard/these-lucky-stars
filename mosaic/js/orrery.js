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
const MOON_ROW_Y = 60;
const MOON_GAP = 34;
const INDICATOR_ROW_Y = 95;
const INDICATOR_RADIUS = 3;
const INDICATOR_GAP = 10;

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

function drawLabel(group, text, y) {
    const label = el('text', { class: 'node-label', y });
    label.textContent = text;
    group.appendChild(label);
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

function drawPlanet(group, body, radius) {
    if (body.ring) {
        const ring = el('ellipse', {
            class: 'ring',
            cx: 0,
            cy: 0,
            rx: radius * 1.55,
            ry: radius * 0.5,
            transform: `rotate(${body.ring.tilt})`,
        });
        group.appendChild(ring);
    }
    group.appendChild(el('circle', { cx: 0, cy: 0, r: radius }));
}

function drawMoons(viewportEl, body, x, radius, ownLocations) {
    const moons = moonsOf(body.id);
    if (!moons.length) return;

    const startOffset = -((moons.length - 1) * MOON_GAP) / 2;

    moons.forEach((moon, index) => {
        const moonX = x + startOffset + index * MOON_GAP;

        viewportEl.appendChild(
            el('line', { class: 'drop-line', x1: x, y1: radius, x2: moonX, y2: MOON_ROW_Y - MOON_RADIUS }),
        );

        const moonGroup = el('g', { class: 'node node-moon', 'data-id': moon.id, transform: `translate(${moonX},${MOON_ROW_Y})` });
        moonGroup.appendChild(el('circle', { cx: 0, cy: 0, r: MOON_RADIUS }));
        drawLabel(moonGroup, moon.name, MOON_RADIUS + 14);
        addHitArea(moonGroup, MOON_RADIUS);
        viewportEl.appendChild(moonGroup);

        const moonLocations = ownLocations.filter((loc) => loc.locatedAt.kind === 'moon' && loc.locatedAt.moonId === moon.id);
        drawIndicatorDots(viewportEl, moonX, MOON_ROW_Y + MOON_RADIUS, moonLocations.length);
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

        let hitRadius = radius;

        if (body.bodyType === 'planet') {
            drawPlanet(group, body, radius);
            if (body.ring) hitRadius = Math.max(hitRadius, radius * 1.55);
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
        viewportEl.appendChild(group);
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

import { orbitalBodiesOf, moonsOf, locationsOf } from './data.js';
import { createIcon } from './icons.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const STAR_X = 60;
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

function el(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
}

function hashStringToSeed(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
        h ^= str.charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return h >>> 0;
}

function mulberry32(seed) {
    let a = seed;
    return function next() {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
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

function drawIndicatorDot(group, x, fromY) {
    group.appendChild(el('line', { class: 'drop-line', x1: x, y1: fromY, x2: x, y2: INDICATOR_ROW_Y }));
    group.appendChild(el('circle', { class: 'indicator-dot', cx: x, cy: INDICATOR_ROW_Y, r: INDICATOR_RADIUS }));
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
        viewportEl.appendChild(moonGroup);

        const moonLocations = ownLocations.filter((loc) => loc.locatedAt.kind === 'moon' && loc.locatedAt.moonId === moon.id);
        if (moonLocations.length) drawIndicatorDot(viewportEl, moonX, MOON_ROW_Y + MOON_RADIUS);
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

    let maxX = STAR_X + STAR_RADIUS;
    let maxRadius = 0;

    bodies.forEach((body, index) => {
        const x = STAR_X + FIRST_BODY_OFFSET + index * ORBIT_SPACING;
        const radius = radiusFor(body);
        maxX = Math.max(maxX, x + radius);
        maxRadius = Math.max(maxRadius, radius);

        const group = el('g', {
            class: `node node-${body.bodyType}`,
            'data-id': body.id,
            transform: `translate(${x},${BASELINE_Y})`,
        });

        if (body.bodyType === 'planet') {
            drawPlanet(group, body, radius);
        } else if (body.bodyType === 'asteroidField') {
            drawAsteroidField(group, body);
        } else {
            const icon = createIcon(body.bodyType, { size: ICON_HALF * 2 });
            icon.setAttribute('x', -ICON_HALF);
            icon.setAttribute('y', -ICON_HALF);
            group.appendChild(icon);
        }

        drawLabel(group, body.name, -(radius + 10));
        viewportEl.appendChild(group);

        const ownLocations = locationsOf(body.id);
        const directLocations = ownLocations.filter((loc) => loc.locatedAt.kind !== 'moon');
        if (directLocations.length) drawIndicatorDot(viewportEl, x, radius);

        if (body.bodyType === 'planet') drawMoons(viewportEl, body, x, radius, ownLocations);
    });

    return {
        minX: STAR_X - STAR_RADIUS - 20,
        maxX: maxX + 50,
        minY: BASELINE_Y - maxRadius - 40,
        maxY: INDICATOR_ROW_Y + 40,
    };
}

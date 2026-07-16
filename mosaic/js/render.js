import { clusters, systemsOf, clusterRoutes, systemRoutesWithin } from './data.js';
import { hashStringToSeed, mulberry32 } from './random.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const SYSTEM_NODE_RADIUS = 16;
const MIN_SECTOR_RADIUS = 60;
const MAX_SECTOR_RADIUS = 200;
const CLOUD_RADIUS_FACTOR = 1.45;
const CLOUD_ASPECT_X_RANGE = [1.05, 1.3];
const CLOUD_ASPECT_Y_RANGE = [0.75, 0.9];
const CLOUD_ROTATION_RANGE = 18;

// A big, soft galaxy silhouette behind the cluster-level map only. Rather
// than one single epicenter, each star-cloud cluster gets its own "flare up"
// (a soft disc plus a brighter bulge at its core) — Danswai Cloud's is the
// largest/brightest, Hart's and Weisman's are smaller secondary ones — so the
// backdrop reads as an irregular galaxy's uneven, layered glow instead of a
// single tidy hotspot. A faint shared ambient halo sits underneath all of
// them, reaching well past the charted clusters so no corner of the map is
// left flat black. On top of that, clusters with their own accent color get
// a soft, low-opacity patch of that same color behind them, so the accent
// hues already used for their nodes bleed gently into the backdrop and tie
// the whole map together rather than sitting on a flat, uniform wash.
const GALAXY_HALO = { cx: 1515, cy: 1133, rx: 2100, ry: 1850, rotation: 8 };

const FLARE_SIZES = {
    primary: { disc: { rx: 1300, ry: 1120 }, bulge: { rx: 300, ry: 260 } },
    secondary: { disc: { rx: 760, ry: 640 }, bulge: { rx: 170, ry: 145 } },
};

const ACCENT_PATCH_RADIUS = 300;

// A decorative color streak — a soft, wavy ribbon that swings between Pistil
// Cluster and Local Cluster by way of Teegarden, swooping up over the top of
// Danswai Cloud along the way. It's built from the same cluster data as
// everything else (only the swoop's peak has no cluster of its own to anchor
// to, so it's placed a fixed distance above Danswai), and its color runs
// through each accented cluster's own hue — violet at Pistil, teal as it
// crosses Danswai, blue by the time it reaches Teegarden and Local — so it
// visually threads them together rather than reading as a separate layer.
const COLOR_STREAK_IDS = ['cluster-pistil', 'cluster-danswai', 'cluster-teegarden', 'cluster-local'];
const COLOR_STREAK_SWOOP_HEIGHT = 220;
const COLOR_STREAK_BOW_WIDTH = 130;
const COLOR_STREAK_GRADIENT_ID = 'galaxy-streak-gradient';
const COLOR_STREAK_STOPS = [
    { offset: '0%', color: '#b073e0' },
    { offset: '45%', color: '#45c9a8' },
    { offset: '100%', color: '#5a8fd6' },
];

function clusterById(id) {
    return clusters().find((entity) => entity.id === id);
}

// Converts a handful of waypoints into one smooth curve (a Catmull-Rom spline
// expressed as cubic beziers) so the streak reads as a single flowing wave
// rather than a straight-edged connect-the-dots line.
function smoothPathThrough(points) {
    const padded = [points[0], ...points, points[points.length - 1]];
    let d = `M ${padded[1].x},${padded[1].y}`;
    for (let i = 1; i < padded.length - 2; i++) {
        const [p0, p1, p2, p3] = [padded[i - 1], padded[i], padded[i + 1], padded[i + 2]];
        const cp1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
        const cp2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };
        d += ` C ${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${p2.x},${p2.y}`;
    }
    return d;
}

function colorStreakPoints() {
    const [pistil, danswai, teegarden, local] = COLOR_STREAK_IDS.map((id) => clusterById(id).position);
    const swoop = { x: danswai.x, y: danswai.y - COLOR_STREAK_SWOOP_HEIGHT };
    // Bows toward Weisman Cloud on its way down to Local, so the streak reads
    // as one continuous wave rather than straightening out for its last leg.
    const bow = { x: (teegarden.x + local.x) / 2 - COLOR_STREAK_BOW_WIDTH, y: (teegarden.y + local.y) / 2 };
    return [pistil, swoop, teegarden, bow, local];
}

function colorStreakGradient(points) {
    const gradient = document.createElementNS(SVG_NS, 'linearGradient');
    gradient.setAttribute('id', COLOR_STREAK_GRADIENT_ID);
    gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
    gradient.setAttribute('x1', points[0].x);
    gradient.setAttribute('y1', points[0].y);
    gradient.setAttribute('x2', points[points.length - 1].x);
    gradient.setAttribute('y2', points[points.length - 1].y);
    for (const { offset, color } of COLOR_STREAK_STOPS) {
        const stop = document.createElementNS(SVG_NS, 'stop');
        stop.setAttribute('offset', offset);
        stop.setAttribute('stop-color', color);
        gradient.appendChild(stop);
    }
    return gradient;
}

function renderColorStreak(group) {
    const points = colorStreakPoints();

    const defs = document.createElementNS(SVG_NS, 'defs');
    defs.appendChild(colorStreakGradient(points));
    group.appendChild(defs);

    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('class', 'galaxy-color-streak');
    path.setAttribute('d', smoothPathThrough(points));
    path.setAttribute('stroke', `url(#${COLOR_STREAK_GRADIENT_ID})`);
    group.appendChild(path);
}

function galaxyEllipse(className, shape) {
    const ellipse = document.createElementNS(SVG_NS, 'ellipse');
    ellipse.setAttribute('class', className);
    ellipse.setAttribute('cx', shape.cx);
    ellipse.setAttribute('cy', shape.cy);
    ellipse.setAttribute('rx', shape.rx);
    ellipse.setAttribute('ry', shape.ry);
    ellipse.setAttribute('transform', `rotate(${shape.rotation} ${shape.cx} ${shape.cy})`);
    return ellipse;
}

// A cloud's flare shares its rotation with its own rendered ellipse (see
// cloudShape below) so the glow reads as coming from that shape rather than
// sitting arbitrarily behind it. The radius argument only affects size, not
// rotation, so it's safe to call this before the sector radius is known.
function flareShapesFor(entity) {
    const size = entity.id === 'cluster-danswai' ? FLARE_SIZES.primary : FLARE_SIZES.secondary;
    const { rotation } = cloudShape(entity, 1);
    const { x: cx, y: cy } = entity.position;
    return {
        disc: { cx, cy, rotation, rx: size.disc.rx, ry: size.disc.ry },
        bulge: { cx, cy, rotation, rx: size.bulge.rx, ry: size.bulge.ry },
    };
}

function accentPatchShapeFor(entity) {
    const { x: cx, y: cy } = entity.position;
    return { cx, cy, rx: ACCENT_PATCH_RADIUS, ry: ACCENT_PATCH_RADIUS, rotation: 0 };
}

function renderGalaxyBackdrop(viewportEl) {
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('class', 'galaxy-backdrop');

    group.appendChild(galaxyEllipse('galaxy-halo', GALAXY_HALO));

    for (const entity of clusters()) {
        if (!entity.accent) continue;
        group.appendChild(galaxyEllipse(`galaxy-accent-patch galaxy-accent-${entity.accent}`, accentPatchShapeFor(entity)));
    }

    for (const entity of clusters()) {
        if (entity.type !== 'star cloud') continue;
        const { disc, bulge } = flareShapesFor(entity);
        group.appendChild(galaxyEllipse('galaxy-disc', disc));
        group.appendChild(galaxyEllipse('galaxy-bulge', bulge));
    }

    renderColorStreak(group);

    viewportEl.appendChild(group);
}

// Star clouds render larger than ordinary clusters/sectors, and as an oblong
// (elongated, slightly rotated) ellipse rather than a circle, to visually
// set them apart — similar to how differently-sized/shaped bodies are
// distinguished in the orrery view. The exact aspect ratio and rotation are
// seeded per cluster id (reusing the same deterministic-but-varied PRNG
// pattern used for the asteroid field and starfield) so each cloud looks a
// little different from the others without being random on every reload.
// A cluster can override the seeded rotation with an explicit `cloudRotation`
// (degrees) in the data when a specific orientation is wanted.
function cloudShape(entity, baseRadius) {
    const rand = mulberry32(hashStringToSeed(entity.id));
    const aspectX = CLOUD_ASPECT_X_RANGE[0] + rand() * (CLOUD_ASPECT_X_RANGE[1] - CLOUD_ASPECT_X_RANGE[0]);
    const aspectY = CLOUD_ASPECT_Y_RANGE[0] + rand() * (CLOUD_ASPECT_Y_RANGE[1] - CLOUD_ASPECT_Y_RANGE[0]);
    const seededRotation = (rand() * 2 - 1) * CLOUD_ROTATION_RANGE;
    const rotation = entity.cloudRotation ?? seededRotation;
    const r = baseRadius * CLOUD_RADIUS_FACTOR;
    return { rx: r * aspectX, ry: r * aspectY, rotation };
}

// A single scalar "how far from center does this entity's shape extend"
// value, used for the auto-fit bounds — conservative (the ellipse's longer
// semi-axis) since a rotated ellipse always fits within a circle of that
// radius, regardless of which way it's actually rotated.
function boundingRadiusFor(entity, baseRadius) {
    if (entity.type !== 'star cloud') return baseRadius;
    const { rx, ry } = cloudShape(entity, baseRadius);
    return Math.max(rx, ry);
}

function entitiesAndRoutesFor(state) {
    if (state.level === 'cluster') {
        return { entities: clusters(), routes: clusterRoutes() };
    }
    return { entities: systemsOf(state.clusterId), routes: systemRoutesWithin(state.clusterId) };
}

function nearestNeighborDistance(entities) {
    let minDist = Infinity;
    for (let i = 0; i < entities.length; i++) {
        for (let j = 0; j < entities.length; j++) {
            if (i === j) continue;
            const dist = Math.hypot(
                entities[i].position.x - entities[j].position.x,
                entities[i].position.y - entities[j].position.y,
            );
            if (dist < minDist) minDist = dist;
        }
    }
    return Number.isFinite(minDist) ? minDist : MAX_SECTOR_RADIUS * 2;
}

// Cluster-level "sectors" are large, tap-friendly zones sized relative to
// how close together the clusters are, rather than a fixed small node radius.
function sectorRadiusFor(entities) {
    if (entities.length < 2) return MAX_SECTOR_RADIUS;
    const nearest = nearestNeighborDistance(entities);
    return Math.min(MAX_SECTOR_RADIUS, Math.max(MIN_SECTOR_RADIUS, nearest * 0.45));
}

function boundsOf(entities, radiusForEntity) {
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    for (const entity of entities) {
        const r = radiusForEntity(entity);
        minX = Math.min(minX, entity.position.x - r);
        maxX = Math.max(maxX, entity.position.x + r);
        minY = Math.min(minY, entity.position.y - r);
        maxY = Math.max(maxY, entity.position.y + r);
    }
    return { minX, maxX, minY, maxY };
}

export function renderLevel(viewportEl, state) {
    while (viewportEl.firstChild) viewportEl.removeChild(viewportEl.firstChild);

    if (state.level === 'cluster') renderGalaxyBackdrop(viewportEl);

    const { entities, routes } = entitiesAndRoutesFor(state);
    const byId = new Map(entities.map((entity) => [entity.id, entity]));
    const isSectorView = state.level === 'cluster';
    const radius = isSectorView ? sectorRadiusFor(entities) : SYSTEM_NODE_RADIUS;

    const edgeGroup = document.createElementNS(SVG_NS, 'g');
    edgeGroup.setAttribute('class', 'edges');
    viewportEl.appendChild(edgeGroup);

    for (const route of routes) {
        const from = byId.get(route.from);
        const to = byId.get(route.to);
        if (!from || !to) continue;

        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', from.position.x);
        line.setAttribute('y1', from.position.y);
        line.setAttribute('x2', to.position.x);
        line.setAttribute('y2', to.position.y);
        line.setAttribute('class', route.uncertain ? 'route-line route-line--uncertain' : 'route-line');

        if (route.label) {
            const title = document.createElementNS(SVG_NS, 'title');
            title.textContent = route.label;
            line.appendChild(title);
        }

        edgeGroup.appendChild(line);
    }

    const nodeGroup = document.createElementNS(SVG_NS, 'g');
    nodeGroup.setAttribute('class', 'nodes');
    viewportEl.appendChild(nodeGroup);

    for (const entity of entities) {
        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', `node node-${entity.kind}`);
        g.setAttribute('transform', `translate(${entity.position.x},${entity.position.y})`);
        g.setAttribute('data-id', entity.id);
        if (entity.accent) g.setAttribute('data-accent', entity.accent);

        // Clouds only ever appear in the sector view, which always centers
        // its labels (see below) rather than offsetting by shape size, so
        // there's no need to track a label offset for the ellipse case.
        if (isSectorView && entity.type === 'star cloud') {
            const { rx, ry, rotation } = cloudShape(entity, radius);
            const ellipse = document.createElementNS(SVG_NS, 'ellipse');
            ellipse.setAttribute('rx', rx);
            ellipse.setAttribute('ry', ry);
            ellipse.setAttribute('transform', `rotate(${rotation})`);
            g.appendChild(ellipse);
        } else {
            const circle = document.createElementNS(SVG_NS, 'circle');
            circle.setAttribute('r', radius);
            g.appendChild(circle);
        }

        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('class', 'node-label');
        if (isSectorView) {
            label.setAttribute('y', '6');
            label.setAttribute('dominant-baseline', 'middle');
        } else {
            label.setAttribute('y', radius + 16);
        }
        label.textContent = entity.name;
        g.appendChild(label);

        nodeGroup.appendChild(g);
    }

    return entities.length
        ? boundsOf(entities, (entity) => (isSectorView ? boundingRadiusFor(entity, radius) : radius))
        : null;
}

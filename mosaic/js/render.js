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

// A big, soft galaxy silhouette behind the cluster-level map only (see
// FORMATTING.md's "skewed over symmetric" note — the same organic-over-tidy
// preference applies here). One large lenticular "core" plus a couple of
// smaller offset "arm" blobs at different rotations reads as one irregular
// galaxy shape rather than a plain ellipse. The core sits up and to the left
// of the charted clusters (see their bounding box), so the clusters occupy
// one edge of the disc rather than its dead center — implying this is a
// corner of a much larger galaxy, not the whole of it.
const GALAXY_CORE = { cx: 700, cy: 500, rx: 1800, ry: 600, rotation: -20 };
const GALAXY_ARMS = [
    { cx: 1400, cy: 1300, rx: 900, ry: 280, rotation: 15 },
    { cx: 2000, cy: 900, rx: 700, ry: 220, rotation: -35 },
];

function renderGalaxyBackdrop(viewportEl) {
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('class', 'galaxy-backdrop');

    const core = document.createElementNS(SVG_NS, 'ellipse');
    core.setAttribute('class', 'galaxy-core');
    core.setAttribute('cx', GALAXY_CORE.cx);
    core.setAttribute('cy', GALAXY_CORE.cy);
    core.setAttribute('rx', GALAXY_CORE.rx);
    core.setAttribute('ry', GALAXY_CORE.ry);
    core.setAttribute('transform', `rotate(${GALAXY_CORE.rotation} ${GALAXY_CORE.cx} ${GALAXY_CORE.cy})`);
    group.appendChild(core);

    for (const arm of GALAXY_ARMS) {
        const ellipse = document.createElementNS(SVG_NS, 'ellipse');
        ellipse.setAttribute('class', 'galaxy-arm');
        ellipse.setAttribute('cx', arm.cx);
        ellipse.setAttribute('cy', arm.cy);
        ellipse.setAttribute('rx', arm.rx);
        ellipse.setAttribute('ry', arm.ry);
        ellipse.setAttribute('transform', `rotate(${arm.rotation} ${arm.cx} ${arm.cy})`);
        group.appendChild(ellipse);
    }

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

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
// a loose, painterly puff of that same color behind them (several soft,
// randomly-offset blobs rather than one crisp circle, like dabs of a soft
// brush), so the accent hues already used for their nodes bleed into the
// backdrop as an organic, hand-painted-looking wash. A scattered layer of
// small bright specks sits above that wash — a second, denser starfield
// living in the map's own coordinate space (unlike the CSS starfield, which
// is fixed to the screen), so it pans and zooms with the clusters and gives
// the nebula clouds a sense of depth.
//
// Every size below was tuned by eye against one specific cluster layout.
// Rather than fixed pixel values, they're all scaled at render time by
// backdropScale() (see below), so repositioning the clusters — or laying
// them out at a different px-per-lightyear scale entirely — grows or
// shrinks the whole backdrop to match instead of requiring a re-tune.
const BACKDROP_REFERENCE_SPACING = 269.8; // clusters' nearest-neighbor spacing when these sizes were tuned

function backdropScale() {
    return nearestNeighborDistance(clusters()) / BACKDROP_REFERENCE_SPACING;
}

// All wash sizes below are 15% larger than their originally-tuned values
// (2100/1850, 1300/1120, 300/260, 760/640, 170/145, [200,420], 260) — bumped
// up per request, on top of whatever backdropScale() applies for the
// current layout.
const GALAXY_HALO_SIZE = { rx: 2415, ry: 2127.5, rotation: 8 };

const FLARE_SIZES = {
    primary: { disc: { rx: 1495, ry: 1288 }, bulge: { rx: 345, ry: 299 } },
    secondary: { disc: { rx: 874, ry: 736 }, bulge: { rx: 195.5, ry: 166.75 } },
};

const ACCENT_PUFF_COUNT = 4;
const ACCENT_PUFF_RADIUS_RANGE = [230, 483];
const ACCENT_PUFF_OFFSET_RANGE = 299;

// A third color wash with no cluster of its own to anchor to — a warm rust
// tone washed over the Lee/Fold/Morrison corner of the map (bottom-right),
// centered on their live midpoint (recomputed from those clusters' actual
// positions), so that corner isn't left as a plain amber-on-amber stretch
// next to the violet and blue washes elsewhere.
const RUST_WASH_ID = 'galaxy-rust-wash';
const RUST_WASH_CLUSTER_IDS = ['cluster-lee', 'cluster-fold', 'cluster-morrison'];

// A second, smaller rust patch fanning out from Alpha/Beta toward Weisman
// Cloud, so the wash reaches that corner too rather than stopping at Lee/Fold.
const RUST_WASH_ALPHA_BETA_ID = 'galaxy-rust-wash-alpha-beta';
const RUST_WASH_ALPHA_BETA_SPREAD = Math.PI; // half-circle arc, biased toward Weisman

// A third rust patch anchored on Caleph, fanning toward Nor Cluster so the
// wash reads as reaching nearly to Nor without actually touching it.
const RUST_WASH_CALEPH_ID = 'galaxy-rust-wash-caleph';
const RUST_WASH_CALEPH_SPREAD = Math.PI * 0.7; // narrower arc, tightly biased toward Nor

// A fourth rust patch anchored between Morrison and Hope, fanning back toward
// the Lee/Fold/Morrison wash so the two blend into one irregular shape rather
// than reading as a single clean ellipse over that corner.
const RUST_WASH_MORRISON_HOPE_ID = 'galaxy-rust-wash-morrison-hope';
const RUST_WASH_MORRISON_HOPE_SPREAD = Math.PI; // half-circle arc, biased toward Lee/Fold/Morrison

// A teal wash fanning off Lee Cluster's top-left corner, toward Hart Cloud,
// so it blends into Hart's existing teal glow rather than sitting isolated.
// Lee itself carries a matching violet accent (see the accent puff loop
// below), so this corner reads as a teal-into-violet blend.
const LEE_TEAL_WASH_ID = 'galaxy-wash-lee-teal';
const LEE_TEAL_WASH_SPREAD = Math.PI * 0.8; // wide arc, biased toward Hart's top-left direction

// Stars cluster densely around the brightest points on the map — the star
// clouds' own flares — and thin out with distance, rather than scattering
// evenly over the whole halo. Weights roughly follow each flare's own
// brightness (Danswai's primary flare draws the most, Hart/Weisman's
// smaller secondary flares draw less).
const MAP_STAR_TOTAL = 480;
const MAP_STAR_CENTERS = [
    { id: 'cluster-danswai', weight: 0.45, maxDist: 1300 },
    { id: 'cluster-hart', weight: 0.3, maxDist: 800 },
    { id: 'cluster-weisman', weight: 0.25, maxDist: 800 },
];
const MAP_STAR_FAN_POWER = 2.4; // >1 biases samples toward the center (dense core, sparse tail)
// Tiny — sized in map-data units, which get scaled down a lot by the cluster
// view's fit-to-screen zoom (roughly 0.1-0.3x at the default fit).
const MAP_STAR_RADIUS_RANGE = [2.1, 4.55];
const MAP_STAR_OPACITY_RANGE = [0.25, 0.65];

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
function flareShapesFor(entity, scale) {
    const size = entity.id === 'cluster-danswai' ? FLARE_SIZES.primary : FLARE_SIZES.secondary;
    const { rotation } = cloudShape(entity, 1);
    const { x: cx, y: cy } = entity.position;
    return {
        disc: { cx, cy, rotation, rx: size.disc.rx * scale, ry: size.disc.ry * scale },
        bulge: { cx, cy, rotation, rx: size.bulge.rx * scale, ry: size.bulge.ry * scale },
    };
}

function clusterPosition(id) {
    return clusters().find((entity) => entity.id === id).position;
}

function centroidOf(ids) {
    const positions = ids.map(clusterPosition);
    return {
        x: positions.reduce((sum, p) => sum + p.x, 0) / positions.length,
        y: positions.reduce((sum, p) => sum + p.y, 0) / positions.length,
    };
}

// A handful of soft, randomly-offset blobs around a position rather than one
// clean circle, so the color reads as a loose painted puff. Seeded per id so
// it's stable across renders — used both for a cluster's own accent (seeded
// by cluster id) and for the standalone rust washes (seeded by their own id).
// By default the blobs scatter in every direction; passing angleCenter (with
// a narrower angleSpread) instead biases them toward one side, for a puff
// that "fans" toward something rather than surrounding its anchor evenly.
function accentPuffShapesFor(seedId, position, scale, { angleCenter = null, angleSpread = Math.PI * 2 } = {}) {
    const rand = mulberry32(hashStringToSeed(`${seedId}-puff`));
    const puffs = [];
    for (let i = 0; i < ACCENT_PUFF_COUNT; i++) {
        const angle = angleCenter === null
            ? rand() * Math.PI * 2
            : angleCenter + (rand() - 0.5) * angleSpread;
        const dist = rand() * ACCENT_PUFF_OFFSET_RANGE * scale;
        const r = (ACCENT_PUFF_RADIUS_RANGE[0] + rand() * (ACCENT_PUFF_RADIUS_RANGE[1] - ACCENT_PUFF_RADIUS_RANGE[0])) * scale;
        puffs.push({
            cx: position.x + Math.cos(angle) * dist,
            cy: position.y + Math.sin(angle) * dist,
            rx: r,
            ry: r * (0.7 + rand() * 0.3),
            rotation: rand() * 360,
        });
    }
    return puffs;
}

// A second, denser starfield scattered across the galaxy silhouette itself
// (in map coordinates, so it pans/zooms with the clusters) rather than the
// screen-fixed CSS starfield, for a bit of parallax depth behind the nebula
// colors. Stars fan out from each star cloud's own flare — the brightest
// points on the map — rather than spreading evenly, so they read as thrown
// off those bright cores instead of a uniform haze.
function renderMapStarfield(group, scale) {
    const rand = mulberry32(hashStringToSeed('galaxy-map-starfield'));
    for (const center of MAP_STAR_CENTERS) {
        const position = clusterPosition(center.id);
        const count = Math.round(MAP_STAR_TOTAL * center.weight);
        const maxDist = center.maxDist * scale;
        for (let i = 0; i < count; i++) {
            const angle = rand() * Math.PI * 2;
            const dist = Math.pow(rand(), MAP_STAR_FAN_POWER) * maxDist;
            const star = document.createElementNS(SVG_NS, 'circle');
            star.setAttribute('class', 'galaxy-star-speck');
            star.setAttribute('cx', (position.x + Math.cos(angle) * dist).toFixed(1));
            star.setAttribute('cy', (position.y + Math.sin(angle) * dist).toFixed(1));
            star.setAttribute('r', ((MAP_STAR_RADIUS_RANGE[0] + rand() * (MAP_STAR_RADIUS_RANGE[1] - MAP_STAR_RADIUS_RANGE[0])) * scale).toFixed(2));
            star.setAttribute('opacity', (MAP_STAR_OPACITY_RANGE[0] + rand() * (MAP_STAR_OPACITY_RANGE[1] - MAP_STAR_OPACITY_RANGE[0])).toFixed(2));
            group.appendChild(star);
        }
    }
}

function renderGalaxyBackdrop(viewportEl) {
    const group = document.createElementNS(SVG_NS, 'g');
    group.setAttribute('class', 'galaxy-backdrop');

    const scale = backdropScale();
    const danswaiPos = clusterPosition('cluster-danswai');
    const halo = {
        cx: danswaiPos.x,
        cy: danswaiPos.y,
        rx: GALAXY_HALO_SIZE.rx * scale,
        ry: GALAXY_HALO_SIZE.ry * scale,
        rotation: GALAXY_HALO_SIZE.rotation,
    };
    group.appendChild(galaxyEllipse('galaxy-halo', halo));

    const puffGroup = document.createElementNS(SVG_NS, 'g');
    puffGroup.setAttribute('class', 'galaxy-accent-puffs');
    for (const entity of clusters()) {
        if (!entity.accent) continue;
        for (const shape of accentPuffShapesFor(entity.id, entity.position, scale)) {
            puffGroup.appendChild(galaxyEllipse(`galaxy-accent-patch galaxy-accent-${entity.accent}`, shape));
        }
    }
    const rustWashPosition = centroidOf(RUST_WASH_CLUSTER_IDS);
    for (const shape of accentPuffShapesFor(RUST_WASH_ID, rustWashPosition, scale)) {
        puffGroup.appendChild(galaxyEllipse('galaxy-accent-patch galaxy-accent-rust', shape));
    }

    const morrisonHopeMid = centroidOf(['cluster-morrison', 'cluster-hope']);
    const morrisonHopeFanAngle = Math.atan2(
        rustWashPosition.y - morrisonHopeMid.y,
        rustWashPosition.x - morrisonHopeMid.x,
    );
    const morrisonHopeFanOptions = { angleCenter: morrisonHopeFanAngle, angleSpread: RUST_WASH_MORRISON_HOPE_SPREAD };
    for (const shape of accentPuffShapesFor(RUST_WASH_MORRISON_HOPE_ID, morrisonHopeMid, scale, morrisonHopeFanOptions)) {
        puffGroup.appendChild(galaxyEllipse('galaxy-accent-patch galaxy-accent-rust', shape));
    }

    const alphaBetaMid = centroidOf(['cluster-alpha', 'cluster-beta']);
    const weismanPos = clusterPosition('cluster-weisman');
    const fanAngle = Math.atan2(weismanPos.y - alphaBetaMid.y, weismanPos.x - alphaBetaMid.x);
    const fanOptions = { angleCenter: fanAngle, angleSpread: RUST_WASH_ALPHA_BETA_SPREAD };
    for (const shape of accentPuffShapesFor(RUST_WASH_ALPHA_BETA_ID, alphaBetaMid, scale, fanOptions)) {
        puffGroup.appendChild(galaxyEllipse('galaxy-accent-patch galaxy-accent-rust', shape));
    }

    const calephPos = clusterPosition('cluster-caleph');
    const norPos = clusterPosition('cluster-nor');
    const calephFanAngle = Math.atan2(norPos.y - calephPos.y, norPos.x - calephPos.x);
    const calephFanOptions = { angleCenter: calephFanAngle, angleSpread: RUST_WASH_CALEPH_SPREAD };
    for (const shape of accentPuffShapesFor(RUST_WASH_CALEPH_ID, calephPos, scale, calephFanOptions)) {
        puffGroup.appendChild(galaxyEllipse('galaxy-accent-patch galaxy-accent-rust', shape));
    }

    const leePos = clusterPosition('cluster-lee');
    const leeHartPos = clusterPosition('cluster-hart');
    const leeTealFanAngle = Math.atan2(leeHartPos.y - leePos.y, leeHartPos.x - leePos.x);
    const leeTealFanOptions = { angleCenter: leeTealFanAngle, angleSpread: LEE_TEAL_WASH_SPREAD };
    for (const shape of accentPuffShapesFor(LEE_TEAL_WASH_ID, leePos, scale, leeTealFanOptions)) {
        puffGroup.appendChild(galaxyEllipse('galaxy-accent-patch galaxy-accent-teal', shape));
    }
    group.appendChild(puffGroup);

    renderMapStarfield(group, scale);

    for (const entity of clusters()) {
        if (entity.type !== 'star cloud') continue;
        const { disc, bulge } = flareShapesFor(entity, scale);
        group.appendChild(galaxyEllipse('galaxy-disc', disc));
        group.appendChild(galaxyEllipse('galaxy-bulge', bulge));
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

const ROUTE_LABEL_OFFSET = 10;

// A route's distance label, laid parallel to its line rather than relying on
// a hover tooltip (title elements never surface on touch screens). Sits at
// the line's midpoint, nudged perpendicular so it doesn't sit directly on
// top of the stroke, and rotated to follow the line's own angle — flipped
// 180° when that would render the text upside-down, so it always reads
// left-to-right regardless of which end "from"/"to" happen to be.
function routeLabelElement(route, from, to) {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const length = Math.hypot(dx, dy) || 1;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    if (angle > 90 || angle < -90) angle += 180;
    const midX = (from.position.x + to.position.x) / 2 + (-dy / length) * ROUTE_LABEL_OFFSET;
    const midY = (from.position.y + to.position.y) / 2 + (dx / length) * ROUTE_LABEL_OFFSET;

    const text = document.createElementNS(SVG_NS, 'text');
    text.setAttribute('class', 'route-label');
    text.setAttribute('x', midX);
    text.setAttribute('y', midY);
    text.setAttribute('transform', `rotate(${angle.toFixed(2)} ${midX} ${midY})`);
    text.textContent = route.label;
    return text;
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

    const labelGroup = document.createElementNS(SVG_NS, 'g');
    labelGroup.setAttribute('class', 'route-labels');

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
            labelGroup.appendChild(routeLabelElement(route, from, to));
        }

        edgeGroup.appendChild(line);
    }

    // A separate group appended after all the lines, so a label always sits
    // above every route line (including ones it doesn't belong to) rather
    // than getting drawn over by whichever line happens to come later.
    viewportEl.appendChild(labelGroup);

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

import {
    getById, clusters, systemsOf, clusterRoutes, systemRoutesWithin,
    allSystems, allOrbitalBodies, allMoons, allLocations, ORBITAL_KINDS,
} from './data.js';

// Every entity kind a traveler can actually book a trip to/from — every
// selectable kind except 'cluster' itself (a sector is a zone, not a
// destination) — mirrors "star system, orbital body, or location".
export const TRAVEL_KINDS = new Set(['system', 'moon', 'location', ...ORBITAL_KINDS]);

export function isTravelable(entity) {
    return Boolean(entity) && TRAVEL_KINDS.has(entity.kind);
}

// The CA/FTL travel model established for this setting: a symmetric
// accelerate-decelerate profile that covers the setting's canonical 8 ly
// "long jump" in 28 days (T = 2*sqrt(D/a), so a is fixed by those two
// numbers). FTL is the travel mode; constant acceleration and inertial
// dampeners are just the in-universe explanation of how crews survive it —
// so the same formula applies uniformly whether a leg is a many-lightyear
// interstellar lane or a short in-system AU hop.
const CA_REFERENCE_DISTANCE_LY = 8;
const CA_REFERENCE_DAYS = 28;
const DAYS_PER_YEAR = 365.25;
const CA_ACCEL_LY_PER_YEAR2 = (4 * CA_REFERENCE_DISTANCE_LY) / (CA_REFERENCE_DAYS / DAYS_PER_YEAR) ** 2;
export const AU_PER_LY = 63241.077;

export function travelTimeDays(distanceLy) {
    if (!(distanceLy > 0)) return 0;
    const years = 2 * Math.sqrt(distanceLy / CA_ACCEL_LY_PER_YEAR2);
    return years * DAYS_PER_YEAR;
}

function parseLy(label) {
    const match = /(-?\d+(?:\.\d+)?)/.exec(label || '');
    return match ? parseFloat(match[1]) : null;
}

// Resolves any travelable entity down to "which system is it in, and how far
// (in AU) from that system's star" — systems themselves sit at the star
// (0 AU); orbital bodies use their own distanceAu; moons and locations don't
// carry their own distance, so they inherit the planet they orbit/sit on.
export function resolveEndpoint(entity) {
    if (entity.kind === 'system') return { systemId: entity.id, localAu: 0 };
    if (ORBITAL_KINDS.has(entity.kind)) return { systemId: entity.systemId, localAu: entity.distanceAu ?? 0 };
    if (entity.kind === 'moon' || entity.kind === 'location') {
        const planet = getById(entity.planetId);
        return { systemId: planet.systemId, localAu: planet.distanceAu ?? 0 };
    }
    return null;
}

// A short "where is this" label for search results and route summaries, so
// two entities that share a name (or sit deep in the hierarchy) stay
// distinguishable at a glance.
export function describeEntity(entity) {
    if (entity.kind === 'system') return `${entity.name} — star system`;
    if (ORBITAL_KINDS.has(entity.kind)) {
        const system = getById(entity.systemId);
        return `${entity.name} — ${system ? system.name : 'unknown system'}`;
    }
    if (entity.kind === 'moon') {
        const planet = getById(entity.planetId);
        const system = planet ? getById(planet.systemId) : null;
        return `${entity.name} — moon of ${planet ? planet.name : '?'}${system ? `, ${system.name}` : ''}`;
    }
    if (entity.kind === 'location') {
        const planet = getById(entity.planetId);
        const system = planet ? getById(planet.systemId) : null;
        return `${entity.name} — ${planet ? planet.name : '?'}${system ? `, ${system.name}` : ''}`;
    }
    return entity.name;
}

// Every entity a traveler could search for, across the whole galaxy.
export function travelSearchIndex() {
    return [...allSystems(), ...allOrbitalBodies(), ...allMoons(), ...allLocations()];
}

// Builds one combined graph out of the two route networks in the data,
// bridged by a free (zero-distance) edge from each system to its own
// cluster — the labeled cluster-to-cluster lanes already abstract away
// exactly which system within a cluster you depart from/arrive at, so
// "reach your own cluster's outer lane" isn't a real, separately-charted
// leg. Routes with a non-numeric label (the one unconfirmed lane) are
// skipped — there's no distance to route through.
function buildGraph() {
    const adj = new Map();
    const addEdge = (a, b, dist, kind) => {
        if (!adj.has(a)) adj.set(a, []);
        if (!adj.has(b)) adj.set(b, []);
        adj.get(a).push({ to: b, dist, kind });
        adj.get(b).push({ to: a, dist, kind });
    };

    for (const route of clusterRoutes()) {
        const dist = parseLy(route.label);
        if (dist == null) continue;
        addEdge(`cluster:${route.from}`, `cluster:${route.to}`, dist, 'cluster');
    }
    for (const cluster of clusters()) {
        for (const system of systemsOf(cluster.id)) {
            addEdge(`system:${system.id}`, `cluster:${cluster.id}`, 0, 'local');
        }
        for (const route of systemRoutesWithin(cluster.id)) {
            const dist = parseLy(route.label);
            if (dist == null) continue;
            addEdge(`system:${route.from}`, `system:${route.to}`, dist, 'system');
        }
    }
    return adj;
}

// Plain Dijkstra over the combined graph — comfortably small (a few dozen
// nodes), so an O(V^2) scan for the next node needs no priority queue.
function shortestPath(adj, startKey, endKey) {
    const dist = new Map([[startKey, 0]]);
    const prev = new Map();
    const unvisited = new Set(adj.keys());
    unvisited.add(startKey);
    unvisited.add(endKey);

    while (unvisited.size) {
        let u = null;
        let best = Infinity;
        for (const node of unvisited) {
            const d = dist.has(node) ? dist.get(node) : Infinity;
            if (d < best) {
                best = d;
                u = node;
            }
        }
        if (u === null) break;
        unvisited.delete(u);
        if (u === endKey) break;

        for (const edge of adj.get(u) || []) {
            if (!unvisited.has(edge.to)) continue;
            const alt = best + edge.dist;
            if (alt < (dist.has(edge.to) ? dist.get(edge.to) : Infinity)) {
                dist.set(edge.to, alt);
                prev.set(edge.to, { from: u, kind: edge.kind, dist: edge.dist });
            }
        }
    }

    if (!dist.has(endKey)) return null;

    const legs = [];
    let cur = endKey;
    while (cur !== startKey) {
        const step = prev.get(cur);
        if (!step) return null;
        legs.unshift({ from: step.from, to: cur, kind: step.kind, distanceLy: step.dist });
        cur = step.from;
    }
    return { legs, totalLy: dist.get(endKey) };
}

function keyName(key) {
    const [, id] = key.split(':');
    const entity = getById(id);
    return entity ? entity.name : id;
}

// Plans a full door-to-door route between any two travelable entities:
// a local AU-scale hop out of the origin body (if any), the interstellar
// lane path between the two systems (which may cross several systems
// and/or clusters), and a local AU-scale hop into the destination body.
// Returns { ok:false, reason } when the entities can't be resolved or no
// lane connects their systems; otherwise { ok:true, legs, totalLy,
// totalDays, clusterIds, systemIdsByCluster, originSystem, destSystem }.
export function planRoute(fromEntity, toEntity) {
    if (!fromEntity || !toEntity) return { ok: false, reason: 'incomplete' };
    if (fromEntity.id === toEntity.id) return { ok: false, reason: 'same' };

    const fromPoint = resolveEndpoint(fromEntity);
    const toPoint = resolveEndpoint(toEntity);
    if (!fromPoint || !toPoint) return { ok: false, reason: 'invalid' };

    const originSystem = getById(fromPoint.systemId);
    const destSystem = getById(toPoint.systemId);

    const adj = buildGraph();
    const path = shortestPath(adj, `system:${originSystem.id}`, `system:${destSystem.id}`);
    if (!path) return { ok: false, reason: 'unreachable' };

    const legs = [];
    const localFromLy = fromPoint.localAu / AU_PER_LY;
    if (localFromLy > 0) {
        legs.push({
            fromName: fromEntity.name,
            toName: originSystem.name,
            level: 'local',
            distanceAu: fromPoint.localAu,
            distanceLy: localFromLy,
            timeDays: travelTimeDays(localFromLy),
        });
    }

    const clusterIds = new Set();
    const systemIdsByCluster = new Map();
    for (const leg of path.legs) {
        if (leg.kind === 'cluster') {
            clusterIds.add(leg.from.split(':')[1]);
            clusterIds.add(leg.to.split(':')[1]);
        } else if (leg.kind === 'system') {
            const system = getById(leg.from.split(':')[1]);
            if (system) {
                clusterIds.add(system.clusterId);
                if (!systemIdsByCluster.has(system.clusterId)) systemIdsByCluster.set(system.clusterId, new Set());
                systemIdsByCluster.get(system.clusterId).add(leg.from.split(':')[1]);
                systemIdsByCluster.get(system.clusterId).add(leg.to.split(':')[1]);
            }
        }
        if (leg.distanceLy > 0) {
            legs.push({
                fromName: keyName(leg.from),
                toName: keyName(leg.to),
                level: leg.kind,
                distanceAu: null,
                distanceLy: leg.distanceLy,
                timeDays: travelTimeDays(leg.distanceLy),
            });
        }
    }
    clusterIds.add(originSystem.clusterId);
    clusterIds.add(destSystem.clusterId);

    const localToLy = toPoint.localAu / AU_PER_LY;
    if (localToLy > 0) {
        legs.push({
            fromName: destSystem.name,
            toName: toEntity.name,
            level: 'local',
            distanceAu: toPoint.localAu,
            distanceLy: localToLy,
            timeDays: travelTimeDays(localToLy),
        });
    }

    const totalLy = legs.reduce((sum, leg) => sum + leg.distanceLy, 0);
    const totalDays = legs.reduce((sum, leg) => sum + leg.timeDays, 0);
    const totalAu = (localFromLy > 0 ? fromPoint.localAu : 0) + (localToLy > 0 ? toPoint.localAu : 0);

    return {
        ok: true,
        fromEntity,
        toEntity,
        originSystem,
        destSystem,
        legs,
        rawLegs: path.legs,
        totalLy,
        totalDays,
        totalAu,
        clusterIds: [...clusterIds],
        systemIdsByCluster,
    };
}

export function formatDistance(distanceLy, distanceAu = null) {
    if (distanceAu != null && distanceLy < 0.01) {
        return `${distanceAu < 0.01 ? distanceAu.toFixed(4) : Math.round(distanceAu * 100) / 100} AU`;
    }
    if (distanceLy < 0.01) return '< 0.01 ly';
    return `${distanceLy < 10 ? distanceLy.toFixed(2) : Math.round(distanceLy * 10) / 10} ly`;
}

export function formatDuration(days) {
    if (days < 1 / 24 / 30) return 'a few seconds';
    if (days < 1 / 24) return `${Math.max(1, Math.round(days * 24 * 60))} min`;
    if (days < 1) return `${(days * 24).toFixed(1)} hr`;
    if (days < 30) return `${days.toFixed(1)} days`;
    if (days < 365.25) return `${(days / 30.4368).toFixed(1)} months`;
    return `${(days / DAYS_PER_YEAR).toFixed(1)} years`;
}

const DAYS_PER_MONTH = 30.4368;

// The full door-to-door total, broken down into every unit down to whole
// hours (years/months/days/hours, skipping any that are zero) rather than
// rounded to a single unit like formatDuration — so a multi-month trip
// reads as "6 mo 5 d 14 hr" instead of losing everything past "6.2 months".
export function formatDurationFull(days) {
    if (!(days > 0)) return 'Effectively instant';

    let totalMinutes = Math.round(days * 24 * 60);
    if (totalMinutes < 60) return `${totalMinutes} min`;

    let totalHours = Math.round(totalMinutes / 60);
    if (totalHours < 24) return `${totalHours} hr`;

    let remainingDays = totalHours / 24;
    let years = Math.floor(remainingDays / DAYS_PER_YEAR);
    remainingDays -= years * DAYS_PER_YEAR;
    let months = Math.floor(remainingDays / DAYS_PER_MONTH);
    remainingDays -= months * DAYS_PER_MONTH;
    let wholeDays = Math.floor(remainingDays);
    let hours = Math.round((remainingDays - wholeDays) * 24);
    if (hours === 24) {
        hours = 0;
        wholeDays += 1;
    }
    if (wholeDays >= DAYS_PER_MONTH) {
        wholeDays -= Math.floor(DAYS_PER_MONTH);
        months += 1;
    }
    if (months >= 12) {
        months -= 12;
        years += 1;
    }

    const parts = [];
    if (years > 0) parts.push(`${years} yr`);
    if (months > 0) parts.push(`${months} mo`);
    if (wholeDays > 0) parts.push(`${wholeDays} d`);
    if (hours > 0) parts.push(`${hours} hr`);
    return parts.join(' ');
}

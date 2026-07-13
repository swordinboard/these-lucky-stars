let byId = new Map();
let raw = null;

export async function loadGalaxy() {
    const response = await fetch('data/galaxy.json');
    raw = await response.json();

    byId = new Map();
    for (const cluster of raw.clusters) byId.set(cluster.id, { ...cluster, kind: 'cluster' });
    for (const system of raw.systems) byId.set(system.id, { ...system, kind: 'system' });
    for (const body of raw.bodies) byId.set(body.id, { ...body, kind: 'body' });

    return raw;
}

export function getById(id) {
    return byId.get(id);
}

export function clusters() {
    return raw.clusters.map((cluster) => byId.get(cluster.id));
}

export function systemsOf(clusterId) {
    return raw.systems.filter((system) => system.clusterId === clusterId).map((system) => byId.get(system.id));
}

export function bodiesOf(systemId) {
    return raw.bodies.filter((body) => body.systemId === systemId).map((body) => byId.get(body.id));
}

export function clusterRoutes() {
    return raw.clusterRoutes;
}

export function systemRoutesWithin(clusterId) {
    const ids = new Set(systemsOf(clusterId).map((system) => system.id));
    return raw.systemRoutes.filter((route) => ids.has(route.from) && ids.has(route.to));
}

export function bodyRoutesWithin(systemId) {
    const ids = new Set(bodiesOf(systemId).map((body) => body.id));
    return raw.bodyRoutes.filter((route) => ids.has(route.from) && ids.has(route.to));
}

export const ORBITAL_KINDS = new Set(['planet', 'asteroidField', 'satellite', 'station', 'misc']);

let byId = new Map();
let raw = null;

export async function loadGalaxy() {
    const response = await fetch('data/galaxy.json');
    raw = await response.json();

    byId = new Map();
    for (const cluster of raw.clusters) byId.set(cluster.id, { ...cluster, kind: 'cluster' });
    for (const system of raw.systems) byId.set(system.id, { ...system, kind: 'system' });
    for (const body of raw.orbitalBodies) byId.set(body.id, { ...body, kind: body.bodyType });
    for (const moon of raw.moons) byId.set(moon.id, { ...moon, kind: 'moon' });
    for (const location of raw.locations) byId.set(location.id, { ...location, kind: 'location' });

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

export function orbitalBodiesOf(systemId) {
    return raw.orbitalBodies
        .filter((body) => body.systemId === systemId)
        .sort((a, b) => a.orbitOrder - b.orbitOrder)
        .map((body) => byId.get(body.id));
}

export function moonsOf(planetId) {
    return raw.moons
        .filter((moon) => moon.planetId === planetId)
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
        .map((moon) => byId.get(moon.id));
}

export function locationsOf(planetId) {
    return raw.locations.filter((location) => location.planetId === planetId).map((location) => byId.get(location.id));
}

export function clusterRoutes() {
    return raw.clusterRoutes;
}

export function systemRoutesWithin(clusterId) {
    const ids = new Set(systemsOf(clusterId).map((system) => system.id));
    return raw.systemRoutes.filter((route) => ids.has(route.from) && ids.has(route.to));
}

// Flat lists of every entity of a given kind, for building a travel search
// index across the whole galaxy (as opposed to the other accessors above,
// which are all scoped to one cluster/system/planet at a time).
export function allSystems() {
    return raw.systems.map((system) => byId.get(system.id));
}

export function allOrbitalBodies() {
    return raw.orbitalBodies.map((body) => byId.get(body.id));
}

export function allMoons() {
    return raw.moons.map((moon) => byId.get(moon.id));
}

export function allLocations() {
    return raw.locations.map((location) => byId.get(location.id));
}

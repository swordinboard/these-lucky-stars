import { getById, ORBITAL_KINDS } from './data.js';

const state = {
    level: 'cluster',
    clusterId: null,
    systemId: null,
    planetId: null,
    selectedId: null,
};

const listeners = [];

function notify() {
    for (const listener of listeners) listener(state);
}

function updateHash() {
    const parts = [state.clusterId, state.systemId, state.planetId].filter(Boolean);
    const next = parts.length ? `#${parts.join('/')}` : '';
    if (location.hash !== next) history.pushState(null, '', next || location.pathname);
}

function locationStateFor(orbitalId) {
    const orbital = getById(orbitalId);
    const system = getById(orbital.systemId);
    return { clusterId: system.clusterId, systemId: orbital.systemId, planetId: orbital.id };
}

export function subscribe(listener) {
    listeners.push(listener);
}

export function drillInto(entity) {
    if (entity.kind === 'cluster') {
        state.level = 'system';
        state.clusterId = entity.id;
        state.systemId = null;
        state.planetId = null;
    } else if (entity.kind === 'system') {
        state.level = 'orbital';
        state.clusterId = entity.clusterId;
        state.systemId = entity.id;
        state.planetId = null;
    } else if (ORBITAL_KINDS.has(entity.kind)) {
        state.level = 'location';
        Object.assign(state, locationStateFor(entity.id));
    } else if (entity.kind === 'moon') {
        state.level = 'location';
        Object.assign(state, locationStateFor(entity.planetId));
    } else {
        return;
    }
    state.selectedId = null;
    updateHash();
    notify();
}

// Jumps straight to whichever level actually shows the given entity as its
// own node, and selects it there — used by nav search, where "find Kavrel"
// should land on Harrowick's orbital view with Kavrel selected, not require
// retracing cluster -> system -> orbital by hand. A cluster/system is shown
// at its own level (the galaxy view, or that cluster's system view); an
// orbital body or moon is shown in its system's orrery (moons get their own
// node there too, same as planets); a location has no map node of its own —
// its "level" is the full-page writeup, reached via the same locationStateFor
// used when drilling in from a moon.
export function goToEntity(entity) {
    if (!entity) return;
    if (entity.kind === 'cluster') {
        state.level = 'cluster';
        state.clusterId = null;
        state.systemId = null;
        state.planetId = null;
    } else if (entity.kind === 'system') {
        state.level = 'system';
        state.clusterId = entity.clusterId;
        state.systemId = null;
        state.planetId = null;
    } else if (ORBITAL_KINDS.has(entity.kind)) {
        state.level = 'orbital';
        state.clusterId = getById(entity.systemId).clusterId;
        state.systemId = entity.systemId;
        state.planetId = null;
    } else if (entity.kind === 'moon') {
        const planet = getById(entity.planetId);
        state.level = 'orbital';
        state.clusterId = getById(planet.systemId).clusterId;
        state.systemId = planet.systemId;
        state.planetId = null;
    } else if (entity.kind === 'location') {
        state.level = 'location';
        Object.assign(state, locationStateFor(entity.planetId));
    } else {
        return;
    }
    state.selectedId = entity.id;
    updateHash();
    notify();
}

export function goUp(toLevel) {
    state.level = toLevel;
    if (toLevel === 'cluster') {
        state.clusterId = null;
        state.systemId = null;
        state.planetId = null;
    } else if (toLevel === 'system') {
        state.systemId = null;
        state.planetId = null;
    } else if (toLevel === 'orbital') {
        state.planetId = null;
    }
    state.selectedId = null;
    updateHash();
    notify();
}

export function select(id) {
    state.selectedId = id;
    notify();
}

export function deselect() {
    state.selectedId = null;
    notify();
}

export function syncFromHash() {
    const path = location.hash.replace(/^#/, '');
    const ids = path ? path.split('/').filter(Boolean) : [];

    state.level = 'cluster';
    state.clusterId = null;
    state.systemId = null;
    state.planetId = null;
    state.selectedId = null;

    for (const id of ids) {
        const entity = getById(id);
        if (!entity) break;
        if (entity.kind === 'cluster') {
            state.level = 'system';
            state.clusterId = entity.id;
        } else if (entity.kind === 'system') {
            state.level = 'orbital';
            state.clusterId = entity.clusterId;
            state.systemId = entity.id;
        } else if (ORBITAL_KINDS.has(entity.kind)) {
            state.level = 'location';
            Object.assign(state, locationStateFor(entity.id));
        }
    }

    notify();
}

window.addEventListener('hashchange', syncFromHash);

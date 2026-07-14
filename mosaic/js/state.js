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

export function getState() {
    return state;
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

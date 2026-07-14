import { loadGalaxy, getById } from './data.js';
import { subscribe, syncFromHash, select, drillInto } from './state.js';
import { renderLevel } from './render.js';
import { renderOrrery } from './orrery.js';
import { renderLocationList } from './location-list.js';
import { renderBreadcrumb } from './breadcrumb.js';
import { renderDetailsPanel } from './details-panel.js';
import { createPanZoom } from './panzoom.js';
import { initSidebar } from './sidebar.js';

async function main() {
    initSidebar();
    await loadGalaxy();

    const svg = document.getElementById('galaxy-map');
    const viewport = document.getElementById('viewport');
    const locationListEl = document.getElementById('location-list');
    const breadcrumbEl = document.getElementById('breadcrumb');
    const detailsEl = document.getElementById('details-panel');

    const panZoom = createPanZoom(svg, viewport, {
        onTap(nodeId) {
            select(nodeId);
        },
        onDoubleTap(nodeId) {
            const entity = getById(nodeId);
            if (entity && entity.kind !== 'location') drillInto(entity);
        },
    });
    let lastLevelKey = null;

    subscribe((state) => {
        const isLocationLevel = state.level === 'location';
        svg.hidden = isLocationLevel;
        locationListEl.hidden = !isLocationLevel;

        let bounds = null;
        if (isLocationLevel) {
            renderLocationList(locationListEl, state);
        } else if (state.level === 'orbital') {
            bounds = renderOrrery(viewport, state);
        } else {
            bounds = renderLevel(viewport, state);
        }

        const levelKey = `${state.level}:${state.clusterId}:${state.systemId}:${state.planetId}`;
        if (levelKey !== lastLevelKey) {
            lastLevelKey = levelKey;
            if (bounds) panZoom.fitToBounds(bounds);
        }

        renderBreadcrumb(breadcrumbEl, state);
        renderDetailsPanel(detailsEl, state);
    });

    syncFromHash();
}

main();

import { loadGalaxy, getById } from './data.js';
import { subscribe, syncFromHash, select, drillInto } from './state.js';
import { renderLevel } from './render.js';
import { renderBreadcrumb } from './breadcrumb.js';
import { renderDetailsPanel } from './details-panel.js';
import { createPanZoom } from './panzoom.js';
import { initSidebar } from './sidebar.js';

async function main() {
    initSidebar();
    await loadGalaxy();

    const svg = document.getElementById('galaxy-map');
    const viewport = document.getElementById('viewport');
    const breadcrumbEl = document.getElementById('breadcrumb');
    const detailsEl = document.getElementById('details-panel');

    const panZoom = createPanZoom(svg, viewport, {
        onTap(nodeId) {
            select(nodeId);
        },
        onDoubleTap(nodeId) {
            const entity = getById(nodeId);
            if (entity && entity.kind !== 'body') drillInto(entity);
        },
    });
    let lastLevelKey = null;

    subscribe((state) => {
        const bounds = renderLevel(viewport, state);

        const levelKey = `${state.level}:${state.clusterId}:${state.systemId}`;
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

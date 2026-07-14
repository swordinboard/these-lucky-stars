import { loadGalaxy, getById } from './data.js';
import { subscribe, syncFromHash, select, drillInto, goUp } from './state.js';
import { renderLevel } from './render.js';
import { renderOrrery, renderStarAnchor, CONTENT_GUTTER, STAR_SCREEN_X } from './orrery.js';
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
    const starAnchor = document.getElementById('star-anchor');
    const locationListEl = document.getElementById('location-list');
    const locationBackdropEl = document.getElementById('location-list-backdrop');
    const breadcrumbEl = document.getElementById('breadcrumb');
    const detailsEl = document.getElementById('details-panel');

    locationBackdropEl.addEventListener('click', () => goUp('orbital'));

    const panZoom = createPanZoom(svg, viewport, {
        onTap(nodeId) {
            select(nodeId);
        },
        onDoubleTap(nodeId) {
            const entity = getById(nodeId);
            if (entity && entity.kind !== 'location') drillInto(entity);
        },
    });
    let lastFitKey = null;

    subscribe((state) => {
        let bounds = null;
        let fitKey = null;
        let fitMode = 'free';

        if (state.level === 'cluster') {
            bounds = renderLevel(viewport, state);
            fitKey = `cluster`;
            starAnchor.replaceChildren();
        } else if (state.level === 'system') {
            bounds = renderLevel(viewport, state);
            fitKey = `system:${state.clusterId}`;
            starAnchor.replaceChildren();
        } else if (state.systemId) {
            // The orrery stays mounted as a backdrop for both the 'orbital'
            // level and the 'location' level (whose list slides in as a
            // drawer over it) — it only needs re-fitting when the system
            // itself changes, not when a location drawer opens/closes.
            bounds = renderOrrery(viewport, state);
            fitKey = `orbital:${state.systemId}`;
            fitMode = 'horizontal';
        }

        if (fitKey !== lastFitKey) {
            lastFitKey = fitKey;
            if (bounds) {
                if (fitMode === 'horizontal') {
                    const { fixedY } = panZoom.fitHorizontal(bounds, CONTENT_GUTTER);
                    renderStarAnchor(starAnchor);
                    starAnchor.setAttribute('transform', `translate(${STAR_SCREEN_X},${fixedY})`);
                } else {
                    panZoom.fitToBounds(bounds);
                }
            }
        }

        const isLocationLevel = state.level === 'location';
        locationListEl.classList.toggle('open', isLocationLevel);
        locationBackdropEl.classList.toggle('open', isLocationLevel);
        if (isLocationLevel) renderLocationList(locationListEl, state);

        renderBreadcrumb(breadcrumbEl, state);
        renderDetailsPanel(detailsEl, state);
    });

    syncFromHash();
}

main();

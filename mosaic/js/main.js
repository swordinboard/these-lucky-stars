import { loadGalaxy, getById } from './data.js';
import { subscribe, syncFromHash, select, drillInto, goUp } from './state.js';
import { renderLevel } from './render.js';
import { renderOrrery } from './orrery.js';
import { renderLocationList } from './location-list.js';
import { renderBreadcrumb } from './breadcrumb.js';
import { renderDetailsPanel } from './details-panel.js';
import { createPanZoom } from './panzoom.js';
import { initSidebar, closeSidebar } from './sidebar.js';
import { initNavSearch } from './nav-search.js';
import { renderStarfield, setStarfieldOffset } from './starfield.js';
import { initTravelPanel, openTravelPanelBlank, notifyTravelMapSelection, isOpen as isTravelPanelOpen } from './travel-panel.js';
import { initAboutPanel, openAboutPanel } from './about-panel.js';
import { raisePanel } from './panel-stack.js';

const STARFIELD_PARALLAX_FACTOR = 0.18;

async function main() {
    initSidebar();
    initNavSearch();
    initAboutPanel();
    await loadGalaxy();

    const svg = document.getElementById('galaxy-map');
    const viewport = document.getElementById('viewport');
    const locationListEl = document.getElementById('location-list');
    const locationBackdropEl = document.getElementById('location-list-backdrop');
    const breadcrumbEl = document.getElementById('breadcrumb');
    const detailsEl = document.getElementById('details-panel');
    const scrollbarEl = document.getElementById('orbital-scrollbar');
    const scrollbarThumbEl = document.getElementById('orbital-scrollbar-thumb');
    const mapEmptyEl = document.getElementById('map-empty-state');
    const sidebarTravelButton = document.getElementById('sidebar-travel');
    const sidebarAboutButton = document.getElementById('sidebar-about');

    locationBackdropEl.addEventListener('click', () => goUp('orbital'));
    sidebarTravelButton.addEventListener('click', () => {
        closeSidebar();
        openTravelPanelBlank();
    });
    sidebarAboutButton.addEventListener('click', () => {
        closeSidebar();
        openAboutPanel();
    });

    const panZoom = createPanZoom(svg, viewport, {
        onTap(nodeId) {
            select(nodeId);
            notifyTravelMapSelection(nodeId);
        },
        onDoubleTap(nodeId) {
            const entity = getById(nodeId);
            if (entity && entity.kind !== 'location') drillInto(entity);
        },
        onChange({ x, y }, scrollExtent) {
            setStarfieldOffset(x * STARFIELD_PARALLAX_FACTOR, y * STARFIELD_PARALLAX_FACTOR);
            // Only the orrery is a horizontally-locked side-scroller — the
            // cluster/system maps pan freely in both axes, so the rail only
            // makes sense (and only appears) here.
            scrollbarEl.classList.toggle('visible', Boolean(scrollExtent));
            if (scrollExtent) {
                scrollbarThumbEl.style.left = `${scrollExtent.start * 100}%`;
                scrollbarThumbEl.style.width = `${(scrollExtent.end - scrollExtent.start) * 100}%`;
            }
        },
    });
    let lastFitKey = null;
    let lastBounds = null;
    let lastFitMode = 'free';
    let wasLocationLevel = false;
    let latestState = null;

    function applyFit() {
        if (!lastBounds) return;
        if (lastFitMode === 'horizontal') panZoom.fitHorizontal(lastBounds, 0);
        else panZoom.fitToBounds(lastBounds);
    }

    // The travel panel and the docked details footer both compete for
    // vertical space on a phone screen — showing an entity's compact
    // preview (description, drill/travel buttons) underneath an already-open
    // travel panel squeezes the panel down to the point where its own
    // fields get clipped short instead of laid out comfortably. So while the
    // travel panel is open, the compact footer collapses to its placeholder
    // (as if nothing were selected) — the button that opened the panel has
    // already done its job, and a live map tap still autofills "To"
    // independently of this, via notifyTravelMapSelection. A location's
    // full-page view is exempt: it has its own dedicated screen (not the
    // docked footer), and the travel panel is meant to stack on top of it
    // rather than replace it (see panel-stack.js).
    function renderDetailsForCurrentState() {
        if (!latestState) return;
        const selectedEntity = latestState.selectedId ? getById(latestState.selectedId) : null;
        const suppressForTravel = isTravelPanelOpen() && selectedEntity && selectedEntity.kind !== 'location';
        const state = suppressForTravel ? { ...latestState, selectedId: null } : latestState;
        renderDetailsPanel(detailsEl, state);
    }

    function onTravelPanelToggle() {
        applyFit();
        renderDetailsForCurrentState();
    }

    initTravelPanel(onTravelPanelToggle);

    subscribe((state) => {
        latestState = state;
        let bounds = null;
        let fitKey = null;
        let fitMode = 'free';

        if (state.level === 'cluster') {
            bounds = renderLevel(viewport, state);
            fitKey = `cluster`;
        } else if (state.level === 'system') {
            bounds = renderLevel(viewport, state);
            fitKey = `system:${state.clusterId}`;
        } else if (state.systemId) {
            // The orrery stays mounted as a backdrop for both the 'orbital'
            // level and the 'location' level (whose list slides in as a
            // drawer over it) — it only needs re-fitting when the system
            // itself changes, not when a location drawer opens/closes.
            bounds = renderOrrery(viewport, state);
            fitKey = `orbital:${state.systemId}`;
            fitMode = 'horizontal';
        }

        lastBounds = bounds;
        lastFitMode = fitMode;

        mapEmptyEl.hidden = !(state.level === 'system' && bounds === null);

        // Render everything that can change the map's available screen space
        // (footer height, location drawer) before fitToBounds/fitHorizontal
        // measure the SVG's rect below — otherwise the very first fit (before
        // the footer has ever rendered its placeholder text) measures a
        // taller-than-final rect, since an empty footer takes less vertical
        // space than a populated one, producing a slightly too-large scale
        // that clips content flush against whichever edge fills in afterward.
        const isLocationLevel = state.level === 'location';
        if (isLocationLevel && !wasLocationLevel) raisePanel(locationListEl, locationBackdropEl);
        wasLocationLevel = isLocationLevel;
        locationListEl.classList.toggle('open', isLocationLevel);
        locationBackdropEl.classList.toggle('open', isLocationLevel);
        if (isLocationLevel) renderLocationList(locationListEl, state);

        renderBreadcrumb(breadcrumbEl, state);
        renderDetailsForCurrentState();

        if (fitKey !== lastFitKey) {
            lastFitKey = fitKey;
            renderStarfield(fitKey || 'galaxy');
            applyFit();
        }
    });

    syncFromHash();
}

main();

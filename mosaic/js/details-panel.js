import { getById, systemsOf } from './data.js';
import { drillInto, deselect } from './state.js';
import { openTravelPanelWithDestination } from './travel-panel.js';
import { isTravelable } from './travel.js';
import { raisePanel } from './panel-stack.js';

const DRILL_LABEL = {
    cluster: 'View systems →',
    system: 'View orbital bodies →',
    planet: 'View locations →',
    asteroidField: 'View locations →',
    satellite: 'View locations →',
    station: 'View locations →',
    misc: 'View locations →',
    moon: 'View locations →',
};
const PLACEHOLDER_TEXT = {
    cluster: 'Select a sector to view details.',
    system: 'Select a system to view details.',
    orbital: 'Select an object to view details.',
    location: 'Select a location to view details.',
};

// Locations get a full-page "writeup" treatment (they're where the actual
// lore/setting text lives); every other kind gets the compact docked-footer
// preview. Since the panel switches from in-flow to `position: fixed` for
// the full-page state, a plain class toggle can't animate smoothly (position
// isn't interpolable) — so entry is staged across two frames: apply the
// off-screen "entering" position first, force a layout flush, then swap to
// the "shown" position on the next frame so the transform transition has a
// real start and end state to animate between.
function enterFullPage(el) {
    if (el.classList.contains('full')) return;
    raisePanel(el);
    el.classList.remove('expanded');
    el.classList.add('full-entering');
    void el.offsetHeight;
    requestAnimationFrame(() => {
        el.classList.remove('full-entering');
        el.classList.add('full');
    });
}

function exitFullPage(el) {
    el.classList.remove('full', 'full-entering');
}

let cancelPendingCollapse = null;

// A cluster with no known systems yet has nothing to "select" at the system
// level, so the usual "Select a system..." prompt would be misleading there.
function placeholderTextFor(state) {
    if (state.level === 'system' && systemsOf(state.clusterId).length === 0) {
        return 'No Data Available';
    }
    return PLACEHOLDER_TEXT[state.level];
}

function showPlaceholder(el, state) {
    while (el.firstChild) el.removeChild(el.firstChild);
    const placeholder = document.createElement('p');
    placeholder.className = 'details-placeholder';
    placeholder.textContent = placeholderTextFor(state);
    el.appendChild(placeholder);
}

export function renderDetailsPanel(el, state) {
    if (cancelPendingCollapse) {
        cancelPendingCollapse();
        cancelPendingCollapse = null;
    }

    const entity = state.selectedId ? getById(state.selectedId) : null;
    const isFullPage = Boolean(entity) && entity.kind === 'location';
    const wasExpanded = el.classList.contains('expanded');

    if (isFullPage) {
        enterFullPage(el);
    } else if (entity) {
        exitFullPage(el);
        el.classList.add('expanded');
    } else if (wasExpanded) {
        // Closing from the compact preview: the max-height shrink is only
        // visible while there's still enough content to be clipped by it —
        // swapping straight to the single-line placeholder text would make
        // the box's natural height drop below the shrinking max-height
        // instantly, so the collapse would look instant no matter how slow
        // the transition is. Leave the outgoing content in place until the
        // shrink finishes, then swap it for the placeholder.
        exitFullPage(el);
        el.classList.remove('expanded');
        const onEnd = (evt) => {
            if (evt.target !== el || evt.propertyName !== 'max-height') return;
            el.removeEventListener('transitionend', onEnd);
            cancelPendingCollapse = null;
            showPlaceholder(el, state);
        };
        el.addEventListener('transitionend', onEnd);
        cancelPendingCollapse = () => el.removeEventListener('transitionend', onEnd);
        return;
    } else {
        exitFullPage(el);
        el.classList.remove('expanded');
        showPlaceholder(el, state);
        return;
    }

    while (el.firstChild) el.removeChild(el.firstChild);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'details-close';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close details');
    closeButton.addEventListener('click', () => deselect());
    el.appendChild(closeButton);

    const heading = document.createElement('h2');
    heading.textContent = entity.name;
    el.appendChild(heading);

    const type = document.createElement('p');
    type.className = 'details-type';
    type.textContent = entity.type;
    el.appendChild(type);

    if (typeof entity.distanceAu === 'number') {
        const distance = document.createElement('p');
        distance.className = 'details-distance';
        distance.textContent = `${entity.distanceAu} AU from its star`;
        el.appendChild(distance);
    }

    const description = document.createElement('p');
    description.textContent = entity.description;
    el.appendChild(description);

    for (const paragraph of entity.detail || []) {
        const p = document.createElement('p');
        p.className = 'details-extra';
        p.textContent = paragraph;
        el.appendChild(p);
    }

    if (DRILL_LABEL[entity.kind] || isTravelable(entity)) {
        const actions = document.createElement('div');
        actions.className = 'details-actions';

        if (DRILL_LABEL[entity.kind]) {
            const drillButton = document.createElement('button');
            drillButton.type = 'button';
            drillButton.className = 'details-drill';
            drillButton.textContent = DRILL_LABEL[entity.kind];
            drillButton.addEventListener('click', () => drillInto(entity));
            actions.appendChild(drillButton);
        }

        if (isTravelable(entity)) {
            const travelButton = document.createElement('button');
            travelButton.type = 'button';
            travelButton.className = 'details-drill';
            travelButton.textContent = 'Begin Travel →';
            travelButton.addEventListener('click', () => openTravelPanelWithDestination(entity));
            actions.appendChild(travelButton);
        }

        el.appendChild(actions);
    }
}

import { getById } from './data.js';
import { drillInto, deselect, openWriteup } from './state.js';

const DRILL_LABEL = {
    cluster: 'View systems →',
    system: 'View orbital bodies →',
    planet: 'View locations →',
    asteroidField: 'View locations →',
    satellite: 'View locations →',
    station: 'View locations →',
    misc: 'View locations →',
    moon: 'View locations →',
    location: 'Read more →',
};
const PLACEHOLDER_TEXT = {
    cluster: 'Select a sector to view details.',
    system: 'Select a system to view details.',
    orbital: 'Select an object to view details.',
    location: 'Select a location to view details.',
};

// Locations get a full-page "writeup" treatment (they're where the actual
// lore/setting text lives), but only once explicitly opened (double-tap/
// double-click, or the "Read more →" button) — a single tap/click just
// selects it like any other kind, showing the compact docked-footer preview.
// Since the panel switches from in-flow to `position: fixed` for the
// full-page state, a plain class toggle can't animate smoothly (position
// isn't interpolable) — so entry is staged across two frames: apply the
// off-screen "entering" position first, force a layout flush, then swap to
// the "shown" position on the next frame so the transform transition has a
// real start and end state to animate between.
function enterFullPage(el) {
    if (el.classList.contains('full')) return;
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

export function renderDetailsPanel(el, state) {
    while (el.firstChild) el.removeChild(el.firstChild);

    const entity = state.selectedId ? getById(state.selectedId) : null;
    const isOpenWriteup = Boolean(entity) && entity.kind === 'location' && state.openLocationId === state.selectedId;

    if (isOpenWriteup) {
        enterFullPage(el);
    } else {
        exitFullPage(el);
        el.classList.toggle('expanded', Boolean(entity));
    }

    if (!entity) {
        const placeholder = document.createElement('p');
        placeholder.className = 'details-placeholder';
        placeholder.textContent = PLACEHOLDER_TEXT[state.level];
        el.appendChild(placeholder);
        return;
    }

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

    const description = document.createElement('p');
    description.textContent = entity.description;
    el.appendChild(description);

    for (const paragraph of entity.detail || []) {
        const p = document.createElement('p');
        p.className = 'details-extra';
        p.textContent = paragraph;
        el.appendChild(p);
    }

    if (DRILL_LABEL[entity.kind] && !isOpenWriteup) {
        const drillButton = document.createElement('button');
        drillButton.type = 'button';
        drillButton.className = 'details-drill';
        drillButton.textContent = DRILL_LABEL[entity.kind];
        drillButton.addEventListener('click', () => {
            if (entity.kind === 'location') openWriteup(entity.id);
            else drillInto(entity);
        });
        el.appendChild(drillButton);
    }
}

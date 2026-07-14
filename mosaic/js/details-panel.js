import { getById } from './data.js';
import { drillInto, deselect } from './state.js';

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

export function renderDetailsPanel(el, state) {
    while (el.firstChild) el.removeChild(el.firstChild);

    const entity = state.selectedId ? getById(state.selectedId) : null;
    el.classList.toggle('expanded', Boolean(entity));

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

    if (DRILL_LABEL[entity.kind]) {
        const drillButton = document.createElement('button');
        drillButton.type = 'button';
        drillButton.className = 'details-drill';
        drillButton.textContent = DRILL_LABEL[entity.kind];
        drillButton.addEventListener('click', () => drillInto(entity));
        el.appendChild(drillButton);
    }
}

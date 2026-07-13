import { getById } from './data.js';
import { drillInto, deselect } from './state.js';

const DRILL_LABEL = { cluster: 'View systems →', system: 'View bodies →' };

export function renderDetailsPanel(el, state) {
    while (el.firstChild) el.removeChild(el.firstChild);

    const entity = state.selectedId ? getById(state.selectedId) : null;
    el.classList.toggle('open', Boolean(entity));
    if (!entity) return;

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

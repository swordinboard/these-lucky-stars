import { getById, moonsOf, locationsOf } from './data.js';
import { select, goUp, openWriteup } from './state.js';
import { createIcon } from './icons.js';

const DEFAULT_ICON = { surface: 'surface', moon: 'moon', orbit: 'satellite' };

function renderSection(container, title, entries) {
    if (!entries.length) return;

    const section = document.createElement('section');
    section.className = 'location-section';

    const heading = document.createElement('h3');
    heading.textContent = title;
    section.appendChild(heading);

    const list = document.createElement('ul');
    list.className = 'location-rows';

    for (const location of entries) {
        const item = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'location-row';
        button.appendChild(createIcon(location.icon || DEFAULT_ICON[location.locatedAt.kind], { size: 18 }));

        const label = document.createElement('span');
        label.textContent = location.name;
        button.appendChild(label);

        // Same single-tap-select / double-tap-commit pattern used for the
        // orrery nodes. These are plain DOM buttons (never under
        // setPointerCapture), so native dblclick fires reliably here without
        // needing the custom tap-timing logic panzoom.js uses for SVG nodes.
        button.addEventListener('click', () => select(location.id));
        button.addEventListener('dblclick', () => openWriteup(location.id));
        item.appendChild(button);
        list.appendChild(item);
    }

    section.appendChild(list);
    container.appendChild(section);
}

export function renderLocationList(listEl, state) {
    while (listEl.firstChild) listEl.removeChild(listEl.firstChild);

    const planet = getById(state.planetId);
    const locations = locationsOf(state.planetId);
    const moons = moonsOf(state.planetId);

    const header = document.createElement('div');
    header.className = 'location-list-header';

    const title = document.createElement('h2');
    title.textContent = planet.name;
    header.appendChild(title);

    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'location-list-close';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close locations');
    closeButton.addEventListener('click', () => goUp('orbital'));
    header.appendChild(closeButton);

    listEl.appendChild(header);

    const body = document.createElement('div');
    body.className = 'location-list-body';
    listEl.appendChild(body);

    const surface = locations.filter((loc) => loc.locatedAt.kind === 'surface');
    const orbit = locations.filter((loc) => loc.locatedAt.kind === 'orbit');

    renderSection(body, `On ${planet.name}`, surface);
    for (const moon of moons) {
        const moonLocations = locations.filter((loc) => loc.locatedAt.kind === 'moon' && loc.locatedAt.moonId === moon.id);
        renderSection(body, `On ${moon.name}`, moonLocations);
    }
    renderSection(body, 'In Orbit', orbit);

    if (!body.firstChild) {
        const empty = document.createElement('p');
        empty.className = 'location-empty';
        empty.textContent = 'No known locations here yet.';
        body.appendChild(empty);
    }
}

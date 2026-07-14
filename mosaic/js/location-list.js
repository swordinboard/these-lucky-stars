import { getById, moonsOf, locationsOf } from './data.js';
import { select } from './state.js';
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

        button.addEventListener('click', () => select(location.id));
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

    const surface = locations.filter((loc) => loc.locatedAt.kind === 'surface');
    const orbit = locations.filter((loc) => loc.locatedAt.kind === 'orbit');

    renderSection(listEl, `On ${planet.name}`, surface);
    for (const moon of moons) {
        const moonLocations = locations.filter((loc) => loc.locatedAt.kind === 'moon' && loc.locatedAt.moonId === moon.id);
        renderSection(listEl, `On ${moon.name}`, moonLocations);
    }
    renderSection(listEl, 'In Orbit', orbit);

    if (!listEl.firstChild) {
        const empty = document.createElement('p');
        empty.className = 'location-empty';
        empty.textContent = 'No known locations here yet.';
        listEl.appendChild(empty);
    }
}

import { getById } from './data.js';
import { goUp } from './state.js';

export function renderBreadcrumb(el, state) {
    while (el.firstChild) el.removeChild(el.firstChild);

    const crumbs = [{ label: 'Galaxy', level: 'cluster' }];
    if (state.clusterId) {
        crumbs.push({ label: getById(state.clusterId).name, level: 'system' });
    }
    if (state.systemId) {
        crumbs.push({ label: getById(state.systemId).name, level: 'orbital' });
    }
    if (state.planetId) {
        crumbs.push({ label: getById(state.planetId).name, level: 'location' });
    }

    crumbs.forEach((crumb, index) => {
        const isCurrent = index === crumbs.length - 1;

        if (index > 0) {
            const separator = document.createElement('span');
            separator.className = 'breadcrumb-sep';
            separator.textContent = '›';
            el.appendChild(separator);
        }

        if (isCurrent) {
            const current = document.createElement('span');
            current.className = 'breadcrumb-current';
            current.textContent = crumb.label;
            el.appendChild(current);
        } else {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'breadcrumb-link';
            button.textContent = crumb.label;
            button.addEventListener('click', () => goUp(crumb.level));
            el.appendChild(button);
        }
    });
}

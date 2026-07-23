import { goToEntity } from './state.js';
import { describeEntity, waypointSearchIndex } from './travel.js';
import { closeSidebar } from './sidebar.js';

const MAX_RESULTS = 8;

// A single search box in the nav drawer that can jump straight to any
// entity in the galaxy, landing on whichever level actually shows it (see
// goToEntity in state.js) rather than requiring the user to drill down
// cluster -> system -> orbital by hand.
export function initNavSearch() {
    const container = document.getElementById('nav-search');

    const searchWrap = document.createElement('div');
    searchWrap.className = 'travel-field-search';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'travel-field-input';
    input.placeholder = 'Search the galaxy…';
    input.setAttribute('aria-label', 'Search the galaxy');
    searchWrap.appendChild(input);

    const resultsList = document.createElement('ul');
    resultsList.className = 'travel-field-results';
    resultsList.hidden = true;
    searchWrap.appendChild(resultsList);

    container.appendChild(searchWrap);

    function renderMatches(query) {
        while (resultsList.firstChild) resultsList.removeChild(resultsList.firstChild);
        const q = query.trim().toLowerCase();
        if (!q) {
            resultsList.hidden = true;
            return;
        }
        const matches = waypointSearchIndex().filter((candidate) => candidate.name.toLowerCase().includes(q)).slice(0, MAX_RESULTS);
        resultsList.hidden = matches.length === 0;
        for (const match of matches) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = describeEntity(match);
            button.addEventListener('mousedown', (evt) => evt.preventDefault());
            button.addEventListener('click', () => {
                goToEntity(match);
                input.value = '';
                resultsList.hidden = true;
                closeSidebar();
            });
            li.appendChild(button);
            resultsList.appendChild(li);
        }
    }

    input.addEventListener('input', () => renderMatches(input.value));
    input.addEventListener('focus', () => renderMatches(input.value));
    input.addEventListener('blur', () => {
        setTimeout(() => { resultsList.hidden = true; }, 150);
    });
}

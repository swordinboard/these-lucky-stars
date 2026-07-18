import { getById } from './data.js';
import { renderLevel } from './render.js';
import {
    planRoute, describeEntity, travelSearchIndex, formatDistance, formatDuration, isTravelable,
} from './travel.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const MAX_RESULTS = 8;
const LEVEL_LABEL = { local: 'Local approach', system: 'System lane', cluster: 'Interstellar lane' };
const REASON_MESSAGE = {
    same: 'Choose two different locations to plot a route.',
    unreachable: 'No charted FTL lane connects these two yet.',
    invalid: 'Could not resolve one of those locations.',
    incomplete: 'Choose both a "From" and a "To" location.',
};

let panelEl = null;
let fromField = null;
let toField = null;
let submitButton = null;
let resultsEl = null;
let openFlag = false;
let onToggleCallback = null;

function near(a, b) {
    return Math.abs(a - b) < 0.5;
}

// A small, non-interactive re-render of an existing map level (galaxy or a
// single cluster's systems), reusing renderLevel exactly as the live map
// does, then overlaying highlight classes on the specific nodes/lines this
// route passes through. Not wired to panzoom — it just fits a viewBox to
// its own bounds once, since it never needs to pan or zoom.
function buildPreviewSvg(state, highlightNodeIds, highlightPairs, title) {
    const wrap = document.createElement('div');
    wrap.className = 'travel-preview';

    const heading = document.createElement('p');
    heading.className = 'travel-preview-title';
    heading.textContent = title;
    wrap.appendChild(heading);

    const svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'travel-preview-map');
    const g = document.createElementNS(SVG_NS, 'g');
    svg.appendChild(g);

    const bounds = renderLevel(g, state);
    if (!bounds) {
        const empty = document.createElement('p');
        empty.className = 'travel-preview-empty';
        empty.textContent = 'No data available for this leg.';
        wrap.appendChild(empty);
        return wrap;
    }

    const pad = 60;
    svg.setAttribute(
        'viewBox',
        `${bounds.minX - pad} ${bounds.minY - pad} ${bounds.maxX - bounds.minX + pad * 2} ${bounds.maxY - bounds.minY + pad * 2}`,
    );

    for (const id of highlightNodeIds) {
        const nodeEl = g.querySelector(`[data-id="${CSS.escape(id)}"]`);
        if (nodeEl) nodeEl.classList.add('travel-route-node');
    }
    for (const [aId, bId] of highlightPairs) {
        const a = getById(aId);
        const b = getById(bId);
        if (!a || !b) continue;
        for (const line of g.querySelectorAll('.route-line')) {
            const x1 = parseFloat(line.getAttribute('x1'));
            const y1 = parseFloat(line.getAttribute('y1'));
            const x2 = parseFloat(line.getAttribute('x2'));
            const y2 = parseFloat(line.getAttribute('y2'));
            const forward = near(x1, a.position.x) && near(y1, a.position.y) && near(x2, b.position.x) && near(y2, b.position.y);
            const backward = near(x1, b.position.x) && near(y1, b.position.y) && near(x2, a.position.x) && near(y2, a.position.y);
            if (forward || backward) line.classList.add('travel-route-line');
        }
    }

    wrap.appendChild(svg);
    return wrap;
}

function buildPreviews(plan) {
    const previews = document.createElement('div');
    previews.className = 'travel-previews';

    const clusterPairs = plan.rawLegs.filter((leg) => leg.kind === 'cluster').map((leg) => [leg.from.split(':')[1], leg.to.split(':')[1]]);
    previews.appendChild(buildPreviewSvg({ level: 'cluster' }, plan.clusterIds, clusterPairs, 'Galaxy route'));

    const distinctClusters = [...new Set([plan.originSystem.clusterId, plan.destSystem.clusterId])];
    for (const clusterId of distinctClusters) {
        const systemIds = new Set(plan.systemIdsByCluster.get(clusterId) || []);
        if (plan.originSystem.clusterId === clusterId) systemIds.add(plan.originSystem.id);
        if (plan.destSystem.clusterId === clusterId) systemIds.add(plan.destSystem.id);
        const systemPairs = plan.rawLegs
            .filter((leg) => leg.kind === 'system')
            .map((leg) => [leg.from.split(':')[1], leg.to.split(':')[1]])
            .filter(([a, b]) => systemIds.has(a) && systemIds.has(b));
        previews.appendChild(buildPreviewSvg(
            { level: 'system', clusterId },
            [...systemIds],
            systemPairs,
            `${getById(clusterId).name} route`,
        ));
    }

    return previews;
}

function renderResults(plan) {
    while (resultsEl.firstChild) resultsEl.removeChild(resultsEl.firstChild);
    resultsEl.hidden = false;

    if (!plan.ok) {
        const error = document.createElement('p');
        error.className = 'travel-error';
        error.textContent = REASON_MESSAGE[plan.reason] || REASON_MESSAGE.invalid;
        resultsEl.appendChild(error);
        return;
    }

    const summary = document.createElement('div');
    summary.className = 'travel-summary';

    const distanceStat = document.createElement('div');
    distanceStat.className = 'travel-stat';
    distanceStat.innerHTML = '<span class="travel-stat-label">Total distance</span>';
    const distanceValue = document.createElement('span');
    distanceValue.className = 'travel-stat-value';
    distanceValue.textContent = formatDistance(plan.totalLy, plan.totalAu);
    distanceStat.appendChild(distanceValue);
    summary.appendChild(distanceStat);

    const timeStat = document.createElement('div');
    timeStat.className = 'travel-stat';
    timeStat.innerHTML = '<span class="travel-stat-label">Travel time</span>';
    const timeValue = document.createElement('span');
    timeValue.className = 'travel-stat-value';
    timeValue.textContent = plan.totalDays > 0 ? formatDuration(plan.totalDays) : 'Effectively instant';
    timeStat.appendChild(timeValue);
    summary.appendChild(timeStat);

    resultsEl.appendChild(summary);

    const legList = document.createElement('ol');
    legList.className = 'travel-legs';
    if (plan.legs.length === 0) {
        const li = document.createElement('li');
        li.className = 'travel-leg';
        li.textContent = 'Same immediate vicinity — no meaningful transit required.';
        legList.appendChild(li);
    }
    for (const leg of plan.legs) {
        const li = document.createElement('li');
        li.className = 'travel-leg';

        const route = document.createElement('span');
        route.className = 'travel-leg-route';
        route.textContent = `${leg.fromName} → ${leg.toName}`;
        li.appendChild(route);

        const meta = document.createElement('span');
        meta.className = 'travel-leg-meta';
        meta.textContent = `${LEVEL_LABEL[leg.level] || leg.level} · ${formatDistance(leg.distanceLy, leg.distanceAu)} · ${formatDuration(leg.timeDays)}`;
        li.appendChild(meta);

        legList.appendChild(li);
    }
    resultsEl.appendChild(legList);

    resultsEl.appendChild(buildPreviews(plan));
}

function clearResults() {
    while (resultsEl.firstChild) resultsEl.removeChild(resultsEl.firstChild);
    resultsEl.hidden = true;
}

function updateSubmitState() {
    const from = fromField.getEntity();
    const to = toField.getEntity();
    submitButton.disabled = !from || !to || from.id === to.id;
}

function createField(labelText) {
    const wrap = document.createElement('div');
    wrap.className = 'travel-field';

    const label = document.createElement('label');
    label.textContent = labelText;
    wrap.appendChild(label);

    const selectedRow = document.createElement('div');
    selectedRow.className = 'travel-field-selected';
    selectedRow.hidden = true;
    const selectedName = document.createElement('span');
    selectedName.className = 'travel-field-selected-name';
    selectedRow.appendChild(selectedName);
    const changeButton = document.createElement('button');
    changeButton.type = 'button';
    changeButton.className = 'travel-field-change';
    changeButton.textContent = 'Change';
    selectedRow.appendChild(changeButton);
    wrap.appendChild(selectedRow);

    const searchWrap = document.createElement('div');
    searchWrap.className = 'travel-field-search';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'travel-field-input';
    input.placeholder = 'Search systems, planets, moons, locations…';
    searchWrap.appendChild(input);
    const resultsList = document.createElement('ul');
    resultsList.className = 'travel-field-results';
    resultsList.hidden = true;
    searchWrap.appendChild(resultsList);
    wrap.appendChild(searchWrap);

    let entity = null;

    function renderMatches(query) {
        while (resultsList.firstChild) resultsList.removeChild(resultsList.firstChild);
        const q = query.trim().toLowerCase();
        if (!q) {
            resultsList.hidden = true;
            return;
        }
        const matches = travelSearchIndex().filter((candidate) => candidate.name.toLowerCase().includes(q)).slice(0, MAX_RESULTS);
        resultsList.hidden = matches.length === 0;
        for (const match of matches) {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.type = 'button';
            button.textContent = describeEntity(match);
            button.addEventListener('mousedown', (evt) => evt.preventDefault());
            button.addEventListener('click', () => setEntity(match));
            li.appendChild(button);
            resultsList.appendChild(li);
        }
    }

    function showSelected() {
        selectedRow.hidden = false;
        searchWrap.hidden = true;
        selectedName.textContent = entity ? describeEntity(entity) : '';
    }

    function showSearch() {
        selectedRow.hidden = true;
        searchWrap.hidden = false;
        input.value = '';
        renderMatches('');
    }

    function setEntity(next) {
        entity = next;
        showSelected();
        clearResults();
        updateSubmitState();
    }

    input.addEventListener('input', () => renderMatches(input.value));
    input.addEventListener('blur', () => {
        setTimeout(() => { resultsList.hidden = true; }, 150);
    });
    input.addEventListener('focus', () => renderMatches(input.value));
    changeButton.addEventListener('click', () => {
        entity = null;
        clearResults();
        updateSubmitState();
        showSearch();
        input.focus();
    });

    showSearch();

    return {
        el: wrap,
        getEntity: () => entity,
        setEntity,
        clear() {
            entity = null;
            showSearch();
        },
        focus() {
            if (entity) return;
            input.focus();
        },
    };
}

function open() {
    panelEl.classList.add('open');
    panelEl.setAttribute('aria-hidden', 'false');
    openFlag = true;
}

export function isOpen() {
    return openFlag;
}

export function closeTravelPanel() {
    panelEl.classList.remove('open');
    panelEl.setAttribute('aria-hidden', 'true');
    openFlag = false;
}

export function openTravelPanelWithDestination(entity) {
    toField.setEntity(entity);
    fromField.clear();
    clearResults();
    updateSubmitState();
    open();
    fromField.focus();
}

export function openTravelPanelBlank() {
    toField.clear();
    fromField.clear();
    clearResults();
    updateSubmitState();
    open();
    toField.focus();
}

// Called on every map tap (alongside the normal select()/details-panel
// flow, which keeps working exactly as before) — while the travel panel is
// open, tapping a travelable node on the map is a shortcut for typing it
// into the "To" search field.
export function notifyTravelMapSelection(entityId) {
    if (!openFlag) return;
    const entity = getById(entityId);
    if (!isTravelable(entity)) return;
    toField.setEntity(entity);
}

export function initTravelPanel(onToggle) {
    panelEl = document.getElementById('travel-panel');
    onToggleCallback = onToggle || null;
    panelEl.addEventListener('transitionend', (evt) => {
        if (evt.propertyName === 'width' && evt.target === panelEl) onToggleCallback?.();
    });

    const inner = document.createElement('div');
    inner.className = 'travel-panel-inner';
    panelEl.appendChild(inner);

    const header = document.createElement('div');
    header.className = 'travel-panel-header';
    const heading = document.createElement('h2');
    heading.textContent = 'Plot a Route';
    header.appendChild(heading);
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'travel-panel-close';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close travel planner');
    closeButton.addEventListener('click', () => closeTravelPanel());
    header.appendChild(closeButton);
    inner.appendChild(header);

    const body = document.createElement('div');
    body.className = 'travel-panel-body';
    inner.appendChild(body);

    toField = createField('To');
    body.appendChild(toField.el);

    fromField = createField('From');
    body.appendChild(fromField.el);

    submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'travel-submit';
    submitButton.textContent = 'Plot Route';
    submitButton.disabled = true;
    submitButton.addEventListener('click', () => {
        const plan = planRoute(fromField.getEntity(), toField.getEntity());
        renderResults(plan);
    });
    body.appendChild(submitButton);

    resultsEl = document.createElement('div');
    resultsEl.className = 'travel-results';
    resultsEl.hidden = true;
    body.appendChild(resultsEl);
}

import { getById } from './data.js';
import { renderLevel } from './render.js';
import { raisePanel } from './panel-stack.js';
import {
    planRoute, applyAccuracy, describeEntity, travelSearchIndex, waypointSearchIndex,
    formatDistance, formatDuration, formatDurationFull, isTravelable,
    DEFAULT_CA_G, DEFAULT_MAX_CRUISE_C,
} from './travel.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const MAX_RESULTS = 8;
const DEFAULT_ACCURACY = 100;
const LEVEL_LABEL = { local: 'Local approach', system: 'System lane', cluster: 'Interstellar lane' };
const REASON_MESSAGE = {
    same: 'Choose two different locations to plot a route.',
    unreachable: 'No charted FTL lane connects this route’s stops yet.',
    invalid: 'Could not resolve one of those locations.',
    incomplete: 'Choose both a "From" and a "To" location.',
};

let panelEl = null;
let fromField = null;
let toField = null;
let waypointField = null;
let submitButton = null;
let resultsEl = null;
let accuracyInput = null;
let accuracyValueLabel = null;
let caInput = null;
let cruiseInput = null;
let openFlag = false;
let routeEditExpanded = false;
let onToggleCallback = null;
let lastPlan = null;
let lightboxEl = null;
let lightboxBackdropEl = null;

function currentAccuracy() {
    return Number(accuracyInput.value);
}

function currentCaG() {
    const value = Number(caInput.value);
    return value > 0 ? value : DEFAULT_CA_G;
}

function currentMaxCruiseC() {
    const value = Number(cruiseInput.value);
    return value > 0 ? value : DEFAULT_MAX_CRUISE_C;
}

function distanceText(lowLy, highLy, lowAu, highAu) {
    if (lowLy === highLy) return formatDistance(lowLy, lowAu);
    return `${formatDistance(lowLy, lowAu)} – ${formatDistance(highLy, highAu)}`;
}

function durationText(lowDays, highDays, formatFn) {
    if (lowDays === highDays) return formatFn(lowDays);
    return `${formatFn(lowDays)} – ${formatFn(highDays)}`;
}

function near(a, b) {
    return Math.abs(a - b) < 0.5;
}

// The small previews are the same fitted vector map regardless of size,
// so "expanding" one just means cloning its (already-highlighted) <svg>
// into a big centered overlay rather than re-rendering anything.
function openPreviewLightbox(title, svg) {
    raisePanel(lightboxEl, lightboxBackdropEl);
    while (lightboxEl.firstChild) lightboxEl.removeChild(lightboxEl.firstChild);

    const header = document.createElement('div');
    header.className = 'preview-lightbox-header';
    const heading = document.createElement('p');
    heading.className = 'preview-lightbox-title';
    heading.textContent = title;
    header.appendChild(heading);
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'preview-lightbox-close';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close enlarged route view');
    closeButton.addEventListener('click', () => closePreviewLightbox());
    header.appendChild(closeButton);
    lightboxEl.appendChild(header);

    const clone = svg.cloneNode(true);
    clone.setAttribute('class', 'preview-lightbox-map');
    lightboxEl.appendChild(clone);

    lightboxEl.classList.add('open');
    lightboxEl.setAttribute('aria-hidden', 'false');
    lightboxBackdropEl.classList.add('open');
}

function closePreviewLightbox() {
    lightboxEl.classList.remove('open');
    lightboxEl.setAttribute('aria-hidden', 'true');
    lightboxBackdropEl.classList.remove('open');
}

function initPreviewLightbox() {
    lightboxEl = document.getElementById('preview-lightbox');
    lightboxBackdropEl = document.getElementById('preview-lightbox-backdrop');
    lightboxBackdropEl.addEventListener('click', () => closePreviewLightbox());
    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' && lightboxEl.classList.contains('open')) closePreviewLightbox();
    });
}

// A small, non-interactive re-render of an existing map level (galaxy or a
// single cluster's systems), reusing renderLevel exactly as the live map
// does, then overlaying highlight classes on the specific nodes/lines this
// route passes through. Not wired to panzoom — it just fits a viewBox to
// its own bounds once, since it never needs to pan or zoom. The whole card
// doubles as a tap target that opens the same map bigger, since the fitted
// size here is comfortably small on narrow screens.
function buildPreviewSvg(state, highlightNodeIds, highlightPairs, title) {
    const wrap = document.createElement('div');
    wrap.className = 'travel-preview';
    wrap.setAttribute('role', 'button');
    wrap.setAttribute('tabindex', '0');
    wrap.setAttribute('aria-label', `Enlarge ${title}`);

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
        wrap.removeAttribute('role');
        wrap.removeAttribute('tabindex');
        wrap.removeAttribute('aria-label');
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

    const expandHint = document.createElement('span');
    expandHint.className = 'travel-preview-expand';
    expandHint.setAttribute('aria-hidden', 'true');
    expandHint.textContent = '⤢';
    wrap.appendChild(expandHint);

    wrap.appendChild(svg);
    wrap.addEventListener('click', () => openPreviewLightbox(title, svg));
    wrap.addEventListener('keydown', (evt) => {
        if (evt.key === 'Enter' || evt.key === ' ') {
            evt.preventDefault();
            openPreviewLightbox(title, svg);
        }
    });
    return wrap;
}

function buildPreviews(plan) {
    const previews = document.createElement('div');
    previews.className = 'travel-previews';

    const clusterPairs = plan.rawLegs.filter((leg) => leg.kind === 'cluster').map((leg) => [leg.from.split(':')[1], leg.to.split(':')[1]]);
    previews.appendChild(buildPreviewSvg({ level: 'cluster' }, plan.clusterIds, clusterPairs, 'Galaxy route'));

    const distinctClusters = [...new Set([plan.originSystem.clusterId, plan.destSystem.clusterId, ...plan.systemIdsByCluster.keys()])];
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

function renderResults(basePlan) {
    while (resultsEl.firstChild) resultsEl.removeChild(resultsEl.firstChild);
    resultsEl.hidden = false;

    if (!basePlan.ok) {
        const error = document.createElement('p');
        error.className = 'travel-error';
        error.textContent = REASON_MESSAGE[basePlan.reason] || REASON_MESSAGE.invalid;
        resultsEl.appendChild(error);
        return;
    }

    const plan = applyAccuracy(basePlan, currentAccuracy());

    const summary = document.createElement('div');
    summary.className = 'travel-summary';

    const distanceStat = document.createElement('div');
    distanceStat.className = 'travel-stat';
    distanceStat.innerHTML = '<span class="travel-stat-label">Total distance</span>';
    const distanceValue = document.createElement('span');
    distanceValue.className = 'travel-stat-value';
    distanceValue.textContent = distanceText(plan.lowLy, plan.highLy, plan.lowAu, plan.highAu);
    distanceStat.appendChild(distanceValue);
    summary.appendChild(distanceStat);

    const timeStat = document.createElement('div');
    timeStat.className = 'travel-stat';
    timeStat.innerHTML = '<span class="travel-stat-label">Travel time</span>';
    const timeValue = document.createElement('span');
    timeValue.className = 'travel-stat-value';
    timeValue.textContent = durationText(plan.lowDays, plan.highDays, formatDurationFull);
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
        const distancePart = distanceText(leg.lowLy, leg.highLy, leg.lowAu, leg.highAu);
        const timePart = durationText(leg.lowDays, leg.highDays, formatDuration);
        meta.textContent = `${LEVEL_LABEL[leg.level] || leg.level} · ${distancePart} · ${timePart}`;
        li.appendChild(meta);

        legList.appendChild(li);
    }
    resultsEl.appendChild(legList);

    resultsEl.appendChild(buildPreviews(plan));
}

function clearResults() {
    lastPlan = null;
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
    };
}

// An ordered, multi-entity variant of createField for the "Edit Route"
// waypoint list: instead of one selected/search slot, it's a running list
// (each with its own remove button) plus a search box that always stays in
// "add another" mode. Order matters — it's the order the route is forced
// to pass through, origin first to destination last.
function createWaypointList(onChange) {
    const wrap = document.createElement('div');
    wrap.className = 'travel-field travel-waypoints';

    const label = document.createElement('label');
    label.textContent = 'Route through (optional)';
    wrap.appendChild(label);

    const list = document.createElement('ol');
    list.className = 'travel-waypoint-list';
    wrap.appendChild(list);

    const searchWrap = document.createElement('div');
    searchWrap.className = 'travel-field-search';
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'travel-field-input';
    input.placeholder = 'Add a cluster, system, planet, moon, or location…';
    searchWrap.appendChild(input);
    const resultsList = document.createElement('ul');
    resultsList.className = 'travel-field-results';
    resultsList.hidden = true;
    searchWrap.appendChild(resultsList);
    wrap.appendChild(searchWrap);

    let waypoints = [];

    function renderWaypoints() {
        while (list.firstChild) list.removeChild(list.firstChild);
        waypoints.forEach((entity, index) => {
            const li = document.createElement('li');
            li.className = 'travel-waypoint-row';

            const name = document.createElement('span');
            name.className = 'travel-waypoint-name';
            name.textContent = describeEntity(entity);
            li.appendChild(name);

            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'travel-field-change';
            removeButton.textContent = 'Remove';
            removeButton.setAttribute('aria-label', `Remove ${entity.name} from the route`);
            removeButton.addEventListener('click', () => {
                waypoints.splice(index, 1);
                renderWaypoints();
                onChange?.();
            });
            li.appendChild(removeButton);

            list.appendChild(li);
        });
    }

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
                waypoints.push(match);
                renderWaypoints();
                input.value = '';
                resultsList.hidden = true;
                onChange?.();
            });
            li.appendChild(button);
            resultsList.appendChild(li);
        }
    }

    input.addEventListener('input', () => renderMatches(input.value));
    input.addEventListener('blur', () => {
        setTimeout(() => { resultsList.hidden = true; }, 150);
    });
    input.addEventListener('focus', () => renderMatches(input.value));

    return {
        el: wrap,
        getWaypoints: () => waypoints,
        clear() {
            waypoints = [];
            renderWaypoints();
            input.value = '';
            resultsList.hidden = true;
        },
        addWaypoint(entity) {
            waypoints.push(entity);
            renderWaypoints();
        },
    };
}

function resetAccuracy() {
    accuracyInput.value = String(DEFAULT_ACCURACY);
    accuracyValueLabel.textContent = `${DEFAULT_ACCURACY}%`;
}

function open() {
    raisePanel(panelEl);
    panelEl.classList.add('open');
    panelEl.setAttribute('aria-hidden', 'false');
    openFlag = true;
    // Fired immediately (not just on transitionend) so anything that only
    // cares about open/closed state — like collapsing the docked details
    // footer to free up room — updates right away instead of waiting out
    // the width transition. The map refit, which does need the transition's
    // final size, still waits for the transitionend listener below.
    onToggleCallback?.();
}

export function isOpen() {
    return openFlag;
}

function closeTravelPanel() {
    panelEl.classList.remove('open');
    panelEl.setAttribute('aria-hidden', 'true');
    openFlag = false;
    onToggleCallback?.();
}

// Deliberately does NOT auto-focus either search input — doing so
// immediately pops the on-screen keyboard on mobile the instant the panel
// opens, before the user has asked for it (and before the panel has even
// finished its width transition), which was also implicated in a mobile
// layout glitch where the keyboard's viewport resize left the details
// footer overlapping the panel instead of sitting cleanly below it.
export function openTravelPanelWithDestination(entity) {
    toField.setEntity(entity);
    fromField.clear();
    waypointField.clear();
    clearResults();
    resetAccuracy();
    updateSubmitState();
    open();
}

export function openTravelPanelBlank() {
    toField.clear();
    fromField.clear();
    waypointField.clear();
    clearResults();
    resetAccuracy();
    updateSubmitState();
    open();
}

// Called on every map tap (alongside the normal select()/details-panel
// flow, which keeps working exactly as before). Normally a shortcut for
// typing the tapped entity into the "To" search field; while the "Edit
// Route" section is expanded, it instead appends the tap as the next
// waypoint, so building a forced route can be done straight from the map
// instead of only by searching.
export function notifyTravelMapSelection(entityId) {
    if (!openFlag) return;
    const entity = getById(entityId);
    if (!entity) return;
    if (routeEditExpanded) {
        if (entity.kind !== 'cluster' && !isTravelable(entity)) return;
        waypointField.addWaypoint(entity);
        clearResults();
    } else {
        if (!isTravelable(entity)) return;
        toField.setEntity(entity);
    }
}

export function initTravelPanel(onToggle) {
    panelEl = document.getElementById('travel-panel');
    onToggleCallback = onToggle || null;
    initPreviewLightbox();
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

    const routeEditToggle = document.createElement('button');
    routeEditToggle.type = 'button';
    routeEditToggle.className = 'travel-advanced-toggle';
    routeEditToggle.textContent = 'Edit Route ▾';
    body.appendChild(routeEditToggle);

    const routeEditBody = document.createElement('div');
    routeEditBody.className = 'travel-advanced-body';
    routeEditBody.hidden = true;
    body.appendChild(routeEditBody);

    routeEditToggle.addEventListener('click', () => {
        routeEditBody.hidden = !routeEditBody.hidden;
        routeEditExpanded = !routeEditBody.hidden;
        routeEditToggle.textContent = routeEditBody.hidden ? 'Edit Route ▾' : 'Edit Route ▴';
    });

    waypointField = createWaypointList(() => clearResults());
    routeEditBody.appendChild(waypointField.el);

    const routeEditHint = document.createElement('p');
    routeEditHint.className = 'travel-accuracy-hint';
    routeEditHint.textContent = 'Force the route through one or more stops, in order, instead of the most direct path — you can also tap the map to add a stop while this is open.';
    routeEditBody.appendChild(routeEditHint);

    const advancedToggle = document.createElement('button');
    advancedToggle.type = 'button';
    advancedToggle.className = 'travel-advanced-toggle';
    advancedToggle.textContent = 'Advanced options ▾';
    body.appendChild(advancedToggle);

    const advancedBody = document.createElement('div');
    advancedBody.className = 'travel-advanced-body';
    advancedBody.hidden = true;
    body.appendChild(advancedBody);

    advancedToggle.addEventListener('click', () => {
        advancedBody.hidden = !advancedBody.hidden;
        advancedToggle.textContent = advancedBody.hidden ? 'Advanced options ▾' : 'Advanced options ▴';
    });

    const accuracyField = document.createElement('div');
    accuracyField.className = 'travel-field travel-accuracy';
    const accuracyLabel = document.createElement('label');
    accuracyLabel.textContent = 'Accuracy';
    accuracyField.appendChild(accuracyLabel);
    const accuracyRow = document.createElement('div');
    accuracyRow.className = 'travel-accuracy-row';
    accuracyInput = document.createElement('input');
    accuracyInput.type = 'range';
    accuracyInput.min = '0';
    accuracyInput.max = '100';
    accuracyInput.step = '1';
    accuracyInput.value = String(DEFAULT_ACCURACY);
    accuracyInput.className = 'travel-accuracy-input';
    accuracyValueLabel = document.createElement('span');
    accuracyValueLabel.className = 'travel-accuracy-value';
    accuracyValueLabel.textContent = `${DEFAULT_ACCURACY}%`;
    accuracyInput.addEventListener('input', () => {
        accuracyValueLabel.textContent = `${currentAccuracy()}%`;
        if (lastPlan) renderResults(lastPlan);
    });
    accuracyRow.appendChild(accuracyInput);
    accuracyRow.appendChild(accuracyValueLabel);
    accuracyField.appendChild(accuracyRow);
    const accuracyHint = document.createElement('p');
    accuracyHint.className = 'travel-accuracy-hint';
    accuracyHint.textContent = 'Below 100%, distance and time show as a range from the charted figure up to that much longer.';
    accuracyField.appendChild(accuracyHint);
    advancedBody.appendChild(accuracyField);

    const caField = document.createElement('div');
    caField.className = 'travel-field';
    const caLabel = document.createElement('label');
    caLabel.textContent = 'Constant acceleration (g)';
    caField.appendChild(caLabel);
    caInput = document.createElement('input');
    caInput.type = 'number';
    caInput.min = '1';
    caInput.step = '10';
    caInput.value = String(DEFAULT_CA_G);
    caInput.className = 'travel-advanced-input';
    caInput.addEventListener('input', () => {
        if (lastPlan) {
            lastPlan = planRoute(fromField.getEntity(), toField.getEntity(), currentCaG(), currentMaxCruiseC(), waypointField.getWaypoints());
            renderResults(lastPlan);
        }
    });
    caField.appendChild(caInput);
    advancedBody.appendChild(caField);

    const cruiseField = document.createElement('div');
    cruiseField.className = 'travel-field';
    const cruiseLabel = document.createElement('label');
    cruiseLabel.textContent = 'Max cruise speed (c)';
    cruiseField.appendChild(cruiseLabel);
    cruiseInput = document.createElement('input');
    cruiseInput.type = 'number';
    cruiseInput.min = '1';
    cruiseInput.step = '1';
    cruiseInput.value = String(DEFAULT_MAX_CRUISE_C);
    cruiseInput.className = 'travel-advanced-input';
    cruiseInput.addEventListener('input', () => {
        if (lastPlan) {
            lastPlan = planRoute(fromField.getEntity(), toField.getEntity(), currentCaG(), currentMaxCruiseC(), waypointField.getWaypoints());
            renderResults(lastPlan);
        }
    });
    cruiseField.appendChild(cruiseInput);
    advancedBody.appendChild(cruiseField);

    const advancedHint = document.createElement('p');
    advancedHint.className = 'travel-accuracy-hint';
    advancedHint.textContent = "Your vessel's own constant-acceleration and cruise ratings — the setting's standard is 5300g / 200c.";
    advancedBody.appendChild(advancedHint);

    submitButton = document.createElement('button');
    submitButton.type = 'button';
    submitButton.className = 'travel-submit';
    submitButton.textContent = 'Plot Route';
    submitButton.disabled = true;
    submitButton.addEventListener('click', () => {
        lastPlan = planRoute(fromField.getEntity(), toField.getEntity(), currentCaG(), currentMaxCruiseC(), waypointField.getWaypoints());
        renderResults(lastPlan);
    });
    body.appendChild(submitButton);

    resultsEl = document.createElement('div');
    resultsEl.className = 'travel-results';
    resultsEl.hidden = true;
    body.appendChild(resultsEl);
}

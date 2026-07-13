import { clusters, systemsOf, bodiesOf, clusterRoutes, systemRoutesWithin, bodyRoutesWithin } from './data.js';

const SVG_NS = 'http://www.w3.org/2000/svg';
const NODE_RADIUS = { cluster: 18, system: 16, body: 12 };

function entitiesAndRoutesFor(state) {
    if (state.level === 'cluster') {
        return { entities: clusters(), routes: clusterRoutes() };
    }
    if (state.level === 'system') {
        return { entities: systemsOf(state.clusterId), routes: systemRoutesWithin(state.clusterId) };
    }
    return { entities: bodiesOf(state.systemId), routes: bodyRoutesWithin(state.systemId) };
}

function boundsOf(entities) {
    const xs = entities.map((entity) => entity.position.x);
    const ys = entities.map((entity) => entity.position.y);
    return {
        minX: Math.min(...xs),
        maxX: Math.max(...xs),
        minY: Math.min(...ys),
        maxY: Math.max(...ys),
    };
}

export function renderLevel(viewportEl, state) {
    while (viewportEl.firstChild) viewportEl.removeChild(viewportEl.firstChild);

    const { entities, routes } = entitiesAndRoutesFor(state);
    const byId = new Map(entities.map((entity) => [entity.id, entity]));

    const edgeGroup = document.createElementNS(SVG_NS, 'g');
    edgeGroup.setAttribute('class', 'edges');
    viewportEl.appendChild(edgeGroup);

    for (const route of routes) {
        const from = byId.get(route.from);
        const to = byId.get(route.to);
        if (!from || !to) continue;

        const line = document.createElementNS(SVG_NS, 'line');
        line.setAttribute('x1', from.position.x);
        line.setAttribute('y1', from.position.y);
        line.setAttribute('x2', to.position.x);
        line.setAttribute('y2', to.position.y);
        line.setAttribute('class', 'route-line');

        if (route.label) {
            const title = document.createElementNS(SVG_NS, 'title');
            title.textContent = route.label;
            line.appendChild(title);
        }

        edgeGroup.appendChild(line);
    }

    const nodeGroup = document.createElementNS(SVG_NS, 'g');
    nodeGroup.setAttribute('class', 'nodes');
    viewportEl.appendChild(nodeGroup);

    for (const entity of entities) {
        const g = document.createElementNS(SVG_NS, 'g');
        g.setAttribute('class', `node node-${entity.kind}`);
        g.setAttribute('transform', `translate(${entity.position.x},${entity.position.y})`);
        g.setAttribute('data-id', entity.id);

        const circle = document.createElementNS(SVG_NS, 'circle');
        circle.setAttribute('r', NODE_RADIUS[entity.kind]);
        g.appendChild(circle);

        const label = document.createElementNS(SVG_NS, 'text');
        label.setAttribute('class', 'node-label');
        label.setAttribute('y', NODE_RADIUS[entity.kind] + 16);
        label.textContent = entity.name;
        g.appendChild(label);

        nodeGroup.appendChild(g);
    }

    return entities.length ? boundsOf(entities) : null;
}

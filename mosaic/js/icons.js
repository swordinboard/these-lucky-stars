const SVG_NS = 'http://www.w3.org/2000/svg';

function el(tag, attrs) {
    const node = document.createElementNS(SVG_NS, tag);
    for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
    return node;
}

const BUILDERS = {
    satellite(svg) {
        svg.appendChild(el('rect', { x: 9, y: 9, width: 6, height: 6 }));
        svg.appendChild(el('rect', { x: 0, y: 10.5, width: 7, height: 3 }));
        svg.appendChild(el('rect', { x: 17, y: 10.5, width: 7, height: 3 }));
        svg.appendChild(el('line', { x1: 15, y1: 9, x2: 19, y2: 5 }));
    },
    station(svg) {
        svg.appendChild(el('circle', { cx: 12, cy: 12, r: 9, class: 'icon-stroke' }));
        svg.appendChild(el('line', { x1: 12, y1: 1, x2: 12, y2: 3 }));
        svg.appendChild(el('line', { x1: 12, y1: 21, x2: 12, y2: 23 }));
        svg.appendChild(el('line', { x1: 1, y1: 12, x2: 3, y2: 12 }));
        svg.appendChild(el('line', { x1: 21, y1: 12, x2: 23, y2: 12 }));
        svg.appendChild(el('circle', { cx: 12, cy: 12, r: 2 }));
    },
    misc(svg) {
        svg.appendChild(el('polygon', { points: '12,4 20,12 12,20 4,12' }));
    },
    surface(svg) {
        svg.appendChild(el('line', { x1: 4, y1: 18, x2: 20, y2: 18 }));
        svg.appendChild(el('circle', { cx: 12, cy: 13, r: 4 }));
    },
    moon(svg) {
        svg.appendChild(el('circle', { cx: 12, cy: 12, r: 6 }));
    },
};

export function createIcon(kind, { size = 24 } = {}) {
    const svg = el('svg', { viewBox: '0 0 24 24', width: size, height: size, class: `icon icon-${kind}` });
    (BUILDERS[kind] || BUILDERS.misc)(svg);
    return svg;
}

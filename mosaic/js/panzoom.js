const MIN_SCALE = 0.2;
const MAX_SCALE = 4;
const FIT_PADDING = 80;
const TAP_MOVE_THRESHOLD = 10;
const DOUBLE_TAP_MS = 350;

function midpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function distance(a, b) {
    return Math.hypot(a.x - b.x, a.y - b.y);
}

function clampScale(k) {
    return Math.min(MAX_SCALE, Math.max(MIN_SCALE, k));
}

// Pan/zoom uses svgEl.setPointerCapture() during drag/pinch, which causes
// Chromium to retarget the synthesized click/dblclick events to svgEl
// instead of the node underneath. So node selection can't rely on native
// click events — tap/double-tap detection happens here instead, keyed by
// each node's stable data-id (not DOM element identity, since selecting a
// node triggers a full re-render that replaces the DOM node it was on).
export function createPanZoom(svgEl, viewportEl, { onTap, onDoubleTap, onChange } = {}) {
    const transform = { x: 0, y: 0, k: 1 };
    const pointers = new Map();
    let dragStart = null;
    let pinchDistance = null;
    let singleGesture = null;
    let lastTap = { time: 0, id: null };
    let constraints = null;
    let suppressGhostClickUntil = 0;

    // When constraints are set (the orrery's "star locked left, side-scroll"
    // mode), clamp every transform change here rather than special-casing
    // drag/zoom — apply() is the single place all transform mutations funnel
    // through, so the lock stays correct regardless of what caused the change.
    function apply() {
        if (constraints) {
            const { gutter, trailingMargin, contentMinX, contentMaxX, rectWidth, fixedY } = constraints;
            const maxX = gutter - contentMinX * transform.k;
            const minXRaw = rectWidth - trailingMargin - contentMaxX * transform.k;
            const minX = Math.min(minXRaw, maxX);
            transform.x = Math.min(maxX, Math.max(minX, transform.x));
            transform.y = fixedY;
        }
        viewportEl.setAttribute('transform', `translate(${transform.x},${transform.y}) scale(${transform.k})`);
        onChange && onChange(transform);
    }

    function svgPoint(evt) {
        const rect = svgEl.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    function zoomAt(point, factor) {
        const newScale = clampScale(transform.k * factor);
        const ratio = newScale / transform.k;
        transform.x = point.x - ratio * (point.x - transform.x);
        transform.y = point.y - ratio * (point.y - transform.y);
        transform.k = newScale;
        apply();
    }

    function onPointerDown(evt) {
        evt.preventDefault();
        svgEl.setPointerCapture(evt.pointerId);
        const point = svgPoint(evt);
        pointers.set(evt.pointerId, point);

        if (pointers.size === 1) {
            dragStart = { x: point.x, y: point.y, tx: transform.x, ty: transform.y };
            pinchDistance = null;
            const nodeEl = evt.target.closest && evt.target.closest('.node');
            singleGesture = {
                pointerId: evt.pointerId,
                startX: point.x,
                startY: point.y,
                nodeId: nodeEl ? nodeEl.getAttribute('data-id') : null,
            };
        } else if (pointers.size === 2) {
            dragStart = null;
            singleGesture = null;
            const [a, b] = pointers.values();
            pinchDistance = distance(a, b);
        }
    }

    function onPointerMove(evt) {
        if (!pointers.has(evt.pointerId)) return;
        pointers.set(evt.pointerId, svgPoint(evt));

        if (pointers.size === 1 && dragStart) {
            const [point] = pointers.values();
            transform.x = dragStart.tx + (point.x - dragStart.x);
            transform.y = dragStart.ty + (point.y - dragStart.y);
            apply();
        } else if (pointers.size === 2) {
            const [a, b] = pointers.values();
            const newDistance = distance(a, b);
            if (pinchDistance) zoomAt(midpoint(a, b), newDistance / pinchDistance);
            pinchDistance = newDistance;
        }
    }

    function onPointerEnd(evt) {
        evt.preventDefault();
        if (singleGesture && singleGesture.pointerId === evt.pointerId) {
            const finalPoint = pointers.get(evt.pointerId) || svgPoint(evt);
            const moved = distance(finalPoint, { x: singleGesture.startX, y: singleGesture.startY });

            if (moved < TAP_MOVE_THRESHOLD && singleGesture.nodeId) {
                const now = Date.now();
                if (now - lastTap.time < DOUBLE_TAP_MS && lastTap.id === singleGesture.nodeId) {
                    // Chromium still dispatches a synthesized compatibility
                    // 'click' after touch input even though pointerdown/up
                    // above call preventDefault(). That ghost click re-hit-
                    // tests the DOM a few ms after this handler returns, so
                    // if onDoubleTap just revealed a new interactive overlay
                    // (e.g. the location drawer's backdrop), the ghost click
                    // can land on it and immediately undo what the double-tap
                    // opened. Swallow the very next click within a window far
                    // shorter than any real human input can chain, to eat
                    // that ghost click specifically.
                    if (evt.pointerType === 'touch') suppressGhostClickUntil = Date.now() + 100;
                    onDoubleTap && onDoubleTap(singleGesture.nodeId);
                    lastTap = { time: 0, id: null };
                } else {
                    onTap && onTap(singleGesture.nodeId);
                    lastTap = { time: now, id: singleGesture.nodeId };
                }
            }
        }

        pointers.delete(evt.pointerId);
        singleGesture = null;

        if (pointers.size === 1) {
            const [point] = pointers.values();
            dragStart = { x: point.x, y: point.y, tx: transform.x, ty: transform.y };
            pinchDistance = null;
        } else {
            dragStart = null;
            pinchDistance = null;
        }
    }

    function onWheel(evt) {
        evt.preventDefault();
        zoomAt(svgPoint(evt), evt.deltaY < 0 ? 1.1 : 0.9);
    }

    svgEl.addEventListener('pointerdown', onPointerDown);
    svgEl.addEventListener('pointermove', onPointerMove);
    svgEl.addEventListener('pointerup', onPointerEnd);
    svgEl.addEventListener('pointercancel', onPointerEnd);
    svgEl.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('click', (evt) => {
        if (Date.now() < suppressGhostClickUntil) {
            suppressGhostClickUntil = 0;
            evt.preventDefault();
            evt.stopPropagation();
        }
    }, true);

    return {
        fitToBounds(bounds) {
            constraints = null;
            const rect = svgEl.getBoundingClientRect();
            const width = Math.max(bounds.maxX - bounds.minX, 1) + FIT_PADDING * 2;
            const height = Math.max(bounds.maxY - bounds.minY, 1) + FIT_PADDING * 2;
            const scale = clampScale(Math.min(rect.width / width, rect.height / height));
            const centerX = (bounds.minX + bounds.maxX) / 2;
            const centerY = (bounds.minY + bounds.maxY) / 2;

            transform.k = scale;
            transform.x = rect.width / 2 - scale * centerX;
            transform.y = rect.height / 2 - scale * centerY;
            apply();
        },

        // Orrery mode: fit to height only (not width), constrain panning to
        // horizontal side-scroll — content can never scroll past showing
        // `gutter` aligned to `bounds.minX` (e.g. the star's center docked at
        // the screen edge), but is free to scroll further to reveal distant
        // bodies, letting that reference point scroll fully off-screen.
        // Zoom still works freely.
        fitHorizontal(bounds, gutter) {
            const rect = svgEl.getBoundingClientRect();
            const height = Math.max(bounds.maxY - bounds.minY, 1) + FIT_PADDING * 2;
            const scale = clampScale(rect.height / height);
            const trailingMargin = 60;

            transform.k = scale;
            const fixedY = rect.height / 2 - scale * ((bounds.minY + bounds.maxY) / 2);
            constraints = {
                gutter,
                trailingMargin,
                contentMinX: bounds.minX,
                contentMaxX: bounds.maxX,
                rectWidth: rect.width,
                fixedY,
            };
            transform.x = gutter - bounds.minX * scale;
            transform.y = fixedY;
            apply();
        },
    };
}

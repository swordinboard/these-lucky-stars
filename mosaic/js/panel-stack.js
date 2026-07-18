// Several independent panels (sidebar, location list, a location's full-page
// details, the travel planner) can all be open over the map at once, each
// with its own fixed z-index in the stylesheet. That's fine until two of
// them overlap — whichever happened to have the bigger hardcoded number
// always won, regardless of which one the user actually opened last (e.g.
// opening the travel panel from a location's full-page view used to open it
// "underneath" that view, since the view's z-index was hardcoded higher).
// Instead, every panel calls raisePanel() on open, which hands out a
// strictly increasing z-index — so whichever panel opened most recently is
// always the one on top, however many others are open behind it.
const BASE_Z = 40;
let topZ = BASE_Z;

export function raisePanel(el, pairedBelow = null) {
    topZ += 2;
    el.style.zIndex = String(topZ);
    if (pairedBelow) pairedBelow.style.zIndex = String(topZ - 1);
}

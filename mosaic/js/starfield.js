import { hashStringToSeed, mulberry32 } from './random.js';

const STAR_COUNT = 14;

// Same seed always produces the same arrangement (stable while you stay on
// a given page); a different seed (a different cluster/system) produces a
// visibly different one.
export function renderStarfield(seed) {
    const rng = mulberry32(hashStringToSeed(seed));
    const layers = [];

    for (let i = 0; i < STAR_COUNT; i++) {
        const x = (rng() * 100).toFixed(1);
        const y = (rng() * 100).toFixed(1);
        const size = (1 + rng() * 0.5).toFixed(1);
        const opacity = (0.35 + rng() * 0.55).toFixed(2);
        layers.push(`radial-gradient(${size}px ${size}px at ${x}% ${y}%, rgba(255,255,255,${opacity}), transparent 60%)`);
    }

    document.body.style.backgroundImage = layers.join(', ');
}

export function setStarfieldOffset(x, y) {
    document.body.style.backgroundPosition = `${x}px ${y}px`;
}

import { raisePanel } from './panel-stack.js';

const ABOUT_PARAGRAPHS = [
    "This navigation tool assumes travel is performed using standard constant acceleration methods within charted space as outlined in section 189a of NaviGo's Standard Galactic Infrastructure Manual.",
    "Enter your vessel's constant acceleration (CA) and cruise values to determine travel time.",
    'Use the accuracy slider to account for travel conditions.',
    'Travel outside of the provided lanes will requires extreme caution and preparation incuding but not limited to navigational calculations, unexpected object avoidance protocols, space-time fluctuation accounting, gravitational anomaly prevention and specialized inertial equipment for crew and equipment survivability. Professional assistance is strongly recommended.',
];

let panelEl = null;
let backdropEl = null;
let openFlag = false;

export function isAboutOpen() {
    return openFlag;
}

export function openAboutPanel() {
    raisePanel(panelEl, backdropEl);
    panelEl.classList.add('open');
    panelEl.setAttribute('aria-hidden', 'false');
    backdropEl.classList.add('open');
    openFlag = true;
}

export function closeAboutPanel() {
    panelEl.classList.remove('open');
    panelEl.setAttribute('aria-hidden', 'true');
    backdropEl.classList.remove('open');
    openFlag = false;
}

export function initAboutPanel() {
    panelEl = document.getElementById('about-panel');
    backdropEl = document.getElementById('about-panel-backdrop');
    backdropEl.addEventListener('click', () => closeAboutPanel());

    const header = document.createElement('div');
    header.className = 'about-panel-header';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'about-panel-close';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close about page');
    closeButton.addEventListener('click', () => closeAboutPanel());
    header.appendChild(closeButton);
    panelEl.appendChild(header);

    const body = document.createElement('div');
    body.className = 'about-panel-body';

    const title = document.createElement('h1');
    title.textContent = 'NaviGo Compact';
    body.appendChild(title);

    const subtitle = document.createElement('h3');
    subtitle.textContent = 'Interactive map and navigation tool for the Mosaic Galaxy.';
    body.appendChild(subtitle);

    for (const paragraph of ABOUT_PARAGRAPHS) {
        const p = document.createElement('p');
        p.textContent = paragraph;
        body.appendChild(p);
    }

    panelEl.appendChild(body);
}

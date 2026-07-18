let closeSidebarImpl = () => {};

export function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    const openButton = document.getElementById('menu-button');
    const closeButton = document.getElementById('sidebar-close');

    function open() {
        sidebar.classList.add('open');
        sidebar.setAttribute('aria-hidden', 'false');
        overlay.hidden = false;
        openButton.setAttribute('aria-expanded', 'true');
    }

    function close() {
        sidebar.classList.remove('open');
        sidebar.setAttribute('aria-hidden', 'true');
        overlay.hidden = true;
        openButton.setAttribute('aria-expanded', 'false');
    }

    closeSidebarImpl = close;

    openButton.addEventListener('click', open);
    closeButton.addEventListener('click', close);
    overlay.addEventListener('click', close);
}

export function closeSidebar() {
    closeSidebarImpl();
}

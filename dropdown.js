// dropdown.js

export function dropdown() {
    document.querySelectorAll('.dropdown-container').forEach(container => {
        const btn = container.querySelector('.dropdown-btn');
        const menu = container.querySelector('.dropdown-content');

        btn.addEventListener('click', e => {
            menu.classList.toggle('dropdown-show');
        });

        window.onclick = e => {
            if (e.target !== btn) {
                menu.classList.remove('dropdown-show');
            }
        }
    });
}

// pagination.js

import { displayUsers, updatePagination } from './app.js';

export function handlePageClick(e) {
    e.preventDefault();
    if (e.target.tagName === "A") {
        const currentPage = parseInt(e.target.dataset.page);
        displayUsers(currentPage);
        updatePagination();
        const paginationLinks = document.querySelectorAll("#pagination a");
        paginationLinks.forEach(link => {
            link.classList.remove("active");
        });
        e.target.classList.add("active");
    }
}

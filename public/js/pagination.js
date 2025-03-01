const productPages = ({ page, totalPages, hasPrevPage, prevPage, hasNextPage, nextPage }) => {
    return `
    <nav aria-label="page navigation">
        <ul class="pagination justify-content-center">
            <li class="page-item ${hasPrevPage ? "" : "disabled"}">
                <a class="page-link" role="button" id="prevPage" data-page="${prevPage}">Anterior</a>
            </li>
            ${Array.from({ length: totalPages }, (_, i) => `
            <li class="page-item ${page === i + 1 ? "active" : ""}">
                <a class="page-link" data-page="${i + 1}">${i + 1}</a>
            </li>
            `).join('')}
            <li class="page-item ${hasNextPage ? "" : "disabled"}">
                <a class="page-link" role="button" id="nextPage" data-page="${nextPage}">Siguiente</a>
            </li>
        </ul>
    </nav>
    `;
};

//Establece la paginación
const setupPagination = (products) => {
    document.getElementById("prevPage")?.addEventListener("click", () => {
        socket.emit("getProducts", { page: products.prevPage });
    });

    document.getElementById("nextPage")?.addEventListener("click", () => {
        socket.emit("getProducts", { page: products.nextPage });
    });
};

//Mover a la página de detalles del producto
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("getProductDetails")) {
        const productId = e.target.dataset.id;
        window.location.href = `/product/${productId}`;
    }
});
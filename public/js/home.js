//Componentes
const productList = document.getElementById("productList");
const form = document.getElementById("productForm");

const card = ({ id, title, code, description, price, thumbnail }) => {
    return `
    <div class="border border-secondary border-2 shadow-lg card text-center text-bg-dark mb-1 col-4" style="width: 18rem;" value="${id}">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s" class="card-img-top fluid" alt=${thumbnail}>
            <div class="card-body d-flex flex-column">
                <h3 class="card-title">${title}</h3>
                <p style="margin-bottom: 5px; font-size: 12px">(Codigo: ${code})</p>
                <h4 class="card-subtitle mb-2">$${price}</h4>
                <p class="card-text">${description}</p>
                <div class="mt-auto">
                    <a href="#" class="btn btn-primary getProductDetails" style="width: 45%;" data-id="${id}">Detalles</a>
                </div>
            </div>
    </div>
    `;
};

//Generar lista de productos
socket.emit("getProducts", { page: 1 });

socket.on("products", (products) => {
    productList.innerHTML = "";
    products.docs.forEach(product => {
        const innerHtml = card(product);

        productList.innerHTML += innerHtml;
    });
    productList.innerHTML += productPages(products);
    setupPagination(products);
});

//Filtrar por disponibilidad
document.addEventListener("click", (e) => {
    if (e.target.id === "availableProducts" || e.target.id === "allProducts") {
        document.getElementById("availableProducts")?.classList.remove("active");
        document.getElementById("allProducts")?.classList.remove("active");
    }

    if (e.target && e.target.id === "availableProducts") {
        e.target.classList.add("active");
        socket.emit("getAvailableProducts", { page: 1 });
    }

    if (e.target && e.target.id === "allProducts") {
        e.target.classList.add("active");
        socket.emit("getProducts", { page: 1 });
    }
});
//Componentes
const productList = document.getElementById("productList");
const form = document.getElementById("productForm");
const category = window.location.pathname.split("/")[2];

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
                    <a href="#" class="btn btn-primary getProductDetails" data-id="${id}">Detalles</a>
                    ${window.location.pathname == '/realTimeProducts' ? `
                    <a href="#" class="btn btn-primary" id="purchase">Comprar</a>
                    <a href="#" class="btn btn-danger" onClick="deleteProduct('${id}')">Borrar</a>
                    `
            : ''}
                </div>
            </div>
    </div>
    `;
};

//Generar lista de productos
socket.emit("getCategory", { category, page: 1 });

socket.on("categoryProducts", (products) => {
    productList.innerHTML = "";
    products.docs.forEach(product => {
        const innerHtml = card(product);
        productList.innerHTML += innerHtml;
    });
    productList.innerHTML += productPages(products);
    setupPagination(products);
});
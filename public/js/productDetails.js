const productId = window.location.pathname.split("/")[2];

//Componentes
const product = document.getElementById("product");

const card = ({ id, title, code, status, category, description, price, stock, thumbnail }) => {
    return `
    <div class="border border-secondary border-2 shadow-lg card text-center text-bg-dark mb-1 col-4" style="width: 28rem;" value="${id}">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s" class="card-img-top fluid" alt=${thumbnail}>
            <div class="card-body d-flex flex-column">
                <h3 class="card-title mb-0">${title}</h3>
                <p class="card-text fst-italic">Categoria: ${category}</p>
                <p style="margin-bottom: 5px; font-size: 12px">(Codigo: ${code})</p>
                <h4 class="card-subtitle mb-2">$${price}</h4>
                <p style="margin-bottom: 5px; font-size: 12px">En Stock: ${stock} (Disponible: ${status})</p>
                <p class="card-text">${description}</p>
                <div class="mt-auto">
                    <a href="#" class="btn btn-success me-3" id="addProduct">Agregar al 🛒</a>
                    <a href="#" class="btn btn-danger" id="deleteProduct">Borrar 🚮</a>
                </div>
            </div>
    </div>
    `;
};

//Obtiene un producto por ID
socket.emit("productId", productId);

socket.on("product", (productData) => {
    product.innerHTML = card(productData);
});

//Agregar un producto al carrito
const handleAddProduct = () => {
    socket.emit("addToCart", productId);
    showToast(`Producto de id: "${productId}" agregado con exito! 🎁`, {
        background: "linear-gradient(to right,rgb(0, 114, 176),rgb(132, 38, 110))",
    });
};

//Borrar producto de la base de datos
const handleDeleteProduct = () => {
    socket.emit("deleteProduct", productId);
    showToast(`Producto borrado con exito! Redireccionando...`, {
        background: "linear-gradient(to right,rgb(176, 0, 0),rgba(0, 0, 0, 0.5))",
    });

    setTimeout(() => {
        window.location.href = "/";
    }, 3000);
};

//Toastify para agregar/borrar productos
const showToast = (message, style) => {
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: style,
        onClick: function () { }
    }).showToast();
};

//Delegación de eventos
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "addProduct") {
        handleAddProduct();
    } else if (e.target && e.target.id === "deleteProduct") {
        handleDeleteProduct();
    }
});
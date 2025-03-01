const cart = document.getElementById("cart");

const card = ({ product, quantity }) => {
    let total = product.price * quantity;
    return `
    <div class="card m-3 bg-secondary-subtle w-50">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <div class="d-flex flex-row align-items-center">
                    <div>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXxZR0_1ISIJx_T4oB5-5OJVSNgSMFLe8eCw&s"
                            class="img-fluid rounded-3" alt=${product.title} style="width: 65px;"/>
                    </div>
                    <div class="ms-3">
                        <h5>${product.title}</h5>
                        <p class="small mb-0">$${product.price}</p>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div style="width: 50px;">
                        <h5 class="mb-0 pe-3 d-inline">x${quantity}</h5>
                    </div>
                    <div style="width: 80px;">
                        <h5 class="mb-0">$${total}</h5>
                    </div>
                    <a href="#" class="clearCart btn btn-danger" data-product-id="${product._id}">Borrar 🚮</a>
                </div>
            </div>
        </div>
    </div>
    `;
};

//Obtiene el ID del carrito
const cartId = window.location.pathname.split("/")[2];
socket.emit("cartId", cartId);

//Actualiza el contenido del carrito
socket.on("cart", (cartData) => {
    updateCartDisplay(cartData);
});

const updateCartDisplay = (cartData) => {
    cart.innerHTML = "";
    cartData.products.forEach(product => {
        cart.innerHTML += card(product);
    });
};

//Remover producto del carrito
const handleRemoveProduct = (cartId, productId) => {
    socket.emit("removeProduct", { cartId, productId });
    socket.emit("cartId", cartId);
};

//Limpiar carrito
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "clearCart") {
        Swal.fire({
            title: "Estas seguro de eliminar los productos tu carrito?",
            text: "No es posible volver atras!",
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirmar"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "🛒 Borrado!",
                    text: "El carro fue limpiado con exito.",
                    icon: "success"
                });

                socket.emit("clearCart", window.location.pathname.split("/")[2]);
                cart.innerHTML = "";
            }
        });
    }
});

//Completar compra
const handleFinishPurchase = (cartId) => {
    Swal.fire({
        title: "Compra completada!",
        text: "Redireccionando...",
        icon: "success"
    });
    socket.emit("clearCart", cartId);
    cart.innerHTML = "";

    setTimeout(() => {
        window.location.href = "/";
    }, 2000);
};

//Delegación de eventos
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-danger")) {
        const productId = e.target.dataset.productId;
        handleRemoveProduct(cartId, productId);
    } else if (e.target && e.target.id === "clearCart") {
        handleClearCart(cartId);
    } else if (e.target && e.target.id === "finishPurchase") {
        handleFinishPurchase(cartId);
    }
});
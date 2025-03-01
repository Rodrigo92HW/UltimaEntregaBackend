//Crear producto
document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "submitProduct") {
        createProductForm();
    }
});

const createProductForm = () => {
    const form = document.getElementById('productForm');
    form.onsubmit = async (e) => {
        e.preventDefault();
        const productData = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            code: document.getElementById("code").value,
            price: document.getElementById("price").value,
            thumbnail: document.getElementById("thumbnail").value,
            category: document.getElementById("category").value
        };
        await socket.emit("newProduct", productData);

        form.reset();
        showToast(`Producto ${productData.title} creado correctamente`);

        socket.emit("getProducts", { page: 1 });
    }
}

const showToast = (message) =>
    Toastify({
        text: message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { }
    }).showToast();

import express from "express";
import { engine } from "express-handlebars";
import http from "http";
import { Server } from "socket.io";
import realTimeProductsRouter from "./routes/realTimeProducts.route.js";
import productRouter from "./routes/products.route.js";
import cartRouter from "./routes/cart.route.js";
import connectMongoDB from "./db/mongoDB.js";
import productDetailsRoute from "./routes/productDetails.route.js";
import cartDetailsRoute from "./routes/cartDetails.route.js";
import categorizedProductsRouter from "./routes/categorizedProducts.route.js";

//Inicio del servidor y configuración inicial
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"))

connectMongoDB();

//Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Endpoints
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/realtimeproducts", realTimeProductsRouter);
app.use("/product", productDetailsRoute);
app.use("/cart", cartDetailsRoute);
app.use("/category", categorizedProductsRouter);

// Renderiza home.handlebars
app.get("/", (_, res) => {
    res.render("home");
});

//Cart ID
export let cartId = "";

const generateCart = async () => {
    await fetch("http://localhost:8080/api/cart", { method: "POST" });

    const response = await fetch("http://localhost:8080/api/cart");
    const data = await response.json();
    cartId = data.payload[0]._id;
}

if (cartId === "") {
    generateCart();
}

//Websockets
io.on("connection", async (socket) => {
    try {
        //Header
        //Pasar ID carrito activo
        socket.emit("cartId", cartId);

        //Home
        //Lista de Productos
        socket.on("getProducts", async ({ page }) => {
            try {
                const response = await fetch(`http://localhost:8080/api/products?page=${page}`);
                const data = await response.json();
                socket.emit("products", data.payload);
            } catch (error) {
                console.error("Error recuperando productos:", error);
            }
        });

        socket.on("getAvailableProducts", async ({ page }) => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/list/available?page=${page}`);
                const data = await response.json();
                socket.emit("products", data.payload);
            } catch (error) {
                console.error("Error recuperando productos:", error);
            }
        });

        //Product Details
        //Detalle de Producto
        socket.on("productId", async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${id}`);
                const data = await response.json();
                socket.emit("product", data.payload);
            } catch (error) {
                console.error(`Error recuperando producto con id (${id}): `, error);
            }
        });

        //Agregar al carrito
        socket.on("addToCart", async (id) => {
            try {
                await fetch(`http://localhost:8080/api/cart/${cartId}/product/${id}`, { method: "PUT" });
            } catch (error) {
                console.error("Error agregando producto al carro:", error);
            }
        });

        //Borrar producto
        socket.on("deleteProduct", async (id) => {
            try {
                await fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE" });
            } catch (error) {
                console.error("Error borrando el producto:", error);
            }
        });

        //Categorized Products
        //Lista de productos por categoría
        socket.on("getCategory", async ({ category, page }) => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/category/${category}?page=${page}`);
                const data = await response.json();
                socket.emit("categoryProducts", data.payload);
            } catch (error) {
                console.error("Error filtrando productos:", error);
            }
        });

        //Realtime Product
        //Crear producto
        socket.on("newProduct", async (product) => {
            try {
                await fetch("http://localhost:8080/api/products", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                });

                socket.emit("getProducts", { page: 1 });
            } catch (error) {
                console.error("Error creando producto:", error);
            }
        });

        //Cart
        //Carrito - Obtener carrito y sus productos
        socket.on("cartId", async (id) => {
            try {
                const response = await fetch(`http://localhost:8080/api/cart/${id}`);
                const data = await response.json();
                socket.emit("cart", data.payload);
            } catch (error) {
                console.error("Error recuperando carro: ", error);
            }
        });

        //Remover productos del carrito
        socket.on("removeProduct", async ({ cartId, productId }) => {
            try {
                await fetch(`http://localhost:8080/api/cart/${cartId}/product/${productId}`, { method: "DELETE" });
            } catch (error) {
                console.error("Error removiendo producto del carro:", error);
            }
        });

        //Carrito - Limpiar carrito
        socket.on("clearCart", async (id) => {
            try {
                await fetch(`http://localhost:8080/api/cart/${id}`, { method: "DELETE" });
            } catch (error) {
                console.error("Error borrando carro:", error);
            }
        });

    } catch (error) {
        console.error("Error de conexión", error);
    }
});

//Inicializar servidor
server.listen(PORT, () => {
    console.log("Server iniciado correctamente");
})
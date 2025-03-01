const socket = io();

const header = document.getElementById("header");

header.innerHTML = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary pe-5 ps-5">
        <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav me-auto">
                    <a class="btn btn-outline-success nav-link fs-4 me-4 
                        ${window.location.pathname == "/" ? "active" : " "}" 
                        aria-current="page" href="/">Home 🏚</a>
                    <a class="btn btn-outline-success nav-link fs-4 me-4 
                        ${window.location.pathname == "/realTimeProducts" ? "active" : ""}" 
                        aria-current="page" href="/realTimeProducts">Nuevo Producto 📦</a>
                    <li class="nav-item dropdown">
                        <button class="btn btn-outline-success nav-link dropdown-toggle fs-4
                            ${window.location.pathname.includes("/category") ? "active" : ""}"
                        href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categoria 📃
                        </button>
                        <ul class="dropdown-menu">
                            <a class="dropdown-item nav-link fs-5" href="/category/electronics">Electronica</a><li><hr class="dropdown-divider"></li>
                            <a class="dropdown-item nav-link fs-5" href="/category/gaming">Computación</a><li><hr class="dropdown-divider"></li>
                            <a class="dropdown-item nav-link fs-5" href="/category/accessories">Accesorios</a><li><hr class="dropdown-divider"></li>
                            <a class="dropdown-item nav-link fs-5" href="/category/ergonomics">Egonomicos</a><li><hr class="dropdown-divider"></li>
                            <a class="dropdown-item nav-link fs-5" href="/category/home">Hogar</a><li><hr class="dropdown-divider"></li>
                            <a class="dropdown-item nav-link fs-5" href="/category/other">Otros</a>
                        </ul>
                    </li>
                </div>
                ${window.location.pathname == "/" ? `
                    <h5 class="me-3">Productos:</h5>
                    <button class="btn btn-outline-warning me-1 active" type="submit" id="allProducts">Todos 🏬</button>
                    <button class="btn btn-outline-success" type="submit" id="availableProducts">En Stock 🏪</button>
                    `
        : ""}
            </div>
        </div>
    </nav>
`;

socket.on("cartId", (cartId) => {
    document.getElementById("cart-link").href = `/cart/${cartId}`;
});
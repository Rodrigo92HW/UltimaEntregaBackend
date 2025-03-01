# Proyecto ecommerce

## Descripción general:

Este proyecto es una aplicación de ecommerce desarrollada con Node.js y Express. La aplicación permite a los usuarios navegar por una lista de productos, ver detalles de productos individuales, agregar productos a un carrito de compras y realizar compras. La aplicación utiliza WebSockets para actualizar en tiempo real la lista de productos y el carrito de compras.

### Características principales:
- **Navegación de productos**: Los usuarios pueden navegar por diferentes categorías de productos.
- **Detalles del producto**: Los usuarios pueden ver detalles específicos de cada producto.
- **Carrito de compras**: Los usuarios pueden agregar productos a su carrito de compras, ver los productos en su carrito y eliminar productos del carrito.
- **Actualización en tiempo real**: La aplicación utiliza WebSockets para actualizar en tiempo real la lista de productos y el carrito de compras.
- **Filtros de disponibilidad**: Los usuarios pueden filtrar productos por disponibilidad en stock.

### Dependencias:
- Dotenv v16.4.7,
- Express v4.21.2,
- Express-Handlebars v8.0.1,
- Mongoose-Paginate-v2 v1.9.0,
- Moongose v1.0.0,
- socket.io v4.8.1

## Vistas
### Navegacion
![Botones de Navegacion](https://i.imgur.com/7SFfAia.png)

### Filtro de Stock
![Filtros](https://i.imgur.com/unaoVVV.png)

### Lista de Productos con Paginación
![Productos/Paginación](https://i.imgur.com/ZEL5xzJ.png)

### Detalles del Producto
![Producto](https://i.imgur.com/vbJY4BB.png)

### Carro de Compras
![Carro de Compras](https://i.imgur.com/516T0Hj.png)


## Correr el proyecto:

```
nodemon ./src/app.js

o

npm ./src/app.js
```

## Rodrigo Harispe - 2025
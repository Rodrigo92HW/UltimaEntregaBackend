import express from "express";
import Cart from "../models/cart.model.js";
import { cartId } from "../app.js";

const cartRouter = express.Router();

//GET
cartRouter.get("/", async (_, res) => {
    try {
        const cart = await Cart.find();
        if (!cart) return res.status(404).send({ message: "Error al recuperar el carro." });

        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ message: `Error al recuperar el carro: ${error.message}` });
    }
});

//GET por ID
cartRouter.get("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findById(cid).populate("products.product");
        if (!cart) return res.status(404).send({ message: "Error al recuperar el carro." });

        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ message: `Error al recuperar el carro: ${error.message}` });
    }
});

//POST
cartRouter.post("/", async (_, res) => {
    try {
        let cart;
        if (cartId) {
            cart = await Cart.findById(cartId);
        }

        if (!cart) {
            cart = await Cart.create({ products: [] });
            cartId = cart._id.toString();
        }

        res.status(201).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ message: `Error al crear el carro: ${error.message}` });
    }
});

//PUT
cartRouter.put("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        let cart = await Cart.findOneAndUpdate(
            { _id: cid, "products.product": pid },
            { $inc: { "products.$.quantity": quantity || 1 } },
            { new: true }
        );

        if (!cart) {
            const updatedCart = await Cart.findByIdAndUpdate(
                cid,
                { $addToSet: { products: { product: pid, quantity: quantity || 1 } } },
                { new: true }
            );
            cart = updatedCart;
        }

        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ message: `Error al actualizar el producto: ${error.message}` });
    }
});

//DEL
cartRouter.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await Cart.findOneAndUpdate(
            { _id: cid },
            { $set: { products: [] } },
            { new: true }
        );

        if (!cart) return res.status(404).send({ message: "Error al eliminar los productos del carro." });

        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ message: `Error al eliminar los productos del carro: ${error.message}` });
    }
});

//DEL producto del carrito
cartRouter.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.updateOne(
            { _id: cid },
            { $pull: { products: { product: pid } } }
        );

        if (!cart) return res.status(404).send({ message: "Error al recuperar el producto." });

        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ message: `Error al eliminar el producto: ${error.message}` });
    }

});

export default cartRouter;

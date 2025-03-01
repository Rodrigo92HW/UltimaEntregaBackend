import express from "express";
import Product from "../models/product.model.js";

const productRouter = express.Router();

//GET con QueryParams
productRouter.get("/", async (req, res) => {
    try {
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const query = req.query.query || null;
        const sort = req.query.sort || 1;
    
        const products = await Product.paginate({ query }, { page, limit, sort: {price: sort}, lean: true });
        res.status(200).send({ status: "success", payload: products });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al obtener los productos: ${error.message}` });
    }
});

//GET por ID
productRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await Product.findOne({ _id: pid }).lean();

        if (!product) return res.status(404).send({ message: "Error al recuperar el producto." });

        res.status(200).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al obtener los productos: ${error.message}` });
    }
});

//Get por Categoria
productRouter.get("/category/:ctr", async (req, res) => {
    try {
        const { ctr } = req.params;
        const page = req.query.page || 1;
        const category = ctr.toLowerCase();
        const productsByCategory = await Product.find({ category: category }).paginate({ page, limit: 10, sort: {price: 1}, lean: true });

        if (!productsByCategory) return res.status(404).send({ message: "Error al recuperar los productos." });

        res.status(200).send({ status: "success", payload: productsByCategory });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al obtener los productos: ${error.message}` });
    }
});

//Get por Disponibilidad
productRouter.get("/list/available", async (req, res) => {
    try {
        const page = req.query.page || 1;

        //Revisa si hay un stock mayor a 2
        const productsByCategory = await Product.paginate({ stock: { $gt: 2 } }, { page, limit: 10, lean: true });

        if (!productsByCategory) return res.status(404).send({ message: "Error al recuperar los productos." });

        res.status(200).send({ status: "success", payload: productsByCategory });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al obtener los productos: ${error.message}` });
    }
});

//POST
productRouter.post("/", async (req, res) => {
    try {
        const { title, description, code, price, category, status, stock, thumbnail } = req.body;

        const product = await Product.insertOne({ title, description, code, price, category, status, stock, thumbnail });

        res.status(201).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al agregar el producto: ${error.message}` });
    }
});

//PUT
productRouter.put("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const { title, description, code, price, status, stock, thumbnail } = req.body;
        const newProduct = { title, description, code, price, status, stock, thumbnail }

        if (pid === -1) return res.status(404).send({ message: "Error al obtener el producto." });

        const product = await Product.findOneAndUpdate({ _id: pid }, newProduct);
        res.status(201).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al actualizar el producto: ${error.message}` });
    }
});

//DELETE
productRouter.delete("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;

        if (pid === -1) return res.status(404).send({ message: "Error al borrar el producto." });

        const product = await Product.deleteOne({ _id: pid });
        res.status(200).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: `Error al borrar el producto: ${error.message}` });
    }
});

export default productRouter;

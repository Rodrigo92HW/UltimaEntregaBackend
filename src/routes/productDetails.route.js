import express from 'express';

const productDetailsRoute = express.Router();

productDetailsRoute.get("/:id", (_, res) => {
    res.render("product");
});

export default productDetailsRoute;
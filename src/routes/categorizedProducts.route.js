import express from 'express';

const categorizedProductsRouter = express.Router();

categorizedProductsRouter.get("/:ctr", (_, res) => {
    res.render("productsByCategory");
});

export default categorizedProductsRouter;
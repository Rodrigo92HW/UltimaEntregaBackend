import express from 'express';

const realTimeProductsRouter = express.Router();

realTimeProductsRouter.get("/", (_, res) => {
    res.render("realTimeProducts");
});

export default realTimeProductsRouter;
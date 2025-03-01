import express from 'express';

const cartDetailsRoute = express.Router();

cartDetailsRoute.get("/:id", (_, res) => {
    res.render("cart");
});

export default cartDetailsRoute;
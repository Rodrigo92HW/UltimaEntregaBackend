import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const cartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: { type: Number, default: 1 }
        }
    ]
});

cartSchema.plugin(paginate);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
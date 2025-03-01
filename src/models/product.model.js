import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: Number, default: 1 },
    price: { type: Number, default: 100 },
    category: { type: String, default: 'item' },
    status: { type: Boolean, default: true },
    stock: { type: Number, default: 20 },
    thumbnail: { type: Array, default: [] },
});

productSchema.plugin(paginate);

const Product = mongoose.model("Product", productSchema);

export default Product;
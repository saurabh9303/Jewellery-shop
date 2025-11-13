import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: String,
  name: String,
  price: Number,
  image: String,
  quantity: { type: Number, default: 1 },
});

const cartSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    userName: String,
    products: [productSchema],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);

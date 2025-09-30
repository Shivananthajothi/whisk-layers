// server/models/Product.js
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String, // path like "cake1.jpg" or "/images/cake1.jpg"
  bakery: { type: mongoose.Schema.Types.ObjectId, ref: "Bakery", default: null },
  customizable: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);

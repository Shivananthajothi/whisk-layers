import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  flavour: String,
  price: Number,
  image: String, // e.g. "/images/cake1.jpg"
  customizable: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);

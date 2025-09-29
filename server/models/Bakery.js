import mongoose from "mongoose";

const bakerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  image: String,
  description: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
});

export default mongoose.model("Bakery", bakerySchema);

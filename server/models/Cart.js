// server/models/Cart.js
import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      customization: { type: String, default: "" }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Cart", CartSchema);

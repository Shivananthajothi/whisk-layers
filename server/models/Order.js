import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: String,
      price: Number,
      qty: Number,
      customization: String
    }
  ],
  total: Number,
  address: String,
  status: { type: String, default: "Placed" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);

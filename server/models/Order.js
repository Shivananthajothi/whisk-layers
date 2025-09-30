// server/models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
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
  status: { type: String, default: "Placed" }, // Placed, Processing, Out for Delivery, Delivered
  payment: { type: String, default: "Pending" } // Paid / Pending
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);

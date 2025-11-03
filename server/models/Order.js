// server/models/Order.js
import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
  customization: String,
  price: Number
});

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderItems: [OrderItemSchema],
  totalAmount: Number,
  address: String,
  status: { type: String, default: "Pending" },
  paymentMethod: { type: String, enum: ['cash', 'online'], default: 'cash' },
  paymentStatus: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' },
  onlineType: { type: String, enum: ['card', 'upi', null], default: null }
}, { timestamps: true });

export default mongoose.model("Order", OrderSchema);

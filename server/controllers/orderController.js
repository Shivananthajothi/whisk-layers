// server/controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { address } = req.body;
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: "Cart empty" });

    const items = cart.items.map(i => ({
      product: i.product._id,
      name: i.product.name,
      price: i.product.price,
      qty: i.quantity,
      customization: i.customization || ""
    }));

    const total = items.reduce((s, it) => s + (it.price * it.qty), 0);

    const order = new Order({
      user: userId,
      items,
      total,
      address,
      status: "Placed",
      paymentStatus: "Paid"
    });

    await order.save();
    await Cart.findOneAndDelete({ user: userId });
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    if (order.user.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

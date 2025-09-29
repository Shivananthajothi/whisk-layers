import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    // req.user set by auth middleware
    const userId = req.user;
    const { items, total, address } = req.body;
    const order = new Order({ userId, items, total, address, status: "Placed" });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error placing order" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching orders" });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Order not found" });
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching order" });
  }
};

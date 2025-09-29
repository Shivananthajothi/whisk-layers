import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      products: req.body.products,
      status: "Pending"
    });
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id });
    res.json(orders);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

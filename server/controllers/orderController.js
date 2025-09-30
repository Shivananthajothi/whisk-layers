// server/controllers/orderController.js
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const create = async (req, res) => {
  try {
    const userId = req.user;
    const { address } = req.body;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) return res.status(400).json({ msg: "Cart empty" });

    const items = cart.products.map(p => ({
      productId: p.productId._id,
      name: p.productId.name,
      price: p.productId.price,
      qty: p.quantity,
      customization: p.customization || ""
    }));
    const total = items.reduce((s, it) => s + (it.price * it.qty), 0);

    // create order as Paid (since we're using dummy payment)
    const order = new Order({
      userId,
      items,
      total,
      address,
      status: "Placed",
      payment: "Paid"
    });
    await order.save();

    // clear cart
    await Cart.findOneAndDelete({ userId });

    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const list = async (req, res) => {
  try {
    const userId = req.user;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ msg: "Not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

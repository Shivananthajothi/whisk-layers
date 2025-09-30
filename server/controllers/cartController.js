// server/controllers/cartController.js
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart) return res.json({ items: [] });
    const items = cart.products.map(p => ({
      productId: p.productId._id,
      name: p.productId.name,
      price: p.productId.price,
      qty: p.quantity,
      image: p.productId.image,
      customization: p.customization || ""
    }));
    res.json({ items });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const add = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, quantity = 1, customization = "" } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) cart = new Cart({ userId, products: [] });

    const idx = cart.products.findIndex(p => p.productId.toString() === productId);
    if (idx > -1) {
      cart.products[idx].quantity += Number(quantity);
      cart.products[idx].customization = customization || cart.products[idx].customization;
    } else {
      cart.products.push({ productId, quantity, customization });
    }
    await cart.save();
    res.json({ msg: "Added", cart });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const clear = async (req, res) => {
  try {
    const userId = req.user;
    await Cart.findOneAndDelete({ userId });
    res.json({ msg: "Cleared" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user;
    let cart = await Cart.findOne({ userId });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user;
    const { productId, qty, customization } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }
    const idx = cart.items.findIndex(i => i.productId.toString() === productId);
    if (idx > -1) {
      cart.items[idx].qty += qty;
      cart.items[idx].customization = customization || cart.items[idx].customization;
    } else {
      cart.items.push({
        productId,
        qty,
        name: product.name,
        price: product.price,
        customization: customization || ""
      });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error adding to cart" });
  }
};

export const clearCart = async (req, res) => {
  try {
    const userId = req.user;
    await Cart.findOneAndDelete({ userId });
    res.json({ msg: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ msg: "Error clearing cart" });
  }
};

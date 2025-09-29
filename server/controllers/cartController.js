import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) cart = new Cart({ userId: req.user.id, products: [] });

    const existing = cart.products.find(p => p.productId.toString() === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

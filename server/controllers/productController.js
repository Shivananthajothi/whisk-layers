import Product from "../models/Product.js";

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error listing products" });
  }
};

export const getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: "Product not found" });
    res.json(p);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching product" });
  }
};

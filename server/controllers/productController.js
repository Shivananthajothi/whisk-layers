// server/controllers/productController.js
import Product from "../models/Product.js";

export const list = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ msg: "Not found" });
    res.json(p);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const getByBakery = async (req, res) => {
  try {
    const bakeryId = req.params.bakeryId;
    const products = await Product.find({ bakery: bakeryId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

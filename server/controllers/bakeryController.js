// server/controllers/bakeryController.js
import Bakery from "../models/Bakery.js";

export const list = async (req, res) => {
  try {
    const bakeries = await Bakery.find().sort({ createdAt: -1 });
    res.json(bakeries);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

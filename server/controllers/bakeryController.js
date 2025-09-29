import Bakery from "../models/Bakery.js";

export const getBakeries = async (req, res) => {
  try {
    const bakeries = await Bakery.find().populate("products");
    res.json(bakeries);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

export const createBakery = async (req, res) => {
  try {
    const bakery = new Bakery(req.body);
    await bakery.save();
    res.json(bakery);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

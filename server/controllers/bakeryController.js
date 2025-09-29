import Bakery from "../models/Bakery.js";

export const listBakeries = async (req, res) => {
  try {
    const b = await Bakery.find();
    res.json(b);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching bakeries" });
  }
};

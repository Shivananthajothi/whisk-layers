// server/models/Bakery.js
import mongoose from "mongoose";

const BakerySchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String
}, { timestamps: true });

export default mongoose.model("Bakery", BakerySchema);

import mongoose from "mongoose";

const bakerySchema = new mongoose.Schema({
  name: String,
  location: String,
  image: String,
  description: String
});

export default mongoose.model("Bakery", bakerySchema);

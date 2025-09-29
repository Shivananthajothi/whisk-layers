// run `node seeder.js` from server folder to insert demo products
import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Bakery from "./models/Bakery.js";

dotenv.config();

const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/whisklayers";

const seed = async () => {
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });

  await Product.deleteMany();
  await Bakery.deleteMany();

  const products = [
    { name: "Choco Dream Cake", description: "Rich chocolate layers", flavour: "Chocolate", price: 450, image: "/images/cake.jpg", customizable: true },
    { name: "Berry Delight", description: "Fresh berries on cream", flavour: "Strawberry", price: 520, image: "/images/cake2.jpg", customizable: true },
    { name: "Vanilla Classic", description: "Soft vanilla sponge", flavour: "Vanilla", price: 350, image: "/images/cake3.jpg", customizable: false }
  ];
  const bakeries = [
    { name: "Sweet Spot", location: "MG Road", image: "/images/bakery1.jpg", description: "Local bakery" },
    { name: "Bake House", location: "Main Street", image: "/images/bakery2.jpg", description: "Homestyle treats" }
  ];

  await Product.insertMany(products);
  await Bakery.insertMany(bakeries);

  console.log("Seeder done");
  mongoose.disconnect();
};

seed().catch(err => { console.error(err); process.exit(1); });

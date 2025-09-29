// entrypoint
import express from "express";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import bakeryRoutes from "./routes/bakeryRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// serve static images (from server/public/images)
const __dirname = path.resolve();
app.use("/images", express.static(path.join(__dirname, "public/images")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/bakeries", bakeryRoutes);

// connect mongoose then start server
const start = async () => {
  const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/whisklayers";
  await mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("✅ MongoDB connected");
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
};

start().catch(err => { console.error(err); process.exit(1); });

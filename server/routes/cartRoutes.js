import express from "express";
import { addToCart } from "../controllers/cartController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", auth, addToCart);

export default router;

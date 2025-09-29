import express from "express";
import { addToCart, getCart, clearCart } from "../controllers/cartController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", auth, getCart);
router.post("/add", auth, addToCart);
router.delete("/clear", auth, clearCart);
export default router;

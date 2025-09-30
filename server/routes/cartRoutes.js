// server/routes/cartRoutes.js
import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { getCart, add, clear } from "../controllers/cartController.js";
const router = express.Router();
router.get("/", auth, getCart);
router.post("/add", auth, add);
router.delete("/clear", auth, clear);
export default router;

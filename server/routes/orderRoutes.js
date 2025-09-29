import express from "express";
import { placeOrder, getUserOrders, getOrderById } from "../controllers/orderController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", auth, placeOrder);
router.get("/", auth, getUserOrders);
router.get("/:id", auth, getOrderById);
export default router;

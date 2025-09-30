// server/routes/orderRoutes.js
import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { create, list, getById } from "../controllers/orderController.js";
const router = express.Router();
router.post("/", auth, create);
router.get("/", auth, list);
router.get("/:id", auth, getById);
export default router;

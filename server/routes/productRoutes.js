// server/routes/productRoutes.js
import express from "express";
import { list, getById, getByBakery } from "../controllers/productController.js";
const router = express.Router();
router.get("/", list);
router.get("/:id", getById);
router.get("/bakery/:bakeryId", getByBakery);
export default router;

import express from "express";
import { getBakeries, createBakery } from "../controllers/bakeryController.js";

const router = express.Router();

router.get("/", getBakeries);
router.post("/", createBakery);

export default router;

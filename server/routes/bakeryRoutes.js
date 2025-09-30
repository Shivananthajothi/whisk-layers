// server/routes/bakeryRoutes.js
import express from "express";
import { list } from "../controllers/bakeryController.js";
const router = express.Router();
router.get("/", list);
export default router;

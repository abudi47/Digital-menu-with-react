/**
 * @module backend/routes/menu_routes
 * @file menu_routes.js
 * @description Express router for menu in MERN stack
 */
import express from "express";
import { roles } from "../config/config.js";
import MenuController from "../controllers/menu_controller.js";
import { authHandler, roleHandler } from "../middlewares/index.js";

const router = express.Router();

router.get("/", MenuController.getMenus);
router.get("/:id", MenuController.getMenu);
router.put("/:id", authHandler, roleHandler([roles.admin]), MenuController.updateMenu);

export default router;

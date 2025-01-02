/**
 * @module backend/routes/menu_routes
 * @file menu_routes.js
 * @description Express router for menu in MERN stack
 */
import express from "express";
import MenuController from "../controllers/menu_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express.Router();

router.get("/", MenuController.getMenus);
router.get("/:id", MenuController.getMenu);
router.put(
    "/:id",
    authHandler,
    roleHandler([roles.admin]),
    MenuController.updateMenu
);
router.delete(
    "/:id",
    authHandler,
    roleHandler([roles.admin]),
    MenuController.deleteMenu
);
router.post(
    "/",
    authHandler,
    roleHandler([roles.admin]),
    MenuController.createMenu
);

export default router;

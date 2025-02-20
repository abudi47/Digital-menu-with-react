/**
 * @module backend/routes/menu_routes
 * @file menu_routes.js
 * @description Express router for menu in MERN stack
 */
import express from "express";
import MenuController from "../controllers/menu_controller.js";
import { imageFieldsName } from "../config/config.js";
import { authHandler, roleHandler, roles, upload } from "../middlewares/index.js";

const router = express.Router();

router.get("/", MenuController.getMenus);
router.get("/categories/", MenuController.getCategories);
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
    upload.single(imageFieldsName.menuImage),
    MenuController.createMenu
);
router.put(
    "/:id/availability",
    authHandler,
    roleHandler([roles.admin, roles.barista, roles.foodRunner]),
    MenuController.changeAvailability
);

router.put(
    "/:id",
    authHandler,
    roleHandler([roles.admin]),
    MenuController.updateMenu
)

router.post(
    "/:id/images",
    authHandler,
    roleHandler([roles.admin]),
    MenuController.updateMenu
)
export default router;

// add jsDoc standard documentation for this file
/**
 * @module backend/routes/menu_routes
 * @file menu_routes.js
 * @description Express router for menu in MERN stack
 */
import express from "express";
import MenuController from "../controllers/menu_controller.js";

const router = express.Router();

router.get("/", MenuController.getMenus);

export default router;
/**
 * @module backend/routes/user_routes
 * @file user_routes.js
 * @description Express router for user in MERN stack
 */
import express from "express";
import UserController from "../controllers/user_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authHandler, UserController.getProfile);
router.put("/", authHandler, UserController.updateProfile);

export default router;

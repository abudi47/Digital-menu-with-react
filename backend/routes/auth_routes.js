/**
 * @module backend/routes/auth_routes
 * @file auth_routes.js
 * @description Express router for authentication in MERN stack
 */
import express from "express";
import AuthController from "../controllers/auth_controller.js";
import {
    authHandler,
    roleHandler,
    roles,
    upload,
} from "../middlewares/index.js";
import { imageFieldsName } from "../config/config.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", authHandler, AuthController.logout);
router.post(
    "/register",
    authHandler,
    upload.single(imageFieldsName.profileImage),
    roleHandler([roles.admin]),

    AuthController.register
);
export default router;

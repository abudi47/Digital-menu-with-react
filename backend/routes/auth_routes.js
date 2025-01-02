/**
 * @module backend/routes/auth_routes
 * @file auth_routes.js
 * @description Express router for authentication in MERN stack
 */
import express from "express";
import AuthController from "../controllers/auth_controller.js";

const router = express.Router();

router.post("/login", AuthController.login);

export default router;

/**
 * @module backend/routes/payment_routes
 * @file payment_routes.js
 * @description Express router for payment in MERN stack
 */
import express from "express";
import PaymentController from "../controllers/payment_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express.Router();

router.get("/options", PaymentController.paymentMethods);

export default router;

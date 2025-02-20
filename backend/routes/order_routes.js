/**
 * @module backend/routes/order_routes
 * @file order_routes.js
 * @description Express router for order in MERN stack
 */
import express from "express";
import OrderController from "../controllers/order_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express.Router();

router.get("/", authHandler, OrderController.getOrders);
router.post("/create", OrderController.createOrder);


export default router;

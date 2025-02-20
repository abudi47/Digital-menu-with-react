import express from "express";
import UserController from "../controllers/user_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";
import User from "../models/user.js"; // Import the User model



const router = express.Router();

router.get("/", authHandler, roleHandler([roles.admin]),UserController.getUsers);
router.put("/", authHandler, roleHandler([roles.admin]), UserController.updateProfile);

router.patch("/:id", authHandler, roleHandler([roles.admin]), UserController.updateStatus);

export default router;

import express from "express";
import TableController from "../controllers/table_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express.Router();

export default router;

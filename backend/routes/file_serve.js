import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve uploaded images
router.use(
    "/menu",
    express.static(path.join(__dirname, "../uploads/images/menu_image"))
);
router.use(
    "/profile",
    authHandler,
    express.static(path.join(__dirname, "../uploads/images/profile_image"))
);

export default router;

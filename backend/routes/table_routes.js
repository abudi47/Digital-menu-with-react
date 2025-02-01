import express from "express";
import TableController from "../controllers/table_controller.js";
import { authHandler, roleHandler, roles } from "../middlewares/index.js";

const router = express.Router();

router.get("/", TableController.getTables);
router.get("/:id", TableController.getTable);
router.post(
  "/",
  authHandler,
  roleHandler([roles.admin]),
  TableController.createTable
);
router.put(
  "/:id",
  authHandler,
  roleHandler([roles.admin]),
  TableController.updateTable
);
router.put(
  "/:id/availability",
  authHandler,
  roleHandler([roles.admin, roles.barista, roles.foodRunner]),
  TableController.changeAvailability
);

router.delete(
  "/:id",
  authHandler,
  roleHandler([roles.admin]),
  TableController.deleteTable
);

export default router;

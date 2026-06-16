import express from "express";

import {
  getAlerts,
  markAlertRead,
  deleteAlert,
} from "../controllers/alertController.js";

import {
  protect,
} from "../middlewares/authMiddleware.js";

const alertRouter =
  express.Router();

alertRouter.use(protect);

alertRouter.get(
  "/",
  getAlerts
);

alertRouter.patch(
  "/:id/read",
  markAlertRead
);

alertRouter.delete(
  "/:id",
  deleteAlert
);

export default alertRouter;
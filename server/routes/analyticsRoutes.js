import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import {
  getCategoryBreakdown,
  getDashboardAnalytics,
} from "../controllers/analyticsController.js";

const analyticsRouter =
  express.Router();

analyticsRouter.use(
  protect
);

analyticsRouter.get(
  "/dashboard",
  getDashboardAnalytics
);
analyticsRouter.get(
  "/category-breakdown",
  getCategoryBreakdown
);

export default analyticsRouter;
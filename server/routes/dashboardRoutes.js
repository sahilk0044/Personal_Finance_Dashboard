import express from "express";

import {
    getAnalytics,
  getDashboardSummary,
  getFinancialHealthScore,
  getRecentActivity,
} from "../controllers/dashboardController.js";

import {
  protect,
} from "../middlewares/authMiddleware.js";

const dashboardRouter =
  express.Router();

dashboardRouter.use(protect);

dashboardRouter.get(
  "/summary",
  getDashboardSummary
);

dashboardRouter.get(
  "/recent",
  getRecentActivity
);

dashboardRouter.get(
  "/health-score",
  getFinancialHealthScore
);

dashboardRouter.get(
  "/analytics",
  getAnalytics
);
export default dashboardRouter;
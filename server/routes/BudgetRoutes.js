import express from "express";

import {
  createBudget,
  getBudgets,
  getBudgetById,
  updateBudget,
  deleteBudget,
  getBudgetAnalytics,
} from "../controllers/BudgetController.js";

import { protect } from "../middlewares/authMiddleware.js";

const budgetRouter = express.Router();

// All budget routes are protected
budgetRouter.use(protect);

// Create Budget
// Get All Budgets
budgetRouter
  .route("/")
  .post(createBudget)
  .get(getBudgets);

  budgetRouter.get(
  "/analytics",
  getBudgetAnalytics
);

// Get Single Budget
// Update Budget
// Delete Budget
budgetRouter
  .route("/:id")
  .get(getBudgetById)
  .put(updateBudget)
  .delete(deleteBudget);

export default budgetRouter;
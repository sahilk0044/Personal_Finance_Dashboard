import express from "express";

import {
  createDebt,
  getDebts,
  getDebtById,
  updateDebt,
  deleteDebt,
  addDebtPayment,
  getDebtPayments,
} from "../controllers/debtController.js";

import {
  getDebtSummary,
} from "../controllers/debtController.js";

import { protect } from "../middlewares/authMiddleware.js";

const debtRouter = express.Router();

// All debt routes are protected
debtRouter.use(protect);

// Create Debt
// Get All Debts
debtRouter
  .route("/")
  .post(createDebt)
  .get(getDebts);

  debtRouter.get(
  "/summary",
  getDebtSummary
);

// Get Single Debt
// Update Debt
// Delete Debt
debtRouter
  .route("/:id")
  .get(getDebtById)
  .put(updateDebt)
  .delete(deleteDebt);

  debtRouter.post(
  "/:id/payment",
  addDebtPayment
);

debtRouter.get(
  "/:id/payments",
  getDebtPayments
);

export default debtRouter;
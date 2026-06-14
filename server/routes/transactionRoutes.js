
import express from "express";

import {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

import { protect } from "../middlewares/authMiddleware.js";

const transactionRouter = express.Router();

// All transaction routes are protected
transactionRouter.use(protect);

// Create Transaction
// GET All Transactions
transactionRouter
  .route("/")
  .post(createTransaction)
  .get(getTransactions);

// Get Single Transaction
// Update Transaction
// Delete Transaction
transactionRouter
  .route("/:id")
  .get(getTransactionById)
  .put(updateTransaction)
  .delete(deleteTransaction);

export default transactionRouter;
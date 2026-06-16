import express from "express";

import { protect } from "../middlewares/authMiddleware.js";

import {
    exportFinancialReportPDF,
  exportTransactionsCSV,
  exportTransactionsExcel,
} from "../controllers/reportController.js";

const reportRouter =
  express.Router();

reportRouter.use(protect);

reportRouter.get(
  "/export-csv",
  exportTransactionsCSV
);

reportRouter.get(
  "/export-excel",
  exportTransactionsExcel
);

reportRouter.get(
  "/export-pdf",
  exportFinancialReportPDF
);
export default reportRouter;
import { Parser } from "json2csv";
  import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import Transaction from "../models/Transaction.js";
import Debt from "../models/debt.js";
import Budget from "../models/Budget.js";
import {calculateFinancialHealth,} from "../utils/financialHealth.js";
import {
  money,
  sectionTitle,
  summaryRow,
  getHealthColor,
  drawTableHeader,
  drawLine,} from "../utils/pdfHelpers.js";


export const exportTransactionsCSV =
  async (req, res, next) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        }).sort({
          date: -1,
        });

      const formattedData =
        transactions.map((t) => ({
          Date: new Date(
            t.date
          ).toLocaleDateString(),

          Type: t.type,

          Category: t.category,

          Amount: t.amount,

          PaymentMethod:
            t.paymentMethod,

          Description:
            t.description,
        }));

      const parser =
        new Parser();

      const csv =
        parser.parse(
          formattedData
        );

      res.header(
        "Content-Type",
        "text/csv"
      );

      res.attachment(
        "transactions.csv"
      );

      return res.send(csv);
    } catch (error) {
      next(error);
    }
  };



export const exportTransactionsExcel =
  async (req, res, next) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        }).sort({
          date: -1,
        });

      const workbook =
        new ExcelJS.Workbook();

      const worksheet =
        workbook.addWorksheet(
          "Transactions"
        );

      worksheet.columns = [
        {
          header: "Date",
          key: "date",
          width: 20,
        },
        {
          header: "Type",
          key: "type",
          width: 15,
        },
        {
          header: "Category",
          key: "category",
          width: 20,
        },
        {
          header: "Amount",
          key: "amount",
          width: 15,
        },
        {
          header:
            "Payment Method",
          key:
            "paymentMethod",
          width: 20,
        },
        {
          header:
            "Description",
          key:
            "description",
          width: 30,
        },
      ];

      transactions.forEach(
        (transaction) => {
          worksheet.addRow({
            date: new Date(
              transaction.date
            ).toLocaleDateString(),
            type:
              transaction.type,
            category:
              transaction.category,
            amount:
              transaction.amount,
            paymentMethod:
              transaction.paymentMethod,
            description:
              transaction.description,
          });
        }
      );

      worksheet.getRow(
        1
      ).font = {
        bold: true,
      };

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="transactions.xlsx"'
      );

      await workbook.xlsx.write(
        res
      );

      res.end();
    } catch (error) {
      next(error);
    }
  };



export const exportFinancialReportPDF =
  async (req, res, next) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        }).sort({
          date: -1,
        });

      const debts =
        await Debt.find({
          user: req.user._id,
        });

      const budgets =
        await Budget.find({
          user: req.user._id,
        });

      const health =
  await calculateFinancialHealth(
    transactions,
    debts,
    budgets
  );

const {
  score,
  status,
  breakdown,
  summary,
} = health;

const {
  totalIncome,
  totalExpense,
  netSavings,
  outstandingDebt,
  savingsRate,
} = summary;

const topCategories =
  await Transaction.aggregate([
    {
      $match: {
        user: req.user._id,
        type: "expense",
      },
    },
    {
      $group: {
        _id: "$category",
        total: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        total: -1,
      },
    },
    {
      $limit: 5,
    },
  ]);

const budgetPerformance =
  budgets.map(
    (budget) => {
      const spent =
        transactions
          .filter(
            (t) =>
              t.type ===
                "expense" &&
              t.category ===
                budget.category &&
              new Date(
                t.date
              ).getMonth() +
                1 ===
                budget.month &&
              new Date(
                t.date
              ).getFullYear() ===
                budget.year
          )
          .reduce(
            (
              sum,
              transaction
            ) =>
              sum +
              transaction.amount,
            0
          );

      const percentageUsed =
        budget.limitAmount > 0
          ? (
              (spent /
                budget.limitAmount) *
              100
            ).toFixed(1)
          : 0;

      let budgetStatus =
        "Safe";

      if (
        percentageUsed >=
        100
      ) {
        budgetStatus =
          "Exceeded";
      } else if (
        percentageUsed >=
        80
      ) {
        budgetStatus =
          "Warning";
      }

      return {
        category:
          budget.category,
        budget:
          budget.limitAmount,
        spent,
        percentageUsed,
        status:
          budgetStatus,
      };
    }
  );
      // ==========================
      // PDF
      // ==========================

      const doc =
        new PDFDocument({
          margin: 50,
        });

      res.setHeader(
        "Content-Type",
        "application/pdf"
      );

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="financial-report.pdf"'
      );

      doc.pipe(res);

      // ==========================
      // Helpers
      // ==========================

      const sectionTitle = (
        title
      ) => {
        doc.moveDown();

        doc
          .fontSize(16)
          .font(
            "Helvetica-Bold"
          )
          .fillColor(
            "#111827"
          )
          .text(title);

        doc.moveDown(
          0.3
        );

        doc
          .moveTo(
            50,
            doc.y
          )
          .lineTo(
            550,
            doc.y
          )
          .strokeColor(
            "#d1d5db"
          )
          .stroke();

        doc.moveDown();
      };

      const summaryRow = (
        label,
        value
      ) => {
        const y = doc.y;

        doc
          .font(
            "Helvetica"
          )
          .fontSize(12)
          .fillColor(
            "#374151"
          )
          .text(
            label,
            50,
            y
          );

        doc
          .font(
            "Helvetica-Bold"
          )
          .fillColor(
            "#111827"
          )
          .text(
            value,
            400,
            y
          );

        doc.moveDown();
      };

      // ==========================
      // Header
      // ==========================

      doc
        .fontSize(24)
        .font(
          "Helvetica-Bold"
        )
        .fillColor(
          "#2563eb"
        )
        .text(
          "PERSONAL FINANCE REPORT",
          {
            align:
              "center",
          }
        );

      doc.moveDown();

      doc
        .fontSize(11)
        .fillColor(
          "#6b7280"
        )
        .text(
          `Generated On: ${new Date().toLocaleDateString()}`,
          {
            align:
              "center",
          }
        );

      // ==========================
      // Summary
      // ==========================

      sectionTitle(
  "Financial Overview"
);

summaryRow(
  "Total Income",
  money(totalIncome)
);

summaryRow(
  "Total Expenses",
  money(totalExpense)
);

summaryRow(
  "Net Savings",
  money(netSavings)
);

summaryRow(
  "Outstanding Debt",
  money(outstandingDebt)
);

summaryRow(
  "Savings Rate",
  savingsRate
);
      // ==========================
      // Health
      // ==========================
doc.moveDown();
doc.text("", 50, doc.y);
      sectionTitle(
  "Financial Health Score"
);

let scoreColor =
  "#dc2626";

if (score >= 80) {
  scoreColor =
    "#16a34a";
} else if (
  score >= 65
) {
  scoreColor =
    "#2563eb";
} else if (
  score >= 40
) {
  scoreColor =
    "#f59e0b";
}

doc
  .fillColor(scoreColor)
  .fontSize(34)
  .font("Helvetica-Bold")
  .text(
    `${score}/100`,
    50,
    doc.y,
    {
      width: 500,
      align:
        "center",
    }
  );

doc
  .fillColor("#111827")
  .fontSize(16)
  .font("Helvetica-Bold")
  .text(
    `${status}`,
    50,
    doc.y,
    {
      width: 500,
      align:
        "center",
    }
  );

doc.moveDown();

summaryRow(
  "Savings Score",
  `${breakdown.savingsScore}/60`
);

summaryRow(
  "Debt Score",
  `${breakdown.debtScore}/20`
);

summaryRow(
  "Budget Score",
  `${breakdown.budgetScore}/10`
);

summaryRow(
  "Stability Score",
  `${breakdown.stabilityScore}/10`
);
      // ==========================
// Budget Performance
// ==========================

doc.addPage();

doc
  .fontSize(22)
  .font("Helvetica-Bold")
  .fillColor("#2563eb")
  .text(
    "Budget Performance",
    {
      align: "center",
    }
  );

doc.moveDown(2);

const tableTop = doc.y;

doc
  .fontSize(11)
  .font("Helvetica-Bold")
  .fillColor("#111827");

doc.text(
  "Category",
  50,
  tableTop
);

doc.text(
  "Budget",
  180,
  tableTop
);

doc.text(
  "Spent",
  280,
  tableTop
);

doc.text(
  "Usage %",
  380,
  tableTop
);

doc.text(
  "Status",
  470,
  tableTop
);

doc.moveDown(2);

if (
  budgetPerformance.length === 0
) {
  doc
    .fontSize(11)
    .fillColor("#6b7280")
    .text(
      "No budgets have been created yet."
    );

  doc.moveDown();
} else {
  budgetPerformance.forEach(
    (budget) => {
      const y = doc.y;

      let statusColor =
        "#16a34a";

      if (
        budget.status ===
        "Warning"
      ) {
        statusColor =
          "#f59e0b";
      }

      if (
        budget.status ===
        "Exceeded"
      ) {
        statusColor =
          "#dc2626";
      }

      doc
        .fontSize(10)
        .fillColor("#111827");

      doc.text(
        budget.category,
        50,
        y
      );

      doc.text(
        money(
          budget.budget
        ),
        180,
        y
      );

      doc.text(
        money(
          budget.spent
        ),
        280,
        y
      );

      doc.text(
        `${budget.percentageUsed}%`,
        380,
        y
      );

      doc
        .fillColor(
          statusColor
        )
        .text(
          budget.status,
          470,
          y
        );

      doc.moveDown();

      // Divider line
      doc
        .moveTo(
          50,
          doc.y
        )
        .lineTo(
          550,
          doc.y
        )
        .strokeColor(
          "#e5e7eb"
        )
        .stroke();

      doc.moveDown(
        0.5
      );
    }
  );
}

// Page break if needed

  doc.addPage();
doc.moveDown();
doc.text("", 50, doc.y);
        sectionTitle(
        "Top Spending Categories"
      );

      topCategories.forEach(
        (category) => {
          summaryRow(
            category._id,
            money(
  category.total
)
          );
        }
      );

      // ==========================
      // Transactions
      // ==========================
if (
  doc.y > 650
) {
  doc.addPage();
}
doc.moveDown();
doc.text("", 50, doc.y);
      sectionTitle(
        "Recent Transactions"
      );

      doc
        .font(
          "Helvetica-Bold"
        )
        .fontSize(11)
        .text(
          "Date",
          50
        )
        .text(
          "Category",
          150,
          doc.y - 15
        )
        .text(
          "Type",
          300,
          doc.y - 15
        )
        .text(
          "Amount",
          420,
          doc.y - 15
        );

      doc.moveDown();

      transactions
        .slice(0, 10)
        .forEach(
          (
            transaction
          ) => {
            const y =
              doc.y;

            doc
              .font(
                "Helvetica"
              )
              .fontSize(10)
              .text(
                new Date(
                  transaction.date
                ).toLocaleDateString(),
                50,
                y
              )
              .text(
                transaction.category,
                150,
                y
              )
              .text(
                transaction.type,
                300,
                y
              )
              .text(
                money(
  transaction.amount
),
                420,
                y
              );

            doc.moveDown();
          }
        );

      // ==========================
      // Footer
      // ==========================

      doc.moveDown(2);

      doc
        .fontSize(9)
        .fillColor(
          "#6b7280"
        )
        .text(
          "Generated by Personal Finance Management System",
          {
            align:
              "center",
          }
        );

      doc.end();
    }  catch (error) {
  console.error(
    "PDF Export Error:",
    error
  );

  res.status(500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
}
  };
import Transaction from "../models/Transaction.js";
import Debt from "../models/debt.js";
import Budget from "../models/Budget.js";
import {
calculateFinancialHealth,} from "../utils/financialHealth.js";

/*
  @desc    Dashboard Summary
  @route   GET /api/dashboard/summary
  @access  Private
*/
export const getDashboardSummary = async (
  req,
  res,
  next
) => {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(
      (transaction) => {
        if (
          transaction.type === "income"
        ) {
          totalIncome +=
            transaction.amount;
        }

        if (
          transaction.type ===
          "expense"
        ) {
          totalExpense +=
            transaction.amount;
        }
      }
    );

    const netSavings =
      totalIncome - totalExpense;

    res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpense,
        netSavings,
        transactionCount:
          transactions.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentActivity =
  async (req, res, next) => {
    try {
      const recentTransactions =
        await Transaction.find({
          user: req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      const recentDebts =
        await Debt.find({
          user: req.user._id,
        })
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.status(200).json({
        success: true,
        recentTransactions,
        recentDebts,
      });
    } catch (error) {
      next(error);
    }
  };

  export const getFinancialHealthScore =
  async (
    req,
    res,
    next
  ) => {
    try {
      const transactions =
        await Transaction.find({
          user: req.user._id,
        });

      const debts =
        await Debt.find({
          user: req.user._id,
        });

      const budgets =
        await Budget.find({
          user: req.user._id,
        });

      const result =
        await calculateFinancialHealth(
          transactions,
          debts,
          budgets
        );

      res.status(200).json({
        success: true,
        ...result,
      });
    } catch (error) {
      console.error(
        "Financial Health Error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };


export const getAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const transactions =
      await Transaction.find({
        user: req.user._id,
      });

    const monthMap = {};
    const categoryMap = {};

    transactions.forEach(
      (transaction) => {

        const date = new Date(
          transaction.date
        );

        const monthKey =
          `${date.getFullYear()}-${
            String(
              date.getMonth() + 1
            ).padStart(2, "0")
          }`;

        const monthLabel =
          date.toLocaleString(
            "default",
            {
              month: "short",
              year: "numeric",
            }
          );

        if (!monthMap[monthKey]) {
          monthMap[monthKey] = {
            month: monthLabel,
            sortDate: monthKey,
            income: 0,
            expense: 0,
          };
        }

        if (
          transaction.type ===
          "income"
        ) {
          monthMap[
            monthKey
          ].income +=
            transaction.amount;
        } else {
          monthMap[
            monthKey
          ].expense +=
            transaction.amount;

          categoryMap[
            transaction.category
          ] =
            (categoryMap[
              transaction.category
            ] || 0) +
            transaction.amount;
        }
      }
    );

    const incomeVsExpense =
      Object.values(monthMap);

    incomeVsExpense.sort(
      (a, b) =>
        a.sortDate.localeCompare(
          b.sortDate
        )
    );

    const categoryBreakdown =
      Object.entries(
        categoryMap
      ).map(
        ([category, amount]) => ({
          category,
          amount,
        })
      );

    res.status(200).json({
      success: true,
      incomeVsExpense,
      categoryBreakdown,
    });

  } catch (error) {
    next(error);
  }
};
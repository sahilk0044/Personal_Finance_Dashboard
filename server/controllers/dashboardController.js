import Transaction from "../models/Transaction.js";
import Debt from "../models/Debt.js";

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

  export const getFinancialHealthScore = async (
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

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((t) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      }

      if (t.type === "expense") {
        totalExpense += t.amount;
      }
    });

    const netSavings =
      totalIncome - totalExpense;

    const outstandingDebt =
      debts
        .filter(
          (d) =>
            d.type === "borrowed"
        )
        .reduce(
          (sum, d) =>
            sum +
            d.remainingAmount,
          0
        );

    let score = 50;

    if (totalIncome > 0) {
  const savingsRate =
    netSavings / totalIncome;

  const debtRatio =
    outstandingDebt / totalIncome;


score += savingsRate * 50;

score -= debtRatio * 30;

score = Math.round(score);

score = Math.max(
  0,
  Math.min(100, score)
);
    }

    let status = "Average";

    if (score >= 80) {
      status = "Excellent";
    } else if (score >= 65) {
      status = "Good";
    } else if (score >= 40) {
      status = "Fair";
    } else {
      status = "Poor";
    }

    res.status(200).json({
      success: true,
      score,
      status,
    });
  } catch (error) {
    next(error);
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
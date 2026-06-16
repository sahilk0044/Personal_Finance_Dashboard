import Transaction from "../models/Transaction.js";
import Debt from "../models/Debt.js";
import Budget from "../models/Budget.js";

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

const budgets =
  await Budget.find({
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

// ==========================
// Savings Score (0 - 60)
// ==========================

const savingsRate =
  totalIncome > 0
    ? netSavings /
      totalIncome
    : 0;

let savingsScore = 0;
if (totalIncome < 10000) {
  savingsScore =
    Math.min(
      savingsScore,
      30
    );
}

if (savingsRate >= 0.4) {
  savingsScore = 60;
} else if (
  savingsRate >= 0.3
) {
  savingsScore = 50;
} else if (
  savingsRate >= 0.2
) {
  savingsScore = 40;
} else if (
  savingsRate >= 0.1
) {
  savingsScore = 25;
} else if (
  savingsRate > 0
) {
  savingsScore = 10;
}

// ==========================
// Debt Score (0 - 20)
// ==========================

let debtScore = 20;

if (
  totalIncome > 0
) {
  if (
    outstandingDebt >
    totalIncome
  ) {
    debtScore = 0;
  } else if (
    outstandingDebt >
    totalIncome * 0.5
  ) {
    debtScore = 10;
  }
}

// ==========================
// Budget Score (0 - 10)
// ==========================

let budgetScore = 10;

const now =
  new Date();

const currentMonth =
  now.getMonth() + 1;

const currentYear =
  now.getFullYear();

const activeBudgets =
  budgets.filter(
    (b) =>
      b.month ===
        currentMonth &&
      b.year ===
        currentYear
  );

if (
  activeBudgets.length > 0
) {
  let respectedBudgets = 0;

  for (const budget of activeBudgets) {
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
              currentMonth &&
            new Date(
              t.date
            ).getFullYear() ===
              currentYear
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
      (spent /
        budget.limitAmount) *
      100;

    if (
      percentageUsed <
      80
    ) {
      respectedBudgets += 1;
    } else if (
      percentageUsed <
      100
    ) {
      respectedBudgets +=
        0.5;
    }
  }

  budgetScore =
    (respectedBudgets /
      activeBudgets.length) *
    10;
}

// ==========================
// Stability Score (0 - 10)
// ==========================

let stabilityScore = 10;

const currentMonthExpense =
  transactions
    .filter((t) => {
      const date =
        new Date(t.date);

      return (
        t.type ===
          "expense" &&
        date.getMonth() ===
          now.getMonth() &&
        date.getFullYear() ===
          now.getFullYear()
      );
    })
    .reduce(
      (sum, t) =>
        sum + t.amount,
      0
    );

const previousMonth =
  now.getMonth() === 0
    ? 11
    : now.getMonth() - 1;

const previousYear =
  now.getMonth() === 0
    ? now.getFullYear() -
      1
    : now.getFullYear();

const previousMonthExpense =
  transactions
    .filter((t) => {
      const date =
        new Date(t.date);

      return (
        t.type ===
          "expense" &&
        date.getMonth() ===
          previousMonth &&
        date.getFullYear() ===
          previousYear
      );
    })
    .reduce(
      (sum, t) =>
        sum + t.amount,
      0
    );

if (
  previousMonthExpense > 0
) {
  const changePercent =
    Math.abs(
      currentMonthExpense -
        previousMonthExpense
    ) /
    previousMonthExpense;

  if (
    changePercent > 2
  ) {
    stabilityScore = 0;
  } else if (
    changePercent > 1
  ) {
    stabilityScore = 5;
  }
}

// ==========================
// Final Score
// ==========================

let score =
  savingsScore +
  debtScore +
  budgetScore +
  stabilityScore;

score = Math.round(
  Math.max(
    0,
    Math.min(100, score)
  )
);

let status = "Poor";

if (score >= 80) {
  status = "Excellent";
} else if (
  score >= 65
) {
  status = "Good";
} else if (
  score >= 40
) {
  status = "Fair";
}

res.status(200).json({
  success: true,
  score,
  status,
  breakdown: {
    savingsScore,
    debtScore,
    budgetScore:
      Math.round(
        budgetScore
      ),
    stabilityScore,
  },
  summary: {
    totalIncome,
    totalExpense,
    netSavings,
    outstandingDebt,
    savingsRate:
      (
        savingsRate *
        100
      ).toFixed(1) + "%",
  },
});


} catch (error) {
  console.error(
    "Financial Health Error:",
    error
  );

  res.status(500).json({
    success: false,
    message: error.message,
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
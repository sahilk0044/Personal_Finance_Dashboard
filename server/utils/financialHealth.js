export const calculateFinancialHealth =
  async (
    transactions,
    debts,
    budgets
  ) => {

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

return({
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

})};

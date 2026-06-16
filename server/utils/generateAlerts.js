import Alert from "../models/Alert.js";
import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

export const generateAlerts =
  async (userId) => {
     
    const currentDate =
      new Date();

    const month =
      currentDate.getMonth() + 1;

    const year =
      currentDate.getFullYear();

    const budgets =
      await Budget.find({
        user: userId,
        month,
        year,
      });

    for (const budget of budgets) {
      const startDate =
        new Date(
          year,
          month - 1,
          1
        );

      const endDate =
        new Date(
          year,
          month,
          0,
          23,
          59,
          59
        );

      const spending =
        await Transaction.aggregate([
          {
            $match: {
              user: userId,
              type: "expense",
              category:
                budget.category,
              date: {
                $gte:
                  startDate,
                $lte:
                  endDate,
              },
            },
          },
          {
            $group: {
              _id: null,
              total: {
                $sum:
                  "$amount",
              },
            },
          },
        ]);

      const spentAmount =
        spending[0]?.total || 0;

      const percentageUsed =
        (spentAmount /
          budget.limitAmount) *
        100;

      // Budget Warning

      if (
        percentageUsed >= 80 &&
        percentageUsed < 100
      ) {
        const exists =
          await Alert.findOne({
            user: userId,
            type:
              "budget_warning",
            title:
              budget.category,
          });

        if (!exists) {
          await Alert.create({
            user: userId,
            type:
              "budget_warning",
            title:
              budget.category,
            message: `You've used ${percentageUsed.toFixed(
              1
            )}% of your ${
              budget.category
            } budget.`,
          });
        }
      }

      // Budget Exceeded

      if (
        percentageUsed >= 100
      ) {
        const exists =
          await Alert.findOne({
            user: userId,
            type:
              "budget_exceeded",
            title:
              budget.category,
          });

        if (!exists) {
          await Alert.create({
            user: userId,
            type:
              "budget_exceeded",
            title:
              budget.category,
            message: `You've exceeded your ${budget.category} budget.`,
          });
        }
      }
    }
      // ==========================
// Spending Spike Alert
// ==========================

const now = new Date();

const currentMonthExpense =
  await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
        date: {
          $gte: new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          ),
          $lte: new Date(),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

const previousMonthExpense =
  await Transaction.aggregate([
    {
      $match: {
        user: userId,
        type: "expense",
        date: {
          $gte: new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
          ),
          $lt: new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          ),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: {
          $sum: "$amount",
        },
      },
    },
  ]);

const currentExpense =
  currentMonthExpense[0]?.total ||
  0;

const previousExpense =
  previousMonthExpense[0]?.total ||
  0;

if (previousExpense > 0) {
  const increasePercent =
    (
      ((currentExpense -
        previousExpense) /
        previousExpense) *
      100
    );

  if (
    increasePercent >= 50
  ) {
    const exists =
      await Alert.findOne({
        user: userId,
        type:
          "spending_spike",
      });

    if (!exists) {
      await Alert.create({
        user: userId,
        type:
          "spending_spike",
        title:
          "Spending Spike",
        message: `Your spending increased by ${increasePercent.toFixed(
          1
        )}% compared to last month.`,
      });
    }
  }
}
  };


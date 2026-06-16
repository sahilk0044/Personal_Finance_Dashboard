import Transaction from "../models/Transaction.js";

export const getDashboardAnalytics = async (
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

    const categoryMap = {};

    transactions.forEach(
      (transaction) => {
        if (
          transaction.type ===
          "income"
        ) {
          totalIncome +=
            transaction.amount;
        } else {
          totalExpense +=
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

    const totalSavings =
      totalIncome -
      totalExpense;

    const categoryBreakdown =
      Object.entries(
        categoryMap
      ).map(
        ([category, amount]) => ({
          category,
          amount,
        })
      );

    const recentTransactions =
      await Transaction.find({
        user: req.user._id,
      })
        .sort({ date: -1 })
        .limit(5);

    res.status(200).json({
      success: true,

      summary: {
        totalIncome,
        totalExpense,
        totalSavings,
        transactionCount:
          transactions.length,
      },

      categoryBreakdown,

      recentTransactions,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBreakdown = async (
  req,
  res,
  next
) => {
  try {
    const categories =
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
            amount: {
              $sum: "$amount",
            },
          },
        },
        {
          $sort: {
            amount: -1,
          },
        },
      ]);

    res.status(200).json({
      success: true,
      categories:
        categories.map(
          (item) => ({
            category: item._id,
            amount: item.amount,
          })
        ),
    });
  } catch (error) {
    next(error);
  }
};
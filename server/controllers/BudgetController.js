import Budget from "../models/Budget.js";
import Transaction from "../models/Transaction.js";

/*
  @desc    Create Budget
  @route   POST /api/budgets
  @access  Private
*/
export const createBudget = async (
  req,
  res,
  next
) => {
  try {
    const {
      category,
      month,
      year,
      limitAmount,
    } = req.body;

    if (
      !category ||
      !month ||
      !year ||
      !limitAmount
    ) {
      res.status(400);
      throw new Error(
        "Category, month, year and budget amount are required"
      );
    }

    const existingBudget =
      await Budget.findOne({
        user: req.user._id,
        category,
        month,
        year,
      });

    if (existingBudget) {
      res.status(400);
      throw new Error(
        "Budget already exists for this category and month"
      );
    }

    const budget =
      await Budget.create({
        user: req.user._id,
        category,
        month,
        year,
        limitAmount,
      });

    res.status(201).json({
      success: true,
      message:
        "Budget created successfully",
      budget,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Budgets
  @route   GET /api/budgets
  @access  Private
*/
export const getBudgets = async (
  req,
  res,
  next
) => {
  try {
    const { month, year } = req.query;

    const query = {
      user: req.user._id,
    };

    if (month) {
      query.month = Number(month);
    }

    if (year) {
      query.year = Number(year);
    }

    const budgets =
      await Budget.find(query).sort({
        year: -1,
        month: -1,
      });

    res.status(200).json({
      success: true,
      budgets,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Single Budget
  @route   GET /api/budgets/:id
  @access  Private
*/
export const getBudgetById = async (
  req,
  res,
  next
) => {
  try {
    const budget =
      await Budget.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!budget) {
      res.status(404);
      throw new Error(
        "Budget not found"
      );
    }

    res.status(200).json({
      success: true,
      budget,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Update Budget
  @route   PUT /api/budgets/:id
  @access  Private
*/
export const updateBudget = async (
  req,
  res,
  next
) => {
  try {
    const budget =
      await Budget.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!budget) {
      res.status(404);
      throw new Error(
        "Budget not found"
      );
    }

    Object.assign(
      budget,
      req.body
    );

    const updatedBudget =
      await budget.save();

    res.status(200).json({
      success: true,
      message:
        "Budget updated successfully",
      budget: updatedBudget,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Delete Budget
  @route   DELETE /api/budgets/:id
  @access  Private
*/
export const deleteBudget = async (
  req,
  res,
  next
) => {
  try {
    const budget =
      await Budget.findOne({
        _id: req.params.id,
        user: req.user._id,
      });

    if (!budget) {
      res.status(404);
      throw new Error(
        "Budget not found"
      );
    }

    await budget.deleteOne();

    res.status(200).json({
      success: true,
      message:
        "Budget deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getBudgetAnalytics = async (
  req,
  res,
  next
) => {
  try {
    const {
      month,
      year,
    } = req.query;

    const currentDate = new Date();

    const selectedMonth =
      Number(month) ||
      currentDate.getMonth() + 1;

    const selectedYear =
      Number(year) ||
      currentDate.getFullYear();

    const budgets =
      await Budget.find({
        user: req.user._id,
        month: selectedMonth,
        year: selectedYear,
      });

    const analytics =
      await Promise.all(
        budgets.map(
          async (budget) => {

            const startDate =
              new Date(
                selectedYear,
                selectedMonth - 1,
                1
              );

            const endDate =
              new Date(
                selectedYear,
                selectedMonth,
                0,
                23,
                59,
                59
              );

            const spending =
              await Transaction.aggregate([
                {
                  $match: {
                    user:
                      req.user._id,
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
              spending[0]
                ?.total || 0;

            const remainingAmount =
              budget.limitAmount -
              spentAmount;

            const percentageUsed =
              budget.limitAmount > 0
                ? (
                    (spentAmount /
                      budget.limitAmount) *
                    100
                  ).toFixed(1)
                : 0;

            let status = "Safe";

            if (
              percentageUsed >= 100
            ) {
              status =
                "Exceeded";
            } else if (
              percentageUsed >= 80
            ) {
              status =
                "Warning";
            }

            return {
              _id: budget._id,
              category:
                budget.category,
              month:
                budget.month,
              year:
                budget.year,
              limitAmount:
                budget.limitAmount,
              spentAmount,
              remainingAmount,
              percentageUsed:
                Number(
                  percentageUsed
                ),
              status,
            };
          }
        )
      );

    res.status(200).json({
      success: true,
      budgets: analytics,
    });
  } catch (error) {
    next(error);
  }
};
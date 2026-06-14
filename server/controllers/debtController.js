import Debt from "../models/Debt.js";
import DebtPayment from "../models/DebtPayment.js";

/*
  @desc    Create Debt
  @route   POST /api/debts
  @access  Private
*/
export const createDebt = async (
  req,
  res,
  next
) => {
  try {
    const {
      type,
      personName,
      totalAmount,
      dueDate,
      notes,
    } = req.body;

    if (
      !type ||
      !personName ||
      !totalAmount
    ) {
      res.status(400);
      throw new Error(
        "Type, person name and amount are required"
      );
    }

    const debt = await Debt.create({
      user: req.user._id,
      type,
      personName,
      totalAmount,
      remainingAmount: totalAmount,
      dueDate,
      notes,
    });

    res.status(201).json({
      success: true,
      message: "Debt created successfully",
      debt,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Debts
  @route   GET /api/debts
  @access  Private
*/
export const getDebts = async (
  req,
  res,
  next
) => {
  try {
    const { type, status } = req.query;

    const query = {
      user: req.user._id,
    };

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    const debts = await Debt.find(query)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: debts.length,
      debts,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Single Debt
  @route   GET /api/debts/:id
  @access  Private
*/
export const getDebtById = async (
  req,
  res,
  next
) => {
  try {
    const debt = await Debt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!debt) {
      res.status(404);
      throw new Error("Debt not found");
    }

    res.status(200).json({
      success: true,
      debt,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Update Debt
  @route   PUT /api/debts/:id
  @access  Private
*/
export const updateDebt = async (
  req,
  res,
  next
) => {
  try {
    const debt = await Debt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!debt) {
      res.status(404);
      throw new Error("Debt not found");
    }

    Object.assign(debt, req.body);

    const updatedDebt =
      await debt.save();

    res.status(200).json({
      success: true,
      message: "Debt updated successfully",
      debt: updatedDebt,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Delete Debt
  @route   DELETE /api/debts/:id
  @access  Private
*/
export const deleteDebt = async (
  req,
  res,
  next
) => {
  try {
    const debt = await Debt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!debt) {
      res.status(404);
      throw new Error("Debt not found");
    }

    await debt.deleteOne();

    res.status(200).json({
      success: true,
      message: "Debt deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Add Debt Payment
  @route   POST /api/debts/:id/payment
  @access  Private
*/
export const addDebtPayment = async (
  req,
  res,
  next
) => {
  try {
    const { amount, notes } = req.body;

    if (!amount || amount <= 0) {
      res.status(400);
      throw new Error(
        "Valid payment amount is required"
      );
    }

    const debt = await Debt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!debt) {
      res.status(404);
      throw new Error("Debt not found");
    }

    if (debt.status === "paid") {
      res.status(400);
      throw new Error(
        "This debt is already paid"
      );
    }

    if (amount > debt.remainingAmount) {
      res.status(400);
      throw new Error(
        "Payment exceeds remaining amount"
      );
    }

    const payment =
      await DebtPayment.create({
        debt: debt._id,
        amount,
        notes,
      });

    debt.remainingAmount -= amount;

    if (debt.remainingAmount === 0) {
      debt.status = "paid";
    }

    await debt.save();

    res.status(201).json({
      success: true,
      message:
        "Payment added successfully",
      payment,
      debt,
    });
  } catch (error) {
    next(error);
  }
};


/*
  @desc    Get Debt Payment History
  @route   GET /api/debts/:id/payments
  @access  Private
*/
export const getDebtPayments = async (
  req,
  res,
  next
) => {
  try {
    const debt = await Debt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!debt) {
      res.status(404);
      throw new Error("Debt not found");
    }

    const payments =
      await DebtPayment.find({
        debt: debt._id,
      }).sort({
        paymentDate: -1,
      });

    res.status(200).json({
      success: true,
      count: payments.length,
      payments,
    });
  } catch (error) {
    next(error);
  }
};


/*
  @desc    Get Debt Summary
  @route   GET /api/debts/summary
  @access  Private
*/
export const getDebtSummary = async (
  req,
  res,
  next
) => {
  try {
    const debts = await Debt.find({
      user: req.user._id,
    });

    let totalBorrowed = 0;
    let totalLent = 0;

    let outstandingBorrowed = 0;
    let outstandingLent = 0;

    let activeDebts = 0;
    let paidDebts = 0;

    debts.forEach((debt) => {
      if (debt.type === "borrowed") {
        totalBorrowed += debt.totalAmount;
        outstandingBorrowed +=
          debt.remainingAmount;
      }

      if (debt.type === "lent") {
        totalLent += debt.totalAmount;
        outstandingLent +=
          debt.remainingAmount;
      }

      if (debt.status === "active") {
        activeDebts++;
      }

      if (debt.status === "paid") {
        paidDebts++;
      }
    });

    res.status(200).json({
      success: true,

      summary: {
        totalBorrowed,
        totalLent,

        outstandingBorrowed,
        outstandingLent,

        activeDebts,
        paidDebts,
      },
    });
  } catch (error) {
    next(error);
  }
};
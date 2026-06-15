import Transaction from "../models/Transaction.js";

/*
  @desc    Create Transaction
  @route   POST /api/transactions
  @access  Private
*/
export const createTransaction = async (req, res, next) => {
  try {
    const {
      type,
      category,
      amount,
      description,
      date,
      paymentMethod,
      tags,
      isRecurring,
      recurringFrequency,
    } = req.body;

    if (!type || !category || !amount) {
      res.status(400);
      throw new Error(
        "Type, category and amount are required"
      );
    }

    const transaction = await Transaction.create({
      user: req.user._id,
      type,
      category,
      amount,
      description,
      date,
      paymentMethod,
      tags,
      isRecurring,
      recurringFrequency,
    });

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Transactions
  @route   GET /api/transactions
  @access  Private
*/
export const getTransactions = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 30,
      type,
      category,
      startDate,
      endDate,
      search,
    } = req.query;

    const query = {
      user: req.user._id,
    };

    if (type) {
      query.type = type;
    }

    if (category) {
  query.category = {
    $regex: `^${category}$`,
    $options: "i",
  };
}

    if (startDate || endDate) {
      query.date = {};

      if (startDate) {
        query.date.$gte = new Date(startDate);
      }

      if (endDate) {
        query.date.$lte = new Date(endDate);
      }
    }

 if (search) {
  query.$or = [
    {
      description: {
        $regex: search,
        $options: "i",
      },
    },
    {
      category: {
        $regex: search,
        $options: "i",
      },
    },
    {
      paymentMethod: {
        $regex: search,
        $options: "i",
      },
    },
  ];
}

    const skip = (Number(page) - 1) * Number(limit);

    const transactions = await Transaction.find(query)
      .sort({ date: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Single Transaction
  @route   GET /api/transactions/:id
  @access  Private
*/
export const getTransactionById = async (
  req,
  res,
  next
) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Update Transaction
  @route   PUT /api/transactions/:id
  @access  Private
*/
export const updateTransaction = async (
  req,
  res,
  next
) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    Object.assign(transaction, req.body);

    const updatedTransaction =
      await transaction.save();

    res.status(200).json({
      success: true,
      message: "Transaction updated successfully",
      transaction: updatedTransaction,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Delete Transaction
  @route   DELETE /api/transactions/:id
  @access  Private
*/
export const deleteTransaction = async (
  req,
  res,
  next
) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!transaction) {
      res.status(404);
      throw new Error("Transaction not found");
    }

    await transaction.deleteOne();

    res.status(200).json({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
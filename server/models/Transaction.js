import mongoose from "mongoose";

const VALID_CATEGORIES = [
  "Food",
  "Travel",
  "Rent",
  "Shopping",
  "Savings",
  "Bills",
  "Entertainment",
  "Healthcare",
  "Education",
  "Other",
];

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Transaction type is required"],
    },

     category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
    enum: VALID_CATEGORIES,
  },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [1, "Amount must be greater than 0"],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
      default: "",
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },

    paymentMethod: {
      type: String,
      enum: [
        "Cash",
        "UPI",
        "Credit Card",
        "Debit Card",
        "Net Banking",
        "Wallet",
      ],
      default: "UPI",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    receipt: {
      type: String,
      default: "",
    },

    isRecurring: {
      type: Boolean,
      default: false,
    },

    recurringFrequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly", null],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster searching and analytics
transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1 });
transactionSchema.index({ user: 1, type: 1 });

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);

export default Transaction;
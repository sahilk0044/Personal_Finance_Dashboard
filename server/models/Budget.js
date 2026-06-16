import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

   category: {
  type: String,
  required: [true, "Category is required"],
  trim: true,
  enum: [
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
  ],
},

    month: {
      type: Number,
      required: true,
      min: 1,
      max: 12,
    },

    year: {
      type: Number,
      required: true,
    },

    limitAmount: {
      type: Number,
      required: [true, "Budget amount is required"],
      min: [1, "Budget amount must be greater than 0"],
    },
  },
  {
    timestamps: true,
  }
);

// One budget per category per month
budgetSchema.index(
  {
    user: 1,
    category: 1,
    month: 1,
    year: 1,
  },
  {
    unique: true,
  }
);

const Budget = mongoose.model(
  "Budget",
  budgetSchema
);

export default Budget;
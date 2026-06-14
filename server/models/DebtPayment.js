import mongoose from "mongoose";

const debtPaymentSchema = new mongoose.Schema(
  {
    debt: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Debt",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    notes: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "DebtPayment",
  debtPaymentSchema
);
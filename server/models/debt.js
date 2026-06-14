import mongoose from "mongoose";

const debtSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["borrowed", "lent"],
      required: true,
    },

    personName: {
      type: String,
      required: true,
      trim: true,
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    remainingAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    dueDate: {
      type: Date,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "paid"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

debtSchema.index({
  user: 1,
  status: 1,
});

debtSchema.index({
  user: 1,
  type: 1,
});

export default mongoose.model("Debt", debtSchema);
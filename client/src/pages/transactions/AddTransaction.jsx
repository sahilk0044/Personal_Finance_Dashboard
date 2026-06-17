import { useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import {
  createTransaction,
} from "../../services/transactionService";
import toast from "react-hot-toast";

const AddTransaction = () => {
  const navigate = useNavigate();
  


  const [formData, setFormData] =
    useState({
      type: "expense",
      category: "",
      amount: "",
      description: "",
      date: "",
      paymentMethod: "UPI",
    });

    const transactionData = {
  ...formData,
  category:
    formData.category
      .trim()
      .charAt(0)
      .toUpperCase() +
    formData.category
      .trim()
      .slice(1)
      .toLowerCase(),
};

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createTransaction(
        formData
      );
      toast.success(
  "Transaction added"
);

      navigate("/transactions");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

 const CATEGORIES = [
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

  return (
  <MainLayout>

    <div className="max-w-5xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Add Transaction
        </h1>

        <p className="text-slate-500 mt-2">
          Record a new income or expense transaction.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Form */}

        <div className="lg:col-span-2">

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5"
          >

            {/* Type */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Transaction Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>

              </select>

            </div>

            {/* Category */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">
                  Select Category
                </option>

                {CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}

              </select>

            </div>

            {/* Amount */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                placeholder="Enter amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Description */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <input
                type="text"
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Date */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* Payment Method */}

            <div>

              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option>
                  Cash
                </option>

                <option>
                  UPI
                </option>

                <option>
                  Credit Card
                </option>

                <option>
                  Debit Card
                </option>

                <option>
                  Net Banking
                </option>

                <option>
                  Wallet
                </option>

              </select>

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {loading
                  ? "Creating..."
                  : "Create Transaction"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/transactions")
                }
                className="border border-slate-300 px-6 py-3 rounded-xl hover:bg-slate-50 transition"
              >
                Cancel
              </button>

            </div>

          </form>

        </div>

        {/* Preview Card */}

        <div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:sticky lg:top-24">

            <h3 className="text-lg font-semibold mb-5">
              Transaction Preview
            </h3>

            <div className="space-y-4">

              <div>
                <p className="text-sm text-slate-500">
                  Type
                </p>

                <p
                  className={`font-semibold ${
                    formData.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {formData.type || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Category
                </p>

                <p className="font-medium">
                  {formData.category || "-"}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Amount
                </p>

                <p className="text-2xl font-bold">
                  ₹{formData.amount || 0}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Payment Method
                </p>

                <p className="font-medium">
                  {formData.paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Date
                </p>

                <p className="font-medium">
                  {formData.date || "-"}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </MainLayout>
);
};

export default AddTransaction;
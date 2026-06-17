import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import {
  createTransaction,
  getTransactionById,
  updateTransaction,
} from "../../services/transactionService";
import { useEffect } from "react";
import toast from "react-hot-toast";

const EditTransaction = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
  fetchTransaction();
}, []);

const fetchTransaction = async () => {
  try {
    const data =
      await getTransactionById(id);

    setFormData({
      type: data.transaction.type,
      category:
        data.transaction.category,
      amount:
        data.transaction.amount,
      description:
        data.transaction.description,
      date:
        data.transaction.date
          ?.split("T")[0],
      paymentMethod:
        data.transaction
          .paymentMethod,
    });
  } catch (error) {
    console.error(error);
  }
};

  const [formData, setFormData] =
    useState({
      type: "expense",
      category: "",
      amount: "",
      description: "",
      date: "",
      paymentMethod: "UPI",
    });

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

    await updateTransaction(
  id,
  formData
);
toast.success(
  "Transaction updated"
);


      navigate("/transactions");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
  <MainLayout>

    <div className="max-w-5xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Edit Transaction
        </h1>

        <p className="text-slate-500 mt-2">
          Update and manage your transaction details.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Form */}

        <div className="lg:col-span-2">

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5"
          >

            <div>

              <label className="block text-sm font-medium mb-2">
                Transaction Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              >
                <option value="income">
                  Income
                </option>

                <option value="expense">
                  Expense
                </option>

              </select>

            </div>

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

            <div>

              <label className="block text-sm font-medium mb-2">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Date
              </label>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
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

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {loading
                  ? "Updating..."
                  : "Update Transaction"}
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

        {/* Preview */}

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
                  {formData.type}
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

export default EditTransaction;
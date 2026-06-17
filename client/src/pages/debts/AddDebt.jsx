import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import { createDebt } from "../../services/debtService";

const AddDebt = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      type: "borrowed",
      personName: "",
      totalAmount: "",
      dueDate: "",
      notes: "",
    });

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

    await createDebt(formData);

    toast.success(
      "Debt added successfully"
    );

    navigate("/debts");
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Failed to create debt"
    );
  } finally {
    setLoading(false);
  }
};
  return (
  <MainLayout>

    <div className="max-w-6xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Add Debt
        </h1>

        <p className="text-slate-500 mt-2">
          Record money you've borrowed or lent and keep track of repayments.
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
                Debt Type
              </label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              >
                <option value="borrowed">
                  Borrowed
                </option>

                <option value="lent">
                  Lent
                </option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Person Name
              </label>

              <input
                type="text"
                name="personName"
                placeholder="Enter person name"
                value={formData.personName}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Amount
              </label>

              <input
                type="number"
                name="totalAmount"
                placeholder="Enter amount"
                value={formData.totalAmount}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Notes
              </label>

              <textarea
                name="notes"
                rows="5"
                placeholder="Add notes..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 resize-none"
              />

            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {loading
                  ? "Saving..."
                  : "Create Debt"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/debts")
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
              Debt Preview
            </h3>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-slate-500">
                  Debt Type
                </p>

                <p
                  className={`font-semibold ${
                    formData.type === "borrowed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {formData.type === "borrowed"
                    ? "Borrowed"
                    : "Lent"}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Person
                </p>

                <p className="font-medium">
                  {formData.personName || "-"}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Amount
                </p>

                <p className="text-3xl font-bold">
                  ₹{formData.totalAmount || 0}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Due Date
                </p>

                <p className="font-medium">
                  {formData.dueDate || "-"}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Notes
                </p>

                <p className="text-sm text-slate-700">
                  {formData.notes || "No notes added"}
                </p>

              </div>

              <div className="pt-4 border-t">

                <div
                  className={`rounded-xl p-4 ${
                    formData.type === "borrowed"
                      ? "bg-red-50"
                      : "bg-green-50"
                  }`}
                >

                  <p
                    className={`font-medium ${
                      formData.type === "borrowed"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {formData.type === "borrowed"
                      ? "Money You Owe"
                      : "Money Owed To You"}
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    This debt will be tracked in your dashboard and repayment analytics.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </MainLayout>
);
};

export default AddDebt;
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import { createBudget } from "../../services/budgetService";

const AddBudget = () => {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      category: "",
      month:
        new Date().getMonth() + 1,
      year:
        new Date().getFullYear(),
      limitAmount: "",
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

      await createBudget(
        formData
      );

      toast.success(
        "Budget created successfully"
      );

      navigate("/budgets");
    } catch (error) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to create budget"
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
          Create Budget
        </h1>

        <p className="text-slate-500 mt-2">
          Set spending limits and stay on top of your financial goals.
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
                Budget Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Category
                </option>

                <option value="Food">
                  Food
                </option>

                <option value="Travel">
                  Travel
                </option>

                <option value="Rent">
                  Rent
                </option>

                <option value="Shopping">
                  Shopping
                </option>

                <option value="Bills">
                  Bills
                </option>

                <option value="Entertainment">
                  Entertainment
                </option>

                <option value="Healthcare">
                  Healthcare
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            <div>

              <label className="block text-sm font-medium mb-2">
                Budget Amount
              </label>

              <input
                type="number"
                name="limitAmount"
                placeholder="Enter budget amount"
                value={formData.limitAmount}
                onChange={handleChange}
                required
                className="w-full border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>

                <label className="block text-sm font-medium mb-2">
                  Month
                </label>

                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3"
                >
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>

              </div>

              <div>

                <label className="block text-sm font-medium mb-2">
                  Year
                </label>

                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  className="w-full border border-slate-200 rounded-xl px-4 py-3"
                />

              </div>

            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {loading
                  ? "Creating..."
                  : "Create Budget"}
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/budgets")
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
              Budget Preview
            </h3>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-slate-500">
                  Category
                </p>

                <p className="font-semibold text-lg">
                  {formData.category || "-"}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Budget Limit
                </p>

                <p className="text-3xl font-bold text-indigo-600">
                  ₹{formData.limitAmount || 0}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Budget Period
                </p>

                <p className="font-medium">
                  {formData.month}/{formData.year}
                </p>

              </div>

              <div className="pt-4 border-t">

                <p className="text-sm text-slate-500 mb-2">
                  Budget Health
                </p>

                <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

                  <div
                    className="h-full bg-indigo-600"
                    style={{
                      width: "100%",
                    }}
                  />

                </div>

                <p className="text-xs text-slate-500 mt-2">
                  New budget ready to track spending.
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

export default AddBudget;
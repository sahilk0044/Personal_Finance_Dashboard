import { useState } from "react";

import { useParams,
  useNavigate }
  from "react-router-dom";

import toast from "react-hot-toast";

import MainLayout
  from "../../components/layout/MainLayout";

import {
  addDebtPayment,
} from "../../services/debtService";

const AddPayment = () => {

  const { id } = useParams();

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [formData,
    setFormData] =
    useState({
      amount: "",
      notes: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await addDebtPayment(
          id,
          formData
        );

        toast.success(
          "Payment added successfully"
        );

        navigate("/debts");
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to add payment"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
  <MainLayout>

    <div className="max-w-5xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Add Payment
        </h1>

        <p className="text-slate-500 mt-2">
          Record a repayment against an existing debt.
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
                Payment Amount
              </label>

              <input
                type="number"
                name="amount"
                placeholder="Enter payment amount"
                value={formData.amount}
                onChange={handleChange}
                required
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
                placeholder="Add payment notes..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-slate-200 rounded-xl px-4 py-3 resize-none"
              />

            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                {loading
                  ? "Saving..."
                  : "Add Payment"}
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

        {/* Preview */}

        <div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 lg:sticky lg:top-24">

            <h3 className="text-lg font-semibold mb-5">
              Payment Preview
            </h3>

            <div className="space-y-5">

              <div>

                <p className="text-sm text-slate-500">
                  Payment Amount
                </p>

                <p className="text-3xl font-bold text-green-600">
                  ₹{formData.amount || 0}
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

                <div className="bg-green-50 rounded-xl p-4">

                  <p className="font-medium text-green-700">
                    Debt Repayment
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    This payment will reduce the remaining balance of the selected debt.
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

export default AddPayment;
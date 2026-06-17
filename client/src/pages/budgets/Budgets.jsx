import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {getBudgetAnalytics,deleteBudget} from "../../services/budgetService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const Budgets = () => {
  const [budgets,
    setBudgets] =
    useState([]);

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = async () => {
  try {
    const data =
      await getBudgetAnalytics();

    setBudgets(
      data.budgets
    );
  } catch (error) {
    console.log(error);
  }
};



const handleDelete = async (id) => {

  const result = await Swal.fire({
    title: "Delete Budget?",
    text: "This budget will be permanently removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteBudget(id);

    toast.success(
      "Budget deleted successfully"
    );

    fetchBudgets();

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Failed to delete budget"
    );

  }
};
  return (
  <MainLayout>

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Budget Management
          </h1>

          <p className="text-slate-500 mt-2">
            Monitor spending and stay within your budget limits.
          </p>
        </div>

        <Link
          to="/budgets/add"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
        >
          + Add Budget
        </Link>

      </div>

      {/* Empty State */}

      {budgets.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

          <h3 className="text-2xl font-semibold">
            No Budgets Found
          </h3>

          <p className="text-slate-500 mt-3">
            Create your first budget and start tracking spending.
          </p>

          <Link
            to="/budgets/add"
            className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            Create Budget
          </Link>

        </div>

      ) : (

        <>
          {/* Summary */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-500 text-sm">
                Total Budgets
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {budgets.length}
              </h3>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-500 text-sm">
                Safe
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {
                  budgets.filter(
                    (b) =>
                      b.status === "Safe"
                  ).length
                }
              </h3>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-500 text-sm">
                Warning
              </p>

              <h3 className="text-3xl font-bold text-yellow-600 mt-2">
                {
                  budgets.filter(
                    (b) =>
                      b.status === "Warning"
                  ).length
                }
              </h3>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-slate-500 text-sm">
                Exceeded
              </p>

              <h3 className="text-3xl font-bold text-red-600 mt-2">
                {
                  budgets.filter(
                    (b) =>
                      b.status === "Exceeded"
                  ).length
                }
              </h3>
            </div>

          </div>

          {/* Budget Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {budgets.map((budget) => (

              <div
                key={budget._id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
              >

                <div className="flex justify-between items-start mb-5">

                  <div>

                    <h3 className="text-xl font-bold">
                      {budget.category}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Monthly Budget
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      budget.status === "Exceeded"
                        ? "bg-red-100 text-red-600"
                        : budget.status === "Warning"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {budget.status}
                  </span>

                </div>

                <div className="space-y-3">

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Budget
                    </span>

                    <span className="font-semibold">
                      ₹{budget.limitAmount}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Spent
                    </span>

                    <span className="font-semibold">
                      ₹{budget.spentAmount}
                    </span>

                  </div>

                  <div className="flex justify-between">

                    <span className="text-slate-500">
                      Remaining
                    </span>

                    <span
                      className={`font-semibold ${
                        budget.remainingAmount < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      ₹{budget.remainingAmount}
                    </span>

                  </div>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between text-sm mb-2">

                    <span>
                      Usage
                    </span>

                    <span>
                      {budget.percentageUsed}%
                    </span>

                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3">

                    <div
                      className={`h-3 rounded-full ${
                        budget.status === "Exceeded"
                          ? "bg-red-500"
                          : budget.status === "Warning"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          budget.percentageUsed,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="flex gap-3 mt-6">

                  <Link
                    to={`/budgets/edit/${budget._id}`}
                    className="flex-1 text-center bg-indigo-50 text-indigo-600 py-2 rounded-xl font-medium"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        budget._id
                      )
                    }
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-xl font-medium"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </>

      )}

    </div>

  </MainLayout>
);
};

export default Budgets;
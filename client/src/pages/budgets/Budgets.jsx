import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import {getBudgetAnalytics,deleteBudget} from "../../services/budgetService";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
  const confirmed = window.confirm(
    "Are you sure you want to delete this budget?"
  );

  if (!confirmed) return;

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
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Budgets   <Link
  to="/budgets/add"
  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
>
  Add Budget
</Link>
        </h1>
       
        {budgets.length === 0 ? (
  <div className="bg-white rounded-xl shadow p-10 text-center">
    <h3 className="text-xl font-semibold">
      No Budgets Found
    </h3>

    <p className="text-gray-500 mt-2">
      Create your first budget to track spending.
    </p>
  </div>
) : (

        <div className="bg-white rounded-xl shadow overflow-hidden">

          
          <table className="w-full">

            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">
                  Category
                </th>

                <th className="p-4 text-left">
                  Budget
                </th>

                <th className="p-4 text-left">
                  Spent
                </th>

                <th className="p-4 text-left">
                  Remaining
                </th>

                <th className="p-4 text-left">
                  Status
                </th>
                <th className="p-4 text-left">
  Progress
</th>
<th className="p-4 text-left">
  Actions
</th>
              </tr>
            </thead>

            <tbody>
              {budgets.map(
                (budget) => (
                  <tr
                    key={
                      budget._id
                    }
                    className="border-b"
                  >
                    <td className="p-4">
                      {
                        budget.category
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        budget.limitAmount
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        budget.spentAmount
                      }
                    </td>

                    <td className="p-4">
                      ₹
                      {
                        budget.remainingAmount
                      }
                    </td>

                    <td className="p-4">
                      {
                        budget.status
                      }
                    </td>
                    <td className="p-4">
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div
      className={`h-2 rounded-full ${
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

  <p className="text-xs mt-1">
    {budget.percentageUsed}%
  </p>
</td>


<td className="p-4 flex gap-3">
  <Link
    to={`/budgets/edit/${budget._id}`}
    className="text-blue-600"
  >
    Edit
  </Link>

  <button
    onClick={() =>
      handleDelete(budget._id)
    }
    className="text-red-600"
  >
    Delete
  </button>
</td>
                  </tr>
                )
              )}
            </tbody>

          </table>

        </div>
        )}
      </div>
      
    </MainLayout>
  );
};

export default Budgets;
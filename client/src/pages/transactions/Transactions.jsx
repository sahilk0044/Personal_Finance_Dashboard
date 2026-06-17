import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import toast from "react-hot-toast";
import { getTransactions }
  from "../../services/transactionService";
import { Link } from "react-router-dom";
import {
  deleteTransaction,
} from "../../services/transactionService";
import Swal from "sweetalert2";

const Transactions = () => {
  const [transactions,
    setTransactions] =
    useState([]);
    const [category, setCategory] =
  useState("");

    const [search, setSearch] =
  useState("");

  const [startDate, setStartDate] =
  useState("");

const [endDate, setEndDate] =
  useState("");

const [type, setType] =
  useState("");

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
  fetchTransactions();
}, [search, type, category, startDate,
    endDate,]);

const categories = [
  "Food",
  "Travel",
  "Rent",
  "Shopping",
  "Bills",
  "Entertainment",
  "Savings",
];

  const fetchTransactions =
    async () => {
      try {
       const data =
  await getTransactions({
    search,
    type,
    category,
     startDate,
    endDate,
  });

        setTransactions(
          data.transactions
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    

const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Delete Transaction?",
    text: "This transaction will be permanently removed.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#dc2626",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Delete",
    cancelButtonText: "Cancel",
  });

  if (!result.isConfirmed) return;

  try {
    await deleteTransaction(id);

    toast.success(
      "Transaction deleted successfully"
    );

    fetchTransactions();
  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to delete transaction"
    );
  }
};
  return (
  <MainLayout>
    {loading ? (
      <div className="flex justify-center items-center h-64">
        <p className="text-slate-500 text-lg">
          Loading transactions...
        </p>
      </div>
    ) : (
      <>
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Transactions
            </h1>

            <p className="text-slate-500 mt-1">
              Manage and track all your income and expenses.
            </p>
          </div>

          <Link
            to="/transactions/add"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
          >
            + Add Transaction
          </Link>

        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm">
              Total Transactions
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {transactions.length}
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm">
              Income Transactions
            </p>

            <h3 className="text-2xl font-bold mt-2 text-green-600">
              {
                transactions.filter(
                  (t) => t.type === "income"
                ).length
              }
            </h3>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-sm">
              Expense Transactions
            </p>

            <h3 className="text-2xl font-bold mt-2 text-red-600">
              {
                transactions.filter(
                  (t) => t.type === "expense"
                ).length
              }
            </h3>
          </div>

        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-6">

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3"
            />

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3"
            >
              <option value="">
                All Types
              </option>

              <option value="income">
                Income
              </option>

              <option value="expense">
                Expense
              </option>
            </select>

            <select
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3"
            >
              <option value="">
                All Categories
              </option>

              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) =>
                setStartDate(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3"
            />

            <input
              type="date"
              value={endDate}
              onChange={(e) =>
                setEndDate(e.target.value)
              }
              className="w-full border border-slate-200 rounded-xl px-4 py-3"
            />

            <button
              onClick={() => {
                setSearch("");
                setType("");
                setCategory("");
                setStartDate("");
                setEndDate("");
              }}
              className="bg-slate-600 hover:bg-slate-700 text-white rounded-xl px-4 py-3 transition"
            >
              Reset
            </button>

          </div>

        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          {transactions.length === 0 ? (
            <div className="text-center py-20">

              <h3 className="text-xl font-semibold text-slate-700">
                No Transactions Found
              </h3>

              <p className="text-slate-500 mt-2">
                Add your first transaction to start tracking your finances.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[800px]">

                <thead className="bg-slate-50">

                  <tr>

                    <th className="text-left p-4 font-semibold">
                      Date
                    </th>

                    <th className="text-left p-4 font-semibold">
                      Category
                    </th>

                    <th className="text-left p-4 font-semibold">
                      Type
                    </th>

                    <th className="text-left p-4 font-semibold">
                      Amount
                    </th>

                    <th className="text-left p-4 font-semibold">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {transactions.map(
                    (transaction) => (
                      <tr
                        key={transaction._id}
                        className="border-t hover:bg-slate-50 transition"
                      >
                        <td className="p-4">
                          {new Date(
                            transaction.date
                          ).toLocaleDateString()}
                        </td>

                        <td className="p-4 font-medium">
                          {transaction.category}
                        </td>

                        <td className="p-4">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              transaction.type ===
                              "income"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {transaction.type}
                          </span>

                        </td>

                        <td className="p-4">

                          <span
                            className={`font-semibold ${
                              transaction.type ===
                              "income"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {transaction.type ===
                            "income"
                              ? "+"
                              : "-"}
                            ₹
                            {
                              transaction.amount
                            }
                          </span>

                        </td>

                        <td className="p-4">

                          <div className="flex gap-2">

                            <Link
                              to={`/transactions/edit/${transaction._id}`}
                              className="px-3 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() =>
                                handleDelete(
                                  transaction._id
                                )
                              }
                              className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>
      </>
    )}
  </MainLayout>
);
}

export default Transactions;
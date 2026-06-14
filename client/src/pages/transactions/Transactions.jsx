import { useEffect, useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import toast from "react-hot-toast";
import { getTransactions }
  from "../../services/transactionService";
import { Link } from "react-router-dom";
import {
  deleteTransaction,
} from "../../services/transactionService";

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
  const confirmDelete =
    window.confirm(
      "Delete this transaction?"
    );

  if (!confirmDelete) return;

  try {
    await deleteTransaction(id);
    toast.success("Transaction deleted");
    fetchTransactions();
  } catch (error) {
    console.error(error);
  }
};
  return (
    <MainLayout>
      {/* <h1 className="text-3xl font-bold mb-6">
        Transactions
      </h1> */}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white rounded-xl shadow">

            <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Transactions
  </h1>

  <Link
    to="/transactions/add"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    + Add Transaction
  </Link>
</div>

<div className="flex gap-4 mb-6">

  <input
    type="text"
    placeholder="Search transactions..."
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    className="border rounded-lg px-4 py-2 w-72"
  />

  <select
    value={type}
    onChange={(e) =>
      setType(e.target.value)
    }
    className="border rounded-lg px-4 py-2"
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
  className="border rounded-lg px-4 py-2"
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
  className="border rounded-lg px-4 py-2"
/>

<input
  type="date"
  value={endDate}
  onChange={(e) =>
    setEndDate(e.target.value)
  }
  className="border rounded-lg px-4 py-2"
/>
<button
  onClick={() => {
    setSearch("");
    setType("");
    setCategory("");
    setStartDate("");
    setEndDate("");
  }}
  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
>
  Reset
</button>

</div>

          <table className="w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(
                (transaction) => (
                  <tr
                    key={
                      transaction._id
                    }
                  >
                    <td>
                      {new Date(
                        transaction.date
                      ).toLocaleDateString()}
                    </td>

                    <td>
                      {
                        transaction.category
                      }
                    </td>

                    <td>
                      {
                        transaction.type
                      }
                    </td>

                    <td>
                      ₹
                      {
                        transaction.amount
                      }
                    </td>
  <td className="p-4">
  <div className="flex gap-2">
    <Link
      to={`/transactions/edit/${transaction._id}`}
      className="bg-blue-500 text-white px-3 py-1 rounded"
    >
      Edit
    </Link>

    <button
      onClick={() =>
        handleDelete(transaction._id)
      }
      className="bg-red-500 text-white px-3 py-1 rounded"
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
    </MainLayout>
  );
};

export default Transactions;
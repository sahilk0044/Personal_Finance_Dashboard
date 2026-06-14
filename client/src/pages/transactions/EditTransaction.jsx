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

     updateTransaction(
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
      <h1 className="text-3xl font-bold mb-6">
        Add Transaction
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-4 max-w-xl"
      >
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="income">
            Income
          </option>

          <option value="expense">
            Expense
          </option>
        </select>

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="paymentMethod"
          value={
            formData.paymentMethod
          }
          onChange={handleChange}
          className="w-full border p-3 rounded"
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

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          {loading
            ? "Editing..."
            : "Edit Transaction"}
        </button>
      </form>
    </MainLayout>
  );
};

export default EditTransaction;
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

      <div className="max-w-xl">

        <h1 className="text-3xl font-bold mb-6">
          Add Payment
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >

          <input
            type="number"
            name="amount"
            placeholder="Payment Amount"
            value={
              formData.amount
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded"
            required
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={
              formData.notes
            }
            onChange={
              handleChange
            }
            rows="4"
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            {loading
              ? "Saving..."
              : "Add Payment"}
          </button>

        </form>

      </div>

    </MainLayout>
  );
};

export default AddPayment;
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
      <div className="max-w-2xl">

        <h1 className="text-3xl font-bold mb-6">
          Add Debt
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="borrowed">
              Borrowed
            </option>

            <option value="lent">
              Lent
            </option>
          </select>

          <input
            type="text"
            name="personName"
            placeholder="Person Name"
            value={
              formData.personName
            }
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="totalAmount"
            placeholder="Amount"
            value={
              formData.totalAmount
            }
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="date"
            name="dueDate"
            value={
              formData.dueDate
            }
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Add Debt"}
          </button>

        </form>
      </div>
    </MainLayout>
  );
};

export default AddDebt;
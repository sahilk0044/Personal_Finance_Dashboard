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
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Add Budget
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
            required
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

          <input
            type="number"
            name="limitAmount"
            placeholder="Budget Amount"
            value={
              formData.limitAmount
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="month"
            min="1"
            max="12"
            value={
              formData.month
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <input
            type="number"
            name="year"
            value={
              formData.year
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg p-3"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            {loading
              ? "Saving..."
              : "Add Budget"}
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddBudget;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
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

      const { data } =
        await API.post(
          "/auth/login",
          formData
        );

      login(data);

      navigate("/dashboard");
    } catch (error) {
      console.error(
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">

    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

      {/* Left Side */}

      <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-blue-600 p-12 text-white">

        <h1 className="text-5xl font-bold mb-6">
         BudgetWise
        </h1>

        <p className="text-xl leading-relaxed text-indigo-100">
          Welcome back. Monitor spending, manage budgets,
          track debts and gain complete visibility into your
          financial health.
        </p>

        <div className="mt-10 space-y-4">

          <div className="flex items-center gap-3">
            <span className="text-2xl">📊</span>
            <span>Financial Analytics</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">💰</span>
            <span>Budget Tracking</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">📈</span>
            <span>Income & Expense Insights</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-2xl">🔔</span>
            <span>Smart Financial Alerts</span>
          </div>

        </div>

      </div>

      {/* Right Side */}

      <div className="p-8 sm:p-12 flex flex-col justify-center">

        <div className="mb-8">

          <h2 className="text-4xl font-bold text-slate-800">
            Welcome Back
          </h2>

          <p className="text-slate-500 mt-2">
            Sign in to continue managing your finances.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />

          </div>

          <div>

            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
            />
            <Link
  to="/forgot-password"
  className="text-sm text-indigo-600 hover:text-indigo-700"
>
  Forgot Password?
</Link>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-70"
          >
            {loading
              ? "Signing In..."
              : "Sign In"}
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-slate-500">

            Don't have an account?

            <span
              onClick={() =>
                navigate("/register")
              }
              className="text-indigo-600 font-semibold cursor-pointer ml-1 hover:text-indigo-700"
            >
              Create Account
            </span>

          </p>

        </div>

      </div>

    </div>

  </div>
);
};

export default Login;
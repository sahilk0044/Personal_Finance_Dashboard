import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CTASection = () => {
  return (
    <section className="py-24 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700">

      <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">

        <span className="inline-block bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
          Start Today
        </span>

        <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
          Ready To Take Control
          <span className="block">
            Of Your Finances?
          </span>
        </h2>

        <p className="mt-6 text-lg text-indigo-100 max-w-3xl mx-auto">
          Track expenses, manage budgets, monitor debts,
          generate reports, and improve your financial
          health with BudgetWise's all-in-one finance dashboard.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 bg-white text-indigo-600 hover:bg-slate-100 px-8 py-4 rounded-xl font-semibold transition"
          >
            Get Started Free
            <FaArrowRight />
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center justify-center border border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-xl font-semibold transition"
          >
            Login
          </Link>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">

          <div>
            <h3 className="text-3xl font-bold text-white">
              100%
            </h3>

            <p className="text-indigo-100">
              Secure Platform
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">
              Real-Time
            </h3>

            <p className="text-indigo-100">
              Analytics
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white">
              Smart
            </h3>

            <p className="text-indigo-100">
              Financial Insights
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};

export default CTASection;
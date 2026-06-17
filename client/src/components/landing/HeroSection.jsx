import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaChartLine,
  FaWallet,
  FaBullseye,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-6">
              🚀 Smart Personal Finance Management
            </span>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight">
              Manage Your
              <span className="block text-indigo-600">
                Money Smarter
              </span>
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
              Track expenses, manage budgets,
              monitor debts, generate reports,
              and improve your financial health
              with a single powerful dashboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">

              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition"
              >
                Get Started
                <FaArrowRight />
              </Link>

              <Link
                to="/login"
                className="inline-flex items-center justify-center border border-slate-300 hover:border-indigo-600 hover:text-indigo-600 px-8 py-4 rounded-xl font-semibold transition"
              >
                Login
              </Link>

            </div>

            <div className="flex flex-wrap gap-8 mt-12">

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  100%
                </h3>
                <p className="text-slate-500">
                  Secure
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  Real-Time
                </h3>
                <p className="text-slate-500">
                  Analytics
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-slate-900">
                  Smart
                </h3>
                <p className="text-slate-500">
                  Insights
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}
          <div className="relative">

            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

              <div className="flex justify-between items-center mb-8">

                <div>
                  <p className="text-slate-500 text-sm">
                    Total Balance
                  </p>

                  <h2 className="text-4xl font-bold text-slate-900">
                    ₹85,450
                  </h2>
                </div>

                <div className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-medium">
                  +12.5%
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">

                <div className="bg-green-50 p-4 rounded-xl">
                  <FaWallet className="text-green-600 text-xl mb-2" />
                  <p className="text-sm text-slate-500">
                    Income
                  </p>
                  <h3 className="font-bold text-lg">
                    ₹65,000
                  </h3>
                </div>

                <div className="bg-red-50 p-4 rounded-xl">
                  <FaChartLine className="text-red-500 text-xl mb-2" />
                  <p className="text-sm text-slate-500">
                    Expense
                  </p>
                  <h3 className="font-bold text-lg">
                    ₹38,500
                  </h3>
                </div>

              </div>

              <div className="bg-indigo-50 p-5 rounded-xl">

                <div className="flex items-center gap-3 mb-3">
                  <FaBullseye className="text-indigo-600" />

                  <h4 className="font-semibold">
                    Budget Progress
                  </h4>
                </div>

                <div className="w-full bg-indigo-100 h-3 rounded-full">

                  <div className="bg-indigo-600 h-3 rounded-full w-[72%]" />

                </div>

                <p className="text-sm text-slate-500 mt-2">
                  72% budget utilized this month
                </p>

              </div>

            </div>

            <div className="absolute -top-8 -right-8 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-40" />

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-40" />

          </div>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;
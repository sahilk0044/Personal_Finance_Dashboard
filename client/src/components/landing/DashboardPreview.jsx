import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaWallet,
  FaBullseye,
} from "react-icons/fa6";

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-24 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Dashboard Preview
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            Everything In One
            <span className="block text-indigo-600">
              Powerful Dashboard
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            Monitor income, expenses, budgets, debts,
            and financial performance from a single,
            intuitive dashboard.
          </p>

        </div>

        {/* Dashboard Mockup */}
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden">

          {/* Top Bar */}
          <div className="bg-slate-900 px-6 py-4 flex items-center gap-2">

            <div className="w-3 h-3 bg-red-400 rounded-full" />
            <div className="w-3 h-3 bg-yellow-400 rounded-full" />
            <div className="w-3 h-3 bg-green-400 rounded-full" />

          </div>

          <div className="p-8">

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

              <div className="bg-green-50 p-6 rounded-2xl">
                <FaArrowTrendUp className="text-green-600 text-2xl mb-3" />

                <p className="text-sm text-slate-500">
                  Total Income
                </p>

                <h3 className="text-3xl font-bold text-slate-900">
                  ₹65,000
                </h3>
              </div>

              <div className="bg-red-50 p-6 rounded-2xl">
                <FaArrowTrendDown className="text-red-500 text-2xl mb-3" />

                <p className="text-sm text-slate-500">
                  Total Expense
                </p>

                <h3 className="text-3xl font-bold text-slate-900">
                  ₹38,500
                </h3>
              </div>

              <div className="bg-blue-50 p-6 rounded-2xl">
                <FaWallet className="text-blue-600 text-2xl mb-3" />

                <p className="text-sm text-slate-500">
                  Savings
                </p>

                <h3 className="text-3xl font-bold text-slate-900">
                  ₹26,500
                </h3>
              </div>

              <div className="bg-indigo-50 p-6 rounded-2xl">
                <FaBullseye className="text-indigo-600 text-2xl mb-3" />

                <p className="text-sm text-slate-500">
                  Health Score
                </p>

                <h3 className="text-3xl font-bold text-slate-900">
                  86/100
                </h3>
              </div>

            </div>

            {/* Fake Chart */}
            <div className="bg-slate-50 rounded-3xl p-8">

              <div className="flex justify-between items-end h-64 gap-4">

                {[40, 70, 55, 90, 75, 110, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 bg-gradient-to-t from-indigo-600 to-blue-400 rounded-t-xl"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  )
                )}

              </div>

              <div className="flex justify-between text-sm text-slate-500 mt-4">

                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default DashboardPreview;
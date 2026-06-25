import {
  FaChartPie,
  FaWallet,
  FaBullseye,
  FaBell,
  FaFilePdf,
  FaHeartbeat,
} from "react-icons/fa";

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaWallet />,
      title: "Expense Tracking",
      description:
        "Record and organize your income and expenses with powerful categorization and filtering.",
    },
    {
      icon: <FaBullseye />,
      title: "Budget Management",
      description:
        "Create monthly budgets, monitor spending, and stay within your financial limits.",
    },
    {
      icon: <FaChartPie />,
      title: "Advanced Analytics",
      description:
        "Visualize your financial data through interactive charts and spending insights.",
    },
    {
      icon: <FaHeartbeat />,
      title: "Financial Health Score",
      description:
        "Measure your financial stability using savings, debt ratio, and spending behavior.",
    },
    {
      icon: <FaBell />,
      title: "Smart Alerts",
      description:
        "Receive notifications for budget limits, unusual spending, and financial risks.",
    },
    {
      icon: <FaFilePdf />,
      title: "Export Reports",
      description:
        "Generate professional PDF, Excel, and CSV reports for complete financial tracking.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">

          <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Features
          </span>

          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
            Everything You Need To
            <span className="block text-indigo-600">
              Manage Your Finances
            </span>
          </h2>

          <p className="mt-6 text-lg text-slate-600 max-w-3xl mx-auto">
            BudgetWise provides all the tools required to track expenses,
            manage budgets, monitor debts, and gain complete control
            over your financial life.
          </p>

        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-indigo-200 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl"
            >

              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 text-2xl mb-6 group-hover:scale-110 transition">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default FeaturesSection;
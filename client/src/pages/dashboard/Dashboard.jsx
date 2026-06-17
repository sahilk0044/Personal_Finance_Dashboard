import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaWallet,
  FaMoneyBillWave,
  FaChartLine,
  FaTriangleExclamation,
} from "react-icons/fa6";
import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../../components/layout/MainLayout";
import { getDashboardSummary, getRecentActivity, } from "../../services/dashboardService";
import { getDebtSummary, } from "../../services/debtService";
import { getAnalytics, } from "../../services/dashboardService";
import {getFinancialHealthScore,} from "../../services/dashboardService";
import {getBudgetAnalytics,} from "../../services/budgetService";
import { getAlerts } from "../../services/alertService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [debtSummary, setDebtSummary] = useState(null);

  const [recentTransactions, setRecentTransactions] = useState([]);
  const [healthScore,setHealthScore] =useState(null);

  const [recentDebts, setRecentDebts] = useState([]);
  const [incomeVsExpense, setIncomeVsExpense] = useState([]);
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);

  const [budgetAnalytics,setBudgetAnalytics] =useState([]);

  const [alerts, setAlerts] =useState([]);

  

const fetchData = async () => {
  try {
    const dashboardData =
      await getDashboardSummary();

    const debtData =
      await getDebtSummary();

    setSummary(
      dashboardData.summary
    );

    setDebtSummary(
      debtData.summary
    );

    const recentData =
      await getRecentActivity();

    setRecentTransactions(
      recentData.recentTransactions
    );

    setRecentDebts(
      recentData.recentDebts
    );

    const healthData =
      await getFinancialHealthScore();

    setHealthScore(
      healthData
    );

    const analyticsData =
      await getAnalytics();

    setIncomeVsExpense(
      analyticsData.incomeVsExpense
    );

    setCategoryBreakdown(
      analyticsData.categoryBreakdown
    );

    // Budget Analytics
    const budgetData =
      await getBudgetAnalytics();

    setBudgetAnalytics(
      budgetData.budgets
    );
     const alertData =
  await getAlerts();

setAlerts(
  alertData.data.alerts
);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchData();
}, []);

if (
  !summary ||
  !debtSummary
) {
  return (
    <MainLayout>
      <p>Loading...</p>
    </MainLayout>
  );
}
const stats = [
  {
    title: "Total Income",
    value: `₹${summary.totalIncome}`,
    icon: <FaArrowTrendUp />,
    color: "text-green-600",
  },
  {
    title: "Total Expense",
    value: `₹${summary.totalExpense}`,
    icon: <FaArrowTrendDown />,
    color: "text-red-500",
  },
  {
    title: "Net Savings",
    value: `₹${summary.netSavings}`,
    icon: <FaWallet />,
    color: "text-blue-600",
  },
  {
    title: "Transactions",
    value: summary.transactionCount,
    icon: <FaMoneyBillWave />,
    color: "text-purple-600",
  },
  {
    title: "Outstanding Debt",
    value: `₹${debtSummary.outstandingBorrowed}`,
    icon: <FaTriangleExclamation />,
    color: "text-orange-600",
  },
];
const cardClass ="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 hover:shadow-md transition-all";
  return (
  <MainLayout>
    {/* Header */}
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">

  <div>
    <h1 className="text-3xl font-bold text-slate-800">
      Dashboard
    </h1>

    <p className="text-slate-500 mt-2">
      Track your finances and monitor spending trends.
    </p>
  </div>

  <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">

    <Link
      to="/transactions"
      className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
    >
      Add Transaction
    </Link>

    <Link
      to="/budgets"
      className="px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition"
    >
      Manage Budgets
    </Link>

  </div>

</div>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-6 mb-8">

      {stats.map((item) => (
        <div
          key={item.title}
          className={cardClass}
        >
          <div className="flex justify-between items-center">

            <div>
              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {item.value}
              </h3>
            </div>

            <div
              className={`text-3xl ${item.color}`}
            >
              {item.icon}
            </div>

          </div>
        </div>
      ))}

      {healthScore && (
       <div className="xl:col-span-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl p-5 shadow-sm">

          <h2 className="text-lg font-semibold">
            Financial Health Score
          </h2>

          <p className="text-5xl font-bold mt-4">
            {healthScore.score}/100
          </p>

          <p className="mt-2 text-indigo-100">
            {healthScore.status}
          </p>

        </div>
      )}

    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

      <div className={cardClass}>
        <h2 className="text-xl font-semibold mb-4">
          Income vs Expense
        </h2>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <BarChart data={incomeVsExpense}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Bar
              dataKey="income"
              fill="#22c55e"
            />

            <Bar
              dataKey="expense"
              fill="#ef4444"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-semibold mb-4">
          Expense Categories
        </h2>

        <ResponsiveContainer
          width="100%"
          height={280}
        >
          <PieChart>
            <Pie
              data={categoryBreakdown}
              dataKey="amount"
              nameKey="category"
              outerRadius={120}
              label={false}
            >
              {categoryBreakdown.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={[
                      "#3b82f6",
                      "#22c55e",
                      "#f59e0b",
                      "#ef4444",
                      "#8b5cf6",
                      "#06b6d4",
                    ][index % 6]}
                  />
                )
              )}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>

    {/* Budget + Alerts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

      <div className={cardClass}>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Budget Overview
          </h2>
        </div>

        {budgetAnalytics.length === 0 ? (
          <p className="text-slate-500">
            No budgets created yet
          </p>
        ) : (
          <div className="space-y-5">

            {budgetAnalytics
              .slice(0, 5)
              .map((budget) => (
                <div
                  key={budget._id}
                >
                  <div className="flex justify-between mb-2">

                    <span className="font-medium">
                      {budget.category}
                    </span>

                    <span className="text-sm text-slate-500">
                      {budget.percentageUsed}%
                    </span>

                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-3">

                    <div
                      className={`h-3 rounded-full ${
                        budget.status === "Exceeded"
                          ? "bg-red-500"
                          : budget.status === "Warning"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          budget.percentageUsed,
                          100
                        )}%`,
                      }}
                    />

                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
  <span>
    Used: {budget.percentageUsed}%
  </span>

  <span>
    {budget.status}
  </span>
</div>

                </div>
              ))}

          </div>
        )}
      </div>

      <div className={cardClass}>

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-semibold">
            Recent Alerts
          </h2>

          <Link
            to="/alerts"
            className="text-indigo-600 text-sm font-medium"
          >
            View All
          </Link>

        </div>

        {alerts.length === 0 ? (
          <p className="text-slate-500">
            No alerts found
          </p>
        ) : (
          <div className="space-y-4">

            {alerts
              .slice(0, 3)
              .map((alert) => (
                <div
                  key={alert._id}
                  className="border-b border-slate-100 pb-3"
                >
                  <p className="font-semibold">
                    {alert.title}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {alert.message}
                  </p>
                </div>
              ))}

          </div>
        )}

      </div>

    </div>

    {/* Transactions + Debts */}
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      <div className={cardClass}>

        <h2 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h2>

        <div className="space-y-3">

          {recentTransactions.length === 0 ? (
            <p className="text-slate-500">
              No transactions found
            </p>
          ) : (
            recentTransactions.map(
              (transaction) => (
                <div
                  key={transaction._id}
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium">
                      {transaction.category}
                    </p>

                    <p className="text-sm text-slate-500">
                      {transaction.date
                        ? new Date(
                            transaction.date
                          ).toLocaleDateString()
                        : ""}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{transaction.amount}
                  </span>
                </div>
              )
            )
          )}

        </div>

      </div>

      <div className={cardClass}>

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-semibold">
            Recent Debts
          </h2>

          <div className="text-sm text-slate-500">
            Lent: ₹{debtSummary.outstandingLent}
          </div>

        </div>

        <div className="space-y-3">

          {recentDebts.length === 0 ? (
            <p className="text-slate-500">
              No debts found
            </p>
          ) : (
            recentDebts.map(
              (debt) => (
                <div
                  key={debt._id}
                  className="flex justify-between items-center p-3 rounded-xl hover:bg-slate-50 transition"
                >
                  <div>
                    <p className="font-medium">
                      {debt.personName}
                    </p>
                  </div>

                  <span className="font-semibold">
                    ₹{debt.remainingAmount}
                  </span>
                </div>
              )
            )
          )}

        </div>

      </div>

    </div>

  </MainLayout>
);
};

export default Dashboard;
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

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Income</h3>

          <p className="text-2xl font-bold">
            ₹{summary.totalIncome}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Expense</h3>

          <p className="text-2xl font-bold">
            ₹{summary.totalExpense}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Net Savings</h3>

          <p className="text-2xl font-bold">
            ₹{summary.netSavings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Transactions</h3>

          <p className="text-2xl font-bold">
            {summary.transactionCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Outstanding Debt</h3>

          <p className="text-2xl font-bold">
            ₹{
              debtSummary.outstandingBorrowed
            }
          </p>
        </div>

        {healthScore && (

  <div className="bg-white p-6 rounded-xl shadow mt-8">

    <h2 className="text-xl font-semibold mb-4">
      Financial Health Score
    </h2>

    <div className="flex items-center justify-between">

      <div>

        <p className="text-5xl font-bold">
          {healthScore.score}/100
        </p>

      <p
  className={`text-lg mt-2 font-semibold
    ${
      healthScore.status ===
      "Excellent"
        ? "text-green-600"
        : healthScore.status ===
          "Good"
        ? "text-blue-600"
        : healthScore.status ===
          "Average"
        ? "text-yellow-600"
        : "text-red-600"
    }`}
>
  {healthScore.status}
</p>

      </div>

    </div>

  </div>

)}

<div className="bg-white p-6 rounded-xl shadow">
  <h2 className="text-xl font-semibold mb-4">
    Budget Overview
  </h2>

  {budgetAnalytics.length === 0 ? (
    <p className="text-gray-500">
      No budgets created yet
    </p>
  ) : (
    <div className="space-y-4">

      {budgetAnalytics
        .slice(0, 5)
        .map((budget) => (
          <div
            key={budget._id}
          >
            <div className="flex justify-between mb-1">
              <span>
                {budget.category}
              </span>

              <span>
                {budget.percentageUsed}%
              </span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">

              <div
                className={`h-2 rounded-full ${
                  budget.status ===
                  "Exceeded"
                    ? "bg-red-500"
                    : budget.status ===
                      "Warning"
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
            <div className="bg-white p-6 rounded-xl shadow">

  <h2 className="text-xl font-semibold mb-4">
    Recent Alerts
  </h2>

  {alerts.length === 0 ? (
    <p className="text-gray-500">
      No alerts
    </p>
  ) : (
    <div className="space-y-3">

      {alerts
        .slice(0, 3)
        .map((alert) => (
          <div
            key={alert._id}
            className="border-b pb-2"
          >
            <p className="font-medium">
              {alert.title}
            </p>

            <p className="text-sm text-gray-600">
              {alert.message}
            </p>
          </div>
        ))}

    </div>
  )}

</div>
<Link
  to="/alerts"
  className="text-blue-600 text-sm mt-3 inline-block"
>
  View All Alerts
</Link>
          </div>
          
        ))}
    </div>
  )}
</div>


<div className="bg-white p-6 rounded-xl shadow mt-8">

  <h2 className="text-xl font-semibold mb-4">
    Income vs Expense
  </h2>

  <ResponsiveContainer
    width="100%"
    height={350}
  >

    <BarChart
      data={incomeVsExpense}
    >

      <XAxis
        dataKey="month"
      />

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

<div className="bg-white p-6 rounded-xl shadow mt-8">

  <h2 className="text-xl font-semibold mb-4">
    Expense Categories
  </h2>

  <ResponsiveContainer
    width="100%"
    height={400}
  >

    <PieChart>

      <Pie
        data={
          categoryBreakdown
        }
        dataKey="amount"
        nameKey="category"
        outerRadius={140}
       label={({ category, percent }) =>
  `${category} ${(percent * 100).toFixed(0)}%`
}
      >

        {categoryBreakdown.map(
          (
            entry,
            index
          ) => (
            <Cell
              key={index}
              fill={[
                "#3b82f6",
                "#22c55e",
                "#f59e0b",
                "#ef4444",
                "#8b5cf6",
                "#06b6d4",
              ][
                index % 6
              ]}
            />
          )
        )}

      </Pie>

      <Tooltip />

      <Legend />

    </PieChart>

  </ResponsiveContainer>

</div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Money Lent</h3>

          <p className="text-2xl font-bold">
            ₹{
              debtSummary.outstandingLent
            }
          </p>
        </div>

      </div>
      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Recent Transactions
        </h2>

        <div className="space-y-3">

          {recentTransactions.map(
            (transaction) => (
              <div
                key={transaction._id}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {transaction.category}
                </span>

                <span>
                  ₹{
                    transaction.amount
                  }
                </span>
              </div>
            )
          )}

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mt-8">

        <h2 className="text-xl font-semibold mb-4">
          Recent Debts
        </h2>

        <div className="space-y-3">

          {recentDebts.map(
            (debt) => (
              <div
                key={debt._id}
                className="flex justify-between border-b pb-2"
              >
                <span>
                  {debt.personName}
                </span>

                <span>
                  ₹{
                    debt.remainingAmount
                  }
                </span>
              </div>
            )
          )}

        </div>

      </div>

    </MainLayout>
  );
};

export default Dashboard;
import {
  useEffect,
  useState,
} from "react";
import { useNavigate }
  from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import {
  getDebts,
  getDebtSummary,
} from "../../services/debtService";
import { Link } from "react-router-dom";

const Debts = () => {
  const [debts, setDebts] =
    useState([]);

  const [summary,
    setSummary] =
    useState(null);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const navigate=useNavigate();

  const fetchData =
    async () => {
      try {
        const debtData =
          await getDebts();

        const summaryData =
          await getDebtSummary();

        setDebts(
          debtData.debts
        );

        setSummary(
          summaryData.summary
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <MainLayout>
        <p>Loading...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      <div className="space-y-6">

  {/* Header */}

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

    <div>

      <h1 className="text-3xl font-bold text-slate-800">
        Debt Management
      </h1>

      <p className="text-slate-500 mt-2">
        Track borrowed and lent money in one place.
      </p>

    </div>

    <Link
      to="/debts/add"
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-medium transition"
    >
      + Add Debt
    </Link>

  </div>

  {/* Summary Cards */}

  {summary && (

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      <div className="bg-white rounded-2xl border border-slate-200 p-5">

        <p className="text-slate-500 text-sm">
          Total Borrowed
        </p>

        <h3 className="text-3xl font-bold text-red-600 mt-2">
          ₹{summary.totalBorrowed}
        </h3>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">

        <p className="text-slate-500 text-sm">
          Total Lent
        </p>

        <h3 className="text-3xl font-bold text-green-600 mt-2">
          ₹{summary.totalLent}
        </h3>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">

        <p className="text-slate-500 text-sm">
          Outstanding Borrowed
        </p>

        <h3 className="text-3xl font-bold text-red-500 mt-2">
          ₹{summary.outstandingBorrowed}
        </h3>

      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5">

        <p className="text-slate-500 text-sm">
          Outstanding Lent
        </p>

        <h3 className="text-3xl font-bold text-green-500 mt-2">
          ₹{summary.outstandingLent}
        </h3>

      </div>

    </div>

  )}

  {/* Empty State */}

  {debts.length === 0 ? (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

      <h3 className="text-2xl font-semibold">
        No Debts Found
      </h3>

      <p className="text-slate-500 mt-3">
        Add your first debt record.
      </p>

    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      {debts.map((debt) => (

        <div
          key={debt._id}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition"
        >

          <div className="flex justify-between items-start mb-5">

            <div>

              <h3 className="text-xl font-bold">
                {debt.personName}
              </h3>

              <p className="text-sm text-slate-500">
                {debt.type === "borrowed"
                  ? "Borrowed"
                  : "Lent"}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                debt.status === "paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {debt.status}
            </span>

          </div>

          <div className="space-y-3">

            <div className="flex justify-between">

              <span className="text-slate-500">
                Total Amount
              </span>

              <span className="font-semibold">
                ₹{debt.totalAmount}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-500">
                Remaining
              </span>

              <span className="font-semibold text-red-600">
                ₹{debt.remainingAmount}
              </span>

            </div>

            {debt.dueDate && (

              <div className="flex justify-between">

                <span className="text-slate-500">
                  Due Date
                </span>

                <span>
                  {new Date(
                    debt.dueDate
                  ).toLocaleDateString()}
                </span>

              </div>

            )}

          </div>

          {/* Progress */}

          <div className="mt-5">

            <div className="flex justify-between text-sm mb-2">

              <span>
                Repaid
              </span>

              <span>
                {Math.round(
                  ((debt.totalAmount -
                    debt.remainingAmount) /
                    debt.totalAmount) *
                    100
                ) || 0}
                %
              </span>

            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">

              <div
                className="bg-green-500 h-3 rounded-full"
                style={{
                  width: `${
                    Math.round(
                      ((debt.totalAmount -
                        debt.remainingAmount) /
                        debt.totalAmount) *
                        100
                    ) || 0
                  }%`,
                }}
              />

            </div>

          </div>

          {/* Actions */}

          <div className="flex gap-3 mt-6">

            <button
              onClick={() =>
                navigate(
                  `/debts/${debt._id}/payment`
                )
              }
              className="flex-1 bg-green-50 text-green-600 py-2 rounded-xl font-medium"
            >
              Add Payment
            </button>

            <Link
              to={`/debts/${debt._id}/payments`}
              className="flex-1 text-center bg-indigo-50 text-indigo-600 py-2 rounded-xl font-medium"
            >
              Payments
            </Link>

          </div>

        </div>

      ))}

    </div>

  )}

</div>
    </MainLayout>
  );
};

export default Debts;
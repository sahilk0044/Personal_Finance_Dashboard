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

      <h1 className="text-3xl font-bold mb-6">
        Debts
      </h1>

      <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Debts
  </h1>

  <Link
    to="/debts/add"
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    + Add Debt
  </Link>
</div>

      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="bg-white p-4 rounded-xl shadow">
            <h3>Total Borrowed</h3>
            <p className="text-xl font-bold">
              ₹{
                summary.totalBorrowed
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3>Total Lent</h3>
            <p className="text-xl font-bold">
              ₹{
                summary.totalLent
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3>Outstanding Borrowed</h3>
            <p className="text-xl font-bold">
              ₹{
                summary.outstandingBorrowed
              }
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3>Outstanding Lent</h3>
            <p className="text-xl font-bold">
              ₹{
                summary.outstandingLent
              }
            </p>
          </div>

        </div>
      )}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Total</th>
              <th>Remaining</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {debts.map((debt) => (
              <tr
                key={debt._id}
              >
                <td>
                  {debt.personName}
                </td>

                <td>
                  {debt.type}
                </td>

                <td>
                  ₹{
                    debt.totalAmount
                  }
                </td>

                <td>
                  ₹{
                    debt.remainingAmount
                  }
                </td>

                <td>
                  {debt.status}
                </td>

                <td>
  <button
    onClick={() =>
      navigate(
        `/debts/${debt._id}/payment`
      )
    }
    className="bg-green-600 text-white px-3 py-1 rounded"
  >
    Add Payment
  </button>
</td>
<Link
  to={`/debts/${debt._id}/payments`}
  className="bg-blue-600 text-white px-3 py-1 rounded"
>
  Payments
</Link>
              </tr>
            
            ))}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
};

export default Debts;
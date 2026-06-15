import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import {
  getDebtPayments,
} from "../../services/debtService";

const DebtPayments = () => {

  const { id } = useParams();

  const [payments,
    setPayments] =
    useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments =
    async () => {
      try {
        const data =
          await getDebtPayments(id);

        setPayments(
          data.payments
        );
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Payment History
      </h1>

      <div className="bg-white rounded-xl shadow">

        <table className="w-full">

          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>

            {payments.map(
              (payment) => (
                <tr
                  key={
                    payment._id
                  }
                >
                  <td>
                    {new Date(
                      payment.paymentDate
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    ₹{
                      payment.amount
                    }
                  </td>

                  <td>
                    {payment.notes}
                  </td>
                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </MainLayout>
  );
};

export default DebtPayments;
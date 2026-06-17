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

    <div className="max-w-5xl mx-auto">

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Payment History
        </h1>

        <p className="text-slate-500 mt-2">
          View all repayments made against this debt.
        </p>

      </div>

      {payments.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

          <h3 className="text-2xl font-semibold">
            No Payments Found
          </h3>

          <p className="text-slate-500 mt-3">
            No repayment records are available for this debt yet.
          </p>

        </div>

      ) : (

        <>
          {/* Summary Card */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">

            <div className="bg-white rounded-2xl border border-slate-200 p-5">

              <p className="text-slate-500 text-sm">
                Total Payments
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {payments.length}
              </h3>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">

              <p className="text-slate-500 text-sm">
                Total Amount Paid
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                ₹
                {payments.reduce(
                  (total, payment) =>
                    total +
                    payment.amount,
                  0
                )}
              </h3>

            </div>

          </div>

          {/* Timeline */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

            <div className="p-6 border-b border-slate-100">

              <h2 className="text-xl font-semibold">
                Payment Timeline
              </h2>

            </div>

            <div className="p-6">

              <div className="space-y-6">

                {payments.map(
                  (payment, index) => (
                    <div
                      key={payment._id}
                      className="flex gap-4"
                    >

                      {/* Timeline Dot */}

                      <div className="flex flex-col items-center">

                        <div className="w-4 h-4 rounded-full bg-green-500" />

                        {index !==
                          payments.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-200 mt-2" />
                        )}

                      </div>

                      {/* Payment Card */}

                      <div className="flex-1 bg-slate-50 rounded-xl p-4">

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">

                          <div>

                            <p className="font-semibold text-slate-800">
                              Payment Received
                            </p>

                            <p className="text-sm text-slate-500">
                              {new Date(
                                payment.paymentDate
                              ).toLocaleDateString()}
                            </p>

                          </div>

                          <div className="text-green-600 font-bold text-xl">
                            ₹{payment.amount}
                          </div>

                        </div>

                        {payment.notes && (

                          <div className="mt-3">

                            <p className="text-sm text-slate-600">
                              {payment.notes}
                            </p>

                          </div>

                        )}

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </>

      )}

    </div>

  </MainLayout>
);
};

export default DebtPayments;
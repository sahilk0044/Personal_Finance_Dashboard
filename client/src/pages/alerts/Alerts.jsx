import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import MainLayout from "../../components/layout/MainLayout";

import {
  getAlerts,
  markAlertRead,
  deleteAlert,
} from "../../services/alertService";

const Alerts = () => {
  const [alerts, setAlerts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts =
    async () => {
      try {
        const { data } =
          await getAlerts();

        setAlerts(
          data.alerts
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to load alerts"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleRead =
    async (id) => {
      try {
        await markAlertRead(id);

        toast.success(
          "Alert marked as read"
        );

        fetchAlerts();
      } catch (error) {
        toast.error(
          "Failed to update alert"
        );
      }
    };

  

const handleDelete = async (id) => {

  const result =
    await Swal.fire({
      title: "Delete Alert?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    });

  if (!result.isConfirmed) return;

  try {
    await deleteAlert(id);

    toast.success(
      "Alert deleted successfully"
    );

    fetchAlerts();
  } catch (error) {
    toast.error(
      "Failed to delete alert"
    );
  }
};
  return (
  <MainLayout>

    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Alerts Center
        </h1>

        <p className="text-slate-500 mt-2">
          Stay informed about budgets, spending habits and financial activities.
        </p>

      </div>

      {loading ? (

        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          Loading alerts...
        </div>

      ) : alerts.length === 0 ? (

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">

          <div className="text-6xl mb-4">
            🎉
          </div>

          <h2 className="text-2xl font-semibold">
            No Alerts
          </h2>

          <p className="text-slate-500 mt-3">
            You're all caught up.
          </p>

        </div>

      ) : (

        <>

          {/* Summary Cards */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">

            <div className="bg-white rounded-2xl border border-slate-200 p-5">

              <p className="text-slate-500 text-sm">
                Total Alerts
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {alerts.length}
              </h3>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">

              <p className="text-slate-500 text-sm">
                Unread
              </p>

              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {
                  alerts.filter(
                    (alert) => !alert.isRead
                  ).length
                }
              </h3>

            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-5">

              <p className="text-slate-500 text-sm">
                Read
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {
                  alerts.filter(
                    (alert) => alert.isRead
                  ).length
                }
              </h3>

            </div>

          </div>

          {/* Alert Cards */}

          <div className="space-y-5">

            {alerts.map((alert) => {

              const borderColor =
                alert.type === "budget_exceeded"
                  ? "border-red-500"
                  : alert.type === "budget_warning"
                  ? "border-yellow-500"
                  : alert.type === "spending_spike"
                  ? "border-blue-500"
                  : "border-indigo-500";

              const badgeColor =
                alert.type === "budget_exceeded"
                  ? "bg-red-100 text-red-700"
                  : alert.type === "budget_warning"
                  ? "bg-yellow-100 text-yellow-700"
                  : alert.type === "spending_spike"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-indigo-100 text-indigo-700";

              return (

                <div
                  key={alert._id}
                  className={`bg-white rounded-2xl border-l-4 ${borderColor} border-t border-r border-b border-slate-200 shadow-sm p-6`}
                >

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                    <div className="flex-1">

                      <div className="flex flex-wrap gap-2 items-center mb-3">

                        <h3 className="text-lg font-semibold text-slate-800">
                          {alert.title}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${badgeColor}`}
                        >
                          {alert.type
                            .replaceAll("_", " ")
                            .toUpperCase()}
                        </span>

                        {!alert.isRead && (
                          <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-700 font-medium">
                            UNREAD
                          </span>
                        )}

                      </div>

                      <p className="text-slate-600 leading-relaxed">
                        {alert.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-4">
                        {new Date(
                          alert.createdAt
                        ).toLocaleString()}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      {!alert.isRead && (

                        <button
                          onClick={() =>
                            handleRead(
                              alert._id
                            )
                          }
                          className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-xl font-medium hover:bg-indigo-100 transition"
                        >
                          Mark Read
                        </button>

                      )}

                      <button
                        onClick={() =>
                          handleDelete(
                            alert._id
                          )
                        }
                        className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-medium hover:bg-red-100 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              );
            })}

          </div>

        </>

      )}

    </div>

  </MainLayout>
);
};

export default Alerts;
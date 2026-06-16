import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

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

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete this alert?"
        );

      if (!confirmed) return;

      try {
        await deleteAlert(id);

        toast.success(
          "Alert deleted"
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
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Alerts
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : alerts.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <h2 className="text-xl font-semibold">
              No Alerts
            </h2>

            <p className="text-gray-500 mt-2">
              You're all caught up.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {alerts.map(
              (alert) => (
                <div
                  key={alert._id}
                  className={`bg-white p-5 rounded-xl shadow border-l-4 ${
                    alert.type ===
                    "budget_exceeded"
                      ? "border-red-500"
                      : alert.type ===
                        "budget_warning"
                      ? "border-yellow-500"
                      :alert.type ===
                        "spending_spike"?
                      "border-blue-500"
                      :"border-blue-500"
                      
                  }`}
                >
                  <div className="flex justify-between items-start">

                    <div>
                      <h3 className="font-semibold text-lg">
                        {
                          alert.title
                        }
                      </h3>

                      <p className="text-gray-600 mt-1">
                        {
                          alert.message
                        }
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(
                          alert.createdAt
                        ).toLocaleString()}
                      </p>

                      {!alert.isRead && (
                        <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Unread
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">

                      {!alert.isRead && (
                        <button
                          onClick={() =>
                            handleRead(
                              alert._id
                            )
                          }
                          className="text-blue-600"
                        >
                          Read
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleDelete(
                            alert._id
                          )
                        }
                        className="text-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                </div>
              )
            )}

          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Alerts;
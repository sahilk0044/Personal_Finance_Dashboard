import API from "./api";

export const getAlerts =
  () =>
    API.get("/alerts");

export const markAlertRead =
  (id) =>
    API.patch(
      `/alerts/${id}/read`
    );

export const deleteAlert =
  (id) =>
    API.delete(
      `/alerts/${id}`
    );
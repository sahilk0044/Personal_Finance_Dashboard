import API from "./api";

export const getDashboardSummary =
  async () => {
    const { data } =
      await API.get(
        "/dashboard/summary"
      );

    return data;
  };

  export const getRecentActivity =
  async () => {
    const { data } =
      await API.get(
        "/dashboard/recent"
      );

    return data;
  };

  export const getFinancialHealthScore =
  async () => {
    const { data } =
      await API.get(
        "/dashboard/health-score"
      );

    return data;
  };

  export const getAnalytics =
  async () => {
    const { data } =
      await API.get(
        "/dashboard/analytics"
      );

    return data;
  };
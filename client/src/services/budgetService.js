import API from "./api";

export const createBudget = (data) =>
  API.post("/budgets", data);

export const getBudgets = () =>
  API.get("/budgets");

export const getBudgetById = (
  id
) =>
  API.get(
    `/budgets/${id}`
  );

export const getBudgetAnalytics =
  async () => {
    const { data } =
      await API.get(
        "/budgets/analytics"
      );

    return data;
  };

export const updateBudget = (
  id,
  data
) =>
  API.put(
    `/budgets/${id}`,
    data
  );

export const deleteBudget = (id) =>
  API.delete(`/budgets/${id}`);
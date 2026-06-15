import API from "./api";

export const getDebts = async () => {
  const { data } = await API.get(
    "/debts"
  );

  return data;
};

export const getDebtSummary =
  async () => {
    const { data } = await API.get(
      "/debts/summary"
    );

    return data;
  };

export const createDebt =
  async (debtData) => {
    const { data } = await API.post(
      "/debts",
      debtData
    );

    return data;
  };

export const addDebtPayment =
  async (id, paymentData) => {
    const { data } = await API.post(
      `/debts/${id}/payment`,
      paymentData
    );

    return data;
  };

export const getDebtPayments =
  async (id) => {
    const { data } = await API.get(
      `/debts/${id}/payments`
    );

    return data;
  };

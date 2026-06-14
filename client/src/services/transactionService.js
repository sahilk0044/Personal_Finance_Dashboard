import API from "./api";

export const getTransactions = async (
  params = {}
) => {
  const { data } = await API.get(
    "/transactions",
    {
      params,
    }
  );

  return data;
};

export const getTransactionById = async (id) => {
  const { data } = await API.get(
    `/transactions/${id}`
  );

  return data;
};

export const createTransaction = async (
  transactionData
) => {
  const { data } = await API.post(
    "/transactions",
    transactionData
  );

  return data;
};

export const updateTransaction = async (
  id,
  transactionData
) => {
  const { data } = await API.put(
    `/transactions/${id}`,
    transactionData
  );

  return data;
};

export const deleteTransaction = async (
  id
) => {
  const { data } = await API.delete(
    `/transactions/${id}`
  );

  return data;
};
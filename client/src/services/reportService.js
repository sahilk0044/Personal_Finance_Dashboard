import API from "./api";

export const exportCSV =
  async () => {
    const response =
      await API.get(
        "/reports/export-csv",
        {
          responseType:
            "blob",
        }
      );

    return response.data;
  };

  export const exportExcel =
  async () => {
    const response =
      await API.get(
        "/reports/export-excel",
        {
          responseType:
            "blob",
        }
      );

    return response.data;
  };

  export const exportPDF =
  async () => {
    const response =
      await API.get(
        "/reports/export-pdf",
        {
          responseType:
            "blob",
        }
      );

    return response.data;
  };
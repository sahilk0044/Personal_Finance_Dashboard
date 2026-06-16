import toast from "react-hot-toast";

import MainLayout from "../../components/layout/MainLayout";

import {
  exportCSV,
  exportExcel,
  exportPDF,
} from "../../services/reportService";

const Reports = () => {
  const handleExport =
    async () => {
      try {
        const blob =
          await exportCSV();

        const url =
          window.URL.createObjectURL(
            blob
          );

        const link =
          document.createElement(
            "a"
          );

        link.href = url;

        link.download =
          "transactions.csv";

        link.click();

        toast.success(
          "CSV downloaded"
        );
      } catch (error) {
        toast.error(
          "Failed to export CSV"
        );
      }
    };

    const handleExcelExport =
  async () => {
    try {
      const blob =
        await exportExcel();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "transactions.xlsx";

      link.click();

      toast.success(
        "Excel downloaded"
      );
    } catch (error) {
        console.log(error);
        
      toast.error(
        "Failed to export Excel"
      );
    }
  };

  const handlePDFExport =
  async () => {
    try {
      const blob =
        await exportPDF();

      const url =
        window.URL.createObjectURL(
          blob
        );

      const link =
        document.createElement(
          "a"
        );

      link.href = url;

      link.download =
        "financial-report.pdf";

      link.click();

      toast.success(
        "PDF downloaded"
      );
    } catch (error) {
        console.log(error);
        
      toast.error(
        "Failed to export PDF"
      );
    }
  };

  return (
    <MainLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">
          Reports
        </h1>

        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Export Transactions
          </h2>

          <button
            onClick={
              handleExport
            }
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Download CSV
          </button>
          <button
  onClick={
    handleExcelExport
  }
  className="bg-green-600 text-white px-6 py-3 rounded-lg"
>
  Download Excel
</button>

<button
  onClick={
    handlePDFExport
  }
  className="bg-red-600 text-white px-6 py-3 rounded-lg"
>
  Download PDF
</button>

        </div>
      </div>
    </MainLayout>
  );
};

export default Reports;
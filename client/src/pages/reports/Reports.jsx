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

    <div className="max-w-7xl mx-auto">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Reports & Exports
        </h1>

        <p className="text-slate-500 mt-2">
          Download and analyze your financial data in multiple formats.
        </p>

      </div>

      {/* Export Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* CSV */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

          <div className="text-5xl mb-4">
            📄
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            CSV Export
          </h2>

          <p className="text-slate-500 mt-2 mb-6">
            Download raw transaction data for spreadsheets and custom analysis.
          </p>

          <button
            onClick={handleExport}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
          >
            Download CSV
          </button>

        </div>

        {/* Excel */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

          <div className="text-5xl mb-4">
            📊
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Excel Report
          </h2>

          <p className="text-slate-500 mt-2 mb-6">
            Export data into Microsoft Excel format with structured sheets.
          </p>

          <button
            onClick={handleExcelExport}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium transition"
          >
            Download Excel
          </button>

        </div>

        {/* PDF */}

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition">

          <div className="text-5xl mb-4">
            📕
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Financial Report
          </h2>

          <p className="text-slate-500 mt-2 mb-6">
            Generate a professional PDF report containing insights, budgets and analytics.
          </p>

          <button
            onClick={handlePDFExport}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-medium transition"
          >
            Download PDF
          </button>

        </div>

      </div>

      {/* Information Section */}

      <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">

        <h3 className="text-xl font-semibold text-slate-800 mb-4">
          Export Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div>
            <h4 className="font-semibold text-blue-600">
              CSV
            </h4>

            <p className="text-sm text-slate-500 mt-2">
              Best for importing data into external tools and databases.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-green-600">
              Excel
            </h4>

            <p className="text-sm text-slate-500 mt-2">
              Ideal for calculations, pivot tables and advanced analysis.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-red-600">
              PDF
            </h4>

            <p className="text-sm text-slate-500 mt-2">
              Suitable for presentations, sharing and record keeping.
            </p>
          </div>

        </div>

      </div>

    </div>

  </MainLayout>
);
};

export default Reports;
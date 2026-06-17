import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">

      <div className="min-h-screen md:flex">

        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex flex-col flex-1 md:ml-0 min-w-0">

          <Navbar
            setSidebarOpen={setSidebarOpen}
          />

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
           <div className="max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>

        </div>

      </div>

    </div>
  );
};

export default MainLayout;
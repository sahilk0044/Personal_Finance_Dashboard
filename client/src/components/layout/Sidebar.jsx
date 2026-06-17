import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaExchangeAlt,
  FaWallet,
  FaBullseye,
  FaBell,
  FaFileAlt,
  FaTimes,
} from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <FaExchangeAlt />,
    },
    {
      name: "Debts",
      path: "/debts",
      icon: <FaWallet />,
    },
    {
      name: "Budgets",
      path: "/budgets",
      icon: <FaBullseye />,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: <FaBell />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaFileAlt />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <aside
  className={`
    fixed md:sticky
    top-0
    left-0
    h-screen
    w-64
    flex-shrink-0
    bg-white
    border-r
    border-slate-200
    z-50
    transform
    transition-transform
    duration-300
    md:translate-x-0
    ${
      sidebarOpen
        ? "translate-x-0"
        : "-translate-x-full"
    }
  `}
>
        <div className="px-6 py-8 border-b border-slate-100">

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-3xl font-bold text-indigo-600">
                Finora
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Personal Finance Dashboard
              </p>
            </div>

            <button
              className="md:hidden"
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <FaTimes />
            </button>

          </div>

        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() =>
                setSidebarOpen(false)
              }
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`
              }
            >
              <span className="text-lg">
                {item.icon}
              </span>

              <span>
                {item.name}
              </span>
            </NavLink>
          ))}

        </nav>

        <div className="border-t border-slate-100 p-5">

          <div className="bg-slate-50 rounded-xl p-4">

            <p className="font-semibold text-slate-800">
              Finora
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Manage your finances smarter.
            </p>

          </div>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white border-r h-screen p-5">
            <h1 className="text-2xl font-bold mb-8">
                Finora
            </h1>

            <nav className="flex flex-col gap-3">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-lg"
                            : "px-3 py-2 rounded-lg hover:bg-gray-100"
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-lg"
                            : "px-3 py-2 rounded-lg hover:bg-gray-100"
                    }
                >
                    Transactions
                </NavLink>
                <NavLink
                    to="/debts"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-lg"
                            : "px-3 py-2 rounded-lg hover:bg-gray-100"
                    }
                >
                    Debts
                </NavLink>
                <NavLink
                    to="/budgets"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-lg"
                            : "px-3 py-2 rounded-lg hover:bg-gray-100"
                    }
                >
                    Budgets
                </NavLink>
                <NavLink
                    to="/alerts"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-lg"
                            : "px-3 py-2 rounded-lg hover:bg-gray-100"
                    }
                >
                    Alerts
                </NavLink>
                <NavLink
                    to="/reports"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-blue-100 text-blue-600 px-3 py-2 rounded-lg"
                            : "px-3 py-2 rounded-lg hover:bg-gray-100"
                    }
                >
                    Reports
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;
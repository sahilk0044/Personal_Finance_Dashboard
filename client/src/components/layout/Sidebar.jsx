import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r h-screen p-5">
      <h1 className="text-2xl font-bold mb-8">
        Finora
      </h1>

      <nav className="flex flex-col gap-3">
        <NavLink to="/dashboard">
          Dashboard
        </NavLink>

        <NavLink to="/transactions">
          Transactions
        </NavLink>

        <NavLink to="/debts">
          Debts
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
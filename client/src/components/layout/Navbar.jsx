import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  FaBell,
  FaSignOutAlt,
  FaUserCircle,
  FaBars,
  FaUser,
} from "react-icons/fa";

const Navbar = ({
  setSidebarOpen,
}) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 sticky top-0 z-30">

      <div className="flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-4">

          <button
            className="md:hidden p-2 rounded-lg bg-slate-100"
            onClick={() =>
              setSidebarOpen(true)
            }
          >
            <FaBars />
          </button>

          <div>
            <h2 className="text-lg md:text-xl font-semibold text-slate-800">
              Welcome back, {user?.name}
            </h2>

            <p className="text-xs md:text-sm text-slate-500">
              {today}
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 md:gap-4">

          {/* Alerts */}
          <Link
            to="/alerts"
            className="relative p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
          >
            <FaBell className="text-slate-600" />

            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl transition"
          >
            <FaUserCircle className="text-2xl text-indigo-500" />

            <div>
              <p className="font-medium text-slate-800">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500 capitalize">
                {user?.role || "User"}
              </p>
            </div>
          </Link>

          {/* Mobile Profile */}
          <Link
            to="/profile"
            className="md:hidden p-3 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
          >
            <FaUser />
          </Link>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 md:px-4 py-2 rounded-xl transition"
          >
            <FaSignOutAlt />

            <span className="hidden sm:block">
              Logout
            </span>
          </button>

        </div>

      </div>

    </header>
  );
};

export default Navbar;
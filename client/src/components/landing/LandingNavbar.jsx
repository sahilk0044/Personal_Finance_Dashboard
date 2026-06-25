import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";

const LandingNavbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200">

      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
              <FaWallet />
            </div>

            <span className="text-2xl font-bold text-slate-900">
              BudgetWise
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">

            <a
              href="#features"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              Features
            </a>

            <a
              href="#dashboard"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              Dashboard
            </a>

            <a
              href="#how-it-works"
              className="text-slate-600 hover:text-indigo-600 transition"
            >
              How It Works
            </a>

          </nav>

          {/* Buttons */}
          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="hidden sm:flex px-5 py-2.5 text-slate-700 hover:text-indigo-600 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition"
            >
              Get Started
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
};

export default LandingNavbar;
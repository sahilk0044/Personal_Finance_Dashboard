import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>

            <h2 className="text-3xl font-bold text-indigo-400">
              Finora
            </h2>

            <p className="text-slate-400 mt-4 leading-relaxed">
              A modern personal finance dashboard
              to manage expenses, budgets, debts,
              reports, and financial insights.
            </p>

            <div className="flex gap-4 mt-6">

              <a
                href="https://github.com/sahilk0044"
                target="_blank"
                 rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition"
              >
                <FaGithub size={20} />
              </a>

              <a
                href="https://www.linkedin.com/in/sahil-kolekar0055/"
                target="_blank"
                 rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition"
              >
                <FaLinkedin size={20} />
              </a>

              <a
                href="mailto:sahilkolekar0055@gmail.com"
                className="text-slate-400 hover:text-white transition"
              >
                <FaEnvelope size={20} />
              </a>

            </div>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>
                <Link
                  to="/"
                  className="hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/login"
                  className="hover:text-white transition"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  to="/register"
                  className="hover:text-white transition"
                >
                  Register
                </Link>
              </li>

            </ul>

          </div>

          {/* Features */}
          <div>

            <h3 className="text-lg font-semibold mb-4">
              Features
            </h3>

            <ul className="space-y-3 text-slate-400">

              <li>Expense Tracking</li>

              <li>Budget Management</li>

              <li>Debt Tracking</li>

              <li>Financial Analytics</li>

              <li>Smart Alerts</li>

              <li>Export Reports</li>

            </ul>

          </div>

          {/* Contact */}

        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Finora.
            All rights reserved.
          </p>

          <p className="text-slate-500 text-sm">
           Built as a Personal Finance Management System
using React, Node.js, Express & MongoDB.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
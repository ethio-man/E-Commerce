import React from "react";
import { Link } from "react-router-dom";
import { CircleUserRound, ShoppingCart, Bell, Search } from "lucide-react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
export default function NavBar() {
  const { user } = useAuth();
  const initials = user?.full_name.slice(0, 2).toUpperCase();
  console.log("user", user);
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className=" flex-shrink-0 flex items-center">
            <img
              src={Logo}
              alt="Warka"
              className="h-6 sm:h-9 md:h-16 w-auto object-contain "
            />
            <span className="text-xl font-semibold text-gray-900">Warka</span>
          </div>
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 gap-2">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent text-sm text-slate-600 outline-none w-48"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Avatar */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {initials}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                  {user.full_name}
                </span>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-400 hover:text-white  "
              >
                <CircleUserRound /> Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

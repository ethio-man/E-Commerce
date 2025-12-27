import React from "react";
import { Link } from "react-router-dom";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import Logo from "../assets/logo.png";
import { useAuth } from "../context/AuthContext.jsx";
export default function NavBar() {
  const { user } = useAuth();
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
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-8">
              <Link
                to="/cart"
                className="text-gray-600 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md hover:bg-blue-400 hover:text-white "
              >
                <ShoppingCart /> <span>Cart</span>
              </Link>
            </div>
            {user ? (
              <>
                <span>Welcome, {user.full_name}</span>
              </>
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

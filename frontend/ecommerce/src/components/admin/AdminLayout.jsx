import { Outlet, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin": "Dashboard",
  "/admin/products/manage": "Products",
  "/admin/orders": "Orders",
  "/admin/customers": "Customers",
  "/admin/reviews": "Reviews",
  "/admin/payments": "Payments",
  "/admin/administration": "Administration",
};

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Admin";

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0 shadow-sm">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-slate-800">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
              <Bell size={20} className="text-slate-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                {user?.full_name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                {user?.full_name}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

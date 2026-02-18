import { Outlet, useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import AdminSidebar from "./AdminSidebar.jsx";

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
                        <span className="text-xs text-slate-400 hidden sm:inline">
                            / {pageTitle}
                        </span>
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
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                NA
                            </div>
                            <span className="text-sm font-medium text-slate-700 hidden sm:inline">
                                Admin
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

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Star,
    CreditCard,
    Shield,
    ChevronLeft,
    ChevronRight,
    LogOut,
} from "lucide-react";
import Logo from "../../assets/logo.png";

const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
    { icon: Package, label: "Products", path: "/admin/products/manage" },
    { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
    { icon: Users, label: "Customers", path: "/admin/customers" },
    { icon: Star, label: "Reviews", path: "/admin/reviews" },
    { icon: CreditCard, label: "Payments", path: "/admin/payments" },
    { icon: Shield, label: "Administration", path: "/admin/administration" },
];

export default function AdminSidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside
            className={`${collapsed ? "w-[72px]" : "w-64"
                } bg-slate-900 text-white flex flex-col min-h-screen transition-all duration-300 ease-in-out relative`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-700/50">
                <img
                    src={Logo}
                    alt="Warka"
                    className="h-9 w-9 object-contain flex-shrink-0"
                />
                {!collapsed && (
                    <span className="text-lg font-bold tracking-wide bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Warka Admin
                    </span>
                )}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-20 bg-slate-700 hover:bg-indigo-600 text-white rounded-full p-1 shadow-lg transition-colors z-10"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive =
                        location.pathname === item.path ||
                        (item.path === "/admin/dashboard" &&
                            location.pathname === "/admin");
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                                }`}
                            title={collapsed ? item.label : ""}
                        >
                            <item.icon
                                size={20}
                                className={`flex-shrink-0 ${isActive
                                        ? "text-white"
                                        : "text-slate-400 group-hover:text-indigo-400"
                                    }`}
                            />
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-3 border-t border-slate-700/50">
                <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-red-400 transition-all duration-200"
                    title={collapsed ? "Back to Store" : ""}
                >
                    <LogOut size={20} className="flex-shrink-0" />
                    {!collapsed && <span>Back to Store</span>}
                </Link>
            </div>
        </aside>
    );
}

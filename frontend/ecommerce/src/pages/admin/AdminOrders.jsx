import { useState } from "react";
import { Search, Eye, X, ChevronDown } from "lucide-react";
import { mockOrders } from "../../data/adminMockData.js";
//list of colors for different statuses
const statusColors = {
    delivered: "bg-emerald-100 text-emerald-700",
    shipped: "bg-blue-100 text-blue-700",
    pending: "bg-amber-100 text-amber-700",
    cancelled: "bg-red-100 text-red-700",
};

const tabs = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrders() {
    const [orders, setOrders] = useState(mockOrders);
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");
    const [detailModal, setDetailModal] = useState(null);
//filter the orders by their status
    const filtered = orders.filter((o) => {
        const matchesTab =
            activeTab === "All" || o.status === activeTab.toLowerCase();
        const matchesSearch =
            o.id.toLowerCase().includes(search.toLowerCase()) ||
            o.customer.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handleStatusChange = (orderId, newStatus) => {
        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (detailModal?.id === orderId) {
            setDetailModal((prev) => ({ ...prev, status: newStatus }));
        }
    };

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="flex items-center bg-white rounded-xl px-4 py-2.5 shadow-sm border border-slate-200 w-full sm:w-80">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search by order ID or customer..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent outline-none text-sm text-slate-700 w-full"
                />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-white rounded-xl p-1 shadow-sm border border-slate-200 w-fit">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab
                                ? "bg-indigo-600 text-white shadow-sm"
                                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Order ID
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Customer
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Items
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Total
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Status
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Date
                                </th>
                                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((order) => (
                                <tr
                                    key={order.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 py-3.5 text-sm font-semibold text-indigo-600">
                                        {order.id}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <p className="text-sm font-medium text-slate-700">
                                            {order.customer}
                                        </p>
                                        <p className="text-xs text-slate-400">{order.email}</p>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-600">
                                        {order.items} items
                                    </td>
                                    <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">
                                        ${order.total.toFixed(2)}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="relative inline-block">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(order.id, e.target.value)
                                                }
                                                className={`text-xs font-semibold px-3 py-1.5 rounded-full appearance-none cursor-pointer pr-7 capitalize ${statusColors[order.status]
                                                    }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <ChevronDown
                                                size={12}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
                                            />
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-500">
                                        {order.date}
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <button
                                            onClick={() => setDetailModal(order)}
                                            className="p-2 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <Eye size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        No orders found.
                    </div>
                )}
            </div>

            {/* Order Detail Modal */}
            {detailModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">
                                Order Details
                            </h3>
                            <button
                                onClick={() => setDetailModal(null)}
                                className="p-1 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Order ID</span>
                                <span className="text-sm font-semibold text-indigo-600">
                                    {detailModal.id}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Customer</span>
                                <span className="text-sm font-medium text-slate-700">
                                    {detailModal.customer}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Email</span>
                                <span className="text-sm text-slate-700">
                                    {detailModal.email}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Items</span>
                                <span className="text-sm text-slate-700">
                                    {detailModal.items} items
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Total</span>
                                <span className="text-sm font-bold text-slate-800">
                                    ${detailModal.total.toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Payment Method</span>
                                <span className="text-sm text-slate-700">
                                    {detailModal.paymentMethod}
                                </span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-slate-500">Status</span>
                                <span
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[detailModal.status]
                                        }`}
                                >
                                    {detailModal.status}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm text-slate-500">Date</span>
                                <span className="text-sm text-slate-700">
                                    {detailModal.date}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setDetailModal(null)}
                            className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

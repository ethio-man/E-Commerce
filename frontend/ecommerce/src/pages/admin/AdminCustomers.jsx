import { useState } from "react";
import { Search, Eye, X } from "lucide-react";
import { mockCustomers } from "../../data/adminMockData.js";

const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
    blocked: "bg-red-100 text-red-700",
};

export default function AdminCustomers() {
    const [search, setSearch] = useState("");
    const [detailModal, setDetailModal] = useState(null);

    const filtered = mockCustomers.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Search */}
            <div className="flex items-center bg-white rounded-xl px-4 py-2.5 shadow-sm border border-slate-200 w-full sm:w-80">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent outline-none text-sm text-slate-700 w-full"
                />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-2xl font-bold text-slate-800">
                        {mockCustomers.length}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Total Customers</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-2xl font-bold text-emerald-600">
                        {mockCustomers.filter((c) => c.status === "active").length}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Active Customers</p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <p className="text-2xl font-bold text-slate-800">
                        $
                        {mockCustomers
                            .reduce((sum, c) => sum + c.totalSpent, 0)
                            .toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">Total Revenue</p>
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Customer
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Email
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Orders
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Total Spent
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Joined
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Status
                                </th>
                                <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((customer) => (
                                <tr
                                    key={customer.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {customer.avatar}
                                            </div>
                                            <span className="text-sm font-medium text-slate-800">
                                                {customer.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-500">
                                        {customer.email}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-700 font-medium">
                                        {customer.totalOrders}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">
                                        ${customer.totalSpent.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-500">
                                        {customer.joinDate}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[customer.status]
                                                }`}
                                        >
                                            {customer.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-right">
                                        <button
                                            onClick={() => setDetailModal(customer)}
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
                        No customers found.
                    </div>
                )}
            </div>

            {/* Customer Detail Modal */}
            {detailModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">
                                Customer Details
                            </h3>
                            <button
                                onClick={() => setDetailModal(null)}
                                className="p-1 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                                {detailModal.avatar}
                            </div>
                            <h4 className="text-lg font-bold text-slate-800">
                                {detailModal.name}
                            </h4>
                            <p className="text-sm text-slate-500">{detailModal.email}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
                            <div className="text-center">
                                <p className="text-xl font-bold text-slate-800">
                                    {detailModal.totalOrders}
                                </p>
                                <p className="text-xs text-slate-500">Orders</p>
                            </div>
                            <div className="text-center">
                                <p className="text-xl font-bold text-slate-800">
                                    ${detailModal.totalSpent.toLocaleString()}
                                </p>
                                <p className="text-xs text-slate-500">Total Spent</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-slate-700">
                                    {detailModal.joinDate}
                                </p>
                                <p className="text-xs text-slate-500">Join Date</p>
                            </div>
                            <div className="text-center">
                                <span
                                    className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[detailModal.status]
                                        }`}
                                >
                                    {detailModal.status}
                                </span>
                                <p className="text-xs text-slate-500 mt-1">Status</p>
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

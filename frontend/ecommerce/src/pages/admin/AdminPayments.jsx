import { useState } from "react";
import { Search, CreditCard, Building2, Wallet } from "lucide-react";
import { mockTransactions } from "../../data/adminMockData.js";

const statusColors = {
    completed: "bg-emerald-100 text-emerald-700",
    pending: "bg-amber-100 text-amber-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-purple-100 text-purple-700",
};

const methodIcons = {
    "Credit Card": CreditCard,
    PayPal: Wallet,
    "Bank Transfer": Building2,
};

const tabs = ["All", "Completed", "Pending", "Failed", "Refunded"];

export default function AdminPayments() {
    const [activeTab, setActiveTab] = useState("All");
    const [search, setSearch] = useState("");

    const filtered = mockTransactions.filter((t) => {
        const matchesTab =
            activeTab === "All" || t.status === activeTab.toLowerCase();
        const matchesSearch =
            t.id.toLowerCase().includes(search.toLowerCase()) ||
            t.orderId.toLowerCase().includes(search.toLowerCase()) ||
            t.customer.toLowerCase().includes(search.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const totalCompleted = mockTransactions
        .filter((t) => t.status === "completed")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalPending = mockTransactions
        .filter((t) => t.status === "pending")
        .reduce((sum, t) => sum + t.amount, 0);
    const totalRefunded = mockTransactions
        .filter((t) => t.status === "refunded")
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-emerald-50 p-2 rounded-lg">
                            <CreditCard size={18} className="text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-500">Completed</span>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600">
                        ${totalCompleted.toLocaleString()}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-amber-50 p-2 rounded-lg">
                            <CreditCard size={18} className="text-amber-600" />
                        </div>
                        <span className="text-sm text-slate-500">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">
                        ${totalPending.toLocaleString()}
                    </p>
                </div>
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-purple-50 p-2 rounded-lg">
                            <CreditCard size={18} className="text-purple-600" />
                        </div>
                        <span className="text-sm text-slate-500">Refunded</span>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">
                        ${totalRefunded.toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center bg-white rounded-xl px-4 py-2.5 shadow-sm border border-slate-200 w-full sm:w-80">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                    type="text"
                    placeholder="Search transactions..."
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

            {/* Transactions Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Transaction ID
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Order
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Customer
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Amount
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Method
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Status
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map((txn) => {
                                const MethodIcon = methodIcons[txn.method] || CreditCard;
                                return (
                                    <tr
                                        key={txn.id}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-3.5 text-sm font-semibold text-indigo-600">
                                            {txn.id}
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-slate-600">
                                            {txn.orderId}
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-slate-700">
                                            {txn.customer}
                                        </td>
                                        <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">
                                            ${txn.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <MethodIcon size={14} className="text-slate-400" />
                                                {txn.method}
                                                {txn.cardLast4 && (
                                                    <span className="text-xs text-slate-400">
                                                        ••••{txn.cardLast4}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <span
                                                className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[txn.status]
                                                    }`}
                                            >
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3.5 text-sm text-slate-500">
                                            {txn.date}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400">
                        No transactions found.
                    </div>
                )}
            </div>
        </div>
    );
}

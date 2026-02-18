import { useState } from "react";
import { Shield, Plus, Edit2, Trash2, X, Eye, EyeOff, Lock } from "lucide-react";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { mockAdmins } from "../../data/adminMockData.js";

const roleColors = {
    super_admin: "bg-purple-100 text-purple-700",
    admin: "bg-blue-100 text-blue-700",
};

const statusColors = {
    active: "bg-emerald-100 text-emerald-700",
    inactive: "bg-slate-100 text-slate-600",
};

function LoginGate({ onLogin, error }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(username, password);
    };

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 w-full max-w-md p-8">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
                        <Lock size={28} className="text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Super Admin Access
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        This section is restricted. Enter your super admin credentials to continue.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-12 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>
                    {error && (
                        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                            {error}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        Authenticate
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function AdminAdministration() {
    const { isSuperAdmin, adminLogin, adminLogout, error } = useAdminAuth();
    const [admins, setAdmins] = useState(mockAdmins);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [newAdmin, setNewAdmin] = useState({
        username: "",
        fullName: "",
        email: "",
        role: "admin",
        password: "",
    });

    if (!isSuperAdmin) {
        return <LoginGate onLogin={adminLogin} error={error} />;
    }

    const handleAddAdmin = () => {
        const admin = {
            id: admins.length + 1,
            ...newAdmin,
            lastLogin: "Never",
            status: "active",
        };
        setAdmins((prev) => [...prev, admin]);
        setNewAdmin({
            username: "",
            fullName: "",
            email: "",
            role: "admin",
            password: "",
        });
        setAddModal(false);
    };

    const handleSaveEdit = () => {
        setAdmins((prev) =>
            prev.map((a) => (a.id === editModal.id ? editModal : a))
        );
        setEditModal(null);
    };

    const handleDelete = (id) => {
        setAdmins((prev) => prev.filter((a) => a.id !== id));
        setDeleteConfirm(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-xl">
                        <Shield size={20} className="text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">
                            Admin Management
                        </h2>
                        <p className="text-xs text-slate-500">
                            Authenticated as Super Admin
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => setAddModal(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
                    >
                        <Plus size={18} />
                        Add Admin
                    </button>
                    <button
                        onClick={adminLogout}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors"
                    >
                        Lock
                    </button>
                </div>
            </div>

            {/* Admins Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/50">
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Admin
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Username
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Email
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Role
                                </th>
                                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                                    Last Login
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
                            {admins.map((admin) => (
                                <tr
                                    key={admin.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                                {admin.fullName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </div>
                                            <span className="text-sm font-medium text-slate-800">
                                                {admin.fullName}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-600 font-mono">
                                        {admin.username}
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-500">
                                        {admin.email}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${roleColors[admin.role]
                                                }`}
                                        >
                                            {admin.role.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5 text-sm text-slate-500">
                                        {admin.lastLogin}
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <span
                                            className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${statusColors[admin.status]
                                                }`}
                                        >
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => setEditModal({ ...admin })}
                                                className="p-2 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            {admin.role !== "super_admin" && (
                                                <button
                                                    onClick={() => setDeleteConfirm(admin.id)}
                                                    className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Admin Modal */}
            {addModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">
                                Add New Admin
                            </h3>
                            <button
                                onClick={() => setAddModal(false)}
                                className="p-1 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={newAdmin.fullName}
                                    onChange={(e) =>
                                        setNewAdmin({ ...newAdmin, fullName: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="Enter full name"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={newAdmin.username}
                                    onChange={(e) =>
                                        setNewAdmin({ ...newAdmin, username: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="Enter username"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={newAdmin.email}
                                    onChange={(e) =>
                                        setNewAdmin({ ...newAdmin, email: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={newAdmin.password}
                                    onChange={(e) =>
                                        setNewAdmin({ ...newAdmin, password: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                    placeholder="Enter password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Role
                                </label>
                                <select
                                    value={newAdmin.role}
                                    onChange={(e) =>
                                        setNewAdmin({ ...newAdmin, role: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setAddModal(false)}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleAddAdmin}
                                className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                Add Admin
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Admin Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Edit Admin</h3>
                            <button
                                onClick={() => setEditModal(null)}
                                className="p-1 hover:bg-slate-100 rounded-lg"
                            >
                                <X size={20} className="text-slate-400" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={editModal.fullName}
                                    onChange={(e) =>
                                        setEditModal({ ...editModal, fullName: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={editModal.email}
                                    onChange={(e) =>
                                        setEditModal({ ...editModal, email: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Role
                                </label>
                                <select
                                    value={editModal.role}
                                    onChange={(e) =>
                                        setEditModal({ ...editModal, role: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super_admin">Super Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Status
                                </label>
                                <select
                                    value={editModal.status}
                                    onChange={(e) =>
                                        setEditModal({ ...editModal, status: e.target.value })
                                    }
                                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                                >
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setEditModal(null)}
                                className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSaveEdit}
                                className="px-5 py-2 rounded-xl text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation */}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Trash2 size={24} className="text-red-600" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">
                            Remove Admin?
                        </h3>
                        <p className="text-sm text-slate-500 mb-6">
                            This admin will lose all access to the admin panel.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="px-5 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirm)}
                                className="px-5 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

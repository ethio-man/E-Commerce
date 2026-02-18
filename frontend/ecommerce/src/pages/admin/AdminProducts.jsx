import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Edit2, Trash2, X } from "lucide-react";
import { mockProducts } from "../../data/adminMockData.js";

const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  out_of_stock: "bg-red-100 text-red-700",
  draft: "bg-slate-100 text-slate-600",
};

const categories = [
  "All",
  "ELECTRONICS",
  "ACCESSORIES",
  "FASHION",
  "HOME_GARDEN",
  "BEAUTY",
  "SPORTS",
  "TOYS",
];

export default function AdminProducts() {
  const [products, setProducts] = useState(mockProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [editModal, setEditModal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product) => {
    setEditModal({ ...product });
  };

  const handleSaveEdit = () => {
    setProducts((prev) =>
      prev.map((p) => (p.id === editModal.id ? editModal : p)),
    );
    setEditModal(null);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center bg-white rounded-xl px-4 py-2.5 shadow-sm border border-slate-200 w-full sm:w-80">
          <Search size={18} className="text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-sm text-slate-700 w-full"
          />
        </div>
        <Link
          to="/admin/addProducts"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              categoryFilter === cat
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Stock
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
              {filtered.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-800">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {product.brand}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-600">
                    {product.category.replace("_", " ")}
                  </td>
                  <td className="px-6 py-3.5 text-sm font-semibold text-slate-800">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-600">
                    {product.stock}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                        statusColors[product.status]
                      }`}
                    >
                      {product.status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(product.id)}
                        className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            No products found.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-800">Edit Product</h3>
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
                  Name
                </label>
                <input
                  type="text"
                  value={editModal.name}
                  onChange={(e) =>
                    setEditModal({ ...editModal, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={editModal.price}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    value={editModal.stock}
                    onChange={(e) =>
                      setEditModal({
                        ...editModal,
                        stock: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                </div>
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
                  <option value="out_of_stock">Out of Stock</option>
                  <option value="draft">Draft</option>
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
              Delete Product?
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              This action cannot be undone.
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

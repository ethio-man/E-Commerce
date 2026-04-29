import { useState, useEffect } from "react";
import Request from "../../api/Request.js";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";

const statusColors = {
  delivered: "bg-emerald-100 text-emerald-700",
  shipped: "bg-blue-100 text-blue-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-700",
};
export const monthlyRevenue = [
  { month: "Jan", revenue: 8200 },
  { month: "Feb", revenue: 9400 },
  { month: "Mar", revenue: 11200 },
  { month: "Apr", revenue: 10800 },
  { month: "May", revenue: 12500 },
  { month: "Jun", revenue: 13100 },
  { month: "Jul", revenue: 11800 },
  { month: "Aug", revenue: 14200 },
  { month: "Sep", revenue: 13600 },
  { month: "Oct", revenue: 15400 },
  { month: "Nov", revenue: 16800 },
  { month: "Dec", revenue: 18200 },
];
export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const resUser = await Request("users").getAll();
        const resProduct = await Request("products").getAll();
        const resOrder = await Request("orders").getAll();
        if (resUser.data) setUsers(resUser.data);
        if (resProduct.data) setProducts(resProduct.data);
        if (resOrder.data) setOrders(resOrder.data);
      } catch (err) {
        console.log("Error to fetch data", err);
      }
    }
    fetchData();
  }, []);
  const totalRevenue = orders.reduce(
    (orderAcc, order) => orderAcc + parseFloat(order.total_price || 0),
    0,
  );
  const formattedTotalRevenue = totalRevenue.toFixed(2);

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${formattedTotalRevenue}`,
      growth: 12.5,
      icon: DollarSign,
      color: "from-indigo-500 to-indigo-600",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      title: "Total Orders",
      value: orders?.length.toLocaleString(),
      growth: 8.3,
      icon: ShoppingCart,
      color: "from-emerald-500 to-emerald-600",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      title: "Total Customers",
      value: users?.length.toLocaleString(),
      growth: 15.2,
      icon: Users,
      color: "from-amber-500 to-amber-600",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      title: "Total Products",
      value: products?.length.toLocaleString(),
      growth: 3.1,
      icon: Package,
      color: "from-rose-500 to-rose-600",
      bg: "bg-rose-50",
      text: "text-rose-600",
    },
  ];

  const recentOrders = orders.slice(0, 5);
  console.log("The recent orders are ", recentOrders);
  const topProducts = products.filter((p) => p.status === "active").slice(0, 5);
  const maxRevenue = Math.max(...monthlyRevenue.map((m) => m.revenue));

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.bg} p-3 rounded-xl`}>
                <card.icon size={22} className={card.text} />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-semibold ${
                  card.growth >= 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {card.growth >= 0 ? (
                  <TrendingUp size={14} />
                ) : (
                  <TrendingDown size={14} />
                )}
                {Math.abs(card.growth)}%
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-800">{card.value}</p>
            <p className="text-sm text-slate-500 mt-1">{card.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">
              Revenue Overview
            </h2>
            <span className="text-xs text-slate-400">Last 12 months</span>
          </div>
          <div className="flex items-end gap-2 h-48">
            {monthlyRevenue.map((item) => (
              <div
                key={item.month}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-[10px] text-slate-400 font-medium">
                  ${(item.revenue / 1000).toFixed(1)}k
                </span>
                <div
                  className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-lg transition-all duration-500 hover:from-indigo-600 hover:to-indigo-500 cursor-pointer min-h-[8px]"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 140}px`,
                  }}
                ></div>
                <span className="text-[10px] text-slate-500 font-medium">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-800 mb-4">
            Top Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product, idx) => (
              <div key={product.id} className="flex items-center gap-3 group">
                <span className="text-xs font-bold text-slate-300 w-5">
                  #{idx + 1}
                </span>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-700 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-400">{product.brand}</p>
                </div>
                <span className="text-sm font-bold text-slate-800">
                  ${product.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 pb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View All <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-slate-100">
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Order ID
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">
                  Customer
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
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentOrders?.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-3.5 text-sm font-semibold text-indigo-600">
                    {order.id}
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-700">
                    {order.name_on_bank}
                  </td>
                  <td className="px-6 py-3.5 text-sm font-medium text-slate-800">
                    ${parseFloat(order.total_price).toFixed(2)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                        statusColors[order.paid_status]
                      }`}
                    >
                      {order.paid_status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-sm text-slate-500">
                    {order.order_date.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

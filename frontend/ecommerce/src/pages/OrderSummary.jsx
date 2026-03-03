import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Request from "../api/Request.js";
import { useAuth } from "../context/AuthContext.jsx";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const state = location.state;

    if (state?.totals && state?.shippingAddress && state?.payment) {
      const {
        totals,
        shippingAddress,
        payment,
        order: orderFromState,
      } = state;

      setOrderData({
        orderId: orderFromState?.id,
        placedAt: orderFromState?.created_at || orderFromState?.createdAt,
        product: {
          name: "Your order",
          price: totals.total,
          description:
            "Thank you for your purchase. You will receive an email confirmation shortly.",
          image:
            "https://i.pinimg.com/1200x/45/c6/32/45c632d28ba2a471b0f4e107b09a1396.jpg",
        },
        shipping: {
          name: shippingAddress.country,
          address: shippingAddress.appartment,
          city: `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}`,
          email: "",
          phone: "",
        },
        payment: {
          type: payment.payment_method,
          last4: String(payment.accountNo || "").slice(-4),
          expiry: "",
          nameOnBank: payment.name_on_bank,
        },
        totals,
      });
    } else {
      // Fallback: load the latest order for this user from the database
      const fetchLastOrder = async () => {
        try {
          const res = await Request("orders").getAll();
          const allOrders = Array.isArray(res.data) ? res.data : [];
          const userOrders = allOrders.filter(
            (o) => o.user_id === user.id || o.userId === user.id,
          );
          const lastOrder =
            userOrders.length > 0
              ? userOrders[userOrders.length - 1]
              : null;

          if (lastOrder) {
            setOrderData({
              orderId: lastOrder.id,
              placedAt: lastOrder.created_at || lastOrder.createdAt,
              product: {
                name: "Your order",
                price: lastOrder.total_price,
                description:
                  "Thank you for your purchase. You will receive an email confirmation shortly.",
                image:
                  "https://i.pinimg.com/1200x/45/c6/32/45c632d28ba2a471b0f4e107b09a1396.jpg",
              },
              shipping: {
                name: lastOrder.country || "Customer",
                address: lastOrder.appartment || "",
                city:
                  `${lastOrder.city || ""} ${lastOrder.state || ""} ${
                    lastOrder.postal_code || ""
                  }`.trim(),
                email: lastOrder.email || "",
                phone: lastOrder.phone || "",
              },
              payment: {
                type: lastOrder.payment_method || "Card",
                last4: String(lastOrder.accountNo || "").slice(-4),
                expiry: "",
                nameOnBank: lastOrder.name_on_bank,
              },
              totals: {
                subtotal: lastOrder.subtotal || lastOrder.total_price || 0,
                shipping: lastOrder.shipping || 0,
                tax: lastOrder.tax || 0,
                total: lastOrder.total_price || 0,
              },
            });
          } else {
            setOrderData(null);
          }
        } catch (err) {
          console.error("Failed to load order summary", err);
          setOrderData(null);
        }
      };

      fetchLastOrder();
    }
  }, [location.state, navigate, user]);

  if (!orderData) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center space-y-3">
          <h1 className="text-xl font-semibold text-slate-900">
            No recent orders
          </h1>
          <p className="text-sm text-slate-500">
            We couldn&apos;t find any orders for your account. Please place an
            order to see the summary here.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
          >
            Continue shopping
          </button>
        </div>
      </div>
    );
  }

  const data = orderData;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen font-sans text-slate-700 ">
      <div className="m-4">
        <p className="text-indigo-600">Thank you!</p>
        <h1 className="text-2xl font-bold">It's on the way!</h1>
        {orderData?.orderId && (
          <p className="text-sm text-slate-500 mt-1">
            Order #{orderData.orderId}
          </p>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6 transition duration-300 transform hover:scale-102">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Product Info */}
            <div className="md:col-span-7 flex gap-6">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center p-4">
                <img
                  src={data.product.image}
                  alt="Watch"
                  className="mix-blend-multiply object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {data.product.name}
                </h2>
                <p className="text-md font-medium mt-1">
                  ${Number(data.product.price || 0).toFixed(2)}
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {data.product.description}
                </p>
              </div>
            </div>

            {/* Delivery & Contact */}
            <div className="md:col-span-3 text-sm">
              <h3 className="font-semibold text-slate-900 mb-2">
                Delivery address
              </h3>
              <p>{data.shipping.name}</p>
              <p>{data.shipping.address}</p>
              <p>{data.shipping.city}</p>
            </div>

            <div className="md:col-span-2 text-sm">
              <h3 className="font-semibold text-slate-900 mb-2">
                Shipping updates
              </h3>
              <p>{data.shipping.email || "We will email your receipt."}</p>
              <p>{data.shipping.phone || ""}</p>
            </div>
          </div>

          {/* Progress Bar Area */}
          <div className="mt-12">
            <p className="text-sm font-semibold text-slate-900 mb-4">
              {orderData.placedAt
                ? `Order placed on ${new Date(
                    orderData.placedAt,
                  ).toLocaleDateString()}`
                : "Order placed"}
            </p>
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                <div
                  style={{ width: "35%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                ></div>
              </div>
              <div className="flex justify-between text-xs font-medium text-slate-400">
                <div className="text-indigo-600">Order placed</div>
                <div>Processing</div>
                <div>Shipped</div>
                <div>Delivered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Billing & Totals */}
      <div className="bg-gray-100/50 rounded-lg p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Billing Info */}
          <div className="text-sm">
            <h3 className="font-semibold text-slate-900 mb-3">
              Billing address
            </h3>
            <p>{data.shipping.name}</p>
            <p>{data.shipping.address}</p>
            <p>{data.shipping.city}</p>
          </div>

          {/* Payment Info */}
          <div className="text-sm">
            <h3 className="font-semibold text-slate-900 mb-3">
              Payment information
            </h3>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold tracking-tighter">
                {data.payment.type || "CARD"}
              </div>
              <div>
                <p className="font-medium">
                  {data.payment.last4
                    ? `Ending with ${data.payment.last4}`
                    : "Payment method on file"}
                </p>
                <p className="text-slate-500">
                  {data.payment.nameOnBank || ""}
                </p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">
                ${Number(data.totals.subtotal || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className="font-medium">
                ${Number(data.totals.shipping || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax</span>
              <span className="font-medium">
                ${Number(data.totals.tax || 0).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="font-semibold text-slate-900">Order total</span>
              <span className="font-bold text-indigo-600 text-lg">
                ${Number(data.totals.total || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

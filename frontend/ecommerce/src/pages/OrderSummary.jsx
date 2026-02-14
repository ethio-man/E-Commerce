import React from "react";

const OrderSummary = () => {
  const orderData = {
    product: {
      name: "Minimalist Wristwatch",
      price: 149.0,
      description:
        "This contemporary wristwatch has a clean, minimalist look and high quality components.",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200&h=200",
    },
    shipping: {
      name: "Floyd Miles",
      address: "7363 Cynthia Pass",
      city: "Toronto, ON N3Y 4H8",
      email: "f••••@example.com",
      phone: "1••••••••40",
    },
    payment: {
      type: "VISA",
      last4: "4242",
      expiry: "02 / 24",
    },
    totals: {
      subtotal: 72.0,
      shipping: 5.0,
      tax: 6.16,
      total: 83.16,
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen font-sans text-slate-700 ">
      <div className="m-4">
        <p className="text-indigo-600">Thank you!</p>
        <h1 className="text-2xl font-bold">It's on the way!</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-6 transition duration-300 transform hover:scale-102">
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Product Info */}
            <div className="md:col-span-7 flex gap-6">
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center p-4">
                <img
                  src={orderData.product.image}
                  alt="Watch"
                  className="mix-blend-multiply object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  {orderData.product.name}
                </h2>
                <p className="text-md font-medium mt-1">
                  ${orderData.product.price.toFixed(2)}
                </p>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                  {orderData.product.description}
                </p>
              </div>
            </div>

            {/* Delivery & Contact */}
            <div className="md:col-span-3 text-sm">
              <h3 className="font-semibold text-slate-900 mb-2">
                Delivery address
              </h3>
              <p>{orderData.shipping.name}</p>
              <p>{orderData.shipping.address}</p>
              <p>{orderData.shipping.city}</p>
            </div>

            <div className="md:col-span-2 text-sm">
              <h3 className="font-semibold text-slate-900 mb-2">
                Shipping updates
              </h3>
              <p>{orderData.shipping.email}</p>
              <p>{orderData.shipping.phone}</p>
              <button className="text-indigo-600 font-medium mt-2 hover:text-indigo-800">
                Edit
              </button>
            </div>
          </div>

          {/* Progress Bar Area */}
          <div className="mt-12">
            <p className="text-sm font-semibold text-slate-900 mb-4">
              Shipped on March 23, 2021
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
            <p>{orderData.shipping.name}</p>
            <p>{orderData.shipping.address}</p>
            <p>{orderData.shipping.city}</p>
          </div>

          {/* Payment Info */}
          <div className="text-sm">
            <h3 className="font-semibold text-slate-900 mb-3">
              Payment information
            </h3>
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold tracking-tighter">
                VISA
              </div>
              <div>
                <p className="font-medium">
                  Ending with {orderData.payment.last4}
                </p>
                <p className="text-slate-500">
                  Expires {orderData.payment.expiry}
                </p>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Subtotal</span>
              <span className="font-medium">${orderData.totals.subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Shipping</span>
              <span className="font-medium">${orderData.totals.shipping}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Tax</span>
              <span className="font-medium">${orderData.totals.tax}</span>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-200">
              <span className="font-semibold text-slate-900">Order total</span>
              <span className="font-bold text-indigo-600 text-lg">
                ${orderData.totals.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

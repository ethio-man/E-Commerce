import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Request from "../api/Request.js";
export default function Checkout() {
  const { carts } = useAuth();
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const subtotal = carts.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;
  function ApplyOrder(order) {
    const { total_price, payment_method, user_id, address_id } = order;
    const order = {
      total_price,
      payment_method,
      user_id,
      address_id,
    };
    try {
    } catch (err) {}
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        {/* LEFT: FORM */}
        <div>
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>

          {/* Contact */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Contact information</h2>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          {/* Payment */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Payment details</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Name on card"
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                type="text"
                placeholder="Card number"
                className="w-full border rounded-md px-3 py-2"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="col-span-2 border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="CVC"
                  className="border rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Shipping address</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Company"
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Address"
                className="w-full border rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc."
                className="w-full border rounded-md px-3 py-2"
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  className="border rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="border rounded-md px-3 py-2"
                />
              </div>
            </div>
          </div>

          {/* Billing */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Billing information</h2>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={() => setSameAsShipping(!sameAsShipping)}
              />
              Same as shipping information
            </label>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500">
              You won’t be charged until the next step.
            </p>

            <button
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              onClick={() => ApplyOrder()}
            >
              Continue
            </button>
          </div>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-lg font-semibold mb-6">Order summary</h2>

          <div className="space-y-5">
            {carts.map((p) => (
              <div key={p.id} className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <img
                    src={p.src}
                    alt={p.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">
                      {p.colors} • {p.sizes}
                    </p>
                  </div>
                </div>
                <p className="font-medium">${p.price}</p>
              </div>
            ))}
          </div>

          <hr className="my-6" />

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Taxes</span>
              <span>${tax.toFixed(2)}</span>
            </div>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Request from "../api/Request.js";
export default function ShoppingCart() {
  const { user } = useAuth();
  console.log("user", user);
  const carts = Request("carts/userCart").getOne(user.id);
  console.log("carts", carts);
  let products;
  carts.map((c) => {
    const product = Request("products").get(c.product_id);
    products.push(product);
  });
  const [items, setItems] = useState([products]);

  const updateQty = (id, qty) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, qty: Number(qty) } : item,
      ),
    );
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="lg:col-span-2 divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 items-start border-b pb-6"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-500">
                    {item.color} {item.size && `• ${item.size}`}
                  </p>
                  <p className="text-sm font-medium mt-1">${item.price}</p>

                  {item.inStock ? (
                    <p className="text-green-600 text-sm mt-2">✔ In stock</p>
                  ) : (
                    <p className="text-gray-400 text-sm mt-2">
                      Ships in 3–4 weeks
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 ">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="p-2 border border-gray-300 rounded-full hover:text-red-600 disabled:opacity-50"
                    disabled={item.qty <= 1}
                  >
                    <svg
                      className="w-4 h-4 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 12H4"
                      ></path>
                    </svg>
                  </button>
                  <span className="text-sm font-medium w-6 text-center">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="p-2 border border-gray-300 rounded-full hover:text-green-600"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </svg>
                  </button>

                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 border border-gray-300 rounded-full hover:bg-red-100"
                  >
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {items.length === 0 && (
              <div className="text-center text-gray-500 py-10">
                Your cart is empty.
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h2 className="font-semibold mb-4">Order summary</h2>

            <div className="flex justify-between text-sm mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-2">
              <span>Shipping estimate</span>
              <span>${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm mb-4">
              <span>Tax estimate</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Order total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <Link to="/orders">
              <button className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

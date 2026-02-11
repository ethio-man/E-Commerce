import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Request from "../api/Request.js";
export default function Checkout() {
  const { user, carts } = useAuth();
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const subtotal = carts.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 5 : 0;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  const [bank, setBank] = useState("");
  const [name, setName] = useState("");
  const [accountNo, setAccountNo] = useState();

  const [Country, setCountry] = useState("");
  const [appartment, setAppartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postal_code, setPostalCode] = useState();
  const [address_id, setAddress] = useState(null);

  async function ApplyOrder() {
    const total_price = total;
    const payment_method = [bank, name, accountNo];
    const user_id = user.id;
    const country = [Country, state, appartment];
    //creating  address
    try {
      const address = await Request("address").create({
        user_id,
        country,
        city,
        postal_code,
      });
      if (!address) return console.error("Error to create shipping address.");
      setAddress(address.id);
    } catch (err) {
      console.log("Server Error to create address", err);
    }
    //submitting order
    try {
      const res = await Request("orders").create({
        total_price,
        payment_method,
        user_id,
        address_id,
      });
      if (res) console.log("Order submitted!");
    } catch (err) {
      console.error("Order is not submittd please try again.", err);
    }
  }
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        {/* LEFT: FORM */}
        <form onSubmit={() => ApplyOrder()}>
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
            <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

            <div className="space-y-4">
              <select
                type="text"
                className="w-full border rounded-md px-3 py-2 bg-slate-400"
                onChange={(e) => setBank(e.target.value)}
              >
                <option> Commercial bank of Ethiopia (CBE) </option>
                <option> Bank of Abissinia </option>
                <option> Dashin Bank </option>
              </select>
              <input
                type="text"
                placeholder="Name on the bank account"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
                placeholder="Account number"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) => setAccountNo(e.target.value)}
              />
            </div>
          </div>

          {/* Shipping */}
          <div className="mb-10">
            <h2 className="text-lg font-semibold mb-4">Shipping address</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Country"
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Apartment, suite, etc."
                className="w-full border rounded-md px-3 py-2"
                onChange={(e) => setAppartment(e.target.value)}
              />

              <div className="grid grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="City"
                  className="border rounded-md px-3 py-2"
                  onChange={(e) => setCity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="State / Province"
                  className="border rounded-md px-3 py-2"
                  onChange={(e) => setState(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Postal code"
                  className="border rounded-md px-3 py-2"
                  onChange={(e) => setPostalCode(e.target.value)}
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
              type="submit"
            >
              Continue
            </button>
          </div>
        </form>

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

import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Request from "../api/Request.js";
export default function ProductOverview() {
  const { user } = useAuth();
  const colorClassMap = {
    Red: "bg-red-400 checked:outline-red-400",
    Blue: "bg-blue-400 checked:outline-blue-400",
    Green: "bg-green-400 checked:outline-green-400",
    Black: "bg-black checked:outline-black",
    white: "bg-white checked:outline-gray-400",
    Yellow: "bg-yellow-400 checked:outline-yellow-400",
    Gray: "bg-gray-400 checked:outline-gray-400",
    Silver: "bg-zinc-300 checked:outline-zinc-300",
  };

  const { state } = useLocation();
  const product = state?.product;
  console.log("product", product);
  async function AddToCart(product_id) {
    try {
      const quantity = 1;
      const user_id = user.id;
      console.log(
        `user: ${user_id},product: ${product_id},quantity: ${quantity}`,
      );
      const res = await Request("carts").create({
        user_id,
        product_id,
        quantity,
      });
      if (res) alert("Added Successfully!");
    } catch (err) {
      console.log("Error to creare cart", err);
      alert("Item not added to cart!please try again.");
    }
  }
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <img
              src={product?.src}
              alt={product?.name}
              className="w-full max-w-md rounded-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product?.name}
            </h1>

            <p className="mt-4 text-3xl tracking-tight text-gray-900">
              {product?.price}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    aria-hidden="true"
                    className={`h-5 w-5
                     ${
                       product?.reviewSum / product?.reviewCount > rating
                         ? "text-amber-400"
                         : "text-gray-200"
                     }
                       `}
                  />
                ))}
              </div>
              <a
                href="#"
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {product?.reviewTotalCount} reviews
              </a>
            </div>
            <p className="mt-6 text-gray-700">{product?.description}</p>

            <form className="mt-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-4 flex gap-3">
                  {product.colors.map((color, k) => (
                    <input
                      key={k}
                      type="radio"
                      name="color"
                      defaultChecked={color === product.colors[0]}
                      className={`
        h-6 w-6 cursor-pointer appearance-none rounded-full
        outline outline-2 outline-transparent
        checked:outline-2
        ${colorClassMap[color] || ""}
      `}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
                <div className="mt-4 grid grid-cols-4 gap-3">
                  {product.sizes.map((size, index) => (
                    <label
                      key={index}
                      className="flex items-center justify-center rounded-md border border-gray-300 p-2 text-sm font-medium text-gray-900 cursor-pointer hover:text-blue-400 "
                    >
                      <input type="radio" name="size" className="sr-only" />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="button"
                className="mt-8 w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
                onClick={() => AddToCart(product.id)}
              >
                Add to cart
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

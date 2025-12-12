import { Star } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Example() {
  const { state } = useLocation();
  const product = state?.product;
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
                       product?.reviewSum / product?.reviewTotalCount > rating
                         ? "text-gray-900"
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
                      className={`bg-${color}-400 checked:outline-${color}-400`}
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
                      className="flex items-center justify-center rounded-md border border-gray-300 p-2 text-sm font-medium text-gray-900"
                    >
                      <input type="radio" name="size" className="sr-only" />
                      {size}
                    </label>
                  ))}
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 w-full rounded-md bg-indigo-600 px-6 py-3 text-white font-medium hover:bg-indigo-700"
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

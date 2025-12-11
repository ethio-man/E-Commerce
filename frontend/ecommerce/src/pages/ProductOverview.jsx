import { Star } from "lucide-react";
// Resive an id from the component calling this page and use that id to fech the data from database
const product = {
  name: "iPhone 15 pro",
  price: "$192",
  href: "#",
  image: {
    src: "https://tse1.mm.bing.net/th/id/OIP.VCsEv3jNRlAGQt1qXF80BwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Model wearing plain white basic tee.",
  },
  colors: [
    {
      id: "white",
      name: "White",
      classes: "bg-white checked:outline-gray-400",
    },
    {
      id: "Silver",
      name: "Silver",
      classes: "bg-gray-400 checked:outline-gray-400",
    },
    {
      id: "black",
      name: "Black",
      classes: "bg-gray-900 checked:outline-gray-900",
    },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    "The iPhone 15 Pro features a lightweight titanium design, advanced camera capabilities, and the powerful A17 Pro chip, making it Apple's most innovative smartphone to date.",
};

const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <img
              src={product.image.src}
              alt={product.image.alt}
              className="w-full max-w-md rounded-lg object-cover"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <p className="mt-4 text-3xl tracking-tight text-gray-900">
              {product.price}
            </p>
            <div className="mt-4 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    aria-hidden="true"
                    className={classNames(
                      reviews.average > rating
                        ? "text-gray-900"
                        : "text-gray-200",
                      "h-5 w-5"
                    )}
                  />
                ))}
              </div>
              <a
                href={reviews.href}
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>
            <p className="mt-6 text-gray-700">{product.description}</p>

            <form className="mt-8">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <div className="mt-4 flex gap-3">
                  {product.colors.map((color) => (
                    <input
                      key={color.id}
                      type="radio"
                      name="color"
                      defaultChecked={color === product.colors[0]}
                      className={classNames(
                        color.classes,
                        "h-8 w-8 appearance-none rounded-full border"
                      )}
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
                      <input
                        type="radio"
                        name="size"
                        disabled={!size.inStock}
                        className="sr-only"
                      />
                      {size.name}
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

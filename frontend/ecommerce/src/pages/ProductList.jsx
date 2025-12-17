import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Request from "../api/Request.js";
import { useEffect, useState } from "react";

export default function ProductList() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await Request("products").getAll();
        if (res) setProducts(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }, []);
  const filterdProduct = products.filter((p) => p.category === category);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filterdProduct.map((product, k) => (
            <div
              key={k}
              className="group relative"
              onClick={() =>
                navigate("/productOverview", { state: { product } })
              }
            >
              <img
                src={product.src}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

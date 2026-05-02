import { Link } from "react-router-dom";
import FrontProduct from "../components/FrontProduct.jsx";

export default function ({ collection }) {
  return (
    <div className="bg-white mx-3 my-4 p-4 sm:p-6 rounded-lg border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        {collection.name}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6">
        {collection.categories?.map((c, k) => (
          <FrontProduct key={k} category={c} />
        ))}
      </div>
    </div>
  );
}

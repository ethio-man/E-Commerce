import { Link } from "react-router-dom";
import FrontProduct from "../components/FrontProduct.jsx";
export default function ({ collection }) {
  return (
    <div className="bg-white mx-3 my-4 w-full  p-2 ">
      <h1 className="text-xl font-semibold text-gray-900 mb-2">
        {collection.item}
      </h1>
      <div className="flex">
        {collection.categorys.map((p, k) => (
          <FrontProduct key={k} product={p} />
        ))}
      </div>
    </div>
  );
}

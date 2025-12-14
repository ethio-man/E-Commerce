import { Link } from "react-router-dom";
export default function ({ product }) {
  return (
    <Link
      to={product.path}
      className="flex flex-col w-32 mx-4 text-center hover:translate-y-[-8px] "
    >
      <img src={product.url} className="w-full h-full" />

      <p className="text-gray-600 ">{product.name}</p>
      <h2>${product.price}</h2>
    </Link>
  );
}

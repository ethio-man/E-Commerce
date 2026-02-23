import { Link } from "react-router-dom";
export default function ({ category }) {
  return (
    <Link
      to={category.path}
      className="flex flex-col w-32 mx-4 text-center hover:translate-y-[-8px] "
    >
      <img src={category.url} className="w-full h-full" />

      <p className="text-gray-600 ">{category.name}</p>
    </Link>
  );
}

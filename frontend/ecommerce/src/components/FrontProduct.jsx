import { Link } from "react-router-dom";
export default function ({ category }) {
  return (
    <Link
      to={category.path}
      className="flex flex-col w-full text-center transition-transform hover:-translate-y-2 group"
    >
      <div className="w-full aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3 border border-gray-100/50">
        <img 
          src={category.url} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300 p-2" 
        />
      </div>
      <p className="text-sm sm:text-base font-medium text-gray-700 line-clamp-2">{category.name}</p>
    </Link>
  );
}

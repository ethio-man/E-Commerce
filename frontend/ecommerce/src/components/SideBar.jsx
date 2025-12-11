import { Link } from "react-router-dom";
import {
  Home,
  ShoppingBag,
  Heart,
  Settings,
  UserPlus,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "", path: "/", active: false },
    { icon: ShoppingBag, label: "", path: "/orders", active: false },
    { icon: Heart, label: "", path: "/", active: false },
    { icon: Settings, label: "", path: "/setting", active: false },
  ];

  return (
    <div className="w-16 bg-gray-200 border-r border-gray-100 p-2 flex flex-col justify-between h-auto">
      <div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              to={`${item.path}`}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                item.active
                  ? "bg-blue-50 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="" size={20} />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Link
            to="/login"
            className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer p-1 transition duration-150"
          >
            <UserPlus size={20} className="mr-3" />
          </Link>
          <div className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer p-1 transition duration-150">
            <LogOut size={20} className="mr-3" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

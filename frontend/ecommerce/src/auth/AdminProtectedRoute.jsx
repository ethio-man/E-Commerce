import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext.jsx";

const AdminProtectedRoute = () => {
  const { user, token } = useAdminAuth();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin
  if (user.role !== "admin" && user.role !== "super_admin") {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return <Outlet />;
};

export default AdminProtectedRoute;

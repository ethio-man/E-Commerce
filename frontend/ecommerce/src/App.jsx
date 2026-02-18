import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductOverview from "./pages/ProductOverview.jsx";
import Cart from "./pages/Cart.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Login from "./pages/Login.jsx";
import AddProduct from "./pages/admin/AddProduct.jsx";
import OrderSummary from "./pages/OrderSummary.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AdminProducts from "./pages/admin/AdminProducts.jsx";
import AdminOrders from "./pages/admin/AdminOrders.jsx";
import AdminCustomers from "./pages/admin/AdminCustomers.jsx";
import AdminReviews from "./pages/admin/AdminReviews.jsx";
import AdminPayments from "./pages/admin/AdminPayments.jsx";
import AdminAdministration from "./pages/admin/AdminAdministration.jsx";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Customer-facing routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/productList/:category" element={<ProductList />} />
        <Route path="/productOverview" element={<ProductOverview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/addProducts" element={<AddProduct />} />
        <Route path="/orderSummary" element={<OrderSummary />} />

        {/* Admin panel routes */}
        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminLayout />
            </AdminAuthProvider>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products/manage" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="administration" element={<AdminAdministration />} />
        </Route>
      </Routes>
    </Router>
  );
}

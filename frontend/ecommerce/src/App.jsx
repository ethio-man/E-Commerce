import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing.jsx";
import ProductList from "./pages/ProductList.jsx";
import ProductOverview from "./pages/ProductOverview.jsx";
import Cart from "./pages/Cart.jsx";
import CheckOut from "./pages/CheckOut.jsx";
import Login from "./pages/Login.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import "./App.css";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/productList/:category" element={<ProductList />} />
        <Route path="/productOverview" element={<ProductOverview />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<CheckOut />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/products" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}
//will be updated to productOverview/:id
// will be updated to /cart/:id
//will be updated to /orders/:id

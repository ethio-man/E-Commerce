import { useState, createContext, useContext } from "react";
import Request from "../api/Request.js";
const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [error, setError] = useState("");

  const adminLogin = async (username, password) => {
    try {
      const res = await Request("superAdmins").create({ username, password });
      if (res.data.isSuperAdmin === true) {
        setIsSuperAdmin(true);
        setError("");
        return true;
      } else {
        setError(
          "Invalid credentials. Only the super admin can access this page.",
        );
      }
      return false;
    } catch (err) {
      console.log("Error to login please try again");
    }
  };

  const adminLogout = () => {
    setIsSuperAdmin(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{ isSuperAdmin, adminLogin, adminLogout, error }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

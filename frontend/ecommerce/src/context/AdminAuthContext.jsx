import { useState, createContext, useContext } from "react";
import { SUPER_ADMIN_CREDENTIALS } from "../data/adminMockData.js";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [isSuperAdmin, setIsSuperAdmin] = useState(false);
    const [error, setError] = useState("");

    const adminLogin = (username, password) => {
        if (
            username === SUPER_ADMIN_CREDENTIALS.username &&
            password === SUPER_ADMIN_CREDENTIALS.password
        ) {
            setIsSuperAdmin(true);
            setError("");
            return true;
        }
        setError("Invalid credentials. Only the super admin can access this page.");
        return false;
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

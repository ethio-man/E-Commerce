import { useState, useEffect, createContext, useContext } from "react";
import Request from "../api/Request.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(Json.parse(storedUser));
    }
  }, []);

  const login = async ({ user, token }) => {
    console.log("userrr:", user, "token:", token);
    setUser(user);
    setToken(token);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  };

  const logOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };
  return (
    <AuthContext.Provider value={{ user, token, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

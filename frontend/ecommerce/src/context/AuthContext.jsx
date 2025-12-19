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
  const login = async ({ email, password }) => {
    const res = await Request("login").post({ email, password });
    const { user, token } = res;
    if (!user) throw new Error("Invalid credentials.");
    setUser(user);
    setToken(token);
    localStorage.setItem("user", user);
    localStorage.setItem("token", token);
  };
};

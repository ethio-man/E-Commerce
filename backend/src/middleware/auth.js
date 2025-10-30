import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function authUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("No token is provided");
  try {
    jwt.verify(token, process.env.JWT_SECRET_KEY);
    next();
  } catch (err) {
    res.status(400).json("Invalid token.", err);
  }
}

export function authAdmin(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("No token is provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    decoded.role === "admin" && next();
  } catch (err) {
    res.status(403).json("Forbidden.", err);
  }
}

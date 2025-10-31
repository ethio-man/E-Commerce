import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export function authUser(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("No token is provided");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decoded);
    if (decoded.id === parseInt(req.params.id) || decoded.role === "admin") {
      next();
    } else {
      res.status(403).json("Not authorized to make change in this case.");
    }
  } catch (err) {
    res.status(400).json("Invalid token.", err);
  }
}

export function authAdmin(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("No token is provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role === "admin") next();
    else {
      return res.status(403).json("unAuthorized");
    }
  } catch (err) {
    res.status(403).json("Forbidden.", err);
  }
}

export function authSuperAdmin(req, res, next) {
  const { username, password } = req.body;
  const superAdmin = JSON.parse(process.env.SUPER_ADMIN);
  console.log(username, password, superAdmin);
  if (username === superAdmin.username && password === superAdmin.password) {
    next();
  } else {
    res.status(403).json("Unauthorized.");
  }
}

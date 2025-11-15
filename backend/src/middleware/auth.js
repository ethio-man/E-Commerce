import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import prisma from "../startup/db.js";
dotenv.config();
export const auth = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("No token is provided");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json("Invalid token.", err);
  }
};
export const verifyOwnership = (model, ownerId) => async (req, res, next) => {
  const { id } = req.params;
  try {
    const resource = await prisma[model].findUnique({
      where: { id: parseInt(id) },
    });
    if (!resource) return res.status(404).json(`${model} not found.`);
    if ((req.user.role = "admin")) {
      req.resource = resource;
      return next();
    }
    if (resource[ownerId] != req.params.id)
      return res.status(403).json({ message: "Unauthorized access!" });
    req.resource = resource;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Server error.` });
  }
};
export function authSuperAdmin(req, res, next) {
  const { username, password } = req.body;
  const superAdmin = JSON.parse(process.env.SUPER_ADMIN);
  if (username === superAdmin.username && password === superAdmin.password) {
    next();
  } else {
    res.status(403).json("Unauthorized.");
  }
}

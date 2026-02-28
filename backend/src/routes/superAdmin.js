import express from "express";
import _ from "lodash";
import { prisma } from "../startup/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { superAdminSchema } from "../validations/superAdminValidate.js";
import validate from "../middleware/validate.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
import generateAuthToken from "../utils/authGenerate.js";
dotenv.config();
//super admin login
const route = express.Router();
route.post("/", validate(superAdminSchema), async (req, res) => {
  const { username, password } = req.body;
  const superAdmin = JSON.parse(process.env.SUPER_ADMIN);
  if (username === superAdmin.username && password === superAdmin.password) {
    const token = generateAuthToken({
      username: superAdmin.username,
      password: superAdmin.password,
      isSuperAdmin: true,
    });
    res.header("auth-token", token).json({ isSuperAdmin: true });
  } else {
    res.json(
      "Invalid credentials. Only the super admin can access this page..",
    );
  }
});

//create admin
route.post("/admin", auth, async (req, res) => {
  if (req.user.isSuperAdmin === false)
    return res.status(403).json("Unauthorized access");
  const { full_name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (user) {
      const admin = await prisma.users.update({
        where: { id: user.id },
        data: { full_name, role, password: hashedPassword },
      });
      res.status(200).json(admin);
    } else {
      const admin = await prisma.users.create({
        data: { full_name, email, role, password: hashedPassword },
      });
      res.status(200).json(admin);
    }
  } catch (err) {
    console.log("Error to create admin please try again", err);
    res.status(500).json({ message: "Error to create admin." });
  }
});

export default route;

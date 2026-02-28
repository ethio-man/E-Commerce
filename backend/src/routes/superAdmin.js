import express from "express";
import _ from "lodash";
import { prisma } from "../startup/db.js";
import bcrypt from "bcrypt";
import { userSchema } from "../validations/userValidator.js";
import validate from "../middleware/validate.js";
import { auth, verifyOwnership, authSuperAdmin } from "../middleware/auth.js";
import generateAuthToken from "../utils/authGenerate.js";

//super admin login
const route = express.Router();
route.post("/", authSuperAdmin, async (req, res) => {
  res.json({ isSuperAdmin: true });
});

//create admin
route.post("/admin", authSuperAdmin, async (req, res) => {
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

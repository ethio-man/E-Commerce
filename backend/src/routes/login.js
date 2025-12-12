import express from "express";
import bcrypt from "bcrypt";
import { prisma } from "../startup/db.js";
import generateAuthToken from "../utils/authGenerate.js";
import validate from "../middleware/validate.js";
import { userSchema } from "../validations/userValidator.js";
const route = express.Router();

route.post("/", validate(userSchema), async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.users.findUnique({
      where: { email },
    });
    if (!user) res.status(400).json("Invalid email or password.");
    const checkedPassword = bcrypt.compare(password, user.password);
    if (!checkedPassword)
      return res.status(400).json("Invalid email or password.");

    const token = generateAuthToken(user);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error." });
  }
});
export default route;

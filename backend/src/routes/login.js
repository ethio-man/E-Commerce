import express from "express";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { prisma } from "../startup/db.js";
import generateAuthToken from "../utils/authGenerate.js";
import validate from "../middleware/validate.js";
import { userSchema } from "../validations/userValidator.js";
const route = express.Router();

route.post("/", validate(userSchema), async (req, res) => {
  const { email, password, idToken } = req.body;
  // if (idToken)   // to be complated
  try {
    if (idToken) {
      const user = await prisma.users.findUnique({
        where: { email, idToken },
      });
      if (!user) return res.status(400).json("Invalid credential.");
    } else {
      const user = await prisma.users.findUnique({
        where: { email, password },
      });
      if (!user) return res.status(400).json("Invalid credential.");
      const checkedPassword = bcrypt.compare(password, user.password);
      if (!checkedPassword)
        return res.status(400).json("Invalid email or password.");
    }

    const token = generateAuthToken(user);
    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error." });
  }
});
export default route;

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
    if (!user) return res.status(400).json("Invalid credential.");
    const checkedPassword = await bcrypt.compare(password, user.password);
    if (!checkedPassword)
      return res.status(400).json("Invalid email or password.");
    const token = generateAuthToken(user);
    res.json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error." });
  }
});

route.post("/google", async (req, res) => {
  const { google_id, email, full_name } = req.body;

  if (!google_id) {
    return res.status(400).json("google_id is required.");
  }

  try {
    let user = await prisma.users.findUnique({
      where: { google_id },
    });

    // Link existing email accounts to Google on first Google sign-in.
    if (!user && email) {
      const existingUser = await prisma.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        user = await prisma.users.update({
          where: { id: existingUser.id },
          data: {
            google_id,
            authProvider: "google",
          },
        });
      }
    }

    // If no account exists yet, create one from Google profile data.
    if (!user && email) {
      user = await prisma.users.create({
        data: {
          full_name: full_name || email.split("@")[0],
          email,
          google_id,
          authProvider: "google",
        },
      });
    }

    if (!user) {
      return res
        .status(400)
        .json("Invalid credential. Please sign up with Google first.");
    }

    const token = generateAuthToken(user);
    res.json({ user, token });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server Error!" });
  }
});
export default route;

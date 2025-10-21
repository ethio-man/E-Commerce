import express from "express";
import { prisma } from "../startup/db.js";
import { userSchema } from "../validations/userValidator.js";
import validate from "../middleware/validate.js";
const route = express.Router();

route.post("/", validate(userSchema), async (req, res) => {
  const { full_name, email, password } = req.body;
  try {
    const user = await prisma.users.create({
      data: { full_name, email, password },
    });
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Error creating user" });
  }
});
route.put("/:id", validate(userSchema), async (req, res) => {
  const { id } = req.params;
  const { full_name, email, password } = req.body;
  try {
    const user = await prisma.users.update({
      where: { id: parseInt(id) },
      data: { full_name, email, password },
    });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error to update user" });
  }
});
route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "User deleted successfully", user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error to delete user" });
  }
});
route.get("/", async (req, res) => {
  try {
    const Users = await prisma.users.findMany();
    res.status(200).json(Users);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error to find users" });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.users.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Error to find a user" });
  }
});
export default route;

import express from "express";
import { prisma } from "../startup/db.js";
import { auth } from "../middleware/auth.js";
const route = express.Router();

route.get("/category", async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) res.status(404).json("Error to find categories");
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error to find categories");
  }
});
route.get("/category/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) res.status(404).json("Error to find a category");
    res.json(category);
  } catch (err) {
    conosle.error(err);
    res.status(500).json({ message: "Error to find categories" });
  }
});
route.post("/", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access!");
  const { name, url, label, price, path, collectionId } = req.body;
  try {
    const category = await prisma.category.create({
      data: { name, url, label, price, path, collectionId },
    });
    if (!category) res.status(404).json("Error to create a category");
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to create a category" });
  }
});
route.put("/:id", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access!");
  const { id } = req.params;
  const { name, url, label, price, path, collectionId } = req.body;
  try {
    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name, url, label, price, path, collectionId },
    });
    if (!category) res.status(404).json("Error to update a category.");
    res.json(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to update a category" });
  }
});
res.delete("/:id", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access!");
  try {
  } catch {}
});
export default route;

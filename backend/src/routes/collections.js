import express from "express";
import { prisma } from "../startup/db.js";
import { auth } from "../middleware/auth.js";
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    const collections = await prisma.Collection.findMany({
      include: { categories: true },
    });
    if (!collections) res.status(404).json("Error to find collections");
    res.json(collections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error to find collections" });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const collection = await prisma.Collection.findUnique({
      where: { id: parseInt(id) },
    });
    if (!collection) return res.status(404).json("Error to find collection.");
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to find a  collection" });
  }
});

route.put("/:id", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access!");

  const { id } = req.params;
  const { name } = req.body;
  try {
    const collection = await prisma.Collection.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    if (!collection) res.status(404).json("Error to update a collection");
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to update a collection." });
  }
});
route.post("/", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access!");

  const { name } = req.body;
  try {
    const collection = await prisma.Collection.create({
      data: { name },
    });
    if (!collection) res.status(404).json("Error to create a collection");
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to create a collection" });
  }
});
route.delete("/:id", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access!");

  const { id } = req.params;
  try {
    const collection = await prisma.Collection.delete({
      where: { id: parseInt(id) },
    });
    if (!collection) res.status(404).json("Error to remove a collection");
    res.json(collection);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to remove a collection" });
  }
});

export default route;

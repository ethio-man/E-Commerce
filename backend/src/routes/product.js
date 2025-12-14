import express from "express";
import { prisma } from "../startup/db.js";
import { productSchema } from "../validations/productValidator.js";
import validate from "../middleware/validate.js";
import { auth } from "../middleware/auth.js";
const route = express.Router();
route.get("/", async (req, res) => {
  try {
    const product = await prisma.products.findMany();
    if (!product) return res.status(404).json({ error: "Products not found " });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find products" });
  }
});
route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) return res.status(404).json({ error: "Product not found " });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find product" });
  }
});
//auth
route.post("/", [validate(productSchema)], async (req, res) => {
  //if (req.user.role != "admin")
  // return res.status(403).json("Unauthorized access!");
  const {
    name,
    src,
    description,
    brand,
    category,
    number_in_stock,
    colors,
    sizes,
    price,
    shipping,
    tax,
    reviewCount,
    reviewSum,
  } = req.body;

  try {
    const product = await prisma.products.create({
      data: {
        name,
        src,
        description,
        brand,
        category,
        number_in_stock,
        colors,
        sizes,
        price,
        shipping,
        tax,
        reviewCount,
        reviewSum,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error to create product" });
  }
});
//auth
route.put("/:id", [validate(productSchema)], async (req, res) => {
  //if (req.user.role != "admin")
  // return res.status(403).json("Unauthorized access");
  const { id } = req.params;
  const {
    name,
    src,
    description,
    brand,
    category,
    number_in_stock,
    colors,
    sizes,
    price,
    shipping,
    tax,
    reviewCount,
    reviewSum,
  } = req.body;
  try {
    const product = await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        name,
        src,
        description,
        brand,
        category,
        number_in_stock,
        colors,
        sizes,
        price,
        shipping,
        tax,
        reviewCount,
        reviewSum,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error to update an product" });
  }
});
route.delete("/:id", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access");
  const { id } = req.params;
  try {
    const product = await prisma.products.delete({
      where: { id: parseInt(id) },
    });
    res.json(product);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to delete product" });
  }
});

export default route;

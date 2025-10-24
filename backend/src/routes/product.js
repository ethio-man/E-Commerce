import express from "express";
import { prisma } from "../startup/db.js";
import { productSchema } from "../validations/productValidator.js";
import validate from "../middleware/validate.js";
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

route.post("/", validate(productSchema), async (req, res) => {
  const {
    product_name,
    description,
    brand,
    category,
    number_in_stock,
    price,
    shipping,
    tax,
    rating,
  } = req.body;
  try {
    const product = await prisma.products.create({
      data: {
        product_name,
        description,
        brand,
        category,
        number_in_stock,
        price,
        shipping,
        tax,
        rating,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error to create product" });
  }
});
route.put("/:id", validate(productSchema), async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    description,
    brand,
    category,
    number_in_stock,
    price,
    shipping,
    tax,
    rating,
  } = req.body;
  try {
    const product = await prisma.products.update({
      where: { id: parseInt(id) },
      data: {
        product_name,
        description,
        brand,
        category,
        number_in_stock,
        price,
        shipping,
        tax,
        rating,
      },
    });
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error to update an product" });
  }
});
route.delete("/:id", async (req, res) => {
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

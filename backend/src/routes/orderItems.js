import express from "express";
import { prisma } from "../startup/db.js";
import validate from "../middleware/validate.js";
import { itemsValidator } from "../validations/itemValidator.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
const route = express.Router();
route.get("/", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access");
  try {
    const items = await prisma.order_items.findMany();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find order items." });
  }
});
route.get("/:id", [auth, verifyOwnership("order_items")], async (req, res) => {
  const { id } = req.params;
  try {
    const item = await prisma.order_items.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find an order item" });
  }
});
route.post("/", auth, validate(itemsValidator), async (req, res) => {
  const { amount, orderId, productId } = req.body;
  try {
    const item = await prisma.order_items.create({
      data: {
        orders: { connect: { id: parseInt(orderId) } },
        products: { connect: { id: parseInt(productId) } },
        amount,
      },
    });
    res.json(item);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to create order item" });
  }
});
route.put(
  "/:id",
  [auth, verifyOwnership("order_items"), validate(itemsValidator)],
  async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
      const item = await prisma.order_items.update({
        where: { id: parseInt(id) },
        data: { amount },
      });
      res.json(item);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "Error to update order item" });
    }
  }
);
route.delete(
  "/:id",
  [auth, verifyOwnership("order_items")],
  async (req, res) => {
    const { id } = req.params;
    try {
      const item = await prisma.order_items.delete({
        where: { id: parseInt(id) },
      });
      res.json(item);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "Error to remove order item." });
    }
  }
);
export default route;

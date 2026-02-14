import express from "express";
import { prisma } from "../startup/db.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
const route = express.Router();
route.get("/", async (req, res) => {
  try {
    const order = await prisma.orders.findMany();
    if (!order) return res.json("No order found");
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find orders" });
  }
});
route.get("/:id", [auth, verifyOwnership("orders")], async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to get order" });
  }
});
route.post("/", auth, async (req, res) => {
  const { total_price, payment_method, user_id, address_id } = req.body;
  const delivery_date = new Date();
  delivery_date.setDate(delivery_date.getDate() + 7);
  try {
    const order = await prisma.orders.create({
      data: {
        delivery_date,
        total_price,
        payment_method,
        users: { connect: { id: user_id } },
        address: { connect: { id: address_id } },
      },
    });
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to make order" });
  }
});
route.put("/:id", [auth, verifyOwnership("orders")], async (req, res) => {
  const { id } = req.params;
  const { total_price, payment_method, address_id } = req.body;
  try {
    const order = await prisma.orders.update({
      where: { id: paresInt(id) },
      data: { total_price, payment_method, address_id },
    });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to update order" });
  }
});
route.post("/status/:id", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access");
  const { id } = req.params;
  try {
    const order = await prisma.orders.update({
      where: { id: parseInt(id) },
      data: { paid_status: true },
    });
    if (!order) return res.status(404).json("Error to find order.");
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error to confirm paid status" });
  }
});
route.delete("/:id", [auth, verifyOwnership("orders")], async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "order is removed", order });
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to remove order" });
  }
});
export default route;

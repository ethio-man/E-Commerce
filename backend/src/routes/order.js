import express from "express";
import { prisma } from "../startup/db.js";
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
route.get("/:id", async (req, res) => {
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
route.post("/", async (req, res) => {
  const { delivery_date, total_price, payment_method, user_id, address_id } =
    req.body;
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
route.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { total_price, payment_method, paid_status, address_id } = req.body;
  try {
    const order = await prisma.orders.update({
      where: { id: paresInt(id) },
      data: { total_price, payment_method, paid_status, address_id },
    });
    res.json(order);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to update order" });
  }
});
route.delete("/:id", async (req, res) => {
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

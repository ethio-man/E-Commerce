import express from "express";
import prisma from "../startup/db.js";
import validate from "../middleware/validate.js";
import { cartSchema } from "../validations/cartValidation.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
const route = express.Route();
route.get("/", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access");
  try {
    const carts = await prisma.carts.findMany();
    if (!carts) return res.status(404).json("cart is not found");
    res.json(carts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR TO FIND CART" });
  }
});
route.get("/id", [auth, verifyOwnership("carts")], async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await prisma.carts.findUnique({
      where: { id: parseInt(id) },
    });
    if (!cart) return res.status(404).json("The cart is not found.");
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "ERROR TO FIND CARTS" });
  }
});
route.post("/", auth, validate(cartSchema), async (req, res) => {
  const { userId, productId, quantity } = req.params;
  try {
    const cart = await prisma.carts.create({
      data: {
        users: { connect: { id: userId } },
        products: { connect: { id: productId } },
        quantity,
      },
    });
    if (!cart) return res.status(404).json("Error to create cart");
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error to make a cart" });
  }
});
route.put(
  "/id",
  [auth, verifyOwnership("carts")],
  validate(cartSchema),
  async (req, res) => {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    try {
      const cart = await prisma.carts.update({
        where: { id: parseInt(id) },
        data: { products: { connect: { id: productId } }, quantity },
      });
      if (!cart) return res.status(404).json("Cart not found.");
      res.json(cart);
    } catch (err) {
      console.log(err);
      res.status(404).json({ message: "Error to make change on cart" });
    }
  }
);
route.delete("/id", [auth, verifyOwnership("carts")], async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await prisma.carts.delete({
      where: { id: parseInt(id) },
    });
    if (!cart) return res.status(404).json("Error to find cart.");
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Error to remove the cart." });
  }
});

export default route;

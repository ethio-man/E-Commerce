import express from "express";
import { prisma } from "../startup/db.js";
import validate from "../middleware/validate.js";
import { cartSchema } from "../validations/cartValidation.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
const route = express.Router();
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
route.get("/:id", [auth, verifyOwnership("carts")], async (req, res) => {
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
// get carts based on user id
route.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const carts = await prisma.carts.findMany({
      where: { user_id: parseInt(userId) },
    });
  } catch (err) {
    console.error("Error to find user carts.");
    res.status(500).json({ message: "Error to find user's carts" });
  }
});
route.post("/", auth, validate(cartSchema), async (req, res) => {
  const { user_id, product_id, quantity } = req.body;
  const uid = user_id ? parseInt(user_id) : req.user && req.user.id; //req.user: users data from authentication middleware
  const pid = parseInt(product_id);
  const qty = quantity ? parseInt(quantity) : 1;

  if (!uid) return res.status(400).json({ message: "user_id is required" });
  if (!pid) return res.status(400).json({ message: "product_id is required" });
  if (qty <= 0)
    return res.status(400).json({ message: "quantity must be greater than 0" });

  try {
    // Check if a cart row for this user/product already exists
    const existing = await prisma.carts.findUnique({
      where: { user_id_product_id: { user_id: uid, product_id: pid } },
    });

    if (existing) {
      // Increment the quantity
      const updated = await prisma.carts.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + qty },
      });
      return res.status(200).json(updated);
    }

    // Create new cart item
    const cart = await prisma.carts.create({
      data: { user_id: uid, product_id: pid, quantity: qty },
    });
    if (!cart) return res.status(400).json("Error creating cart");
    res.status(201).json(cart);
  } catch (err) {
    // Fallback: handle unique-constraint race by updating existing row
    if (err && err.code === "P2002") {
      try {
        const existingRetry = await prisma.carts.findUnique({
          where: { user_id_product_id: { user_id: uid, product_id: pid } },
        });
        if (existingRetry) {
          const updated = await prisma.carts.update({
            where: { id: existingRetry.id },
            data: { quantity: existingRetry.quantity + qty },
          });
          return res.status(200).json(updated);
        }
      } catch (e) {
        console.log("fallback update failed", e);
      }
    }

    console.log(err);
    res.status(500).json({ message: "Error creating cart" });
  }
});
route.put(
  "/:id",
  [auth, verifyOwnership("carts")],
  validate(cartSchema),
  async (req, res) => {
    const { id } = req.params;
    const { product_id, quantity } = req.body;
    try {
      const cart = await prisma.carts.update({
        where: { id: parseInt(id) },
        data: { products: { connect: { id: parseInt(product_id) } }, quantity },
      });
      if (!cart) return res.status(404).json("Cart not found.");
      res.json(cart);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error updating cart" });
    }
  },
);
route.delete("/:id", [auth, verifyOwnership("carts")], async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await prisma.carts.delete({
      where: { id: parseInt(id) },
    });
    if (!cart) return res.status(404).json("Error to find cart.");
    res.json(cart);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error removing the cart." });
  }
});

export default route;

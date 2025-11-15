import express from "express";
import { prisma } from "../startup/db.js";
import validate from "../middleware/validate.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
import { commentSchema } from "../validations/commentValidator.js";
const route = express.Router();
route.get("/:id", [auth, verifyOwnership("comments")], async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comments.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find comment." });
  }
});
route.post("/", [auth, validate(commentSchema)], async (req, res) => {
  const { message, rating, userId, productId } = req.body;
  try {
    const comment = await prisma.comments.create({
      data: {
        message,
        rating,
        users: { connect: { id: userId } },
        products: { connect: { id: productId } },
      },
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to send comment ,please try again." });
  }
});
route.put(
  "/:id",
  [auth, verifyOwnership("carts"), validate(commentSchema)],
  async (req, res) => {
    const { id } = req.params;
    const { message, rating } = req.body;
    try {
      const comment = await prisma.comments.update({
        where: { id: parseInt(id) },
        data: { message, rating },
      });
      res.json(comment);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "Error to update message" });
    }
  }
);
route.delete("/:id", [auth, verifyOwnership("comments")], async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comments.delete({
      where: { id: parseInt(id) },
    });
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to delete comment." });
  }
});
export default route;

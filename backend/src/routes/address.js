import express from "express";
import { prisma } from "../startup/db.js";
import { auth, verifyOwnership } from "../middleware/auth.js";
import { addressSchema } from "../validations/addressValidation.js";
import validate from "../middleware/validate.js";
const route = express.Router();
route.get("/", auth, async (req, res) => {
  if (req.user.role != "admin")
    return res.status(403).json("Unauthorized access");
  try {
    const address = await prisma.address.findMany();
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find address" });
  }
});
route.get("/:id", [auth, verifyOwnership("address")], async (req, res) => {
  const { id } = req.params;
  try {
    const address = await prisma.address.findUnique({
      where: { id: parseInt(id) },
    });
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to find address" });
  }
});
route.post("/", [auth, validate(addressSchema)], async (req, res) => {
  const { user_id, country, city, postal_code } = req.body;
  try {
    const address = await prisma.address.create({
      data: { users: { connect: { id: user_id } }, country, city, postal_code },
    });
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to create address" });
  }
});
route.put(
  "/:id",
  [auth, validate(addressSchema), verifyOwnership("address")],
  async (req, res) => {
    const { id } = req.params;
    const { user_id, country, city, postal_code } = req.body;
    try {
      const address = await prisma.address.update({
        where: { id: parseInt(id) },
        data: {
          users: { connect: { id: user_id } },
          country,
          city,
          postal_code,
        },
      });
      res.json(address);
    } catch (err) {
      console.log(err);
      res.status(404).json({ error: "Error to update address" });
    }
  },
);
route.delete("/:id", [auth, verifyOwnership("address")], async (req, res) => {
  const { id } = req.params;
  try {
    const address = await prisma.address.delete({
      where: { id: parseInt(id) },
    });
    res.json(address);
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: "Error to remove address" });
  }
});
export default route;

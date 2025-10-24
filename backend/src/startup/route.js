import express from "express";
import cors from "cors";
import User from "../routes/user.js";
import Products from "../routes/product.js";
import Orders from "../routes/order.js";
import Address from "../routes/address.js";
export default function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/users", User);
  app.use("/products", Products);
  app.use("/orders", Orders);
  app.use("/address", Address);
}

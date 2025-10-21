import express from "express";
import cors from "cors";
import User from "../routes/user.js";
import Products from "../routes/product.js";
export default function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/users", User);
  app.use("/products", Products);
}

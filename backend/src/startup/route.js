import express from "express";
import cors from "cors";
import User from "../routes/user.js";
export default function (app) {
  app.use(express.json());
  app.use(cors());
  app.use("/users", User);
}

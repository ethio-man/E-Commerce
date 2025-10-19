import express from "express";
import dotenv from "dotenv";
import setUpRoutes from "./src/startup/route.js";
dotenv.config();
const app = express();
setUpRoutes(app);
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server listening to the port ${port}...`);
});
export default server;

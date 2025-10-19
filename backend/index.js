import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Server listening to the port ${port}...`);
});
export default server;

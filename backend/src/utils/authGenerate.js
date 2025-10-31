import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function (user) {
  try {
    const { id, email, role } = user;
    const token = jwt.sign({ id, email, role }, process.env.JWT_SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
  }
}

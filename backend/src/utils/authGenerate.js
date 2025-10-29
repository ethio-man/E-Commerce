import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function (user) {
  try {
    const { full_name, email } = user;
    const token = jwt.sign({ full_name, email }, process.env.JWT_SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
  }
}

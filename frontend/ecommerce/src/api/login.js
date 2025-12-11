import axioClient from "./axioClient.js";
const Login = {
  create: (data) => axioClient.post("/login", data),
};

export default Login;

import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/";

const axioClient = axios.create({ baseURL });

axioClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers["x-auth-token"] = token;
    return config;
  },
  (error) => Promise.reject(error),
);

axioClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("Api Error:", error.response.status, error.response.data);
      error.response.data.error
        ? alert(error.response.data.error)
        : alert(error.response.data);
    } else console.error("Network Error:", error.message);
    return Promise.reject(error);
  },
);

export default axioClient;

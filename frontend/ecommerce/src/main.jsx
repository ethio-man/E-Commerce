import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App.jsx";

const clientId =
  "1095535746900-6h2igh8fem3f7u4f3s6486e8aaqreckt.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);

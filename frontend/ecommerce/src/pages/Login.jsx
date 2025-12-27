import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Request from "../api/Request.js";
import { useAuth } from "../context/AuthContext.jsx";
import SignInModal from "../components/SignInModal.jsx";
const SingUp = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const signup = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // 1. Get user info from Google
        const googleRes = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );

        const userData = await googleRes.json();
        const { name, email, sub } = userData;
        const res = await Request("users/google").create({
          full_name: name,
          email,
          google_id: sub,
        });
        const user = res.data;
        const token = res.headers["auth-token"];
        await login(user, token);
        navigate("/");
      } catch (err) {
        console.error("Error:", err);
      }
    },

    onError: () => {
      console.log("Login Failed");
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [full_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await Request("users/register").create({
        full_name,
        email,
        password,
      });
      const user = res.data;
      const token = res.headers["auth-token"];
      await login(user, token);
      navigate("/");
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 shadow-sm">
        <div className="text-xl font-bold text-gray-800">Warka</div>
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="text-blue-600 font-semibold hover:text-blue-700 transition duration-150"
          >
            Log In
          </button>
          {open && (
            <SignInModal
              onClose={() => setOpen(false)}
              navigate={navigate}
              useGoogleLogin={useGoogleLogin}
            />
          )}
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your Account
            </h2>
            <p className="mt-1 text-gray-500">Your Online shop!</p>
          </div>
          <button
            type="button"
            onClick={() => signup()}
            className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <img
              className="mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google logo"
              style={{ height: "20px" }}
            />
            Continue with Google
          </button>
          <div className="relative my-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                placeholder="Enter your full name"
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900 pr-10" // pr-10 for icon space
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-6">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default SingUp;

import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axioClient from "../api/axioClient.js"; // axios instance

const SignInModal = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Google login success
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      const res = await axioClient.post("/auth/google", {
        idToken: credentialResponse.credential,
      });

      login(res.data.user, res.data.token);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Email submit (magic link / passwordless / or next step)
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axioClient.post("/auth/login", { email });

      login(res.data.user, res.data.token);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Email sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[360px] rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-semibold text-center">Sign in</h2>

        {/* Google Sign In */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google login failed")}
          width="100%"
        />

        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Email Sign In */}
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Continue with Email"}
          </button>
        </form>

        <button
          onClick={onClose}
          className="w-full text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SignInModal;

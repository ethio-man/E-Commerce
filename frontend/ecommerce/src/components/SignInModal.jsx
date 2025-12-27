import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Request from "../api/Request.js";

const SignInModal = ({ onClose, navigate, useGoogleLogin }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const signIn = useGoogleLogin({
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
        const { sub } = userData;

        const res = await Request("login/google").create({
          google_id: sub,
        });
        await login(res.data.user, res.data.token);
        navigate("/");
      } catch (err) {
        console.error("Error:", err);
      }
    },

    onError: () => {
      console.log("Login Failed");
    },
  });

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await Request("login").create({
        email,
        password,
      });

      login(res.data.user, res.data.token);
      onClose();
      navigate("/");
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

        <button
          type="button"
          onClick={() => signIn()}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center"
        >
          Sign in with Google
        </button>

        <div className="flex items-center gap-2">
          <hr className="flex-1" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1" />
        </div>
        <form onSubmit={handleEmailSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Signing in..." : "Sign in with Email"}
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

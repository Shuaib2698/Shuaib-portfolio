// app/admin/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Set both localStorage and cookie for consistency
        localStorage.setItem("adminAuth", "true");
        setMessage("Login successful! Redirecting...");
        
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        setError(data.error || "Invalid password");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset link sent to your email! Check your inbox.");
        setIsForgotPassword(false);
        setEmail("");
      } else {
        setError(data.error || "Failed to send reset link");
      }
    } catch (error) {
      setError("Failed to process request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="section-box p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-[rgb(var(--primary-color))]">
          {isForgotPassword ? "Reset Password" : "Admin Login"}
        </h2>

        {!isForgotPassword ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
                required
                disabled={loading}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full btn-cyan btn-hover-animation py-2 rounded-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              onClick={() => setIsForgotPassword(true)}
              className="w-full text-[rgb(var(--primary-color))] hover:underline text-sm"
              disabled={loading}
            >
              Forgot Password?
            </button>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your admin email"
                className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
                required
                disabled={loading}
              />
              <p className="text-xs text-gray-400 mt-2">
                Only 298shuaib@gmail.com is registered
              </p>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {message && <p className="text-green-500 text-sm">{message}</p>}
            <button
              type="submit"
              className="w-full btn-cyan btn-hover-animation py-2 rounded-md disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="w-full text-[rgb(var(--primary-color))] hover:underline text-sm"
              disabled={loading}
            >
              Back to Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
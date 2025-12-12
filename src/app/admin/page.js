// app/admin/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiLock, FiMail } from "react-icons/fi";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleBackToHome = () => {
    router.push("/");
  };

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[#0a0a0a] to-black p-4">
      <div className="section-box p-8 max-w-lg w-full relative">
        {/* Header with Back Button */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 bg-gray-800 rounded-md hover:bg-gray-700 flex items-center gap-2 text-sm transition-colors border border-gray-700"
            title="Back to Home"
            disabled={loading}
          >
            <FiArrowLeft /> Back to Home
          </button>
          
          <div className="text-right">
            <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
            <p className="text-xs text-gray-400">Secure Access</p>
          </div>
        </div>
        
        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-[rgba(var(--primary-color),0.2)] to-transparent border border-[rgba(var(--primary-color),0.3)] flex items-center justify-center">
            <FiLock className="text-[rgb(var(--primary-color))]" size={28} />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-white">
            {isForgotPassword ? "Reset Password" : "Admin Login"}
          </h2>
          <p className="text-gray-400">
            {isForgotPassword 
              ? "Enter your registered email to reset password"
              : "Enter your credentials to access the dashboard"}
          </p>
        </div>

        {!isForgotPassword ? (
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium text-gray-300">
                Admin Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-500" size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full pl-10 pr-4 py-3 bg-[#111] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[rgb(var(--primary-color))] focus:ring-2 focus:ring-[rgba(var(--primary-color),0.2)] transition-colors text-base"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {message && (
              <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm">{message}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full btn-hover-animation bg-gradient-to-r from-[rgb(var(--primary-color))] to-[rgba(var(--primary-color),0.8)] text-black font-bold py-3 px-5 rounded-lg hover:shadow-[0_0_20px_rgba(var(--primary-color),0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Logging in...
                </span>
              ) : "Login"}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(true)}
                className="text-[rgb(var(--primary-color))] hover:underline text-sm transition-colors hover:text-[rgba(var(--primary-color),0.8)]"
                disabled={loading}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleForgotPassword} className="space-y-6">
            <div>
              <label className="block text-sm mb-2 font-medium text-gray-300">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your admin email"
                  className="w-full pl-10 pr-4 py-3 bg-[#111] border border-[#333] rounded-lg text-white focus:outline-none focus:border-[rgb(var(--primary-color))] focus:ring-2 focus:ring-[rgba(var(--primary-color),0.2)] transition-colors text-base"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Only registered admin emails can reset password
              </p>
            </div>
            
            {error && (
              <div className="p-3 bg-red-900/20 border border-red-700 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            {message && (
              <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
                <p className="text-green-400 text-sm">{message}</p>
              </div>
            )}
            
            <button
              type="submit"
              className="w-full btn-hover-animation bg-gradient-to-r from-[rgb(var(--primary-color))] to-[rgba(var(--primary-color),0.8)] text-black font-bold py-3 px-5 rounded-lg hover:shadow-[0_0_20px_rgba(var(--primary-color),0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </span>
              ) : "Send Reset Link"}
            </button>
            
            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsForgotPassword(false)}
                className="text-[rgb(var(--primary-color))] hover:underline text-sm transition-colors hover:text-[rgba(var(--primary-color),0.8)]"
                disabled={loading}
              >
                ← Back to Login
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-xs text-gray-500">
            This is a secure admin area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
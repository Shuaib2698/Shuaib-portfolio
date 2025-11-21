// app/admin/reset-password/page.js
"use client";
import { useState, useEffect, useCallback } from "react"; // Add useCallback
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Wrap verifyToken in useCallback to avoid dependency issues
  const verifyToken = useCallback(async () => {
    try {
      console.log("Verifying token:", token);
      const response = await fetch(`/api/admin/verify-token?token=${token}`);
      const data = await response.json();

      console.log("Token verification response:", data);

      if (response.ok) {
        setIsValidToken(true);
        setEmail(data.email || "admin");
      } else {
        setError(data.error || "Invalid or expired reset link");
      }
    } catch (error) {
      console.error("Token verification error:", error);
      setError("Failed to verify reset link");
    } finally {
      setLoading(false);
    }
  }, [token]); // Add token as dependency

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
      setError("Invalid reset link - No token provided");
    }
  }, [token, verifyToken]); // Add verifyToken to dependencies

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please make sure both passwords are identical.");
      return;
    }

    if (password === 'password' || password === 'admin' || password === '123456') {
      setError("Password is too common. Please choose a stronger password.");
      return;
    }

    try {
      const response = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/admin");
        }, 3000);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      setError("Failed to reset password. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white text-center">
          <div className="text-xl mb-4">Verifying reset link...</div>
          <div className="text-sm text-gray-400">Token: {token}</div>
        </div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="section-box p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Invalid Link</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <div className="text-xs text-gray-500 mb-4 break-all">Token: {token}</div>
          <button
            onClick={() => router.push("/admin")}
            className="btn-cyan btn-hover-animation py-2 px-4 rounded-md"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="section-box p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-[rgb(var(--primary-color))]">
          Reset Password
        </h2>
        <p className="text-gray-400 text-sm mb-4 text-center">
          Reset password for: <span className="text-cyan-400">{email}</span>
        </p>
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password (min 6 characters)"
              className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
              required
              minLength={6}
            />
          </div>
          
          {error && (
            <div className="p-3 bg-red-900/50 border border-red-700 rounded-md">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          {message && (
            <div className="p-3 bg-green-900/50 border border-green-700 rounded-md">
              <p className="text-green-400 text-sm">{message}</p>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full btn-cyan btn-hover-animation py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!password || !confirmPassword || password.length < 6}
          >
            Reset Password
          </button>
          
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="w-full text-[rgb(var(--primary-color))] hover:underline text-sm py-2"
          >
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
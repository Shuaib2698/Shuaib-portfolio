// app/admin/reset-password/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      verifyToken();
    } else {
      setLoading(false);
      setError("Invalid reset link");
    }
  }, [token]);

  const verifyToken = async () => {
    try {
      const response = await fetch(`/api/admin/verify-token?token=${token}`);
      const data = await response.json();

      if (response.ok) {
        setIsValidToken(true);
      } else {
        setError(data.error || "Invalid or expired reset link");
      }
    } catch (error) {
      setError("Failed to verify reset link");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
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
        }, 2000);
      } else {
        setError(data.error || "Failed to reset password");
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Verifying reset link...</div>
      </div>
    );
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="section-box p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Invalid Link</h2>
          <p className="text-gray-300 mb-4">{error}</p>
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
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
              required
              minLength={6}
            />
          </div>
          <div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
              required
              minLength={6}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full btn-cyan btn-hover-animation py-2 rounded-md"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
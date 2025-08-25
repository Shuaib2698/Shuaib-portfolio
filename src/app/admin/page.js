"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple password check - you should use a more secure method in production
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // Store authentication token
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="section-box p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-[rgb(var(--primary-color))]">
          Admin Login
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2 bg-[#111] border border-[#333] rounded-md text-white focus:outline-none focus:border-[rgb(var(--primary-color))]"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full btn-cyan btn-hover-animation py-2 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
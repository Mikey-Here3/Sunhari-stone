// ============================================
// Admin Login Page
// Simple password-based admin authentication
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store admin token in localStorage
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.error || "Invalid password");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-charcoal to-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold"
            >
              <path
                d="M12 2L2 12L12 22L22 12L12 2Z"
                fill="currentColor"
                opacity="0.2"
              />
              <path
                d="M12 2L2 12L12 22L22 12L12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            <span className="font-heading text-2xl font-semibold text-white">
              Sunhari Stone
            </span>
          </div>
          <p className="text-sm text-white/50">Admin Panel</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="font-heading text-2xl font-bold text-charcoal text-center mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password"
                className="block text-sm font-medium text-charcoal-light mb-2"
              >
                Admin Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-white py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-xs text-center text-charcoal-light/50 mt-6">
            Default password: <code className="bg-beige px-2 py-0.5 rounded">admin123</code>
          </p>
        </div>
      </div>
    </div>
  );
}

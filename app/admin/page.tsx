// ============================================
// Admin Login Page
// Simple password-based admin authentication
// ============================================

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("admin_token", data.token);
        router.push("/admin/dashboard");
      } else {
        setError(data.details || data.error || "Invalid credentials");
        if (data.hint) console.log("HINT:", data.hint);
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-gold" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="currentColor" fillOpacity="0.1" />
              <path d="M11 3L8 9l4 12 4-12-3-6" />
              <path d="M2 9h20" />
            </svg>
            <span className="font-heading text-2xl font-semibold text-white">
              Sunhari Stone
            </span>
          </div>
          <p className="text-sm text-white/50 text-gold uppercase tracking-[0.2em] font-medium">Admin Panel</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h1 className="font-heading text-2xl font-bold text-charcoal text-center mb-6">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-charcoal-light mb-2">
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sunharistone.com"
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-charcoal-light mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm transition-all"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-lg border border-red-100 animate-fade-in">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-white py-3.5 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-gold-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold/20"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-[10px] text-center text-charcoal-light/40 mt-8 leading-relaxed uppercase tracking-widest">
            Sunhari Stone Secure Administration Layer
          </p>
        </div>
      </div>
    </div>
  );
}

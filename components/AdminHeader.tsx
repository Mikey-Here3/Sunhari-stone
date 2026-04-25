"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard" },
    { name: "Products", href: "/admin/dashboard" }, // In a real app, this might be separate
    { name: "Categories", href: "/admin/categories" },
  ];

  return (
    <header className="bg-charcoal text-white border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center gap-6">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gold" stroke="currentColor" strokeWidth="2">
              <path d="M6 3h12l4 6-10 12L2 9z" fill="currentColor" fillOpacity="0.2" />
              <path d="M11 3L8 9l4 12 4-12-3-6" />
              <path d="M2 9h20" />
            </svg>
            <span className="font-heading font-semibold tracking-wide">
              Sunhari Admin
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-white/10 text-gold" 
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-white/40 hover:text-gold transition-colors flex items-center gap-1"
          >
            <span>View Store</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
            </svg>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

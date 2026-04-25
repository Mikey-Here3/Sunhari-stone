// ============================================
// Navbar Component
// Sticky navigation with mobile hamburger menu
// ============================================

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/utils";

// Navigation links configuration
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll for navbar background blur effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-gold/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            id="navbar-logo"
          >
            {/* Gold diamond icon */}
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gold group-hover:scale-110 transition-transform"
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
            <span className="font-heading text-xl sm:text-2xl font-semibold text-charcoal tracking-wide">
              {SITE_NAME}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className={`relative font-body text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-gold"
                    : "text-charcoal-light hover:text-gold"
                }`}
              >
                {link.label}
                {/* Active link underline */}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-charcoal hover:text-gold transition-colors"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                  isOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass border-t border-border transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 text-base font-medium tracking-wide transition-colors ${
                pathname === link.href
                  ? "text-gold"
                  : "text-charcoal-light hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

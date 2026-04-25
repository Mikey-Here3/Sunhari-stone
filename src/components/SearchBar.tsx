// ============================================
// SearchBar Component (Client-side)
// Debounced search input for shop page
// ============================================

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  // Debounced search — updates URL after 400ms of no typing
  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      router.push(`/shop?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      updateSearch(query);
    }, 400);
    return () => clearTimeout(timer);
  }, [query, updateSearch]);

  return (
    <div className="relative max-w-md w-full" id="search-bar">
      {/* Search Icon */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal-light/40"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jewelry & accessories..."
        className="w-full pl-12 pr-4 py-3 rounded-full bg-white border border-border focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm text-charcoal placeholder:text-charcoal-light/40 transition-all duration-300"
        id="search-input"
      />

      {/* Clear Button */}
      {query && (
        <button
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-charcoal-light/40 hover:text-charcoal transition-colors"
          aria-label="Clear search"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

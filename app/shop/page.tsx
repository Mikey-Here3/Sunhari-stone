// ============================================
// Shop Page — All Products with Filters
// Category filtering + search functionality
// ============================================

import { Suspense } from "react";
import { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { ProductSkeletonGrid } from "@/components/ProductSkeleton";
import {
  getProducts,
  getProductsByCategory,
  searchProducts,
  getCategories,
} from "@/lib/data";
import Link from "next/link";

// SEO metadata for the shop page
export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our complete collection of handcrafted jewelry and accessories. Rings, necklaces, bracelets, earrings, scrunchies, hair clips, and more.",
  openGraph: {
    title: "Shop — Sunhari Stone",
    description:
      "Browse our complete collection of handcrafted jewelry and accessories.",
  },
};

// This component handles the product filtering logic
async function ProductGrid({
  category,
  search,
}: {
  category?: string;
  search?: string;
}) {
  let products;

  if (search) {
    products = await searchProducts(search);
  } else if (category) {
    products = await getProductsByCategory(category);
  } else {
    products = await getProducts();
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-beige flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-charcoal-light/40"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-charcoal mb-2">
          No products found
        </h3>
        <p className="text-sm text-charcoal-light mb-6">
          {search
            ? `No results for "${search}". Try a different search term.`
            : "No products in this category yet."}
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-gold font-medium text-sm hover:text-gold-dark transition-colors"
        >
          ← View all products
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const categories = await getCategories();
  const activeCategory = params.category;
  const searchQuery = params.search;

  return (
    <div className="pt-24 pb-16 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
            Our Collection
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
            {activeCategory
              ? categories.find((c) => c.slug === activeCategory)?.name || "Shop"
              : "Shop All"}
          </h1>
          <div className="section-divider" />
        </div>

        {/* Search + Filters Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Search Bar */}
          <Suspense fallback={<div className="h-12 w-full max-w-md shimmer-bg rounded-full" />}>
            <SearchBar />
          </Suspense>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {/* All button */}
          <Link
            href="/shop"
            className={`shrink-0 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
              !activeCategory
                ? "bg-gold text-white"
                : "bg-white border border-border text-charcoal-light hover:border-gold hover:text-gold"
            }`}
            id="filter-all"
          >
            All
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              className={`shrink-0 px-5 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeCategory === category.slug
                  ? "bg-gold text-white"
                  : "bg-white border border-border text-charcoal-light hover:border-gold hover:text-gold"
              }`}
              id={`filter-${category.slug}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Products Grid with Suspense */}
        <Suspense fallback={<ProductSkeletonGrid count={8} />}>
          <ProductGrid category={activeCategory} search={searchQuery} />
        </Suspense>
      </div>
    </div>
  );
}

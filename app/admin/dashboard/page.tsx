// ============================================
// Admin Dashboard — Main admin page
// Overview stats, quick links, product list
// ============================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  imageUrl: string;
  isNew: boolean;
  discount: number | null;
  isFeatured: boolean;
  isActive: boolean;
  category?: { name: string };
  createdAt: string;
}

interface DashboardData {
  products: Product[];
  stats: {
    totalProducts: number;
    activeProducts: number;
    featuredProducts: number;
    categories: number;
  };
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      const res = await fetch("/api/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin");
        return;
      }

      const products = await res.json();
      setData({
        products,
        stats: {
          totalProducts: products.length,
          activeProducts: products.filter((p: Product) => p.isActive).length,
          featuredProducts: products.filter((p: Product) => p.isFeatured).length,
          categories: new Set(products.map((p: Product) => p.category?.name)).size,
        },
      });
    } catch {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("admin_token");
    try {
      await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData(); // Refresh data
    } catch {
      alert("Failed to delete product");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal-light">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <svg
                width="24"
                height="24"
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
              <span className="font-heading text-lg font-semibold text-charcoal">
                Admin Panel
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-charcoal-light hover:text-gold transition-colors"
                target="_blank"
              >
                View Store →
              </Link>
              <Link
                href="/admin/categories"
                className="text-sm text-charcoal-light hover:text-gold transition-colors"
              >
                Categories
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="admin-card">
            <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
              Total Products
            </p>
            <p className="text-3xl font-bold text-charcoal">
              {data?.stats.totalProducts || 0}
            </p>
          </div>
          <div className="admin-card">
            <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
              Active
            </p>
            <p className="text-3xl font-bold text-green-600">
              {data?.stats.activeProducts || 0}
            </p>
          </div>
          <div className="admin-card">
            <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
              Featured
            </p>
            <p className="text-3xl font-bold text-gold">
              {data?.stats.featuredProducts || 0}
            </p>
          </div>
          <Link href="/admin/categories" className="admin-card hover:border-gold/50 transition-colors">
            <p className="text-xs text-charcoal-light uppercase tracking-wider mb-1">
              Categories
            </p>
            <p className="text-3xl font-bold text-charcoal">
              {data?.stats.categories || 0}
            </p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-charcoal">
            Products
          </h2>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gold-dark transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Products Table */}
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-charcoal-light uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data?.products.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-beige shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-charcoal">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5">
                            {product.isNew && (
                              <span className="text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full font-medium">
                                NEW
                              </span>
                            )}
                            {product.isFeatured && (
                              <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                                FEATURED
                              </span>
                            )}
                            {product.discount && (
                              <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                {product.discount}% OFF
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-charcoal-light">
                      {product.category?.name || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-charcoal">
                      ₨ {product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          product.isActive
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {product.isActive ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {(!data?.products || data.products.length === 0) && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-charcoal-light"
                    >
                      No products yet. Click &quot;Add Product&quot; to create your
                      first product.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

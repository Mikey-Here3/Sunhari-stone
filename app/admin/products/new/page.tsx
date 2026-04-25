// ============================================
// Admin — Add New Product Page
// Full form for creating products
// ============================================

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    categoryId: "",
    isNew: true,
    discount: "",
    tags: "",
    metaTitle: "",
    metaDesc: "",
    isFeatured: false,
    isActive: true,
  });

  // Fetch categories on mount
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    fetch("/api/admin/categories", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, [router]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
    } catch {
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("admin_token");
    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        discount: form.discount ? parseInt(form.discount) : null,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to create product");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className="text-charcoal-light hover:text-charcoal transition-colors"
              >
                ← Back
              </Link>
              <span className="text-gray-300">|</span>
              <span className="font-heading text-lg font-semibold text-charcoal">
                Add New Product
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="admin-card">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-6">
              Basic Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                  placeholder="e.g., Golden Bloom Ring"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Description *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  placeholder="Describe the product in detail..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm({ ...form, price: e.target.value })
                    }
                    placeholder="e.g., 1200"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm"
                    required
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Category *
                  </label>
                  <select
                    value={form.categoryId}
                    onChange={(e) =>
                      setForm({ ...form, categoryId: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm bg-white"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={form.discount}
                    onChange={(e) =>
                      setForm({ ...form, discount: e.target.value })
                    }
                    placeholder="e.g., 20"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-charcoal mb-1">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) =>
                      setForm({ ...form, tags: e.target.value })
                    }
                    placeholder="e.g., gold ring, floral, adjustable"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div className="admin-card">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-6">
              Product Image
            </h2>

            <div className="flex items-start gap-6">
              {/* Preview */}
              <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-beige border-2 border-dashed border-border shrink-0">
                {(imagePreview || form.imageUrl) ? (
                  <Image
                    src={imagePreview || form.imageUrl}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal-light/30">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-charcoal-light file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 file:cursor-pointer"
                  id="product-image-upload"
                />
                <p className="text-xs text-charcoal-light/50 mt-2">
                  Recommended: 800×800px, JPG or PNG. Max 5MB.
                </p>

                {/* Or use URL */}
                <div className="mt-3">
                  <label className="block text-xs font-medium text-charcoal-light mb-1">
                    Or enter image URL:
                  </label>
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm({ ...form, imageUrl: e.target.value })
                    }
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-gold outline-none text-xs"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="admin-card">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-2">
              SEO Settings
            </h2>
            <p className="text-xs text-charcoal-light mb-6">
              Optimize how this product appears in Google search results.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={form.metaTitle}
                  onChange={(e) =>
                    setForm({ ...form, metaTitle: e.target.value })
                  }
                  placeholder="Custom title for search engines (defaults to product name)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm"
                />
                <p className="text-xs text-charcoal-light/50 mt-1">
                  {form.metaTitle.length}/60 characters recommended
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">
                  Meta Description
                </label>
                <textarea
                  value={form.metaDesc}
                  onChange={(e) =>
                    setForm({ ...form, metaDesc: e.target.value })
                  }
                  placeholder="Brief description for search engines (defaults to product description)"
                  rows={2}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none text-sm resize-none"
                />
                <p className="text-xs text-charcoal-light/50 mt-1">
                  {form.metaDesc.length}/155 characters recommended
                </p>
              </div>

              {/* SEO Preview */}
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-charcoal-light uppercase tracking-wider mb-2">
                  Google Preview
                </p>
                <p className="text-blue-700 text-base font-medium truncate">
                  {form.metaTitle || form.name || "Product Title"} — Sunhari
                  Stone
                </p>
                <p className="text-green-700 text-xs truncate">
                  sunharistone.vercel.app/product/
                  {form.name
                    ? form.name.toLowerCase().replace(/\s+/g, "-")
                    : "product-slug"}
                </p>
                <p className="text-sm text-charcoal-light mt-1 line-clamp-2">
                  {form.metaDesc ||
                    form.description ||
                    "Product description will appear here..."}
                </p>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="admin-card">
            <h2 className="font-heading text-lg font-semibold text-charcoal mb-6">
              Product Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Mark as New Arrival
                  </p>
                  <p className="text-xs text-charcoal-light">
                    Shows a &quot;NEW&quot; badge on the product card
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.isNew}
                  onChange={(e) =>
                    setForm({ ...form, isNew: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold accent-gold"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Featured Product
                  </p>
                  <p className="text-xs text-charcoal-light">
                    Shows on the homepage featured section
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold accent-gold"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-charcoal">
                    Active (Visible in Store)
                  </p>
                  <p className="text-xs text-charcoal-light">
                    Uncheck to hide from the public store
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm({ ...form, isActive: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-gray-300 text-gold focus:ring-gold accent-gold"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-gold text-white px-8 py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
            <Link
              href="/admin/dashboard"
              className="text-sm text-charcoal-light hover:text-charcoal transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

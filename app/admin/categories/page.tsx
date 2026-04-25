// ============================================
// Admin Category Management Page
// List, add, edit, and delete categories
// ============================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string | null;
  _count?: { products: number };
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [form, setForm] = useState({ name: "", imageUrl: "" });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      const res = await fetch("/api/admin/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_token");
        router.push("/admin");
        return;
      }

      const data = await res.json();
      setCategories(data);
    } catch {
      console.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setForm({ name: category.name, imageUrl: category.imageUrl || "" });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setForm({ name: "", imageUrl: "" });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const token = localStorage.getItem("admin_token");
    const url = editingCategory 
      ? `/api/admin/categories/${editingCategory.id}` 
      : "/api/admin/categories";
    const method = editingCategory ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setShowModal(false);
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save category");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will not work if there are products in this category.")) return;

    const token = localStorage.getItem("admin_token");
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete category");
      }
    } catch {
      alert("Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-charcoal-light">Loading categories...</p>
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
              <Link href="/admin/dashboard" className="text-charcoal-light hover:text-charcoal transition-colors">
                ← Dashboard
              </Link>
              <span className="text-gray-300">|</span>
              <span className="font-heading text-lg font-semibold text-charcoal">
                Manage Categories
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-xl font-bold text-charcoal">Categories</h2>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-xl font-medium text-sm hover:bg-gold-dark transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Category
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="admin-card flex items-center gap-4 group">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-beige shrink-0 border border-border/50">
                {category.imageUrl ? (
                  <Image src={category.imageUrl} alt={category.name} fill className="object-cover" sizes="80px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-charcoal-light/20">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg font-bold text-charcoal truncate">{category.name}</h3>
                <p className="text-xs text-charcoal-light uppercase tracking-wider mt-1">
                  /{category.slug}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full py-12 text-center text-charcoal-light admin-card">
              No categories found. Click &quot;Add Category&quot; to create one.
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h2 className="font-heading text-2xl font-bold text-charcoal mb-6">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Rings"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-charcoal mb-1">Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="/images/categories/rings.jpg"
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-gold outline-none text-sm"
                />
              </div>
              <div className="flex items-center gap-3 mt-8">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-gold text-white py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-gold-dark transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : editingCategory ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-charcoal-light py-3 rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

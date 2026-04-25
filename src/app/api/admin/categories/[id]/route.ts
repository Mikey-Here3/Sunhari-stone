// ============================================
// Admin Single Category API — PUT, DELETE
// Update or delete a specific category
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";

/**
 * PUT /api/admin/categories/[id]
 * Update a category
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  const { name, imageUrl } = body;

  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");
      
      const slug = name ? name.toLowerCase().replace(/\s+/g, "-") : undefined;

      const category = await prisma.category.update({
        where: { id },
        data: { name, slug, imageUrl },
      });
      return NextResponse.json(category);
    }
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  } catch (error) {
    console.error("Update category error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/categories/[id]
 * Delete a category
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");

      // Check if category has products
      const productCount = await prisma.product.count({
        where: { categoryId: id },
      });

      if (productCount > 0) {
        return NextResponse.json(
          { error: "Cannot delete category with active products. Please reassign or delete the products first." },
          { status: 400 }
        );
      }

      await prisma.category.delete({ where: { id } });
      return NextResponse.json({ message: "Category deleted" });
    }
    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  } catch (error) {
    console.error("Delete category error:", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}

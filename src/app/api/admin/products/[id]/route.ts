// ============================================
// Admin Single Product API — GET, PUT, DELETE
// Get, update, or delete a specific product
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { products, categories } from "@/lib/data";
import { slugify } from "@/lib/utils";

// Shared local store reference (same as in route.ts)
let localProducts = [...products];

/**
 * GET /api/admin/products/[id]
 * Get a single product by ID
 */
export async function GET(
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
      const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true },
      });
      if (!product) {
        return NextResponse.json(
          { error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(product);
    }
  } catch {
    console.log("Database unavailable, using local data");
  }

  const product = localProducts.find((p) => p.id === id);
  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({
    ...product,
    category: categories.find((c) => c.id === product.categoryId),
  });
}

/**
 * PUT /api/admin/products/[id]
 * Update a product
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

  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");
      const product = await prisma.product.update({
        where: { id },
        data: {
          name: body.name,
          slug: slugify(body.name),
          description: body.description,
          price: body.price,
          imageUrl: body.imageUrl,
          categoryId: body.categoryId,
          isNew: body.isNew,
          discount: body.discount || null,
          tags: body.tags || [],
          metaTitle: body.metaTitle || null,
          metaDesc: body.metaDesc || null,
          isFeatured: body.isFeatured,
          isActive: body.isActive,
        },
        include: { category: true },
      });
      return NextResponse.json(product);
    }
  } catch (error) {
    console.error("Update product error:", error);
  }

  // Fallback: update local array
  const index = localProducts.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  localProducts[index] = {
    ...localProducts[index],
    name: body.name,
    slug: slugify(body.name),
    description: body.description,
    price: body.price,
    imageUrl: body.imageUrl,
    categoryId: body.categoryId,
    isNew: body.isNew,
    discount: body.discount || null,
    tags: body.tags || [],
    metaTitle: body.metaTitle || null,
    metaDesc: body.metaDesc || null,
    isFeatured: body.isFeatured,
    isActive: body.isActive,
  };

  return NextResponse.json(localProducts[index]);
}

/**
 * DELETE /api/admin/products/[id]
 * Delete a product
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
      await prisma.product.delete({ where: { id } });
      return NextResponse.json({ message: "Product deleted" });
    }
  } catch (error) {
    console.error("Delete product error:", error);
  }

  // Fallback: remove from local array
  localProducts = localProducts.filter((p) => p.id !== id);
  return NextResponse.json({ message: "Product deleted" });
}

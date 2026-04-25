// ============================================
// Admin Products API — GET, POST
// List all products / Create new product
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { products, categories } from "@/lib/data";
import { slugify } from "@/lib/utils";

// In-memory store for products when DB not connected
// This simulates a database for development
let localProducts = [...products];

/**
 * GET /api/admin/products
 * Returns all products (including inactive ones for admin)
 */
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Try database first
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");
      const dbProducts = await prisma.product.findMany({
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json(dbProducts);
    }
  } catch {
    console.log("Database unavailable, using local data");
  }

  // Fallback: return local products with category info
  const enriched = localProducts.map((p) => ({
    ...p,
    category: categories.find((c) => c.id === p.categoryId),
  }));
  return NextResponse.json(enriched);
}

/**
 * POST /api/admin/products
 * Create a new product
 */
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slug = slugify(body.name);

    // Try database first
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");
      const product = await prisma.product.create({
        data: {
          name: body.name,
          slug,
          description: body.description,
          price: body.price,
          imageUrl: body.imageUrl || "/images/products/placeholder.jpg",
          categoryId: body.categoryId,
          isNew: body.isNew ?? true,
          discount: body.discount || null,
          tags: body.tags || [],
          metaTitle: body.metaTitle || null,
          metaDesc: body.metaDesc || null,
          isFeatured: body.isFeatured ?? false,
          isActive: body.isActive ?? true,
        },
        include: { category: true },
      });
      return NextResponse.json(product, { status: 201 });
    }

    // Fallback: add to local array
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: body.name,
      slug,
      description: body.description,
      price: body.price,
      imageUrl: body.imageUrl || "/images/products/placeholder.jpg",
      categoryId: body.categoryId,
      isNew: body.isNew ?? true,
      discount: body.discount || null,
      tags: body.tags || [],
      metaTitle: body.metaTitle || null,
      metaDesc: body.metaDesc || null,
      isFeatured: body.isFeatured ?? false,
      isActive: body.isActive ?? true,
      createdAt: new Date(),
    };
    localProducts.unshift(newProduct);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

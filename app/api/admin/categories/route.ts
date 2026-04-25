// ============================================
// Admin Categories API — GET
// List all categories
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { categories } from "@/lib/data";

/**
 * GET /api/admin/categories
 * Returns all categories
 */
export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");
      const dbCategories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });
      return NextResponse.json(dbCategories);
    }
  } catch {
    console.log("Database unavailable, using static data");
  }

  return NextResponse.json(categories);
}

/**
 * POST /api/admin/categories
 * Create a new category
 */
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, imageUrl } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("@/lib/prisma");
      const category = await prisma.category.create({
        data: { name, slug, imageUrl },
      });
      return NextResponse.json(category, { status: 201 });
    }

    return NextResponse.json({ error: "Database not connected" }, { status: 503 });
  } catch (error) {
    console.error("Create category error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}

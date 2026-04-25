// ============================================
// Admin Image Upload API
// Saves uploaded images to /public/images/products/
// ============================================

import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

/**
 * POST /api/admin/upload
 * Upload a product image
 */
export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPG, PNG, WebP, or GIF." },
        { status: 400 }
      );
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Max 5MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const filename = `product-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), "public", "images", "products");

    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    // Write file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, filename), buffer);

    // Return the public URL
    const url = `/images/products/${filename}`;
    return NextResponse.json({ url, filename });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed" },
      { status: 500 }
    );
  }
}

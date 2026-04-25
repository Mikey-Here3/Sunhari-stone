// ============================================
// Admin Login API Route
// Simple password-based authentication with JWT
// ============================================

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Admin password — change this in production via env vars
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const JWT_SECRET = process.env.JWT_SECRET || "sunhari-stone-secret-key-2025";

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Generate JWT token (valid for 24 hours)
    const token = jwt.sign(
      { role: "admin", iat: Date.now() },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({ token, message: "Login successful" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

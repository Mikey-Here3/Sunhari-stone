// ============================================
// Admin Login API Route
// Simple password-based authentication with JWT
// ============================================

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "sunhari-stone-secret-key-2025";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin user in database
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate JWT token (valid for 24 hours)
    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: "admin" },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    return NextResponse.json({ token, message: "Login successful" });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { 
        error: "Internal server error", 
        details: error.message || "Unknown error",
        hint: "Check if DATABASE_URL is set and prisma db push has been run."
      },
      { status: 500 }
    );
  }
}

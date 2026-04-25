// ============================================
// Admin Auth Helper
// Verifies JWT token from Authorization header
// ============================================

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "sunhari-stone-secret-key-2025";

/**
 * Verify admin JWT token from request headers
 * Returns true if valid, false if invalid
 */
export function verifyAdminToken(request: NextRequest): boolean {
  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return false;
    }

    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET);
    return true;
  } catch {
    return false;
  }
}

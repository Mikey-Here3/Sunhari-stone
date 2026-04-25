// ============================================
// Prisma Client Singleton
// Prevents multiple instances in development
// ============================================

import { PrismaClient } from "@prisma/client";

// Extend the global type to include the Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Use existing client or create a new one
export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// In development, save the client to the global object
// so it persists across hot module reloads
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;

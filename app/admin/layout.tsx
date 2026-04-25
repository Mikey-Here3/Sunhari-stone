// ============================================
// Admin Layout — Separate layout for admin panel
// No public navbar/footer, has sidebar instead
// ============================================

import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Admin Panel — Sunhari Stone",
    template: "%s | Admin — Sunhari Stone",
  },
  robots: { index: false, follow: false }, // Keep admin pages out of search engines
};

import AdminHeader from "@/components/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

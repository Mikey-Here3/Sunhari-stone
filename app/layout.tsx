import type { Metadata } from "next";
import "./globals.css";

// --- SEO Metadata for the entire site ---
export const metadata: Metadata = {
  title: {
    default: "Sunhari Stone — Elegant Jewelry & Accessories",
    template: "%s | Sunhari Stone",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description:
    "Discover exquisite handcrafted jewelry and accessories at Sunhari Stone. Shop rings, necklaces, bracelets, earrings, scrunchies, hair clips, and curated gift sets. Order directly via WhatsApp.",
  keywords: [
    "jewelry",
    "accessories",
    "rings",
    "necklaces",
    "bracelets",
    "earrings",
    "scrunchies",
    "hair clips",
    "gift sets",
    "Sunhari Stone",
    "handcrafted jewelry",
    "Pakistani jewelry",
    "online jewelry store",
  ],
  authors: [{ name: "Sunhari Stone" }],
  creator: "Sunhari Stone",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Sunhari Stone",
    title: "Sunhari Stone — Elegant Jewelry & Accessories",
    description:
      "Discover exquisite handcrafted jewelry and accessories. Order directly via WhatsApp.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunhari Stone — Elegant Jewelry & Accessories",
    description:
      "Discover exquisite handcrafted jewelry and accessories. Order directly via WhatsApp.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const dynamic = "force-dynamic";

import LayoutWrapper from "@/components/LayoutWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Google AdSense Verification */}
        <meta name="google-adsense-account" content="ca-pub-5779843318196699" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5779843318196699"
          crossOrigin="anonymous"
        ></script>
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Store",
              name: "Sunhari Stone",
              description: "Elegant handcrafted jewelry and accessories",
              url: "https://sunhari-stone.vercel.app",
              telephone: "+923358432540",
              address: {
                "@type": "PostalAddress",
                addressCountry: "PK",
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-ivory text-charcoal">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}

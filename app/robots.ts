import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/", // Keep admin panel private
    },
    sitemap: "https://sunharistone.vercel.app/sitemap.xml",
  };
}

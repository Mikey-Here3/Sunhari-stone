import { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/data";

const DOMAIN = "https://sunharistone.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch dynamic data
  const products = await getProducts();
  const categories = await getCategories();

  // Static pages
  const staticPages = [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${DOMAIN}/shop`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${DOMAIN}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  // Dynamic product pages
  const productPages = products.map((product) => ({
    url: `${DOMAIN}/product/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic category pages
  const categoryPages = categories.map((category) => ({
    url: `${DOMAIN}/shop?category=${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...productPages, ...categoryPages];
}

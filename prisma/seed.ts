// ============================================
// Prisma Seed Script
// Populates the database with sample data
// Run with: npx prisma db seed
// ============================================

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // --- Create Categories ---
  const categoriesData = [
    { name: "Rings", slug: "rings", imageUrl: "/images/categories/rings.jpg" },
    { name: "Scrunchies", slug: "scrunchies", imageUrl: "/images/categories/scrunchies.jpg" },
    { name: "Hair Clips", slug: "hair-clips", imageUrl: "/images/categories/hair-clips.jpg" },
    { name: "Necklaces", slug: "necklaces", imageUrl: "/images/categories/necklaces.jpg" },
    { name: "Bracelets", slug: "bracelets", imageUrl: "/images/categories/bracelets.jpg" },
    { name: "Earrings", slug: "earrings", imageUrl: "/images/categories/earrings.jpg" },
    { name: "Gift Sets", slug: "gift-sets", imageUrl: "/images/categories/gift-sets.jpg" },
    { name: "New Arrivals", slug: "new-arrivals", imageUrl: "/images/categories/new-arrivals.jpg" },
  ];

  const categories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
    categories[cat.slug] = created.id;
    console.log(`  ✓ Category: ${cat.name}`);
  }

  // --- Create Products ---
  const productsData = [
    { name: "Golden Bloom Ring", slug: "golden-bloom-ring", description: "A delicate gold-plated ring featuring intricate floral engravings. Perfect for everyday elegance. Adjustable band fits most sizes.", price: 1200, imageUrl: "/images/products/golden-bloom-ring.jpg", categorySlug: "rings", isNew: true, discount: null, tags: ["gold ring", "floral", "adjustable"], isFeatured: true, metaTitle: "Golden Bloom Ring — Sunhari Stone", metaDesc: "Delicate gold-plated ring with floral engravings." },
    { name: "Pearl Twist Ring", slug: "pearl-twist-ring", description: "Stunning twisted band ring adorned with a natural freshwater pearl. A timeless piece that elevates any look.", price: 1500, imageUrl: "/images/products/pearl-twist-ring.jpg", categorySlug: "rings", isNew: false, discount: 15, tags: ["pearl ring", "twist band"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Crystal Solitaire Ring", slug: "crystal-solitaire-ring", description: "Classic solitaire-style ring featuring a brilliant cubic zirconia stone set in a polished gold band.", price: 1800, imageUrl: "/images/products/crystal-solitaire-ring.jpg", categorySlug: "rings", isNew: false, discount: null, tags: ["crystal ring", "solitaire"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Silk Champagne Scrunchie", slug: "silk-champagne-scrunchie", description: "Luxurious 100% mulberry silk scrunchie in champagne gold. Gentle on hair, prevents breakage and frizz.", price: 450, imageUrl: "/images/products/silk-champagne-scrunchie.jpg", categorySlug: "scrunchies", isNew: true, discount: null, tags: ["silk scrunchie", "champagne"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Velvet Rose Scrunchie Set", slug: "velvet-rose-scrunchie-set", description: "Set of 3 premium velvet scrunchies in rose, blush, and ivory tones.", price: 800, imageUrl: "/images/products/velvet-rose-scrunchie-set.jpg", categorySlug: "scrunchies", isNew: false, discount: 10, tags: ["velvet scrunchie", "set"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Satin Pearl Scrunchie", slug: "satin-pearl-scrunchie", description: "Elegant satin scrunchie with delicate pearl embellishments.", price: 550, imageUrl: "/images/products/satin-pearl-scrunchie.jpg", categorySlug: "scrunchies", isNew: false, discount: null, tags: ["satin scrunchie", "pearl"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Pearl Claw Clip", slug: "pearl-claw-clip", description: "Oversized claw clip studded with faux pearls. Strong hold for thick hair.", price: 650, imageUrl: "/images/products/pearl-claw-clip.jpg", categorySlug: "hair-clips", isNew: true, discount: null, tags: ["pearl clip", "claw clip"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Crystal Butterfly Clip", slug: "crystal-butterfly-clip", description: "Sparkling crystal butterfly hair clip. Adds a touch of whimsy and glamour.", price: 750, imageUrl: "/images/products/crystal-butterfly-clip.jpg", categorySlug: "hair-clips", isNew: false, discount: 20, tags: ["crystal clip", "butterfly"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Minimalist Gold Barrette", slug: "minimalist-gold-barrette", description: "Sleek, minimalist gold-toned barrette. Clean lines for a polished look.", price: 400, imageUrl: "/images/products/minimalist-gold-barrette.jpg", categorySlug: "hair-clips", isNew: false, discount: null, tags: ["barrette", "gold", "minimalist"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Layered Gold Chain", slug: "layered-gold-chain", description: "Three-layer gold-plated chain necklace with varying lengths.", price: 2200, imageUrl: "/images/products/layered-gold-chain.jpg", categorySlug: "necklaces", isNew: true, discount: null, tags: ["layered necklace", "gold chain"], isFeatured: true, metaTitle: "Layered Gold Chain — Sunhari Stone", metaDesc: "Three-layer gold-plated chain necklace." },
    { name: "Heart Pendant Necklace", slug: "heart-pendant-necklace", description: "Dainty heart-shaped pendant on a delicate gold chain.", price: 1800, imageUrl: "/images/products/heart-pendant-necklace.jpg", categorySlug: "necklaces", isNew: false, discount: null, tags: ["heart pendant", "gold necklace"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Pearl Choker Necklace", slug: "pearl-choker-necklace", description: "Classic pearl choker with graduated freshwater pearls.", price: 2800, imageUrl: "/images/products/pearl-choker-necklace.jpg", categorySlug: "necklaces", isNew: false, discount: 10, tags: ["pearl choker", "classic"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Crystal Charm Bracelet", slug: "crystal-charm-bracelet", description: "Adjustable gold bracelet with dangling crystal charms.", price: 1600, imageUrl: "/images/products/crystal-charm-bracelet.jpg", categorySlug: "bracelets", isNew: true, discount: null, tags: ["charm bracelet", "crystal"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Bangle Set — Rose Gold", slug: "bangle-set-rose-gold", description: "Set of 5 thin bangles in rose gold finish.", price: 1200, imageUrl: "/images/products/bangle-set-rose-gold.jpg", categorySlug: "bracelets", isNew: false, discount: 15, tags: ["bangle set", "rose gold"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Pearl Link Bracelet", slug: "pearl-link-bracelet", description: "Gold chain-link bracelet with pearl accents.", price: 1400, imageUrl: "/images/products/pearl-link-bracelet.jpg", categorySlug: "bracelets", isNew: false, discount: null, tags: ["pearl bracelet", "chain link"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Gold Hoop Earrings", slug: "gold-hoop-earrings", description: "Medium-sized gold hoops with a hammered texture.", price: 900, imageUrl: "/images/products/gold-hoop-earrings.jpg", categorySlug: "earrings", isNew: true, discount: null, tags: ["hoop earrings", "gold"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Pearl Drop Earrings", slug: "pearl-drop-earrings", description: "Elegant drop earrings featuring freshwater pearls.", price: 1300, imageUrl: "/images/products/pearl-drop-earrings.jpg", categorySlug: "earrings", isNew: false, discount: null, tags: ["pearl earrings", "drop"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Crystal Stud Earrings", slug: "crystal-stud-earrings", description: "Dainty crystal stud earrings with secure push-back closure.", price: 600, imageUrl: "/images/products/crystal-stud-earrings.jpg", categorySlug: "earrings", isNew: false, discount: 25, tags: ["stud earrings", "crystal"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Bridal Elegance Gift Set", slug: "bridal-elegance-gift-set", description: "Complete bridal set including necklace, earrings, and bracelet.", price: 5500, imageUrl: "/images/products/bridal-elegance-gift-set.jpg", categorySlug: "gift-sets", isNew: true, discount: null, tags: ["bridal set", "gift set"], isFeatured: true, metaTitle: "Bridal Elegance Gift Set — Sunhari Stone", metaDesc: "Complete bridal jewelry set." },
    { name: "Everyday Essentials Box", slug: "everyday-essentials-box", description: "Curated set of 5 everyday pieces: rings, hoops, bracelet, scrunchie.", price: 3200, imageUrl: "/images/products/everyday-essentials-box.jpg", categorySlug: "gift-sets", isNew: false, discount: 20, tags: ["gift box", "everyday"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Friendship Duo Set", slug: "friendship-duo-set", description: "Matching bracelet set for two with heart charms.", price: 1800, imageUrl: "/images/products/friendship-duo-set.jpg", categorySlug: "gift-sets", isNew: false, discount: null, tags: ["friendship set", "matching"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Moonstone Pendant", slug: "moonstone-pendant", description: "Ethereal moonstone pendant set in a gold-plated bezel.", price: 2000, imageUrl: "/images/products/moonstone-pendant.jpg", categorySlug: "new-arrivals", isNew: true, discount: null, tags: ["moonstone", "pendant"], isFeatured: true, metaTitle: null, metaDesc: null },
    { name: "Twisted Cuff Bracelet", slug: "twisted-cuff-bracelet", description: "Bold twisted cuff bracelet in polished gold.", price: 1700, imageUrl: "/images/products/twisted-cuff-bracelet.jpg", categorySlug: "new-arrivals", isNew: true, discount: 10, tags: ["cuff bracelet", "twisted"], isFeatured: false, metaTitle: null, metaDesc: null },
    { name: "Emerald Drop Earrings", slug: "emerald-drop-earrings", description: "Stunning emerald-green crystal drop earrings.", price: 1100, imageUrl: "/images/products/emerald-drop-earrings.jpg", categorySlug: "new-arrivals", isNew: true, discount: null, tags: ["emerald earrings", "statement"], isFeatured: true, metaTitle: null, metaDesc: null },
  ];

  for (const product of productsData) {
    const { categorySlug, ...data } = product;
    await prisma.product.upsert({
      where: { slug: data.slug },
      update: {},
      create: {
        ...data,
        categoryId: categories[categorySlug],
      },
    });
    console.log(`  ✓ Product: ${data.name}`);
  }

  console.log("\n✅ Seed completed successfully!");
  console.log(`   ${categoriesData.length} categories`);
  console.log(`   ${productsData.length} products`);
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

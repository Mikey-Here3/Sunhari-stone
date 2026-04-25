// ============================================
// Static Data & Data Fetching Layer
// Falls back to static data when DB is unavailable
// ============================================

// --- Type Definitions ---
export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  category?: Category;
  isNew: boolean;
  discount: number | null;
  tags: string[];
  metaTitle: string | null;
  metaDesc: string | null;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
}

// --- Static Categories ---
export const categories: Category[] = [
  {
    id: "cat-rings",
    name: "Rings",
    slug: "rings",
    imageUrl: "/images/categories/rings.jpg",
  },
  {
    id: "cat-scrunchies",
    name: "Scrunchies",
    slug: "scrunchies",
    imageUrl: "/images/categories/scrunchies.jpg",
  },
  {
    id: "cat-hair-clips",
    name: "Hair Clips",
    slug: "hair-clips",
    imageUrl: "/images/categories/hair-clips.jpg",
  },
  {
    id: "cat-necklaces",
    name: "Necklaces",
    slug: "necklaces",
    imageUrl: "/images/categories/necklaces.jpg",
  },
  {
    id: "cat-bracelets",
    name: "Bracelets",
    slug: "bracelets",
    imageUrl: "/images/categories/bracelets.jpg",
  },
  {
    id: "cat-earrings",
    name: "Earrings",
    slug: "earrings",
    imageUrl: "/images/categories/earrings.jpg",
  },
  {
    id: "cat-gift-sets",
    name: "Gift Sets",
    slug: "gift-sets",
    imageUrl: "/images/categories/gift-sets.jpg",
  },
  {
    id: "cat-new-arrivals",
    name: "New Arrivals",
    slug: "new-arrivals",
    imageUrl: "/images/categories/new-arrivals.jpg",
  },
];

// --- Static Products (sample data) ---
export const products: Product[] = [
  // ---- RINGS ----
  {
    id: "prod-1",
    name: "Golden Bloom Ring",
    slug: "golden-bloom-ring",
    description:
      "A delicate gold-plated ring featuring intricate floral engravings. Perfect for everyday elegance. Adjustable band fits most sizes.",
    price: 1200,
    imageUrl: "/images/products/golden-bloom-ring.jpg",
    categoryId: "cat-rings",
    isNew: true,
    discount: null,
    tags: ["gold ring", "floral", "adjustable", "elegant"],
    metaTitle: "Golden Bloom Ring — Sunhari Stone",
    metaDesc: "Delicate gold-plated ring with floral engravings. Adjustable & elegant.",
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-01"),
  },
  {
    id: "prod-2",
    name: "Pearl Twist Ring",
    slug: "pearl-twist-ring",
    description:
      "Stunning twisted band ring adorned with a natural freshwater pearl. A timeless piece that elevates any look.",
    price: 1500,
    imageUrl: "/images/products/pearl-twist-ring.jpg",
    categoryId: "cat-rings",
    isNew: false,
    discount: 15,
    tags: ["pearl ring", "twist band", "freshwater pearl"],
    metaTitle: "Pearl Twist Ring — Sunhari Stone",
    metaDesc: "Twisted band ring with natural freshwater pearl. Timeless elegance.",
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-03-15"),
  },
  {
    id: "prod-3",
    name: "Crystal Solitaire Ring",
    slug: "crystal-solitaire-ring",
    description:
      "Classic solitaire-style ring featuring a brilliant cubic zirconia stone set in a polished gold band.",
    price: 1800,
    imageUrl: "/images/products/crystal-solitaire-ring.jpg",
    categoryId: "cat-rings",
    isNew: false,
    discount: null,
    tags: ["crystal ring", "solitaire", "cubic zirconia", "gold band"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-02-20"),
  },

  // ---- SCRUNCHIES ----
  {
    id: "prod-4",
    name: "Silk Champagne Scrunchie",
    slug: "silk-champagne-scrunchie",
    description:
      "Luxurious 100% mulberry silk scrunchie in champagne gold. Gentle on hair, prevents breakage and frizz.",
    price: 450,
    imageUrl: "/images/products/silk-champagne-scrunchie.jpg",
    categoryId: "cat-scrunchies",
    isNew: true,
    discount: null,
    tags: ["silk scrunchie", "champagne", "hair care", "anti-frizz"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-10"),
  },
  {
    id: "prod-5",
    name: "Velvet Rose Scrunchie Set",
    slug: "velvet-rose-scrunchie-set",
    description:
      "Set of 3 premium velvet scrunchies in rose, blush, and ivory tones. Ultra-soft and gentle on all hair types.",
    price: 800,
    imageUrl: "/images/products/velvet-rose-scrunchie-set.jpg",
    categoryId: "cat-scrunchies",
    isNew: false,
    discount: 10,
    tags: ["velvet scrunchie", "set of 3", "rose", "hair accessories"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "prod-6",
    name: "Satin Pearl Scrunchie",
    slug: "satin-pearl-scrunchie",
    description:
      "Elegant satin scrunchie with delicate pearl embellishments. Perfect for special occasions.",
    price: 550,
    imageUrl: "/images/products/satin-pearl-scrunchie.jpg",
    categoryId: "cat-scrunchies",
    isNew: false,
    discount: null,
    tags: ["satin scrunchie", "pearl", "special occasion"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-02-10"),
  },

  // ---- HAIR CLIPS ----
  {
    id: "prod-7",
    name: "Pearl Claw Clip",
    slug: "pearl-claw-clip",
    description:
      "Oversized claw clip studded with faux pearls. Strong hold for thick hair. A statement piece for every day.",
    price: 650,
    imageUrl: "/images/products/pearl-claw-clip.jpg",
    categoryId: "cat-hair-clips",
    isNew: true,
    discount: null,
    tags: ["pearl clip", "claw clip", "hair clip", "oversized"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-12"),
  },
  {
    id: "prod-8",
    name: "Crystal Butterfly Clip",
    slug: "crystal-butterfly-clip",
    description:
      "Sparkling crystal butterfly hair clip. Adds a touch of whimsy and glamour to any hairstyle.",
    price: 750,
    imageUrl: "/images/products/crystal-butterfly-clip.jpg",
    categoryId: "cat-hair-clips",
    isNew: false,
    discount: 20,
    tags: ["crystal clip", "butterfly", "glamour", "sparkle"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-03-05"),
  },
  {
    id: "prod-9",
    name: "Minimalist Gold Barrette",
    slug: "minimalist-gold-barrette",
    description:
      "Sleek, minimalist gold-toned barrette. Clean lines for a polished, modern look.",
    price: 400,
    imageUrl: "/images/products/minimalist-gold-barrette.jpg",
    categoryId: "cat-hair-clips",
    isNew: false,
    discount: null,
    tags: ["barrette", "gold", "minimalist", "modern"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-01-20"),
  },

  // ---- NECKLACES ----
  {
    id: "prod-10",
    name: "Layered Gold Chain",
    slug: "layered-gold-chain",
    description:
      "Three-layer gold-plated chain necklace with varying lengths. Create a chic layered look in one piece.",
    price: 2200,
    imageUrl: "/images/products/layered-gold-chain.jpg",
    categoryId: "cat-necklaces",
    isNew: true,
    discount: null,
    tags: ["layered necklace", "gold chain", "multi-layer", "chic"],
    metaTitle: "Layered Gold Chain Necklace — Sunhari Stone",
    metaDesc: "Three-layer gold-plated chain necklace. Create a chic layered look.",
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-08"),
  },
  {
    id: "prod-11",
    name: "Heart Pendant Necklace",
    slug: "heart-pendant-necklace",
    description:
      "Dainty heart-shaped pendant on a delicate gold chain. A heartfelt gift for someone special.",
    price: 1800,
    imageUrl: "/images/products/heart-pendant-necklace.jpg",
    categoryId: "cat-necklaces",
    isNew: false,
    discount: null,
    tags: ["heart pendant", "gold necklace", "gift", "dainty"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-03-10"),
  },
  {
    id: "prod-12",
    name: "Pearl Choker Necklace",
    slug: "pearl-choker-necklace",
    description:
      "Classic pearl choker with a modern twist. Features graduated freshwater pearls with gold clasp.",
    price: 2800,
    imageUrl: "/images/products/pearl-choker-necklace.jpg",
    categoryId: "cat-necklaces",
    isNew: false,
    discount: 10,
    tags: ["pearl choker", "freshwater pearls", "classic", "elegant"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-02-15"),
  },

  // ---- BRACELETS ----
  {
    id: "prod-13",
    name: "Crystal Charm Bracelet",
    slug: "crystal-charm-bracelet",
    description:
      "Adjustable gold bracelet with dangling crystal charms. Each charm catches light beautifully.",
    price: 1600,
    imageUrl: "/images/products/crystal-charm-bracelet.jpg",
    categoryId: "cat-bracelets",
    isNew: true,
    discount: null,
    tags: ["charm bracelet", "crystal", "adjustable", "gold"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-05"),
  },
  {
    id: "prod-14",
    name: "Bangle Set — Rose Gold",
    slug: "bangle-set-rose-gold",
    description:
      "Set of 5 thin bangles in rose gold finish. Stack them for a trendy, bohemian-inspired look.",
    price: 1200,
    imageUrl: "/images/products/bangle-set-rose-gold.jpg",
    categoryId: "cat-bracelets",
    isNew: false,
    discount: 15,
    tags: ["bangle set", "rose gold", "stacking", "bohemian"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-03-20"),
  },
  {
    id: "prod-15",
    name: "Pearl Link Bracelet",
    slug: "pearl-link-bracelet",
    description:
      "Gold chain-link bracelet with pearl accents at each link. Sophisticated and versatile.",
    price: 1400,
    imageUrl: "/images/products/pearl-link-bracelet.jpg",
    categoryId: "cat-bracelets",
    isNew: false,
    discount: null,
    tags: ["pearl bracelet", "chain link", "gold", "sophisticated"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-02-01"),
  },

  // ---- EARRINGS ----
  {
    id: "prod-16",
    name: "Gold Hoop Earrings",
    slug: "gold-hoop-earrings",
    description:
      "Medium-sized gold hoops with a hammered texture. Lightweight and comfortable for all-day wear.",
    price: 900,
    imageUrl: "/images/products/gold-hoop-earrings.jpg",
    categoryId: "cat-earrings",
    isNew: true,
    discount: null,
    tags: ["hoop earrings", "gold", "hammered", "lightweight"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-15"),
  },
  {
    id: "prod-17",
    name: "Pearl Drop Earrings",
    slug: "pearl-drop-earrings",
    description:
      "Elegant drop earrings featuring freshwater pearls on slender gold chains. Perfect for weddings.",
    price: 1300,
    imageUrl: "/images/products/pearl-drop-earrings.jpg",
    categoryId: "cat-earrings",
    isNew: false,
    discount: null,
    tags: ["pearl earrings", "drop earrings", "wedding", "bridal"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-03-12"),
  },
  {
    id: "prod-18",
    name: "Crystal Stud Earrings",
    slug: "crystal-stud-earrings",
    description:
      "Dainty crystal stud earrings with a secure push-back closure. Sparkle for everyday elegance.",
    price: 600,
    imageUrl: "/images/products/crystal-stud-earrings.jpg",
    categoryId: "cat-earrings",
    isNew: false,
    discount: 25,
    tags: ["stud earrings", "crystal", "everyday", "sparkle"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-01-25"),
  },

  // ---- GIFT SETS ----
  {
    id: "prod-19",
    name: "Bridal Elegance Gift Set",
    slug: "bridal-elegance-gift-set",
    description:
      "Complete bridal set including necklace, earrings, and bracelet in matching gold & pearl design. Beautifully gift-boxed.",
    price: 5500,
    imageUrl: "/images/products/bridal-elegance-gift-set.jpg",
    categoryId: "cat-gift-sets",
    isNew: true,
    discount: null,
    tags: ["bridal set", "gift set", "pearl", "gold", "wedding"],
    metaTitle: "Bridal Elegance Gift Set — Sunhari Stone",
    metaDesc: "Complete bridal jewelry set with necklace, earrings, and bracelet. Gift-boxed.",
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-18"),
  },
  {
    id: "prod-20",
    name: "Everyday Essentials Box",
    slug: "everyday-essentials-box",
    description:
      "Curated set of 5 everyday pieces: 2 rings, hoop earrings, a bracelet, and a scrunchie. Perfect starter collection.",
    price: 3200,
    imageUrl: "/images/products/everyday-essentials-box.jpg",
    categoryId: "cat-gift-sets",
    isNew: false,
    discount: 20,
    tags: ["gift box", "everyday jewelry", "starter set", "curated"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "prod-21",
    name: "Friendship Duo Set",
    slug: "friendship-duo-set",
    description:
      "Matching bracelet set for two. Gold chain with heart charms — one for you, one for your bestie.",
    price: 1800,
    imageUrl: "/images/products/friendship-duo-set.jpg",
    categoryId: "cat-gift-sets",
    isNew: false,
    discount: null,
    tags: ["friendship set", "matching bracelets", "heart charm", "bestie"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-02-14"),
  },

  // ---- NEW ARRIVALS ----
  {
    id: "prod-22",
    name: "Moonstone Pendant",
    slug: "moonstone-pendant",
    description:
      "Ethereal moonstone pendant set in a gold-plated bezel on a fine chain. The stone shimmers with iridescent light.",
    price: 2000,
    imageUrl: "/images/products/moonstone-pendant.jpg",
    categoryId: "cat-new-arrivals",
    isNew: true,
    discount: null,
    tags: ["moonstone", "pendant", "iridescent", "ethereal"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-20"),
  },
  {
    id: "prod-23",
    name: "Twisted Cuff Bracelet",
    slug: "twisted-cuff-bracelet",
    description:
      "Bold twisted cuff bracelet in polished gold. Adjustable open cuff design fits most wrist sizes.",
    price: 1700,
    imageUrl: "/images/products/twisted-cuff-bracelet.jpg",
    categoryId: "cat-new-arrivals",
    isNew: true,
    discount: 10,
    tags: ["cuff bracelet", "twisted", "gold", "bold"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: false,
    isActive: true,
    createdAt: new Date("2025-04-19"),
  },
  {
    id: "prod-24",
    name: "Emerald Drop Earrings",
    slug: "emerald-drop-earrings",
    description:
      "Stunning emerald-green crystal drop earrings set in gold. A pop of color for any outfit.",
    price: 1100,
    imageUrl: "/images/products/emerald-drop-earrings.jpg",
    categoryId: "cat-new-arrivals",
    isNew: true,
    discount: null,
    tags: ["emerald earrings", "drop earrings", "green crystal", "statement"],
    metaTitle: null,
    metaDesc: null,
    isFeatured: true,
    isActive: true,
    createdAt: new Date("2025-04-22"),
  },
];

// --- Helper function to attach category to product ---
function withCategory(product: Product): Product {
  const category = categories.find((c) => c.id === product.categoryId);
  return { ...product, category };
}

// ============================================
// Data Fetching Functions
// Try Prisma first, fall back to static data
// ============================================

/**
 * Get all active products
 */
export async function getProducts(): Promise<Product[]> {
  try {
    // Try database first
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("./prisma");
      const dbProducts = await prisma.product.findMany({
        where: { isActive: true },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      return dbProducts as unknown as Product[];
    }
  } catch {
    console.log("Database unavailable, using static data");
  }
  // Fallback to static data
  return products.filter((p) => p.isActive).map(withCategory);
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("./prisma");
      const dbCategories = await prisma.category.findMany({
        orderBy: { name: "asc" },
      });
      return dbCategories as unknown as Category[];
    }
  } catch {
    console.log("Database unavailable, using static data");
  }
  return categories;
}

/**
 * Get a single product by its slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("./prisma");
      const dbProduct = await prisma.product.findUnique({
        where: { slug },
        include: { category: true },
      });
      return dbProduct as unknown as Product;
    }
  } catch {
    console.log("Database unavailable, using static data");
  }
  const product = products.find((p) => p.slug === slug);
  return product ? withCategory(product) : null;
}

/**
 * Get products filtered by category slug
 */
export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("./prisma");
      const dbProducts = await prisma.product.findMany({
        where: {
          isActive: true,
          category: { slug: categorySlug },
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      return dbProducts as unknown as Product[];
    }
  } catch {
    console.log("Database unavailable, using static data");
  }
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return [];
  return products.filter((p) => p.categoryId === category.id && p.isActive).map(withCategory);
}

/**
 * Get featured products
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("./prisma");
      const dbProducts = await prisma.product.findMany({
        where: { isActive: true, isFeatured: true },
        include: { category: true },
        orderBy: { createdAt: "desc" },
        take: 8,
      });
      return dbProducts as unknown as Product[];
    }
  } catch {
    console.log("Database unavailable, using static data");
  }
  return products.filter((p) => p.isFeatured && p.isActive).map(withCategory).slice(0, 8);
}

/**
 * Search products by name or description
 */
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    if (process.env.DATABASE_URL) {
      const { default: prisma } = await import("./prisma");
      const dbProducts = await prisma.product.findMany({
        where: {
          isActive: true,
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { tags: { hasSome: [query.toLowerCase()] } },
          ],
        },
        include: { category: true },
        orderBy: { createdAt: "desc" },
      });
      return dbProducts as unknown as Product[];
    }
  } catch {
    console.log("Database unavailable, using static data");
  }
  const q = query.toLowerCase();
  return products
    .filter(
      (p) =>
        p.isActive &&
        (p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)))
    )
    .map(withCategory);
}

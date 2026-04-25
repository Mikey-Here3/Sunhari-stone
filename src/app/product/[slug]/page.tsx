// ============================================
// Product Detail Page — Dynamic Route
// Shows full product info with WhatsApp order
// ============================================

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import ProductCard from "@/components/ProductCard";
import {
  getProductBySlug,
  getProducts,
  getProductsByCategory,
} from "@/lib/data";
import {
  formatPrice,
  getDiscountedPrice,
  SITE_NAME,
} from "@/lib/utils";

// Generate dynamic SEO metadata for each product
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.metaTitle || product.name,
    description:
      product.metaDesc ||
      `${product.description.substring(0, 155)}...`,
    openGraph: {
      title: `${product.name} — ${SITE_NAME}`,
      description: product.metaDesc || product.description,
      images: [{ url: product.imageUrl }],
    },
    keywords: product.tags,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  // Show 404 if product not found
  if (!product) {
    notFound();
  }

  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = getDiscountedPrice(product.price, product.discount);

  // Get related products (same category, excluding current)
  let relatedProducts = product.category
    ? await getProductsByCategory(product.category.slug)
    : await getProducts();
  relatedProducts = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-16 bg-ivory min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-charcoal-light">
            <li>
              <Link href="/" className="hover:text-gold transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/shop" className="hover:text-gold transition-colors">
                Shop
              </Link>
            </li>
            {product.category && (
              <>
                <li>/</li>
                <li>
                  <Link
                    href={`/shop?category=${product.category.slug}`}
                    className="hover:text-gold transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </li>
              </>
            )}
            <li>/</li>
            <li className="text-charcoal font-medium truncate">
              {product.name}
            </li>
          </ol>
        </nav>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-beige relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="badge-new text-sm px-4 py-1">New</span>
                )}
                {hasDiscount && (
                  <span className="badge-discount text-sm px-4 py-1">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category Tag */}
            {product.category && (
              <Link
                href={`/shop?category=${product.category.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium tracking-[0.15em] uppercase text-gold hover:text-gold-dark transition-colors mb-3"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                {product.category.name}
              </Link>
            )}

            {/* Product Name */}
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-charcoal">
                {formatPrice(finalPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-charcoal-light/50 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Save {formatPrice(product.price - finalPrice)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-base text-charcoal-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-beige text-charcoal-light px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-border mb-8" />

            {/* WhatsApp Order Button */}
            <div className="max-w-sm">
              <WhatsAppButton
                productName={product.name}
                price={product.price}
                discount={product.discount}
                size="large"
              />
            </div>

            {/* Trust Info */}
            <div className="flex items-center gap-6 mt-6 text-xs text-charcoal-light">
              <div className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gold"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                Quality Assured
              </div>
              <div className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-gold"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                Fast Delivery
              </div>
            </div>
          </div>
        </div>

        {/* ---- RELATED PRODUCTS ---- */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-10">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
                You May Also Like
              </p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-charcoal mb-4">
                Related Products
              </h2>
              <div className="section-divider" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

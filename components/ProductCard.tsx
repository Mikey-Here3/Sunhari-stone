// ============================================
// ProductCard Component
// Displays product with image, price, badges
// ============================================

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/data";
import { formatPrice, getDiscountedPrice } from "@/lib/utils";
import WhatsAppButton from "./WhatsAppButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.discount && product.discount > 0;
  const finalPrice = getDiscountedPrice(product.price, product.discount);

  return (
    <article
      className="group bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-border/40 hover:shadow-2xl hover:shadow-gold/10 transition-all duration-500 flex flex-col h-full"
      id={`product-card-${product.slug}`}
    >
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden">
        <div className="relative aspect-[4/5] sm:aspect-square bg-beige overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />

          {/* Badges Container */}
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1.5 sm:gap-2 z-10">
            {product.isNew && (
              <span className="bg-gold text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                New
              </span>
            )}
            {hasDiscount && (
              <span className="bg-red-500 text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-lg">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Quick View Overlay (Hidden on Mobile) */}
          <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center">
            <span className="bg-white text-charcoal px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              View Details
            </span>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="flex-1">
          {/* Category Tag */}
          {product.category && (
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="text-[10px] sm:text-xs font-bold text-gold/70 uppercase tracking-[0.15em] hover:text-gold transition-colors"
            >
              {product.category.name}
            </Link>
          )}

          {/* Product Name */}
          <Link href={`/product/${product.slug}`}>
            <h3 className="font-heading text-sm sm:text-lg font-bold text-charcoal mt-1 mb-1.5 group-hover:text-gold transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Price Section */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 mb-4">
            <span className="text-base sm:text-xl font-bold text-charcoal">
              {formatPrice(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-[10px] sm:text-sm text-charcoal-light/40 line-through font-medium">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-2">
          <WhatsAppButton
            productName={product.name}
            price={product.price}
            discount={product.discount}
            size="small"
          />
        </div>
      </div>
    </article>
  );
}

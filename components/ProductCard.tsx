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
      className="group bg-white rounded-2xl overflow-hidden border border-border/50 hover-lift"
      id={`product-card-${product.slug}`}
    >
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square img-zoom bg-beige">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover"
            loading="lazy"
          />

          {/* Badges Container */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && <span className="badge-new">New</span>}
            {hasDiscount && (
              <span className="badge-discount">{product.discount}% OFF</span>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-300" />
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        {/* Category Tag */}
        {product.category && (
          <Link
            href={`/shop?category=${product.category.slug}`}
            className="text-xs font-medium text-gold uppercase tracking-wider hover:text-gold-dark transition-colors"
          >
            {product.category.name}
          </Link>
        )}

        {/* Product Name */}
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-heading text-base font-semibold text-charcoal mt-1 mb-2 group-hover:text-gold transition-colors duration-300 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-semibold text-charcoal">
            {formatPrice(finalPrice)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-charcoal-light/50 line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        {/* WhatsApp Order Button */}
        <WhatsAppButton
          productName={product.name}
          price={product.price}
          discount={product.discount}
          size="small"
        />
      </div>
    </article>
  );
}

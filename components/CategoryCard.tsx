// ============================================
// CategoryCard Component
// Links to filtered shop page for a category
// ============================================

import Image from "next/image";
import Link from "next/link";
import { Category } from "@/lib/data";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/shop?category=${category.slug}`}
      className="group relative block overflow-hidden rounded-2xl aspect-[4/3] hover-lift"
      id={`category-card-${category.slug}`}
    >
      {/* Background Image */}
      <Image
        src={category.imageUrl}
        alt={category.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover group-hover:scale-110 transition-transform duration-700"
        loading="lazy"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent group-hover:from-charcoal/80 transition-colors duration-300" />

      {/* Category Name */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <h3 className="font-heading text-lg sm:text-xl font-semibold text-white group-hover:text-gold-light transition-colors duration-300">
          {category.name}
        </h3>
        <div className="flex items-center gap-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs text-white/70">Shop Now</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-gold-light transform group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

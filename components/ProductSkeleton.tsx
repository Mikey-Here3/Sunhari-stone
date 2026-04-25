// ============================================
// ProductSkeleton Component
// Shimmer loading skeleton for product cards
// ============================================

export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-border/50 animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square shimmer-bg" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Category tag */}
        <div className="h-3 w-16 shimmer-bg rounded" />

        {/* Product name */}
        <div className="h-5 w-3/4 shimmer-bg rounded" />

        {/* Price */}
        <div className="h-5 w-20 shimmer-bg rounded" />

        {/* Button */}
        <div className="h-10 w-full shimmer-bg rounded-full" />
      </div>
    </div>
  );
}

/**
 * Grid of skeleton cards for loading states
 */
export function ProductSkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

// ============================================
// Home Page — Sunhari Stone
// Hero, Featured Products, Categories, CTA
// ============================================

import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { getFeaturedProducts, getCategories } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Fetch data server-side
  const [featuredProducts, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <>
      {/* ---- HERO SECTION ---- */}
      <HeroSection />

      {/* ---- FEATURED PRODUCTS ---- */}
      <section className="py-16 sm:py-24 bg-ivory" id="featured-products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
              Curated for You
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Featured Collection
            </h2>
            <div className="section-divider" />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 border-2 border-gold text-gold px-8 py-3 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-gold hover:text-white transition-all duration-300"
              id="view-all-products"
            >
              View All Products
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ---- CATEGORIES ---- */}
      <section className="py-16 sm:py-24 bg-cream" id="categories-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
              Browse By
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Shop Categories
            </h2>
            <div className="section-divider" />
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* ---- WHY CHOOSE US ---- */}
      <section className="py-16 sm:py-24 bg-ivory" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
              Why Choose Us
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              The Sunhari Promise
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Feature 1 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Handcrafted with Love
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Every piece is carefully crafted by skilled artisans, ensuring
                unique beauty in every design.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                We use premium materials and rigorous quality checks to ensure
                long-lasting elegance.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gold">
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Fast & Safe Delivery
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Secure packaging and swift delivery across Pakistan. Your order
                is in safe hands.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA SECTION ---- */}
      <section className="py-16 sm:py-24 bg-charcoal relative overflow-hidden" id="cta-section">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gold/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full translate-x-1/3 translate-y-1/3" />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
            Ready to Shop?
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Find Your Perfect Piece
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Browse our entire collection and order directly via WhatsApp. No
            sign-up needed — just pick, chat, and shine!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-all duration-300"
            >
              Browse Collection
            </Link>
            <a
              href={`https://wa.me/923358432540?text=${encodeURIComponent("Hi! I'm interested in your jewelry collection.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat with Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

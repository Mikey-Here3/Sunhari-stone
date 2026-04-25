// ============================================
// HeroSection Component
// Full-width hero with brand intro and CTA
// ============================================

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center" id="hero-section">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero-banner.png"
          alt="Sunhari Stone — Elegant Jewelry Collection"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/90 via-ivory/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-xl">
          {/* Decorative Line */}
          <div className="w-12 h-0.5 bg-gold mb-6 animate-fade-in" />

          {/* Tagline */}
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-gold mb-4 animate-fade-in">
            Handcrafted with Love
          </p>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal leading-tight mb-6 animate-slide-up">
            Adorn Your
            <br />
            <span className="text-gradient-gold">Unique Beauty</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-charcoal-light leading-relaxed mb-8 max-w-md animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Discover exquisite jewelry and accessories that celebrate the
            radiance within you. Each piece, a story waiting to be told.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:bg-gold-dark transition-all duration-300 hover:shadow-lg hover:shadow-gold/20"
              id="hero-shop-now"
            >
              Shop Now
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
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border-2 border-charcoal/20 text-charcoal px-8 py-3.5 rounded-full font-semibold text-sm uppercase tracking-wider hover:border-gold hover:text-gold transition-all duration-300"
              id="hero-our-story"
            >
              Our Story
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center gap-6 mt-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="flex items-center gap-2 text-xs text-charcoal-light">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              Handcrafted
            </div>
            <div className="flex items-center gap-2 text-xs text-charcoal-light">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Quality Assured
            </div>
            <div className="flex items-center gap-2 text-xs text-charcoal-light">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gold">
                <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Fast Delivery
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

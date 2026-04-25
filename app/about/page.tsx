// ============================================
// About Page — Brand Story
// Elegant text layout with brand narrative
// ============================================

import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Sunhari Stone — a jewelry brand born from a passion for elegance, craftsmanship, and celebrating the unique beauty in every woman.",
  openGraph: {
    title: "About Us — Sunhari Stone",
    description:
      "Discover the story behind Sunhari Stone — a jewelry brand born from a passion for elegance and craftsmanship.",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-ivory min-h-screen">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-3">
                Our Story
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-charcoal mb-6 leading-tight">
                Where Elegance
                <br />
                Meets <span className="text-gradient-gold">Artistry</span>
              </h1>
              <div className="w-12 h-0.5 bg-gold mb-6" />
              <p className="text-base text-charcoal-light leading-relaxed mb-4">
                <strong className="text-charcoal">Sunhari Stone</strong> was
                born from a simple belief: every woman deserves to feel
                extraordinary. We started as a small passion project, hand-selecting
                and crafting pieces that celebrate femininity, grace, and the
                radiant beauty that exists within each of us.
              </p>
              <p className="text-base text-charcoal-light leading-relaxed mb-4">
                The name <em>&quot;Sunhari&quot;</em> — meaning{" "}
                <em>&quot;golden&quot;</em> in Urdu — reflects our commitment to
                warmth, richness, and timeless elegance. Just like gold stands
                the test of time, so do our values of quality, authenticity, and
                heartfelt craftsmanship.
              </p>
              <p className="text-base text-charcoal-light leading-relaxed">
                Today, our collection spans from delicate everyday rings to
                statement necklaces, from luxurious silk scrunchies to curated
                gift sets. Every piece is chosen — and often handcrafted — with
                love, care, and an unwavering eye for detail.
              </p>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-beige">
                <Image
                  src="/images/hero/hero-banner.png"
                  alt="Sunhari Stone — Our Story"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl border-2 border-gold/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-gold mb-2">
              What We Believe
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Our Values
            </h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-border/50 hover-lift">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Quality First
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                We never compromise on quality. Every material is hand-selected,
                every finish is inspected to ensure lasting beauty.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-border/50 hover-lift">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Made with Heart
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                Each piece carries the warmth of human touch. Our artisans pour
                their passion into every design.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-2xl p-8 text-center border border-border/50 hover-lift">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-gold"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-semibold text-charcoal mb-2">
                Accessible Luxury
              </h3>
              <p className="text-sm text-charcoal-light leading-relaxed">
                We believe luxury should be within reach. Beautiful jewelry at
                prices that make you smile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 sm:py-24 bg-ivory">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto mb-6 text-gold/30"
          >
            <path
              d="M10 11H5.4c.3-2.3 2-4 4.6-4V4C5.4 4 2 7.4 2 12v7h8v-8zm12 0h-4.6c.3-2.3 2-4 4.6-4V4c-4.6 0-8 3.4-8 8v7h8v-8z"
              fill="currentColor"
            />
          </svg>
          <blockquote className="font-heading text-2xl sm:text-3xl font-semibold text-charcoal italic leading-relaxed mb-6">
            &quot;Jewelry is not just an accessory — it is a reflection of who
            you are and who you aspire to be.&quot;
          </blockquote>
          <p className="text-sm text-gold font-medium uppercase tracking-wider">
            — The Sunhari Stone Team
          </p>
        </div>
      </section>
    </div>
  );
}

// ============================================
// Utility Functions for Sunhari Stone
// ============================================

// WhatsApp number (Pakistan format, no + prefix)
export const WHATSAPP_NUMBER = "923358432540";
export const INSTAGRAM_HANDLE = "SunhariStone";
export const SITE_NAME = "Sunhari Stone";
export const CURRENCY = "PKR";
export const CURRENCY_SYMBOL = "₨";

/**
 * Format price in PKR with comma separators
 * Example: 2500 → "₨ 2,500"
 */
export function formatPrice(price: number): string {
  return `${CURRENCY_SYMBOL} ${price.toLocaleString("en-PK")}`;
}

/**
 * Calculate discounted price
 * Example: price=1000, discount=20 → 800
 */
export function getDiscountedPrice(price: number, discount: number | null | undefined): number {
  if (!discount) return price;
  return Math.round(price - (price * discount) / 100);
}

/**
 * Generate WhatsApp order URL with pre-filled message
 */
export function getWhatsAppOrderUrl(productName: string, price: number, discount?: number | null): string {
  const finalPrice = getDiscountedPrice(price, discount);
  const message = `Hi, I want to order: ${productName} - Price: ${formatPrice(finalPrice)}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Generate WhatsApp direct chat URL
 */
export function getWhatsAppChatUrl(message?: string): string {
  const defaultMsg = "Hi! I'm interested in your jewelry collection.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message || defaultMsg)}`;
}

/**
 * Convert a string to URL-friendly slug
 * Example: "Gold Ring Set" → "gold-ring-set"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/**
 * Get Instagram profile URL
 */
export function getInstagramUrl(): string {
  return `https://instagram.com/${INSTAGRAM_HANDLE}`;
}

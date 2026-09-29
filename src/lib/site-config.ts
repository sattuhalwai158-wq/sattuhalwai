/**
 * Central Site Configuration for N Sattu Cuisine / Sattu Halwai
 * Used for canonical URLs, SEO metadata, Open Graph, Sitemap and Structured Data (JSON-LD).
 * Easily updated when switching to a custom domain.
 */

export const SITE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SITE_URL"]) ||
  (typeof process !== "undefined" && process.env?.["SITE_URL"]) ||
  "https://sattuhalwai.vercel.app";

/**
 * Returns a fully-qualified canonical URL for a given relative path.
 */
export function absoluteUrl(path = "/"): string {
  const base = SITE_URL.replace(/\/+$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath === "/" ? "" : cleanPath}`;
}

export const BUSINESS_CONFIG = {
  name: "N Sattu Cuisine",
  legalName: "N Sattu Cuisine / Sattu Halwai",
  alternateNames: ["Sattu Halwai", "N-Sattu Cuisine", "Sattu Halwai Ajmer", "N Sattu Catering"],
  tagline: "Royal Wedding & Event Catering Specialist in Ajmer, Pushkar & Kishangarh",
  description:
    "Premier wedding caterers and traditional halwai in Ajmer, Rajasthan. Specializing in royal Marwari & Rajasthani banquets, pure desi ghee sweets, and theatrical live counters across Ajmer, Pushkar, and Kishangarh.",
  telephone: "+91 94604 26952",
  secondaryTelephone: "+91 99506 11631",
  whatsapp: "919460426952",
  email: "", // Left blank as not publicly specified in codebase
  logo: "/nsattu-logo.png",
  defaultOgImage: "/media/buffet-6.jpg",
  founders: [
    {
      name: "Nathu Ji Prajapati",
      role: "Founder",
      hi: "नाथू जी प्रजापति",
    },
    {
      name: "Satyanarayan Prajapati",
      role: "Managing Director",
      hi: "सत्यनारायण प्रजापति",
    },
    {
      name: "Chanchal Prajapati",
      role: "Chief Executive Officer",
      hi: "चंचल प्रजापति",
    },
  ],
  address: {
    streetAddress: "Ajmer, Rajasthan (Consultations by appointment)",
    addressLocality: "Ajmer",
    addressRegion: "Rajasthan",
    postalCode: "305001",
    addressCountry: "IN",
  },
  primaryCity: "Ajmer",
  serviceAreas: [
    { name: "Ajmer", state: "Rajasthan" },
    { name: "Pushkar", state: "Rajasthan" },
    { name: "Kishangarh", state: "Rajasthan" },
  ],
  servesCuisine: [
    "Rajasthani",
    "Marwari",
    "North Indian",
    "Traditional Halwai Mithai",
    "Pure Vegetarian",
    "Jain Catering (Separate Setup)",
    "Live Chaat & Counters",
  ],
  priceRange: "₹₹ - ₹₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Bank Transfer",
  socialLinks: {
    instagram: "https://instagram.com/sattu__halwai",
    youtube: "https://youtube.com/@SattuhalwaiAjmer",
  },
  experienceYears: "10+",
  eventsServed: "500+",
};

import { absoluteUrl, BUSINESS_CONFIG } from "@/lib/site-config";

export interface SeoOptions {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

/**
 * Builds rich, production-grade SEO head configuration for TanStack Start / Router routes.
 */
export function buildPageHead({
  title,
  description,
  path = "/",
  ogImage = BUSINESS_CONFIG.defaultOgImage,
  ogType = "website",
  noindex = false,
  structuredData,
}: SeoOptions) {
  const canonicalUrl = absoluteUrl(path);
  const ogImageUrl = ogImage.startsWith("http") ? ogImage : absoluteUrl(ogImage);

  const scripts: Array<{ type: string; children: string }> = [];

  if (structuredData) {
    const list = Array.isArray(structuredData) ? structuredData : [structuredData];
    for (const schema of list) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify(schema),
      });
    }
  }

  return {
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex
          ? "noindex, nofollow"
          : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      // Open Graph
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:type", content: ogType },
      { property: "og:image", content: ogImageUrl },
      { property: "og:site_name", content: BUSINESS_CONFIG.name },
      { property: "og:locale", content: "en_IN" },
      // Twitter / X
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImageUrl },
      // Geographic Local SEO
      { name: "geo.region", content: "IN-RJ" },
      { name: "geo.placename", content: "Ajmer" },
    ],
    links: [
      {
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    scripts,
  };
}

/**
 * Backwards-compatible pageMeta wrapper for simpler route declarations.
 */
export function pageMeta(
  title: string,
  description: string,
  path = "/",
  extra?: Partial<Omit<SeoOptions, "title" | "description" | "path">>,
) {
  return buildPageHead({
    title,
    description,
    path,
    ...extra,
  });
}

/**
 * Standard LocalBusiness / Catering FoodEstablishment Schema
 * Only uses strictly verified business information present in codebase.
 */
export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${absoluteUrl()}/#business`,
    name: BUSINESS_CONFIG.name,
    alternateName: BUSINESS_CONFIG.alternateNames,
    description: BUSINESS_CONFIG.description,
    url: absoluteUrl(),
    telephone: BUSINESS_CONFIG.telephone,
    priceRange: BUSINESS_CONFIG.priceRange,
    image: [
      absoluteUrl("/media/buffet-6.jpg"),
      absoluteUrl("/media/buffet-28.jpg"),
      absoluteUrl("/media/sweet-rose-platter.jpg"),
    ],
    logo: absoluteUrl(BUSINESS_CONFIG.logo),
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_CONFIG.address.streetAddress,
      addressLocality: BUSINESS_CONFIG.address.addressLocality,
      addressRegion: BUSINESS_CONFIG.address.addressRegion,
      postalCode: BUSINESS_CONFIG.address.postalCode,
      addressCountry: BUSINESS_CONFIG.address.addressCountry,
    },
    areaServed: BUSINESS_CONFIG.serviceAreas.map((area) => ({
      "@type": "City",
      name: area.name,
    })),
    servesCuisine: BUSINESS_CONFIG.servesCuisine,
    sameAs: [BUSINESS_CONFIG.socialLinks.instagram, BUSINESS_CONFIG.socialLinks.youtube].filter(
      Boolean,
    ),
    currenciesAccepted: BUSINESS_CONFIG.currenciesAccepted,
    paymentAccepted: BUSINESS_CONFIG.paymentAccepted,
  };
}

/**
 * BreadcrumbList Schema Generator
 */
export function buildBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/**
 * FAQPage Schema Generator
 */
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/**
 * Catering Service Schema Generator
 */
export function buildServiceSchema({
  name,
  description,
  serviceType,
  areaServed,
}: {
  name: string;
  description: string;
  serviceType: string;
  areaServed: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType,
    provider: {
      "@type": "LocalBusiness",
      name: BUSINESS_CONFIG.name,
      telephone: BUSINESS_CONFIG.telephone,
      url: absoluteUrl(),
    },
    areaServed: {
      "@type": "City",
      name: areaServed,
    },
  };
}

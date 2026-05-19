import { Helmet } from "react-helmet-async";

const SITE_ORIGIN = "https://bitstudio.co.zw";
const DEFAULT_IMAGE = "/logo.png";
const SITE_NAME = "Bit Studio";
const TWITTER_HANDLE = "@bitstudio";

/**
 * Per-route SEO head injector.
 *
 * Required: title (route-specific), description.
 * Optional: path (used to build canonical), image, type, jsonLd (array of objects).
 *
 * Examples:
 *   <SEO title="Work" description="..." path="/work" />
 *   <SEO title="Alliance Health" description="..." path="/work/alliance-health"
 *        image="/screens/alliance.png" jsonLd={[creativeWorkJsonLd]} />
 */
// Map of EN ↔ DE route equivalents. Used to emit hreflang annotations so
// Google serves the right locale to the right user.
const HREFLANG_PAIRS = {
  "/": { en: "/", de: "/de" },
  "/de": { en: "/", de: "/de" },
  "/craft": { en: "/craft", de: "/de/handwerk" },
  "/de/handwerk": { en: "/craft", de: "/de/handwerk" },
  "/contact": { en: "/contact", de: "/de/kontakt" },
  "/de/kontakt": { en: "/contact", de: "/de/kontakt" },
  "/legal": { en: "/legal", de: "/impressum" },
  "/impressum": { en: "/legal", de: "/impressum" },
  "/privacy": { en: "/privacy", de: "/datenschutz" },
  "/datenschutz": { en: "/privacy", de: "/datenschutz" },
  "/packages": { en: "/packages", de: "/pakete" },
  "/pakete": { en: "/packages", de: "/pakete" },
};

export default function SEO({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd = [],
  keywords = [],
}) {
  const url = path.startsWith("http") ? path : `${SITE_ORIGIN}${path}`;
  const fullTitle =
    title && title !== SITE_NAME ? `${title} — ${SITE_NAME}` : SITE_NAME;
  const imageAbs = image.startsWith("http") ? image : `${SITE_ORIGIN}${image}`;
  const isDE = path === "/de" || path.startsWith("/de/");
  const langTag = isDE ? "de" : "en";
  const hreflang = HREFLANG_PAIRS[path];

  return (
    <Helmet prioritizeSeoTags htmlAttributes={{ lang: langTag }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(", ")} />
      )}
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* Hreflang annotations — only emitted on pages with a known EN/DE pair */}
      {hreflang && (
        <link rel="alternate" hrefLang="en" href={`${SITE_ORIGIN}${hreflang.en}`} />
      )}
      {hreflang && (
        <link rel="alternate" hrefLang="de" href={`${SITE_ORIGIN}${hreflang.de}`} />
      )}
      {hreflang && (
        <link rel="alternate" hrefLang="x-default" href={`${SITE_ORIGIN}${hreflang.en}`} />
      )}

      <meta property="og:locale" content={isDE ? "de_DE" : "en_US"} />
      {hreflang && (
        <meta property="og:locale:alternate" content={isDE ? "en_US" : "de_DE"} />
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageAbs} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageAbs} />

      {/* Structured data */}
      {jsonLd.map((obj, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(obj)}
        </script>
      ))}
    </Helmet>
  );
}

// ─── REUSABLE JSON-LD BUILDERS ───────────────────────────────────────

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bit Studio",
    legalName: "Bit Studio (Pvt) Ltd",
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
    description:
      "Bit Studio is a design and engineering studio from Harare. We build interfaces, brand systems, and software that age into heirlooms.",
    sameAs: ["https://github.com/Mutombe"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Harare",
      addressCountry: "ZW",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "admin@bitstudio.co.zw",
        telephone: "+263785948128",
        areaServed: "Worldwide",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: SITE_ORIGIN,
    name: "Bit Studio",
    publisher: { "@type": "Organization", name: "Bit Studio" },
  };
}

export function breadcrumbJsonLd(items) {
  // items: [{name, path}, ...]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path.startsWith("http") ? it.path : `${SITE_ORIGIN}${it.path}`,
    })),
  };
}

export function creativeWorkJsonLd({ name, description, url, image, palette, aesthetic, industry }) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url: url || SITE_ORIGIN,
    image: image ? (image.startsWith("http") ? image : `${SITE_ORIGIN}${image}`) : undefined,
    creator: { "@type": "Organization", name: "Bit Studio" },
    genre: aesthetic,
    about: industry,
    ...(palette && palette.length > 0 ? { keywords: palette.join(", ") } : {}),
  };
}

export function articleJsonLd({ headline, description, url, image, datePublished }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    url,
    image,
    datePublished,
    author: { "@type": "Organization", name: "Bit Studio" },
    publisher: {
      "@type": "Organization",
      name: "Bit Studio",
      logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/logo.png` },
    },
  };
}

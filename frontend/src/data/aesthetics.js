// Aesthetics — the eight ways a Bit Studio artifact can carry itself.
//
// We do not sort by industry anymore. Industry is what the client does;
// aesthetic is how the work moves. A bakery and a tobacco house can both
// be Atelier. A bank and a panelbeater can both be Brutalist. The shared
// signature is the carriage, not the sector.

export const AESTHETICS = {
  atelier: {
    slug: "atelier",
    label: "Atelier",
    brief:
      "Bespoke. Signature gesture. The thing that could only have been made for this one room.",
    accent: "#C8A968",
  },
  editorial: {
    slug: "editorial",
    label: "Editorial",
    brief:
      "Magazine voice. Photo-led. Generous typography that holds its breath between paragraphs.",
    accent: "#E0A6B4",
  },
  cinematic: {
    slug: "cinematic",
    label: "Cinematic",
    brief:
      "Dark plates, dramatic light. The interface as opening sequence. Things arrive in motion.",
    accent: "#22D3EE",
  },
  brutalist: {
    slug: "brutalist",
    label: "Brutalist",
    brief:
      "Structural honesty. The grid declared, the type undisguised, decoration removed.",
    accent: "#E32D2D",
  },
  heritage: {
    slug: "heritage",
    label: "Heritage",
    brief:
      "Old paper, slow serifs, a steady hand. Built to look older than it is, and to age well.",
    accent: "#B58A3B",
  },
  manifesto: {
    slug: "manifesto",
    label: "Manifesto",
    brief:
      "Type-led declaration. The work is the statement. White space and an argument.",
    accent: "#D4FF3A",
  },
  bento: {
    slug: "bento",
    label: "Bento",
    brief:
      "Modular composition. Many things, well-arranged. The site as a gallery, not a sentence.",
    accent: "#F26522",
  },
  pastoral: {
    slug: "pastoral",
    label: "Pastoral",
    brief:
      "Earth tones, photographic, unhurried. Soft edges and the green parts of the palette.",
    accent: "#5DAA6B",
  },
};

export const AESTHETIC_LIST = Object.values(AESTHETICS);

// ─── INFERENCE ────────────────────────────────────────────────────────
// Every project / live site has an `industry` (or tag). We map it to one
// of the eight aesthetics with a deterministic default + a slug-hash
// nudge for the few industries we haven't explicitly mapped.

const INDUSTRY_TO_AESTHETIC = {
  // Atelier — bespoke, refined, signature
  "Luxury Hospitality": "atelier",
  "Tourism": "atelier",
  "Hospitality": "atelier",
  "Tourism & Hospitality": "atelier",
  "Beauty": "atelier",
  "Fashion": "atelier",
  "Interiors": "atelier",
  "Restaurant": "atelier",
  "Restaurants": "atelier",
  "Cafe": "atelier",

  // Editorial — magazine voice, photo-led
  "Personal": "editorial",
  "Brand": "editorial",
  "Influencer": "editorial",
  "Education": "editorial",
  "Coffee": "editorial",
  "Carbon": "editorial",
  "Records": "editorial",
  "Bakery": "editorial",

  // Cinematic — dark, dramatic, in motion
  "Auto": "cinematic",
  "Motors": "cinematic",
  "Aviation": "cinematic",
  "Logistics": "cinematic",
  "Web3": "cinematic",
  "Cyber": "cinematic",
  "Crypto": "cinematic",

  // Brutalist — raw, structural
  "Construction": "brutalist",
  "Industrial": "brutalist",
  "Shopfitting": "brutalist",
  "Engineering": "brutalist",
  "Mining": "brutalist",
  "Aluminium Shopfitting": "brutalist",
  "Security": "brutalist",

  // Heritage — old-world, serif
  "Finance": "heritage",
  "Insurance": "heritage",
  "Tobacco": "heritage",
  "Real Estate": "heritage",
  "Council": "heritage",
  "Institution": "heritage",
  "Legal": "heritage",
  "Group": "heritage",
  "Consultancy": "heritage",

  // Manifesto — type-led declaration
  "Tech": "manifesto",
  "Technology": "manifesto",
  "Forum": "manifesto",
  "Studio": "manifesto",

  // Bento — modular gallery (industries with many disparate offerings)
  "Electronics": "bento",
  "Retail": "bento",

  // Pastoral — earthy, organic
  "Health": "pastoral",
  "Healthcare": "pastoral",
  "Energy": "pastoral",
  "Solar": "pastoral",
  "Renewable Energy": "pastoral",
  "Agriculture": "pastoral",
  "Food": "pastoral",
  "Paint": "pastoral",
  "Wellness": "pastoral",
  "Bio": "pastoral",
};

// Stable hash → aesthetic, for fall-through cases. Used so the same
// uncategorised industry always maps to the same slot.
const FALLBACK_ORDER = [
  "atelier",
  "editorial",
  "cinematic",
  "brutalist",
  "heritage",
  "manifesto",
  "bento",
  "pastoral",
];

function hashSlug(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

/**
 * Infer aesthetic from a project/site. Accepts:
 *   - { tag, slug }                      (used by projects.js & live-sites.js)
 *   - { industry, slug }
 *   - "Industry String"                  (passed directly)
 */
export function inferAesthetic(input) {
  if (!input) return AESTHETICS.atelier;

  // Allow an explicit override (project.aesthetic = "atelier")
  if (typeof input === "object" && input.aesthetic && AESTHETICS[input.aesthetic]) {
    return AESTHETICS[input.aesthetic];
  }

  const raw =
    typeof input === "string"
      ? input
      : input.industry || input.tag || input.kind || "";
  const slug = (typeof input === "object" && input.slug) || raw;

  // 1) Direct hit
  if (raw && INDUSTRY_TO_AESTHETIC[raw]) {
    return AESTHETICS[INDUSTRY_TO_AESTHETIC[raw]];
  }

  // 2) Case-insensitive partial — handles "Restaurant & Cafe", "Auto Body", etc.
  const lower = String(raw).toLowerCase();
  for (const [key, val] of Object.entries(INDUSTRY_TO_AESTHETIC)) {
    if (lower.includes(key.toLowerCase())) return AESTHETICS[val];
  }

  // 3) Hash fall-back — deterministic per slug, distributes the unknowns
  const idx = hashSlug(slug || raw || "x") % FALLBACK_ORDER.length;
  return AESTHETICS[FALLBACK_ORDER[idx]];
}

export function aestheticLabel(input) {
  return inferAesthetic(input).label;
}

export function aestheticSlug(input) {
  return inferAesthetic(input).slug;
}

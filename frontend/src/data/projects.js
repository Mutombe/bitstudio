// Bit Studio — project ledger
// Every entry is a real artifact. Recently-live or experimentation. Filterable by tag.

export const INDUSTRIES = [
  "Hospitality",
  "Legal",
  "Healthcare",
  "Property",
  "Sports",
  "Retail",
  "Automotive",
  "Timber",
  "Insurance",
  "Logistics",
  "Machinery",
  "Finance",
  "Agro",
  "Shopfitting",
  "Engineering",
];

export const PROJECTS = [
  // ─── RECENTLY LIVE / FEATURED ───
  {
    slug: "zusly-shopfitters-projects",
    name: "Zusly Shopfitters & Projects",
    tag: "Shopfitting",
    kind: "recently-live",
    featured: true,
    year: "2025",
    role: "Brand, interface, engineering",
    url: "https://demo-zusly-shopfitters-projects.onrender.com",
    palette: ["#003366", "#E87722", "#F5EFE6"],
    typography: "Sora / DM Sans",
    brief:
      "Commercial interiors and joinery, dressed in navy and ember. A build site that feels like a build site — dust, muscle, measure.",
    note:
      "We did not decorate the work. We framed it — and let the rooms speak like the rooms they are.",
    tech: ["React 19", "Vite 7", "Tailwind v4", "Framer Motion", "SerpAPI Reviews"],
  },
  {
    slug: "umati-property-development",
    name: "Umati Property Development",
    tag: "Property",
    kind: "recently-live",
    featured: true,
    year: "2025",
    role: "Brand system, web platform",
    url: "https://demo-umati-property-development.onrender.com",
    palette: ["#E87722", "#0C0C0C", "#F5EFE6"],
    typography: "Averta Std",
    brief:
      "Orange and onyx — a developer's hand drawn in two colors. The architecture of wanting a home.",
    note:
      "We argued about the negative space for three days. We won the argument.",
    tech: ["React 19", "Vite 7", "Tailwind v4", "Framer Motion"],
  },
  {
    slug: "lupane-timber",
    name: "Lupane Timber",
    tag: "Timber",
    kind: "recently-live",
    featured: true,
    year: "2025",
    role: "Brand, interface, story",
    url: "https://demo-lupane-timber.onrender.com",
    palette: ["#3A0A15", "#B8864B", "#F5EFE6"],
    typography: "Editorial serif / geometric sans",
    brief:
      "Indigenous hardwood, wine and mukwa honey. An inventory that reads like an oath.",
    note:
      "Trees older than any of us. The site had to feel that weight.",
    tech: ["React 19", "Vite 7", "Tailwind v4"],
  },
  {
    slug: "denford-business-attorneys",
    name: "Denford Business Attorneys",
    tag: "Legal",
    kind: "recently-live",
    featured: true,
    year: "2025",
    role: "Brand system, interface",
    url: "https://demo-denford-business-attorneys.onrender.com",
    palette: ["#183757", "#C6A664", "#F5EFE6"],
    typography: "Poligon",
    brief:
      "Corporate law in navy and gold. Seriousness without solemnity. Trust rendered in type.",
    note:
      "We built a chamber, not a homepage.",
    tech: ["React 19", "Vite 7", "Tailwind v4"],
  },
  {
    slug: "brompton-lodge",
    name: "Brompton Lodge",
    tag: "Hospitality",
    kind: "recently-live",
    featured: true,
    year: "2025",
    role: "Brand, experience design",
    url: "https://demo-brompton-lodge.onrender.com",
    palette: ["#1A2A33", "#6E3F2C", "#D9C6AD"],
    typography: "Fraunces / Inter",
    brief:
      "Ink, mahogany, sand, palm. A boutique lodge that knows the difference between quiet and empty.",
    note:
      "The quiet hour between dusk and dinner — the site lives there.",
    tech: ["React 19", "Vite 7", "Tailwind v4", "Framer Motion"],
  },
  {
    slug: "bard-santner-golf-v3",
    name: "Bard Santner Golf — The Season",
    tag: "Sports",
    kind: "recently-live",
    featured: true,
    year: "2026",
    role: "Brand, platform, editorial system",
    url: "https://demo-bard-santner-golf-v3.onrender.com",
    palette: ["#0F2A44", "#C6A664", "#F5EFE6"],
    typography: "Editorial serif / geometric sans",
    brief:
      "Navy and gold. The 2026 season hub — leaderboards, narrative, reverence. A tournament as an annual ritual.",
    note:
      "This is the canonical version. V1 and V2 are still live as artifacts of the conversation.",
    tech: ["React 19", "Vite 7", "Tailwind v4", "Framer Motion"],
  },

  // ─── EXPERIMENTATION (curated & filterable) ───
  { slug: "palm-river-hotel",           name: "Palm River Hotel",                  tag: "Hospitality", kind: "experimentation", year: "2025", url: "https://demo-palm-river-hotel.onrender.com",                 palette: ["#0C3B2E", "#D4AF37", "#F5EFE6"], brief: "Luxury hospitality by the water. Gold on deep green.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "the-rainbow-towers-hotel",   name: "The Rainbow Towers Hotel",          tag: "Hospitality", kind: "experimentation", year: "2025", url: "https://demo-the-rainbow-towers-hotel-and.onrender.com",      palette: ["#1B1F3A", "#B8864B", "#EAE0D0"], brief: "A Harare landmark reframed in editorial type.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "masawara-urban-retreat",     name: "Masawara Urban Retreat",            tag: "Hospitality", kind: "experimentation", year: "2025", url: "https://demo-masawara-urban-retreat.onrender.com",            palette: ["#2C1810", "#D9B382", "#F5EFE6"], brief: "A retreat in the middle of the city that refuses the city.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "sandalwood-lodge",           name: "Sandalwood Lodge",                  tag: "Hospitality", kind: "experimentation", year: "2025", url: "https://demo-sandalwood-lodge.onrender.com",                  palette: ["#3E2723", "#C19A6B", "#F5EFE6"], brief: "Cedar-warm. A lodge for returning, not escaping.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "solaire-lightworks",         name: "Solaire Lightworks",                tag: "Retail",      kind: "experimentation", year: "2025", url: "https://demo-solaire-lightworks.onrender.com",                palette: ["#1C1C1C", "#E5B800", "#F5EFE6"], brief: "Lighting as jewellery. Every fixture a proper noun.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "autoworld-zimbabwe",         name: "Autoworld Zimbabwe",                tag: "Automotive",  kind: "experimentation", year: "2025", url: "https://demo-autoworld-zimbabwe.onrender.com",                palette: ["#0A0A0A", "#C8102E", "#F5EFE6"], brief: "Automotive black / alarm red. Machines as objects.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "toyota-by-cfao-zimbabwe",    name: "Toyota by CFAO Zimbabwe",           tag: "Automotive",  kind: "experimentation", year: "2025", url: "https://demo-toyota-by-cfao-zimbabwe.onrender.com",           palette: ["#EB0A1E", "#111111", "#F5EFE6"], brief: "A storied marque, stripped to posture and proof.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "symmetry-dental-surgery",    name: "Symmetry Dental Surgery",           tag: "Healthcare",  kind: "experimentation", year: "2025", url: "https://demo-symmetry-dental-surgery-dr-t-chombo.onrender.com", palette: ["#E8F4F8", "#2C6E7F", "#0F2A33"], brief: "Clinical calm without the hospital chill.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "the-avenues-clinic",         name: "The Avenues Clinic",                tag: "Healthcare",  kind: "experimentation", year: "2025", url: "https://demo-the-avenues-clinic.onrender.com",                palette: ["#1C3D5A", "#D9E6F2", "#F5F5F5"], brief: "Institutional blue with a bedside manner.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "melbourne-ivf",              name: "Melbourne IVF",                     tag: "Healthcare",  kind: "experimentation", year: "2025", url: "https://demo-melbourne.onrender.com",                          palette: ["#3B5998", "#F0C3D3", "#FFF7F2"], brief: "Fertility care, rendered with softness and steel.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "muvingi-and-mugadza-legal",  name: "Muvingi & Mugadza Legal",           tag: "Legal",       kind: "experimentation", year: "2025", url: "https://demo-muvingi-and-mugadza-legal.onrender.com",          palette: ["#12233A", "#B8864B", "#F5EFE6"], brief: "Senior counsel in deep blue.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "mhishi-nkomo-legal-practice", name: "Mhishi Nkomo Legal Practice",      tag: "Legal",       kind: "experimentation", year: "2025", url: "https://demo-mhishi-nkomo-legal-practice.onrender.com",        palette: ["#0B1220", "#C6A664", "#F5EFE6"], brief: "A firm as a fortress, built out of lines.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "nyaradzo-life-assurance",    name: "Nyaradzo Life Assurance",           tag: "Insurance",   kind: "experimentation", year: "2025", url: "https://demo-nyaradzo-life-assurance.onrender.com",            palette: ["#0C4F2E", "#D4AF37", "#F5EFE6"], brief: "Life assurance rendered as a long sentence.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "eilite-insurance-agency",    name: "EILITE Insurance Agency",           tag: "Insurance",   kind: "experimentation", year: "2025", url: "https://demo-eilite-insurance-agency.onrender.com",            palette: ["#1A1A2E", "#E94560", "#F5EFE6"], brief: "Modern insurance brokerage — agile, explicit.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "murwisi-airfreight-cargo",   name: "Murwisi Airfreight Cargo",          tag: "Logistics",   kind: "experimentation", year: "2025", url: "https://demo-murwisi-airfreight-cargo.onrender.com",           palette: ["#0A2E5C", "#F5A623", "#F5EFE6"], brief: "Freight in runway-blue and safety-amber.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "whelson-transport",          name: "Whelson Transport",                 tag: "Logistics",   kind: "experimentation", year: "2025", url: "https://demo-whelson-transport.onrender.com",                  palette: ["#1E3A5F", "#E53E3E", "#F5EFE6"], brief: "Fleet logistics, plainspoken and precise.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "machinery-exchange",         name: "Machinery Exchange",                tag: "Machinery",   kind: "experimentation", year: "2025", url: "https://demo-machinery-exchange.onrender.com",                 palette: ["#2C2C2C", "#FFC107", "#F5EFE6"], brief: "Heavy equipment in heavier type.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "sabarm-business-solutions",  name: "Sabarm Business Solutions",         tag: "Finance",     kind: "experimentation", year: "2025", url: "https://demo-sabarm-business-solutions.onrender.com",          palette: ["#0F3460", "#E94F37", "#F5EFE6"], brief: "Audit and assurance — a ledger with a voice.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "african-century",            name: "African Century",                   tag: "Finance",     kind: "experimentation", year: "2025", url: "https://demo-african-century.onrender.com",                    palette: ["#0D2137", "#D4A74C", "#F5EFE6"], brief: "Financial services for the long horizon.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "zimbabwe-leaf-tobacco",      name: "Zimbabwe Leaf Tobacco",             tag: "Agro",        kind: "experimentation", year: "2025", url: "https://demo-zimbabwe-leaf-tobacco.onrender.com",              palette: ["#3E2C1C", "#C19A6B", "#F5EFE6"], brief: "A century of leaf, rendered in leaf.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "british-american-tobacco",   name: "British American Tobacco Zimbabwe", tag: "Agro",        kind: "experimentation", year: "2025", url: "https://demo-british-american-tobacco.onrender.com",           palette: ["#1B365D", "#C8102E", "#F5EFE6"], brief: "Corporate plc, held to the same standard.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "muble-axis",                 name: "Muble Axis",                        tag: "Engineering", kind: "experimentation", year: "2025", url: "https://demo-muble-axis.onrender.com",                         palette: ["#1A1A1A", "#00B4D8", "#F5EFE6"], brief: "Mechanical engineering. Drawings as interfaces.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "bard-santner-golf-v1",       name: "Bard Santner Golf — The Race (V1)", tag: "Sports",      kind: "experimentation", year: "2026", url: "https://demo-bard-santner-golf-v1.onrender.com",               palette: ["#0F2A44", "#D4AF37", "#F5EFE6"], brief: "Earlier version of the golf hub — kept as a conversation artifact.", tech: ["React", "Vite", "Tailwind"] },
  { slug: "bard-santner-golf-v2",       name: "Bard Santner Golf — The Club (V2)", tag: "Sports",      kind: "experimentation", year: "2026", url: "https://demo-bard-santner-golf-v2.onrender.com",               palette: ["#0F2A44", "#B8864B", "#EAE0D0"], brief: "Club-focused variant. Members-lounge energy.", tech: ["React", "Vite", "Tailwind"] },
];

export const FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "recently-live", label: "Recently Live" },
  { id: "experimentation", label: "Experimentation" },
  { id: "Hospitality", label: "Hospitality" },
  { id: "Legal", label: "Legal" },
  { id: "Healthcare", label: "Healthcare" },
  { id: "Property", label: "Property" },
  { id: "Sports", label: "Sports" },
  { id: "Retail", label: "Retail" },
  { id: "Automotive", label: "Automotive" },
  { id: "Timber", label: "Timber" },
  { id: "Insurance", label: "Insurance" },
  { id: "Logistics", label: "Logistics" },
  { id: "Finance", label: "Finance" },
  { id: "Agro", label: "Agro" },
  { id: "Shopfitting", label: "Shopfitting" },
  { id: "Engineering", label: "Engineering" },
];

export function filterProjects(projects, filter) {
  if (filter === "all") return projects;
  if (filter === "recently-live") return projects.filter((p) => p.kind === "recently-live");
  if (filter === "experimentation") return projects.filter((p) => p.kind === "experimentation");
  return projects.filter((p) => p.tag === filter);
}

export function findProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function adjacentProjects(slug) {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx < 0) return { prev: null, next: null };
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  return { prev, next };
}

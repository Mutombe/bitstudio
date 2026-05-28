// Bit Studio. Live production sites
//
// Sites that have left the demo subdomain and earned a real domain.
// Curated list. The ones we'd happily show anyone, in front-row order.
//
// Each entry is decorated with an aesthetic (Atelier, Editorial, …) so the
// chips on /live and /work share the same vocabulary. The original sector
// label is preserved as `industry`.

import { inferAesthetic } from "./aesthetics.js";

const _LIVE = [
  {
    slug: "bgfi-global",
    name: "BGFI",
    domain: "bgfi.global",
    url: "https://bgfi.global",
    tag: "Finance",
    palette: ["#0B1E3A", "#D4A24A", "#F4F1E8"],
    featured: true,
    brief:
      "Bard Global Finance Institute. Daily editorial coverage of African capital markets, plus long-form research from Finance Africa Quarterly.",
  },
  {
    slug: "taqon",
    name: "Taqon",
    domain: "taqon.co.zw",
    url: "https://taqon.co.zw",
    tag: "Energy",
    palette: ["#0F2A4B", "#F26522", "#FAFAF6"],
    featured: true,
    brief:
      "Solar shop, package builder, and advisor platform. The sun's interface.",
  },
  {
    slug: "ecolusgroup",
    name: "Ecolus Group",
    domain: "ecolusgroup.co.zw",
    url: "https://ecolusgroup.co.zw",
    tag: "Energy",
    palette: ["#0E4D2B", "#228B22", "#F4F7EE"],
    featured: true,
    brief:
      "Solar, renewables, and the wider group story. Green commerce under one roof.",
  },
  {
    slug: "mamavee",
    name: "Mamavee",
    domain: "mamavee.co.zw",
    url: "https://mamavee.co.zw",
    tag: "Brand",
    palette: ["#1F1A1F", "#E89AB2", "#F8F4F0"],
    featured: true,
    brief:
      "An influencer's full-front-facing world. Personal, considered, photo-led.",
  },
  {
    slug: "bardloans",
    name: "Bard Loans",
    domain: "bardloans.co.za",
    url: "https://bardloans.co.za",
    tag: "Finance",
    palette: ["#0F2A44", "#F5A623", "#F4F1E8"],
    featured: true,
    brief:
      "Short-term lending under the Bard banner. Capital that moves on the speed of trust.",
  },
  {
    slug: "rudiariuscapital",
    name: "Rudarius Capital",
    domain: "rudiariuscapital.co.za",
    url: "https://rudiariuscapital.co.za",
    tag: "Finance",
    palette: ["#0E2238", "#C8A968", "#F4F1E8"],
    featured: true,
    brief:
      "Asset management. Tailored capital solutions for businesses that intend to compound for a long time.",
  },
  {
    slug: "brymatongroup",
    name: "Brymaton Group",
    domain: "brymatongroup.co.zw",
    url: "https://brymatongroup.co.zw",
    tag: "Group",
    palette: ["#102544", "#E87126", "#F4F1E8"],
    brief:
      "A Zimbabwean group portfolio. Multiple ventures, one identity.",
  },
  {
    slug: "gemaksecurity",
    name: "Gemak Security",
    domain: "gemaksecurity.co.zw",
    url: "https://gemaksecurity.co.zw",
    tag: "Security",
    palette: ["#0A0A0A", "#E32D2D", "#F4F4F6"],
    brief:
      "Guarding services rendered in confident black, alarm red, and zero ornament.",
  },
  {
    slug: "lafoidesigns",
    name: "Lafoi Designs",
    domain: "lafoidesigns.com",
    url: "https://lafoidesigns.com",
    tag: "Interiors",
    palette: ["#1F1B1A", "#C8A968", "#F4EFE2"],
    brief:
      "Luxury stretch ceilings and custom lighting. Interior architecture as an editorial.",
  },
  {
    slug: "ncubeburrow",
    name: "Ncube Burrow",
    domain: "ncubeburrow.com",
    url: "https://ncubeburrow.com",
    tag: "Engineering",
    palette: ["#12233A", "#B89858", "#F5EFE6"],
    brief:
      "Zimbabwe's premier civil engineering firm. Bridges, roads, civil works at quiet, unrushed scale.",
  },
  {
    slug: "silvercarbon",
    name: "Silver Carbon",
    domain: "silvercarbon.co.zw",
    url: "https://silvercarbon.co.zw",
    tag: "Carbon",
    palette: ["#1B2735", "#9DA6B0", "#F4F1E8"],
    brief:
      "Carbon asset development and carbon finance. Value across the carbon credits chain, from creation to retirement.",
  },
  {
    slug: "zim-rec",
    name: "Zim-Rec",
    domain: "zim-rec.co.zw",
    url: "https://zim-rec.co.zw",
    tag: "Energy",
    palette: ["#103D2A", "#F5C518", "#F4F7EE"],
    brief:
      "Zimbabwean renewable energy certificates. The registry for green attribute trading.",
  },
];

export const LIVE_SITES = _LIVE.map((s) => {
  const aesthetic = inferAesthetic({ tag: s.tag, slug: s.slug, aesthetic: s.aesthetic });
  return {
    ...s,
    industry: s.industry || s.tag,
    aesthetic: aesthetic.slug,
    aestheticLabel: aesthetic.label,
    tag: aesthetic.label,
  };
});

export const LIVE_FEATURED = LIVE_SITES.filter((s) => s.featured);

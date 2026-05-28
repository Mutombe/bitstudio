// Bit Studio. Aesthetic-score model
//
// A small, opinionated scorer that ranks demos by four heuristics. The two
// the principal cares about. "simplicity established from complexity" and
// "colour fusion". Carry the heaviest weight. The other two (originality
// of mechanic, concept-to-business tie) are tiebreakers, but they do real
// work in pulling editorial sites above conventional ones.
//
// Total out of 80:
//   • Colour Fusion:        0-30  (palette harmony × contrast × saturation balance)
//   • Simplicity:           0-20  (brief brevity + brief-tightness)
//   • Originality:          0-15  (penalty for generic vocabulary, bonus for named mechanics)
//   • Concept Tie:          0-15  (brief references business name / industry directly)
//
// Two user-anchored slugs always come first regardless of score.

// ─── COLOUR MATH ─────────────────────────────────────────────────────────

/**
 * Hex → HSL ({ h: 0-360, s: 0-1, l: 0-1 }).
 * Returns a neutral grey on parse failure so the scorer doesn't NaN out.
 */
function hexToHSL(hex) {
  if (!hex || typeof hex !== "string") return { h: 0, s: 0, l: 0.5 };
  const clean = hex.replace("#", "").trim();
  if (clean.length !== 6 || !/^[0-9a-f]{6}$/i.test(clean)) {
    return { h: 0, s: 0, l: 0.5 };
  }
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  return { h, s, l };
}

/** Shortest distance between two hues on the 0-360 colour wheel. */
function hueDist(a, b) {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

/**
 * Score a 2-3-colour palette for harmony.
 * Reward classical relationships, punish dissonance.
 *
 *   analogous   (0-30°)   → 1.0
 *   complementary (150-180°) → 1.0
 *   triadic     (110-130°) → 0.85
 *   split-comp  (140-150°) → 0.7
 *   neutral-against-anything → 1.0 (cream/ivory partners with everything)
 *   anything else        → 0.25-0.45
 */
function harmonyBetween(h1, h2, s1, s2) {
  // If either colour is near-neutral (low saturation) treat the relationship
  // as harmonious. The neutral acts as a canvas.
  if (s1 < 0.15 || s2 < 0.15) return 1.0;
  const d = hueDist(h1, h2);
  if (d < 30) return 1.0;
  if (d >= 150 && d <= 180) return 1.0;
  if (d > 110 && d <= 130) return 0.85;
  if (d > 130 && d < 150) return 0.7;
  if (d >= 90 && d <= 110) return 0.55;
  return 0.35;
}

/**
 * Score colour fusion (0-30).
 *  • Contrast . How wide the luminance range is (bold light/dark juxtaposition).
 *  • Saturation balance. The palette wants at least one *rich* hue and at
 *    least one near-neutral (cream, ivory, ink). Three saturated hues = gaudy.
 *  • Harmony. Average of pairwise hue relationships, with neutrals waiving.
 */
function scoreColourFusion(palette) {
  if (!Array.isArray(palette) || palette.length === 0) return 0;
  // Take first 3 colours; pad if fewer.
  const slots = palette.slice(0, 3);
  while (slots.length < 3) slots.push(slots[slots.length - 1]);
  const hsl = slots.map(hexToHSL);

  // Contrast: reward a 0.6+ luminance range.
  const ls = hsl.map((c) => c.l);
  const lumRange = Math.max(...ls) - Math.min(...ls);
  const contrastScore = Math.min(lumRange / 0.7, 1) * 10; // 0-10

  // Saturation balance:
  //   • reward having at least one hue ≥ 0.45 sat (the "rich" key colour)
  //   • reward having at least one hue ≤ 0.15 sat (the "neutral" canvas)
  //   • punish three saturated hues (gaudy). Softly.
  const sats = hsl.map((c) => c.s);
  const maxSat = Math.max(...sats);
  const minSat = Math.min(...sats);
  const richness = Math.min(maxSat / 0.5, 1); // 0-1
  const neutralPresence = Math.max(0, 1 - minSat / 0.18); // 0-1
  const gaudyPenalty = sats.filter((s) => s > 0.6).length >= 3 ? 0.25 : 0;
  const satScore = Math.max(0, (richness + neutralPresence) * 5 - gaudyPenalty * 5); // 0-10

  // Harmony: average of (primary↔secondary) and (primary↔accent).
  const h12 = harmonyBetween(hsl[0].h, hsl[1].h, hsl[0].s, hsl[1].s);
  const h13 = harmonyBetween(hsl[0].h, hsl[2].h, hsl[0].s, hsl[2].s);
  const harmonyScore = ((h12 + h13) / 2) * 10; // 0-10

  return contrastScore + satScore + harmonyScore;
}

// ─── COPY / CONCEPT HEURISTICS ───────────────────────────────────────────

const GENERIC_VOCAB = [
  "modern", "clean", "premium", "elegant", "sleek", "professional",
  "beautiful", "world-class", "innovative", "sophisticated", "bespoke",
  "stunning", "dynamic", "cutting-edge", "comprehensive",
];

const NAMED_MECHANICS = [
  // motion verbs that signal a real moment was designed
  "cursor", "parallax", "scroll-driven", "morph", "toggle", "reveal", "fan",
  "rotat", "ticker", "signature", "ripple", "sweep", "draw", "pulse", "flip",
  "tilt", "lookbook", "silhouette", "calculator", "wizard", "counter",
  "switch", "spotlight", "stamp", "marquee", "meter", "trail", "drift",
  "split-flap", "watermark", "fade", "kenburns", "mosaic",
];

/** 0-15. Penalises tired adjectives, rewards specific named mechanics. */
function scoreOriginality(brief) {
  if (!brief || typeof brief !== "string") return 0;
  const lower = brief.toLowerCase();

  let s = 7; // baseline
  GENERIC_VOCAB.forEach((w) => {
    if (lower.includes(w)) s -= 1.5;
  });
  let hits = 0;
  NAMED_MECHANICS.forEach((w) => {
    if (lower.includes(w)) hits += 1;
  });
  s += Math.min(hits, 4) * 2;
  return Math.max(0, Math.min(15, s));
}

/**
 * 0-20. "Simplicity established from complexity": shorter, tighter briefs
 * imply a single editorial idea did the heavy lifting. Long verbose briefs
 * imply the design tried to do many things at once.
 *
 *   ≤ 12 words:  full marks (15) + bonus 5 if it names a single mechanic
 *   13-22:       12
 *   23-35:        7
 *   36+:          3
 */
function scoreSimplicity(brief) {
  if (!brief || typeof brief !== "string") return 5;
  const words = brief.trim().split(/\s+/).length;
  let base;
  if (words <= 12) base = 15;
  else if (words <= 22) base = 12;
  else if (words <= 35) base = 7;
  else base = 3;

  // Bonus: brief invokes exactly ONE named mechanic. The discipline of a
  // single editorial idea. Adds 5.
  const lower = brief.toLowerCase();
  const hits = NAMED_MECHANICS.filter((w) => lower.includes(w)).length;
  if (hits === 1 && words <= 22) base += 5;

  return Math.min(20, base);
}

/** 0-15. Bonus when the brief references the business name or its industry. */
function scoreConceptTie(project) {
  if (!project.brief || !project.name) return 0;
  const briefL = project.brief.toLowerCase();
  const nameTokens = project.name
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !["lodge", "hotel", "limited", "company"].includes(w));

  let s = 0;
  nameTokens.forEach((w) => {
    if (briefL.includes(w)) s += 3;
  });
  if (project.tag && briefL.includes(project.tag.toLowerCase())) s += 3;
  return Math.min(15, s);
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────

export function aestheticScore(project) {
  return (
    scoreColourFusion(project.palette || []) +
    scoreOriginality(project.brief) +
    scoreSimplicity(project.brief) +
    scoreConceptTie(project)
  );
}

/** Returns the breakdown for debugging / inspecting individual scores. */
export function aestheticBreakdown(project) {
  return {
    colourFusion: round1(scoreColourFusion(project.palette || [])),
    simplicity: round1(scoreSimplicity(project.brief)),
    originality: round1(scoreOriginality(project.brief)),
    conceptTie: round1(scoreConceptTie(project)),
    total: round1(aestheticScore(project)),
  };
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

// User-anchored slugs always come first, in this exact order.
export const USER_ANCHORS = [
  "alliance-health",
  "autoworld-zimbabwe",
];

/**
 * Sort a project list:
 *   1. user anchors first, in given order
 *   2. then everything else by aestheticScore desc (with name tiebreaker)
 */
export function sortByAesthetic(projects) {
  const anchorIndex = new Map(USER_ANCHORS.map((slug, i) => [slug, i]));

  return [...projects].sort((a, b) => {
    const ai = anchorIndex.get(a.slug);
    const bi = anchorIndex.get(b.slug);
    if (ai !== undefined && bi !== undefined) return ai - bi;
    if (ai !== undefined) return -1;
    if (bi !== undefined) return 1;
    const diff = aestheticScore(b) - aestheticScore(a);
    if (diff !== 0) return diff;
    return (a.name || "").localeCompare(b.name || "");
  });
}

/**
 * Fisher-Yates shuffle. For the homepage, where tiles should rotate on every
 * fresh page load so visitors don't see the same six names every time.
 */
export function shuffleProjects(projects) {
  const arr = [...projects];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

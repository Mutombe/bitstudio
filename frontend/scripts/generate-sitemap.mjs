// Build-time sitemap + robots.txt generator.
//
// Reads PROJECTS, LIVE_SITES, SERVICES and emits dist/sitemap.xml and
// dist/robots.txt. Runs as a postbuild step (see package.json).
//
// Why dynamic import? The data modules live in /src and ship as ES modules;
// we resolve them via Vite-style import paths and Node's experimental ESM.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SRC = path.join(ROOT, "src");

const SITE = "https://bitstudio.co.zw";
const TODAY = new Date().toISOString().slice(0, 10);

// ─── Static routes — change priority/freshness here ─────────────────
const STATIC_ROUTES = [
  // English
  { path: "/",            priority: "1.0", changefreq: "weekly"  },
  { path: "/work",        priority: "0.9", changefreq: "weekly"  },
  { path: "/live",        priority: "0.9", changefreq: "weekly"  },
  { path: "/craft",       priority: "0.8", changefreq: "monthly" },
  { path: "/studio",      priority: "0.7", changefreq: "monthly" },
  { path: "/contact",     priority: "0.6", changefreq: "monthly" },
  { path: "/terms",       priority: "0.3", changefreq: "yearly"  },
  // German edition (DACH market)
  { path: "/de",          priority: "0.9", changefreq: "weekly"  },
  { path: "/de/handwerk", priority: "0.8", changefreq: "monthly" },
  { path: "/de/kontakt",  priority: "0.6", changefreq: "monthly" },
  // Legal pages — DE for German-market presence, EN for US/global
  { path: "/impressum",   priority: "0.4", changefreq: "yearly"  },
  { path: "/datenschutz", priority: "0.4", changefreq: "yearly"  },
  { path: "/legal",       priority: "0.4", changefreq: "yearly"  },
  { path: "/privacy",     priority: "0.4", changefreq: "yearly"  },
];

// Dynamic-route loaders. We use raw source parsing instead of importing the
// React-flavoured modules — they pull in JSX, Vite-only imports, etc.
// A short regex over the source is enough to harvest every `slug:` field.

async function extractSlugs(filePath) {
  const src = await fs.readFile(filePath, "utf8");
  const slugs = [];
  const re = /slug:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) slugs.push(m[1]);
  return slugs;
}

function xmlEscape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function urlElement({ path: p, priority = "0.5", changefreq = "monthly" }) {
  return `  <url>
    <loc>${xmlEscape(SITE + p)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

async function main() {
  await fs.mkdir(DIST, { recursive: true });

  const [projectSlugs, liveSlugs, serviceSlugs] = await Promise.all([
    extractSlugs(path.join(SRC, "data/projects.js")),
    extractSlugs(path.join(SRC, "data/live-sites.js")),
    extractSlugs(path.join(SRC, "data/services.js")),
  ]);

  const dynamic = [
    ...projectSlugs.map((s) => ({ path: `/work/${s}`, priority: "0.7", changefreq: "monthly" })),
    ...liveSlugs.map((s) => ({ path: `/live/${s}`,    priority: "0.7", changefreq: "monthly" })),
    ...serviceSlugs.map((s) => ({ path: `/services/${s}`, priority: "0.6", changefreq: "monthly" })),
  ];

  const all = [...STATIC_ROUTES, ...dynamic];

  // Dedupe by path
  const seen = new Set();
  const unique = all.filter((r) => {
    if (seen.has(r.path)) return false;
    seen.add(r.path);
    return true;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique.map(urlElement).join("\n")}
</urlset>
`;

  await fs.writeFile(path.join(DIST, "sitemap.xml"), xml, "utf8");

  const robots = `# Bit Studio robots.txt
User-agent: *
Allow: /

# Where the map lives
Sitemap: ${SITE}/sitemap.xml

# Be nice to crawlers — we have ~125 routes and we want all of them
Crawl-delay: 0
`;

  await fs.writeFile(path.join(DIST, "robots.txt"), robots, "utf8");

  // Also drop them into /public so `vite dev` and previewers see them.
  const PUB = path.join(ROOT, "public");
  await fs.mkdir(PUB, { recursive: true });
  await fs.writeFile(path.join(PUB, "sitemap.xml"), xml, "utf8");
  await fs.writeFile(path.join(PUB, "robots.txt"), robots, "utf8");

  console.log(
    `[sitemap] wrote ${unique.length} routes (${projectSlugs.length} projects, ` +
    `${liveSlugs.length} live, ${serviceSlugs.length} services + ` +
    `${STATIC_ROUTES.length} static)`
  );
}

main().catch((e) => {
  console.error("[sitemap] failed:", e);
  process.exit(1);
});

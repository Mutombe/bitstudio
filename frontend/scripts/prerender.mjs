// Post-build static prerender.
//
// Spins up Vite preview, walks every route, snapshots the rendered HTML
// (with hydrated Helmet head), and writes a per-route static file so a
// dumb crawler — Bing, LinkedIn, Slack unfurler, AI scraper — sees real
// content without running JS.
//
// Output layout (matches Render/Netlify's "directory index" convention):
//   dist/index.html                       (already exists, stays as SPA entry)
//   dist/work/index.html
//   dist/work/alliance-health/index.html
//   dist/live/index.html
//   dist/live/bgfi-global/index.html
//   dist/craft/index.html
//   ...
//
// Existing _redirects + 404.html SPA shim keep client-side nav working.

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SRC = path.join(ROOT, "src");

const PORT = 4173;
const ORIGIN = `http://localhost:${PORT}`;

const STATIC_ROUTES = ["/", "/work", "/live", "/craft", "/studio", "/contact", "/terms"];

async function extractSlugs(file) {
  const src = await fs.readFile(file, "utf8");
  const re = /slug:\s*["']([^"']+)["']/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) out.push(m[1]);
  return out;
}

async function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      "npx",
      ["vite", "preview", "--port", String(PORT), "--strictPort"],
      {
        cwd: ROOT,
        stdio: ["ignore", "pipe", "pipe"],
        shell: true, // Windows compat — npx is a .cmd shim, needs a shell
      }
    );

    let resolved = false;
    const ready = () => {
      if (resolved) return;
      resolved = true;
      resolve(proc);
    };

    proc.stdout.on("data", (b) => {
      const s = b.toString();
      if (s.includes(String(PORT))) ready();
    });
    proc.stderr.on("data", (b) => process.stderr.write(b));
    proc.on("error", reject);
    proc.on("exit", (code) => {
      if (!resolved) reject(new Error(`vite preview exited ${code}`));
    });

    // Safety: assume it boots within 8s even if log line is unusual
    setTimeout(ready, 8000);
  });
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  // Suppress console noise from the page
  page.on("console", () => {});
  page.on("pageerror", () => {});

  const url = ORIGIN + route;
  await page.goto(url, { waitUntil: "networkidle0", timeout: 45_000 });

  // Wait for Helmet to flush its meta and for the first paint of real content.
  // We give it a tick after networkidle to allow the framer-motion mount.
  await new Promise((r) => setTimeout(r, 300));

  // Grab the full HTML — outerHTML of <html> includes the rendered head.
  const html = await page.evaluate(() => {
    // Strip noise that breaks static viewing: scripts/event listeners stay
    // (so client hydration runs); we just want the snapshot.
    return "<!doctype html>\n" + document.documentElement.outerHTML;
  });

  await page.close();
  return html;
}

function diskPathFor(route) {
  if (route === "/") return path.join(DIST, "index.html");
  const clean = route.replace(/^\/+/, "").replace(/\/+$/, "");
  return path.join(DIST, clean, "index.html");
}

async function main() {
  // Discover all routes
  const [proj, live, svc] = await Promise.all([
    extractSlugs(path.join(SRC, "data/projects.js")),
    extractSlugs(path.join(SRC, "data/live-sites.js")),
    extractSlugs(path.join(SRC, "data/services.js")),
  ]);
  const dynamic = [
    ...proj.map((s) => `/work/${s}`),
    ...live.map((s) => `/live/${s}`),
    ...svc.map((s) => `/services/${s}`),
  ];
  const routes = [...new Set([...STATIC_ROUTES, ...dynamic])];

  console.log(`[prerender] ${routes.length} routes`);
  console.log(`[prerender] starting vite preview on :${PORT}`);
  const preview = await startPreview();

  let browser;
  try {
    // Use the user's installed Chrome (or override via CHROME_PATH env).
    // Falls back to Puppeteer's bundled Chromium if neither is present.
    const localChrome =
      process.env.CHROME_PATH ||
      [
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
        "/usr/bin/google-chrome",
        "/usr/bin/chromium",
        "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      ].find((p) => {
        try { return existsSync(p); } catch { return false; }
      });

    browser = await puppeteer.launch({
      headless: "new",
      executablePath: localChrome || undefined,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    // Render with a small concurrency window — 4 at a time is a safe sweet
    // spot for an SPA serving from a single Vite preview.
    const CONCURRENCY = 4;
    let i = 0;
    let done = 0;
    const t0 = Date.now();

    async function worker() {
      while (i < routes.length) {
        const my = i++;
        const route = routes[my];
        const target = diskPathFor(route);
        try {
          const html = await renderRoute(browser, route);
          await fs.mkdir(path.dirname(target), { recursive: true });
          await fs.writeFile(target, html, "utf8");
          done++;
          console.log(`[prerender] ${String(done).padStart(3, " ")}/${routes.length} ${route}`);
        } catch (e) {
          console.warn(`[prerender] FAIL ${route}: ${e.message}`);
        }
      }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`[prerender] done — ${done}/${routes.length} routes in ${dt}s`);
  } finally {
    if (browser) await browser.close();
    preview.kill();
  }
}

main().catch((e) => {
  console.error("[prerender] failed:", e);
  process.exit(1);
});

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

// 1x1 transparent PNG — stands in for every image while we snapshot the HTML.
const STUB_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==",
  "base64"
);

// All non-dynamic routes the SPA serves. Every entry here is rendered
// to dist/<route>/index.html so a dumb crawler (Bing, LinkedIn, Slack,
// AI scrapers, Twitter, Mastodon, social previewers) gets the real
// page on first response, not an empty SPA shell.
const STATIC_ROUTES = [
  // English
  "/",
  "/work",
  "/live",
  "/craft",
  "/studio",
  "/lab",
  "/field-manual",
  "/writing",
  "/packages",
  "/offers",
  "/contact",
  "/terms",
  "/legal",
  "/privacy",
  // German
  "/de",
  "/de/handwerk",
  "/de/kontakt",
  "/pakete",
  "/impressum",
  "/datenschutz",
];

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
    const isWin = process.platform === "win32";
    const proc = spawn(
      "npx",
      ["vite", "preview", "--port", String(PORT), "--strictPort"],
      {
        cwd: ROOT,
        stdio: ["ignore", "pipe", "pipe"],
        // Windows: npx is a .cmd shim and needs a shell wrapper.
        // POSIX (Render): spawn in its own process group so we can
        // SIGKILL the whole group in the finally block; without this
        // vite's node child outlives our .kill() and Render times us
        // out with SIGTERM (exit 143).
        shell: isWin,
        detached: !isWin,
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

  // We are capturing HTML, not pixels: the <img src> attributes land in the
  // snapshot whether or not the bytes ever arrive. Waiting on real images was
  // what stopped the /work case studies from reaching networkidle0 inside the
  // timeout — they hotlink images.unsplash.com, so every render paid for a
  // round trip to a third party.
  //
  // Answer them with a stub rather than aborting. An aborted image fires the
  // page's error path, which re-requests, which aborts again: one route span
  // 3,600 retries at a single Unsplash URL and never went idle.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    if (req.resourceType() === "image") {
      req.respond({ status: 200, contentType: "image/png", body: STUB_PNG });
    } else {
      req.continue();
    }
  });

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
  const [proj, agri, live, svc, offers] = await Promise.all([
    extractSlugs(path.join(SRC, "data/projects.js")),
    extractSlugs(path.join(SRC, "data/agri-show-demos.js")),
    extractSlugs(path.join(SRC, "data/live-sites.js")),
    extractSlugs(path.join(SRC, "data/services.js")),
    extractSlugs(path.join(SRC, "data/offers.js")),
  ]);
  const dynamic = [
    ...proj.map((s) => `/work/${s}`),
    ...agri.map((s) => `/work/${s}`),
    ...live.map((s) => `/live/${s}`),
    ...svc.map((s) => `/services/${s}`),
    ...offers.map((s) => `/offers/${s}`),
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

    // Image-heavy pages can miss networkidle0 when four of them compete for
    // the same preview server, and a route that loses that race ships with no
    // static HTML at all. Retry before giving up on it.
    const ATTEMPTS = 3;
    const failed = [];

    async function worker() {
      while (i < routes.length) {
        const my = i++;
        const route = routes[my];
        const target = diskPathFor(route);
        let lastError;
        for (let attempt = 1; attempt <= ATTEMPTS; attempt++) {
          try {
            const html = await renderRoute(browser, route);
            await fs.mkdir(path.dirname(target), { recursive: true });
            await fs.writeFile(target, html, "utf8");
            done++;
            const note = attempt > 1 ? ` (attempt ${attempt})` : "";
            console.log(
              `[prerender] ${String(done).padStart(3, " ")}/${routes.length} ${route}${note}`
            );
            lastError = null;
            break;
          } catch (e) {
            lastError = e;
            if (attempt < ATTEMPTS) await new Promise((r) => setTimeout(r, 1000 * attempt));
          }
        }
        if (lastError) {
          failed.push(route);
          console.warn(`[prerender] FAIL ${route}: ${lastError.message}`);
        }
      }
    }

    await Promise.all(Array.from({ length: CONCURRENCY }, worker));

    const dt = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`[prerender] done — ${done}/${routes.length} routes in ${dt}s`);

    // A page with no static HTML is a page search engines may not index. That
    // is the whole point of this script, so a miss has to fail the build
    // rather than ship quietly.
    if (failed.length) {
      console.error(
        `\n[prerender] ${failed.length} route(s) produced no static HTML after ` +
          `${ATTEMPTS} attempts:\n  ${failed.join("\n  ")}\n`
      );
      process.exitCode = 1;
    }
  } finally {
    // Browser cleanup — never throw, we are about to exit either way.
    if (browser) {
      try { await browser.close(); } catch {}
    }
    // Vite preview was spawned with shell:true on Windows so .kill() only
    // signals the wrapper shell on POSIX, leaving the vite node child
    // running and keeping the event loop alive — which makes Render kill
    // the whole build with SIGTERM (exit 143) even though we finished.
    // Belt and braces: SIGKILL the wrapper, kill the process group on
    // POSIX, then exit the parent explicitly.
    try { preview.kill("SIGKILL"); } catch {}
    if (process.platform !== "win32" && preview && preview.pid) {
      try { process.kill(-preview.pid, "SIGKILL"); } catch {}
    }
  }
}

main()
  // Forcing exit(0) here would discard the exitCode set for failed routes.
  .then(() => process.exit(process.exitCode ?? 0))
  .catch((e) => {
    console.error("[prerender] failed:", e);
    process.exit(1);
  });

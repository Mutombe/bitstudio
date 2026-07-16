// End-to-end browser check for the CRM.
//
// Boots the Django API and the Vite dev server, drives a real Chrome, and
// asserts the things that unit tests cannot: that the login gate actually
// redirects, that a drag lands the card in the new column, that the
// marketing contact form really does reach the API across origins, and that
// a sales rep cannot see a manager's lead.
//
//   npm run e2e
//
// Requires the backend venv at ../backend/.venv and a seeded SQLite DB —
// the script resets and seeds it for you.

import { spawn, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND = path.resolve(__dirname, "..");
const BACKEND = path.resolve(FRONTEND, "..", "backend");
const SHOTS = path.join(FRONTEND, "e2e-artifacts");

const API = "http://localhost:8000";
const WEB = "http://localhost:5173";
const isWin = process.platform === "win32";
const PY = path.join(BACKEND, ".venv", isWin ? "Scripts/python.exe" : "bin/python");

let passed = 0;
const failures = [];

function check(name, condition, detail = "") {
  if (condition) {
    passed++;
    console.log(`  PASS  ${name}`);
  } else {
    failures.push(`${name}${detail ? ` — ${detail}` : ""}`);
    console.log(`  FAIL  ${name}${detail ? ` — ${detail}` : ""}`);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function assertPortFree(url, label) {
  // A stale server left on the port answers with old code, so our fresh one
  // never binds and the whole run tests the wrong build. Refuse to start.
  try {
    await fetch(url);
  } catch {
    return; // nothing listening — good
  }
  throw new Error(
    `${label} is already responding at ${url}. Kill the stale process before running e2e.`
  );
}

async function waitForServer(url, label, timeoutMs = 60_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.status < 500) return;
    } catch {
      /* not up yet */
    }
    await sleep(400);
  }
  throw new Error(`${label} never came up at ${url}`);
}

function resetDatabase() {
  console.log("• resetting + seeding the dev database");
  const db = path.join(BACKEND, "db.sqlite3");
  if (existsSync(db)) rmSync(db);

  for (const args of [["manage.py", "migrate", "--noinput"], ["seed_dev.py"]]) {
    const result = spawnSync(PY, args, {
      cwd: BACKEND,
      env: { ...process.env, DATABASE_URL: "", PYTHONPATH: BACKEND },
      encoding: "utf8",
    });
    if (result.status !== 0) {
      throw new Error(`${args.join(" ")} failed:\n${result.stderr || result.stdout}`);
    }
  }
}

function startServers() {
  const django = spawn(PY, ["manage.py", "runserver", "8000", "--noreload"], {
    cwd: BACKEND,
    // Force SQLite: this suite mutates data and must never touch Neon.
    env: { ...process.env, DATABASE_URL: "", DEBUG: "True" },
    stdio: "ignore",
  });

  const vite = spawn("npx", ["vite", "--port", "5173", "--strictPort"], {
    cwd: FRONTEND,
    env: { ...process.env, VITE_API_URL: API },
    stdio: "ignore",
    shell: isWin,
    detached: !isWin,
  });

  return { django, vite };
}

function stopServers({ django, vite }) {
  for (const proc of [django, vite]) {
    if (!proc) continue;
    try {
      proc.kill("SIGKILL");
    } catch {
      /* already gone */
    }
  }
  if (!isWin && vite?.pid) {
    try {
      process.kill(-vite.pid, "SIGKILL");
    } catch {
      /* already gone */
    }
  }
  if (isWin) {
    // Vite is spawned through the npx shim, so killing the shell orphans node.
    spawnSync("taskkill", ["/F", "/T", "/PID", String(vite.pid)], { stdio: "ignore" });
    // Belt and braces: sweep anything still bound to our ports, so a failed
    // run never strands a server that masks the next run.
    for (const port of [8000, 5173]) {
      const out = spawnSync("netstat", ["-ano"], { encoding: "utf8" }).stdout || "";
      const pids = new Set(
        out
          .split(/\r?\n/)
          .filter((line) => line.includes(`:${port}`) && line.includes("LISTENING"))
          .map((line) => line.trim().split(/\s+/).pop())
          .filter(Boolean)
      );
      for (const pid of pids) {
        spawnSync("taskkill", ["/F", "/PID", pid], { stdio: "ignore" });
      }
    }
  }
}

function findChrome() {
  return (
    process.env.CHROME_PATH ||
    [
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    ].find((p) => {
      try {
        return existsSync(p);
      } catch {
        return false;
      }
    })
  );
}

async function login(page, username, password) {
  await page.goto(`${WEB}/admin/login`, { waitUntil: "networkidle0" });
  await page.type('input[autocomplete="username"]', username);
  await page.type('input[autocomplete="current-password"]', password);
  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForFunction(() => !location.pathname.endsWith("/login"), { timeout: 15_000 }),
  ]);
}

async function logout(page) {
  await page.click('button[aria-label="Sign out"]');
  await page.waitForFunction(() => location.pathname.endsWith("/login"), {
    timeout: 15_000,
  });
}

const textOf = (page, selector) =>
  page.$eval(selector, (el) => el.textContent.trim()).catch(() => null);

const countOf = (page, selector) => page.$$eval(selector, (els) => els.length);

// Focus a field by clicking it, then type — robust against a field that's
// still settling inside a freshly-opened modal.
async function typeInto(page, selector, text) {
  const el = await page.waitForSelector(selector, { visible: true, timeout: 10_000 });
  await el.click();
  await el.type(text);
}

async function run(page) {
  // ─── 1. The admin is never indexable ──────────────────────────────
  await page.goto(`${WEB}/admin/login`, { waitUntil: "networkidle0" });
  const robots = await page
    .$eval('meta[name="robots"]', (el) => el.content)
    .catch(() => null);
  check(
    "admin login page is noindex",
    robots?.includes("noindex") && robots?.includes("nofollow"),
    `robots="${robots}"`
  );

  // ─── 2. The gate actually gates ───────────────────────────────────
  await page.goto(`${WEB}/admin/pipeline`, { waitUntil: "networkidle0" });
  check(
    "signed-out visitor is bounced to /admin/login",
    new URL(page.url()).pathname === "/admin/login",
    page.url()
  );

  // ─── 3. Bad credentials are refused ───────────────────────────────
  // Assert the STATUS, not just "we're still on /login". A CSRF failure also
  // leaves you on /login, and that once made this check pass for the wrong
  // reason while login was completely broken.
  await page.type('input[autocomplete="username"]', "manager");
  await page.type('input[autocomplete="current-password"]', "wrong-password");
  const rejected = page.waitForResponse(
    (res) => res.url().endsWith("/api/auth/login/") && res.request().method() === "POST",
    { timeout: 10_000 }
  );
  await page.click('button[type="submit"]');
  const rejection = await rejected;
  check(
    "bad password is rejected with 401 (not a CSRF 403)",
    rejection.status() === 401,
    `got ${rejection.status()}`
  );
  await page.waitForSelector('[role="alert"]', { timeout: 10_000 });
  check(
    "bad password does not sign the user in",
    new URL(page.url()).pathname === "/admin/login"
  );

  // ─── 4. Manager signs in and sees every lead ──────────────────────
  // Signing in returns you to the page you were originally headed for
  // (step 2 deep-linked to /admin/pipeline), so navigate explicitly rather
  // than assuming where the redirect lands.
  await login(page, "manager", "devpassword");
  check(
    "after login the user is somewhere inside /admin",
    new URL(page.url()).pathname.startsWith("/admin"),
    page.url()
  );

  await page.goto(`${WEB}/admin`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="stat-total"]', { timeout: 15_000 });
  const total = await textOf(page, '[data-testid="stat-total"] p:nth-of-type(2)');
  check("manager dashboard shows 6 total leads", total === "6", `got "${total}"`);

  // Revenue layer: the dashboard talks in money, and the conversion table
  // renders. Seeded pipeline = 5k + 6k + 10k (open) = 21,000.
  const pipelineValue = await textOf(page, '[data-testid="stat-pipeline-value"] p:nth-of-type(2)');
  check(
    "dashboard shows pipeline value in dollars",
    /\$[\d,]+/.test(pipelineValue || ""),
    `got "${pipelineValue}"`
  );
  check(
    "conversion-by-offer table renders",
    (await page.$('[data-testid="by-offer-table"]')) !== null
  );
  await page.screenshot({ path: path.join(SHOTS, "01-dashboard.png") });

  // ─── 5. Pipeline renders the board ────────────────────────────────
  await page.goto(`${WEB}/admin/pipeline`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="lead-card"]');
  check("pipeline shows 6 cards for the manager", (await countOf(page, '[data-testid="lead-card"]')) === 6);

  const inNew = () => countOf(page, '[data-testid="column-new"] [data-testid="lead-card"]');
  const inContacted = () =>
    countOf(page, '[data-testid="column-contacted"] [data-testid="lead-card"]');
  const beforeNew = await inNew();
  const beforeContacted = await inContacted();
  await page.screenshot({ path: path.join(SHOTS, "02-pipeline.png") });

  // ─── 6. Drag a card from New to Contacted ─────────────────────────
  // Native HTML5 DnD. Dispatch the real events with a shared DataTransfer,
  // which is exactly what the browser hands the app.
  await page.evaluate(() => {
    const card = document.querySelector(
      '[data-testid="column-new"] [data-testid="lead-card"]'
    );
    const column = document.querySelector('[data-testid="column-contacted"]');
    const dataTransfer = new DataTransfer();
    card.dispatchEvent(new DragEvent("dragstart", { bubbles: true, dataTransfer }));
    column.dispatchEvent(
      new DragEvent("dragover", { bubbles: true, cancelable: true, dataTransfer })
    );
    column.dispatchEvent(new DragEvent("drop", { bubbles: true, dataTransfer }));
  });
  await page.waitForFunction(
    (expected) =>
      document.querySelectorAll(
        '[data-testid="column-contacted"] [data-testid="lead-card"]'
      ).length === expected,
    { timeout: 10_000 },
    beforeContacted + 1
  );
  check("dragging a card moves it to Contacted", (await inContacted()) === beforeContacted + 1);
  check("the card left the New column", (await inNew()) === beforeNew - 1);

  // The move must survive a reload — i.e. it was persisted, not just optimistic.
  await page.reload({ waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="lead-card"]');
  check(
    "the move persisted across a reload",
    (await inContacted()) === beforeContacted + 1,
    `contacted=${await inContacted()}`
  );

  // ─── 7. Lead detail: note + stage change are logged ───────────────
  await page.click('[data-testid="lead-card"] a');
  await page.waitForSelector('[data-testid="note-input"]', { timeout: 15_000 });
  const activitiesBefore = await countOf(page, '[data-testid="activity-item"]');

  await page.type('[data-testid="note-input"]', "Called. Wants a demo Thursday.");
  await page.click('form button[type="submit"]');
  await page.waitForFunction(
    (n) => document.querySelectorAll('[data-testid="activity-item"]').length > n,
    { timeout: 10_000 },
    activitiesBefore
  );
  const timeline = await textOf(page, '[data-testid="activity-list"]');
  check("a note appears in the activity timeline", timeline?.includes("Wants a demo Thursday"));

  await page.select('[data-testid="stage-select"]', "qualified");
  await page.waitForFunction(
    () =>
      document
        .querySelector('[data-testid="activity-list"]')
        ?.textContent.includes("Qualified"),
    { timeout: 10_000 }
  );
  check("a stage change is auto-logged", true);
  check(
    "manager sees the owner dropdown",
    (await page.$('[data-testid="owner-select"]')) !== null
  );

  // Deal value is present and editable.
  const seededValue = await page.$eval('[data-testid="value-input"]', (el) => el.value);
  check("lead detail shows a seeded deal value", Number(seededValue) > 0, `got "${seededValue}"`);

  // Add a follow-up (defaults to the creator), then confirm it lands in
  // "my follow-ups".
  await page.type('[data-testid="task-title"]', "Call Tendai back");
  await page.click('[data-testid="add-task"]');
  await page.waitForFunction(
    () => document.body.innerText.includes("Call Tendai back"),
    { timeout: 10_000 }
  );
  await page.screenshot({ path: path.join(SHOTS, "03-lead-detail.png") });

  await page.goto(`${WEB}/admin/follow-ups`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="followups-count"]', { timeout: 15_000 });
  check(
    "the follow-up appears in my follow-ups",
    (await page.evaluate(() => document.body.innerText)).includes("Call Tendai back")
  );
  await page.screenshot({ path: path.join(SHOTS, "06-follow-ups.png") });

  // ─── 7b. Manual lead CRUD ─────────────────────────────────────────
  await page.goto(`${WEB}/admin/leads`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="new-lead-btn"]', { timeout: 15_000 });
  await page.click('[data-testid="new-lead-btn"]');
  await page.waitForSelector('[data-testid="lf-name"]', { visible: true, timeout: 15_000 });
  await sleep(400); // let the modal settle + its chunk finish compiling on a cold start
  await typeInto(page, '[data-testid="lf-name"]', "Walk-in Winston");
  await typeInto(page, 'input[type="email"]', "winston@example.co.zw");
  await page.click('[data-testid="lf-submit"]');
  await page.waitForFunction(
    () => /\/admin\/leads\/[0-9a-f-]{36}$/.test(location.pathname),
    { timeout: 20_000 }
  );
  await page.waitForSelector('[data-testid="edit-lead-btn"]', { timeout: 15_000 });
  check(
    "created a lead in a modal and landed on its detail",
    (await page.evaluate(() => document.querySelector("h1")?.textContent)) === "Walk-in Winston"
  );

  // Edit via the modal — fill the (empty) company field.
  await page.click('[data-testid="edit-lead-btn"]');
  await page.waitForSelector('[data-testid="lf-company"]', { visible: true, timeout: 10_000 });
  await sleep(300);
  await typeInto(page, '[data-testid="lf-company"]', "Winston Holdings");
  await page.click('[data-testid="lf-submit"]');
  await page.waitForFunction(
    () => document.body.innerText.includes("Winston Holdings"),
    { timeout: 10_000 }
  );
  check("edited the lead in a modal", true);

  // Log a call.
  await page.click('[data-testid="log-kind-call"]');
  await page.type('[data-testid="note-input"]', "Called, wants a rent-collection demo.");
  await page.click('[data-testid="log-submit"]');
  await page.waitForFunction(
    () =>
      document
        .querySelector('[data-testid="activity-list"]')
        ?.textContent.includes("rent-collection demo"),
    { timeout: 10_000 }
  );
  check("logged a call on the activity timeline", true);

  // Tag this lead, then confirm it shows.
  await page.select('[data-testid="add-tag-select"]', await page.$eval(
    '[data-testid="add-tag-select"] option:nth-child(2)', (o) => o.value
  ));
  await page.waitForFunction(
    () => document.querySelector('[data-testid="lead-tags"]')?.querySelectorAll("span").length > 0,
    { timeout: 10_000 }
  );
  check("added a tag to the lead", true);
  await page.screenshot({ path: path.join(SHOTS, "07-lead-edit-log.png") });

  // ─── 7c. Bulk actions + sorting on the leads list ─────────────────
  await page.goto(`${WEB}/admin/leads`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="select-all"]', { timeout: 15_000 });

  // Sort by value: clicking the header re-orders the table.
  const firstNameBefore = await textOf(page, "tbody tr:first-child td:nth-child(2)");
  await page.evaluate(() => {
    const th = [...document.querySelectorAll("th")].find((t) => t.textContent.includes("Value"));
    th?.click();
  });
  await sleep(600);
  const firstNameAfter = await textOf(page, "tbody tr:first-child td:nth-child(2)");
  check("sorting by a column reorders the list", firstNameBefore !== firstNameAfter, `${firstNameBefore} vs ${firstNameAfter}`);

  // Select all, bulk-move to Qualified.
  await page.click('[data-testid="select-all"]');
  await page.waitForSelector('[data-testid="bulk-bar"]', { timeout: 10_000 });
  check("selecting rows reveals the bulk bar", true);

  const beforeQualified = await page.$$eval(
    "tbody tr",
    (rows) => rows.filter((r) => r.textContent.includes("Qualified")).length
  );
  await page.select('[data-testid="bulk-stage"]', "qualified");
  await page.waitForFunction(
    (before) =>
      [...document.querySelectorAll("tbody tr")].filter((r) => r.textContent.includes("Qualified")).length > before,
    { timeout: 10_000 },
    beforeQualified
  );
  check("bulk stage change updated the rows", true);
  await page.screenshot({ path: path.join(SHOTS, "09-leads-bulk.png") });

  // ─── 7d. CSV import (modal) ───────────────────────────────────────
  await page.goto(`${WEB}/admin/leads`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="import-btn"]', { timeout: 15_000 });
  await page.click('[data-testid="import-btn"]');
  const fileInput = await page.waitForSelector('[data-testid="import-file"]', { visible: true, timeout: 15_000 });
  await sleep(350);
  const csvPath = path.join(SHOTS, "_import.csv");
  const { writeFileSync } = await import("node:fs");
  writeFileSync(csvPath, "name,email,company,value\nImported Ada,ada@import.co.zw,Ada Co,7000\nImported Ben,ben@import.co.zw,,\n");
  await fileInput.uploadFile(csvPath);
  await page.click('[data-testid="import-submit"]');
  await page.waitForSelector('[data-testid="import-result"]', { timeout: 15_000 });
  check(
    "CSV import (modal) reports leads created",
    (await textOf(page, '[data-testid="import-result"]'))?.includes("created")
  );
  await page.screenshot({ path: path.join(SHOTS, "10-import.png") });

  // ─── 7e. Duplicate warning in the New Lead modal ──────────────────
  await page.goto(`${WEB}/admin/leads`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="new-lead-btn"]', { timeout: 15_000 });
  await page.click('[data-testid="new-lead-btn"]');
  await page.waitForSelector('[data-testid="lf-name"]', { visible: true, timeout: 10_000 });
  await sleep(400);
  await typeInto(page, 'input[type="email"]', "ada@import.co.zw"); // just imported
  await page.waitForSelector('[data-testid="dup-warning"]', { timeout: 10_000 });
  check("New Lead modal warns on a duplicate email", true);
  // Close the modal so it doesn't overlay later steps.
  await page.keyboard.press("Escape");
  await sleep(300);

  // ─── 7f. Lead score + email + calendar on a lead ──────────────────
  await page.goto(`${WEB}/admin/leads`, { waitUntil: "networkidle0" });
  await page.waitForSelector("tbody tr", { timeout: 15_000 });
  const scoreCells = await page.$$eval(
    "tbody tr td:nth-child(3)",
    (tds) => tds.map((t) => t.textContent.trim())
  );
  check("leads list shows a numeric score column", scoreCells.some((s) => /^\d+$/.test(s)));

  // Open a lead with an email (Tendai). The name is a prefetch link (button).
  await page.evaluate(() => {
    const link = [...document.querySelectorAll("tbody tr button")].find((b) => b.textContent.includes("Tendai"));
    link?.click();
  });
  await page.waitForSelector('[data-testid="lead-score"]', { timeout: 15_000 });
  check("lead detail shows the score badge", true);

  await page.click('[data-testid="email-btn"]');
  await page.waitForSelector('[data-testid="email-subject"]', { timeout: 10_000 });
  await page.type('[data-testid="email-subject"]', "Quick hello");
  await page.type('[data-testid="email-body"]', "Testing {{name}} from the CRM.");
  await page.click('[data-testid="email-send"]');
  await page.waitForFunction(
    () => document.querySelector('[data-testid="activity-list"]')?.textContent.includes("Sent email"),
    { timeout: 10_000 }
  );
  check("sent an email and it logged to the timeline", true);

  // ─── 7g. Reports ──────────────────────────────────────────────────
  await page.goto(`${WEB}/admin/reports`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="report-rows"]', { timeout: 15_000 });
  check(
    "reports page renders grouped rows",
    (await countOf(page, '[data-testid="report-rows"] > div')) > 0
  );
  await page.screenshot({ path: path.join(SHOTS, "11-reports.png") });

  // ─── 7h. Companies ────────────────────────────────────────────────
  await page.goto(`${WEB}/admin/companies`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="new-company-btn"]', { timeout: 15_000 });
  await page.click('[data-testid="new-company-btn"]');
  await page.waitForSelector('[data-testid="company-name"]', { visible: true, timeout: 10_000 });
  await sleep(350);
  await typeInto(page, '[data-testid="company-name"]', "Acme Holdings");
  await page.click('[data-testid="create-company"]');
  await page.waitForFunction(
    () => document.querySelector('[data-testid="companies-table"]')?.textContent.includes("Acme Holdings"),
    { timeout: 10_000 }
  );
  check("created a company account", true);

  // ─── 7i. Notification bell ────────────────────────────────────────
  await sleep(500); // let the company modal's backdrop finish animating out
  await page.click('[data-testid="notif-bell"]');
  await page.waitForSelector('[data-testid="notif-panel"]', { timeout: 10_000 });
  check("notification bell opens a panel", true);

  // ─── 8. Role scoping is visible in the UI ─────────────────────────
  await logout(page);
  await login(page, "sales", "devpassword");
  await page.goto(`${WEB}/admin/pipeline`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="lead-card"]');

  const salesCards = await countOf(page, '[data-testid="lead-card"]');
  check("sales rep sees only their own + unassigned (5)", salesCards === 5, `saw ${salesCards}`);

  const salesNames = await page.$$eval('[data-testid="lead-card"]', (cards) =>
    cards.map((c) => c.textContent)
  );
  check(
    "sales rep cannot see the manager's lead (Nyasha Chirwa)",
    !salesNames.some((t) => t.includes("Nyasha"))
  );

  await page.click('[data-testid="lead-card"] a');
  await page.waitForSelector('[data-testid="stage-select"]', { timeout: 15_000 });
  check(
    "sales rep gets no owner dropdown",
    (await page.$('[data-testid="owner-select"]')) === null
  );
  await page.screenshot({ path: path.join(SHOTS, "04-sales-scoped.png") });

  // ─── 9. The marketing form really captures a lead, cross-origin ───
  const before = await fetch(`${API}/api/leads/`, { method: "OPTIONS" }).then(() => true);
  check("api reachable for capture", before);

  const page2 = await page.browser().newPage();
  // The form hands off to WhatsApp. Swallow the popup and the outbound nav.
  page2.on("popup", async (popup) => popup.close().catch(() => {}));
  await page2.setRequestInterception(true);
  page2.on("request", (req) => {
    if (req.url().includes("wa.me")) req.abort().catch(() => {});
    else req.continue().catch(() => {});
  });

  await page2.goto(`${WEB}/contact?offer=ai-automation&tier=AI%20Assistant`, {
    waitUntil: "networkidle0",
  });

  // The honeypot is the first text input in the form. A human never sees it;
  // if a selector here ever matches it, the submit silently fails validation.
  const honeypot = await page2.$('input[name="website"]');
  check("contact form carries a honeypot field", honeypot !== null);
  check(
    "the honeypot is invisible to humans",
    (await honeypot.boundingBox()) === null ||
      (await honeypot.evaluate((el) => el.getBoundingClientRect().left < -1000))
  );

  await page2.type('input[type="text"]:not([name="website"])', "E2E Buyer");
  await page2.type("textarea", "Our team drowns in spreadsheets.");
  await page2.type('input[type="email"]', "e2e@buyer.co.zw");

  const captured = page2.waitForResponse(
    (res) => res.url().endsWith("/api/leads/") && res.request().method() === "POST",
    { timeout: 15_000 }
  );
  await page2.click('button[type="submit"]');
  const response = await captured;
  check("contact form POSTs the lead to the API", response.status() === 201, `status ${response.status()}`);

  const body = await response.json().catch(() => ({}));
  check("captured lead carries offer attribution", body.offer_slug === "ai-automation", JSON.stringify(body).slice(0, 120));
  check("captured lead carries the pricing tier", body.tier === "AI Assistant");
  await page2.close();

  // ─── 10. And the new lead shows up in the CRM ─────────────────────
  await page.goto(`${WEB}/admin/leads`, { waitUntil: "networkidle0" });
  await page.waitForSelector("table");
  const table = await textOf(page, "table");
  check("the captured lead appears in the CRM leads list", table?.includes("E2E Buyer"));
  check("the leads list shows deal value in dollars", /\$[\d,]+/.test(table || ""));
  await page.screenshot({ path: path.join(SHOTS, "05-leads-list.png") });

  // ─── 11. User administration (admin only) ─────────────────────────
  // Sales must not even have the Users nav.
  check(
    "sales rep does not see the Users nav",
    (await page.$('a[href="/admin/users"]')) === null
  );

  await logout(page);
  await login(page, "owner", "devpassword");
  await page.goto(`${WEB}/admin/users`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="add-user-btn"]', { timeout: 15_000 });
  await page.click('[data-testid="add-user-btn"]');
  await page.waitForSelector('[data-testid="new-username"]', { visible: true, timeout: 10_000 });
  await sleep(350);
  await typeInto(page, '[data-testid="new-username"]', "e2e_rep");
  await typeInto(page, '[data-testid="new-password"]', "e2e-str0ng-pass!");
  await page.click('[data-testid="create-user"]');
  await page.waitForFunction(
    () =>
      document.querySelector('[data-testid="users-table"]')?.textContent.includes("e2e_rep"),
    { timeout: 10_000 }
  );
  check("admin created a new user (modal)", true);
  await page.screenshot({ path: path.join(SHOTS, "08-users.png") });

  // ─── 12. Settings (admin): custom field, web-to-lead key, audit ───
  await page.goto(`${WEB}/admin/settings`, { waitUntil: "networkidle0" });
  await page.waitForSelector('[data-testid="cf-label"]', { timeout: 15_000 });
  await page.type('[data-testid="cf-label"]', "Budget band");
  await page.click('[data-testid="cf-add"]');
  await page.waitForFunction(
    () => document.body.innerText.includes("Budget band"),
    { timeout: 10_000 }
  );
  check("admin created a custom field", true);

  await page.click('[data-testid="tab-web-to-lead"]');
  await page.waitForSelector('[data-testid="key-add"]', { timeout: 10_000 });
  await page.type('input[placeholder^="Source name"]', "Partner site");
  await page.click('[data-testid="key-add"]');
  await page.waitForFunction(
    () => document.body.innerText.includes("Partner site"),
    { timeout: 10_000 }
  );
  check("admin generated a web-to-lead key", true);

  await page.click('[data-testid="tab-audit"]');
  await page.waitForSelector('[data-testid="audit-table"]', { timeout: 10_000 });
  // The table shell renders before its fetch resolves — wait for a real row.
  await page.waitForFunction(
    () => document.querySelectorAll('[data-testid="audit-table"] tbody tr').length > 0,
    { timeout: 10_000 }
  );
  check("audit log shows recorded actions", true);
  await page.screenshot({ path: path.join(SHOTS, "12-settings.png") });
}

async function main() {
  rmSync(SHOTS, { recursive: true, force: true });
  mkdirSync(SHOTS, { recursive: true });

  await assertPortFree(`${API}/healthz`, "django (port 8000)");
  await assertPortFree(WEB, "vite (port 5173)");

  resetDatabase();
  console.log("• starting django + vite");
  const servers = startServers();

  let browser;
  try {
    await waitForServer(`${API}/healthz`, "django");
    await waitForServer(WEB, "vite");

    // Pre-warm the dev server. Vite compiles a route on first request, and the
    // lazy admin chunk on a cold start can take longer than a nav timeout —
    // which looks like a failure but is just the first compile.
    console.log("• warming routes");
    for (const route of ["/admin/login", "/contact"]) {
      await fetch(`${WEB}${route}`).catch(() => {});
    }
    console.log("• both up. launching chrome\n");

    browser = await puppeteer.launch({
      headless: "new",
      executablePath: findChrome() || undefined,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    // Cold Vite compiles can outlast the 30s default on a loaded machine.
    page.setDefaultNavigationTimeout(60_000);
    page.on("pageerror", (err) => console.log(`  [page error] ${err.message}`));
    page.on("console", (msg) => {
      if (msg.type() === "error") console.log(`  [console] ${msg.text()}`);
    });
    page.on("response", (res) => {
      if (res.url().includes("/api/") && res.status() >= 400) {
        console.log(`  [api ${res.status()}] ${res.request().method()} ${res.url()}`);
      }
    });

    try {
      await run(page);
    } catch (err) {
      await page
        .screenshot({ path: path.join(SHOTS, "failure.png") })
        .catch(() => {});
      const seen = await page
        .evaluate(() => ({ url: location.href, text: document.body.innerText.slice(0, 400) }))
        .catch(() => null);
      if (seen) {
        console.log(`\n  [at failure] ${seen.url}\n  ---\n${seen.text}\n  ---`);
      }
      throw err;
    }
  } finally {
    if (browser) await browser.close().catch(() => {});
    stopServers(servers);
  }

  console.log(`\n${passed} passed, ${failures.length} failed`);
  if (failures.length) {
    failures.forEach((f) => console.log(`  ✗ ${f}`));
    process.exit(1);
  }
  console.log(`screenshots → ${SHOTS}`);
}

main().catch((err) => {
  console.error("\ne2e failed:", err);
  process.exit(1);
});

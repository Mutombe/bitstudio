// Bit Studio. Thin client for the CRM backend.
//
// VITE_ vars are compiled into the public bundle. Only ever put the API's
// public base URL here — never a key, never a token.
//
// When VITE_API_URL is unset (local preview, a fork, a contributor's
// checkout) capture is a no-op rather than a console full of red. The
// visitor's WhatsApp/email handoff must never depend on our backend.

const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

export function isCaptureEnabled() {
  return Boolean(API_URL);
}

/**
 * Persist an inbound enquiry.
 *
 * `keepalive` lets the request outlive the page if the visitor navigates
 * away the instant they submit — the lead lands even if we lose the tab.
 *
 * Throws on a non-2xx so the caller can log it. Callers must never let a
 * failure here block the buyer's actual next step.
 */
export async function captureLead(payload) {
  if (!API_URL) return null;

  const response = await fetch(`${API_URL}/api/leads/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  });

  if (!response.ok) {
    throw new Error(`Lead capture failed: ${response.status}`);
  }
  return response.json();
}

/**
 * Attribution the browser already knows. Read once at submit time.
 * `search` is a URLSearchParams from the current location.
 */
export function attributionFrom(search) {
  const offer = search.get("offer") || "";
  const pkg = search.get("package") || "";

  let source = "contact_form";
  if (offer) source = "offer_page";
  else if (pkg) source = "package_page";

  return {
    source,
    offer_slug: offer || pkg,
    tier: search.get("tier") || "",
    utm_source: search.get("utm_source") || "",
    utm_medium: search.get("utm_medium") || "",
    utm_campaign: search.get("utm_campaign") || "",
    page_url: typeof window !== "undefined" ? window.location.href : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
  };
}

// Bit Studio. Client for the CRM backend.
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

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function readCookie(name) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

const UNSAFE = new Set(["POST", "PUT", "PATCH", "DELETE"]);

/**
 * Authenticated request against the CRM.
 *
 * Sends the session cookie (`credentials: include`) and echoes Django's
 * csrftoken back as X-CSRFToken, which is what its CSRF check expects.
 */
async function request(path, { method = "GET", body } = {}) {
  if (!API_URL) throw new ApiError("API is not configured.", 0, null);

  const headers = { "Content-Type": "application/json" };
  if (UNSAFE.has(method)) {
    const token = readCookie("csrftoken");
    if (token) headers["X-CSRFToken"] = token;
  }

  const response = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    credentials: "include",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (response.status === 204) return null;

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      data?.detail || `Request failed (${response.status})`,
      response.status,
      data
    );
  }
  return data;
}

// ─── Public lead capture ─────────────────────────────────────────────

/**
 * Persist an inbound enquiry.
 *
 * Sent WITHOUT credentials on purpose. Django only enforces CSRF on an
 * authenticated session, so an anonymous POST needs no token — and a
 * signed-in staff member browsing /contact must not trip a CSRF failure.
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

/**
 * Upload a CSV of leads. Multipart, not JSON, so it can't go through
 * request() — but it still needs the session cookie and CSRF token.
 */
export async function importLeadsCsv(file) {
  const form = new FormData();
  form.append("file", file);
  const headers = {};
  const token = readCookie("csrftoken");
  if (token) headers["X-CSRFToken"] = token;

  const response = await fetch(`${API_URL}/api/leads/import_csv/`, {
    method: "POST",
    headers,
    credentials: "include",
    body: form,
  });
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(data?.detail || "Import failed", response.status, data);
  }
  return data;
}

// ─── Auth ────────────────────────────────────────────────────────────

export const auth = {
  // Plants the csrftoken cookie. Call once before the first unsafe request.
  primeCsrf: () => request("/api/auth/csrf/"),
  login: (username, password) =>
    request("/api/auth/login/", { method: "POST", body: { username, password } }),
  logout: () => request("/api/auth/logout/", { method: "POST" }),
  me: () => request("/api/auth/me/"),
};

// ─── CRM ─────────────────────────────────────────────────────────────

function queryString(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      search.set(key, value);
    }
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

export const crm = {
  stats: () => request("/api/stats/"),
  team: () => request("/api/team/"),

  listTasks: (params) => request(`/api/tasks/${queryString(params)}`),

  listLeads: (params) => request(`/api/leads/${queryString(params)}`),
  getLead: (id) => request(`/api/leads/${id}/`),
  createLead: (lead) => request("/api/leads/", { method: "POST", body: lead }),
  updateLead: (id, patch) =>
    request(`/api/leads/${id}/`, { method: "PATCH", body: patch }),
  deleteLead: (id) => request(`/api/leads/${id}/`, { method: "DELETE" }),
  // The CSV export isn't JSON — hand back the URL for a plain browser download,
  // which carries the session cookie automatically.
  exportUrl: (params) => `${API_URL}/api/leads/export/${queryString(params)}`,
  checkDuplicate: (params) =>
    request(`/api/leads/check-duplicate/${queryString(params)}`),
  bulk: (ids, action, value) =>
    request("/api/leads/bulk/", { method: "POST", body: { ids, action, value } }),

  // Tags
  listTags: () => request("/api/tags/"),
  createTag: (tag) => request("/api/tags/", { method: "POST", body: tag }),
  deleteTag: (id) => request(`/api/tags/${id}/`, { method: "DELETE" }),

  // kind: note | call | email | meeting | whatsapp
  logActivity: (id, kind, body) =>
    request(`/api/leads/${id}/notes/`, { method: "POST", body: { kind, body } }),

  addTask: (id, task) =>
    request(`/api/leads/${id}/tasks/`, { method: "POST", body: task }),
  updateTask: (taskId, patch) =>
    request(`/api/tasks/${taskId}/`, { method: "PATCH", body: patch }),
  deleteTask: (taskId) => request(`/api/tasks/${taskId}/`, { method: "DELETE" }),
  taskIcsUrl: (taskId) => `${API_URL}/api/tasks/${taskId}/ics/`,

  // Email
  sendEmail: (id, subject, body) =>
    request(`/api/leads/${id}/send-email/`, { method: "POST", body: { subject, body } }),
  listEmailTemplates: () => request("/api/email-templates/"),
  createEmailTemplate: (t) => request("/api/email-templates/", { method: "POST", body: t }),
  deleteEmailTemplate: (id) => request(`/api/email-templates/${id}/`, { method: "DELETE" }),

  // Reports
  report: (params) => request(`/api/reports/${queryString(params)}`),

  // Companies + contacts
  listCompanies: (params) => request(`/api/companies/${queryString(params)}`),
  getCompany: (id) => request(`/api/companies/${id}/`),
  createCompany: (c) => request("/api/companies/", { method: "POST", body: c }),
  listContacts: (params) => request(`/api/contacts/${queryString(params)}`),
  createContact: (c) => request("/api/contacts/", { method: "POST", body: c }),

  // Saved views
  listViews: () => request("/api/saved-views/"),
  createView: (v) => request("/api/saved-views/", { method: "POST", body: v }),
  deleteView: (id) => request(`/api/saved-views/${id}/`, { method: "DELETE" }),

  // Custom field definitions
  listCustomFields: () => request("/api/custom-fields/"),
};

export const notifications = {
  list: () => request("/api/notifications/"),
  unreadCount: () => request("/api/notifications/unread-count/"),
  markAllRead: () => request("/api/notifications/mark-all-read/", { method: "POST" }),
};

export const admin = {
  listUsers: () => request("/api/users/"),
  createUser: (user) => request("/api/users/", { method: "POST", body: user }),
  updateUser: (id, patch) => request(`/api/users/${id}/`, { method: "PATCH", body: patch }),
  resetPassword: (id, password) =>
    request(`/api/users/${id}/reset-password/`, { method: "POST", body: { password } }),

  // Custom fields (admin write)
  createCustomField: (f) => request("/api/custom-fields/", { method: "POST", body: f }),
  deleteCustomField: (id) => request(`/api/custom-fields/${id}/`, { method: "DELETE" }),

  // Web-to-lead keys
  listIntakeKeys: () => request("/api/intake-keys/"),
  createIntakeKey: (k) => request("/api/intake-keys/", { method: "POST", body: k }),
  updateIntakeKey: (id, patch) => request(`/api/intake-keys/${id}/`, { method: "PATCH", body: patch }),

  // Audit log
  auditLog: (params) => request(`/api/audit-log/${queryString(params)}`),
};

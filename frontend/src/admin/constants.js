// Mirrors leads.models.Lead.Status on the backend. Order is the pipeline,
// left to right. Keep in sync — the board renders one column per entry.

// Neutral, professional stage colours — muted, not the marketing palette.
export const STAGES = [
  { id: "new", label: "New", accent: "#8A93A3" },
  { id: "contacted", label: "Contacted", accent: "#7C93C9" },
  { id: "qualified", label: "Qualified", accent: "#5B82F0" },
  { id: "proposal", label: "Proposal sent", accent: "#C9A24B" },
  { id: "won", label: "Won", accent: "#4B9E6B" },
  { id: "lost", label: "Lost", accent: "#C46A6A" },
];

export const STAGE_LABEL = Object.fromEntries(
  STAGES.map((s) => [s.id, s.label])
);

export const SOURCE_LABEL = {
  contact_form: "Contact form",
  offer_page: "Offer page",
  package_page: "Package page",
  manual: "Added by staff",
  referral: "Referral",
  phone: "Phone call",
  walk_in: "Walk-in",
  other: "Other",
};

// Sources a staff member can pick when adding a lead by hand (web-only
// sources like contact_form are set by the website, not chosen here).
export const MANUAL_SOURCES = ["manual", "referral", "phone", "walk_in", "other"];

// Touches a human can log on a lead. Keys match Activity.LOGGABLE_KINDS.
export const ACTIVITY_KINDS = [
  { id: "note", label: "Note" },
  { id: "call", label: "Call" },
  { id: "email", label: "Email" },
  { id: "meeting", label: "Meeting" },
  { id: "whatsapp", label: "WhatsApp" },
];

export const ROLE_LABEL = {
  admin: "Admin",
  manager: "Manager",
  sales: "Sales",
};

// Lead score → colour. Muted green high, neutral grey low.
export function scoreColor(score) {
  if (score >= 70) return "#4B9E6B";
  if (score >= 40) return "#C9A24B";
  if (score >= 20) return "#8A93A3";
  return "#6B7280";
}

// Whole-dollar USD. Deal values are round numbers, so cents are noise.
const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatMoney(value) {
  const number = Number(value);
  return Number.isFinite(number) ? USD.format(number) : "$0";
}

export function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

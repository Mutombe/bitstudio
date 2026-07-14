// Mirrors leads.models.Lead.Status on the backend. Order is the pipeline,
// left to right. Keep in sync — the board renders one column per entry.

export const STAGES = [
  { id: "new", label: "New", accent: "#D4FF3A" },
  { id: "contacted", label: "Contacted", accent: "#A8C72E" },
  { id: "qualified", label: "Qualified", accent: "#22D3EE" },
  { id: "proposal", label: "Proposal sent", accent: "#9F6BFF" },
  { id: "won", label: "Won", accent: "#25D366" },
  { id: "lost", label: "Lost", accent: "#B54656" },
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

// Lead score → colour. Warm high, cool low.
export function scoreColor(score) {
  if (score >= 70) return "#25D366";
  if (score >= 40) return "#D4FF3A";
  if (score >= 20) return "#F5C518";
  return "#9DA6B0";
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

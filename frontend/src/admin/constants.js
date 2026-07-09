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
  other: "Other",
};

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

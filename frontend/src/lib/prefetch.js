// Hover-prefetch cache. When a user hovers a cross-entity link (a lead's
// company, a company's lead), we start fetching the detail immediately and
// stash the promise. The destination page reads the cache first, so by the
// time the click lands the data is usually already there — the detail opens
// instantly instead of showing a spinner.
//
// Entries are short-lived: a prefetch is a bet the user is about to click, not
// a durable cache. TTL keeps stale records from ever being shown.

import { crm } from "./api.js";

const TTL = 30_000; // 30s — long enough to cover hover → click
const store = new Map(); // key -> { at, promise }

function remember(key, fetcher) {
  const hit = store.get(key);
  if (hit && Date.now() - hit.at < TTL) return hit.promise;
  const promise = fetcher().catch((err) => {
    store.delete(key); // don't cache failures
    throw err;
  });
  store.set(key, { at: Date.now(), promise });
  return promise;
}

export const prefetchLead = (id) => remember(`lead:${id}`, () => crm.getLead(id));
export const prefetchCompany = (id) => remember(`company:${id}`, () => crm.getCompany(id));

// Drop a prefetched copy after the record is mutated, so a later hover/open
// refetches instead of showing the pre-change version.
export const invalidateLead = (id) => store.delete(`lead:${id}`);
export const invalidateCompany = (id) => store.delete(`company:${id}`);

// The detail pages call these: use a fresh-enough prefetch if one exists,
// otherwise fetch normally. Either way you get a Promise of the record.
export const getLeadCached = (id) => {
  const hit = store.get(`lead:${id}`);
  return hit && Date.now() - hit.at < TTL ? hit.promise : crm.getLead(id);
};
export const getCompanyCached = (id) => {
  const hit = store.get(`company:${id}`);
  return hit && Date.now() - hit.at < TTL ? hit.promise : crm.getCompany(id);
};

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const usdCompact = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatMoney(value, { compact = false } = {}) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "—";
  return compact && Math.abs(n) >= 10000 ? usdCompact.format(n) : usd.format(n);
}

export function formatDate(value, opts = { month: "short", day: "numeric", year: "numeric" }) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { timeZone: "UTC", ...opts });
}

/** "Mar 28 – Apr 5, 2027" or "Dec 30, 2026 – Jan 3, 2027" */
export function formatDateRange(start, end) {
  if (!start) return "—";
  const s = new Date(start);
  if (!end) return formatDate(s);
  const e = new Date(end);
  const sameYear = s.getUTCFullYear() === e.getUTCFullYear();
  const left = formatDate(s, sameYear ? { month: "short", day: "numeric" } : undefined);
  return `${left} – ${formatDate(e)}`;
}

export function tripLength(start, end) {
  if (!start || !end) return null;
  const days = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
  return days > 0 ? days : null;
}

export function daysUntil(value) {
  if (!value) return null;
  const diff = new Date(value) - new Date();
  return Math.ceil(diff / 86400000);
}

export function initials(name) {
  if (!name) return "U";
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function sum(list, key) {
  return (list || []).reduce((acc, item) => acc + (Number(key ? item[key] : item) || 0), 0);
}

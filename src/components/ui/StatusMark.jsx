/*
  Trip state is a mark plus a word, never colour alone:
  Planning = open ring, Upcoming = gold square, Completed = emerald tick.
*/
const MARKS = {
  Planning: (
    <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden="true">
      <circle cx="6" cy="6" r="4.25" fill="none" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  ),
  Upcoming: (
    <svg viewBox="0 0 12 12" className="h-3 w-3 text-gold" aria-hidden="true">
      <rect x="1.5" y="1.5" width="9" height="9" fill="currentColor" stroke="#161412" strokeWidth="1" />
    </svg>
  ),
  Completed: (
    <svg viewBox="0 0 12 12" className="h-3 w-3 text-emerald" aria-hidden="true">
      <path d="M1.5 6.5 4.5 9.5 10.5 2.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  ),
};

export default function StatusMark({ status = "Planning", tone = "dark", className = "" }) {
  const label = MARKS[status] ? status : "Planning";
  const color = tone === "light" ? "text-board" : "text-ink";
  return (
    <span className={`inline-flex items-center gap-1.5 caps text-[0.72rem] ${color} ${className}`}>
      {MARKS[label]}
      {label}
    </span>
  );
}

import Link from "next/link";

/** Colour-stripe tile + wordmark. tone="light" for ink backgrounds. */
export default function BrandMark({ tone = "dark", href = "/", className = "", showWord = true }) {
  const word = tone === "light" ? "text-board" : "text-ink";
  return (
    <Link href={href} className={`inline-flex items-center gap-2.5 ${className}`} aria-label="VoyageAI home">
      <span aria-hidden="true" className="flex h-7 overflow-hidden border border-ink/60">
        <span className="w-2.5 bg-crimson" />
        <span className="w-2.5 bg-gold" />
        <span className="w-2.5 bg-emerald" />
      </span>
      {showWord && (
        <span className={`display text-[1.55rem] leading-none tracking-[0.01em] ${word}`}>VoyageAI</span>
      )}
    </Link>
  );
}

/** A thin strip of the four inks, used as a band edge. */
export function InkStripe({ className = "" }) {
  return (
    <div aria-hidden="true" className={`grid h-2 grid-cols-[3fr_2fr_2fr_1fr] ${className}`}>
      <span className="bg-crimson" />
      <span className="bg-gold" />
      <span className="bg-emerald" />
      <span className="bg-ink" />
    </div>
  );
}

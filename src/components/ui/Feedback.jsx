import Button from "./Button";

/** Three ink bars filling in turn: the loading glyph of this world. */
export function Loader({ label = "Loading", className = "" }) {
  return (
    <div role="status" className={`flex items-center gap-3 text-ink-soft ${className}`}>
      <span className="flex h-5 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-[5px] bg-crimson"
            style={{
              height: `${8 + i * 5}px`,
              animation: `typing 1s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </span>
      <span className="caps text-[0.8rem]">{label}</span>
    </div>
  );
}

export function PageLoader({ label }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loader label={label} />
    </div>
  );
}

export function Skeleton({ className = "" }) {
  return <div aria-hidden="true" className={`animate-pulse bg-ink/[0.08] ${className}`} />;
}

/** Empty state: a drawn glyph, one plain sentence, one action. */
export function EmptyState({ glyph = "squares", title, children, action, className = "" }) {
  return (
    <div className={`border-[1.5px] border-dashed border-ink/35 px-6 py-12 text-center ${className}`}>
      <div className="mx-auto mb-5 w-fit">
        <Glyph kind={glyph} />
      </div>
      <h3 className="display text-[1.9rem]">{title}</h3>
      {children && <p className="mx-auto mt-2 max-w-[44ch] text-ink-soft">{children}</p>}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function ErrorState({ title = "Couldn’t load this", children, onRetry }) {
  return (
    <div className="border-[1.5px] border-crimson bg-crimson-wash/50 px-5 py-5">
      <p className="caps text-[0.85rem] text-crimson">{title}</p>
      {children && <p className="mt-1 text-ink-soft">{children}</p>}
      {onRetry && (
        <Button variant="outline" size="sm" className="mt-3" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

/** Small Du Bois chart glyphs, used as category marks and empty-state art. */
export function Glyph({ kind = "squares", size = 56, className = "" }) {
  const common = { width: size, height: size, viewBox: "0 0 56 56", "aria-hidden": true, className };
  switch (kind) {
    case "spiral":
      return (
        <svg {...common}>
          <path
            d="M28 28m0-3a3 3 0 1 1-3 3a7 7 0 0 1 7-7a11 11 0 0 1 11 11a15 15 0 0 1-15 15a19 19 0 0 1-19-19a23 23 0 0 1 23-23"
            fill="none"
            stroke="#b8232f"
            strokeWidth="4.5"
          />
        </svg>
      );
    case "bars":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="44" height="9" fill="#161412" />
          <rect x="4" y="21" width="32" height="9" fill="#d99a1e" />
          <rect x="4" y="34" width="20" height="9" fill="#1f6a4a" />
          <rect x="4" y="47" width="10" height="6" fill="#b8232f" />
        </svg>
      );
    case "steps":
      return (
        <svg {...common}>
          {[0, 1, 2, 3].map((c) =>
            Array.from({ length: c + 1 }).map((_, r) => (
              <rect
                key={`${c}-${r}`}
                x={6 + c * 12}
                y={44 - r * 12}
                width="10"
                height="10"
                fill={c === 3 ? "#b8232f" : "#1f6a4a"}
              />
            ))
          )}
        </svg>
      );
    case "ring":
      return (
        <svg {...common}>
          <circle cx="28" cy="28" r="18" fill="none" stroke="#161412" strokeWidth="10" strokeDasharray="56 200" />
          <circle cx="28" cy="28" r="18" fill="none" stroke="#d99a1e" strokeWidth="10" strokeDasharray="30 200" strokeDashoffset="-56" />
          <circle cx="28" cy="28" r="18" fill="none" stroke="#b8232f" strokeWidth="10" strokeDasharray="27 200" strokeDashoffset="-86" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <rect
                key={`${r}-${c}`}
                x={6 + c * 16}
                y={6 + r * 16}
                width="12"
                height="12"
                fill={r === 0 && c === 2 ? "#b8232f" : r === 2 ? "#161412" : "#d99a1e"}
              />
            ))
          )}
        </svg>
      );
  }
}

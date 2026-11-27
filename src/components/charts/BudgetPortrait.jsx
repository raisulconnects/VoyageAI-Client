"use client";

import { createContext, useContext, useId, useMemo, useState } from "react";
import { formatMoney } from "@/lib/format";

export const DATA_COLORS = ["#b8232f", "#d99a1e", "#1f6a4a", "#161412", "#a69f92", "#7a4a2a"];

/** Archimedean spiral from the outer ring inward, as an SVG path. */
function spiralPath(size, turns, strokeWidth) {
  const c = size / 2;
  const outer = c - strokeWidth / 2 - 1;
  const inner = strokeWidth * 0.9;
  const total = turns * Math.PI * 2;
  const pts = [];
  for (let t = 0; t <= total; t += 0.05) {
    const r = outer - ((outer - inner) * t) / total;
    const a = t - Math.PI / 2;
    pts.push(`${(c + r * Math.cos(a)).toFixed(2)} ${(c + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join("L")}`;
}

function buildSegments(items) {
  const sorted = [...items].filter((i) => Number(i.value) > 0).sort((a, b) => b.value - a.value);
  const total = sorted.reduce((s, i) => s + Number(i.value), 0);
  const segments = sorted.map((item, i) => ({
    ...item,
    frac: item.value / total,
    start: sorted.slice(0, i).reduce((s, x) => s + x.value, 0) / total,
    color: DATA_COLORS[i % DATA_COLORS.length],
  }));
  return { segments, total, max: sorted[0]?.value || 1 };
}

const PortraitContext = createContext(null);

/**
  Shared state for a budget portrait: the spiral and the bars encode the same
  quantities, and hovering or focusing one category re-draws it in both.
*/
export function PortraitProvider({ items, children }) {
  const data = useMemo(() => buildSegments(items), [items]);
  const [active, setActive] = useState(null);
  const [pulse, setPulse] = useState(0);
  const activate = (i) => {
    setActive(i);
    if (i !== null) setPulse((p) => p + 1);
  };
  return <PortraitContext.Provider value={{ ...data, active, pulse, activate }}>{children}</PortraitContext.Provider>;
}

const usePortrait = () => useContext(PortraitContext);

export function BudgetSpiral({ size = 260, turns = 3.4, caption = "Budget" }) {
  const { segments, active, pulse } = usePortrait();
  const maskId = useId().replace(/:/g, "");
  const strokeWidth = (size / 2 / (turns + 0.6)) * 0.62;
  const d = useMemo(() => spiralPath(size, turns, strokeWidth), [size, turns, strokeWidth]);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className="block h-auto max-w-full"
      role="img"
      aria-label={`${caption}: ${segments.map((s) => `${s.name} ${formatMoney(s.value)}`).join(", ")}`}
    >
      <defs>
        <mask id={maskId}>
          <path d={d} pathLength="1" fill="none" stroke="#fff" strokeWidth={strokeWidth + 2} className="ink-draw" />
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
        {segments.map((s, i) => (
          <path
            key={s.name}
            d={d}
            pathLength="1"
            fill="none"
            stroke={s.color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${Math.max(s.frac - 0.004, 0.001)} 2`}
            strokeDashoffset={-s.start}
            style={{ opacity: active === null ? 1 : active === i ? 0.22 : 0.14, transition: "opacity 200ms ease-out" }}
          />
        ))}
      </g>
      {/* The active segment re-draws along the spiral while its bar refills. */}
      {active !== null && segments[active] && (
        <path
          key={`${active}-${pulse}`}
          d={d}
          pathLength="1"
          fill="none"
          stroke={segments[active].color}
          strokeWidth={strokeWidth}
          strokeDashoffset={-segments[active].start}
          className="seg-draw"
          style={{ "--seg": Math.max(segments[active].frac - 0.004, 0.001) }}
        />
      )}
    </svg>
  );
}

export function BudgetBars({ caption = "Total", sample = false, dense = false }) {
  const { segments, total, max, active, pulse, activate } = usePortrait();
  return (
    <div className="min-w-0">
      <div className="flex items-baseline justify-between gap-3 border-b-[3px] border-ink pb-2">
        <span className="caps text-[0.8rem] text-ink-soft">{caption}</span>
        <span className={`display tabular ${dense ? "text-[1.8rem]" : "text-[2.1rem]"}`}>{formatMoney(total)}</span>
      </div>
      <ul className="mt-1">
        {segments.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              onMouseEnter={() => activate(i)}
              onMouseLeave={() => activate(null)}
              onFocus={() => activate(i)}
              onBlur={() => activate(null)}
              className={`block w-full border-b border-ink/15 text-left focus-visible:outline-offset-0 ${dense ? "py-1.5" : "py-2"}`}
              aria-label={`${s.name}: ${formatMoney(s.value)}${sample ? " (sample)" : ""}, ${Math.round(s.frac * 100)} percent`}
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="caps text-[0.78rem] text-ink">{s.name}</span>
                <span className="tabular text-[0.95rem] font-semibold">
                  {sample && <span className="caps mr-1.5 text-[0.62rem] font-semibold text-muted">sample</span>}
                  {formatMoney(s.value)}
                  <span className="ml-2 font-normal text-muted">{Math.round(s.frac * 100)}%</span>
                </span>
              </span>
              <span className={`mt-1.5 block bg-ink/[0.07] ${dense ? "h-2" : "h-2.5"}`}>
                <span
                  key={active === i ? `a-${pulse}` : "rest"}
                  className="grow-x block h-full"
                  style={{
                    width: `${(s.value / max) * 100}%`,
                    background: s.color,
                    animationDelay: active === i ? "0ms" : `${700 + i * 90}ms`,
                  }}
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The standard composition: spiral beside (or above) its bars. */
export default function BudgetPortrait({ items = [], size = 260, turns = 3.4, caption, compact = false, sample = false }) {
  const hasData = items.some((i) => Number(i.value) > 0);
  if (!hasData) return null;
  return (
    <PortraitProvider items={items}>
      <figure className={`flex flex-col gap-6 ${compact ? "" : "sm:flex-row sm:items-center sm:gap-8"}`}>
        <div className="mx-auto shrink-0" style={{ width: size, maxWidth: "100%" }}>
          <BudgetSpiral size={size} turns={turns} caption={caption} />
        </div>
        <figcaption className="min-w-0 flex-1">
          <BudgetBars caption={caption} sample={sample} />
        </figcaption>
      </figure>
    </PortraitProvider>
  );
}

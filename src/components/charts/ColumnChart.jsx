import { formatMoney } from "@/lib/format";

/** Flat ink columns with their values printed on top, Du Bois style. */
export default function ColumnChart({ data = [], height = 200, color = "#b8232f", label = "Chart" }) {
  const max = Math.max(...data.map((d) => Number(d.value) || 0), 1);
  const peak = data.reduce((best, d, i) => (d.value > (data[best]?.value ?? -1) ? i : best), 0);
  return (
    <figure>
      <div
        role="img"
        aria-label={`${label}: ${data.map((d) => `${d.label} ${formatMoney(d.value)}`).join(", ")}`}
        className="flex items-end gap-[6px] border-b-[2px] border-ink sm:gap-2"
        style={{ height }}
      >
        {data.map((d, i) => (
          <div key={`${d.label}-${i}`} className="flex h-full min-w-0 flex-1 flex-col justify-end">
            <span className="tabular mb-1 truncate text-center text-[0.72rem] font-semibold text-ink-soft">
              {formatMoney(d.value)}
            </span>
            <span
              className="block origin-bottom"
              style={{
                height: `${(d.value / max) * (height - 22)}px`,
                background: i === peak ? color : "#161412",
                animation: `grow-y 0.8s ${i * 60}ms cubic-bezier(0.16,1,0.3,1) both`,
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-[6px] sm:gap-2">
        {data.map((d, i) => (
          <span key={`${d.label}-l-${i}`} className="caps min-w-0 flex-1 truncate text-center text-[0.68rem] text-muted">
            {d.label}
          </span>
        ))}
      </div>
    </figure>
  );
}

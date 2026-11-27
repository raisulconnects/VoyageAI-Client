import BudgetPortrait from "@/components/charts/BudgetPortrait";
import { SAMPLE_PLAN } from "@/components/landing/sampleplan";

/** Shared frame for sign in / register: form on board, sample portrait on ink. */
export default function AuthFrame({ title, intro, children }) {
  return (
    <div className="mx-auto grid max-w-[1280px] gap-0 px-5 pt-10 sm:px-8 lg:grid-cols-[1fr_1fr] lg:pt-14">
      <section className="border-[3px] border-ink bg-field px-6 py-8 sm:px-10 sm:py-10 lg:border-r-0">
        <h1 className="display text-[3rem] sm:text-[3.8rem]">{title}</h1>
        {intro && <div className="mt-2 text-ink-soft">{intro}</div>}
        <div className="mt-8">{children}</div>
      </section>
      <aside aria-hidden="true" className="hidden border-[3px] border-ink bg-ink p-10 text-board lg:block">
        <p className="caps text-[0.78rem] text-gold">Sample plan · Kyoto · 7 days</p>
        <p className="display mt-3 text-[2.6rem] text-board">Every trip comes with its money drawn in.</p>
        <div className="mt-8 rounded-none bg-board p-6 text-ink">
          <BudgetPortrait items={SAMPLE_PLAN.breakdown} size={180} turns={3} caption="Sample budget" />
        </div>
      </aside>
    </div>
  );
}

/** Only allow same-site relative paths as post-auth destinations. */
export function safeNext(value, fallback = "/dashboard") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  return value;
}

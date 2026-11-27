import { BudgetBars, BudgetSpiral, PortraitProvider } from "@/components/charts/BudgetPortrait";
import PlanStarter from "./PlanStarter";
import { SAMPLE_PLAN } from "./sampleplan";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-[1280px] px-5 pb-16 pt-6 sm:px-8 sm:pt-10 lg:pt-12">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-14">
        <div className="min-w-0">
          <h1
            id="hero-title"
            className="display fade-up text-[3.4rem] leading-[0.88] sm:text-[4.8rem] xl:text-[6rem]"
          >
            Seven days in Kyoto for $2,000.
          </h1>
          <span aria-hidden="true" className="grow-x mt-5 block h-3 w-full max-w-[640px] bg-crimson" />
          <p className="caps mt-4 text-[0.82rem] text-crimson">
            A sample plan · {SAMPLE_PLAN.style} · {SAMPLE_PLAN.days} days
          </p>
          <p className="mt-3 max-w-[54ch] text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.15rem]">
            Give VoyageAI a place, a number of days and a budget. It drafts every day and rewrites it when you say
            what to change<span className="hidden sm:inline">, then keeps the plan and its money with the rest of your travel</span>.
          </p>
          <div className="mt-6 max-w-[640px] sm:mt-8">
            <PlanStarter idPrefix="hero" />
          </div>
        </div>

        <PortraitProvider items={SAMPLE_PLAN.breakdown}>
          <figure className="min-w-0">
            <div className="mx-auto w-full max-w-[440px] lg:-mt-2">
              <BudgetSpiral size={440} turns={3.8} caption="Sample budget for seven days in Kyoto" />
            </div>
            <figcaption className="mt-6 grid gap-8 sm:grid-cols-2 sm:gap-6">
              <BudgetBars caption="Sample budget" sample dense />
              <div>
                <div className="flex items-baseline justify-between gap-3 border-b-[3px] border-ink pb-2">
                  <span className="caps text-[0.8rem] text-ink-soft">The days</span>
                  <a href="#days-title" className="caps text-[0.75rem] text-crimson hover:text-crimson-deep">
                    In full ↓
                  </a>
                </div>
                <ol className="mt-1">
                  {SAMPLE_PLAN.itinerary.map((d) => (
                    <li key={d.day} className="flex items-baseline gap-3 border-b border-ink/15 py-[0.3rem] text-[0.92rem]">
                      <span className="display tabular w-4 text-[1.15rem] text-crimson">{d.day}</span>
                      <span className="truncate">{d.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </figcaption>
          </figure>
        </PortraitProvider>
      </div>
    </section>
  );
}

const REFINED_DAY = {
  day: 3,
  title: "Arashiyama, slowly",
  activities: ["Bamboo grove before 8am", "Long lunch at Saga market", "Tenryu-ji garden, no rush"],
};

export function SampleDays() {
  return (
    <section aria-labelledby="days-title" className="border-y-[3px] border-ink bg-field">
      <div className="mx-auto max-w-[1280px] px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="days-title" className="display text-[2.6rem] sm:text-[3.4rem]">
            The sample plan, day by day
          </h2>
          <p className="caps text-[0.78rem] text-muted">Illustrative · not a booking</p>
        </div>

        <ol className="mt-8 grid grid-cols-1 gap-px border-[1.5px] border-ink bg-ink sm:grid-cols-2 lg:grid-cols-7">
          {SAMPLE_PLAN.itinerary.map((d) => (
            <li key={d.day} className={`bg-field p-4 ${d.day === 3 ? "relative" : ""}`}>
              <span className="display tabular block text-[2.6rem] leading-none text-crimson">{d.day}</span>
              <h3 className="mt-2 font-semibold leading-snug">{d.title}</h3>
              <ul className="mt-2 space-y-1 text-[0.92rem] leading-snug text-ink-soft">
                {d.activities.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
          <div className="border-[1.5px] border-ink bg-board p-5">
            <p className="caps text-[0.75rem] text-muted">You ask</p>
            <p className="mt-2 text-[1.25rem] leading-snug">“{SAMPLE_PLAN.refinement}”</p>
          </div>
          <svg aria-hidden="true" viewBox="0 0 80 24" className="mx-auto h-6 w-20 rotate-90 text-crimson lg:rotate-0">
            <path d="M0 12h72M62 3l10 9-10 9" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
          <div className="border-[3px] border-crimson bg-board p-5">
            <h3 className="display flex flex-wrap items-baseline gap-x-3 text-[1.8rem]">
              {REFINED_DAY.title}
              <span className="caps bg-crimson px-1.5 py-0.5 text-[0.7rem] tracking-[0.09em] text-white">Day 3 rewritten</span>
            </h3>
            <ul className="mt-2 space-y-1 text-ink-soft">
              {REFINED_DAY.activities.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

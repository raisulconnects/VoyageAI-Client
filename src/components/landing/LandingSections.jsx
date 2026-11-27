"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { HiArrowRight } from "react-icons/hi";
import api from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import { Glyph, Skeleton } from "@/components/ui/Feedback";
import DestinationPlate from "@/components/destinations/DestinationPlate";

export function useGlobalStats() {
  return useQuery({
    queryKey: ["globalStats"],
    queryFn: async () => (await api.get("/dashboard/global")).data.data,
  });
}

export function DestinationsBand() {
  const { data: destinations, isLoading, isError } = useQuery({
    queryKey: ["popular-destinations"],
    queryFn: async () => (await api.get("/destinations", { params: { limit: 3 } })).data.data.destinations,
  });

  return (
    <section aria-labelledby="dest-title" className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
      <div className="flex flex-col gap-4 border-b-[3px] border-ink pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="dest-title" className="display text-[2.8rem] sm:text-[3.6rem]">
          Where people are going
        </h2>
        <Link href="/explore" className="caps inline-flex items-center gap-2 text-[0.9rem] text-crimson hover:text-crimson-deep">
          All destinations <HiArrowRight aria-hidden="true" />
        </Link>
      </div>

      {isError ? (
        <p className="mt-8 text-ink-soft">Destinations couldn’t load right now. They’re all on the explore page.</p>
      ) : (
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {isLoading || !destinations
            ? Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className={`aspect-[4/3] ${i === 0 ? "lg:col-span-2 lg:row-span-2 lg:aspect-auto" : ""}`} />
              ))
            : destinations.map((dest, i) => (
                <div key={dest._id} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : ""}>
                  <DestinationPlate dest={dest} large={i === 0} />
                </div>
              ))}
        </div>
      )}
    </section>
  );
}

export function QuestionIndex() {
  return (
    <section aria-labelledby="q-title" className="border-y-[3px] border-ink bg-board-deep">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8">
        <h2 id="q-title" className="caps text-[1rem]">
          Browse by what you want from a trip
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-px bg-ink/25 sm:grid-cols-4 lg:grid-cols-7">
          {CATEGORIES.map((c) => (
            <li key={c.name} className="bg-board-deep last:col-span-2 lg:last:col-span-1">
              <Link
                href={`/explore?category=${c.name}`}
                className="flex h-full flex-col gap-3 p-4 transition-colors hover:bg-field"
              >
                <Glyph kind={c.glyph} size={36} />
                <span className="display text-[1.35rem]">{c.name}</span>
                <span className="text-sm leading-snug text-muted">{c.question}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const STEPS = [
  {
    title: "Describe",
    body: "Where, how many days, the budget and your travel style. Add anything that matters, like no early starts or vegetarian food.",
  },
  {
    title: "Draft",
    body: "Google Gemini drafts the trip day by day. It takes a few seconds, and you can read it as it lands.",
  },
  {
    title: "Rewrite",
    body: "Say what to change in plain words. “Make day 3 slower, add a food market.” The plan updates in place.",
  },
  {
    title: "Keep",
    body: "Save it with real dates and a budget. Edit it, add notes and a cover photo, and see it beside your other trips.",
  },
];

export function ProcessSteps() {
  return (
    <section aria-labelledby="how-title" className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8">
      <h2 id="how-title" className="display max-w-[14ch] text-[2.8rem] sm:text-[3.6rem]">
        From three facts to a plan you keep
      </h2>
      <ol className="mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col">
            <div className="flex h-[124px] items-end gap-1" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, col) => (
                <span
                  key={col}
                  className="w-6"
                  style={{
                    height: `${col <= i ? 28 + col * 28 : 10}px`,
                    background: col === i ? "#b8232f" : col < i ? "#161412" : "rgba(22,20,18,0.12)",
                  }}
                />
              ))}
            </div>
            <h3 className="display mt-5 border-t-[3px] border-ink pt-3 text-[2rem]">{step.title}</h3>
            <p className="mt-2 text-ink-soft">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

const QUOTES = [
  {
    quote: "I typed Kyoto, seven days, two thousand dollars, and had a plan I could argue with in under a minute.",
    who: "Solo traveler",
  },
  {
    quote: "Being able to say ‘make Tuesday lighter’ instead of rebuilding the whole thing is the part I use most.",
    who: "Frequent traveler",
  },
  {
    quote: "Seeing every trip’s budget side by side stopped me overspending on the second one.",
    who: "Family planner",
  },
];

export function SampleQuotes() {
  return (
    <section aria-labelledby="quotes-title" className="mx-auto max-w-[1280px] px-5 pb-4 sm:px-8">
      <div className="flex items-baseline justify-between gap-4 border-b border-ink pb-2">
        <h2 id="quotes-title" className="caps text-[1rem]">
          What planning with it feels like
        </h2>
        <span className="caps text-[0.72rem] text-muted">Illustrative quotes</span>
      </div>
      <div className="mt-8 grid gap-10 md:grid-cols-3">
        {QUOTES.map((q, i) => (
          <figure key={q.who}>
            <span
              aria-hidden="true"
              className="mb-4 block h-2 w-12"
              style={{ background: ["#b8232f", "#d99a1e", "#1f6a4a"][i] }}
            />
            <blockquote className="text-[1.2rem] leading-snug text-ink">“{q.quote}”</blockquote>
            <figcaption className="caps mt-3 text-[0.78rem] text-muted">{q.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ClosingBand() {
  const { data: stats } = useGlobalStats();
  const figures = stats
    ? [
        { value: stats.totalDestinations, label: "curated destinations" },
        { value: stats.totalTrips, label: "trips planned so far" },
        { value: stats.totalUsers, label: stats.totalUsers === 1 ? "traveler" : "travelers" },
      ]
    : null;

  return (
    <section aria-labelledby="close-title" data-flush-footer className="mt-20 bg-ink text-board">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
        <div>
          <h2 id="close-title" className="display text-[3rem] text-board sm:text-[4.4rem]">
            Your next trip, <span className="text-gold">drawn to the dollar.</span>
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="caps inline-flex h-12 items-center gap-2 bg-crimson px-6 text-white transition-colors hover:bg-crimson-deep"
            >
              Create a free account <HiArrowRight aria-hidden="true" />
            </Link>
            <Link
              href="/explore"
              className="caps inline-flex h-12 items-center border-[1.5px] border-board/70 px-6 transition-colors hover:bg-board hover:text-ink"
            >
              Explore destinations
            </Link>
          </div>
        </div>
        {figures && (
          <dl className="grid grid-cols-3 gap-4 border-t border-board/20 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            {figures.map((f) => (
              <div key={f.label}>
                <dt className="sr-only">{f.label}</dt>
                <dd>
                  <span className="display tabular block text-[2.6rem] text-gold">{f.value}</span>
                  <span className="mt-1 block text-sm text-board/70">{f.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}

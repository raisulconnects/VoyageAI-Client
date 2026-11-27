"use client";

import Link from "next/link";
import { useGlobalStats } from "@/components/landing/LandingSections";
import { buttonClasses } from "@/components/ui/Button";
import { Glyph } from "@/components/ui/Feedback";

const PRINCIPLES = [
  {
    glyph: "spiral",
    title: "Show the plan",
    body: "The proof is a real itinerary on screen, day by day, not a promise about one.",
  },
  {
    glyph: "bars",
    title: "Money is part of the plan",
    body: "Budgets sit next to every decision: per trip, per category, and across all your travel.",
  },
  {
    glyph: "steps",
    title: "Rewrite, don’t restart",
    body: "Change a plan by saying what you want different. The rest of it stays put.",
  },
  {
    glyph: "ring",
    title: "AI with visible limits",
    body: "Drafts can be wrong. Opening hours, prices and entry rules are yours to check before you go.",
  },
];

export default function AboutPage() {
  const { data: stats } = useGlobalStats();

  return (
    <div className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-8 lg:pt-14">
      <header className="grid gap-8 border-b-[3px] border-ink pb-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <h1 className="display text-[3.4rem] sm:text-[5.2rem]">A trip planner that does the arithmetic.</h1>
        <p className="text-[1.15rem] leading-relaxed text-ink-soft">
          VoyageAI turns a destination, a number of days and a budget into a day-by-day plan using Google Gemini. You
          refine it in plain language, save it with real dates, and keep it beside every other trip and what each one
          costs.
        </p>
      </header>

      <section aria-labelledby="principles-title" className="mt-14">
        <h2 id="principles-title" className="caps text-[1rem]">
          What it holds itself to
        </h2>
        <ul className="mt-6 grid gap-px border-[1.5px] border-ink bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <li key={p.title} className="bg-board p-6">
              <Glyph kind={p.glyph} size={40} />
              <h3 className="display mt-4 text-[1.8rem]">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="built-title" className="mt-16 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 id="built-title" className="display text-[2.4rem]">
            How it’s built
          </h2>
          <p className="mt-3 max-w-[60ch] leading-relaxed text-ink-soft">
            A Next.js front end talks to an Express and MongoDB API. Itineraries, rewrites and chat answers come from
            Google Gemini, with automatic fallback to lighter models when the main one is busy. Sessions use HttpOnly
            cookies; images are hosted on imgbb.
          </p>
        </div>
        {stats && (
          <dl className="grid grid-cols-3 gap-4 self-end border-t-[3px] border-ink pt-4">
            {[
              { v: stats.totalDestinations, l: "destinations" },
              { v: stats.totalTrips, l: "trips planned" },
              { v: stats.totalUsers, l: stats.totalUsers === 1 ? "traveler" : "travelers" },
            ].map((s) => (
              <div key={s.l}>
                <dt className="sr-only">{s.l}</dt>
                <dd>
                  <span className="display tabular block text-[3rem] text-crimson">{s.v}</span>
                  <span className="text-sm text-muted">{s.l}</span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </section>

      <div className="mt-16 flex flex-wrap gap-3">
        <Link href="/register" className={buttonClasses({ size: "lg" })}>
          Plan a trip
        </Link>
        <Link href="/explore" className={buttonClasses({ variant: "outline", size: "lg" })}>
          Explore destinations
        </Link>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { HiArrowRight, HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi";
import api from "@/lib/api";
import { daysUntil, formatDateRange, formatMoney } from "@/lib/format";
import TripCard from "@/components/cards/TripCard";
import BudgetPortrait from "@/components/charts/BudgetPortrait";
import ColumnChart from "@/components/charts/ColumnChart";
import Button from "@/components/ui/Button";
import { Region } from "@/components/ui/PageHeader";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/Feedback";
import StatusMark from "@/components/ui/StatusMark";

function aggregateBudgetBreakdown(trips) {
  const merged = {};
  for (const trip of trips) {
    for (const item of trip.budgetBreakdown || []) {
      merged[item.name] = (merged[item.name] || 0) + item.value;
    }
  }
  return Object.entries(merged).map(([name, value]) => ({ name, value }));
}

function latestTripWithExpenses(trips) {
  return [...trips]
    .filter((t) => t.expenses?.length)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))[0];
}

export default function DashboardPage() {

  const statsQuery = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => (await api.get("/dashboard/stats")).data.data,
  });

  const tripsQuery = useQuery({
    queryKey: ["trips"],
    queryFn: async () => (await api.get("/trips")).data.data,
  });

  const trips = tripsQuery.data || [];
  const stats = statsQuery.data;
  const now = new Date();
  const upcoming = trips
    .filter((t) => new Date(t.startDate) > now)
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
  const next = upcoming[0];
  const breakdown = aggregateBudgetBreakdown(trips);
  const itemisedCount = trips.filter((t) => t.budgetBreakdown?.length).length;
  const expenseTrip = latestTripWithExpenses(trips);

  const actions = (
    <div className="flex flex-wrap gap-2">
      <Button href="/ai-planner" size="md">
        <HiOutlineSparkles className="h-4 w-4" aria-hidden="true" /> Plan with AI
      </Button>
      <Button href="/add-destination" variant="outline">
        <HiOutlinePlus className="h-4 w-4" aria-hidden="true" /> New trip
      </Button>
    </div>
  );

  if (tripsQuery.isError) {
    return (
      <ErrorState title="Your trips didn’t load" onRetry={() => tripsQuery.refetch()}>
        Check that you’re online. If the API restarted, trying again usually fixes it.
      </ErrorState>
    );
  }

  return (
    <div className="space-y-12">
      {/* Lead: the next trip, or a first step */}
      <section aria-labelledby="lead-title">
        {tripsQuery.isLoading ? (
          <Skeleton className="mt-3 h-40 w-full" />
        ) : next ? (
          <div className="grid gap-6 border-b-[3px] border-ink pb-6 md:grid-cols-[1fr_auto] md:items-end">
            <div className="min-w-0">
              <h1 id="lead-title" className="display text-[2.8rem] sm:text-[4rem]">
                Next: {next.title}
              </h1>
              <p className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[1.05rem] text-ink-soft">
                <span className="font-semibold text-crimson">
                  {daysUntil(next.startDate) === 1 ? "Tomorrow" : `In ${daysUntil(next.startDate)} days`}
                </span>
                <span className="tabular">{formatDateRange(next.startDate, next.endDate)}</span>
                <span>{next.destination}</span>
                <span className="tabular">{formatMoney(next.budget)} budget</span>
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button href={`/dashboard/trips/${next._id}`} variant="ink">
                  Open trip <HiArrowRight aria-hidden="true" />
                </Button>
                <Button href="/ai-planner" variant="outline">
                  <HiOutlineSparkles className="h-4 w-4" aria-hidden="true" /> Plan another
                </Button>
              </div>
            </div>
            {next.coverImage && (
              <div className="relative hidden aspect-[4/3] w-64 overflow-hidden border-[3px] border-ink md:block">
                <Image src={next.coverImage} alt="" fill className="object-cover" sizes="256px" priority />
              </div>
            )}
          </div>
        ) : (
          <div className="border-b-[3px] border-ink pb-6">
            <h1 id="lead-title" className="display text-[2.8rem] sm:text-[4rem]">
              {trips.length ? "Nothing booked ahead" : "Your first trip starts here"}
            </h1>
            <p className="mt-3 max-w-[56ch] text-[1.05rem] text-ink-soft">
              {trips.length
                ? "None of your trips start in the future. Plan the next one, or give an existing trip new dates."
                : "Tell the planner where, how long and how much. You’ll have a day-by-day draft in seconds."}
            </p>
            <div className="mt-5">{actions}</div>
          </div>
        )}
      </section>

      {/* Figures */}
      <section aria-label="Your travel in numbers">
        {statsQuery.isLoading ? (
          <Skeleton className="h-8 w-2/3" />
        ) : stats ? (
          <dl className="flex flex-col gap-1.5 text-ink-soft sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-y-2">
            {[
              { value: stats.totalTrips, label: stats.totalTrips === 1 ? "trip" : "trips" },
              { value: stats.countriesVisited, label: stats.countriesVisited === 1 ? "country in your trips" : "countries in your trips" },
              { value: formatMoney(stats.totalSpent), label: "budgeted across all trips" },
            ].map((f, i) => (
              <div key={f.label} className={`flex items-baseline gap-2 ${i ? "sm:ml-5 sm:border-l sm:border-ink/30 sm:pl-5" : ""}`}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="display tabular text-[1.9rem] leading-none text-ink">{f.value}</dd>
                <dd aria-hidden="true">{f.label}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </section>

      {/* Money */}
      <div className="grid gap-12 xl:grid-cols-[1.15fr_1fr]">
        <Region
          title="Where the money goes"
          id="money-title"
          action={
            itemisedCount > 0 && (
              <span className="text-sm text-muted">
                From {itemisedCount} {itemisedCount === 1 ? "trip" : "trips"} with a breakdown
              </span>
            )
          }
        >
          {tripsQuery.isLoading ? (
            <Skeleton className="h-64 w-full" />
          ) : breakdown.length ? (
            <BudgetPortrait items={breakdown} size={220} caption="Itemised budget" />
          ) : (
            <EmptyState glyph="spiral" title="No breakdown yet">
              Split a trip’s budget into lodging, food and the rest to see it drawn here.
            </EmptyState>
          )}
        </Region>

        <Region
          title={expenseTrip ? `Daily spending · ${expenseTrip.title}` : "Daily spending"}
          id="spend-title"
          action={
            expenseTrip && (
              <Link href={`/dashboard/trips/${expenseTrip._id}`} className="caps text-[0.78rem] text-crimson hover:text-crimson-deep">
                Open trip
              </Link>
            )
          }
        >
          {tripsQuery.isLoading ? (
            <Skeleton className="h-56 w-full" />
          ) : expenseTrip ? (
            <>
              <ColumnChart
                label={`Daily spending for ${expenseTrip.title}`}
                data={expenseTrip.expenses.map((e) => ({ label: e.day, value: e.amount }))}
                height={210}
              />
              <p className="mt-3 text-sm text-muted">
                Highest day in crimson. Total{" "}
                <span className="tabular font-semibold text-ink">
                  {formatMoney(expenseTrip.expenses.reduce((s, e) => s + e.amount, 0))}
                </span>{" "}
                against a {formatMoney(expenseTrip.budget)} budget.
              </p>
            </>
          ) : (
            <EmptyState glyph="bars" title="No spending logged">
              Trips with recorded daily expenses show up here.
            </EmptyState>
          )}
        </Region>
      </div>

      {/* Coming up */}
      <Region
        title="Coming up"
        id="upcoming-title"
        action={
          <Link href="/my-trips" className="caps text-[0.78rem] text-crimson hover:text-crimson-deep">
            All trips
          </Link>
        }
      >
        {tripsQuery.isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : upcoming.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {upcoming.slice(0, 3).map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState glyph="steps" title="Nothing on the calendar" action={actions}>
            Trips with a future start date appear here, soonest first.
          </EmptyState>
        )}
      </Region>

      {trips.length > 0 && (
        <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
          <span>Trip marks:</span>
          <StatusMark status="Planning" />
          <StatusMark status="Upcoming" />
          <StatusMark status="Completed" />
        </p>
      )}
    </div>
  );
}

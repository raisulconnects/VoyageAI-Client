"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { HiArrowLeft, HiOutlinePencil } from "react-icons/hi";
import api from "@/lib/api";
import { formatDate, formatMoney, tripLength, daysUntil, sum } from "@/lib/format";
import Button, { buttonClasses } from "@/components/ui/Button";
import StatusMark from "@/components/ui/StatusMark";
import { Region } from "@/components/ui/PageHeader";
import BudgetPortrait from "@/components/charts/BudgetPortrait";
import ColumnChart from "@/components/charts/ColumnChart";
import { EmptyState, PageLoader } from "@/components/ui/Feedback";

export default function TripDetailPage() {
  const { id } = useParams();

  const { data: trip, isLoading, isError } = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => (await api.get(`/trips/${id}`)).data.data,
    retry: false,
  });

  if (isLoading) return <PageLoader label="Loading trip" />;

  if (isError || !trip) {
    return (
      <EmptyState
        glyph="ring"
        title="Trip not found"
        action={
          <Link href="/my-trips" className={buttonClasses({ variant: "outline" })}>
            Back to trips
          </Link>
        }
      >
        It may have been deleted, or the link is incomplete.
      </EmptyState>
    );
  }

  const days = tripLength(trip.startDate, trip.endDate);
  const until = daysUntil(trip.startDate);
  const spent = sum(trip.expenses, "amount");
  const perDay = days ? Math.round(trip.budget / days) : null;

  const facts = [
    { label: "Starts", value: formatDate(trip.startDate) },
    { label: "Ends", value: formatDate(trip.endDate) },
    { label: "Length", value: days ? `${days} ${days === 1 ? "day" : "days"}` : "—" },
    { label: "Budget", value: formatMoney(trip.budget), sub: perDay ? `${formatMoney(perDay)} a day` : null },
  ];

  return (
    <article>
      <Link href="/my-trips" className="caps inline-flex items-center gap-2 text-[0.82rem] text-ink-soft hover:text-ink">
        <HiArrowLeft aria-hidden="true" /> Trips
      </Link>

      <header className="mt-4 grid gap-6 border-b-[3px] border-ink pb-6 lg:grid-cols-[1fr_320px] lg:items-end">
        <div className="min-w-0">
          <h1 className="display text-[2.8rem] sm:text-[4.2rem]">{trip.title}</h1>
          <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[1.15rem] text-ink-soft">
            <span>{trip.destination}</span>
            <StatusMark status={trip.status} />
            {until > 0 && <span className="caps text-[0.78rem] text-crimson">Starts in {until} days</span>}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Button href={`/dashboard/trips/${id}/edit`} variant="ink">
              <HiOutlinePencil className="h-4 w-4" aria-hidden="true" /> Edit trip
            </Button>
            <Button href="/manage-destinations" variant="outline">
              Manage trips
            </Button>
          </div>
        </div>
        {trip.coverImage && (
          <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-ink">
            <Image src={trip.coverImage} alt="" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 320px" />
          </div>
        )}
      </header>

      <dl className="grid grid-cols-2 gap-px border-b border-ink/25 bg-ink/20 md:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="bg-board py-4 pl-1 pr-4 md:pl-5 md:first:pl-1">
            <dt className="caps text-[0.72rem] text-muted">{f.label}</dt>
            <dd className="tabular mt-1 text-[1.2rem] font-semibold">{f.value}</dd>
            {f.sub && <dd className="text-sm text-muted">{f.sub}</dd>}
          </div>
        ))}
      </dl>

      <div className="mt-10 grid gap-12 xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-12">
          <Region title="Day by day" id="itinerary-title">
            {trip.itinerary?.length ? (
              <ol>
                {trip.itinerary.map((day) => (
                  <li key={day.day} className="grid grid-cols-[56px_1fr] gap-4 border-b border-ink/15 py-5 sm:grid-cols-[72px_1fr]">
                    <span className="display tabular text-[2.6rem] leading-none text-crimson sm:text-[3.2rem]">{day.day}</span>
                    <div className="min-w-0">
                      <h3 className="text-[1.15rem] font-semibold leading-snug">{day.title}</h3>
                      {day.activities?.length > 0 && (
                        <ul className="mt-2 space-y-1.5 text-ink-soft">
                          {day.activities.map((act, i) => (
                            <li key={i} className="flex gap-3">
                              <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-ink" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <EmptyState
                glyph="steps"
                title="No day plan yet"
                action={
                  <Button href={`/ai-planner?${new URLSearchParams({ destination: trip.destination, duration: String(Math.min(days || 3, 30)), budget: String(trip.budget) })}`}>
                    Draft one with AI
                  </Button>
                }
              >
                Let the planner draft the days from this trip’s destination, length and budget.
              </EmptyState>
            )}
          </Region>

          {trip.notes && (
            <Region title="Notes" id="notes-title">
              <p className="max-w-[68ch] whitespace-pre-wrap leading-relaxed text-ink-soft">{trip.notes}</p>
            </Region>
          )}
        </div>

        <aside className="space-y-12">
          <Region title="Budget" id="budget-title">
            {trip.budgetBreakdown?.length ? (
              <BudgetPortrait items={trip.budgetBreakdown} size={200} caption="Itemised" compact />
            ) : (
              <p className="text-ink-soft">
                <span className="display tabular block text-[2.4rem] text-ink">{formatMoney(trip.budget)}</span>
                No category breakdown for this trip.
              </p>
            )}
          </Region>

          {trip.expenses?.length > 0 && (
            <Region title="Spent by day" id="spent-title">
              <ColumnChart
                label="Spending by day"
                data={trip.expenses.map((e) => ({ label: e.day, value: e.amount }))}
                height={170}
              />
              <div className="mt-4 flex items-baseline justify-between border-t-[3px] border-ink pt-2">
                <span className="caps text-[0.78rem]">Spent</span>
                <span className="tabular font-semibold">
                  {formatMoney(spent)} <span className="font-normal text-muted">of {formatMoney(trip.budget)}</span>
                </span>
              </div>
              <div aria-hidden="true" className="mt-2 h-2.5 bg-ink/10">
                <span
                  className={`block h-full ${spent > trip.budget ? "bg-crimson" : "bg-emerald"}`}
                  style={{ width: `${Math.min((spent / (trip.budget || 1)) * 100, 100)}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-muted">
                {spent > trip.budget
                  ? `${formatMoney(spent - trip.budget)} over budget.`
                  : `${formatMoney(trip.budget - spent)} left.`}
              </p>
            </Region>
          )}
        </aside>
      </div>
    </article>
  );
}

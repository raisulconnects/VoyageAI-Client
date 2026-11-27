"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlinePlus, HiOutlineSparkles } from "react-icons/hi";
import api from "@/lib/api";
import TripCard from "@/components/cards/TripCard";
import PageHeader from "@/components/ui/PageHeader";
import TripsTabs from "@/components/layout/TripsTabs";
import Button from "@/components/ui/Button";
import { Select } from "@/components/ui/Field";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/Feedback";

const STATUSES = ["All", "Planning", "Upcoming", "Completed"];
const SORTS = {
  soonest: { label: "Start date, soonest first", fn: (a, b) => new Date(a.startDate) - new Date(b.startDate) },
  latest: { label: "Start date, latest first", fn: (a, b) => new Date(b.startDate) - new Date(a.startDate) },
  budget: { label: "Budget, highest first", fn: (a, b) => b.budget - a.budget },
  added: { label: "Recently added", fn: (a, b) => new Date(b.createdAt) - new Date(a.createdAt) },
};

export default function MyTripsPage() {
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("soonest");

  const { data: trips = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => (await api.get("/trips")).data.data,
  });

  const counts = useMemo(() => {
    const c = { All: trips.length };
    for (const t of trips) c[t.status] = (c[t.status] || 0) + 1;
    return c;
  }, [trips]);

  const visible = useMemo(
    () => (filter === "All" ? trips : trips.filter((t) => t.status === filter)).slice().sort(SORTS[sort].fn),
    [trips, filter, sort]
  );

  return (
    <div>
      <PageHeader
        title="Trips"
        description="Every trip you’ve planned, with its dates, status and budget."
        actions={
          <>
            <Button href="/ai-planner">
              <HiOutlineSparkles className="h-4 w-4" aria-hidden="true" /> Plan with AI
            </Button>
            <Button href="/add-destination" variant="outline">
              <HiOutlinePlus className="h-4 w-4" aria-hidden="true" /> New trip
            </Button>
          </>
        }
      >
        <TripsTabs />
      </PageHeader>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div role="group" aria-label="Filter by status" className="flex gap-1 overflow-x-auto hide-scrollbar">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              onClick={() => setFilter(s)}
              className={`caps whitespace-nowrap px-3 py-2 text-[0.8rem] transition-colors ${
                filter === s ? "bg-gold text-ink" : "text-ink-soft hover:bg-ink/[0.06] hover:text-ink"
              }`}
            >
              {s} <span className="tabular ml-1 text-muted">{counts[s] || 0}</span>
            </button>
          ))}
        </div>
        <Select label="Sort" value={sort} onChange={(e) => setSort(e.target.value)} className="sm:w-64">
          {Object.entries(SORTS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.label}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-8">
        {isError ? (
          <ErrorState title="Your trips didn’t load" onRetry={refetch} />
        ) : isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : visible.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((trip, i) => (
              <TripCard key={trip._id} trip={trip} priority={i < 3} />
            ))}
          </div>
        ) : trips.length ? (
          <EmptyState
            glyph="ring"
            title={`No ${filter.toLowerCase()} trips`}
            action={
              <Button variant="outline" onClick={() => setFilter("All")}>
                Show all trips
              </Button>
            }
          >
            Status updates from the dates: a trip becomes Upcoming once it starts and Completed when it ends.
          </EmptyState>
        ) : (
          <EmptyState
            glyph="steps"
            title="No trips yet"
            action={
              <Button href="/ai-planner">
                <HiOutlineSparkles className="h-4 w-4" aria-hidden="true" /> Plan your first trip
              </Button>
            }
          >
            Draft one with the AI planner, or add a trip you’ve already sorted out.
          </EmptyState>
        )}
      </div>
    </div>
  );
}

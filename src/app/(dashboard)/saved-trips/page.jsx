"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineSearch } from "react-icons/hi";
import api from "@/lib/api";
import TripCard from "@/components/cards/TripCard";
import PageHeader from "@/components/ui/PageHeader";
import TripsTabs from "@/components/layout/TripsTabs";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { EmptyState, ErrorState, Skeleton } from "@/components/ui/Feedback";

export default function SavedTripsPage() {
  const [search, setSearch] = useState("");

  const { data: savedTrips = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["savedTrips"],
    queryFn: async () => (await api.get("/trips/saved")).data.data,
  });

  const q = search.trim().toLowerCase();
  const filtered = savedTrips.filter(
    (trip) => trip.title.toLowerCase().includes(q) || trip.destination.toLowerCase().includes(q)
  );

  return (
    <div>
      <PageHeader title="Trips" description="Trips you’ve marked with the heart, kept close for quick return.">
        <TripsTabs />
      </PageHeader>

      {savedTrips.length > 0 && (
        <div className="mt-6 max-w-sm">
          <Input
            label="Search saved trips"
            icon={HiOutlineSearch}
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Title or destination"
          />
        </div>
      )}

      <div className="mt-8">
        {isError ? (
          <ErrorState title="Saved trips didn’t load" onRetry={refetch} />
        ) : isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((trip) => (
              <TripCard key={trip._id} trip={trip} />
            ))}
          </div>
        ) : savedTrips.length ? (
          <EmptyState
            glyph="ring"
            title="No saved trip matches"
            action={
              <Button variant="outline" onClick={() => setSearch("")}>
                Clear search
              </Button>
            }
          >
            Nothing saved matches “{search}”.
          </EmptyState>
        ) : (
          <EmptyState
            glyph="squares"
            title="Nothing saved yet"
            action={
              <Button href="/my-trips" variant="outline">
                Go to all trips
              </Button>
            }
          >
            Press the heart on any trip to keep it here.
          </EmptyState>
        )}
      </div>
    </div>
  );
}

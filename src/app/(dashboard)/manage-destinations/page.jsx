"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HiOutlinePencil, HiOutlineSearch, HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import api from "@/lib/api";
import { formatDate, formatDateRange, formatMoney } from "@/lib/format";
import PageHeader from "@/components/ui/PageHeader";
import TripsTabs from "@/components/layout/TripsTabs";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import StatusMark from "@/components/ui/StatusMark";
import { ConfirmDialog } from "@/components/ui/Modal";
import { EmptyState, ErrorState, Glyph, Skeleton } from "@/components/ui/Feedback";

export default function ManageTripsPage() {
  const [search, setSearch] = useState("");
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const queryClient = useQueryClient();

  const { data: trips = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => (await api.get("/trips")).data.data,
  });

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/trips/${toDelete._id}`);
      toast.success(`Deleted “${toDelete.title}”.`);
      setToDelete(null);
      ["trips", "savedTrips", "dashboardStats", "manageTrips"].forEach((key) =>
        queryClient.invalidateQueries({ queryKey: [key] })
      );
    } catch (err) {
      toast.error(err.message || "Couldn’t delete the trip. Try again.");
    } finally {
      setDeleting(false);
    }
  };

  const q = search.trim().toLowerCase();
  const filtered = trips.filter((t) => t.title.toLowerCase().includes(q) || t.destination.toLowerCase().includes(q));

  return (
    <div>
      <PageHeader
        title="Trips"
        description="Find a trip fast, then open, edit or delete it."
        actions={
          <Button href="/add-destination" variant="outline">
            <HiOutlinePlus className="h-4 w-4" aria-hidden="true" /> New trip
          </Button>
        }
      >
        <TripsTabs />
      </PageHeader>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <Input
          label="Search trips"
          icon={HiOutlineSearch}
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Title or destination"
          className="sm:max-w-sm"
        />
        <p className="caps text-[0.78rem] text-muted" aria-live="polite">
          {isLoading ? "Loading" : `${filtered.length} of ${trips.length} ${trips.length === 1 ? "trip" : "trips"}`}
        </p>
      </div>

      <div className="mt-6">
        {isError ? (
          <ErrorState title="Your trips didn’t load" onRetry={refetch} />
        ) : isLoading ? (
          <Skeleton className="h-72 w-full" />
        ) : filtered.length === 0 ? (
          <EmptyState
            glyph="ring"
            title={trips.length ? "No trip matches" : "No trips yet"}
            action={
              trips.length ? (
                <Button variant="outline" onClick={() => setSearch("")}>
                  Clear search
                </Button>
              ) : (
                <Button href="/ai-planner">Plan your first trip</Button>
              )
            }
          >
            {trips.length ? `Nothing matches “${search}”.` : "Trips you plan or add appear here."}
          </EmptyState>
        ) : (
          <>
            {/* Desktop table */}
            <table className="hidden w-full border-[1.5px] border-ink bg-field text-left md:table">
              <caption className="sr-only">Your trips</caption>
              <thead className="border-b-[1.5px] border-ink">
                <tr className="caps text-[0.72rem] text-muted">
                  <th scope="col" className="px-4 py-3 font-semibold">Trip</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Dates</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">Budget</th>
                  <th scope="col" className="px-4 py-3 font-semibold">Added</th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t._id} className="border-b border-ink/15 last:border-0 hover:bg-board/60">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Thumb trip={t} />
                        <div className="min-w-0">
                          <Link href={`/dashboard/trips/${t._id}`} className="font-semibold hover:text-crimson">
                            {t.title}
                          </Link>
                          <p className="truncate text-sm text-muted">{t.destination}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusMark status={t.status} />
                    </td>
                    <td className="tabular px-4 py-3 text-[0.92rem]">{formatDateRange(t.startDate, t.endDate)}</td>
                    <td className="tabular px-4 py-3 text-right font-semibold">{formatMoney(t.budget)}</td>
                    <td className="tabular px-4 py-3 text-[0.92rem] text-muted">{formatDate(t.createdAt)}</td>
                    <td className="px-4 py-3">
                      <RowActions trip={t} onDelete={() => setToDelete(t)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile list */}
            <ul className="border-[1.5px] border-ink bg-field md:hidden">
              {filtered.map((t) => (
                <li key={t._id} className="flex items-start gap-3 border-b border-ink/15 p-3 last:border-0">
                  <Thumb trip={t} />
                  <div className="min-w-0 flex-1">
                    <Link href={`/dashboard/trips/${t._id}`} className="block font-semibold">
                      {t.title}
                    </Link>
                    <p className="truncate text-sm text-muted">{t.destination}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <StatusMark status={t.status} />
                      <span className="tabular">{formatMoney(t.budget)}</span>
                    </div>
                  </div>
                  <RowActions trip={t} onDelete={() => setToDelete(t)} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <ConfirmDialog
        isOpen={Boolean(toDelete)}
        onClose={() => !deleting && setToDelete(null)}
        onConfirm={confirmDelete}
        busy={deleting}
        title="Delete this trip?"
        description={toDelete ? `“${toDelete.title}” and its itinerary, notes and expenses will be removed. This can’t be undone.` : ""}
        confirmLabel="Delete trip"
      />
    </div>
  );
}

function Thumb({ trip }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border-[1.5px] border-ink bg-board-deep">
      {trip.coverImage ? (
        <Image src={trip.coverImage} alt="" fill className="object-cover" sizes="48px" />
      ) : (
        <Glyph kind="steps" size={26} />
      )}
    </span>
  );
}

function RowActions({ trip, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button href={`/dashboard/trips/${trip._id}/edit`} variant="ghost" size="icon-sm" aria-label={`Edit ${trip.title}`}>
        <HiOutlinePencil className="h-4 w-4" aria-hidden="true" />
      </Button>
      <Button variant="ghost" size="icon-sm" onClick={onDelete} aria-label={`Delete ${trip.title}`} className="hover:text-crimson">
        <HiOutlineTrash className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}

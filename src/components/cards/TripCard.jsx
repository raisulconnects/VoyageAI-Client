"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HiHeart, HiOutlineHeart } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import { formatDateRange, formatMoney, tripLength } from "@/lib/format";
import StatusMark from "@/components/ui/StatusMark";
import { Glyph } from "@/components/ui/Feedback";

export default function TripCard({ trip, priority = false }) {
  const [isSaved, setIsSaved] = useState(Boolean(trip.saved));
  const [pending, setPending] = useState(false);
  const queryClient = useQueryClient();
  const days = tripLength(trip.startDate, trip.endDate);

  const toggleSave = async () => {
    if (pending) return;
    const next = !isSaved;
    setIsSaved(next);
    setPending(true);
    try {
      await api.patch(`/trips/${trip._id}/save`);
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["savedTrips"] });
    } catch {
      setIsSaved(!next);
      toast.error("Couldn’t update saved trips. Try again.");
    } finally {
      setPending(false);
    }
  };

  return (
    <article className="group relative flex h-full flex-col border-[1.5px] border-ink bg-field transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-16px_rgba(22,20,18,0.55)]">
      <div className="relative aspect-[16/9] overflow-hidden border-b-[1.5px] border-ink bg-board-deep">
        {trip.coverImage ? (
          <Image
            src={trip.coverImage}
            alt=""
            fill
            priority={priority}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Glyph kind="steps" size={52} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3">
        <div className="flex items-center justify-between gap-2">
          <StatusMark status={trip.status} />
          {days && <span className="caps text-[0.72rem] text-muted">{days} days</span>}
        </div>
        <h3 className="display mt-2 text-[1.7rem] leading-[0.95]">
          <Link
            href={`/dashboard/trips/${trip._id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {trip.title}
          </Link>
        </h3>
        <p className="mt-1 pb-4 text-[0.95rem] text-ink-soft">{trip.destination}</p>
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-ink/20 pt-3">
          <div>
            <p className="caps text-[0.68rem] text-muted">Dates</p>
            <p className="tabular text-[0.9rem]">{formatDateRange(trip.startDate, trip.endDate)}</p>
          </div>
          <div className="text-right">
            <p className="caps text-[0.68rem] text-muted">Budget</p>
            <p className="tabular text-[0.95rem] font-semibold">{formatMoney(trip.budget)}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleSave}
        aria-pressed={isSaved}
        aria-label={isSaved ? `Remove ${trip.title} from saved` : `Save ${trip.title}`}
        className="absolute right-2.5 top-2.5 z-10 flex h-9 w-9 items-center justify-center border-[1.5px] border-ink bg-board text-ink transition-colors hover:bg-ink hover:text-board"
      >
        {isSaved ? (
          <HiHeart className="h-[18px] w-[18px] text-crimson" aria-hidden="true" />
        ) : (
          <HiOutlineHeart className="h-[18px] w-[18px]" aria-hidden="true" />
        )}
      </button>
    </article>
  );
}

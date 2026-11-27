"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HiArrowLeft } from "react-icons/hi";
import api from "@/lib/api";
import PageHeader from "@/components/ui/PageHeader";
import TripForm from "@/components/trips/TripForm";
import { buttonClasses } from "@/components/ui/Button";
import { EmptyState, PageLoader } from "@/components/ui/Feedback";

function toInputDate(value) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

export default function EditTripPage() {
  const { id } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: trip, isLoading, isError } = useQuery({
    queryKey: ["trip", id],
    queryFn: async () => (await api.get(`/trips/${id}`)).data.data,
    retry: false,
  });

  const defaults = useMemo(
    () =>
      trip && {
        title: trip.title || "",
        destination: trip.destination || "",
        startDate: toInputDate(trip.startDate),
        endDate: toInputDate(trip.endDate),
        budget: String(trip.budget ?? ""),
        notes: trip.notes || "",
        coverImage: trip.coverImage || "",
      },
    [trip]
  );

  const onSubmit = async (data) => {
    try {
      await api.put(`/trips/${id}`, data);
      ["trips", "savedTrips", "dashboardStats"].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      queryClient.invalidateQueries({ queryKey: ["trip", id] });
      toast.success("Changes saved.");
      router.push(`/dashboard/trips/${id}`);
    } catch (error) {
      toast.error(error.message || "Couldn’t save the changes. Try again.");
    }
  };

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
        It may have been deleted.
      </EmptyState>
    );
  }

  return (
    <div>
      <Link
        href={`/dashboard/trips/${id}`}
        className="caps mb-4 inline-flex items-center gap-2 text-[0.82rem] text-ink-soft hover:text-ink"
      >
        <HiArrowLeft aria-hidden="true" /> {trip.title}
      </Link>
      <PageHeader title="Edit trip" />
      <div className="mt-8">
        <TripForm defaultValues={defaults} onSubmit={onSubmit} submitLabel="Save changes" busyLabel="Saving changes" />
      </div>
    </div>
  );
}

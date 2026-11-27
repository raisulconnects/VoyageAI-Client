"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/api";
import PageHeader from "@/components/ui/PageHeader";
import TripForm from "@/components/trips/TripForm";

export default function NewTripPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    try {
      const res = await api.post("/trips", data);
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      toast.success("Trip added.");
      const id = res.data?.data?._id;
      router.push(id ? `/dashboard/trips/${id}` : "/my-trips");
    } catch (error) {
      toast.error(error.message || "Couldn’t add the trip. Try again.");
    }
  };

  return (
    <div>
      <PageHeader
        title="New trip"
        description={
          <>
            Add a trip you’ve already worked out. Want a draft instead?{" "}
            <Link href="/ai-planner" className="ink-link font-semibold text-ink">
              Plan it with AI
            </Link>
            .
          </>
        }
      />
      <div className="mt-8">
        <TripForm onSubmit={onSubmit} submitLabel="Add trip" busyLabel="Adding trip" />
      </div>
    </div>
  );
}

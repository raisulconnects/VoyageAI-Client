"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyDollar, HiOutlineArrowLeft } from "react-icons/hi";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Input from "@/components/common/Input";
import ImageUpload from "@/components/common/ImageUpload";
import api from "@/lib/api";
import Link from "next/link";

const tripSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  destination: z.string().min(2, "Destination is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  budget: z.string().min(1, "Budget is required."),
  notes: z.string().optional(),
  coverImage: z.string().optional(),
});

function formatDateForInput(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toISOString().split("T")[0];
}

export default function EditTripPage() {
  const params = useParams();
  const router = useRouter();

  const { data: trip, isLoading: tripLoading } = useQuery({
    queryKey: ["trip", params.id],
    queryFn: async () => {
      const res = await api.get(`/trips/${params.id}`);
      return res.data.data;
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tripSchema),
  });

  const coverImage = watch("coverImage");

  // Reset form when trip data loads
  if (trip && !isSubmitting) {
    const currentTitle = watch("title");
    if (currentTitle === undefined && trip.title) {
      reset({
        title: trip.title || "",
        destination: trip.destination || "",
        startDate: formatDateForInput(trip.startDate),
        endDate: formatDateForInput(trip.endDate),
        budget: String(trip.budget || ""),
        notes: trip.notes || "",
        coverImage: trip.coverImage || "",
      });
    }
  }

  const onSubmit = async (data) => {
    try {
      await api.put(`/trips/${params.id}`, data);
      toast.success("Trip updated successfully!");
      router.push(`/dashboard/trips/${params.id}`);
    } catch (error) {
      toast.error(error.message || "Failed to update trip.");
    }
  };

  if (tripLoading) {
    return (
      <div className="py-20 flex justify-center h-64 items-center">
        <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="py-20 flex flex-col items-center justify-center h-64">
        <h2 className="text-2xl text-white mb-4">Trip not found</h2>
        <Link href="/my-trips" className="text-blue-400 hover:text-blue-300">
          ← Back to My Trips
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href={`/dashboard/trips/${params.id}`}
          className="flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <HiOutlineArrowLeft className="h-5 w-5 mr-2" />
          Back to Trip
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-white">Edit Trip</h1>
        <p className="text-slate-400 mt-1">Update your trip details below.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 md:p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <ImageUpload
            value={coverImage}
            onChange={(url) => setValue("coverImage", url)}
            label="Cover Image"
          />

          <Input
            id="title"
            label="Trip Title"
            type="text"
            placeholder="e.g., Summer in Japan"
            {...register("title")}
            error={errors.title}
          />

          <Input
            id="destination"
            label="Destination"
            type="text"
            icon={HiOutlineLocationMarker}
            placeholder="City, Country, or Region"
            {...register("destination")}
            error={errors.destination}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="startDate"
              label="Start Date"
              type="date"
              icon={HiOutlineCalendar}
              {...register("startDate")}
              error={errors.startDate}
            />
            <Input
              id="endDate"
              label="End Date"
              type="date"
              icon={HiOutlineCalendar}
              {...register("endDate")}
              error={errors.endDate}
            />
          </div>

          <Input
            id="budget"
            label="Estimated Budget (USD)"
            type="number"
            icon={HiOutlineCurrencyDollar}
            placeholder="3500"
            {...register("budget")}
            error={errors.budget}
          />

          <div className="w-full">
            <label htmlFor="notes" className="block text-sm font-medium text-slate-300 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              rows={4}
              className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Any specific places to visit, dietary requirements, or ideas..."
              {...register("notes")}
            />
          </div>

          <div className="pt-4 flex items-center justify-end space-x-4 border-t border-white/10">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

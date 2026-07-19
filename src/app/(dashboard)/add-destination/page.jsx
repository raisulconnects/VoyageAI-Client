"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyDollar } from "react-icons/hi";
import { toast } from "sonner";
import Input from "@/components/common/Input";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const destinationSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  destination: z.string().min(2, "Destination is required."),
  startDate: z.string().min(1, "Start date is required."),
  endDate: z.string().min(1, "End date is required."),
  budget: z.string().min(1, "Budget is required."),
  notes: z.string().optional(),
});

export default function AddDestinationPage() {
  const router = useRouter();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(destinationSchema),
  });

  const onSubmit = async (data) => {
    try {
      await api.post("/trips", data);
      toast.success("Destination added successfully!");
      router.push("/my-trips");
    } catch (error) {
      toast.error(error.message || "Failed to add destination. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Add Destination</h1>
        <p className="text-slate-400 mt-1">Start planning a new trip by adding the destination details.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-6 md:p-8"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              Initial Notes (Optional)
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
                "Save Destination"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

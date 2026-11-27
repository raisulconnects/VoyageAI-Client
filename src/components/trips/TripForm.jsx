"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input, Textarea } from "@/components/ui/Field";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import { tripLength } from "@/lib/format";

export const tripSchema = z
  .object({
    title: z.string().trim().min(3, "Give the trip a name of at least 3 characters."),
    destination: z.string().trim().min(2, "Where is the trip to?"),
    startDate: z.string().min(1, "Pick a start date."),
    endDate: z.string().min(1, "Pick an end date."),
    budget: z
      .string()
      .min(1, "Add a budget, even a rough one.")
      .refine((v) => Number(v) >= 0 && !Number.isNaN(Number(v)), "Use a number of dollars, 0 or more."),
    notes: z.string().max(2000, "Keep notes under 2,000 characters.").optional(),
    coverImage: z.string().optional(),
  })
  .refine((d) => !d.startDate || !d.endDate || d.endDate >= d.startDate, {
    message: "The trip can’t end before it starts.",
    path: ["endDate"],
  });

/** Shared create / edit form for a trip. `onSubmit` receives the validated values. */
export default function TripForm({ defaultValues, onSubmit, submitLabel = "Save trip", busyLabel = "Saving" }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(tripSchema),
    defaultValues: { coverImage: "", notes: "", ...defaultValues },
  });

  useEffect(() => {
    if (defaultValues) reset({ coverImage: "", notes: "", ...defaultValues });
  }, [defaultValues, reset]);

  const coverImage = watch("coverImage");
  const [start, end] = watch(["startDate", "endDate"]);
  const days = start && end && end >= start ? tripLength(start, end) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-10 lg:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <Input label="Trip name" placeholder="Spring in Kyoto" {...register("title")} error={errors.title} />
        <Input
          label="Destination"
          placeholder="City, country or region"
          {...register("destination")}
          error={errors.destination}
        />
        <div className="grid gap-6 sm:grid-cols-2">
          <Input label="Starts" type="date" {...register("startDate")} error={errors.startDate} />
          <Input
            label="Ends"
            type="date"
            min={start || undefined}
            {...register("endDate")}
            error={errors.endDate}
            hint={days ? `${days} ${days === 1 ? "day" : "days"}` : undefined}
          />
        </div>
        <Input
          label="Budget"
          type="number"
          inputMode="numeric"
          min={0}
          prefix="$"
          placeholder="3500"
          {...register("budget")}
          error={errors.budget}
          hint={!errors.budget && days && Number(watch("budget")) > 0 ? `About $${Math.round(Number(watch("budget")) / days)} a day` : undefined}
        />
        <Textarea
          label="Notes"
          optional
          rows={5}
          placeholder="Places to see, bookings to make, dietary needs…"
          {...register("notes")}
          error={errors.notes}
        />
      </div>

      <div className="space-y-6">
        <ImageUpload value={coverImage} onChange={(url) => setValue("coverImage", url, { shouldDirty: true })} aspect="aspect-[4/3]" />
        <div className="flex flex-col gap-2 border-t-[3px] border-ink pt-5">
          <Button type="submit" size="lg" loading={isSubmitting}>
            {isSubmitting ? busyLabel : submitLabel}
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

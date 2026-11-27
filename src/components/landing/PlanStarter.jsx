"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiArrowRight } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";

/** The landing page's working action: three facts, then the planner (or sign-up first). */
export default function PlanStarter({ idPrefix = "start" }) {
  const router = useRouter();
  const { user } = useAuth();
  const [values, setValues] = useState({ destination: "", duration: "7", budget: "2000" });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const next = {};
    if (!values.destination.trim()) next.destination = "Where are you going?";
    const d = Number(values.duration);
    if (!Number.isInteger(d) || d < 1 || d > 30) next.duration = "1 to 30 days";
    if (!(Number(values.budget) > 0)) next.budget = "Add a budget";
    setErrors(next);
    if (Object.keys(next).length) return;

    const qs = new URLSearchParams({
      destination: values.destination.trim(),
      duration: String(d),
      budget: String(Number(values.budget)),
    }).toString();
    const target = `/ai-planner?${qs}`;
    router.push(user ? target : `/register?next=${encodeURIComponent(target)}`);
  };

  return (
    <form onSubmit={submit} noValidate className="border-[3px] border-ink bg-field">
      <div className="border-b-[1.5px] border-ink bg-ink px-4 py-2.5 sm:px-5 sm:py-3">
        <h2 className="caps text-[0.95rem] text-board">Draw up your own</h2>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-[1.2fr_1fr] sm:items-start sm:gap-4 sm:p-5">
        <Input
          id={`${idPrefix}-destination`}
          label="Where to"
          placeholder="Lisbon, Portugal"
          autoComplete="off"
          value={values.destination}
          onChange={set("destination")}
          error={errors.destination}
        />
        <div className="grid grid-cols-[1fr_1.4fr] gap-3">
          <Input
            id={`${idPrefix}-duration`}
            label="Days"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            value={values.duration}
            onChange={set("duration")}
            error={errors.duration}
          />
          <Input
            id={`${idPrefix}-budget`}
            label="Budget"
            type="number"
            inputMode="numeric"
            min={1}
            prefix="$"
            value={values.budget}
            onChange={set("budget")}
            error={errors.budget}
          />
        </div>
        <Button type="submit" size="lg" className="w-full justify-between sm:col-span-2">
          Draft my plan
          <HiArrowRight className="h-5 w-5" aria-hidden="true" />
        </Button>
        <p className="text-sm text-muted sm:col-span-2">
          {user ? "Opens the planner with these details filled in." : "Free account needed. Your details carry over."}
        </p>
      </div>
    </form>
  );
}

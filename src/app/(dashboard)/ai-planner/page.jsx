"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { HiArrowRight, HiOutlinePaperAirplane } from "react-icons/hi";
import api from "@/lib/api";
import { friendlyAiError } from "@/lib/aiErrors";
import { formatMoney, formatDate } from "@/lib/format";
import { Input, Select, Textarea } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import { ErrorState, Glyph, Loader, Skeleton } from "@/components/ui/Feedback";

const DRAFT_KEY = "voyageai.plannerDraft";

const STYLES = [
  { value: "balanced", label: "Balanced, a bit of everything" },
  { value: "cultural", label: "Cultural & historical" },
  { value: "relaxing", label: "Relaxing & slow" },
  { value: "adventure", label: "Active & adventurous" },
  { value: "foodie", label: "Food & drink" },
];

const REQUEST_IDEAS = ["No early mornings", "Vegetarian food", "Travelling with kids", "Public transport only", "One rest day"];
const REFINE_IDEAS = ["Make day 2 more relaxed", "Add a food market", "Swap a museum for something outdoors", "Add a day trip"];

const emptyBrief = { destination: "", duration: "7", budget: "2000", travelStyle: "balanced", specialRequests: "" };

function readDraft() {
  try {
    return JSON.parse(sessionStorage.getItem(DRAFT_KEY) || "null");
  } catch {
    return null;
  }
}

function PlannerView() {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();

  const [brief, setBrief] = useState(emptyBrief);
  const [briefErrors, setBriefErrors] = useState({});
  const [itinerary, setItinerary] = useState(null);
  const [meta, setMeta] = useState(null); // the brief the current draft was generated from
  const [messages, setMessages] = useState([]);
  const [changed, setChanged] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | generating | error
  const [error, setError] = useState("");
  const [refineInput, setRefineInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [startError, setStartError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [restored, setRestored] = useState(false);
  const threadEnd = useRef(null);
  const resultTop = useRef(null);

  // Restore a draft from this session, then let URL params prefill the brief.
  useEffect(() => {
    const draft = readDraft();
    let next = draft?.brief || emptyBrief;
    if (draft?.itinerary) {
      setItinerary(draft.itinerary);
      setMeta(draft.meta);
      setMessages(draft.messages || []);
      setStartDate(draft.startDate || "");
    }
    const fromUrl = {
      destination: params.get("destination"),
      duration: params.get("duration"),
      budget: params.get("budget"),
    };
    if (fromUrl.destination) {
      next = {
        ...next,
        destination: fromUrl.destination,
        ...(fromUrl.duration && { duration: fromUrl.duration }),
        ...(fromUrl.budget && { budget: fromUrl.budget }),
      };
    }
    setBrief(next);
    setRestored(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restored) return;
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify({ brief, itinerary, meta, messages, startDate }));
  }, [restored, brief, itinerary, meta, messages, startDate]);

  useEffect(() => {
    threadEnd.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isRefining]);

  const setField = (key) => (e) => setBrief((b) => ({ ...b, [key]: e.target.value }));

  const addRequest = (text) =>
    setBrief((b) => ({
      ...b,
      specialRequests: b.specialRequests ? `${b.specialRequests.replace(/[.\s]+$/, "")}. ${text}` : text,
    }));

  const validate = () => {
    const errs = {};
    if (!brief.destination.trim()) errs.destination = "Where do you want to go?";
    const d = Number(brief.duration);
    if (!Number.isInteger(d) || d < 1 || d > 30) errs.duration = "Between 1 and 30 days";
    if (!(Number(brief.budget) > 0)) errs.budget = "Add a budget above $0";
    setBriefErrors(errs);
    return !Object.keys(errs).length;
  };

  const generate = async (e) => {
    e?.preventDefault();
    if (!validate()) return;
    const data = {
      destination: brief.destination.trim(),
      duration: Number(brief.duration),
      budget: Number(brief.budget),
      travelStyle: brief.travelStyle,
      specialRequests: brief.specialRequests,
    };
    setStatus("generating");
    setError("");
    setChanged([]);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      setTimeout(() => resultTop.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
    try {
      const res = await api.post("/ai/plan", data);
      setItinerary(res.data.data);
      setMeta(data);
      setMessages([]);
      setStatus("idle");
    } catch (err) {
      setError(friendlyAiError(err, "The planner couldn’t draft this trip."));
      setStatus("error");
    }
  };

  const refine = async (text) => {
    const instructions = (text ?? refineInput).trim();
    if (!instructions || isRefining || !itinerary) return;
    setMessages((m) => [...m, { id: Date.now(), role: "user", content: instructions }]);
    setRefineInput("");
    setIsRefining(true);
    try {
      const res = await api.post("/ai/refine", { itinerary, instructions });
      const updated = res.data.data;
      const before = new Map((itinerary.days || []).map((d) => [d.day, JSON.stringify(d)]));
      const diff = (updated.days || []).filter((d) => before.get(d.day) !== JSON.stringify(d)).map((d) => d.day);
      setItinerary(updated);
      setChanged(diff);
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          role: "ai",
          content: diff.length
            ? `Updated ${diff.length === 1 ? `day ${diff[0]}` : `days ${diff.join(", ")}`}. Changes are marked in the plan.`
            : "Done. The plan is updated.",
        },
      ]);
    } catch (err) {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, role: "error", content: friendlyAiError(err, "That change didn’t go through. Try again.") },
      ]);
    } finally {
      setIsRefining(false);
    }
  };

  const discard = () => {
    setItinerary(null);
    setMeta(null);
    setMessages([]);
    setChanged([]);
    setStartDate("");
    setStatus("idle");
  };

  const save = async () => {
    if (!itinerary || !meta) return;
    if (!startDate) {
      setStartError("Pick the day the trip starts.");
      return;
    }
    setStartError("");
    setIsSaving(true);
    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + Math.max(meta.duration - 1, 0));
    try {
      const res = await api.post("/trips", {
        title: itinerary.title,
        destination: meta.destination,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
        budget: meta.budget,
        itinerary: itinerary.days,
      });
      ["trips", "dashboardStats"].forEach((key) => queryClient.invalidateQueries({ queryKey: [key] }));
      sessionStorage.removeItem(DRAFT_KEY);
      toast.success("Trip saved.");
      const id = res.data?.data?._id;
      router.push(id ? `/dashboard/trips/${id}` : "/my-trips");
    } catch (err) {
      toast.error(err.message || "Couldn’t save the trip. Try again.");
      setIsSaving(false);
    }
  };

  const perDay = meta ? Math.round(meta.budget / meta.duration) : null;
  const styleLabel = meta && STYLES.find((s) => s.value === meta.travelStyle)?.label;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <header className="border-b-[3px] border-ink pb-5">
        <h1 className="display text-[2.6rem] sm:text-[3.25rem]">Plan with AI</h1>
        <p className="mt-2 max-w-[62ch] text-[1.02rem] text-ink-soft">
          Describe the trip, get a day-by-day draft, then change it by saying what you want different. Nothing is saved
          until you save it.
        </p>
      </header>

      <div className="mt-8 grid gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-12">
        {/* Brief */}
        <form onSubmit={generate} noValidate className="space-y-5 lg:sticky lg:top-8 lg:self-start" aria-labelledby="brief-title">
          <h2 id="brief-title" className="caps border-b border-ink pb-2 text-[0.95rem]">
            The brief
          </h2>
          <Input
            label="Where to"
            placeholder="Kyoto, Japan"
            value={brief.destination}
            onChange={setField("destination")}
            error={briefErrors.destination}
            autoComplete="off"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Days"
              type="number"
              inputMode="numeric"
              min={1}
              max={30}
              value={brief.duration}
              onChange={setField("duration")}
              error={briefErrors.duration}
            />
            <Input
              label="Budget"
              type="number"
              inputMode="numeric"
              min={1}
              prefix="$"
              value={brief.budget}
              onChange={setField("budget")}
              error={briefErrors.budget}
            />
          </div>
          <Select label="Travel style" value={brief.travelStyle} onChange={setField("travelStyle")}>
            {STYLES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
          <div>
            <Textarea
              label="Anything else"
              optional
              rows={3}
              value={brief.specialRequests}
              onChange={setField("specialRequests")}
              placeholder="Pace, food, mobility, who’s coming…"
            />
            <div className="mt-2 flex flex-wrap gap-1.5" aria-label="Add a common request">
              {REQUEST_IDEAS.map((idea) => (
                <button
                  key={idea}
                  type="button"
                  onClick={() => addRequest(idea)}
                  className="border border-ink/25 px-2 py-1 text-[0.82rem] text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  + {idea}
                </button>
              ))}
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full justify-between" loading={status === "generating"}>
            {status === "generating" ? "Drafting" : itinerary ? "Draft again from this brief" : "Draft the plan"}
            {status !== "generating" && <HiArrowRight className="h-5 w-5" aria-hidden="true" />}
          </Button>
          {itinerary && status !== "generating" && (
            <p className="text-sm text-muted">Drafting again replaces the current plan and its changes.</p>
          )}
        </form>

        {/* Output */}
        <section ref={resultTop} aria-labelledby="plan-title" aria-busy={status === "generating"} className="min-w-0 scroll-mt-20">
          {status === "generating" ? (
            <div className="border-[1.5px] border-ink bg-field p-6">
              <Loader label={`Drafting ${brief.duration} days in ${brief.destination}`} />
              <p className="mt-2 text-sm text-muted">This usually takes 10 to 30 seconds.</p>
              <div className="mt-6 space-y-4">
                {Array.from({ length: Math.min(Number(brief.duration) || 3, 5) }).map((_, i) => (
                  <div key={i} className="grid grid-cols-[56px_1fr] gap-4 border-b border-ink/10 pb-4">
                    <Skeleton className="h-10 w-10" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : status === "error" ? (
            <ErrorState title="The draft didn’t come through" onRetry={() => generate()}>
              {error}
            </ErrorState>
          ) : itinerary ? (
            <div>
              <h2 id="plan-title" className="display text-[2.4rem] sm:text-[3rem]">
                {itinerary.title}
              </h2>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <p className="caps flex items-center gap-2 text-[0.75rem] text-crimson">
                  <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full border-2 border-crimson" />
                  Draft, not saved yet
                </p>
                <Button variant="ghost" size="sm" onClick={discard}>
                  Discard draft
                </Button>
              </div>
              {meta && (
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-ink-soft">
                  <span>{meta.destination}</span>
                  <span className="tabular">{meta.duration} days</span>
                  <span className="tabular">
                    {formatMoney(meta.budget)} · about {formatMoney(perDay)} a day
                  </span>
                  {styleLabel && <span>{styleLabel}</span>}
                </p>
              )}

              <ol className="mt-6 border-t-[3px] border-ink">
                {itinerary.days?.map((day) => {
                  const isNew = changed.includes(day.day);
                  return (
                    <li
                      key={day.day}
                      className={`grid grid-cols-[56px_1fr] gap-4 border-b border-ink/15 py-5 sm:grid-cols-[72px_1fr] ${
                        isNew ? "fade-up bg-gold-wash/60 px-3 sm:-mx-3" : ""
                      }`}
                    >
                      <span className="display tabular text-[2.6rem] leading-none text-crimson sm:text-[3.2rem]">{day.day}</span>
                      <div className="min-w-0">
                        <h3 className="flex flex-wrap items-center gap-x-3 text-[1.15rem] font-semibold leading-snug">
                          {day.title}
                          {isNew && <span className="caps bg-ink px-1.5 py-0.5 text-[0.65rem] text-board">Rewritten</span>}
                        </h3>
                        <ul className="mt-2 space-y-1.5 text-ink-soft">
                          {day.activities?.map((a, i) => (
                            <li key={i} className="flex gap-3">
                              <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-ink" />
                              <span>{a}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-3 text-sm text-muted">
                AI drafts can be wrong. Check opening hours, prices and bookings before you go.
              </p>

              {/* Refine thread */}
              <div className="mt-10">
                <h3 className="caps border-b border-ink pb-2 text-[0.95rem]">Change the plan</h3>
                {messages.length > 0 && (
                  <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1" aria-live="polite">
                    {messages.map((m) => (
                      <li key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                        <p
                          className={`max-w-[85%] break-words px-3.5 py-2 text-[0.95rem] ${
                            m.role === "user"
                              ? "bg-ink text-board"
                              : m.role === "error"
                                ? "border-[1.5px] border-crimson bg-crimson-wash/60 text-ink"
                                : "border-[1.5px] border-ink/25 bg-field text-ink"
                          }`}
                        >
                          {m.content}
                        </p>
                      </li>
                    ))}
                    {isRefining && (
                      <li>
                        <Loader label="Rewriting" />
                      </li>
                    )}
                    <li ref={threadEnd} aria-hidden="true" />
                  </ul>
                )}
                <form
                  className="mt-4 flex gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    refine();
                  }}
                >
                  <label htmlFor="refine-input" className="sr-only">
                    What should change?
                  </label>
                  <input
                    id="refine-input"
                    value={refineInput}
                    onChange={(e) => setRefineInput(e.target.value)}
                    disabled={isRefining}
                    placeholder="e.g. Make day 2 slower and add a food market"
                    className="h-11 min-w-0 flex-1 border-[1.5px] border-ink/30 bg-field px-3 placeholder:text-placeholder focus:border-ink focus:shadow-[0_0_0_3px_var(--color-gold-wash)] focus:outline-none disabled:opacity-60"
                  />
                  <Button type="submit" variant="ink" size="icon" disabled={!refineInput.trim() || isRefining} aria-label="Send change">
                    <HiOutlinePaperAirplane className="h-5 w-5 rotate-90" aria-hidden="true" />
                  </Button>
                </form>
                {messages.length === 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {REFINE_IDEAS.map((idea) => (
                      <button
                        key={idea}
                        type="button"
                        disabled={isRefining}
                        onClick={() => refine(idea)}
                        className="border border-ink/25 px-2 py-1 text-[0.82rem] text-ink-soft transition-colors hover:border-ink hover:text-ink disabled:opacity-50"
                      >
                        {idea}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Save */}
              <div className="mt-10 border-[3px] border-ink bg-field p-5">
                <h3 className="display text-[1.8rem]">Keep this plan</h3>
                <p className="mt-1 text-ink-soft">
                  Pick a start date. The trip runs {meta?.duration} days
                  {startDate && meta ? `, ending ${formatDate(new Date(new Date(`${startDate}T00:00:00Z`).getTime() + (meta.duration - 1) * 86400000))}` : ""}.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start">
                  <Input
                    label="Starts"
                    type="date"
                    min={today}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    error={startError}
                    className="sm:max-w-[220px]"
                  />
                  <Button onClick={save} size="lg" loading={isSaving} disabled={isRefining} className="sm:mt-[26px]">
                    {isSaving ? "Saving" : "Save trip"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="border-[1.5px] border-dashed border-ink/35 p-6 sm:p-10">
              <Glyph kind="spiral" size={56} />
              <h2 id="plan-title" className="display mt-5 text-[2.2rem]">
                Your plan will appear here
              </h2>
              <ol className="mt-5 space-y-3 text-ink-soft">
                {[
                  "Fill in the brief: where, how many days and the budget.",
                  "Read the day-by-day draft as soon as it arrives.",
                  "Ask for changes in plain words. Rewritten days are marked.",
                  "Pick a start date and save it as a trip.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-3">
                    <span className="display tabular w-5 shrink-0 text-[1.4rem] leading-none text-crimson">{i + 1}</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted">Drafts are kept in this browser tab until you save or discard them.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default function AIPlannerPage() {
  return (
    <Suspense fallback={null}>
      <PlannerView />
    </Suspense>
  );
}

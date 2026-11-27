"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import api from "@/lib/api";
import { categoryMeta } from "@/lib/categories";
import { useAuth } from "@/context/AuthContext";
import { buttonClasses } from "@/components/ui/Button";
import { EmptyState, PageLoader } from "@/components/ui/Feedback";

export default function DestinationDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();

  const { data: dest, isLoading, isError } = useQuery({
    queryKey: ["destination", id],
    queryFn: async () => (await api.get(`/destinations/${id}`)).data.data,
    retry: false,
  });

  if (isLoading) return <PageLoader label="Loading destination" />;

  if (isError || !dest) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <EmptyState
          glyph="ring"
          title="We couldn’t find that place"
          action={
            <Link href="/explore" className={buttonClasses({ variant: "outline" })}>
              Back to destinations
            </Link>
          }
        >
          It may have been removed, or the link is incomplete.
        </EmptyState>
      </div>
    );
  }

  const meta = categoryMeta(dest.category);
  const planHref = `/ai-planner?${new URLSearchParams({ destination: dest.name }).toString()}`;
  const planLink = user ? planHref : `/register?next=${encodeURIComponent(planHref)}`;

  return (
    <article className="mx-auto max-w-[1280px] px-5 pt-8 sm:px-8">
      <Link href="/explore" className="caps inline-flex items-center gap-2 text-[0.82rem] text-ink-soft hover:text-ink">
        <HiArrowLeft aria-hidden="true" /> All destinations
      </Link>

      <header className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end">
        <div>
          <h1 className="display text-[3.6rem] sm:text-[5.4rem]">{dest.name}</h1>
          <p className="caps mt-3 flex items-center gap-2 text-[0.82rem]">
            <span aria-hidden="true" className="h-3 w-3" style={{ background: meta.color }} />
            {dest.category} · {dest.country}
          </p>
          <p className="mt-4 max-w-[52ch] text-[1.15rem] leading-relaxed text-ink-soft">{dest.description}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border-[3px] border-ink bg-board-deep">
          {dest.image && (
            <Image src={dest.image} alt={dest.name} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
          )}
        </div>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-12">
          {dest.longDescription && (
            <section aria-labelledby="about-title">
              <h2 id="about-title" className="caps border-b border-ink pb-2 text-[0.95rem]">
                About the place
              </h2>
              <p className="mt-4 max-w-[68ch] text-[1.05rem] leading-relaxed text-ink-soft">{dest.longDescription}</p>
            </section>
          )}

          {dest.highlights?.length > 0 && (
            <section aria-labelledby="hl-title">
              <h2 id="hl-title" className="caps border-b border-ink pb-2 text-[0.95rem]">
                Worth the trip
              </h2>
              <ol className="mt-2">
                {dest.highlights.map((item, idx) => (
                  <li key={item} className="flex items-baseline gap-5 border-b border-ink/15 py-4">
                    <span className="display tabular w-8 shrink-0 text-[1.9rem] text-crimson">{idx + 1}</span>
                    <span className="text-[1.1rem]">{item}</span>
                  </li>
                ))}
              </ol>
            </section>
          )}
        </div>

        <aside aria-label="Trip facts" className="lg:sticky lg:top-24 lg:self-start">
          <dl className="border-[3px] border-ink bg-field">
            <div className="border-b border-ink/20 p-5">
              <dt className="caps text-[0.75rem] text-muted">Rating</dt>
              <dd className="mt-1 flex items-end justify-between gap-4">
                <span className="display tabular text-[2.4rem]">{dest.rating?.toFixed(1)}</span>
                <span className="text-sm text-muted">{dest.reviews?.toLocaleString("en-US")} reviews</span>
              </dd>
              <dd aria-hidden="true" className="mt-2 h-2 bg-ink/10">
                <span className="block h-full bg-crimson" style={{ width: `${((dest.rating || 0) / 5) * 100}%` }} />
              </dd>
            </div>
            <div className="border-b border-ink/20 p-5">
              <dt className="caps text-[0.75rem] text-muted">Best time to visit</dt>
              <dd className="mt-1 text-[1.1rem] font-semibold">{dest.bestTimeToVisit || "Year-round"}</dd>
            </div>
            <div className="p-5">
              <dt className="caps text-[0.75rem] text-muted">Daily budget</dt>
              <dd className="mt-1 text-[1.1rem] font-semibold">{dest.estimatedDailyBudget || "Varies"}</dd>
            </div>
          </dl>
          <Link href={planLink} className={buttonClasses({ size: "lg", className: "mt-4 w-full justify-between" })}>
            Plan a trip to {dest.name.split(",")[0]}
            <HiArrowRight aria-hidden="true" className="h-5 w-5" />
          </Link>
          <p className="mt-2 text-sm text-muted">Opens the AI planner with this destination filled in.</p>
        </aside>
      </div>
    </article>
  );
}

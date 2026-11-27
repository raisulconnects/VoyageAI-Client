"use client";

import { Suspense, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { HiOutlineSearch, HiOutlineX } from "react-icons/hi";
import api from "@/lib/api";
import { CATEGORIES } from "@/lib/categories";
import DestinationPlate from "@/components/destinations/DestinationPlate";
import { EmptyState, ErrorState, Glyph, Skeleton } from "@/components/ui/Feedback";
import Button from "@/components/ui/Button";

function ExploreView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const category = params.get("category") || "All";
  const [searchInput, setSearchInput] = useState(params.get("q") || "");
  const [search, setSearch] = useState(searchInput);

  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const setCategory = (next) => {
    const qs = new URLSearchParams(params.toString());
    if (next === "All") qs.delete("category");
    else qs.set("category", next);
    router.replace(`${pathname}${qs.toString() ? `?${qs}` : ""}`, { scroll: false });
  };

  const { data: destinations = [], isLoading, isError, refetch } = useQuery({
    queryKey: ["destinations", category, search],
    queryFn: async () => {
      const query = { limit: 50 };
      if (category !== "All") query.category = category;
      if (search) query.search = search;
      return (await api.get("/destinations", { params: query })).data.data.destinations;
    },
  });

  const filtered = category !== "All" || search;

  return (
    <div className="mx-auto max-w-[1280px] px-5 pt-10 sm:px-8 lg:pt-14">
      <header className="border-b-[3px] border-ink pb-6">
        <h1 className="display text-[3.4rem] sm:text-[5rem]">Destinations</h1>
        <p className="mt-3 max-w-[58ch] text-[1.1rem] text-ink-soft">
          Curated places with the season to go, a daily budget range and the sights worth the trip. Pick one and the
          planner starts from it.
        </p>
        <div className="relative mt-6 max-w-xl">
          <label htmlFor="dest-search" className="sr-only">
            Search destinations
          </label>
          <HiOutlineSearch aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            id="dest-search"
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by place, country or what it’s known for"
            className="h-12 w-full border-[1.5px] border-ink/30 bg-field pl-10 pr-10 text-[1rem] placeholder:text-placeholder focus:border-ink focus:shadow-[0_0_0_3px_var(--color-gold-wash)] focus:outline-none"
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => setSearchInput("")}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-muted hover:text-ink"
            >
              <HiOutlineX className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </header>

      <div role="group" aria-label="Filter by category" className="mt-6 flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
        {[{ name: "All", glyph: "squares" }, ...CATEGORIES].map((c) => {
          const active = category === c.name;
          return (
            <button
              key={c.name}
              type="button"
              aria-pressed={active}
              onClick={() => setCategory(c.name)}
              className={`caps flex shrink-0 items-center gap-2 border-[1.5px] px-3 py-2 text-[0.82rem] transition-colors ${
                active ? "border-ink bg-ink text-board" : "border-ink/25 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c.name !== "All" && <Glyph kind={c.glyph} size={16} />}
              {c.name}
            </button>
          );
        })}
      </div>

      <section aria-labelledby="results-title" className="mt-8">
        <h2 id="results-title" className="caps mb-6 text-[0.85rem] text-muted" aria-live="polite">
          {isLoading ? "Loading destinations" : `${destinations.length} ${destinations.length === 1 ? "destination" : "destinations"}`}
          {category !== "All" && ` · ${category}`}
          {search && ` · “${search}”`}
        </h2>

        {isError ? (
          <ErrorState title="Destinations didn’t load" onRetry={refetch}>
            The server may be restarting. Try again in a moment.
          </ErrorState>
        ) : isLoading ? (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/3]" />
            ))}
          </div>
        ) : destinations.length === 0 ? (
          <EmptyState
            glyph="ring"
            title="Nothing matches yet"
            action={
              filtered && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchInput("");
                    setCategory("All");
                  }}
                >
                  Clear filters
                </Button>
              )
            }
          >
            Try a country name, or another category.
          </EmptyState>
        ) : (
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((dest, i) => (
              <DestinationPlate key={dest._id} dest={dest} priority={i < 3} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={null}>
      <ExploreView />
    </Suspense>
  );
}

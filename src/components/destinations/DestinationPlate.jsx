"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { categoryMeta } from "@/lib/categories";
import { Glyph } from "@/components/ui/Feedback";

/** A destination as a framed plate: photograph, caption, and its rating drawn as a bar. */
export default function DestinationPlate({ dest, large = false, priority = false }) {
  const meta = categoryMeta(dest.category);
  const [broken, setBroken] = useState(false);
  const showImage = dest.image && !broken;

  return (
    <article className="group relative flex h-full flex-col">
      <div
        className={`relative overflow-hidden border-[3px] border-ink bg-board-deep ${
          large ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"
        }`}
      >
        {showImage ? (
          <Image
            src={dest.image}
            alt=""
            fill
            priority={priority}
            onError={() => setBroken(true)}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes={large ? "(max-width: 1024px) 100vw, 66vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3" aria-hidden="true">
            <Glyph kind={meta.glyph} size={large ? 96 : 64} />
            <span className="caps text-[0.75rem] text-muted">No photo yet</span>
          </div>
        )}
        <span
          className={`caps absolute left-0 top-0 px-2.5 py-1 text-[0.72rem] ${meta.ink ? "text-ink" : "text-white"}`}
          style={{ background: meta.color }}
        >
          {dest.category}
        </span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className={`display ${large ? "text-[2.4rem]" : "text-[1.75rem]"}`}>
            <Link
              href={`/destinations/${dest._id}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-focus-within:underline"
            >
              {dest.name}
            </Link>
          </h3>
          {large && dest.description && <p className="mt-1 max-w-[52ch] text-ink-soft">{dest.description}</p>}
        </div>
        {typeof dest.rating === "number" && (
          <div className="shrink-0 pt-1 text-right" aria-label={`Rated ${dest.rating} out of 5`}>
            <span className="tabular display text-[1.5rem]">{dest.rating.toFixed(1)}</span>
            <span aria-hidden="true" className="mt-1 block h-1.5 w-16 bg-ink/15">
              <span className="block h-full bg-crimson" style={{ width: `${(dest.rating / 5) * 100}%` }} />
            </span>
          </div>
        )}
      </div>
      {dest.estimatedDailyBudget && (
        <p className="mt-1 text-sm text-muted">
          <span className="caps text-[0.7rem]">Daily budget</span> {dest.estimatedDailyBudget}
        </p>
      )}
    </article>
  );
}

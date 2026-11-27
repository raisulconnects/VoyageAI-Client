"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { name: "All trips", href: "/my-trips" },
  { name: "Saved", href: "/saved-trips" },
  { name: "Manage", href: "/manage-destinations" },
];

/** The three views of the trip list, as one tabbed section. */
export default function TripsTabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Trip views" className="mt-5 flex gap-1 overflow-x-auto hide-scrollbar">
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={`caps whitespace-nowrap border-[1.5px] px-4 py-2 text-[0.82rem] transition-colors ${
              active ? "border-ink bg-ink text-board" : "border-ink/25 text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </nav>
  );
}

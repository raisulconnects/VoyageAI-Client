import Link from "next/link";
import BrandMark, { InkStripe } from "@/components/ui/BrandMark";

const GROUPS = [
  {
    title: "Product",
    links: [
      { name: "Explore destinations", href: "/explore" },
      { name: "Plan a trip", href: "/ai-planner" },
      { name: "Create an account", href: "/register" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy", href: "/privacy" },
      { name: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-board">
      <InkStripe />
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandMark tone="light" />
          <p className="mt-4 max-w-[34ch] text-board/75">
            Day-by-day trip plans drafted with Google Gemini, priced against your budget, and kept with the rest of your
            travel.
          </p>
        </div>
        {GROUPS.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="caps text-[0.8rem] text-gold">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-board/80 transition-colors hover:text-board">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto max-w-[1280px] border-t border-board/15 px-5 py-6 text-sm text-board/60 sm:px-8">
        © {new Date().getFullYear()} VoyageAI. AI suggestions can be wrong: check opening hours, prices and entry rules
        before you travel.
      </div>
    </footer>
  );
}

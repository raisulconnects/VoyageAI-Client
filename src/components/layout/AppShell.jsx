"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HiOutlineChartBar,
  HiOutlineCollection,
  HiOutlinePlus,
  HiOutlineSparkles,
  HiOutlineChatAlt2,
  HiOutlineGlobe,
  HiOutlineLogout,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import BrandMark from "@/components/ui/BrandMark";
import { Avatar } from "./Navbar";

const TRIP_ROUTES = ["/my-trips", "/saved-trips", "/manage-destinations", "/dashboard/trips"];

const NAV = [
  { name: "Overview", short: "Overview", href: "/dashboard", icon: HiOutlineChartBar, match: (p) => p === "/dashboard" },
  {
    name: "Trips",
    short: "Trips",
    href: "/my-trips",
    icon: HiOutlineCollection,
    match: (p) => TRIP_ROUTES.some((r) => p === r || p.startsWith(`${r}/`)),
  },
  { name: "New trip", short: "New", href: "/add-destination", icon: HiOutlinePlus, match: (p) => p === "/add-destination", desktopOnly: true },
  { name: "Plan with AI", short: "Plan", href: "/ai-planner", icon: HiOutlineSparkles, match: (p) => p === "/ai-planner" },
  { name: "Ask AI", short: "Ask", href: "/ai-chat", icon: HiOutlineChatAlt2, match: (p) => p === "/ai-chat" },
];

export default function AppShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[248px_1fr]">
      <a
        href="#main"
        className="caps sr-only z-[80] bg-gold px-3 py-2 text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      {/* Desktop rail */}
      <aside className="sticky top-0 hidden h-dvh flex-col bg-ink text-board lg:flex">
        <div className="px-5 pb-6 pt-6">
          <BrandMark tone="light" href="/dashboard" />
        </div>
        <nav aria-label="App" className="flex-1 overflow-y-auto px-3">
          <ul className="space-y-1">
            {NAV.map((item) => {
              const active = item.match(pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`caps flex h-11 items-center gap-3 px-3 text-[0.92rem] transition-colors ${
                      active ? "bg-crimson text-white" : "text-board/80 hover:bg-board/[0.07] hover:text-board"
                    }`}
                  >
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="caps mt-8 px-3 text-[0.72rem] text-board/50">Browse</p>
          <Link
            href="/explore"
            className="caps mt-2 flex h-11 items-center gap-3 px-3 text-[0.92rem] text-board/80 transition-colors hover:bg-board/[0.07] hover:text-board"
          >
            <HiOutlineGlobe className="h-5 w-5" aria-hidden="true" />
            Destinations
          </Link>
        </nav>
        {user && (
          <div className="border-t border-board/15 p-3">
            <Link
              href="/profile"
              aria-current={pathname === "/profile" ? "page" : undefined}
              className={`flex items-center gap-3 px-2 py-2 transition-colors ${
                pathname === "/profile" ? "bg-board/10" : "hover:bg-board/[0.07]"
              }`}
            >
              <Avatar user={user} size={34} />
              <span className="min-w-0">
                <span className="block truncate font-semibold">{user.name}</span>
                <span className="block truncate text-sm text-board/65">{user.email}</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="caps mt-1 flex h-10 w-full items-center gap-3 px-3 text-[0.82rem] text-board/70 transition-colors hover:text-board"
            >
              <HiOutlineLogout className="h-5 w-5" aria-hidden="true" />
              Sign out
            </button>
          </div>
        )}
      </aside>

      <div className="min-w-0">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between bg-ink px-4 text-board lg:hidden">
          <BrandMark tone="light" href="/dashboard" />
          <div className="flex items-center gap-1">
            <Link
              href="/add-destination"
              aria-label="New trip"
              className="flex h-10 w-10 items-center justify-center text-board"
            >
              <HiOutlinePlus className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link href="/profile" aria-label="Your profile" className="flex h-10 w-10 items-center justify-center">
              <Avatar user={user} size={30} />
            </Link>
          </div>
        </header>

        <main id="main" className="mx-auto w-full max-w-[1200px] px-4 pb-28 pt-6 sm:px-6 lg:px-10 lg:pb-16 lg:pt-10">
          {children}
        </main>

        {/* Mobile tab bar */}
        <nav
          aria-label="App"
          className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-crimson bg-ink pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          <ul className="grid grid-cols-5">
            {[...NAV.filter((i) => !i.desktopOnly), { name: "Profile", short: "You", href: "/profile", icon: HiOutlineUserCircle, match: (p) => p === "/profile" }].map(
              (item) => {
                const active = item.match(pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`caps flex h-16 flex-col items-center justify-center gap-1 text-[0.7rem] ${
                        active ? "bg-crimson text-white" : "text-board/75"
                      }`}
                    >
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                      {item.short}
                    </Link>
                  </li>
                );
              }
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

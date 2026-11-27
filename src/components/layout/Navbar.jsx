"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import { initials } from "@/lib/format";
import BrandMark from "@/components/ui/BrandMark";
import { buttonClasses } from "@/components/ui/Button";

const LINKS = [
  { name: "Explore", href: "/explore" },
  { name: "Plan a trip", href: "/ai-planner" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 bg-ink text-board">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 sm:px-8">
        <BrandMark tone="light" />

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`caps relative border-b-[3px] py-1.5 text-[0.98rem] transition-colors hover:text-board ${
                  isActive(link.href) ? "border-crimson text-board" : "border-transparent text-board/80"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          {loading ? (
            <span className="h-9 w-28" aria-hidden="true" />
          ) : user ? (
            <>
              <Link href="/dashboard" className={buttonClasses({ variant: "outline-light", size: "sm" })}>
                Open your trips
              </Link>
              <Link href="/profile" aria-label="Your profile" className="block">
                <Avatar user={user} />
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="caps px-2 text-[0.98rem] text-board/80 transition-colors hover:text-board">
                Sign in
              </Link>
              <Link href="/register" className={buttonClasses({ variant: "primary", size: "sm" })}>
                Start planning
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center text-board md:hidden"
        >
          {open ? <HiOutlineX className="h-6 w-6" aria-hidden="true" /> : <HiOutlineMenu className="h-6 w-6" aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="fade-up border-t border-board/15 md:hidden" onClick={(e) => e.target.closest("a") && setOpen(false)}>
          <ul className="px-5 py-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className="display block border-b border-board/10 py-3 text-[1.6rem] text-board"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex gap-3 px-5 pb-5">
            {user ? (
              <Link href="/dashboard" className={buttonClasses({ variant: "primary", className: "flex-1" })}>
                Open your trips
              </Link>
            ) : (
              <>
                <Link href="/login" className={buttonClasses({ variant: "outline-light", className: "flex-1" })}>
                  Sign in
                </Link>
                <Link href="/register" className={buttonClasses({ variant: "primary", className: "flex-1" })}>
                  Start planning
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export function Avatar({ user, size = 36, className = "" }) {
  if (user?.avatarUrl) {
    return (
      <span
        className={`relative block overflow-hidden rounded-full border-[1.5px] border-board/60 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={user.avatarUrl} alt="" fill className="object-cover" sizes={`${size}px`} />
      </span>
    );
  }
  return (
    <span
      className={`caps flex items-center justify-center rounded-full bg-gold text-ink ${className}`}
      style={{ width: size, height: size, fontSize: size * 0.36, letterSpacing: "0.02em" }}
    >
      {initials(user?.name)}
    </span>
  );
}

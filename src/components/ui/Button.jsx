import Link from "next/link";
import { forwardRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap caps transition-[background-color,color,border-color,box-shadow,transform] duration-150 ease-out active:translate-y-px disabled:pointer-events-none disabled:opacity-45 rounded-[var(--radius-sm)] focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary:
    "bg-crimson text-white hover:bg-crimson-deep focus-visible:outline-crimson shadow-[0_1px_0_rgba(22,20,18,0.35)]",
  ink: "bg-ink text-board hover:bg-ink-soft focus-visible:outline-ink",
  outline:
    "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-board focus-visible:outline-ink",
  "outline-light":
    "border-[1.5px] border-board/70 text-board hover:bg-board hover:text-ink focus-visible:outline-board",
  ghost: "text-ink-soft hover:text-ink hover:bg-ink/[0.06] focus-visible:outline-ink",
  danger: "bg-ink text-board hover:bg-crimson focus-visible:outline-crimson",
};

const sizes = {
  sm: "h-9 px-3.5 text-[0.85rem]",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-[3.25rem] px-7 text-[1.05rem]",
  icon: "h-11 w-11 text-[0.95rem]",
  "icon-sm": "h-9 w-9 text-[0.85rem]",
};

export function buttonClasses({ variant = "primary", size = "md", className = "" } = {}) {
  return `${base} ${variants[variant]} ${sizes[size]} ${className}`;
}

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", className = "", href, loading = false, children, ...props },
  ref
) {
  const classes = buttonClasses({ variant, size, className });
  if (href) {
    return (
      <Link ref={ref} href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button
      ref={ref}
      className={classes}
      aria-busy={loading || undefined}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <InlineSpinner />}
      {children}
    </button>
  );
});

export function InlineSpinner({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 animate-spin motion-reduce:animate-none ${className}`}
    >
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export default Button;

"use client";

import { Toaster } from "sonner";

export default function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[356px] max-w-[calc(100vw-2rem)] items-start gap-3 border-[1.5px] border-ink bg-field px-4 py-3 text-[0.95rem] text-ink shadow-[0_8px_24px_-12px_rgba(22,20,18,0.45)]",
          title: "font-semibold",
          description: "text-ink-soft",
          success: "[&_[data-icon]]:text-emerald",
          error: "[&_[data-icon]]:text-crimson",
          info: "[&_[data-icon]]:text-gold",
          icon: "mt-0.5",
        },
      }}
    />
  );
}

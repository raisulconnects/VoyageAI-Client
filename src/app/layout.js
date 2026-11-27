import "./globals.css";

import { Big_Shoulders, Sofia_Sans, Sofia_Sans_Condensed } from "next/font/google";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import AppToaster from "@/components/ui/AppToaster";

const shoulders = Big_Shoulders({
  subsets: ["latin"],
  variable: "--font-shoulders",
  axes: ["opsz"],
  display: "swap",
  adjustFontFallback: false,
});

const sofia = Sofia_Sans({
  subsets: ["latin"],
  variable: "--font-sofia",
  display: "swap",
});

const sofiaCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  variable: "--font-sofia-condensed",
  display: "swap",
});

export const metadata = {
  title: {
    default: "VoyageAI — Trip plans, drawn to the dollar",
    template: "%s · VoyageAI",
  },
  description:
    "Tell VoyageAI where, how long and how much. It drafts a day-by-day plan, rewrites it when you ask, and keeps every trip and budget in one place.",
};

export const viewport = {
  themeColor: "#161412",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${shoulders.variable} ${sofia.variable} ${sofiaCondensed.variable}`}>
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <AppToaster />
      </body>
    </html>
  );
}

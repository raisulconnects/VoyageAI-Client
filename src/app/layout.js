import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/providers/QueryProvider";

export const metadata = {
  title: "VoyageAI",
  description: "AI-powered travel planning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <Navbar />

          <main className="pt-20 min-h-screen">
            {children}
          </main>

          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
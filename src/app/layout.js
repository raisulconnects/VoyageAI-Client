import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import QueryProvider from "@/providers/QueryProvider";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "sonner";

export const metadata = {
  title: "VoyageAI",
  description: "AI-powered travel planning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <QueryProvider>
          <AuthProvider>
            <Navbar />

            <main className="pt-20 min-h-screen">
              {children}
            </main>

            <Footer />
          </AuthProvider>
        </QueryProvider>
        
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
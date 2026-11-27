import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({ children }) {
  return (
    <>
      <a
        href="#main"
        className="caps sr-only z-[80] bg-gold px-3 py-2 text-ink focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="pb-24 [&:has(>[data-flush-footer])]:pb-0">{children}</main>
      <Footer />
    </>
  );
}

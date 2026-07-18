import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import PopularDestinationsSection from "@/components/sections/PopularDestinationsSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CTASection from "@/components/sections/CTASection";

export const metadata = {
  title: "VoyageAI — AI-Powered Travel Planning",
  description:
    "Plan your perfect trip with VoyageAI. Get AI-generated itineraries, explore destinations, and manage all your travels in one place.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <PopularDestinationsSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
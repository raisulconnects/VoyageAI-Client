import { Hero, SampleDays } from "@/components/landing/Hero";
import {
  ClosingBand,
  DestinationsBand,
  ProcessSteps,
  QuestionIndex,
  SampleQuotes,
} from "@/components/landing/LandingSections";

export const metadata = {
  title: { absolute: "VoyageAI — Trip plans, drawn to the dollar" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <SampleDays />
      <DestinationsBand />
      <QuestionIndex />
      <ProcessSteps />
      <SampleQuotes />
      <ClosingBand />
    </>
  );
}

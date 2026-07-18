"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Describe your dream trip",
    description:
      "Tell us where you want to go, how long you're traveling, your budget, and your travel style. The more detail, the better.",
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
  },
  {
    number: "02",
    title: "AI crafts your itinerary",
    description:
      "Our AI analyzes thousands of data points — weather, local events, traveler reviews — and generates a fully optimized plan in seconds.",
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "bg-purple-500/10",
  },
  {
    number: "03",
    title: "Refine and personalize",
    description:
      "Chat with your AI assistant to swap activities, adjust pace, or add special experiences until the plan is exactly right for you.",
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
  },
  {
    number: "04",
    title: "Save and go explore",
    description:
      "Save your trip to the dashboard, track your itinerary on the go, and access everything offline — your adventure awaits.",
    color: "text-orange-400",
    border: "border-orange-500/30",
    bg: "bg-orange-500/10",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* BG accent */}
      <div className="absolute right-0 top-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3"
          >
            Simple process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-lg text-slate-400"
          >
            From idea to itinerary in four simple steps.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line on large screens */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] w-3/4 h-px bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-emerald-500/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.12 }}
                className="relative text-center"
              >
                <div className={`mx-auto w-20 h-20 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6 relative z-10`}>
                  <span className={`text-2xl font-black ${step.color}`}>{step.number}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

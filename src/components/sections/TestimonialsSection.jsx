"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Solo Traveler",
    avatar: "SL",
    avatarBg: "bg-pink-500",
    content:
      "VoyageAI planned my entire 10-day Japan trip in under 5 minutes. The AI even knew about a cherry blossom festival in the area and added it to my itinerary. Absolutely incredible!",
    rating: 5,
  },
  {
    name: "Marcus T.",
    role: "Digital Nomad",
    avatar: "MT",
    avatarBg: "bg-blue-500",
    content:
      "I've used dozens of travel apps. VoyageAI is the first one that actually feels like talking to a knowledgeable local friend. The AI chat is genuinely useful, not just a gimmick.",
    rating: 5,
  },
  {
    name: "Priya K.",
    role: "Family Traveler",
    avatar: "PK",
    avatarBg: "bg-emerald-500",
    content:
      "Planning a family trip with two toddlers used to be a nightmare. VoyageAI tailored everything — kid-friendly spots, nap-friendly schedules, even restaurant recommendations. A lifesaver!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3"
          >
            What travelers say
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            Loved by explorers worldwide
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="glass-card p-6 md:p-8 flex flex-col"
            >
              {/* Stars */}
              <div className="flex space-x-1 mb-5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>

              <blockquote className="text-slate-300 leading-relaxed flex-1 text-[15px]">
                "{t.content}"
              </blockquote>

              <div className="mt-6 pt-6 border-t border-white/10 flex items-center space-x-3">
                <div className={`h-10 w-10 rounded-full ${t.avatarBg} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

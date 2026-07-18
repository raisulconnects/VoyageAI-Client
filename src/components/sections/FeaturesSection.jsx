"use client";

import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineMap, HiOutlineChatAlt, HiOutlineShieldCheck } from "react-icons/hi";

const features = [
  {
    icon: HiOutlineSparkles,
    title: "AI-Powered Planning",
    description:
      "Describe your dream trip and our AI instantly generates a detailed, day-by-day itinerary personalized to your style and budget.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
  {
    icon: HiOutlineMap,
    title: "Smart Destination Insights",
    description:
      "Get curated local tips, best-time-to-visit guides, hidden gems, and real-time recommendations for every destination.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: HiOutlineChatAlt,
    title: "AI Travel Assistant",
    description:
      "Chat with your personal AI travel assistant 24/7 — ask about flights, restaurants, culture, or anything travel-related.",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
  },
  {
    icon: HiOutlineShieldCheck,
    title: "Trip Management Hub",
    description:
      "Keep all your bookings, itineraries, and travel documents in one organized, beautifully designed dashboard.",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3"
          >
            Everything you need
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white"
          >
            Travel smarter, not harder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg text-slate-400"
          >
            VoyageAI combines the power of artificial intelligence with beautiful design
            to make trip planning a joy, not a chore.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`glass-card p-6 border ${feature.border} hover:ring-1 hover:ring-white/10 transition-all group`}
            >
              <div className={`inline-flex p-3 rounded-xl ${feature.bg} border ${feature.border} mb-5`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

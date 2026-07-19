"use client";

import { motion } from "framer-motion";
import { HiOutlineLightBulb, HiOutlineGlobe, HiOutlineUsers } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function AboutPage() {
  const { data: globalStats } = useQuery({
    queryKey: ["globalStats"],
    queryFn: async () => {
      const res = await api.get("/dashboard/global");
      return res.data.data;
    },
  });

  const stats = [
    { label: "Destinations Covered", value: globalStats ? `${globalStats.totalDestinations}+` : "—" },
    { label: "Active Users", value: globalStats ? `${globalStats.totalUsers}+` : "—" },
    { label: "Trips Planned", value: globalStats ? `${globalStats.totalTrips}+` : "—" },
  ];

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          About <span className="text-gradient">VoyageAI</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-xl text-slate-400 max-w-3xl mx-auto"
        >
          We are on a mission to revolutionize how the world travels by combining cutting-edge artificial intelligence with deep local expertise.
        </motion.p>
      </div>

      {/* Story Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="glass-card p-2 rounded-3xl">
            <div className="aspect-[4/3] rounded-2xl bg-slate-900 overflow-hidden relative border border-white/5 flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
               <span className="text-6xl">🌍</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold text-white">Our Story</h2>
          <p className="text-slate-400 leading-relaxed">
            VoyageAI was born from a simple realization: travel planning is often more stressful than the trip itself. Between juggling dozens of tabs, calculating budgets, and trying to figure out logistics, the joy of anticipation gets lost.
          </p>
          <p className="text-slate-400 leading-relaxed">
            We built an intelligent engine that understands your preferences, respects your budget, and crafts personalized itineraries that would take a human expert hours to assemble. Now, you can go from inspiration to a fully-booked plan in minutes.
          </p>
        </motion.div>
      </div>

      {/* Values Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: HiOutlineLightBulb,
              title: "Innovation First",
              desc: "Constantly pushing the boundaries of what AI can do in the travel sector to deliver magical experiences.",
              color: "text-blue-400",
              bg: "bg-blue-500/20"
            },
            {
              icon: HiOutlineGlobe,
              title: "Authentic Exploration",
              desc: "Guiding users not just to tourist traps, but to hidden gems and authentic cultural experiences.",
              color: "text-emerald-400",
              bg: "bg-emerald-500/20"
            },
            {
              icon: HiOutlineUsers,
              title: "Community Driven",
              desc: "Building a platform that learns from the collective wisdom of travelers around the globe.",
              color: "text-purple-400",
              bg: "bg-purple-500/20"
            }
          ].map((value, idx) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
              className="glass-card p-8 text-center"
            >
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${value.bg}`}>
                <value.icon className={`h-8 w-8 ${value.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
              <p className="text-slate-400">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="glass p-12 rounded-3xl border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              className="pt-6 md:pt-0"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

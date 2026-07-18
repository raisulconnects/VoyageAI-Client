"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineSparkles, HiOutlineLocationMarker } from "react-icons/hi";

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-24 pb-32 lg:pt-36 lg:pb-48">
      {/* Background glowing orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-64 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
        >
          <HiOutlineSparkles className="text-blue-400 h-4 w-4" />
          <span className="text-sm font-medium text-slate-300">
            Next-generation AI travel planning
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8 leading-tight"
        >
          Plan your perfect trip <br className="hidden md:block" />
          with <span className="text-gradient">VoyageAI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl text-slate-400 mb-12 leading-relaxed"
        >
          Stop stressing over itineraries. Our intelligent platform crafts personalized,
          optimized travel plans in seconds — so you can focus on the adventure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link
            href="/register"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-blue-600 rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] w-full sm:w-auto"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative flex items-center">
              <HiOutlineSparkles className="mr-2 h-5 w-5" />
              Start for Free
            </span>
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white glass hover:bg-white/10 rounded-full transition-all w-full sm:w-auto border border-white/10"
          >
            <HiOutlineLocationMarker className="mr-2 h-5 w-5" />
            Explore Destinations
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-16 flex flex-wrap justify-center gap-12"
        >
          {[
            { value: "50K+", label: "Trips Planned" },
            { value: "120+", label: "Destinations" },
            { value: "4.9★", label: "User Rating" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

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
        <div className="absolute top-32 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-8"
        >
          <HiOutlineSparkles className="text-blue-400 h-5 w-5" />
          <span className="text-sm font-medium text-slate-300">
            Next-generation travel planning
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-8"
        >
          Design your perfect trip with <br className="hidden md:block" />
          <span className="text-gradient">VoyageAI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto text-xl text-slate-400 mb-12"
        >
          Stop stressing over itineraries. Our intelligent platform crafts personalized, 
          optimized travel plans in seconds, so you can focus on the adventure.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link
            href="/ai-planner"
            className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-blue-600 rounded-full overflow-hidden transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] w-full sm:w-auto"
          >
            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20" />
            </div>
            <span className="relative flex items-center">
              <HiOutlineSparkles className="mr-2 h-5 w-5" />
              Start Planning
            </span>
          </Link>
          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white glass hover:bg-white/10 rounded-full transition-all w-full sm:w-auto"
          >
            <HiOutlineLocationMarker className="mr-2 h-5 w-5" />
            Explore Destinations
          </Link>
        </motion.div>

        {/* Dashboard Preview or Stats could go here */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative mx-auto max-w-5xl"
        >
          <div className="glass-card p-2 md:p-4 rounded-3xl overflow-hidden ring-1 ring-white/10">
            <div className="aspect-[16/9] rounded-2xl bg-slate-900 border border-white/5 relative flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-emerald-500/10" />
              {/* Replace with actual image later using generate_image if needed, or keep as a beautiful placeholder */}
              <div className="text-center">
                <p className="text-slate-500 font-mono text-sm">Interactive Dashboard Preview</p>
                <div className="mt-4 flex gap-4 justify-center">
                  <div className="w-16 h-16 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 blur-xl animate-pulse delay-150" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiOutlineSparkles } from "react-icons/hi";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl glass-card p-12 md:p-20 text-center border border-white/10"
        >
          {/* Decorative orbs */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
              <HiOutlineSparkles className="text-blue-400 h-4 w-4" />
              <span className="text-sm font-medium text-slate-300">No credit card required</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Your next adventure <br className="hidden md:block" />
              starts <span className="text-gradient">right here</span>
            </h2>

            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10">
              Join over 50,000 travelers who use VoyageAI to plan unforgettable trips. 
              Sign up free and plan your first trip in minutes.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/register"
                className="group relative inline-flex items-center justify-center px-10 py-4 text-base font-semibold text-white bg-blue-600 rounded-full overflow-hidden shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:shadow-[0_0_50px_rgba(37,99,235,0.7)] transition-all"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>
                <span className="relative flex items-center">
                  <HiOutlineSparkles className="mr-2 h-5 w-5" />
                  Get Started Free
                </span>
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center px-10 py-4 text-base font-medium text-white glass hover:bg-white/10 rounded-full border border-white/10 transition-all"
              >
                Browse Destinations
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

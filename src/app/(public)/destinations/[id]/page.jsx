"use client";

import { motion } from "framer-motion";
import { HiOutlineLocationMarker, HiOutlineStar, HiOutlineClock, HiOutlineCurrencyDollar } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data
const destinationData = {
  1: {
    name: "Kyoto, Japan",
    description: "Experience the perfect blend of ancient traditions and breathtaking nature. Kyoto served as Japan's capital and the emperor's residence from 794 until 1868. It is one of the country's ten largest cities with a population of 1.5 million people and a modern face. Over the centuries, Kyoto was destroyed by many wars and fires, but due to its exceptional historic value, the city was dropped from the list of target cities for the atomic bomb and escaped destruction during World War II.",
    longDescription: "Countless temples, shrines, and other historically priceless structures survive in the city today. Beyond its history, Kyoto is a vibrant modern city where traditional crafts thrive alongside cutting-edge technology.",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    rating: 4.9,
    reviews: 1240,
    bestTimeToVisit: "Spring (March-May) or Fall (Sept-Nov)",
    estimatedDailyBudget: "$150 - $250",
    category: "Cultural",
    highlights: ["Fushimi Inari Taisha", "Kinkaku-ji (Golden Pavilion)", "Arashiyama Bamboo Grove", "Gion District"]
  }
};

export default function DestinationDetailsPage() {
  const params = useParams();
  // Provide fallback data if id is not 1 for the mock
  const dest = destinationData[params.id] || destinationData[1];

  return (
    <div className="py-20">
      {/* Hero Header */}
      <div className="relative h-[60vh] w-full mt-[-80px]">
        <div className="absolute inset-0 bg-slate-900">
          <Image
            src={dest.image}
            alt={dest.name}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-end max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 rounded-full bg-blue-600/90 text-white text-sm font-bold backdrop-blur-md mb-6 inline-block">
              {dest.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4">
              {dest.name}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-slate-200">
              <div className="flex items-center">
                <HiOutlineStar className="h-5 w-5 text-yellow-400 mr-1.5" />
                <span className="font-semibold">{dest.rating}</span>
                <span className="text-slate-400 ml-1">({dest.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <HiOutlineLocationMarker className="h-5 w-5 mr-1.5" />
                <span>Japan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-12"
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">About this destination</h2>
              <div className="prose prose-invert max-w-none text-slate-300">
                <p className="text-lg leading-relaxed mb-4">{dest.description}</p>
                <p className="leading-relaxed">{dest.longDescription}</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Top Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {dest.highlights.map((item, idx) => (
                  <div key={idx} className="glass-card p-4 flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                      <span className="text-blue-400 font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-6 md:p-8 sticky top-24">
              <h3 className="text-xl font-bold text-white mb-6">Quick Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0 text-purple-400">
                    <HiOutlineClock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Best Time To Visit</p>
                    <p className="font-medium text-slate-200 mt-1">{dest.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <HiOutlineCurrencyDollar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Estimated Daily Budget</p>
                    <p className="font-medium text-slate-200 mt-1">{dest.estimatedDailyBudget}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <Link
                  href="/add-destination"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] flex items-center justify-center"
                >
                  Plan Trip Here
                </Link>
                <button className="w-full mt-4 glass hover:bg-white/10 text-white font-medium py-3 rounded-xl transition-all">
                  Save to Wishlist
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

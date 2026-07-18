"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TripCard from "@/components/cards/TripCard";
import { HiOutlinePlus, HiOutlineFilter } from "react-icons/hi";
import Link from "next/link";

const mockTrips = [
  {
    id: 1,
    title: "Summer in Japan",
    destination: "Tokyo, Kyoto, Osaka",
    dates: "Jul 15 - Aug 02, 2026",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    status: "Upcoming",
    budget: 3500,
    progress: 80,
    saved: true
  },
  {
    id: 2,
    title: "Weekend Getaway",
    destination: "Banff, Canada",
    dates: "Sep 10 - Sep 13, 2026",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    status: "Planning",
    budget: 800,
    progress: 30,
    saved: false
  },
  {
    id: 3,
    title: "Eurotrip 2025",
    destination: "Paris, Rome, Barcelona",
    dates: "May 01 - May 21, 2025",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=800&auto=format&fit=crop",
    status: "Completed",
    budget: 5200,
    progress: 100,
    saved: true
  },
  {
    id: 4,
    title: "Tropical Escape",
    destination: "Bali, Indonesia",
    dates: "Dec 10 - Dec 24, 2026",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    status: "Planning",
    budget: 2500,
    progress: 10,
    saved: false
  }
];

export default function MyTripsPage() {
  const [filter, setFilter] = useState("All");

  const filteredTrips = filter === "All" 
    ? mockTrips 
    : mockTrips.filter(trip => trip.status === filter);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">My Trips</h1>
          <p className="text-slate-400 mt-1">Manage and organize all your travel itineraries.</p>
        </div>
        <Link 
          href="/add-destination"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
        >
          <HiOutlinePlus className="mr-2 h-5 w-5" />
          New Trip
        </Link>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between bg-slate-900/50 p-2 rounded-xl border border-white/10">
        <div className="flex overflow-x-auto hide-scrollbar gap-1">
          {["All", "Upcoming", "Planning", "Completed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                filter === status 
                  ? "bg-white/10 text-white" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        <button className="hidden sm:flex items-center px-3 py-2 text-slate-400 hover:text-white transition-colors">
          <HiOutlineFilter className="mr-2 h-4 w-4" />
          <span className="text-sm">Filter</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTrips.map((trip, idx) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <TripCard trip={trip} />
          </motion.div>
        ))}
      </div>

      {filteredTrips.length === 0 && (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🌍</span>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No trips found</h3>
          <p className="text-slate-400">Try changing your filters or create a new trip.</p>
        </div>
      )}
    </div>
  );
}

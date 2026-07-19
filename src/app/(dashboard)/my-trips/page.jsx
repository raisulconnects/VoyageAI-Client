"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import TripCard from "@/components/cards/TripCard";
import { HiOutlinePlus, HiOutlineFilter } from "react-icons/hi";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export default function MyTripsPage() {
  const [filter, setFilter] = useState("All");

  const { data: trips = [], isLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await api.get("/trips");
      return res.data.data;
    }
  });

  const filteredTrips = filter === "All" 
    ? trips 
    : trips.filter(trip => trip.status === filter);

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
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </div>
      )}

      {!isLoading && filteredTrips.length === 0 && (
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

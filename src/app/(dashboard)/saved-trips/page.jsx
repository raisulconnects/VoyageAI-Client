"use client";

import { motion } from "framer-motion";
import TripCard from "@/components/cards/TripCard";
import { HiOutlineSearch } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";

export default function SavedTripsPage() {
  const [search, setSearch] = useState("");

  const { data: savedTrips = [], isLoading } = useQuery({
    queryKey: ["savedTrips"],
    queryFn: async () => {
      const res = await api.get("/trips/saved");
      return res.data.data;
    }
  });

  const filteredTrips = savedTrips.filter(trip => 
    trip.title.toLowerCase().includes(search.toLowerCase()) || 
    trip.destination.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Saved Trips</h1>
          <p className="text-slate-400 mt-1">Trips and destinations you've bookmarked for later.</p>
        </div>
        
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <HiOutlineSearch className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-9 pr-3 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
            placeholder="Search saved trips..."
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip, idx) => (
            <motion.div
              key={trip._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
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
            <span className="text-2xl">❤️</span>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No saved trips</h3>
          <p className="text-slate-400">Explore destinations and click the heart icon to save them here.</p>
          <a href="/explore" className="inline-block mt-4 text-blue-400 hover:text-blue-300 font-medium">
            Explore Destinations →
          </a>
        </div>
      )}
    </div>
  );
}

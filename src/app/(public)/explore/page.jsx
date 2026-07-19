"use client";

import { motion } from "framer-motion";
import { HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const CATEGORIES = ["All", "Cultural", "Nature", "Romantic", "Urban", "Tropical", "Historical"];

export default function ExplorePage() {
  const [category, setCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Simple debounce for search
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
    setTimeout(() => {
      setDebouncedSearch(e.target.value);
    }, 500);
  };

  const { data: destinations = [], isLoading } = useQuery({
    queryKey: ["destinations", category, debouncedSearch],
    queryFn: async () => {
      const params = {};
      if (category !== "All") params.category = category;
      if (debouncedSearch) params.search = debouncedSearch;
      
      const res = await api.get("/destinations", { params });
      return res.data.data.destinations;
    }
  });

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header & Search */}
      <div className="mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-6"
        >
          Explore <span className="text-gradient">Destinations</span>
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 max-w-3xl"
        >
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              className="block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Search destinations, countries, or vibes..."
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-3 glass hover:bg-white/10 rounded-xl text-white transition-all">
            <HiOutlineFilter className="h-5 w-5" />
            Filters
          </button>
        </motion.div>
      </div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex overflow-x-auto pb-6 mb-10 gap-4 hide-scrollbar"
      >
        {CATEGORIES.map((cat, idx) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all ${
              category === cat 
                ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]" 
                : "glass text-slate-300 hover:text-white hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : destinations.length === 0 ? (
        <div className="text-center py-20">
          <h3 className="text-xl text-white font-medium">No destinations found</h3>
          <p className="text-slate-400 mt-2">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * (idx % 3) }}
              className="group glass-card overflow-hidden hover:ring-1 hover:ring-blue-500/50 transition-all cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-slate-800 animate-pulse" />
                <Image
                  src={dest.image || "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e"}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/10">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white text-sm font-medium">{dest.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                    {dest.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {dest.name}
                </h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-4">
                  {dest.description}
                </p>
                
                <Link 
                  href={`/destinations/${dest._id}`}
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  View Details <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

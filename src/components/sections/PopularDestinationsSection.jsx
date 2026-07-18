"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineLocationMarker, HiOutlineStar } from "react-icons/hi";

const destinations = [
  {
    id: 1,
    name: "Kyoto, Japan",
    tagline: "Ancient temples, bamboo groves",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    tag: "Cultural",
    tagColor: "bg-blue-600/90",
  },
  {
    id: 2,
    name: "Santorini, Greece",
    tagline: "Cliffside villages, azure seas",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    tag: "Romantic",
    tagColor: "bg-pink-600/90",
  },
  {
    id: 3,
    name: "Bali, Indonesia",
    tagline: "Temples, rice fields, beaches",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    rating: 4.7,
    tag: "Tropical",
    tagColor: "bg-emerald-600/90",
  },
  {
    id: 4,
    name: "Banff, Canada",
    tagline: "Glacial lakes, mountain trails",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    tag: "Adventure",
    tagColor: "bg-orange-600/90",
  },
];

export default function PopularDestinationsSection() {
  return (
    <section className="py-24 relative">
      {/* Subtle background accent */}
      <div className="absolute left-0 top-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-3"
            >
              Trending now
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-white"
            >
              Popular destinations
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/explore"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
            >
              View all destinations →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest, idx) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Link href={`/destinations/${dest.id}`} className="group block">
                <div className="glass-card overflow-hidden hover:ring-1 hover:ring-white/20 transition-all">
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold text-white ${dest.tagColor} backdrop-blur-md`}>
                        {dest.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-black/40 backdrop-blur-md px-2 py-1 rounded-full">
                      <HiOutlineStar className="h-3.5 w-3.5 text-yellow-400 mr-1" />
                      <span className="text-xs font-semibold text-white">{dest.rating}</span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors">
                      {dest.name}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1 flex items-center">
                      <HiOutlineLocationMarker className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                      {dest.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

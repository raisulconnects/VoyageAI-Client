"use client";

import { motion } from "framer-motion";
import { HiOutlineSearch, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";

// Mock Data
const destinations = [
  {
    id: 1,
    title: "Summer in Japan",
    location: "Tokyo, Kyoto, Osaka",
    status: "Upcoming",
    dateAdded: "Oct 15, 2025",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Weekend Getaway",
    location: "Banff, Canada",
    status: "Planning",
    dateAdded: "Jan 10, 2026",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Eurotrip 2025",
    location: "Paris, Rome, Barcelona",
    status: "Completed",
    dateAdded: "Feb 20, 2025",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=200&auto=format&fit=crop",
  },
];

export default function ManageDestinationsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Manage Destinations</h1>
          <p className="text-slate-400 mt-1">View, edit, or remove your planned destinations.</p>
        </div>
        <Link 
          href="/add-destination"
          className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20"
        >
          Add New
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-slate-900/50">
          <div className="relative w-full max-w-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <HiOutlineSearch className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 pr-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition-all"
              placeholder="Search destinations..."
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="text-xs uppercase bg-slate-800/50 text-slate-400 border-b border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium">Destination</th>
                <th scope="col" className="px-6 py-4 font-medium">Status</th>
                <th scope="col" className="px-6 py-4 font-medium">Date Added</th>
                <th scope="col" className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {destinations.map((dest, idx) => (
                <motion.tr 
                  key={dest.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                        <Image
                          src={dest.image}
                          alt={dest.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{dest.title}</div>
                        <div className="text-xs text-slate-500">{dest.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      dest.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      dest.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {dest.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {dest.dateAdded}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors" title="View Details">
                        <HiOutlineEye className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors" title="Edit">
                        <HiOutlinePencilAlt className="h-4 w-4" />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors" title="Delete">
                        <HiOutlineTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination mock */}
        <div className="p-4 border-t border-white/10 bg-slate-900/50 flex items-center justify-between text-sm text-slate-400">
          <div>Showing 1 to 3 of 3 entries</div>
          <div className="flex space-x-1">
            <button className="px-3 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 rounded border border-blue-500/30 bg-blue-600/20 text-blue-400 transition-colors">1</button>
            <button className="px-3 py-1 rounded border border-white/10 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

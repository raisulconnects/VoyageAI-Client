"use client";

import { motion } from "framer-motion";
import { HiOutlineSearch, HiOutlinePencilAlt, HiOutlineTrash, HiOutlineEye } from "react-icons/hi";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useState } from "react";
import { toast } from "sonner";

export default function ManageDestinationsPage() {
  const [search, setSearch] = useState("");

  const { data: trips = [], isLoading, refetch } = useQuery({
    queryKey: ["manageTrips"],
    queryFn: async () => {
      const res = await api.get("/trips");
      return res.data.data;
    }
  });

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      try {
        await api.delete(`/trips/${id}`);
        toast.success("Trip deleted successfully");
        refetch();
      } catch (err) {
        toast.error("Failed to delete trip");
      }
    }
  };

  const filteredTrips = trips.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                    Loading trips...
                  </td>
                </tr>
              ) : filteredTrips.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                    No trips found.
                  </td>
                </tr>
              ) : (
                filteredTrips.map((dest, idx) => (
                  <motion.tr 
                    key={dest._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 bg-slate-800">
                          {dest.image && (
                            <Image
                              src={dest.image}
                              alt={dest.title}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-white group-hover:text-blue-400 transition-colors">{dest.title}</div>
                          <div className="text-xs text-slate-500">{dest.destination}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                        dest.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        dest.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        {dest.status || 'Planning'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {new Date(dest.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-md transition-colors" title="View Details">
                          <HiOutlineEye className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-md transition-colors" title="Edit">
                          <HiOutlinePencilAlt className="h-4 w-4" />
                        </button>
                        <button onClick={() => handleDelete(dest._id)} className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors" title="Delete">
                          <HiOutlineTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/50 text-sm text-slate-400">
          <div>Showing {filteredTrips.length} {filteredTrips.length === 1 ? 'entry' : 'entries'}</div>
        </div>
      </div>
    </div>
  );
}

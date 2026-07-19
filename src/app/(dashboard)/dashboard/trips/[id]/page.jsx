"use client";

import { motion } from "framer-motion";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineCurrencyDollar, HiOutlinePencilAlt, HiOutlineArrowLeft } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const STATUS_STYLES = {
  Upcoming: "bg-blue-600/90 text-white",
  Completed: "bg-emerald-600/90 text-white",
  Planning: "bg-slate-600/90 text-white",
};

export default function TripDetailPage() {
  const params = useParams();

  const { data: trip, isLoading } = useQuery({
    queryKey: ["trip", params.id],
    queryFn: async () => {
      const res = await api.get(`/trips/${params.id}`);
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center h-screen items-center">
        <div className="w-10 h-10 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="py-20 flex flex-col items-center justify-center h-screen">
        <h2 className="text-2xl text-white mb-4">Trip not found</h2>
        <Link href="/my-trips" className="text-blue-400 hover:text-blue-300">
          ← Back to My Trips
        </Link>
      </div>
    );
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/my-trips"
          className="flex items-center text-slate-400 hover:text-white transition-colors"
        >
          <HiOutlineArrowLeft className="h-5 w-5 mr-2" />
          Back to My Trips
        </Link>
        <Link
          href={`/dashboard/trips/${params.id}/edit`}
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition-colors"
        >
          <HiOutlinePencilAlt className="mr-2 h-4 w-4" />
          Edit Trip
        </Link>
      </div>

      {/* Cover Image */}
      {trip.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-64 md:h-80 rounded-2xl overflow-hidden"
        >
          <Image
            src={trip.coverImage}
            alt={trip.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </motion.div>
      )}

      {/* Title & Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-3xl font-bold text-white">{trip.title}</h1>
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${STATUS_STYLES[trip.status] || STATUS_STYLES.Planning}`}>
            {trip.status}
          </span>
        </div>
        <div className="flex items-center text-slate-400">
          <HiOutlineLocationMarker className="h-5 w-5 mr-1.5" />
          {trip.destination}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Dates & Budget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div className="glass-card p-4 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <HiOutlineCalendar className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Start Date</p>
                <p className="text-sm font-medium text-white">{formatDate(trip.startDate)}</p>
              </div>
            </div>
            <div className="glass-card p-4 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <HiOutlineCalendar className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">End Date</p>
                <p className="text-sm font-medium text-white">{formatDate(trip.endDate)}</p>
              </div>
            </div>
            <div className="glass-card p-4 flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <HiOutlineCurrencyDollar className="h-5 w-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Budget</p>
                <p className="text-sm font-medium text-white">${trip.budget}</p>
              </div>
            </div>
          </motion.div>

          {/* Notes */}
          {trip.notes && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-3">Notes</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{trip.notes}</p>
            </motion.div>
          )}

          {/* Itinerary */}
          {trip.itinerary && trip.itinerary.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">Itinerary</h2>
              <div className="space-y-4">
                {trip.itinerary.map((day, idx) => (
                  <div key={idx} className="border-l-2 border-blue-500/30 pl-4">
                    <h3 className="text-sm font-bold text-blue-400 mb-1">
                      Day {day.day} — {day.title}
                    </h3>
                    {day.activities && day.activities.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {day.activities.map((act, i) => (
                          <li key={i} className="text-sm text-slate-300 flex items-start">
                            <span className="text-slate-500 mr-2">•</span>
                            {act}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Budget Breakdown */}
          {trip.budgetBreakdown && trip.budgetBreakdown.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">Budget Breakdown</h2>
              <div className="space-y-3">
                {trip.budgetBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{item.name}</span>
                    <span className="text-sm font-medium text-white">${item.value}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Total</span>
                  <span className="text-sm font-bold text-white">
                    ${trip.budgetBreakdown.reduce((sum, item) => sum + item.value, 0)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Expenses */}
          {trip.expenses && trip.expenses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
              className="glass-card p-6"
            >
              <h2 className="text-lg font-bold text-white mb-4">Expenses</h2>
              <div className="space-y-3">
                {trip.expenses.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-slate-300">{item.day}</span>
                    <span className="text-sm font-medium text-white">${item.amount}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-medium text-white">Total</span>
                  <span className="text-sm font-bold text-white">
                    ${trip.expenses.reduce((sum, item) => sum + item.amount, 0)}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

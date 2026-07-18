"use client";

import { motion } from "framer-motion";
import { HiOutlineMap, HiOutlineCurrencyDollar, HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import TripCard from "@/components/cards/TripCard";

// Mock Data
const stats = [
  { name: "Total Trips", value: "12", icon: HiOutlineMap, color: "text-blue-400", bg: "bg-blue-500/20" },
  { name: "Countries Visited", value: "8", icon: HiOutlineLocationMarker, color: "text-emerald-400", bg: "bg-emerald-500/20" },
  { name: "Total Spent", value: "$8,450", icon: HiOutlineCurrencyDollar, color: "text-purple-400", bg: "bg-purple-500/20" },
  { name: "Upcoming Days", value: "14", icon: HiOutlineCalendar, color: "text-orange-400", bg: "bg-orange-500/20" },
];

const upcomingTrips = [
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
  }
];

const budgetData = [
  { name: "Flights", value: 1200 },
  { name: "Accommodation", value: 1500 },
  { name: "Food", value: 600 },
  { name: "Activities", value: 400 },
];

const expenseData = [
  { day: "Day 1", amount: 150 },
  { day: "Day 2", amount: 230 },
  { day: "Day 3", amount: 180 },
  { day: "Day 4", amount: 290 },
  { day: "Day 5", amount: 120 },
];

const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b'];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back! Here's an overview of your travels.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Upcoming Trips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Upcoming Trips</h2>
              <a href="/my-trips" className="text-sm font-medium text-blue-400 hover:text-blue-300">View all</a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          </motion.div>

          {/* Daily Expenses Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white mb-6">Recent Trip Expenses</h2>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={expenseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                  <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: '#ffffff05' }}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Budget Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white mb-6">Budget Distribution</h2>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {budgetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                     contentStyle={{ backgroundColor: '#0f172a', borderColor: '#ffffff20', borderRadius: '8px', color: '#fff' }}
                     itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-white">$3,700</span>
                <span className="text-xs text-slate-400">Total</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
               {budgetData.map((item, idx) => (
                 <div key={item.name} className="flex items-center">
                   <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[idx] }} />
                   <div>
                     <p className="text-xs text-slate-400">{item.name}</p>
                     <p className="text-sm font-semibold text-white">${item.value}</p>
                   </div>
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <a href="/add-destination" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Plan a new trip</span>
                <span className="text-blue-400">→</span>
              </a>
              <a href="/ai-planner" className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-colors group">
                <span className="text-sm font-medium text-slate-300 group-hover:text-white">Ask AI Assistant</span>
                <span className="text-purple-400">✨</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

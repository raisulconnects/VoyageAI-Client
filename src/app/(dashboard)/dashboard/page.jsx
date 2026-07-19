"use client";

import { motion } from "framer-motion";
import { HiOutlineMap, HiOutlineCurrencyDollar, HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import TripCard from "@/components/cards/TripCard";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const COLORS = ['#3b82f6', '#10b981', '#a855f7', '#f59e0b'];

function aggregateBudgetBreakdown(trips) {
  const merged = {};
  for (const trip of trips) {
    if (!trip.budgetBreakdown) continue;
    for (const item of trip.budgetBreakdown) {
      merged[item.name] = (merged[item.name] || 0) + item.value;
    }
  }
  return Object.entries(merged)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function getLatestExpenses(trips) {
  const sorted = [...trips]
    .filter(t => t.expenses && t.expenses.length > 0)
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  return sorted[0]?.expenses || [];
}

function formatCurrency(val) {
  if (val >= 1000) return `$${(val / 1000).toFixed(1)}k`;
  return `$${val}`;
}

export default function DashboardPage() {
  const { user } = useAuth();

  const { data: statsData, isLoading: isStatsLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = await api.get("/dashboard/stats");
      return res.data.data;
    }
  });

  const { data: tripsData = [], isLoading: isTripsLoading } = useQuery({
    queryKey: ["trips"],
    queryFn: async () => {
      const res = await api.get("/trips");
      return res.data.data;
    }
  });

  // Calculate dynamic stats
  const stats = [
    { name: "Total Trips", value: statsData?.totalTrips || 0, icon: HiOutlineMap, color: "text-blue-400", bg: "bg-blue-500/20" },
    { name: "Countries Visited", value: statsData?.countriesVisited || 0, icon: HiOutlineLocationMarker, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { name: "Total Spent", value: `$${statsData?.totalSpent || 0}`, icon: HiOutlineCurrencyDollar, color: "text-purple-400", bg: "bg-purple-500/20" },
    { name: "Upcoming Days", value: statsData?.upcomingDays !== null ? statsData?.upcomingDays : "-", icon: HiOutlineCalendar, color: "text-orange-400", bg: "bg-orange-500/20" },
  ];

  const budgetData = aggregateBudgetBreakdown(tripsData);
  const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0);
  const expenseData = getLatestExpenses(tripsData);

  // Filter for only upcoming trips
  const upcomingTrips = tripsData
    .filter(t => new Date(t.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate) - new Date(b.startDate))
    .slice(0, 2); // Show top 2

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back{user?.name ? `, ${user.name}` : ''}! Here's an overview of your travels.</p>
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
                {isStatsLoading ? (
                  <div className="h-8 w-16 bg-white/10 rounded animate-pulse mt-1" />
                ) : (
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                )}
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
            
            {isTripsLoading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
              </div>
            ) : upcomingTrips.length === 0 ? (
              <div className="glass-card p-8 text-center">
                <p className="text-slate-400">No upcoming trips planned yet.</p>
                <a href="/add-destination" className="inline-block mt-4 text-blue-400 hover:text-blue-300">Plan a trip →</a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {upcomingTrips.map((trip) => (
                  <TripCard key={trip._id} trip={trip} />
                ))}
              </div>
            )}
          </motion.div>

          {/* Daily Expenses Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6"
          >
            <h2 className="text-lg font-bold text-white mb-6">Recent Trip Expenses</h2>
            {expenseData.length === 0 ? (
              <div className="h-72 flex items-center justify-center text-slate-400">
                <p>No expense data yet. Add expenses to your trips to see them here.</p>
              </div>
            ) : (
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
            )}
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
            {budgetData.length === 0 ? (
              <div className="h-64 flex items-center justify-center text-slate-400 text-center">
                <p>No budget data yet.<br />Add a budget breakdown to your trips.</p>
              </div>
            ) : (
              <>
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
                    <span className="text-2xl font-bold text-white">{formatCurrency(totalBudget)}</span>
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
              </>
            )}
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

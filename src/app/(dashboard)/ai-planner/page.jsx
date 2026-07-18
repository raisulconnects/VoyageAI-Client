"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineSparkles, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineCurrencyDollar } from "react-icons/hi";
import Input from "@/components/common/Input";

export default function AIPlannerPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = (e) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Mock AI generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setResult({
        title: "7-Day Adventure in Kyoto",
        days: [
          { day: 1, title: "Arrival & Gion District", activities: ["Check-in at Ryokan", "Walk through Yasaka Shrine", "Dinner in Pontocho"] },
          { day: 2, title: "Temples & Bamboo", activities: ["Arashiyama Bamboo Grove", "Tenryu-ji Temple", "Monkey Park Iwatayama"] },
          { day: 3, title: "Golden Pavilion", activities: ["Kinkaku-ji", "Ryoan-ji Rock Garden", "Traditional Tea Ceremony"] },
        ]
      });
    }, 2500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4 border border-purple-500/30">
          <HiOutlineSparkles className="h-8 w-8 text-purple-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AI Trip Planner</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Tell us about your dream vacation, and our AI will craft a personalized itinerary optimized for your budget and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 sticky top-24"
          >
            <form onSubmit={handleGenerate} className="space-y-6">
              <Input
                id="destination"
                label="Where do you want to go?"
                placeholder="e.g. Kyoto, Japan"
                icon={HiOutlineLocationMarker}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="duration"
                  label="Duration (days)"
                  type="number"
                  placeholder="7"
                  icon={HiOutlineCalendar}
                  required
                />
                <Input
                  id="budget"
                  label="Budget ($)"
                  type="number"
                  placeholder="2000"
                  icon={HiOutlineCurrencyDollar}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Travel Style</label>
                <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none">
                  <option value="balanced">Balanced (Mix of everything)</option>
                  <option value="cultural">Cultural & Historical</option>
                  <option value="relaxing">Relaxing & Leisure</option>
                  <option value="adventure">Action & Adventure</option>
                  <option value="foodie">Food & Culinary</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Any special requests?</label>
                <textarea
                  rows={3}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                  placeholder="e.g. Vegetarian food only, no early mornings..."
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 rounded-xl transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isGenerating ? (
                  <>
                    <HiOutlineSparkles className="animate-spin h-5 w-5 mr-2" />
                    Crafting Magic...
                  </>
                ) : (
                  <>
                    <HiOutlineSparkles className="h-5 w-5 mr-2" />
                    Generate Itinerary
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Output Area */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`h-full min-h-[500px] glass-card p-6 flex flex-col ${!result && !isGenerating ? 'items-center justify-center text-center' : ''}`}
          >
            {!result && !isGenerating && (
              <div className="text-slate-500 max-w-sm mx-auto">
                <div className="text-6xl mb-4">🪄</div>
                <h3 className="text-xl font-medium text-slate-300 mb-2">Ready to plan</h3>
                <p>Fill out the details on the left and let our AI create the perfect itinerary for you.</p>
              </div>
            )}

            {isGenerating && (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin" />
                  <div className="absolute inset-2 border-r-4 border-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                  <div className="absolute inset-4 border-b-4 border-emerald-500 rounded-full animate-spin" style={{ animationDuration: '2s' }} />
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                  Analyzing millions of possibilities...
                </h3>
                <p className="text-slate-400 mt-2">Optimizing routes and checking local insights.</p>
              </div>
            )}

            {result && !isGenerating && (
              <div className="space-y-6 animate-in fade-in duration-700">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-2xl font-bold text-white">{result.title}</h2>
                  <button className="px-4 py-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 rounded-lg text-sm font-medium transition-colors border border-blue-500/30">
                    Save Trip
                  </button>
                </div>

                <div className="space-y-6">
                  {result.days.map((day) => (
                    <div key={day.day} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-white/10 last:before:hidden">
                      <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-400">
                        {day.day}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-3">{day.title}</h3>
                      <div className="space-y-3">
                        {day.activities.map((activity, idx) => (
                          <div key={idx} className="bg-white/5 border border-white/5 rounded-lg p-3 text-slate-300">
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

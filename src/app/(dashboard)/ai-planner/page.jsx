"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiOutlineCurrencyDollar,
  HiOutlinePaperAirplane,
  HiOutlineSave,
  HiOutlineUser,
} from "react-icons/hi";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import api from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AIPlannerPage() {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [formMeta, setFormMeta] = useState({ destination: "", duration: 0, budget: 0 });

  // Chat state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isRefining]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      destination: formData.get("destination"),
      duration: Number(formData.get("duration")),
      budget: Number(formData.get("budget")),
      travelStyle: formData.get("travelStyle"),
      specialRequests: formData.get("specialRequests"),
    };

    setIsGenerating(true);
    setItinerary(null);
    setChatMessages([]);

    try {
      const res = await api.post("/ai/plan", data);
      setItinerary(res.data.data);
      setFormMeta({ destination: data.destination, duration: data.duration, budget: data.budget });
      setChatMessages([
        { id: 1, role: "ai", content: "Here's your itinerary! Want to tweak anything? Tell me what to change and I'll update it." },
      ]);
      setShowModal(true);
    } catch (err) {
      toast.error(err.message || "Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isRefining || !itinerary) return;

    const userMsg = { id: Date.now(), role: "user", content: chatInput };
    setChatMessages((prev) => [...prev, userMsg]);
    const instructions = chatInput;
    setChatInput("");
    setIsRefining(true);

    try {
      const res = await api.post("/ai/refine", { itinerary, instructions });
      setItinerary(res.data.data);
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", content: "Done! I've updated the itinerary. Check it out above." },
      ]);
    } catch (err) {
      toast.error(err.message || "Failed to refine itinerary.");
      setChatMessages((prev) => [
        ...prev,
        { id: Date.now(), role: "ai", content: "Sorry, I couldn't process that change. Please try again." },
      ]);
    } finally {
      setIsRefining(false);
    }
  };

  const handleSave = async () => {
    if (!itinerary) return;
    setIsSaving(true);

    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + formMeta.duration);

    try {
      await api.post("/trips", {
        title: itinerary.title,
        destination: formMeta.destination,
        startDate: today.toISOString(),
        endDate: endDate.toISOString(),
        budget: formMeta.budget,
        itinerary: itinerary.days,
      });
      toast.success("Trip saved successfully!");
      setShowModal(false);
      router.push("/my-trips");
    } catch (err) {
      toast.error(err.message || "Failed to save trip.");
    } finally {
      setIsSaving(false);
    }
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
                name="destination"
                label="Where do you want to go?"
                placeholder="e.g. Kyoto, Japan"
                icon={HiOutlineLocationMarker}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="duration"
                  name="duration"
                  label="Duration (days)"
                  type="number"
                  placeholder="7"
                  icon={HiOutlineCalendar}
                  required
                />
                <Input
                  id="budget"
                  name="budget"
                  label="Budget ($)"
                  type="number"
                  placeholder="2000"
                  icon={HiOutlineCurrencyDollar}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Travel Style</label>
                <select name="travelStyle" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none">
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
                  name="specialRequests"
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

        {/* Output Area — placeholder only */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-full min-h-[500px] glass-card p-6 flex flex-col items-center justify-center text-center"
          >
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-24 h-24 mb-8">
                  <div className="absolute inset-0 border-t-4 border-purple-500 rounded-full animate-spin" />
                  <div className="absolute inset-2 border-r-4 border-blue-500 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                  <div className="absolute inset-4 border-b-4 border-emerald-500 rounded-full animate-spin" style={{ animationDuration: "2s" }} />
                </div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse">
                  Analyzing millions of possibilities...
                </h3>
                <p className="text-slate-400 mt-2">Optimizing routes and checking local insights.</p>
              </div>
            ) : (
              <div className="text-slate-500 max-w-sm mx-auto">
                <div className="text-6xl mb-4">🪄</div>
                <h3 className="text-xl font-medium text-slate-300 mb-2">Ready to plan</h3>
                <p>Fill out the details on the left and let our AI create the perfect itinerary for you.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Itinerary Modal */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title={itinerary?.title} maxWidth="max-w-5xl">
        {itinerary && (
          <div className="flex flex-col gap-6">
            {/* Itinerary Timeline */}
            <div className="space-y-6">
              {itinerary.days?.map((day) => (
                <div key={day.day} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-white/10 last:before:hidden">
                  <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-xs font-bold text-purple-400">
                    {day.day}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{day.title}</h3>
                  <div className="space-y-2">
                    {day.activities?.map((activity, idx) => (
                      <div key={idx} className="bg-white/5 border border-white/5 rounded-lg p-3 text-slate-300 text-sm">
                        {activity}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Chat to Tweak */}
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tweak your itinerary</h3>
              <div className="max-h-48 overflow-y-auto space-y-3 mb-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${msg.role === "user" ? "ml-2 bg-blue-600" : "mr-2 bg-purple-600"}`}>
                        {msg.role === "user" ? <HiOutlineUser className="h-3.5 w-3.5 text-white" /> : <span className="text-xs">✨</span>}
                      </div>
                      <div className={`px-3 py-2 rounded-xl text-sm ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-none" : "bg-slate-800 border border-white/10 text-slate-200 rounded-tl-none"}`}>
                        {msg.content}
                      </div>
                    </div>
                  </div>
                ))}
                {isRefining && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800 border border-white/10">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleRefine} className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="e.g. Make Day 2 more relaxed, add a food market visit..."
                  disabled={isRefining}
                  className="flex-1 bg-slate-800 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!chatInput.trim() || isRefining}
                  className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                >
                  <HiOutlinePaperAirplane className="h-4 w-4 transform rotate-90" />
                </button>
              </form>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSave}
                disabled={isSaving || isRefining}
                className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlineSave className="h-5 w-5" />
                {isSaving ? "Saving..." : "Save Trip"}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

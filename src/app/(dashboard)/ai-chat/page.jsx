"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlinePaperAirplane, HiOutlineSparkles, HiOutlineUser } from "react-icons/hi";
import api from "@/lib/api";
import { toast } from "sonner";

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, role: "ai", content: "Hi there! I'm your VoyageAI assistant. I can help you find flights, recommend local restaurants, or answer any questions about your upcoming trips. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Store current input to send, then clear
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    try {
      // Map UI history to backend expected format
      const historyToSend = messages.map(msg => ({
        role: msg.role === "ai" ? "model" : "user",
        content: msg.content
      }));

      const res = await api.post("/ai/chat", { 
        message: currentInput, 
        history: historyToSend 
      });

      setMessages(prev => [
        ...prev, 
        { id: Date.now(), role: "ai", content: res.data.data.reply }
      ]);
    } catch (err) {
      toast.error(err.message || "Failed to get AI response.");
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white flex items-center">
          <HiOutlineSparkles className="mr-3 text-purple-400" />
          AI Travel Assistant
        </h1>
        <p className="text-slate-400 mt-1">Ask anything about your destinations, itineraries, or travel tips.</p>
      </div>

      {/* Chat Container */}
      <div className="flex-1 glass-card overflow-hidden flex flex-col relative">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 hide-scrollbar">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex max-w-[80%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                  msg.role === "user" ? "ml-3 bg-blue-600" : "mr-3 bg-purple-600"
                }`}>
                  {msg.role === "user" ? <HiOutlineUser className="h-5 w-5 text-white" /> : <span className="text-sm">✨</span>}
                </div>

                {/* Bubble */}
                <div className={`px-4 py-3 rounded-2xl ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(37,99,235,0.3)]" 
                    : "bg-slate-800/80 border border-white/10 text-slate-200 rounded-tl-none shadow-lg"
                }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="flex max-w-[80%] flex-row">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center mr-3">
                  <span className="text-sm">✨</span>
                </div>
                <div className="px-5 py-4 rounded-2xl bg-slate-800/80 border border-white/10 rounded-tl-none shadow-lg flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-slate-900/80 border-t border-white/10 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your trip to Japan..."
              className="w-full bg-slate-800 border border-white/10 rounded-full pl-5 pr-14 py-3.5 text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 p-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_10px_rgba(168,85,247,0.4)]"
            >
              <HiOutlinePaperAirplane className="h-5 w-5 transform rotate-90" />
            </button>
          </form>
          <div className="mt-2 text-center">
            <p className="text-xs text-slate-500">VoyageAI can make mistakes. Consider verifying important travel info.</p>
          </div>
        </div>

      </div>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useState } from "react";

export default function TripCard({ trip }) {
  const [isSaved, setIsSaved] = useState(trip.saved || false);

  const toggleSave = (e) => {
    e.preventDefault();
    setIsSaved(!isSaved);
  };

  return (
    <Link href={`/dashboard/trips/${trip.id}`} className="group block">
      <div className="glass-card overflow-hidden hover:ring-1 hover:ring-blue-500/50 transition-all h-full flex flex-col relative">
        
        {/* Save Button */}
        <button 
          onClick={toggleSave}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md hover:bg-black/60 transition-colors border border-white/10"
        >
          {isSaved ? (
            <HiHeart className="h-5 w-5 text-red-500" />
          ) : (
            <HiOutlineHeart className="h-5 w-5 text-white" />
          )}
        </button>

        <div className="relative h-48 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-slate-800 animate-pulse" />
          <Image
            src={trip.image}
            alt={trip.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute bottom-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
              trip.status === "Upcoming" 
                ? "bg-blue-600/90 text-white" 
                : trip.status === "Completed"
                ? "bg-emerald-600/90 text-white"
                : "bg-slate-600/90 text-white"
            }`}>
              {trip.status}
            </span>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
            {trip.title}
          </h3>
          
          <div className="flex items-center text-slate-400 text-sm mb-2">
            <HiOutlineLocationMarker className="mr-1.5 h-4 w-4" />
            {trip.destination}
          </div>
          
          <div className="flex items-center text-slate-400 text-sm mb-4">
            <HiOutlineCalendar className="mr-1.5 h-4 w-4" />
            {trip.dates}
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-slate-500">Budget:</span>{" "}
              <span className="text-white font-medium">${trip.budget}</span>
            </div>
            
            {trip.progress !== undefined && (
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: `${trip.progress}%` }} 
                  />
                </div>
                <span className="text-xs text-slate-400">{trip.progress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

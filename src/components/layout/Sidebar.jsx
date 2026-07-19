"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  HiOutlineHome, 
  HiOutlineMap, 
  HiOutlineHeart, 
  HiOutlinePlusCircle, 
  HiOutlineCollection,
  HiOutlineSparkles,
  HiOutlineChatAlt,
  HiOutlineUser
} from "react-icons/hi";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: HiOutlineHome },
    { name: "My Trips", href: "/my-trips", icon: HiOutlineMap },
    { name: "Saved Trips", href: "/saved-trips", icon: HiOutlineHeart },
    { name: "Add Destination", href: "/add-destination", icon: HiOutlinePlusCircle },
    { name: "Manage Destinations", href: "/manage-destinations", icon: HiOutlineCollection },
    { name: "AI Planner", href: "/ai-planner", icon: HiOutlineSparkles },
    { name: "AI Chat", href: "/ai-chat", icon: HiOutlineChatAlt },
    { name: "Profile", href: "/profile", icon: HiOutlineUser },
  ];

  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  return (
    <div className="w-64 flex-shrink-0 border-r border-white/10 bg-slate-900/50 backdrop-blur-md hidden md:flex flex-col h-[calc(100vh-80px)] sticky top-20">
      <div className="flex-1 overflow-y-auto py-6 hide-scrollbar">
        <nav className="px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${
                  isActive
                    ? "bg-blue-600/10 text-blue-400 border border-blue-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-blue-400" : "text-slate-500"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {/* Bottom User Area */}
      {user && (
        <div className="p-4 border-t border-white/10">
          <Link href="/profile" className="block">
            <div className="flex items-center px-4 py-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
              {user.avatarUrl ? (
                <div className="relative h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={user.avatarUrl} alt="Avatar" fill className="object-cover" />
                </div>
              ) : (
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {initials}
                </div>
              )}
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.plan ? `${user.plan} Plan` : user.email}</p>
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

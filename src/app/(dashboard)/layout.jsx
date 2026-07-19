"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 overflow-y-auto min-h-[calc(100vh-80px)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineUser, HiOutlineMail } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Input from "@/components/common/Input";
import ImageUpload from "@/components/common/ImageUpload";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: ""
    }
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || ""
      });
      setAvatarUrl(user.avatarUrl || "");
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await api.patch("/auth/profile", {
        ...data,
        avatarUrl,
      });
      updateUser(res.data.data);
      toast.success("Profile updated successfully");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to update profile");
    }
  };

  const initials = user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "U";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Nav */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center px-4 py-3 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-medium transition-colors">
            <HiOutlineUser className="mr-3 h-5 w-5" />
            General Information
          </button>
        </div>

        {/* Form Area */}
        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 md:p-8"
          >
            <h2 className="text-xl font-bold text-white mb-6">General Information</h2>
            
            {/* Avatar Section */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/10 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt="Avatar"
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="h-full w-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
                    {initials}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <ImageUpload
                  value={avatarUrl}
                  onChange={setAvatarUrl}
                  label=""
                />
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  id="name"
                  label="Full Name"
                  icon={HiOutlineUser}
                  {...register("name", { required: "Name is required" })}
                />
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  icon={HiOutlineMail}
                  {...register("email", { required: "Email is required" })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us a little bit about yourself..."
                  {...register("bio")}
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

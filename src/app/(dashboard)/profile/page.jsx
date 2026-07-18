"use client";

import { motion } from "framer-motion";
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineBell } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Input from "@/components/common/Input";
import { toast } from "sonner";

export default function ProfilePage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
    }
  });

  const onSubmit = async (data) => {
    try {
      await new Promise(r => setTimeout(r, 1000));
      console.log("Profile updated", data);
      toast.success("Profile updated successfully");
    } catch (e) {
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Nav (could be separated later) */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center px-4 py-3 bg-blue-600/10 text-blue-400 border border-blue-500/20 rounded-xl text-sm font-medium transition-colors">
            <HiOutlineUser className="mr-3 h-5 w-5" />
            General Information
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white border border-transparent rounded-xl text-sm font-medium transition-colors">
            <HiOutlineLockClosed className="mr-3 h-5 w-5" />
            Security & Password
          </button>
          <button className="w-full flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white border border-transparent rounded-xl text-sm font-medium transition-colors">
            <HiOutlineBell className="mr-3 h-5 w-5" />
            Notifications
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
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]">
                JD
              </div>
              <div>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium transition-colors border border-white/5 mb-2 block">
                  Change Avatar
                </button>
                <p className="text-xs text-slate-400">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <Input
                  id="name"
                  label="Full Name"
                  icon={HiOutlineUser}
                  {...register("name")}
                />
                <Input
                  id="email"
                  label="Email Address"
                  type="email"
                  icon={HiOutlineMail}
                  {...register("email")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                <textarea
                  rows={4}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us a little bit about yourself..."
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

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";
import { toast } from "sonner";
import Input from "@/components/common/Input";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      toast.error(error.message || "Failed to create account. Please try again.");
    }
  };


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 glass-card p-8 md:p-10 relative z-10"
      >
        <div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-white">
            Create an account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-400 hover:text-blue-300 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-5">
            <Input
              id="name"
              label="Full Name"
              type="text"
              icon={HiOutlineUser}
              placeholder="John Doe"
              autoComplete="name"
              {...register("name")}
              error={errors.name}
            />

            <Input
              id="email"
              label="Email Address"
              type="email"
              icon={HiOutlineMail}
              placeholder="you@example.com"
              autoComplete="email"
              {...register("email")}
              error={errors.email}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              icon={HiOutlineLockClosed}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("password")}
              error={errors.password}
            />

            <Input
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              icon={HiOutlineLockClosed}
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("confirmPassword")}
              error={errors.confirmPassword}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:shadow-[0_0_25px_rgba(37,99,235,0.6)]"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </div>
          
          <div className="text-center">
             <p className="text-xs text-slate-500">
               By signing up, you agree to our <a href="#" className="text-slate-400 hover:text-white underline">Terms of Service</a> and <a href="#" className="text-slate-400 hover:text-white underline">Privacy Policy</a>.
             </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

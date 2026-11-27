"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/Field";
import Button from "@/components/ui/Button";
import AuthFrame, { safeNext } from "@/components/auth/AuthFrame";

const loginSchema = z.object({
  email: z.string().email("Enter the email you signed up with."),
  password: z.string().min(1, "Enter your password."),
});

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const { login, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [user, loading, router, next]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      await login({ email: data.email, password: data.password });
      toast.success("Signed in.");
      router.push(next);
    } catch (error) {
      toast.error(error.message || "That email and password don’t match.");
    }
  };

  const registerHref = params.get("next") ? `/register?next=${encodeURIComponent(next)}` : "/register";

  return (
    <AuthFrame
      title="Sign in"
      intro={
        <p>
          New here?{" "}
          <Link href={registerHref} className="ink-link font-semibold text-ink">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input id="email" label="Email" type="email" autoComplete="email" {...register("email")} error={errors.email} />
        <Input
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          error={errors.password}
        />
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          {isSubmitting ? "Signing in" : "Sign in"}
        </Button>
      </form>
    </AuthFrame>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

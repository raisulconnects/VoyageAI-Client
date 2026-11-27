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

const registerSchema = z
  .object({
    name: z.string().min(2, "Use at least 2 characters."),
    email: z.string().email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The two passwords don’t match.",
    path: ["confirmPassword"],
  });

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = safeNext(params.get("next"));
  const { register: registerUser, user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) router.replace(next);
  }, [user, loading, router, next]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data) => {
    try {
      await registerUser({ name: data.name, email: data.email, password: data.password });
      toast.success("Account created.");
      router.push(next);
    } catch (error) {
      toast.error(error.message || "Couldn’t create the account. Try again.");
    }
  };

  const loginHref = params.get("next") ? `/login?next=${encodeURIComponent(next)}` : "/login";
  const continuing = next.startsWith("/ai-planner");

  return (
    <AuthFrame
      title="Create an account"
      intro={
        <>
          {continuing && <p className="mb-2 font-semibold text-ink">Your trip details will carry over to the planner.</p>}
          <p>
            Already have one?{" "}
            <Link href={loginHref} className="ink-link font-semibold text-ink">
              Sign in
            </Link>
          </p>
        </>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input id="name" label="Name" autoComplete="name" {...register("name")} error={errors.name} />
        <Input id="email" label="Email" type="email" autoComplete="email" {...register("email")} error={errors.email} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            hint={errors.password ? undefined : "8 characters or more"}
            {...register("password")}
            error={errors.password}
          />
          <Input
            id="confirmPassword"
            label="Repeat password"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
          />
        </div>
        <Button type="submit" size="lg" className="w-full" loading={isSubmitting}>
          {isSubmitting ? "Creating account" : "Create account"}
        </Button>
        <p className="text-sm text-muted">
          By creating an account you agree to the{" "}
          <Link href="/terms" className="ink-link text-ink-soft">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="ink-link text-ink-soft">
            privacy policy
          </Link>
          .
        </p>
      </form>
    </AuthFrame>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterForm />
    </Suspense>
  );
}

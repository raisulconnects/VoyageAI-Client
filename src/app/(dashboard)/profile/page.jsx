"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { formatDate } from "@/lib/format";
import PageHeader from "@/components/ui/PageHeader";
import { Input, Textarea } from "@/components/ui/Field";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import { Avatar } from "@/components/layout/Navbar";

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [avatarDraft, setAvatarDraft] = useState(null);
  const avatarUrl = avatarDraft ?? user?.avatarUrl ?? "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ defaultValues: { name: "", email: "", bio: "" } });

  useEffect(() => {
    if (user) {
      reset({ name: user.name || "", email: user.email || "", bio: user.bio || "" });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const res = await api.patch("/auth/profile", { ...data, avatarUrl });
      updateUser(res.data.data);
      setAvatarDraft(null);
      toast.success("Profile saved.");
    } catch (e) {
      toast.error(e.response?.data?.message || e.message || "Couldn’t save your profile. Try again.");
    }
  };

  const avatarChanged = (user?.avatarUrl || "") !== avatarUrl;

  return (
    <div>
      <PageHeader title="Profile" description="How you appear in VoyageAI, and the email you sign in with." />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <div>
          <div className="flex items-center gap-4 lg:block">
            <Avatar user={{ ...user, avatarUrl }} size={96} className="!border-ink" />
            <div className="lg:mt-4">
              <p className="display text-[1.8rem] leading-none">{user?.name}</p>
              {user?.createdAt && <p className="mt-1 text-sm text-muted">Member since {formatDate(user.createdAt, { month: "long", year: "numeric" })}</p>}
            </div>
          </div>
          <div className="mt-6">
            <ImageUpload value={avatarUrl} onChange={setAvatarDraft} label="Photo" compact />
          </div>
        </div>

        <div className="max-w-xl space-y-6">
          <Input label="Name" autoComplete="name" {...register("name", { required: "Your name can’t be empty." })} error={errors.name} />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            hint="You’ll sign in with this address."
            {...register("email", { required: "Your email can’t be empty." })}
            error={errors.email}
          />
          <Textarea label="About you" optional rows={4} placeholder="Where you like to go and how you like to travel" {...register("bio")} />
          <div className="flex items-center gap-4 border-t-[3px] border-ink pt-5">
            <Button type="submit" size="lg" loading={isSubmitting} disabled={!isDirty && !avatarChanged}>
              {isSubmitting ? "Saving" : "Save profile"}
            </Button>
            {!isDirty && !avatarChanged && <span className="text-sm text-muted">No unsaved changes</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

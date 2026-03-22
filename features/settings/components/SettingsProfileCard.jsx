"use client";

import { useEffect } from "react";
import { UserRound, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateProfileSchema } from "../schemas/settings.schema";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function SettingsProfileCard({ profile }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const updateProfileMutation = useUpdateProfile();

  useEffect(() => {
    if (profile) {
      reset({
        name: profile?.name || "",
        email: profile?.email || "",
      });
    }
  }, [profile, reset]);

  const onSubmit = async (values) => {
    try {
      const response = await updateProfileMutation.mutateAsync(values);

      reset(values);

      toast.success(response?.message || "Profile updated successfully.");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update profile.",
      );
    }
  };

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-2xl bg-[#eef4ff] p-3">
          <UserRound className="h-6 w-6 text-[#4f7df3]" />
        </div>

        <div>
          <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#111827]">
            Profile Information
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Update your personal details such as name and email address.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Full Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="h-[48px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#111827] outline-none transition focus:border-[#cbd5e1]"
              placeholder="Enter your full name"
            />
            {errors.name ? (
              <p className="mt-2 text-xs text-[#dc2626]">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="h-[48px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#111827] outline-none transition focus:border-[#cbd5e1]"
              placeholder="Enter your email"
            />
            {errors.email ? (
              <p className="mt-2 text-xs text-[#dc2626]">
                {errors.email.message}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateProfileMutation.isPending || !isDirty}
            className="inline-flex h-[46px] items-center gap-2 rounded-xl bg-[#4f7df3] px-5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] transition hover:bg-[#3e6ee8] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={16} />
            {updateProfileMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

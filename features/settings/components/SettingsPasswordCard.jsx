"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updatePasswordSchema } from "../schemas/settings.schema";
import { useUpdatePassword } from "../hooks/useUpdatePassword";

function PasswordInput({
  label,
  placeholder,
  error,
  visible,
  onToggle,
  registration,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[#374151]">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          {...registration}
          placeholder={placeholder}
          className="h-[48px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 pr-12 text-sm text-[#111827] outline-none transition focus:border-[#cbd5e1]"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] transition hover:text-[#4b5563]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error ? <p className="mt-2 text-xs text-[#dc2626]">{error}</p> : null}
    </div>
  );
}

export default function SettingsPasswordCard() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const updatePasswordMutation = useUpdatePassword();

  const onSubmit = async (values) => {
    try {
      const response = await updatePasswordMutation.mutateAsync(values);

      reset();

      toast.success(
        response?.message ||
          "Password updated successfully. Please login again.",
      );
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update password.",
      );
    }
  };

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="mb-6 flex items-start gap-4">
        <div className="rounded-2xl bg-[#eefbf3] p-3">
          <KeyRound className="h-6 w-6 text-[#16a34a]" />
        </div>

        <div>
          <h2 className="text-[22px] font-bold tracking-[-0.02em] text-[#111827]">
            Change Password
          </h2>
          <p className="mt-1 text-sm text-[#6b7280]">
            Keep your account secure by using a strong and unique password.
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-2xl border border-[#e5e7eb] bg-[#f9fafb] p-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-[#16a34a]" />
          <div>
            <p className="text-sm font-semibold text-[#111827]">
              Security note
            </p>
            <p className="mt-1 text-sm leading-6 text-[#6b7280]">
              After changing your password, old sessions may no longer remain
              valid. Which is good. Chaos, but secure chaos.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PasswordInput
          label="Current Password"
          placeholder="Enter your current password"
          visible={showCurrentPassword}
          onToggle={() => setShowCurrentPassword((prev) => !prev)}
          registration={register("currentPassword")}
          error={errors.currentPassword?.message}
        />

        <div className="grid gap-5 md:grid-cols-2">
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            visible={showNewPassword}
            onToggle={() => setShowNewPassword((prev) => !prev)}
            registration={register("newPassword")}
            error={errors.newPassword?.message}
          />

          <PasswordInput
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            visible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((prev) => !prev)}
            registration={register("confirmNewPassword")}
            error={errors.confirmNewPassword?.message}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updatePasswordMutation.isPending || !isDirty}
            className="inline-flex h-[46px] items-center gap-2 rounded-xl bg-[#111827] px-5 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {updatePasswordMutation.isPending
              ? "Updating..."
              : "Update Password"}
          </button>
        </div>
      </form>
    </div>
  );
}

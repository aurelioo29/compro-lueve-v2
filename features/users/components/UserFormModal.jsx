"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DashboardModal from "@/app/components/ui/DashboardModal";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { useCreateUser } from "../hooks/useCreateUser";
import { useRoles } from "../hooks/useRoles";
import { Eye, EyeOff, RefreshCcw } from "lucide-react";

function generatePassword(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
  let password = "";

  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return password;
}

export default function UserFormModal({ open, onClose, item = null }) {
  const isEdit = !!item;

  const { data: rolesData } = useRoles();
  const roles = rolesData?.data || [];

  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const isPending = isCreating || isUpdating;

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        name: item?.name || "",
        email: item?.email || "",
        password: "",
        roleId: item?.role?.id || item?.roleId || "",
        isActive: item?.isActive ?? true,
      });
    }
  }, [item, open, reset]);

  async function onSubmit(values) {
    if (isEdit) {
      await updateUser({
        id: item.id,
        payload: {
          name: values.name,
          email: values.email,
          roleId: values.roleId,
          isActive: values.isActive,
        },
      });
    } else {
      await createUser({
        name: values.name,
        email: values.email,
        password: values.password,
        roleId: values.roleId,
        isActive: values.isActive,
      });
    }

    onClose();
  }

  return (
    <DashboardModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Create User"}
      description="Manage user identity, role, and account status."
      size="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-[#374151]">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {!isEdit && (
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 pr-24 text-sm outline-none"
              />

              {/* 👁 toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-12 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#374151]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

              {/* 🔑 generate */}
              <button
                type="button"
                onClick={() => {
                  const newPass = generatePassword();
                  setValue("password", newPass);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#374151]"
              >
                <RefreshCcw size={18} />
              </button>
            </div>

            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Role
            </label>
            <select
              {...register("roleId")}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
            >
              <option value="">Select role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
            {errors.roleId && (
              <p className="mt-2 text-sm text-red-600">
                {errors.roleId.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-[#374151]">
              Status
            </label>
            <select
              {...register("isActive", {
                setValueAs: (value) => value === "true",
              })}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm outline-none"
            >
              <option value="true">ACTIVE</option>
              <option value="false">INACTIVE</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#eef0f4] pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151]"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
          >
            {isPending
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create User"}
          </button>
        </div>
      </form>
    </DashboardModal>
  );
}

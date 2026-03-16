"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth.schema";
import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const { mutate, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <div className="w-full max-w-[440px] rounded-[28px] border border-[#d9c9c2] bg-white/95 p-7 shadow-[0_20px_60px_rgba(94,39,39,0.08)] backdrop-blur-sm sm:p-9">
      <div className="mb-8 text-center">
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#9a6b6b]">
          Admin Access
        </p>

        <h1 className="font-minion-pro text-4xl text-[#7a1f1f] sm:text-[42px]">
          Welcome Back
        </h1>

        <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#8f7d7d]">
          Sign in to manage your dashboard, content, and internal workspace.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label
            htmlFor="identifier"
            className="mb-2 block text-[13px] font-medium tracking-[0.08em] text-[#6c4f4f]"
          >
            EMAIL OR USERNAME
          </label>

          <input
            id="identifier"
            type="text"
            placeholder="Enter your email or username"
            {...register("identifier")}
            className={`h-[52px] w-full rounded-2xl border bg-[#fffdfc] px-4 text-[15px] text-[#4d3a3a] outline-none transition placeholder:text-[#b7a6a6]
              ${
                errors.identifier
                  ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                  : "border-[#dbc9c2] focus:border-[#a43d3d] focus:ring-4 focus:ring-[#7a1f1f]/10"
              }`}
          />

          {errors.identifier && (
            <p className="mt-2 text-sm text-red-500">
              {errors.identifier.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-[13px] font-medium tracking-[0.08em] text-[#6c4f4f]"
          >
            PASSWORD
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className={`h-[52px] w-full rounded-2xl border bg-[#fffdfc] px-4 pr-12 text-[15px] text-[#4d3a3a] outline-none transition placeholder:text-[#b7a6a6]
                ${
                  errors.password
                    ? "border-red-300 focus:border-red-400 focus:ring-4 focus:ring-red-100"
                    : "border-[#dbc9c2] focus:border-[#a43d3d] focus:ring-4 focus:ring-[#7a1f1f]/10"
                }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9b8585] transition hover:text-[#7a1f1f]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-2 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-sm text-[#8a7777]">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-[#ccb7b7] text-[#7a1f1f] focus:ring-[#7a1f1f]/20"
            />
            Remember me
          </label>

          <button
            type="button"
            className="text-sm font-medium text-[#8e3a3a] transition hover:text-[#6f1d1d]"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-2 flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#7a1f1f] px-4 text-sm font-semibold tracking-[0.08em] text-white transition hover:bg-[#641818] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Signing In...
            </>
          ) : (
            "SIGN IN"
          )}
        </button>
      </form>
    </div>
  );
}

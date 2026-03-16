"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { publicWaResponseSchemaWithEmailValidation } from "../schemas/public-wa-response.schema";
import { useCreatePublicWaResponse } from "../hooks/useCreatePublicWaResponse";

export default function PublicWaResponseForm({ onSuccess = () => {} }) {
  const [submitError, setSubmitError] = useState("");

  const { mutateAsync, isPending } = useCreatePublicWaResponse();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(publicWaResponseSchemaWithEmailValidation),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const onSubmit = async (values) => {
    setSubmitError("");

    try {
      const payload = {
        fullName: values.fullName.trim(),
        phoneNumber: values.phoneNumber.trim(),
        email: values.email?.trim() || "",
      };

      await mutateAsync(payload);

      reset();
      onSuccess(); // close modal
    } catch (error) {
      setSubmitError(error?.message || "Failed to submit");
    }
  };

  return (
    <form
      className="mt-10 sm:mt-16 space-y-6 sm:space-y-10 w-full max-w-md sm:max-w-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="text-black font-poppins text-base sm:text-lg">
        <label htmlFor="fullName" className="block">
          Full name
        </label>
        <input
          type="text"
          id="fullName"
          autoComplete="name"
          placeholder="e.g., Alex Tan"
          {...register("fullName")}
          className="mt-2 sm:mt-3 w-full border-b-2 border-black bg-transparent focus:outline-none focus:border-black/80 py-2"
        />
        {errors.fullName && (
          <p className="mt-2 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div className="text-black font-poppins text-base sm:text-lg">
        <label htmlFor="phoneNumber" className="block">
          Phone / WhatsApp
        </label>
        <input
          type="tel"
          id="phoneNumber"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+62…"
          {...register("phoneNumber")}
          className="mt-2 sm:mt-3 w-full border-b-2 border-black bg-transparent focus:outline-none focus:border-black/80 py-2"
        />
        {errors.phoneNumber && (
          <p className="mt-2 text-sm text-red-600">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div className="text-black font-poppins text-base sm:text-lg">
        <label htmlFor="email" className="block">
          Email
        </label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="you@example.com"
          {...register("email")}
          className="mt-2 sm:mt-3 w-full border-b-2 border-black bg-transparent focus:outline-none focus:border-black/80 py-2"
        />
        {errors.email && (
          <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <button
        type="submit"
        className="mt-8 sm:mt-10 w-full rounded-md bg-[#C5C5C5] px-4 py-3 text-black font-poppins text-base sm:text-lg tracking-widest hover:bg-[#b5b5b5] transition disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}

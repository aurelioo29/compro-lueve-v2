"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createPublicWaResponseApi } from "../api/create-public-wa-response";

export function useCreatePublicWaResponse() {
  return useMutation({
    mutationFn: createPublicWaResponseApi,

    onSuccess: (data) => {
      toast.success(
        data?.message || "Your message has been sent successfully.",
      );
    },

    onError: (error) => {
      toast.error(error?.message || "Failed to send message.");
    },
  });
}

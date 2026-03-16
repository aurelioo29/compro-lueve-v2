"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateWaResponseApi } from "../api/update-wa-response";

export function useUpdateWaResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateWaResponseApi,
    onSuccess: (data, variables) => {
      toast.success(data?.message || "WA response updated successfully");

      queryClient.invalidateQueries({ queryKey: ["wa-responses"] });
      queryClient.invalidateQueries({
        queryKey: ["wa-response-detail", variables.id],
      });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to update WA response",
      );
    },
  });
}

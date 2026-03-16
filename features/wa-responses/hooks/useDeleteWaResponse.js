"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteWaResponseApi } from "../api/delete-wa-response";

export function useDeleteWaResponse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWaResponseApi,
    onSuccess: (data) => {
      toast.success(data?.message || "WA response deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["wa-responses"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete WA response",
      );
    },
  });
}

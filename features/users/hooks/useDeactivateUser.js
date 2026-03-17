"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deactivateUserApi } from "../api/deactivate-user";

export function useDeactivateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deactivateUserApi,
    onSuccess: (data) => {
      toast.success(data?.message || "User deactivated successfully");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to deactivate user",
      );
    },
  });
}

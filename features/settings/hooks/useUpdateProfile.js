"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfileApi } from "../api/update-profile";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings-profile"],
      });

      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}

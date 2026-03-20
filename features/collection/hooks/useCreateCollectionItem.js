"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollectionItemApi } from "../api/create-collection-item";

export function useCreateCollectionItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollectionItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-items"] });
    },
  });
}

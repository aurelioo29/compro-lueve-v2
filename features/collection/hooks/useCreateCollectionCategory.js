"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollectionCategoryApi } from "../api/create-collection-category";

export function useCreateCollectionCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCollectionCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-categories"] });
    },
  });
}

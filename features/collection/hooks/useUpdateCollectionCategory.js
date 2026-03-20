"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollectionCategoryApi } from "../api/update-collection-category";

export function useUpdateCollectionCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCollectionCategoryApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collection-categories"] });
      queryClient.invalidateQueries({
        queryKey: ["collection-category-detail", variables.id],
      });
    },
  });
}

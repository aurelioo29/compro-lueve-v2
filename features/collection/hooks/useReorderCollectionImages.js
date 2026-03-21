"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderCollectionImagesApi } from "../api/reorder-collection-images";

export function useReorderCollectionImages() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => reorderCollectionImagesApi(payload),
    onSuccess: (_, variables) => {
      if (variables?.itemId) {
        queryClient.invalidateQueries({
          queryKey: ["collection-item-detail", variables.itemId],
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["collection-items"],
      });
    },
  });
}

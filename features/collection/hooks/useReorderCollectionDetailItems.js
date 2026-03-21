"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderCollectionDetailItemsApi } from "../api/reorder-collection-detail-items";

export function useReorderCollectionDetailItems() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => reorderCollectionDetailItemsApi(payload),
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

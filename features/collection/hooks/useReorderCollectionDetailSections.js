"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reorderCollectionDetailSectionsApi } from "../api/reorder-collection-detail-sections";

export function useReorderCollectionDetailSections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload }) => reorderCollectionDetailSectionsApi(payload),
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

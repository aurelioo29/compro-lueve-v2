"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollectionDetailItemApi } from "../api/update-collection-detail-item";

export function useUpdateCollectionDetailItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCollectionDetailItemApi(id, payload),
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

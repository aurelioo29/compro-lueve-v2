"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollectionDetailSectionApi } from "../api/update-collection-detail-section";

export function useUpdateCollectionDetailSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) =>
      updateCollectionDetailSectionApi(id, payload),
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

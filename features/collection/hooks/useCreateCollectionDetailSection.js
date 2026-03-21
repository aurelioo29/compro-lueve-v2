"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollectionDetailSectionApi } from "../api/create-collection-detail-section";

export function useCreateCollectionDetailSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, payload }) =>
      createCollectionDetailSectionApi(itemId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["collection-item-detail", variables.itemId],
      });
      queryClient.invalidateQueries({
        queryKey: ["collection-items"],
      });
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCollectionDetailItemApi } from "../api/create-collection-detail-item";

export function useCreateCollectionDetailItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, payload }) =>
      createCollectionDetailItemApi(sectionId, payload),
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
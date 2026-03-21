"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionDetailSectionApi } from "../api/delete-collection-detail-section";

export function useDeleteCollectionDetailSection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteCollectionDetailSectionApi(id),
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

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionDetailItemApi } from "../api/delete-collection-detail-item";

export function useDeleteCollectionDetailItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteCollectionDetailItemApi(id),
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

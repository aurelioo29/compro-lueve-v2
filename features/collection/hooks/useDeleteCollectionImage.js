"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionImageApi } from "../api/delete-collection-image";

export function useDeleteCollectionImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteCollectionImageApi(id),
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

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadCollectionImageApi } from "../api/upload-collection-image";

export function useUploadCollectionImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ itemId, payload }) =>
      uploadCollectionImageApi(itemId, payload),
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

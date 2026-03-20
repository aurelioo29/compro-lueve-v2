"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionItemApi } from "../api/delete-collection-item";

export function useDeleteCollectionItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollectionItemApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-items"] });
    },
  });
}

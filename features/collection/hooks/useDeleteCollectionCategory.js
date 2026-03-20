"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCollectionCategoryApi } from "../api/delete-collection-category";

export function useDeleteCollectionCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCollectionCategoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["collection-categories"] });
    },
  });
}

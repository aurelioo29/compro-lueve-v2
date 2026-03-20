"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCollectionItemApi } from "../api/update-collection-item";

export function useUpdateCollectionItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateCollectionItemApi(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collection-items"] });
      queryClient.invalidateQueries({
        queryKey: ["collection-item-detail", variables.id],
      });
    },
  });
}

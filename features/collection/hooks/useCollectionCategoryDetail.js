"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollectionCategoryDetailApi } from "../api/get-collection-category-detail";

export function useCollectionCategoryDetail(id, enabled = true) {
  return useQuery({
    queryKey: ["collection-category-detail", id],
    queryFn: () => getCollectionCategoryDetailApi(id),
    enabled: !!id && enabled,
  });
}

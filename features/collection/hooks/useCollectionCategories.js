"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollectionCategoriesApi } from "../api/get-collection-categories";

export function useCollectionCategories(params = {}) {
  return useQuery({
    queryKey: ["collection-categories", params],
    queryFn: () => getCollectionCategoriesApi(params),
  });
}

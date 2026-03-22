"use client";

import { useQuery } from "@tanstack/react-query";
import { getPublicCollectionTreeApi } from "../api/get-public-collection-tree";

export function usePublicCollectionTree() {
  return useQuery({
    queryKey: ["public-collection-tree"],
    queryFn: getPublicCollectionTreeApi,
  });
}

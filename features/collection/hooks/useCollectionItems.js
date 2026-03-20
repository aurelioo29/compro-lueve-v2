"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollectionItemsApi } from "../api/get-collection-items";

export function useCollectionItems(params = {}) {
  return useQuery({
    queryKey: ["collection-items", params],
    queryFn: () => getCollectionItemsApi(params),
  });
}

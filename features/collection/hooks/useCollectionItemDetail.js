"use client";

import { useQuery } from "@tanstack/react-query";
import { getCollectionItemDetailApi } from "../api/get-collection-item-detail";

export function useCollectionItemDetail(id, enabled = true) {
  return useQuery({
    queryKey: ["collection-item-detail", id],
    queryFn: () => getCollectionItemDetailApi(id),
    enabled: !!id && enabled,
  });
}

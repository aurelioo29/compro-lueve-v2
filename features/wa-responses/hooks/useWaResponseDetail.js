"use client";

import { useQuery } from "@tanstack/react-query";
import { getWaResponseDetailApi } from "../api/get-wa-response-detail";

export function useWaResponseDetail(id, enabled = true) {
  return useQuery({
    queryKey: ["wa-response-detail", id],
    queryFn: () => getWaResponseDetailApi(id),
    enabled: !!id && enabled,
  });
}

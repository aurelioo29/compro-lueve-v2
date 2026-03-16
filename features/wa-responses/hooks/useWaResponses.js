"use client";

import { useQuery } from "@tanstack/react-query";
import { getWaResponsesApi } from "../api/get-wa-responses";

export function useWaResponses(params) {
  return useQuery({
    queryKey: ["wa-responses", params],
    queryFn: () => getWaResponsesApi(params),
    keepPreviousData: true,
  });
}

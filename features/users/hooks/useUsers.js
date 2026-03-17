"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsersApi } from "../api/get-users";

export function useUsers(params) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsersApi(params),
    keepPreviousData: true,
  });
}

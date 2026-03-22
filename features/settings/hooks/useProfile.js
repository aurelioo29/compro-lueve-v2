"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileApi } from "../api/get-profile";

export function useProfile() {
  return useQuery({
    queryKey: ["settings-profile"],
    queryFn: getProfileApi,
  });
}

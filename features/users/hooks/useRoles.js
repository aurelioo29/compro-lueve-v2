"use client";

import { useQuery } from "@tanstack/react-query";
import { getRolesApi } from "../api/get-roles";

export function useRoles() {
  return useQuery({
    queryKey: ["user-roles"],
    queryFn: getRolesApi,
  });
}

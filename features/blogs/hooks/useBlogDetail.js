"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogDetailApi } from "../api/get-blog-detail";

export function useBlogDetail(id, enabled = true) {
  return useQuery({
    queryKey: ["blog-detail", id],
    queryFn: () => getBlogDetailApi(id),
    enabled: !!id && enabled,
  });
}

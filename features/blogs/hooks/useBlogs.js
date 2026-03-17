"use client";

import { useQuery } from "@tanstack/react-query";
import { getBlogsApi } from "../api/get-blogs";

export function useBlogs(params) {
  return useQuery({
    queryKey: ["blogs", params],
    queryFn: () => getBlogsApi(params),
    keepPreviousData: true,
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBlogApi } from "../api/create-blog";

export function useCreateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlogApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Blog created successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create blog");
    },
  });
}

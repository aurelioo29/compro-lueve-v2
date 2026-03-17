"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateBlogApi } from "../api/update-blog";

export function useUpdateBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBlogApi,
    onSuccess: (data, variables) => {
      toast.success(data?.message || "Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({
        queryKey: ["blog-detail", variables.id],
      });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to update blog");
    },
  });
}

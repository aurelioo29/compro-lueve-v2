"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteBlogApi } from "../api/delete-blog";

export function useDeleteBlog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlogApi,
    onSuccess: (data) => {
      toast.success(data?.message || "Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to delete blog");
    },
  });
}

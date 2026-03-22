"use client";

import { useMutation } from "@tanstack/react-query";
import { updatePasswordApi } from "../api/update-password";

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updatePasswordApi,
  });
}

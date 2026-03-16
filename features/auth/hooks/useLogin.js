"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import { loginApi } from "../api/login";
import { useAuthStore } from "../store/auth-store";

export function useLogin() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      const authData = response?.data;

      if (
        !authData?.accessToken ||
        !authData?.refreshToken ||
        !authData?.user
      ) {
        toast.error("Response login backend tidak lengkap");
        return;
      }

      setAuth({
        user: authData.user,
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
      });

      toast.success(response?.message || "Login berhasil");
      router.push(`/${locale}/dashboard`);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        "Login gagal. Cek email dan password.";
      toast.error(message);
    },
  });
}

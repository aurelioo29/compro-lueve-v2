"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { meApi } from "../api/me";
import { useAuthStore } from "../store/auth-store";

export function useAuthBootstrap() {
  const router = useRouter();
  const pathname = usePathname();

  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const isBootstrapping = useAuthStore((state) => state.isBootstrapping);

  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;

    const locale = pathname?.startsWith("/id") ? "id" : "en";

    // kalau tidak ada token sama sekali, keluar
    if (!accessToken && !refreshToken) {
      router.replace(`/${locale}/login`);
      return;
    }

    // cegah bootstrap berulang terus
    if (hasStartedRef.current || isBootstrapping) return;
    hasStartedRef.current = true;

    const bootstrap = async () => {
      try {
        useAuthStore.getState().setBootstrapping(true);

        const response = await meApi();
        const user = response?.data;

        if (!user) {
          throw new Error("User dari /auth/me tidak ditemukan");
        }

        useAuthStore.getState().setUser(user);
      } catch (error) {
        console.error("Bootstrap auth gagal:", error);
      } finally {
        useAuthStore.getState().setBootstrapping(false);
      }
    };

    bootstrap();
  }, [
    accessToken,
    refreshToken,
    hasHydrated,
    isBootstrapping,
    pathname,
    router,
  ]);
}

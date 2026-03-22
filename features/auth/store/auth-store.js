"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hasHydrated: false,
      isBootstrapping: false,

      setAuth: ({ user, accessToken, refreshToken }) =>
        set({
          user,
          accessToken,
          refreshToken,
          isAuthenticated: true,
        }),

      setUser: (user) =>
        set({
          user,
          isAuthenticated: true,
        }),

      setBootstrapping: (value) =>
        set({
          isBootstrapping: value,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isBootstrapping: false,
        }),

      setHasHydrated: (value) =>
        set({
          hasHydrated: value,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(true);
      },
    },
  ),
);

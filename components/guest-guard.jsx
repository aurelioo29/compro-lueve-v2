"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { meApi } from "@/features/auth/api/me";

function GuestScreen({
  eyebrow = "Checking Session",
  title = "Preparing Login",
  description = "Please wait while we check whether you already have an active session.",
  badgeText = "Checking...",
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6">
      <div className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-[#e5e7eb] bg-white p-7 shadow-sm sm:p-9">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#e5e7eb] bg-[#fafafa]">
            <ShieldCheck className="h-8 w-8 text-[#7a1f1f]" />
          </div>

          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#9ca3af]">
            {eyebrow}
          </p>

          <h2 className="text-3xl font-semibold text-[#111827] sm:text-[38px]">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-[320px] text-sm leading-6 text-[#6b7280]">
            {description}
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#e5e7eb] bg-[#fafafa] px-4 py-2 text-sm text-[#4b5563]">
            <Loader2 className="h-4 w-4 animate-spin text-[#7a1f1f]" />
            <span>{badgeText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GuestGuard({ children }) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const [isChecking, setIsChecking] = useState(true);
  const hasCheckedRef = useRef(false);

  useEffect(() => {
    if (!hasHydrated) return;
    if (hasCheckedRef.current) return;

    hasCheckedRef.current = true;

    const checkSession = async () => {
      // tidak ada token sama sekali -> tetap di login
      if (!accessToken && !refreshToken) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await meApi();
        const user = response?.data;

        if (user) {
          useAuthStore.getState().setUser(user);
          router.replace(`/${locale}/dashboard`);
          return;
        }

        setIsChecking(false);
      } catch (error) {
        console.error("Guest guard session check failed:", error);
        setIsChecking(false);
      }
    };

    checkSession();
  }, [hasHydrated, accessToken, refreshToken, locale, router]);

  if (!hasHydrated || isChecking) {
    return (
      <GuestScreen
        eyebrow="Checking Session"
        title="Preparing Login"
        description="Please wait while we check whether you already have an active session."
        badgeText="Checking..."
      />
    );
  }

  return children;
}

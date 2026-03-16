"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated || !accessToken) {
      router.replace(`/${locale}/login`);
    }
  }, [hasHydrated, isAuthenticated, accessToken, locale, router]);

  if (!hasHydrated) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fcf8f6_0%,#f7efeb_100%)] px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[12%] h-40 w-40 rounded-full bg-[#e9d6cf]/35 blur-3xl" />
          <div className="absolute bottom-[10%] right-[12%] h-52 w-52 rounded-full bg-[#f0dfd8]/45 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-56 w-56 -translate-x-1/2 rounded-full bg-[#f7ebe6]/70 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[440px] rounded-[28px] border border-[#d9c9c2] bg-white/95 p-7 shadow-[0_20px_60px_rgba(94,39,39,0.08)] backdrop-blur-sm sm:p-9">
          <div className="flex flex-col items-center text-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ead8d1] bg-[#fff7f4]">
              <ShieldCheck className="h-8 w-8 text-[#7a1f1f]" />
            </div>

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#9a6b6b]">
              Secure Access
            </p>

            <h2 className="font-minion-pro text-4xl text-[#7a1f1f] sm:text-[42px]">
              Checking Auth
            </h2>

            <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#8f7d7d]">
              Please wait while we verify your session and prepare your
              dashboard access.
            </p>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#e4d4cd] bg-[#fffaf8] px-4 py-2 text-sm text-[#6c4f4f]">
              <Loader2 className="h-4 w-4 animate-spin text-[#8e3a3a]" />
              <span>Authenticating...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !accessToken) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#fcf8f6_0%,#f7efeb_100%)] px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[10%] top-[12%] h-40 w-40 rounded-full bg-[#e9d6cf]/35 blur-3xl" />
          <div className="absolute bottom-[10%] right-[12%] h-52 w-52 rounded-full bg-[#f0dfd8]/45 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[420px] rounded-[28px] border border-[#d9c9c2] bg-white/95 p-7 text-center shadow-[0_20px_60px_rgba(94,39,39,0.08)] backdrop-blur-sm sm:p-9">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#ead8d1] bg-[#fff7f4]">
            <ShieldCheck className="h-8 w-8 text-[#7a1f1f]" />
          </div>

          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.35em] text-[#9a6b6b]">
            Redirecting
          </p>

          <h2 className="font-minion-pro text-4xl text-[#7a1f1f] sm:text-[42px]">
            Session Required
          </h2>

          <p className="mx-auto mt-3 max-w-[300px] text-sm leading-6 text-[#8f7d7d]">
            Your session is unavailable or has expired. Redirecting you to the
            login page.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-[#e4d4cd] bg-[#fffaf8] px-4 py-2 text-sm text-[#6c4f4f]">
            <Loader2 className="h-4 w-4 animate-spin text-[#8e3a3a]" />
            <span>Redirecting...</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

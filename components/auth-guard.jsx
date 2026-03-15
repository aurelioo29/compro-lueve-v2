"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "en";

  const accessToken = useAuthStore((state) => state.accessToken);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      router.replace(`/${locale}/login`);
      return;
    }

    setReady(true);
  }, [isAuthenticated, accessToken, locale, router]);

  if (!ready) {
    return <div className="p-6">Checking auth...</div>;
  }

  return children;
}

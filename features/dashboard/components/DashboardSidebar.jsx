"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname, useRouter } from "next/navigation";
import { X, ChevronRight, LogOut } from "lucide-react";
import { toast } from "sonner";

import { useAuthStore } from "@/features/auth/store/auth-store";
import { filterNavByPermissions } from "@/features/auth/utils/permissions";
import axiosInstance from "@/lib/axios";
import {
  dashboardNavMain,
  dashboardNavBottom,
} from "../constants/dashboard-nav";

function isRouteActive(pathname, href) {
  if (!pathname || !href) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function buildLocalizedHref(locale, href) {
  if (!href) return "#";
  return `/${locale}${href}`;
}

async function logoutApi(refreshToken) {
  return axiosInstance.post("/auth/logout", { refreshToken });
}

function NavItem({
  item,
  locale,
  pathname,
  onNavigate,
  onLogoutClick,
  depth = 0,
}) {
  const Icon = item.icon || ChevronRight;
  const localizedHref = item.isLogout
    ? "#logout"
    : buildLocalizedHref(locale, item.href);

  const active = !item.isLogout && isRouteActive(pathname, localizedHref);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  if (item.isLogout) {
    return (
      <button
        type="button"
        onClick={onLogoutClick}
        className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-[#9f1239] transition hover:bg-[#fff1f4]"
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <Link
        href={localizedHref}
        onClick={onNavigate}
        className={[
          "flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition",
          depth > 0 ? "ml-1" : "",
          active
            ? "bg-[#7f1d1d] text-white shadow-[0_10px_30px_rgba(127,29,29,0.12)]"
            : "text-[#4f4a45] hover:bg-[#f8f1ec] hover:text-[#7a1f1f]",
        ].join(" ")}
      >
        <Icon size={18} />
        <span>{item.label}</span>
      </Link>

      {hasChildren && (
        <div className="ml-4 space-y-1 border-l border-[#eadfd7] pl-3">
          {item.children.map((child) => (
            <NavItem
              key={child.label}
              item={child}
              locale={locale}
              pathname={pathname}
              onNavigate={onNavigate}
              onLogoutClick={onLogoutClick}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DashboardSidebar({
  mobileOpen = false,
  onClose = () => {},
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = params?.locale || "en";

  const user = useAuthStore((state) => state.user);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const logout = useAuthStore((state) => state.logout);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const userPermissions = user?.permissions || [];

  const visibleMainNav = useMemo(() => {
    return filterNavByPermissions(dashboardNavMain, userPermissions);
  }, [userPermissions]);

  const visibleBottomNav = useMemo(() => {
    return filterNavByPermissions(dashboardNavBottom, userPermissions);
  }, [userPermissions]);

  const handleNavigate = () => {
    if (mobileOpen) onClose();
  };

  const handleOpenLogoutModal = () => {
    setShowLogoutConfirm(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const handleConfirmLogout = async () => {
    try {
      setIsLoggingOut(true);

      if (refreshToken) {
        await logoutApi(refreshToken);
      }

      toast.success("Logout berhasil");
    } catch (error) {
      console.error("Logout API error:", error);
      toast.error("Logout backend gagal, tapi sesi lokal tetap dibersihkan");
    } finally {
      logout();
      setShowLogoutConfirm(false);
      setIsLoggingOut(false);
      onClose?.();
      router.replace(`/${locale}/login`);
    }
  };

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed left-0 top-0 z-40 flex h-screen w-[280px] flex-col border bg-white transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        ].join(" ")}
      >
        <div className="relative flex h-[84px] items-center justify-center border-b border-[#e5e7eb] px-4 mt-2">
          <Link
            href={`/${locale}/dashboard`}
            onClick={handleNavigate}
            className="group relative z-10 flex min-w-0 items-center"
          >
            <div className="flex flex-col">
              <Image
                src="/images/logo/lueve-logo.svg"
                alt="LUEVE"
                width={90}
                height={28}
                className="h-24 w-auto"
                priority
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="relative z-10 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#e8ddd5] bg-white/80 text-[#6b5f58] transition hover:bg-[#f7f1ec] lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5">
          <div>
            <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a78b7a]">
              Main Menu
            </p>

            <nav className="space-y-2">
              {visibleMainNav.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  locale={locale}
                  pathname={pathname}
                  onNavigate={handleNavigate}
                  onLogoutClick={handleOpenLogoutModal}
                />
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-[#eee6df] px-4 py-4">
          <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.32em] text-[#a78b7a]">
            Preferences
          </p>

          <nav className="space-y-2">
            {visibleBottomNav.map((item) => (
              <NavItem
                key={item.label}
                item={item}
                locale={locale}
                pathname={pathname}
                onNavigate={handleNavigate}
                onLogoutClick={handleOpenLogoutModal}
              />
            ))}
          </nav>
        </div>
      </aside>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-[28px] border border-[#ead8d1] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-7">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#f3d7d7]">
              <LogOut className="h-6 w-6 text-[#b42318]" />
            </div>

            <div className="mt-5 text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#b07a7a]">
                Confirm Action
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-[#111827]">
                Logout from dashboard?
              </h3>

              <p className="mx-auto mt-3 max-w-[340px] text-sm leading-6 text-[#6b7280]">
                You will be signed out from this session and redirected to the
                login page.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCancelLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center rounded-2xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm font-semibold text-[#374151] transition hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center rounded-2xl bg-[#b42318] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#991b1b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoggingOut ? "Logging out..." : "Yes, Logout"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import {
  dashboardNavMain,
  dashboardNavBottom,
} from "../constants/dashboard-nav";
import { useAuthStore } from "@/features/auth/store/auth-store";
import { filterNavByPermissions } from "@/features/auth/utils/permissions";
import Image from "next/image";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SidebarNavSection({ items, locale, pathname, onClose, onLogout }) {
  const [openMenus, setOpenMenus] = useState(() => {
    const initialState = {};

    items.forEach((item) => {
      if (item.children?.length) {
        const hasActiveChild = item.children.some((child) => {
          const childHref = `/${locale}${child.href}`;
          return pathname === childHref || pathname.startsWith(`${childHref}/`);
        });

        initialState[item.href] = hasActiveChild;
      }
    });

    return initialState;
  });

  const toggleMenu = (href) => {
    setOpenMenus((prev) => ({
      ...prev,
      [href]: !prev[href],
    }));
  };

  return (
    <div className="space-y-1.5">
      {items.map((item) => {
        const Icon = item.icon;

        if (item.isLogout) {
          return (
            <button
              key={item.label}
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-[15px] font-medium text-[#374151] transition hover:bg-[#f3f4f6]"
            >
              <Icon size={18} className="text-[#6b7280]" />
              <span>{item.label}</span>
            </button>
          );
        }

        const fullHref = `/${locale}${item.href}`;
        const isActive =
          pathname === fullHref || pathname.startsWith(`${fullHref}/`);

        const hasChildren =
          Array.isArray(item.children) && item.children.length > 0;
        const isOpen = openMenus[item.href];

        if (hasChildren) {
          const hasActiveChild = item.children.some((child) => {
            const childHref = `/${locale}${child.href}`;
            return (
              pathname === childHref || pathname.startsWith(`${childHref}/`)
            );
          });

          return (
            <div key={item.href} className="space-y-1">
              <button
                type="button"
                onClick={() => toggleMenu(item.href)}
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-medium transition",
                  isActive || hasActiveChild
                    ? "bg-[#4f7df3] text-white shadow-[0_12px_24px_rgba(79,125,243,0.22)]"
                    : "text-[#374151] hover:bg-[#f3f4f6]",
                )}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={
                      isActive || hasActiveChild
                        ? "text-white"
                        : "text-[#6b7280]"
                    }
                  />
                  <span>{item.label}</span>
                </div>

                <ChevronDown
                  size={18}
                  className={cn(
                    "transition-transform duration-200",
                    isActive || hasActiveChild
                      ? "text-white"
                      : "text-[#6b7280]",
                    isOpen ? "rotate-180" : "rotate-0",
                  )}
                />
              </button>

              <div
                className={cn(
                  "overflow-hidden pl-4 transition-all duration-200",
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="mt-1 space-y-1 border-l border-[#e5e7eb] pl-3">
                  {item.children.map((child) => {
                    const ChildIcon = child.icon;
                    const childHref = `/${locale}${child.href}`;
                    const isChildActive =
                      pathname === childHref ||
                      pathname.startsWith(`${childHref}/`);

                    return (
                      <Link
                        key={child.href}
                        href={childHref}
                        onClick={onClose}
                        className={cn(
                          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                          isChildActive
                            ? "bg-[#eef4ff] text-[#275df5]"
                            : "text-[#4b5563] hover:bg-[#f9fafb]",
                        )}
                      >
                        {ChildIcon ? (
                          <ChildIcon
                            size={16}
                            className={
                              isChildActive
                                ? "text-[#275df5]"
                                : "text-[#9ca3af]"
                            }
                          />
                        ) : null}
                        <span>{child.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={fullHref}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition",
              isActive
                ? "bg-[#4f7df3] text-white shadow-[0_12px_24px_rgba(79,125,243,0.22)]"
                : "text-[#374151] hover:bg-[#f3f4f6]",
            )}
          >
            <Icon
              size={18}
              className={isActive ? "text-white" : "text-[#6b7280]"}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function DashboardSidebar({
  mobileOpen = false,
  onClose = () => {},
}) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const locale = params?.locale || "en";

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const userPermissions = user?.permissions || [];

  const filteredMainNav = useMemo(() => {
    return filterNavByPermissions(dashboardNavMain, userPermissions);
  }, [userPermissions]);

  const filteredBottomNav = useMemo(() => {
    return filterNavByPermissions(dashboardNavBottom, userPermissions);
  }, [userPermissions]);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    router.replace(`/${locale}/login`);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-[270px] border-r border-[#eef0f4] bg-white transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="relative flex items-center justify-center px-6 py-3">
            <Link
              href={`/${locale}/dashboard`}
              className="flex items-center justify-center"
            >
              <Image
                src="/images/logo/lueve-logo.svg"
                alt="LUEVE"
                width={90}
                height={28}
                className="h-16 w-auto object-contain"
                priority
              />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="absolute right-6 rounded-lg p-2 text-[#6b7280] hover:bg-[#f3f4f6] lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <SidebarNavSection
              items={filteredMainNav}
              locale={locale}
              pathname={pathname}
              onClose={onClose}
              onLogout={handleLogout}
            />
          </div>

          <div className="border-t border-[#eef0f4] px-4 py-4">
            <SidebarNavSection
              items={filteredBottomNav}
              locale={locale}
              pathname={pathname}
              onClose={onClose}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </aside>

      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4"
          onClick={cancelLogout}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-[#111827]">
              Confirm logout
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6b7280]">
              Are you sure you want to log out from your account?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={cancelLogout}
                className="rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={confirmLogout}
                className="rounded-xl bg-[#ef4444] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#dc2626]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

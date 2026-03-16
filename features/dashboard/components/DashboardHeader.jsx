"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";

export default function DashboardHeader({ onOpenSidebar = () => {} }) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-20 flex h-[78px] items-center justify-between border-b border-[#eef0f4] bg-white px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb] lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="relative hidden sm:block">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            type="text"
            placeholder="Search"
            className="h-[44px] w-[260px] rounded-full border border-[#e5e7eb] bg-[#f9fafb] pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#cbd5e1] md:w-[320px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6]"
        >
          <Bell size={20} />
          <span className="absolute right-1.5 top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ef4444] px-1 text-[10px] font-semibold text-white">
            6
          </span>
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl px-1.5 py-1 hover:bg-[#f9fafb]"
        >
          <img
            src="https://ui-avatars.com/api/?name=Moni+Roy&background=f3d6e4&color=7c3a53"
            alt="Profile"
            className="h-11 w-11 rounded-full object-cover"
          />

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-[#111827]">
              {user?.name || "Moni Roy"}
            </p>
            <p className="text-xs text-[#6b7280]">{user?.role || "Admin"}</p>
          </div>

          <ChevronDown size={16} className="hidden text-[#9ca3af] md:block" />
        </button>
      </div>
    </header>
  );
}

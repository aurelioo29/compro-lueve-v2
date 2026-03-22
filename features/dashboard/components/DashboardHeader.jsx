"use client";

import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useAuthStore } from "@/features/auth/store/auth-store";

function getInitials(name = "") {
  if (!name) return "AD";

  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export default function DashboardHeader({ onOpenSidebar = () => {} }) {
  const user = useAuthStore((state) => state.user);

  const userName = user?.name || "Developer";
  const userRole = user?.role || "Admin";
  const initials = getInitials(userName);

  return (
    <header className="sticky top-0 z-20 flex h-[84px] items-center justify-between border-b border-[#e5e7eb] bg-white px-4 md:px-6 mt-2">
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#e5e7eb] text-[#4b5563] hover:bg-[#f9fafb] lg:hidden"
        >
          <Menu size={18} />
        </button>

        {/* SEARCH */}
        <div className="relative hidden sm:block">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
          />
          <input
            type="text"
            placeholder="Search"
            className="h-[42px] w-[240px] rounded-full border border-[#e5e7eb] bg-[#fafafa] pl-10 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#d1d5db] md:w-[300px]"
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3">
        {/* NOTIFICATION */}
        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6b7280] hover:bg-[#f3f4f6]"
        >
          <Bell size={18} />
          <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-[#b42318]" />
        </button>

        {/* USER */}
        <button
          type="button"
          className="flex items-center gap-2 rounded-xl px-2 py-1.5 hover:bg-[#f9fafb]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f3f4f6] text-xs font-semibold text-[#374151]">
            {initials}
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-[#111827]">{userName}</p>
            <p className="text-xs text-[#6b7280]">{userRole}</p>
          </div>

          <ChevronDown size={14} className="hidden text-[#9ca3af] md:block" />
        </button>
      </div>
    </header>
  );
}

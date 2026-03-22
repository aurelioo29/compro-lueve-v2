"use client";

import { Settings, RefreshCw } from "lucide-react";

export default function SettingsHeader({
  onRefresh = () => {},
  isRefreshing = false,
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
          Account
        </p>
        <h1 className="mt-1 text-[38px] font-bold tracking-[-0.03em] text-[#111827]">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b7280]">
          Manage your personal profile information and account security in one
          place.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>

        <div className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)]">
          <Settings size={16} />
          Personal Settings
        </div>
      </div>
    </div>
  );
}

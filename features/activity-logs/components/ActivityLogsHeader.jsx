"use client";

import { Filter, RotateCcw } from "lucide-react";

export default function ActivityLogsHeader({
  onRefresh = () => {},
  isRefreshing = false,
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
          Monitoring
        </p>
        <h1 className="mt-1 text-[38px] font-bold tracking-[-0.03em] text-[#111827]">
          Activity Logs
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b7280]">
          Monitor user activities across authentication, blogs, users, and
          WhatsApp response modules.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
        >
          <RotateCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>

        <button className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] transition hover:bg-[#3e6ee8]">
          <Filter size={16} />
          Export Logs
        </button>
      </div>
    </div>
  );
}

"use client";

import { FolderPlus, RotateCcw } from "lucide-react";

export default function CollectionCategoriesHeader({
  onRefresh = () => {},
  isRefreshing = false,
  onCreate = () => {},
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
          Collection Management
        </p>
        <h1 className="mt-1 text-[38px] font-bold tracking-[-0.03em] text-[#111827]">
          Categories
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6b7280]">
          Manage collection categories, status, order, and structure from one
          place.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-4 py-2.5 text-sm font-medium text-[#374151] hover:bg-[#f9fafb]"
        >
          <RotateCcw size={16} className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>

        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 rounded-xl bg-[#4f7df3] px-4 py-2.5 text-sm font-medium text-white shadow-[0_10px_24px_rgba(79,125,243,0.22)] hover:bg-[#3e6ee8]"
        >
          <FolderPlus size={16} />
          Add Category
        </button>
      </div>
    </div>
  );
}

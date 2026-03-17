"use client";

import { Search } from "lucide-react";

export default function BlogsFilters({
  search = "",
  sortBy = "createdAt",
  order = "desc",
  onSearchChange = () => {},
  onSortByChange = () => {},
  onOrderChange = () => {},
  onReset = () => {},
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h3 className="text-[20px] font-bold text-[#111827]">Blogs Table</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Search, sort, and manage blog articles.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:flex">
          <div className="relative min-w-[240px]">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9ca3af]"
            />
            <input
              type="text"
              placeholder="Search title, content, slug..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#cbd5e1]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="h-[46px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
          >
            <option value="createdAt">Sort by Created At</option>
            <option value="updatedAt">Sort by Updated At</option>
            <option value="title">Sort by Title</option>
            <option value="status">Sort by Status</option>
          </select>

          <select
            value={order}
            onChange={(e) => onOrderChange(e.target.value)}
            className="h-[46px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>

          <button
            onClick={onReset}
            className="h-[46px] rounded-xl border border-[#e5e7eb] bg-white px-4 text-sm font-medium text-[#374151] transition hover:bg-[#f9fafb]"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

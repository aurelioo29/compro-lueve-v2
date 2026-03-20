"use client";

import { Search } from "lucide-react";

const ACTION_OPTIONS = [
  "LOGIN",

  "CREATE_BLOG",
  "UPDATE_BLOG",
  "DELETE_BLOG",

  "CREATE_USER",
  "UPDATE_USER",
  "DEACTIVATE_USER",

  "CREATE_WA_RESPONSE",
  "UPDATE_WA_RESPONSE",
  "DELETE_WA_RESPONSE",

  "CREATE_COLLECTION_CATEGORY",
  "UPDATE_COLLECTION_CATEGORY",
  "DELETE_COLLECTION_CATEGORY",

  "CREATE_COLLECTION_ITEM",
  "UPDATE_COLLECTION_ITEM",
  "DELETE_COLLECTION_ITEM",

  "UPLOAD_COLLECTION_IMAGE",
  "DELETE_COLLECTION_IMAGE",
  "REORDER_COLLECTION_IMAGE",

  "CREATE_COLLECTION_DETAIL_SECTION",
  "UPDATE_COLLECTION_DETAIL_SECTION",
  "DELETE_COLLECTION_DETAIL_SECTION",
  "REORDER_COLLECTION_DETAIL_SECTION",

  "CREATE_COLLECTION_DETAIL_ITEM",
  "UPDATE_COLLECTION_DETAIL_ITEM",
  "DELETE_COLLECTION_DETAIL_ITEM",
  "REORDER_COLLECTION_DETAIL_ITEM",
];

const ENTITY_OPTIONS = [
  "AUTH",
  "BLOG",
  "USER",
  "WA_RESPONSE",

  "COLLECTION_CATEGORY",
  "COLLECTION_ITEM",
  "COLLECTION_IMAGE",
  "COLLECTION_DETAIL_SECTION",
  "COLLECTION_DETAIL_ITEM",
];

export default function ActivityLogsFilters({
  search = "",
  actionFilter = "all",
  entityFilter = "all",
  sortBy = "createdAt",
  order = "desc",
  onSearchChange = () => {},
  onActionChange = () => {},
  onEntityChange = () => {},
  onSortByChange = () => {},
  onOrderChange = () => {},
  onReset = () => {},
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h3 className="text-[20px] font-bold text-[#111827]">Logs Table</h3>
          <p className="mt-1 text-sm text-[#6b7280]">
            Search and filter recent system activities.
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
              placeholder="Search actor, email, description..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-[46px] w-full rounded-xl border border-[#e5e7eb] bg-[#f9fafb] pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9ca3af] focus:border-[#cbd5e1]"
            />
          </div>

          <select
            value={actionFilter}
            onChange={(e) => onActionChange(e.target.value)}
            className="h-[46px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
          >
            <option value="all">All Actions</option>
            {ACTION_OPTIONS.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>

          <select
            value={entityFilter}
            onChange={(e) => onEntityChange(e.target.value)}
            className="h-[46px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
          >
            <option value="all">All Entities</option>
            {ENTITY_OPTIONS.map((entity) => (
              <option key={entity} value={entity}>
                {entity}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value)}
            className="h-[46px] rounded-xl border border-[#e5e7eb] bg-[#f9fafb] px-4 text-sm text-[#374151] outline-none"
          >
            <option value="createdAt">Sort by Date</option>
            <option value="action">Sort by Action</option>
            <option value="entityType">Sort by Entity</option>
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

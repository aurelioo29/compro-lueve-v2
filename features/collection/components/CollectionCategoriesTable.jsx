"use client";

import { Pencil, Trash2 } from "lucide-react";
import CollectionCategoriesEmptyState from "./CollectionCategoriesEmptyState";
import CollectionCategoriesErrorState from "./CollectionCategoriesErrorState";

function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function getStatusBadgeClass(isActive) {
  return isActive
    ? "bg-[#dcfce7] text-[#15803d]"
    : "bg-[#fee2e2] text-[#b91c1c]";
}

export default function CollectionCategoriesTable({
  items = [],
  total = 0,
  page = 1,
  totalPages = 1,
  isLoading = false,
  isError = false,
  errorMessage = "",
  onPrevPage = () => {},
  onNextPage = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left">
              {[
                "Name",
                "Parent",
                "Items",
                "Children",
                "Status",
                "Sort Order",
                "Updated At",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="bg-[#f3f5f9] px-5 py-4 text-sm font-semibold text-[#374151] first:rounded-l-2xl last:rounded-r-2xl"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-sm text-[#6b7280]"
                >
                  Loading categories...
                </td>
              </tr>
            ) : isError ? (
              <CollectionCategoriesErrorState message={errorMessage} />
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="bg-white">
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#111827]">
                        {item.name || "-"}
                      </p>
                      <p className="mt-1 text-sm text-[#6b7280]">
                        {item.description || "No description"}
                      </p>
                      <p className="mt-1 text-xs text-[#9ca3af]">
                        {item.slug || "-"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.parent?.name ? (
                      item.parent.name
                    ) : (
                      <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#6b7280]">
                        ROOT
                      </span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item._count?.items ?? 0}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item._count?.children ?? item.children?.length ?? 0}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusBadgeClass(
                        item.isActive,
                      )}`}
                    >
                      {item.isActive ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.sortOrder ?? 0}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#6b7280]">
                    {formatDate(item.updatedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <CollectionCategoriesEmptyState />
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#eef0f4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#6b7280]">
          Showing{" "}
          <span className="font-semibold text-[#111827]">{items.length}</span>{" "}
          of <span className="font-semibold text-[#111827]">{total}</span>{" "}
          categories
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            onClick={onPrevPage}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#4f7df3] px-3 py-2 text-sm font-medium text-white"
          >
            {page}
          </button>

          <button
            type="button"
            disabled={page >= totalPages}
            onClick={onNextPage}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

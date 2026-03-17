"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import BlogsEmptyState from "./BlogsEmptyState";
import BlogsErrorState from "./BlogsErrorState";

function getStatusBadgeClass(status) {
  switch (String(status || "").toUpperCase()) {
    case "DRAFT":
      return "bg-[#fef3c7] text-[#b45309]";
    case "PUBLISHED":
      return "bg-[#dcfce7] text-[#15803d]";
    case "ARCHIVED":
      return "bg-[#dbeafe] text-[#1d4ed8]";
    default:
      return "bg-[#f3f4f6] text-[#374151]";
  }
}

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

function stripHtml(html = "") {
  return String(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function getPreviewText(item) {
  const source = item.excerpt?.trim() || stripHtml(item.content || "");
  if (!source) return "-";

  return source.length > 140 ? `${source.slice(0, 140)}...` : source;
}

export default function BlogsTable({
  items = [],
  total = 0,
  page = 1,
  totalPages = 1,
  isLoading = false,
  isError = false,
  errorMessage = "",
  onPrevPage = () => {},
  onNextPage = () => {},
  onView = () => {},
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
                "Title",
                "Slug",
                "Author",
                "Status",
                "Cover",
                "Created At",
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
                  Loading blogs...
                </td>
              </tr>
            ) : isError ? (
              <BlogsErrorState message={errorMessage} />
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="bg-white align-top">
                  <td className="px-5 py-4">
                    <div className="max-w-[320px]">
                      <p className="text-sm font-semibold text-[#111827]">
                        {item.title || "-"}
                      </p>
                      <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#6b7280]">
                        {getPreviewText(item)}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.slug || "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.author?.name || "-"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusBadgeClass(
                        item.status,
                      )}`}
                    >
                      {item.status || "-"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {item.coverImage ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL?.replace("/api", "")}${item.coverImage}`}
                        alt={item.title || "Blog cover"}
                        className="h-12 w-16 rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-sm text-[#9ca3af]">No image</span>
                    )}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#6b7280]">
                    {formatDate(item.createdAt || item.created_at)}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#6b7280]">
                    {formatDate(item.updatedAt || item.updated_at)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                      >
                        <Eye size={16} />
                      </button>

                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
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
              <BlogsEmptyState />
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#eef0f4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#6b7280]">
          Showing{" "}
          <span className="font-semibold text-[#111827]">{items.length}</span>{" "}
          of <span className="font-semibold text-[#111827]">{total}</span> blogs
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={onPrevPage}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button className="rounded-lg bg-[#4f7df3] px-3 py-2 text-sm font-medium text-white">
            {page}
          </button>

          <button
            disabled={page >= totalPages}
            onClick={onNextPage}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

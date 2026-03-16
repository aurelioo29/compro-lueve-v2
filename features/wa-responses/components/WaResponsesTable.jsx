"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import WaResponsesEmptyState from "./WaResponsesEmptyState";
import WaResponsesErrorState from "./WaResponsesErrorState";

function getStatusBadgeClass(status) {
  switch (String(status || "").toUpperCase()) {
    case "PENDING":
      return "bg-[#fef3c7] text-[#b45309]";
    case "RESPONDED":
      return "bg-[#dcfce7] text-[#15803d]";
    case "CLOSED":
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

export default function WaResponsesTable({
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
                "Full Name",
                "Phone Number",
                "Email",
                "Status",
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
                  colSpan={7}
                  className="px-5 py-12 text-center text-sm text-[#6b7280]"
                >
                  Loading WA responses...
                </td>
              </tr>
            ) : isError ? (
              <WaResponsesErrorState message={errorMessage} />
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="bg-white">
                  <td className="px-5 py-4 text-sm font-semibold text-[#111827]">
                    {item.fullName || "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.phoneNumber || "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.email || "-"}
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
              <WaResponsesEmptyState />
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#eef0f4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#6b7280]">
          Showing{" "}
          <span className="font-semibold text-[#111827]">{items.length}</span>{" "}
          of <span className="font-semibold text-[#111827]">{total}</span>{" "}
          responses
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

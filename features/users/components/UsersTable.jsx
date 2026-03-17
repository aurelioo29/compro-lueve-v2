"use client";

import { Pencil, UserX } from "lucide-react";
import UsersEmptyState from "./UsersEmptyState";
import UsersErrorState from "./UsersErrorState";

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

export default function UsersTable({
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
  onDeactivate = () => {},
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left">
              {[
                "Name",
                "Email",
                "Role",
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
                  Loading users...
                </td>
              </tr>
            ) : isError ? (
              <UsersErrorState message={errorMessage} />
            ) : items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="bg-white">
                  <td className="px-5 py-4 text-sm font-semibold text-[#111827]">
                    {item.name || "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.email || "-"}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#4b5563]">
                    {item.role?.name || item.roleName || "-"}
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

                  <td className="px-5 py-4 text-sm text-[#6b7280]">
                    {formatDate(item.createdAt)}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#6b7280]">
                    {formatDate(item.updatedAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#374151] hover:bg-[#f9fafb]"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => onDeactivate(item)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#fee2e2] text-[#dc2626] hover:bg-[#fff5f5]"
                        disabled={!item.isActive}
                      >
                        <UserX size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <UsersEmptyState />
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#eef0f4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#6b7280]">
          Showing{" "}
          <span className="font-semibold text-[#111827]">{items.length}</span>{" "}
          of <span className="font-semibold text-[#111827]">{total}</span> users
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={onPrevPage}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          <button className="rounded-lg bg-[#4f7df3] px-3 py-2 text-sm font-medium text-white">
            {page}
          </button>

          <button
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

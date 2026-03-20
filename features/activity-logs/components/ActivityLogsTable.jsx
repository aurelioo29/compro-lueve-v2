"use client";

import ActivityLogsEmptyState from "./ActivityLogsEmptyState";
import ActivityLogsErrorState from "./ActivityLogsErrorState";

function getActionBadgeClass(action) {
  const normalized = String(action || "").toUpperCase();

  switch (normalized) {
    case "LOGIN":
      return "bg-[#ede9fe] text-[#6d28d9]";

    case "CREATE_USER":
    case "CREATE_BLOG":
    case "CREATE_WA_RESPONSE":
    case "CREATE_COLLECTION_CATEGORY":
    case "CREATE_COLLECTION_ITEM":
    case "CREATE_COLLECTION_DETAIL_SECTION":
    case "CREATE_COLLECTION_DETAIL_ITEM":
      return "bg-[#dcfce7] text-[#15803d]";

    case "UPLOAD_COLLECTION_IMAGE":
      return "bg-[#dbeafe] text-[#1d4ed8]";

    case "UPDATE_USER":
    case "UPDATE_BLOG":
    case "UPDATE_WA_RESPONSE":
    case "UPDATE_COLLECTION_CATEGORY":
    case "UPDATE_COLLECTION_ITEM":
    case "UPDATE_COLLECTION_DETAIL_SECTION":
    case "UPDATE_COLLECTION_DETAIL_ITEM":
      return "bg-[#fef3c7] text-[#b45309]";

    case "DEACTIVATE_USER":
    case "DELETE_BLOG":
    case "DELETE_WA_RESPONSE":
    case "DELETE_COLLECTION_CATEGORY":
    case "DELETE_COLLECTION_ITEM":
    case "DELETE_COLLECTION_IMAGE":
    case "DELETE_COLLECTION_DETAIL_SECTION":
    case "DELETE_COLLECTION_DETAIL_ITEM":
      return "bg-[#fee2e2] text-[#b91c1c]";

    case "REORDER_COLLECTION_IMAGE":
    case "REORDER_COLLECTION_DETAIL_SECTION":
    case "REORDER_COLLECTION_DETAIL_ITEM":
      return "bg-[#e0f2fe] text-[#0369a1]";

    default:
      return "bg-[#f3f4f6] text-[#374151]";
  }
}

function getSeverityDotClass(action) {
  const normalized = String(action || "").toUpperCase();

  if (normalized.includes("DELETE") || normalized === "DEACTIVATE_USER") {
    return "bg-[#ef4444]";
  }

  if (normalized.includes("UPDATE")) {
    return "bg-[#f59e0b]";
  }

  if (normalized.includes("CREATE") || normalized.includes("UPLOAD")) {
    return "bg-[#22c55e]";
  }

  if (normalized.includes("REORDER") || normalized === "LOGIN") {
    return "bg-[#60a5fa]";
  }

  return "bg-[#9ca3af]";
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

function normalizeEntity(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .toLowerCase();
}

export default function ActivityLogsTable({
  logs = [],
  totalLogs = 0,
  page = 1,
  totalPages = 1,
  isLoading = false,
  isError = false,
  errorMessage = "",
  onPrevPage = () => {},
  onNextPage = () => {},
}) {
  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-left">
              {[
                "Actor",
                "Action",
                "Entity",
                "Description",
                "IP Address",
                "Date",
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
                  colSpan={6}
                  className="px-5 py-12 text-center text-sm text-[#6b7280]"
                >
                  Loading activity logs...
                </td>
              </tr>
            ) : isError ? (
              <ActivityLogsErrorState message={errorMessage} />
            ) : logs.length > 0 ? (
              logs.map((log) => {
                const actorName =
                  log?.actor?.name ||
                  log?.user?.name ||
                  log?.causer?.name ||
                  log?.createdBy?.name ||
                  "Unknown User";

                const actorEmail =
                  log?.actor?.email ||
                  log?.user?.email ||
                  log?.causer?.email ||
                  log?.createdBy?.email ||
                  "-";

                const action = log?.action || "-";
                const entity = log?.entityType || log?.entity || "-";
                const description = log?.description || "-";
                const ipAddress = log?.ipAddress || log?.ip || "-";
                const createdAt = log?.createdAt || log?.created_at || "-";

                return (
                  <tr key={log.id} className="bg-white">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#4f7df3]" />
                        <div>
                          <p className="text-sm font-semibold text-[#111827]">
                            {actorName}
                          </p>
                          <p className="text-xs text-[#6b7280]">{actorEmail}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getActionBadgeClass(
                          action,
                        )}`}
                      >
                        {action}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-medium uppercase text-[#374151]">
                        {normalizeEntity(entity)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm leading-6 text-[#4b5563]">
                      {description}
                    </td>

                    <td className="px-5 py-4 text-sm text-[#6b7280]">
                      {ipAddress}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#6b7280]">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${getSeverityDotClass(
                            action,
                          )}`}
                        />
                        {formatDate(createdAt)}
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <ActivityLogsEmptyState />
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-[#eef0f4] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[#6b7280]">
          Showing{" "}
          <span className="font-semibold text-[#111827]">{logs.length}</span> of{" "}
          <span className="font-semibold text-[#111827]">{totalLogs}</span> logs
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={page <= 1}
            onClick={onPrevPage}
            className="rounded-lg border border-[#e5e7eb] px-3 py-2 text-sm text-[#6b7280] hover:bg-[#f9fafb] disabled:cursor-not-allowed disabled:opacity-50"
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

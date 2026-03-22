"use client";

import ActivityLogsEmptyState from "./ActivityLogsEmptyState";
import ActivityLogsErrorState from "./ActivityLogsErrorState";
import {
  formatActionLabel,
  formatDate,
  formatEntityLabel,
  getActionBadgeClass,
  getSeverityDotClass,
} from "../utils/activity-log.utils";

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
                        title={action}
                      >
                        {formatActionLabel(action)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-medium text-[#374151]"
                        title={entity}
                      >
                        {formatEntityLabel(entity)}
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

"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useActivityLogs } from "@/features/activity-logs/hooks/useActivityLogs";
import { useExportActivityLogs } from "@/features/activity-logs/hooks/useExportActivityLogs";
import { buildActivityLogParams } from "@/features/activity-logs/utils/build-activity-log-params";
import ActivityLogsHeader from "./ActivityLogsHeader";
import ActivityLogsSummaryCards from "./ActivityLogsSummaryCards";
import ActivityLogsFilters from "./ActivityLogsFilters";
import ActivityLogsTable from "./ActivityLogsTable";

export default function ActivityLogsPageContent() {
  const [search, setSearch] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [entityFilter, setEntityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const limit = 10;

  const params = useMemo(() => {
    return buildActivityLogParams({
      page,
      limit,
      search,
      action: actionFilter,
      entityType: entityFilter,
      sortBy,
      order,
    });
  }, [page, limit, search, actionFilter, entityFilter, sortBy, order]);

  const exportParams = useMemo(() => {
    return buildActivityLogParams({
      search,
      action: actionFilter,
      entityType: entityFilter,
      sortBy,
      order,
    });
  }, [search, actionFilter, entityFilter, sortBy, order]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useActivityLogs(params);

  const exportMutation = useExportActivityLogs();

  const rawLogs = data?.data || [];
  const pagination = data?.pagination || {};
  const totalLogs = pagination?.total || rawLogs.length;
  const totalPages = pagination?.totalPages || 1;

  const logs = rawLogs;

  const loginLogsCount = rawLogs.filter((log) =>
    String(log?.action || "")
      .toUpperCase()
      .includes("LOGIN"),
  ).length;

  const criticalLogsCount = rawLogs.filter((log) =>
    String(log?.action || "")
      .toUpperCase()
      .includes("DELETE"),
  ).length;

  const resetFilters = () => {
    setSearch("");
    setActionFilter("all");
    setEntityFilter("all");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  const handleExport = async (format) => {
    try {
      await exportMutation.mutateAsync({
        ...exportParams,
        format,
      });

      toast.success(
        format === "xlsx"
          ? "Activity logs exported as Excel successfully."
          : "Activity logs exported as CSV successfully.",
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to export activity logs.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <ActivityLogsHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onExport={handleExport}
        isExporting={exportMutation.isPending}
      />

      <ActivityLogsSummaryCards
        totalLogs={totalLogs}
        currentPage={page}
        totalPages={totalPages}
        loginLogsCount={loginLogsCount}
        criticalLogsCount={criticalLogsCount}
      />

      <ActivityLogsFilters
        search={search}
        actionFilter={actionFilter}
        entityFilter={entityFilter}
        sortBy={sortBy}
        order={order}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onActionChange={(value) => {
          setActionFilter(value);
          setPage(1);
        }}
        onEntityChange={(value) => {
          setEntityFilter(value);
          setPage(1);
        }}
        onSortByChange={(value) => {
          setSortBy(value);
          setPage(1);
        }}
        onOrderChange={(value) => {
          setOrder(value);
          setPage(1);
        }}
        onReset={resetFilters}
      />

      <ActivityLogsTable
        logs={logs}
        totalLogs={totalLogs}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.response?.data?.message}
        onPrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() =>
          setPage((prev) => (prev < totalPages ? prev + 1 : prev))
        }
      />
    </section>
  );
}

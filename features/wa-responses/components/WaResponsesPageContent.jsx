"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useWaResponses } from "@/features/wa-responses/hooks/useWaResponses";
import { useExportWaResponses } from "@/features/wa-responses/hooks/useExportWaResponses";
import { buildWaResponseParams } from "@/features/wa-responses/utils/build-wa-response-params";
import WaResponsesHeader from "./WaResponsesHeader";
import WaResponsesSummaryCards from "./WaResponsesSummaryCards";
import WaResponsesFilters from "./WaResponsesFilters";
import WaResponsesTable from "./WaResponsesTable";
import WaResponseDetailModal from "./WaResponseDetailModal";
import WaResponseEditModal from "./WaResponseEditModal";
import WaResponseDeleteModal from "./WaResponseDeleteModal";

export default function WaResponsesPageContent() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const limit = 10;

  const params = useMemo(() => {
    return buildWaResponseParams({
      page,
      limit,
      search,
      status,
      sortBy,
      order,
    });
  }, [page, limit, search, status, sortBy, order]);

  const exportParams = useMemo(() => {
    return buildWaResponseParams({
      search,
      status,
      sortBy,
      order,
    });
  }, [search, status, sortBy, order]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useWaResponses(params);

  const exportMutation = useExportWaResponses();

  const items = data?.data || [];
  const pagination = data?.pagination || {};
  const total = pagination?.total || items.length;
  const totalPages = pagination?.totalPages || 1;

  const pendingCount = items.filter(
    (item) => String(item.status || "").toUpperCase() === "PENDING",
  ).length;

  const respondedCount = items.filter(
    (item) => String(item.status || "").toUpperCase() === "RESPONDED",
  ).length;

  const closedCount = items.filter(
    (item) => String(item.status || "").toUpperCase() === "CLOSED",
  ).length;

  const resetFilters = () => {
    setSearch("");
    setStatus("all");
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
          ? "WA responses exported as Excel successfully."
          : "WA responses exported as CSV successfully.",
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Failed to export WA responses.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <WaResponsesHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onExport={handleExport}
        isExporting={exportMutation.isPending}
      />

      <WaResponsesSummaryCards
        total={total}
        pending={pendingCount}
        responded={respondedCount}
        closed={closedCount}
      />

      <WaResponsesFilters
        search={search}
        status={status}
        sortBy={sortBy}
        order={order}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
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

      <WaResponsesTable
        items={items}
        total={total}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.response?.data?.message}
        onPrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        onView={(item) => {
          setSelectedItem(item);
          setDetailOpen(true);
        }}
        onEdit={(item) => {
          setSelectedItem(item);
          setEditOpen(true);
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setDeleteOpen(true);
        }}
      />

      <WaResponseDetailModal
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedItem(null);
        }}
        responseId={selectedItem?.id}
      />

      <WaResponseEditModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <WaResponseDeleteModal
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </section>
  );
}

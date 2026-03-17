"use client";

import { useMemo, useState } from "react";
import { useBlogs } from "@/features/blogs/hooks/useBlogs";
import { buildBlogParams } from "@/features/blogs/utils/build-blog-params";
import BlogsHeader from "./BlogsHeader";
import BlogsSummaryCards from "./BlogsSummaryCards";
import BlogsFilters from "./BlogsFilters";
import BlogsTable from "./BlogsTable";
import BlogDetailModal from "./BlogDetailModal";
import BlogFormModal from "./BlogFormModal";
import BlogDeleteModal from "./BlogDeleteModal";

export default function BlogsPageContent() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const limit = 10;

  const params = useMemo(() => {
    return buildBlogParams({
      page,
      limit,
      search,
      sortBy,
      order,
    });
  }, [page, limit, search, sortBy, order]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useBlogs(params);

  const items = data?.data || [];
  const pagination = data?.pagination || {};
  const total = pagination?.total || items.length;
  const totalPages = pagination?.totalPages || 1;

  const draftCount = items.filter(
    (item) => String(item.status || "").toUpperCase() === "DRAFT",
  ).length;

  const publishedCount = items.filter(
    (item) => String(item.status || "").toUpperCase() === "PUBLISHED",
  ).length;

  const archivedCount = items.filter(
    (item) => String(item.status || "").toUpperCase() === "ARCHIVED",
  ).length;

  const resetFilters = () => {
    setSearch("");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  return (
    <section className="space-y-6">
      <BlogsHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onCreate={() => {
          setSelectedItem(null);
          setFormOpen(true);
        }}
      />

      <BlogsSummaryCards
        total={total}
        draft={draftCount}
        published={publishedCount}
        archived={archivedCount}
      />

      <BlogsFilters
        search={search}
        sortBy={sortBy}
        order={order}
        onSearchChange={(value) => {
          setSearch(value);
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

      <BlogsTable
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
          setFormOpen(true);
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setDeleteOpen(true);
        }}
      />

      <BlogDetailModal
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setSelectedItem(null);
        }}
        blogId={selectedItem?.id}
      />

      <BlogFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <BlogDeleteModal
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

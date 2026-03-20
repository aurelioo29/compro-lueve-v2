"use client";

import { useMemo, useState } from "react";
import { useCollectionItems } from "../../hooks/useCollectionItems";
import { useCollectionCategories } from "../../hooks/useCollectionCategories";
import { buildCollectionItemParams } from "../../utils/build-collection-item-params";
import CollectionItemsHeader from "./CollectionItemsHeader";
import CollectionItemsSummaryCards from "./CollectionItemsSummaryCards";
import CollectionItemsFilters from "./CollectionItemsFilters";
import CollectionItemsTable from "./CollectionItemsTable";
import CollectionItemFormModal from "./CollectionItemFormModal";
import CollectionItemDeleteModal from "./CollectionItemDeleteModal";

export default function CollectionItemsPageContent() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [categoryId, setCategoryId] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const limit = 10;

  const params = useMemo(() => {
    return buildCollectionItemParams({
      page,
      limit,
      search,
      status,
      categoryId,
      sortBy,
      order,
    });
  }, [page, limit, search, status, categoryId, sortBy, order]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useCollectionItems(params);

  const { data: categoriesData } = useCollectionCategories({
    page: 1,
    limit: 100,
    sortBy: "sortOrder",
    order: "asc",
  });

  const items = data?.data || [];
  const pagination = data?.pagination || {};
  const total = pagination?.total || items.length;
  const totalPages = pagination?.totalPages || 1;

  const categories = categoriesData?.data || [];

  const publishedCount = items.filter(
    (item) => item.status === "PUBLISHED",
  ).length;
  const draftCount = items.filter((item) => item.status === "DRAFT").length;
  const archivedCount = items.filter(
    (item) => item.status === "ARCHIVED",
  ).length;

  function resetFilters() {
    setSearch("");
    setStatus("all");
    setCategoryId("all");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  }

  return (
    <section className="space-y-6">
      <CollectionItemsHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onCreate={() => {
          setSelectedItem(null);
          setFormOpen(true);
        }}
      />

      <CollectionItemsSummaryCards
        total={total}
        published={publishedCount}
        draft={draftCount}
        archived={archivedCount}
      />

      <CollectionItemsFilters
        search={search}
        status={status}
        categoryId={categoryId}
        sortBy={sortBy}
        order={order}
        categories={categories}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        onCategoryChange={(value) => {
          setCategoryId(value);
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

      <CollectionItemsTable
        items={items}
        total={total}
        page={page}
        totalPages={totalPages}
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.response?.data?.message}
        onPrevPage={() => setPage((prev) => Math.max(prev - 1, 1))}
        onNextPage={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        onEdit={(item) => {
          setSelectedItem(item);
          setFormOpen(true);
        }}
        onDelete={(item) => {
          setSelectedItem(item);
          setDeleteOpen(true);
        }}
      />

      <CollectionItemFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <CollectionItemDeleteModal
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

"use client";

import { useMemo, useState } from "react";
import { useCollectionCategories } from "../hooks/useCollectionCategories";
import { buildCollectionCategoryParams } from "../utils/build-collection-category-params";
import CollectionCategoriesHeader from "./CollectionCategoriesHeader";
import CollectionCategoriesSummaryCards from "./CollectionCategoriesSummaryCards";
import CollectionCategoriesFilters from "./CollectionCategoriesFilters";
import CollectionCategoriesTable from "./CollectionCategoriesTable";
import CollectionCategoryFormModal from "./CollectionCategoryFormModal";
import CollectionCategoryDeleteModal from "./CollectionCategoryDeleteModal";

export default function CollectionCategoriesPageContent() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("sortOrder");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const limit = 10;

  const params = useMemo(() => {
    return buildCollectionCategoryParams({
      page,
      limit,
      search,
      sortBy,
      order,
    });
  }, [page, limit, search, sortBy, order]);

  const { data, isLoading, isError, error, refetch, isFetching } =
    useCollectionCategories(params);

  const items = data?.data || [];
  const pagination = data?.pagination || {};
  const total = pagination?.total || items.length;
  const totalPages = pagination?.totalPages || 1;

  const activeCount = items.filter((item) => item.isActive).length;
  const inactiveCount = items.filter((item) => !item.isActive).length;
  const totalItems = items.reduce(
    (sum, item) => sum + (item?._count?.items || 0),
    0,
  );

  function resetFilters() {
    setSearch("");
    setSortBy("sortOrder");
    setOrder("asc");
    setPage(1);
  }

  return (
    <section className="space-y-6">
      <CollectionCategoriesHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onCreate={() => {
          setSelectedItem(null);
          setFormOpen(true);
        }}
      />

      <CollectionCategoriesSummaryCards
        total={total}
        active={activeCount}
        inactive={inactiveCount}
        totalItems={totalItems}
      />

      <CollectionCategoriesFilters
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

      <CollectionCategoriesTable
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

      <CollectionCategoryFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <CollectionCategoryDeleteModal
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

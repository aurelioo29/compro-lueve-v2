"use client";

import { useMemo, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { useRoles } from "../hooks/useRoles";
import { buildUserParams } from "../utils/build-user-params.js";
import UsersHeader from "./UsersHeader";
import UsersSummaryCards from "./UsersSummaryCards";
import UsersFilters from "./UsersFilters";
import UsersTable from "./UsersTable";
import UserFormModal from "./UserFormModal";
import UserDeactivateModal from "./UserDeactivateModal";

export default function UsersPageContent() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);

  const [selectedItem, setSelectedItem] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deactivateOpen, setDeactivateOpen] = useState(false);

  const limit = 10;

  const params = useMemo(() => {
    return buildUserParams({
      page,
      limit,
      search,
      sortBy,
      order,
    });
  }, [page, limit, search, sortBy, order]);

  const { data, isLoading, isError, error, refetch, isFetching } = useUsers(params);
  const { data: rolesData } = useRoles();

  const items = data?.data || [];
  const pagination = data?.pagination || {};
  const total = pagination?.total || items.length;
  const totalPages = pagination?.totalPages || 1;

  const rolesCount = rolesData?.data?.length || 0;
  const activeCount = items.filter((item) => item.isActive).length;
  const inactiveCount = items.filter((item) => !item.isActive).length;

  const resetFilters = () => {
    setSearch("");
    setSortBy("createdAt");
    setOrder("desc");
    setPage(1);
  };

  return (
    <section className="space-y-6">
      <UsersHeader
        onRefresh={refetch}
        isRefreshing={isFetching}
        onCreate={() => {
          setSelectedItem(null);
          setFormOpen(true);
        }}
      />

      <UsersSummaryCards
        total={total}
        active={activeCount}
        inactive={inactiveCount}
        rolesCount={rolesCount}
      />

      <UsersFilters
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

      <UsersTable
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
        onDeactivate={(item) => {
          setSelectedItem(item);
          setDeactivateOpen(true);
        }}
      />

      <UserFormModal
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />

      <UserDeactivateModal
        open={deactivateOpen}
        onClose={() => {
          setDeactivateOpen(false);
          setSelectedItem(null);
        }}
        item={selectedItem}
      />
    </section>
  );
}
export function buildCollectionItemParams({
  page = 1,
  limit = 10,
  search = "",
  status = "all",
  categoryId = "all",
  sortBy = "createdAt",
  order = "desc",
} = {}) {
  const params = {
    page,
    limit,
    sortBy,
    order,
  };

  if (search?.trim()) {
    params.search = search.trim();
  }

  if (status && status !== "all") {
    params.status = status;
  }

  if (categoryId && categoryId !== "all") {
    params.categoryId = categoryId;
  }

  return params;
}

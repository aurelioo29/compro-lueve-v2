export function buildCollectionCategoryParams({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "sortOrder",
  order = "asc",
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

  return params;
}

export function buildBlogParams({
  page = 1,
  limit = 10,
  search = "",
  sortBy = "createdAt",
  order = "desc",
}) {
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

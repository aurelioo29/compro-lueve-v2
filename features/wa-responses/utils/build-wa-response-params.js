const ALLOWED_STATUS = ["PENDING", "RESPONDED", "CLOSED"];
const ALLOWED_SORT_BY = [
  "createdAt",
  "updatedAt",
  "fullName",
  "phoneNumber",
  "status",
];
const ALLOWED_ORDER = ["asc", "desc"];

export function buildWaResponseParams({
  page = 1,
  limit = 10,
  search = "",
  status = "all",
  sortBy = "createdAt",
  order = "desc",
}) {
  const safePage = Number(page) > 0 ? Number(page) : 1;
  const safeLimit = Number(limit) > 0 ? Number(limit) : 10;

  const safeSortBy = ALLOWED_SORT_BY.includes(sortBy) ? sortBy : "createdAt";

  const safeOrder = ALLOWED_ORDER.includes(order) ? order : "desc";

  const params = {
    page: safePage,
    limit: safeLimit,
    sortBy: safeSortBy,
    order: safeOrder,
  };

  if (typeof search === "string" && search.trim()) {
    params.search = search.trim();
  }

  if (typeof status === "string" && ALLOWED_STATUS.includes(status)) {
    params.status = status;
  }

  return params;
}

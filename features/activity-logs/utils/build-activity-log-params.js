export function buildActivityLogParams({
  page = 1,
  limit = 10,
  action = "all",
  entityType = "all",
  sortBy = "createdAt",
  order = "desc",
}) {
  const params = {
    page,
    limit,
    sortBy,
    order,
  };

  if (action && action !== "all") {
    params.action = action;
  }

  if (entityType && entityType !== "all") {
    params.entityType = entityType;
  }

  return params;
}

export function hasPermission(userPermissions = [], requiredPermissions = []) {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
}

export function filterNavByPermissions(items = [], userPermissions = []) {
  return items.filter((item) =>
    hasPermission(userPermissions, item.permissions),
  );
}

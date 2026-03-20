export function hasPermission(userPermissions = [], requiredPermissions = []) {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission),
  );
}

export function filterNavByPermissions(items = [], userPermissions = []) {
  return items
    .map((item) => {
      const filteredChildren = item.children
        ? filterNavByPermissions(item.children, userPermissions)
        : undefined;

      const canAccessSelf = hasPermission(userPermissions, item.permissions);
      const hasVisibleChildren =
        filteredChildren && filteredChildren.length > 0;

      if (!canAccessSelf && !hasVisibleChildren) {
        return null;
      }

      return {
        ...item,
        ...(filteredChildren ? { children: filteredChildren } : {}),
      };
    })
    .filter(Boolean);
}

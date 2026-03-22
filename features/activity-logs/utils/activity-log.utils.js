import {
  ACTIVITY_ACTION_LABELS,
  ACTIVITY_ENTITY_LABELS,
} from "../constants/activity-log.constants";

export function getActionBadgeClass(action) {
  const normalized = String(action || "").toUpperCase();

  switch (normalized) {
    case "LOGIN":
      return "bg-[#ede9fe] text-[#6d28d9]";

    case "LOGOUT":
      return "bg-[#e0f2fe] text-[#0369a1]";

    case "CREATE_USER":
    case "CREATE_BLOG":
    case "CREATE_WA_RESPONSE":
    case "CREATE_COLLECTION_CATEGORY":
    case "CREATE_COLLECTION_ITEM":
    case "CREATE_COLLECTION_DETAIL_SECTION":
    case "CREATE_COLLECTION_DETAIL_ITEM":
      return "bg-[#dcfce7] text-[#15803d]";

    case "UPLOAD_COLLECTION_IMAGE":
      return "bg-[#dbeafe] text-[#1d4ed8]";

    case "UPDATE_USER":
    case "UPDATE_BLOG":
    case "UPDATE_WA_RESPONSE":
    case "UPDATE_COLLECTION_CATEGORY":
    case "UPDATE_COLLECTION_ITEM":
    case "UPDATE_COLLECTION_DETAIL_SECTION":
    case "UPDATE_COLLECTION_DETAIL_ITEM":
    case "UPDATE_PROFILE":
    case "CHANGE_PASSWORD":
      return "bg-[#fef3c7] text-[#b45309]";

    case "DEACTIVATE_USER":
    case "DELETE_BLOG":
    case "DELETE_WA_RESPONSE":
    case "DELETE_COLLECTION_CATEGORY":
    case "DELETE_COLLECTION_ITEM":
    case "DELETE_COLLECTION_IMAGE":
    case "DELETE_COLLECTION_DETAIL_SECTION":
    case "DELETE_COLLECTION_DETAIL_ITEM":
      return "bg-[#fee2e2] text-[#b91c1c]";

    case "REORDER_COLLECTION_IMAGE":
    case "REORDER_COLLECTION_DETAIL_SECTION":
    case "REORDER_COLLECTION_DETAIL_ITEM":
      return "bg-[#e0f2fe] text-[#0369a1]";

    default:
      return "bg-[#f3f4f6] text-[#374151]";
  }
}

export function getSeverityDotClass(action) {
  const normalized = String(action || "").toUpperCase();

  if (normalized.includes("DELETE") || normalized === "DEACTIVATE_USER") {
    return "bg-[#ef4444]";
  }

  if (normalized.includes("UPDATE") || normalized === "CHANGE_PASSWORD") {
    return "bg-[#f59e0b]";
  }

  if (normalized.includes("CREATE") || normalized.includes("UPLOAD")) {
    return "bg-[#22c55e]";
  }

  if (
    normalized.includes("REORDER") ||
    normalized === "LOGIN" ||
    normalized === "LOGOUT"
  ) {
    return "bg-[#60a5fa]";
  }

  return "bg-[#9ca3af]";
}

export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatEntityLabel(value) {
  const normalized = String(value || "").toUpperCase();
  return ACTIVITY_ENTITY_LABELS[normalized] || normalized.replaceAll("_", " ");
}

export function formatActionLabel(value) {
  const normalized = String(value || "").toUpperCase();
  return ACTIVITY_ACTION_LABELS[normalized] || normalized.replaceAll("_", " ");
}

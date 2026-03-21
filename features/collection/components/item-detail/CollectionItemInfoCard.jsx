"use client";

function getStatusBadgeClass(status) {
  switch (String(status || "").toUpperCase()) {
    case "PUBLISHED":
      return "bg-[#dcfce7] text-[#15803d]";
    case "DRAFT":
      return "bg-[#fef3c7] text-[#b45309]";
    case "ARCHIVED":
      return "bg-[#fee2e2] text-[#b91c1c]";
    default:
      return "bg-[#f3f4f6] text-[#374151]";
  }
}

export default function CollectionItemInfoCard({ item }) {
  if (!item) return null;

  return (
    <div className="rounded-[24px] bg-white p-6 shadow-[0_10px_30px_rgba(17,24,39,0.04)]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9ca3af]">
            Collection Item
          </p>
          <h2 className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-[#111827]">
            {item.name || "-"}
          </h2>
          <p className="mt-2 text-sm text-[#6b7280]">{item.slug || "-"}</p>

          {item.meaning && (
            <p className="mt-4 text-sm font-medium text-[#374151]">
              {item.meaning}
            </p>
          )}

          {item.description && (
            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#6b7280]">
              {item.description}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <span
            className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusBadgeClass(
              item.status,
            )}`}
          >
            {item.status || "-"}
          </span>

          <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1.5 text-xs font-semibold text-[#374151]">
            Order: {item.sortOrder ?? 0}
          </span>

          {item.category?.name && (
            <span className="inline-flex rounded-full bg-[#eff6ff] px-3 py-1.5 text-xs font-semibold text-[#1d4ed8]">
              {item.category?.parent?.name
                ? `${item.category.parent.name} / ${item.category.name}`
                : item.category.name}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
